/**
 * build/build.mjs
 * Static site generator for tools.bkxlabs.com
 *
 * Usage:  node build/build.mjs
 *
 * Reads:  data/tools/*.json
 * Writes: dist/{category}/{slug}/index.html
 *         dist/{category}/index.html    (category listing)
 *         dist/index.html               (homepage)
 *         dist/styles.css
 *         dist/calc-utils.js
 *
 * Supported inputType values:
 *   "textarea"             — paste-and-transform (json-formatter, jwt-decoder)
 *   "generator"            — generate-on-click, optional config panel
 *   "encode-decode-toggle" — two-mode toggle (backward compat; btn-encode/btn-decode IDs)
 *   "dual-mode-toggle"     — generalized two-mode toggle; labels and functions from JSON
 *   "regex-tester"         — three-field UI (pattern + flags + test string)
 */

import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Paths ──────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');       // tools-subdomain/

const PATHS = {
  data:      path.join(ROOT, 'data', 'tools'),
  templates: path.join(ROOT, 'templates'),
  shared:    path.join(ROOT, 'shared'),
  dist:      path.join(ROOT, 'dist'),
};

// ── Helpers ────────────────────────────────────────────────────

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓  ${path.relative(ROOT, filePath)}`);
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ✓  ${path.relative(ROOT, dest)} (copied)`);
}

/**
 * Replace all {{key}} placeholders in a template string.
 * Unknown placeholders are left intact so they surface as obvious gaps.
 */
function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    key in vars ? vars[key] : `{{${key}}}`
  );
}

/** Escape a string for safe use inside an HTML text node or attribute value. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape a string for safe embedding inside a JS single-quoted string literal. */
function escapeJS(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// ── Shared HTML fragments ──────────────────────────────────────

const ICON_PLAY = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2.5l9 5.5-9 5.5V2.5z" fill="currentColor"/></svg>`;
const ICON_LOCK = `<svg class="icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1L2 4v4c0 3.3 2.5 6.4 6 7 3.5-.6 6-3.7 6-7V4L8 1z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;

const PRIVACY_NOTE = `
        <p class="privacy-note">
          ${ICON_LOCK}
          Everything runs in your browser. No data is sent to any server.
        </p>`;

const OUTPUT_PANEL = `
        <div id="output-panel" class="output-panel" style="display:none;" aria-live="polite">
          <div class="output-panel-header">
            <span id="output-label">Output</span>
            <span id="status-badge" class="status-badge" role="status"></span>
            <button id="btn-copy" class="btn-ghost" type="button" style="padding:.2rem .6rem;font-size:.75rem;">Copy</button>
            <span id="copy-feedback" class="copy-feedback" aria-live="polite">Copied!</span>
          </div>
          <pre id="output-pre" tabindex="0"></pre>
        </div>`;

// Output panel variant for stats-grid tools — no <pre>, no copy button.
// Stats are rendered dynamically into #stats-grid-output by the inline script.
const STATS_GRID_PANEL = `
        <div id="output-panel" class="output-panel" style="display:none;" aria-live="polite">
          <div class="output-panel-header">
            <span id="output-label">Results</span>
            <span id="status-badge" class="status-badge" role="status"></span>
          </div>
          <div id="stats-grid-output" class="stats-grid"></div>
        </div>`;

// Output panel variant for data-table tools.
const DATA_TABLE_PANEL = `
        <div id="output-panel" class="output-panel" style="display:none;" aria-live="polite">
          <div class="output-panel-header">
            <span id="output-label">Results</span>
            <span id="status-badge" class="status-badge" role="status"></span>
          </div>
          <div id="stats-grid-output" class="stats-grid" style="display:none;"></div>
          <div class="table-container">
            <table class="data-table">
              <thead id="data-table-head"></thead>
              <tbody id="data-table-body"></tbody>
            </table>
          </div>
        </div>`;

// ── Textarea per-slug config ───────────────────────────────────
// Controls action-button label and textarea placeholder for inputType "textarea"
// without requiring extra fields in the tool JSON schema.
const TEXTAREA_UI_BY_SLUG = {
  'json-formatter': {
    actionLabel:  'Format &amp; Validate',
    placeholder:  '{ "example": "Paste your JSON here" }',
    hasSampleBtn: true,
  },
  'jwt-decoder': {
    actionLabel:  'Decode JWT',
    placeholder:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0\u2026',
    hasSampleBtn: false,
  },
};
const TEXTAREA_UI_DEFAULT = { actionLabel: 'Run', placeholder: '', hasSampleBtn: false };

// ── toolUI renderers ───────────────────────────────────────────

/**
 * Render a form of labeled <input> elements for a "multi-field" tool.
 * Each field in tool.fields is rendered as a labeled input.
 * The output panel is either STATS_GRID_PANEL or OUTPUT_PANEL based on tool.outputType.
 */
function renderMultiFieldUI(tool) {
  if (!Array.isArray(tool.fields) || tool.fields.length === 0) {
    throw new Error(`Tool "${tool.slug}" has inputType "multi-field" but is missing or has empty "fields" array.`);
  }

  const fieldsHtml = tool.fields.map(field => {
    const reqMark = field.required ? ' <span class="required-mark" aria-hidden="true">*</span>' : '';
    let inputHtml = '';

    if (field.type === 'select') {
      const optionsHtml = (field.options || []).map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('');
      inputHtml = `
          <select id="field-${escapeHtml(field.name)}" class="field-input">
            ${optionsHtml}
          </select>`;
    } else if (field.type === 'date') {
      inputHtml = `
          <input
            type="date"
            id="field-${escapeHtml(field.name)}"
            class="field-input"
            autocomplete="off"
          />`;
    } else {
      const inputType = (field.type === 'text' || field.type === 'url') ? field.type : 'number';
      const stepAttr  = inputType === 'number' ? ' step="any"' : '';
      inputHtml = `
          <input
            type="${inputType}"
            id="field-${escapeHtml(field.name)}"
            class="field-input"${stepAttr}
            placeholder="${escapeHtml(field.placeholder || '')}"
            autocomplete="off"
          />`;
    }

    return `
        <div class="field-group">
          <label class="field-label" for="field-${escapeHtml(field.name)}">${escapeHtml(field.label)}${reqMark}</label>
          ${inputHtml}
        </div>`;
  }).join('');

  let outputPanel;
  if (tool.outputType === 'stats-grid') outputPanel = STATS_GRID_PANEL;
  else if (tool.outputType === 'data-table') outputPanel = DATA_TABLE_PANEL;
  else outputPanel = OUTPUT_PANEL;

  return `
        <div class="multi-field-form">${fieldsHtml}
        </div>
        <div id="inline-error" class="inline-error" style="display:none;" role="alert" aria-live="assertive"></div>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            Calculate
          </button>
        </div>${PRIVACY_NOTE}${outputPanel}`;
}

/** Render a dynamic list UI (add/remove rows of name/value pairs) */
function renderDynamicListUI(tool) {
  if (!Array.isArray(tool.lists) || tool.lists.length === 0) {
    throw new Error(`Tool "${tool.slug}" has inputType "dynamic-list" but is missing or has empty "lists" array.`);
  }

  const listsHtml = tool.lists.map(list => {
    let rowInputsHtml = '';
    
    if (list.fields && list.fields.length > 0) {
      // Custom fields per row
      rowInputsHtml = list.fields.map(field => {
        if (field.type === 'select') {
          const optionsHtml = (field.options || []).map(opt => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join('');
          return `<select class="field-input list-input-custom" data-field="${escapeHtml(field.name)}">${optionsHtml}</select>`;
        } else if (field.type === 'number') {
          return `<input type="number" class="field-input list-input-custom" data-field="${escapeHtml(field.name)}" step="any" placeholder="${escapeHtml(field.label || '')}" autocomplete="off" />`;
        } else {
          return `<input type="text" class="field-input list-input-custom" data-field="${escapeHtml(field.name)}" placeholder="${escapeHtml(field.label || '')}" autocomplete="off" />`;
        }
      }).join('\n              ');
    } else {
      // Default fallback for net-worth-tracker (name + value)
      rowInputsHtml = `
              <input type="text" class="field-input list-name-input" placeholder="${escapeHtml(list.itemLabel)} Name" autocomplete="off" />
              <input type="number" class="field-input list-value-input" step="any" placeholder="Value ($)" autocomplete="off" />`;
    }

    return `
        <div class="dynamic-list-section" data-list-id="${escapeHtml(list.id)}">
          <div class="dynamic-list-header">${escapeHtml(list.label)}</div>
          <div id="list-items-${escapeHtml(list.id)}" class="dynamic-list-items">
            <div class="dynamic-list-item">
              ${rowInputsHtml}
              <button type="button" class="btn-remove-item" aria-label="Remove item" title="Remove">&times;</button>
            </div>
          </div>
          <button type="button" class="btn-ghost btn-add-item" data-add-to="${escapeHtml(list.id)}">
            ${escapeHtml(list.addButtonText)}
          </button>
        </div>`;
  }).join('');

  let outputPanel;
  if (tool.outputType === 'stats-grid') outputPanel = STATS_GRID_PANEL;
  else if (tool.outputType === 'data-table') outputPanel = DATA_TABLE_PANEL;
  else outputPanel = OUTPUT_PANEL;

  return `
        <div class="dynamic-list-form">${listsHtml}
        </div>
        <div id="inline-error" class="inline-error" style="display:none;" role="alert" aria-live="assertive"></div>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            Calculate
          </button>
        </div>${PRIVACY_NOTE}${outputPanel}`;
}

/** Render a unit converter UI */
function renderUnitConverterUI(tool) {
  const catOptions = tool.converterCategories.map(c => 
    `<option value="${escapeHtml(c.id)}">${escapeHtml(c.label)}</option>`
  ).join('');

  return `
        <div class="unit-converter-form">
          <div class="field-group">
            <label class="field-label" for="uc-category">Category</label>
            <select id="uc-category" class="field-input">${catOptions}</select>
          </div>
          <div class="uc-row" style="display: flex; gap: 1rem;">
            <div class="field-group" style="flex: 1;">
              <label class="field-label" for="uc-value">Value</label>
              <input type="number" id="uc-value" class="field-input" step="any" placeholder="e.g. 100" autocomplete="off" />
            </div>
            <div class="field-group" style="flex: 1;">
              <label class="field-label" for="uc-from">From</label>
              <select id="uc-from" class="field-input"></select>
            </div>
            <div class="field-group" style="flex: 1;">
              <label class="field-label" for="uc-to">To</label>
              <select id="uc-to" class="field-input"></select>
            </div>
          </div>
        </div>
        <div id="inline-error" class="inline-error" style="display:none;" role="alert" aria-live="assertive"></div>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            Convert
          </button>
        </div>${PRIVACY_NOTE}${STATS_GRID_PANEL}`;
}

/** Render options panel for a "generator" tool. */
function renderGeneratorOptions(generatorOptions) {
  if (!generatorOptions || generatorOptions.length === 0) return '';

  const CHECKBOX_LABEL = {
    uppercase:      'Uppercase (A\u2013Z)',
    lowercase:      'Lowercase (a\u2013z)',
    numbers:        'Numbers (0\u20139)',
    symbols:        'Symbols (!@#$\u2026)',
    excludeSimilar: 'Exclude similar characters (0, O, 1, l, I)',
  };
  const CHECKBOX_DEFAULTS = new Set(['uppercase', 'lowercase', 'numbers']);

  let rangeHtml    = '';
  let checkboxHtml = '';

  for (const opt of generatorOptions) {
    if (opt === 'length') {
      rangeHtml = `
          <div class="option-row option-row--range">
            <div class="option-row-label">
              <label for="opt-length">Length</label>
              <span class="option-value" id="length-display">16</span>
            </div>
            <input type="range" id="opt-length" class="range-input" min="8" max="64" value="16" />
            <div class="range-labels"><span>8</span><span>64</span></div>
          </div>`;
    } else {
      const label   = CHECKBOX_LABEL[opt] || opt;
      const checked = CHECKBOX_DEFAULTS.has(opt) ? ' checked' : '';
      checkboxHtml += `
            <label class="option-checkbox">
              <input type="checkbox" id="opt-${opt}"${checked} />
              ${label}
            </label>`;
    }
  }

  const checkboxWrap = checkboxHtml
    ? `\n          <div class="options-checkboxes">${checkboxHtml}\n          </div>`
    : '';

  return `
        <div class="options-panel">${rangeHtml}${checkboxWrap}
        </div>`;
}

/**
 * Shared HTML structure for two-mode toggle tools.
 * All parameters are expected to already be HTML-safe strings.
 *
 * "encode-decode-toggle" passes btn-encode/btn-decode IDs for backward compat.
 * "dual-mode-toggle"     passes btn-mode-0/btn-mode-1.
 */
function renderModeToggleUI(btn0Id, btn1Id, label0Html, label1Html, initInputLabelHtml) {
  return `
        <div class="toggle-group" role="group" aria-label="Mode">
          <button id="${btn0Id}" class="toggle-btn active" type="button">${label0Html}</button>
          <button id="${btn1Id}" class="toggle-btn" type="button">${label1Html}</button>
        </div>
        <label class="field-label" for="tool-input" id="input-label">${initInputLabelHtml}</label>
        <textarea
          id="tool-input"
          class="tool-input"
          spellcheck="false"
          autocomplete="off"
          placeholder="Enter text\u2026"
        ></textarea>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            <span id="btn-run-label">${label0Html}</span>
          </button>
          <button id="btn-clear" class="btn-ghost" type="button">Clear</button>
        </div>${PRIVACY_NOTE}${OUTPUT_PANEL}`;
}

/**
 * Returns the full inner HTML for the tool-card section, keyed on inputType.
 */
function renderToolUI(tool) {
  switch (tool.inputType) {

    // ── textarea ──────────────────────────────────────────────
    case 'textarea': {
      const tc = TEXTAREA_UI_BY_SLUG[tool.slug] || TEXTAREA_UI_DEFAULT;
      return `
        <label class="field-label" for="tool-input">${escapeHtml(tool.inputLabel)}</label>
        <textarea
          id="tool-input"
          class="tool-input"
          spellcheck="false"
          autocomplete="off"
          placeholder="${escapeHtml(tc.placeholder)}"
        ></textarea>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            ${tc.actionLabel}
          </button>
          <button id="btn-clear" class="btn-ghost" type="button">Clear</button>
          ${tc.hasSampleBtn ? '<button id="btn-sample" class="btn-ghost" type="button">Load sample</button>' : ''}
        </div>${PRIVACY_NOTE}${OUTPUT_PANEL}`;
    }

    // ── generator ─────────────────────────────────────────────
    case 'generator': {
      const optionsHtml = renderGeneratorOptions(tool.generatorOptions);
      return `${optionsHtml}
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            Generate
          </button>
        </div>${PRIVACY_NOTE}${OUTPUT_PANEL}`;
    }

    // ── encode-decode-toggle (backward compat) ─────────────────
    // Keeps the original btn-encode / btn-decode element IDs so existing
    // 'encode-decode' scriptType in TOOL_SCRIPT_CONFIG continues to work.
    case 'encode-decode-toggle':
      return renderModeToggleUI('btn-encode', 'btn-decode', 'Encode', 'Decode', 'Text to encode');

    // ── dual-mode-toggle (generalized) ────────────────────────
    // Labels come from tool.toggleLabels; functions come from tool.toggleFunctions.
    // Uses btn-mode-0 / btn-mode-1 IDs (different from encode-decode-toggle).
    case 'dual-mode-toggle': {
      const labels = tool.toggleLabels || ['Mode A', 'Mode B'];
      return renderModeToggleUI(
        'btn-mode-0', 'btn-mode-1',
        escapeHtml(labels[0]), escapeHtml(labels[1]),
        escapeHtml(labels[0])
      );
    }

    // ── regex-tester ─────────────────────────────────────────
    case 'regex-tester':
      return `
        <div class="regex-inputs">
          <div class="regex-pattern-row">
            <div class="regex-pattern-wrap">
              <span class="regex-delimiter" aria-hidden="true">/</span>
              <input
                type="text"
                id="regex-pattern"
                class="regex-pattern-input"
                placeholder="pattern"
                spellcheck="false"
                autocomplete="off"
                aria-label="Regex pattern"
              />
              <span class="regex-delimiter" aria-hidden="true">/</span>
            </div>
            <input
              type="text"
              id="regex-flags"
              class="regex-flags-input"
              placeholder="gim"
              value="g"
              maxlength="8"
              spellcheck="false"
              autocomplete="off"
              aria-label="Regex flags"
            />
          </div>
          <label class="field-label" for="regex-test">Test string</label>
          <textarea
            id="regex-test"
            class="tool-input"
            spellcheck="false"
            autocomplete="off"
            placeholder="Enter the text to test against\u2026"
            style="min-height:120px;"
          ></textarea>
        </div>
        <div class="tool-actions">
          <button id="btn-run" class="btn-primary" type="button">
            ${ICON_PLAY}
            Test
          </button>
          <button id="btn-clear" class="btn-ghost" type="button">Clear</button>
        </div>${PRIVACY_NOTE}
        <div id="highlight-wrap" class="highlight-area" style="display:none;" aria-live="polite">
          <div class="highlight-area-header">Match highlights</div>
          <div id="highlight-body" class="highlight-area-body"></div>
        </div>${OUTPUT_PANEL}`;

    // ── multi-field ────────────────────────────────────────────
    case 'multi-field':
      return renderMultiFieldUI(tool);

    // ── dynamic-list ───────────────────────────────────────────
    case 'dynamic-list':
      return renderDynamicListUI(tool);

    // ── unit-converter ───────────────────────────────────────────
    case 'unit-converter':
      return renderUnitConverterUI(tool);

    default:
      throw new Error(`Unknown inputType "${tool.inputType}" for tool "${tool.slug}"`);
  }
}

// ── toolScript config & renderer ──────────────────────────────

/**
 * Per-slug script configuration.
 *
 * This is the intentional seam between the JSON data schema (which describes
 * what a tool does) and the JS runtime (which names the calc-utils functions
 * that implement it). Adding a new tool requires a matching entry here.
 *
 * For "dual-mode-toggle" tools, function names and toggle labels are read
 * directly from the tool's JSON (tool.toggleFunctions, tool.toggleLabels).
 * Only input-label text and placeholders need to live here in config.
 */
const TOOL_SCRIPT_CONFIG = {
  // ── existing tools ──────────────────────────────────────────
  'json-formatter': {
    scriptType:  'textarea',
    runCall:     'formatJSON(inputEl.value)',
    okStatus:    '\u2713 Valid JSON',
    errorStatus: '\u2715 Invalid',
    hasSample:   true,
    sampleJS:    `JSON.stringify({ name: 'BKX Labs', tools: ['JSON Formatter', 'Base64 Encoder', 'URL Parser'], meta: { version: 1, free: true } })`,
  },
  'uuid-generator': {
    scriptType: 'generator-simple',
    runCall:    '{ ok: true, output: generateUUID() }',
    okStatus:   '\u2713 Generated',
    autoRun:    true,
  },
  'password-generator': {
    scriptType:  'generator-options',
    okStatus:    '\u2713 Generated',
    errorStatus: '\u2715 Error',
    autoRun:     true,
  },
  'base64-encoder-decoder': {
    scriptType:        'encode-decode',
    encodeFn:          'encodeBase64',
    decodeFn:          'decodeBase64',
    encodePlaceholder: 'Enter text to encode\u2026',
    decodePlaceholder: 'Paste Base64 to decode\u2026',
    encodeInputLabel:  'Text to encode',
    decodeInputLabel:  'Base64 to decode',
  },
  'url-encoder-decoder': {
    scriptType:        'encode-decode',
    encodeFn:          'encodeURL',
    decodeFn:          'decodeURL',
    encodePlaceholder: 'Enter text to URL-encode\u2026',
    decodePlaceholder: 'Paste URL-encoded string to decode\u2026',
    encodeInputLabel:  'Text to encode',
    decodeInputLabel:  'URL-encoded string to decode',
  },

  // ── new tools ───────────────────────────────────────────────
  'jwt-decoder': {
    scriptType:  'textarea',
    runCall:     'decodeJWT(inputEl.value)',
    okStatus:    '\u2713 Decoded',
    errorStatus: '\u2715 Invalid JWT',
    hasSample:   false,
  },
  'regex-tester': {
    scriptType: 'regex-tester',
  },
  'unix-timestamp-converter': {
    scriptType:   'dual-mode',
    // Input labels and placeholders for each mode (labels themselves come from tool.toggleLabels)
    inputLabel0:  'Unix timestamp (seconds or milliseconds)',
    inputLabel1:  'Date string',
    placeholder0: 'e.g. 1719475200 or 1719475200000',
    placeholder1: 'e.g. 2024-06-27 or 2024-06-27T12:00:00',
  },

  // ── business-tools (multi-field) ─────────────────────────────
  // All config comes from the JSON (fields, calculateFunction, outputType).
  // TOOL_SCRIPT_CONFIG just needs to declare the scriptType.
  'cac-calculator':        { scriptType: 'multi-field' },
  'roas-calculator':       { scriptType: 'multi-field' },
  'break-even-calculator': { scriptType: 'multi-field' },
  'saas-churn-calculator': { scriptType: 'multi-field' },
  'nps-calculator':        { scriptType: 'multi-field' },
  'utm-link-builder':      { scriptType: 'multi-field' },

  // ── finance-tools ────────────────────────────────────────────
  'compound-interest-calculator':     { scriptType: 'multi-field' },
  'mortgage-amortization-calculator': { scriptType: 'multi-field' },
  'dti-calculator':                   { scriptType: 'multi-field' },
  'emergency-fund-calculator':        { scriptType: 'multi-field' },
  'net-worth-tracker':                { scriptType: 'dynamic-list' },

  // ── health-academic-tools ────────────────────────────────────
  'bmi-calculator':      { scriptType: 'multi-field' },
  'bmr-calculator':      { scriptType: 'multi-field' },
  'gpa-calculator':      { scriptType: 'dynamic-list' },
  'age-calculator':      { scriptType: 'multi-field' },
  'days-between-dates':  { scriptType: 'multi-field' },
  'unit-converter':      { scriptType: 'unit-converter' },
};

/**
 * Shared variable declarations and showResult() helper injected at the top
 * of every tool's inline script.
 *
 * The \u2713 / \u2715 literals inside the JS template string are Unicode
 * escape sequences — they survive verbatim into the generated HTML file
 * and are correctly interpreted as ✓ / ✕ by the browser's JS engine.
 */
const COMMON_SCRIPT = `
      var outputEl = document.getElementById('output-pre');
      var panelEl  = document.getElementById('output-panel');
      var statusEl = document.getElementById('status-badge');
      var btnCopy  = document.getElementById('btn-copy');
      var copyMsg  = document.getElementById('copy-feedback');

      function showResult(result, okLabel, errorLabel) {
        panelEl.style.display = '';
        outputEl.textContent  = result.output;
        if (result.ok) {
          panelEl.className  = 'output-panel is-success';
          statusEl.className = 'status-badge ok';
          statusEl.textContent = okLabel || '\\u2713 Done';
        } else {
          panelEl.className  = 'output-panel is-error';
          statusEl.className = 'status-badge error';
          statusEl.textContent = errorLabel || '\\u2715 Error';
        }
      }

      btnCopy.addEventListener('click', function () {
        if (!outputEl.textContent) return;
        navigator.clipboard.writeText(outputEl.textContent).then(function () {
          copyMsg.classList.add('visible');
          setTimeout(function () { copyMsg.classList.remove('visible'); }, 1800);
        });
      });`;

/**
 * Returns the IIFE body (toolScript placeholder) for the given tool.
 * All string literals embedded in generated JS use single quotes;
 * escapeJS() handles apostrophes and backslashes within those strings.
 */
function renderToolScript(tool) {
  const cfg = TOOL_SCRIPT_CONFIG[tool.slug];
  if (!cfg) {
    throw new Error(
      `No script config found for slug "${tool.slug}". ` +
      `Add an entry to TOOL_SCRIPT_CONFIG in build/build.mjs.`
    );
  }

  switch (cfg.scriptType) {

    // ── textarea ────────────────────────────────────────────────
    case 'textarea':
      return `${COMMON_SCRIPT}

      var inputEl  = document.getElementById('tool-input');
      var btnRun   = document.getElementById('btn-run');
      var btnClear = document.getElementById('btn-clear');
      ${cfg.hasSample ? `var btnSample = document.getElementById('btn-sample');` : ''}

      function runTool() {
        showResult(${cfg.runCall}, '${escapeJS(cfg.okStatus)}', '${escapeJS(cfg.errorStatus)}');
      }

      btnRun.addEventListener('click', runTool);

      // Ctrl/Cmd + Enter shortcut
      inputEl.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runTool();
        }
      });

      btnClear.addEventListener('click', function () {
        inputEl.value = '';
        panelEl.style.display = 'none';
        inputEl.focus();
      });

      ${cfg.hasSample ? `btnSample.addEventListener('click', function () {
        inputEl.value = ${cfg.sampleJS};
        runTool();
      });` : ''}`;

    // ── generator (no options) ───────────────────────────────────
    case 'generator-simple':
      return `${COMMON_SCRIPT}

      var btnRun = document.getElementById('btn-run');

      function runTool() {
        showResult(${cfg.runCall}, '${escapeJS(cfg.okStatus)}');
      }

      btnRun.addEventListener('click', runTool);
      runTool(); // generate immediately on page load`;

    // ── generator (with options panel) ──────────────────────────
    case 'generator-options':
      return `${COMMON_SCRIPT}

      var btnRun        = document.getElementById('btn-run');
      var lengthInput   = document.getElementById('opt-length');
      var lengthDisplay = document.getElementById('length-display');

      // Keep the numeric readout in sync with the slider
      lengthInput.addEventListener('input', function () {
        lengthDisplay.textContent = lengthInput.value;
      });

      function getPasswordOptions() {
        return {
          uppercase:      document.getElementById('opt-uppercase').checked,
          lowercase:      document.getElementById('opt-lowercase').checked,
          numbers:        document.getElementById('opt-numbers').checked,
          symbols:        document.getElementById('opt-symbols').checked,
          excludeSimilar: document.getElementById('opt-excludeSimilar').checked,
        };
      }

      function runTool() {
        var result = generatePassword(
          parseInt(lengthInput.value, 10),
          getPasswordOptions()
        );
        showResult(result, '${escapeJS(cfg.okStatus)}', '${escapeJS(cfg.errorStatus)}');
      }

      btnRun.addEventListener('click', runTool);
      runTool(); // generate immediately on page load`;

    // ── encode / decode toggle (backward compat) ─────────────────
    case 'encode-decode':
      return `${COMMON_SCRIPT}

      var inputEl      = document.getElementById('tool-input');
      var btnRun       = document.getElementById('btn-run');
      var btnClear     = document.getElementById('btn-clear');
      var btnEncode    = document.getElementById('btn-encode');
      var btnDecode    = document.getElementById('btn-decode');
      var btnLabel     = document.getElementById('btn-run-label');
      var inputLabelEl = document.getElementById('input-label');

      var mode = 'encode';

      function setMode(m) {
        mode = m;
        btnEncode.classList.toggle('active', m === 'encode');
        btnDecode.classList.toggle('active', m === 'decode');
        btnLabel.textContent     = m === 'encode' ? 'Encode' : 'Decode';
        inputLabelEl.textContent = m === 'encode'
          ? '${escapeJS(cfg.encodeInputLabel)}'
          : '${escapeJS(cfg.decodeInputLabel)}';
        inputEl.placeholder = m === 'encode'
          ? '${escapeJS(cfg.encodePlaceholder)}'
          : '${escapeJS(cfg.decodePlaceholder)}';
        panelEl.style.display = 'none';
      }

      btnEncode.addEventListener('click', function () { setMode('encode'); });
      btnDecode.addEventListener('click', function () { setMode('decode'); });

      function runTool() {
        var result = mode === 'encode'
          ? ${cfg.encodeFn}(inputEl.value)
          : ${cfg.decodeFn}(inputEl.value);
        showResult(
          result,
          mode === 'encode' ? '\u2713 Encoded' : '\u2713 Decoded',
          '\u2715 Error'
        );
      }

      btnRun.addEventListener('click', runTool);

      inputEl.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runTool(); }
      });

      btnClear.addEventListener('click', function () {
        inputEl.value = '';
        panelEl.style.display = 'none';
        inputEl.focus();
      });`;

    // ── dual-mode toggle (generalized) ───────────────────────────
    // Function names come from tool.toggleFunctions[] (JSON data).
    // Input labels and placeholders come from TOOL_SCRIPT_CONFIG (cfg).
    case 'dual-mode': {
      if (!tool.toggleFunctions || tool.toggleFunctions.length < 2) {
        throw new Error(`Tool "${tool.slug}" is dual-mode but is missing toggleFunctions in its JSON.`);
      }
      const fn0     = tool.toggleFunctions[0];
      const fn1     = tool.toggleFunctions[1];
      const label0  = escapeJS((tool.toggleLabels || ['Mode A'])[0]);
      const label1  = escapeJS((tool.toggleLabels || ['Mode A', 'Mode B'])[1]);
      const ilabel0 = escapeJS(cfg.inputLabel0);
      const ilabel1 = escapeJS(cfg.inputLabel1);
      const ph0     = escapeJS(cfg.placeholder0);
      const ph1     = escapeJS(cfg.placeholder1);

      return `${COMMON_SCRIPT}

      var inputEl      = document.getElementById('tool-input');
      var btnRun       = document.getElementById('btn-run');
      var btnClear     = document.getElementById('btn-clear');
      var btnMode0     = document.getElementById('btn-mode-0');
      var btnMode1     = document.getElementById('btn-mode-1');
      var btnLabel     = document.getElementById('btn-run-label');
      var inputLabelEl = document.getElementById('input-label');

      var mode = 0;

      function setMode(m) {
        mode = m;
        btnMode0.classList.toggle('active', m === 0);
        btnMode1.classList.toggle('active', m === 1);
        btnLabel.textContent     = m === 0 ? '${label0}' : '${label1}';
        inputLabelEl.textContent = m === 0 ? '${ilabel0}' : '${ilabel1}';
        inputEl.placeholder      = m === 0 ? '${ph0}' : '${ph1}';
        panelEl.style.display    = 'none';
      }

      btnMode0.addEventListener('click', function () { setMode(0); });
      btnMode1.addEventListener('click', function () { setMode(1); });

      function runTool() {
        var result = mode === 0
          ? ${fn0}(inputEl.value)
          : ${fn1}(inputEl.value);
        showResult(result, '\u2713 Done', '\u2715 Error');
      }

      btnRun.addEventListener('click', runTool);
      inputEl.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runTool(); }
      });
      btnClear.addEventListener('click', function () {
        inputEl.value = '';
        panelEl.style.display = 'none';
        inputEl.focus();
      });`;
    }

    // ── regex tester ─────────────────────────────────────────────
    case 'regex-tester':
      return `${COMMON_SCRIPT}

      var patternInput  = document.getElementById('regex-pattern');
      var flagsInput    = document.getElementById('regex-flags');
      var testInput     = document.getElementById('regex-test');
      var btnRun        = document.getElementById('btn-run');
      var btnClear      = document.getElementById('btn-clear');
      var highlightWrap = document.getElementById('highlight-wrap');
      var highlightBody = document.getElementById('highlight-body');

      // Escape a string for safe use as innerHTML text (for building highlight HTML)
      function escH(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      // Build highlighted HTML for the test string, wrapping each match in <mark>
      function buildHighlight(testStr, matches) {
        var html = '';
        var last = 0;
        for (var i = 0; i < matches.length; i++) {
          var m = matches[i];
          // Text before this match — escaped for safe innerHTML use
          html += escH(testStr.slice(last, m.index));
          // The match itself — wrapped in <mark>
          html += '<mark>' + escH(m.match) + '</mark>';
          last = m.index + m.match.length;
        }
        // Any remaining text after the last match
        html += escH(testStr.slice(last));
        return html;
      }

      function runTool() {
        var result = testRegex(
          patternInput.value,
          flagsInput.value,
          testInput.value
        );

        panelEl.style.display = '';
        outputEl.textContent  = result.output;

        if (result.ok && result.matches && result.matches.length > 0) {
          panelEl.className  = 'output-panel is-success';
          statusEl.className = 'status-badge ok';
          statusEl.textContent = '\u2713 ' + result.matches.length +
            ' match' + (result.matches.length === 1 ? '' : 'es');
          highlightBody.innerHTML = buildHighlight(testInput.value, result.matches);
          highlightWrap.style.display = '';
        } else {
          panelEl.className  = 'output-panel is-error';
          statusEl.className = 'status-badge error';
          statusEl.textContent = result.ok ? '0 matches' : '\u2715 Error';
          highlightWrap.style.display = 'none';
        }
      }

      btnRun.addEventListener('click', runTool);

      // Live feedback — re-run whenever the user types in pattern, flags, or test string
      [patternInput, flagsInput].forEach(function (el) {
        el.addEventListener('input', function () {
          if (patternInput.value) runTool();
        });
      });
      testInput.addEventListener('input', function () {
        if (patternInput.value) runTool();
      });

      btnClear.addEventListener('click', function () {
        patternInput.value          = '';
        flagsInput.value            = 'g';
        testInput.value             = '';
        panelEl.style.display       = 'none';
        highlightWrap.style.display = 'none';
        patternInput.focus();
      });`;

    // ── multi-field (calculators) ────────────────────────────────
    // All data-driven: field names/types come from tool.fields,
    // function name from tool.calculateFunction, output from tool.outputType.
    case 'multi-field': {
      if (!tool.fields || !tool.calculateFunction) {
        throw new Error(`Tool "${tool.slug}" uses scriptType "multi-field" but is missing fields or calculateFunction in its JSON.`);
      }

      const fields     = tool.fields;
      const calcFn     = tool.calculateFunction;
      const outputType = tool.outputType;

      // One variable declaration per field element
      const fieldVarDecls = fields
        .map(f => `      var fld_${f.name} = document.getElementById('field-${f.name}');`)
        .join('\n');

      // Required field IDs for the validation loop
      const requiredIds = fields
        .filter(f => f.required)
        .map(f => `'field-${f.name}'`)
        .join(', ');

      // Values object: number fields use Number(), text/url use .trim()
      // Optional number fields: Number('') === 0 so no extra default needed
      const valueEntries = fields
        .map(f => {
          if (f.type === 'text' || f.type === 'url' || f.type === 'select' || f.type === 'date') {
            return `          ${f.name}: fld_${f.name}.value.trim()`;
          }
          return `          ${f.name}: Number(fld_${f.name}.value)`;
        })
        .join(',\n');

      // Copy-button support only for text output tools
      const copyDecls = outputType === 'text' ? `
      var outputEl = document.getElementById('output-pre');
      var btnCopy  = document.getElementById('btn-copy');
      var copyMsg  = document.getElementById('copy-feedback');

      btnCopy.addEventListener('click', function () {
        if (!outputEl.textContent) return;
        navigator.clipboard.writeText(outputEl.textContent).then(function () {
          copyMsg.classList.add('visible');
          setTimeout(function () { copyMsg.classList.remove('visible'); }, 1800);
        });
      });` : '';

      // renderOutput handles text, stats-grid, or data-table
      let renderOutputFn = '';
      
      if (outputType === 'data-table') {
        renderOutputFn = `
      function escH(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function renderOutput(result) {
        var grid = document.getElementById('stats-grid-output');
        grid.innerHTML = '';
        if (result.summaryStats && result.summaryStats.length > 0) {
          result.summaryStats.forEach(function (stat) {
            var card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML =
              '<span class="stat-label">' + escH(String(stat.label)) + '</span>' +
              '<span class="stat-value">'  + escH(String(stat.value)) + '</span>';
            grid.appendChild(card);
          });
          grid.style.display = '';
        } else {
          grid.style.display = 'none';
        }
        
        var thead = document.getElementById('data-table-head');
        var tbody = document.getElementById('data-table-body');
        
        var headerHtml = '<tr>';
        result.columns.forEach(function(col) {
          headerHtml += '<th>' + escH(String(col)) + '</th>';
        });
        headerHtml += '</tr>';
        thead.innerHTML = headerHtml;
        
        var bodyHtml = '';
        result.rows.forEach(function(row) {
          bodyHtml += '<tr>';
          row.forEach(function(cell) {
            bodyHtml += '<td>' + escH(String(cell)) + '</td>';
          });
          bodyHtml += '</tr>';
        });
        tbody.innerHTML = bodyHtml;

        panelEl.style.display = '';
        panelEl.className     = 'output-panel is-success';
        statusEl.className    = 'status-badge ok';
        statusEl.textContent  = '\\u2713 Calculated';
      }`;
      } else if (outputType === 'stats-grid') {
        renderOutputFn = `
      function escH(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function renderOutput(result) {
        var grid = document.getElementById('stats-grid-output');
        grid.innerHTML = '';
        result.stats.forEach(function (stat) {
          var card = document.createElement('div');
          card.className = 'stat-card';
          card.innerHTML =
            '<span class="stat-label">' + escH(String(stat.label)) + '</span>' +
            '<span class="stat-value">'  + escH(String(stat.value)) + '</span>';
          grid.appendChild(card);
        });
        grid.style.display = '';
        panelEl.style.display = '';
        panelEl.className     = 'output-panel is-success';
        statusEl.className    = 'status-badge ok';
        statusEl.textContent  = '\\u2713 Calculated';
      }`;
      } else {
        renderOutputFn = `
      function renderOutput(result) {
        outputEl.textContent  = result.output;
        panelEl.style.display = '';
        panelEl.className     = 'output-panel is-success';
        statusEl.className    = 'status-badge ok';
        statusEl.textContent  = '\\u2713 Done';
      }`;
      }

      return `
      var panelEl   = document.getElementById('output-panel');
      var statusEl  = document.getElementById('status-badge');
      var inlineErr = document.getElementById('inline-error');
      var btnRun    = document.getElementById('btn-run');
      ${copyDecls}

${fieldVarDecls}
${renderOutputFn}

      function clearError() {
        inlineErr.textContent   = '';
        inlineErr.style.display = 'none';
      }

      function showInlineError(msg) {
        inlineErr.textContent   = msg;
        inlineErr.style.display = '';
        panelEl.style.display   = 'none';
      }

      btnRun.addEventListener('click', function () {
        clearError();

        // Validate: all required fields must be non-empty
        var requiredIds = [${requiredIds}];
        var allFilled   = requiredIds.every(function (id) {
          return document.getElementById(id).value.trim() !== '';
        });
        if (!allFilled) {
          showInlineError('All required fields must be filled in.');
          return;
        }

        var values = {
${valueEntries}
        };

        var result = ${calcFn}(values);

        if (!result.ok) {
          showInlineError(result.error || 'Calculation failed \u2014 check the input values.');
          return;
        }

        renderOutput(result);
      });`;
    }

    // ── dynamic-list ─────────────────────────────────────────────
    case 'dynamic-list': {
      if (!tool.lists || !tool.calculateFunction) {
        throw new Error(`Tool "${tool.slug}" uses scriptType "dynamic-list" but is missing lists or calculateFunction.`);
      }

      const calcFn = tool.calculateFunction;
      // Net worth uses stats-grid outputType, but could use text/data-table in future
      const outputType = tool.outputType;

      let renderOutputFn = '';
      if (outputType === 'stats-grid') {
        renderOutputFn = `
      function escH(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function renderOutput(result) {
        var grid = document.getElementById('stats-grid-output');
        grid.innerHTML = '';
        result.stats.forEach(function (stat) {
          var card = document.createElement('div');
          card.className = 'stat-card';
          card.innerHTML =
            '<span class="stat-label">' + escH(String(stat.label)) + '</span>' +
            '<span class="stat-value">'  + escH(String(stat.value)) + '</span>';
          grid.appendChild(card);
        });
        grid.style.display = '';
        panelEl.style.display = '';
        panelEl.className     = 'output-panel is-success';
        statusEl.className    = 'status-badge ok';
        statusEl.textContent  = '\\u2713 Calculated';
      }`;
      } else {
        renderOutputFn = `function renderOutput() {}`; // fallback
      }

      const listIds = tool.lists.map(l => `'${l.id}'`).join(', ');

      return `
      var panelEl   = document.getElementById('output-panel');
      var statusEl  = document.getElementById('status-badge');
      var inlineErr = document.getElementById('inline-error');
      var btnRun    = document.getElementById('btn-run');
      
${renderOutputFn}

      function clearError() {
        inlineErr.textContent   = '';
        inlineErr.style.display = 'none';
      }

      function showInlineError(msg) {
        inlineErr.textContent   = msg;
        inlineErr.style.display = '';
        panelEl.style.display   = 'none';
      }

      // Add functionality for removing items
      document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-remove-item')) {
          var item = e.target.closest('.dynamic-list-item');
          if (item && item.parentElement) {
            item.parentElement.removeChild(item);
          }
        }
        
        if (e.target && e.target.classList.contains('btn-add-item')) {
          var listId = e.target.getAttribute('data-add-to');
          var container = document.getElementById('list-items-' + listId);
          
          var firstItem = container.querySelector('.dynamic-list-item');
          if (firstItem) {
            var newItem = firstItem.cloneNode(true);
            var inputs = newItem.querySelectorAll('input');
            inputs.forEach(function(inp) { inp.value = ''; });
            var selects = newItem.querySelectorAll('select');
            selects.forEach(function(sel) { sel.selectedIndex = 0; });
            container.appendChild(newItem);
            
            if (inputs.length > 0) inputs[0].focus();
            else if (selects.length > 0) selects[0].focus();
          }
        }
      });

      btnRun.addEventListener('click', function () {
        clearError();

        var listIds = [${listIds}];
        var values = {};
        
        listIds.forEach(function(listId) {
          values[listId] = [];
          var container = document.getElementById('list-items-' + listId);
          if (!container) return;
          
          var items = container.querySelectorAll('.dynamic-list-item');
          items.forEach(function(item) {
            var customInputs = item.querySelectorAll('.list-input-custom');
            if (customInputs.length > 0) {
              var rowObj = {};
              var isEmpty = true;
              customInputs.forEach(function(inp) {
                var fieldName = inp.getAttribute('data-field');
                if (!fieldName) return;
                var rawVal = inp.value.trim();
                if (rawVal !== '') isEmpty = false;
                
                if (inp.type === 'number') {
                  rowObj[fieldName] = rawVal ? Number(rawVal) : 0;
                } else {
                  rowObj[fieldName] = rawVal;
                }
              });
              if (!isEmpty) {
                values[listId].push(rowObj);
              }
            } else {
              var nameInput = item.querySelector('.list-name-input');
              var valInput = item.querySelector('.list-value-input');
              var name = nameInput ? nameInput.value.trim() : '';
              var val = valInput ? valInput.value.trim() : '';
              if (!name && !val) return;
              values[listId].push({
                name: name || 'Untitled',
                value: val ? Number(val) : 0
              });
            }
          });
        });

        var result = ${calcFn}(values);

        if (!result.ok) {
          showInlineError(result.error || 'Calculation failed \\u2014 check the input values.');
          return;
        }

        renderOutput(result);
      });`;
    }

    // ── unit-converter ───────────────────────────────────────────
    case 'unit-converter': {
      const unitsJson = JSON.stringify(tool.converterCategories);
      const calcFn = tool.calculateFunction;

      return `
      var panelEl   = document.getElementById('output-panel');
      var statusEl  = document.getElementById('status-badge');
      var inlineErr = document.getElementById('inline-error');
      var btnRun    = document.getElementById('btn-run');
      
      var catSelect = document.getElementById('uc-category');
      var fromSelect = document.getElementById('uc-from');
      var toSelect = document.getElementById('uc-to');
      var valInput = document.getElementById('uc-value');

      var categories = ${unitsJson};

      function escH(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function populateUnits() {
        var catId = catSelect.value;
        var cat = categories.find(function(c) { return c.id === catId; });
        if (!cat || !cat.units) return;

        var optionsHtml = cat.units.map(function(u) {
          return '<option value="' + escH(u.id) + '">' + escH(u.label) + '</option>';
        }).join('');

        fromSelect.innerHTML = optionsHtml;
        toSelect.innerHTML = optionsHtml;
        
        if (cat.units.length > 1) {
          toSelect.value = cat.units[1].id;
        }
      }

      catSelect.addEventListener('change', populateUnits);
      populateUnits();

      function clearError() {
        inlineErr.textContent   = '';
        inlineErr.style.display = 'none';
      }

      function showInlineError(msg) {
        inlineErr.textContent   = msg;
        inlineErr.style.display = '';
        panelEl.style.display   = 'none';
      }

      function renderOutput(result) {
        var grid = document.getElementById('stats-grid-output');
        grid.innerHTML = '';
        result.stats.forEach(function (stat) {
          var card = document.createElement('div');
          card.className = 'stat-card';
          card.innerHTML =
            '<span class="stat-label">' + escH(String(stat.label)) + '</span>' +
            '<span class="stat-value">'  + escH(String(stat.value)) + '</span>';
          grid.appendChild(card);
        });
        grid.style.display = '';
        panelEl.style.display = '';
        panelEl.className     = 'output-panel is-success';
        statusEl.className    = 'status-badge ok';
        statusEl.textContent  = '\\u2713 Converted';
      }

      btnRun.addEventListener('click', function () {
        clearError();

        var catId = catSelect.value;
        var cat = categories.find(function(c) { return c.id === catId; });
        var fromId = fromSelect.value;
        var toId = toSelect.value;
        var rawVal = valInput.value.trim();

        if (rawVal === '') {
          showInlineError('Enter a valid number');
          return;
        }
        var value = Number(rawVal);
        if (!isFinite(value)) {
          showInlineError('Enter a valid number');
          return;
        }

        var fromUnit = cat.units.find(function(u) { return u.id === fromId; });
        var toUnit = cat.units.find(function(u) { return u.id === toId; });

        var result = ${calcFn}({ category: catId, fromUnit: fromUnit, toUnit: toUnit, value: value });
        if (!result.ok) {
          showInlineError(result.error);
          return;
        }
        renderOutput(result);
      });`;
    }

    default:
      throw new Error(`Unknown scriptType "${cfg.scriptType}" for tool "${tool.slug}"`);
  }
}

// ── Load templates ─────────────────────────────────────────────
const TPL = {
  toolPage: readText(path.join(PATHS.templates, 'tool-page.html')),
  catIndex: readText(path.join(PATHS.templates, 'category-index.html')),
  home:     readText(path.join(PATHS.templates, 'home.html')),
  privacy:  readText(path.join(PATHS.templates, 'privacy.html')),
};

// ── Load all tool JSON files ───────────────────────────────────
const toolFiles = fs.readdirSync(PATHS.data).filter(f => f.endsWith('.json'));

if (toolFiles.length === 0) {
  console.error('No tool JSON files found in', PATHS.data);
  process.exit(1);
}

const REQUIRED_FIELDS = [
  'slug', 'category', 'categoryLabel', 'title',
  'metaDescription', 'shortDescription',
  'guideHeading', 'guideSections', 'inputType',
];

const tools = toolFiles.map(file => {
  const raw  = readText(path.join(PATHS.data, file));
  const tool = JSON.parse(raw);
  for (const field of REQUIRED_FIELDS) {
    if (tool[field] === undefined) {
      throw new Error(`Missing required field "${field}" in ${file}`);
    }
  }
  return tool;
});

// ── Group tools by category ────────────────────────────────────
const categories = new Map();
for (const tool of tools) {
  if (!categories.has(tool.category)) {
    categories.set(tool.category, { label: tool.categoryLabel, tools: [] });
  }
  categories.get(tool.category).tools.push(tool);
}

// ── Generate tool pages ────────────────────────────────────────
console.log('\nBuilding tool pages\u2026');

for (const tool of tools) {
  const sectionsHtml = tool.guideSections.map(s => `
        <div class="guide-item">
          <h3>${escapeHtml(s.heading)}</h3>
          <p>${escapeHtml(s.body)}</p>
        </div>`).join('\n');

  const html = render(TPL.toolPage, {
    slug:             tool.slug,
    category:         tool.category,
    categoryLabel:    tool.categoryLabel,
    title:            escapeHtml(tool.title),
    metaDescription:  escapeHtml(tool.metaDescription),
    shortDescription: escapeHtml(tool.shortDescription),
    guideHeading:     escapeHtml(tool.guideHeading),
    guideSections:    sectionsHtml,
    toolUI:           renderToolUI(tool),
    toolScript:       renderToolScript(tool),
  });

  writeText(path.join(PATHS.dist, tool.category, tool.slug, 'index.html'), html);
}

// ── Generate category index pages ─────────────────────────────
console.log('\nBuilding category index pages\u2026');

for (const [catSlug, catData] of categories) {
  const toolCardsHtml = catData.tools.map(tool => `
          <a class="tool-card-link" href="/${tool.category}/${tool.slug}/">
            <h3>${escapeHtml(tool.title)}</h3>
            <p>${escapeHtml(tool.shortDescription)}</p>
          </a>`).join('\n');

  const html = render(TPL.catIndex, {
    category:            catSlug,
    categoryLabel:       catData.label,
    categoryDescription: `${catData.tools.length} free ${catData.label.toLowerCase()} tool${catData.tools.length !== 1 ? 's' : ''} \u2014 all client-side.`,
    toolCards:           toolCardsHtml,
  });

  writeText(path.join(PATHS.dist, catSlug, 'index.html'), html);
}

// ── Generate homepage ──────────────────────────────────────────
console.log('\nBuilding homepage\u2026');

const categoryBlocksHtml = [...categories.entries()].map(([catSlug, catData]) => {
  const cards = catData.tools.map(tool => `
          <a class="tool-card-link" href="/${tool.category}/${tool.slug}/">
            <h3>${escapeHtml(tool.title)}</h3>
            <p>${escapeHtml(tool.shortDescription)}</p>
          </a>`).join('\n');

  return `
      <div class="category-block">
        <h2><a href="/${catSlug}/">${escapeHtml(catData.label)}</a></h2>
        <div class="tools-grid">${cards}
        </div>
      </div>`;
}).join('\n');

const homeHtml = render(TPL.home, { categoryBlocks: categoryBlocksHtml });
writeText(path.join(PATHS.dist, 'index.html'), homeHtml);

// ── Copy shared assets ─────────────────────────────────────────────
console.log('\nCopying shared assets...');
copyFile(path.join(PATHS.shared, 'styles.css'),    path.join(PATHS.dist, 'styles.css'));
copyFile(path.join(PATHS.shared, 'calc-utils.js'), path.join(PATHS.dist, 'calc-utils.js'));
copyFile(path.join(PATHS.shared, 'favicon.ico'),        path.join(PATHS.dist, 'favicon.ico'));
copyFile(path.join(PATHS.shared, 'favicon-32x32.png'),  path.join(PATHS.dist, 'favicon-32x32.png'));
copyFile(path.join(PATHS.shared, 'favicon-16x16.png'),  path.join(PATHS.dist, 'favicon-16x16.png'));

// Build date for sitemap + privacy page (YYYY-MM-DD)
const today = new Date().toISOString().slice(0, 10);

// ── Generate robots.txt ───────────────────────────────────────────
console.log('\nGenerating robots.txt...');
const robotsTxt = 'User-agent: *\nAllow: /\nSitemap: https://tools.bkxlabs.com/sitemap.xml\n';
writeText(path.join(PATHS.dist, 'robots.txt'), robotsTxt);
console.log('  ✓  dist/robots.txt');

// ── Generate sitemap.xml ───────────────────────────────────────────
console.log('\nGenerating sitemap.xml...');
const sitemapUrls = [];
// Homepage
sitemapUrls.push({ loc: 'https://tools.bkxlabs.com/', priority: '1.0', changefreq: 'weekly' });
// Privacy page
sitemapUrls.push({ loc: 'https://tools.bkxlabs.com/privacy/', priority: '0.3', changefreq: 'yearly' });
// Category index pages
for (const [catSlug] of categories) {
  sitemapUrls.push({ loc: 'https://tools.bkxlabs.com/' + catSlug + '/', priority: '0.8', changefreq: 'weekly' });
}
// Tool pages
for (const tool of tools) {
  sitemapUrls.push({ loc: 'https://tools.bkxlabs.com/' + tool.category + '/' + tool.slug + '/', priority: '0.7', changefreq: 'weekly' });
}
const sitemapEntries = sitemapUrls.map(u =>
  '  <url>\n    <loc>' + u.loc + '</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>' + u.changefreq + '</changefreq>\n    <priority>' + u.priority + '</priority>\n  </url>'
).join('\n');
const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemapEntries + '\n</urlset>\n';
writeText(path.join(PATHS.dist, 'sitemap.xml'), sitemapXml);
console.log('  ✓  dist/sitemap.xml');

// ── Generate privacy page ───────────────────────────────────────────
console.log('\nBuilding privacy page...');
const privacyHtml = render(TPL.privacy, { buildDate: today });
writeText(path.join(PATHS.dist, 'privacy', 'index.html'), privacyHtml);
console.log('  ✓  dist/privacy/index.html');

// ── Summary ──────────────────────────────────────────────────
const totalPages = tools.length + categories.size + 1 + 1; // tools + categories + home + privacy
console.log('\n✅  Build complete — ' + totalPages + ' HTML page(s) + robots.txt + sitemap.xml written to dist/\n');
