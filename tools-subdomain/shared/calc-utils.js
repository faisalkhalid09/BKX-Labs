/**
 * calc-utils.js
 * Shared calculation / processing utilities for BKX Labs Tools.
 * All functions run entirely in the browser — no data is transmitted.
 */

/**
 * Format and validate a raw JSON string.
 *
 * @param {string} rawInput  - The raw string pasted by the user.
 * @returns {{ ok: boolean, output: string, errorLine: number|null }}
 *   ok        — true if the input is valid JSON
 *   output    — beautified JSON string on success, error message on failure
 *   errorLine — 1-based line number hint on failure, null on success
 */
function formatJSON(rawInput) {
  const input = rawInput.trim();

  if (input === '') {
    return {
      ok: false,
      output: 'Input is empty. Paste a JSON string above and click Format & Validate.',
      errorLine: null,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const beautified = JSON.stringify(parsed, null, 2);
    return { ok: true, output: beautified, errorLine: null };
  } catch (err) {
    // Extract position info from the native error message.
    // Browsers typically produce messages like:
    //   "Unexpected token } in JSON at position 42"   (V8 / Chrome)
    //   "JSON Parse error: Expected '}'"               (JavaScriptCore / Safari)
    //   "JSON.parse: expected ',' or '}' at line 3 column 5 of the JSON data"  (SpiderMonkey / Firefox)

    let errorLine = null;

    // Firefox: "… at line N column M …"
    const ffMatch = err.message.match(/at line (\d+) column (\d+)/i);
    if (ffMatch) {
      errorLine = parseInt(ffMatch[1], 10);
    }

    // V8 / Chrome: "at position N" — convert char offset to line number
    if (errorLine === null) {
      const v8Match = err.message.match(/at position (\d+)/i);
      if (v8Match) {
        const charOffset = parseInt(v8Match[1], 10);
        // Count newlines in the input up to the error offset
        const before = input.slice(0, charOffset);
        errorLine = (before.match(/\n/g) || []).length + 1;
      }
    }

    // Build a helpful message
    let friendlyMessage = `SyntaxError: ${err.message}`;
    if (errorLine !== null) {
      friendlyMessage += `\n\nHint: The parser failed near line ${errorLine}. The actual mistake may be a few lines earlier (e.g. a missing bracket or trailing comma).`;
    } else {
      friendlyMessage += `\n\nHint: Check for trailing commas, mismatched brackets, or unquoted keys.`;
    }

    return { ok: false, output: friendlyMessage, errorLine };
  }
}

// ── UUID Generation ────────────────────────────────────────────────────────────

/**
 * Generate a RFC 4122 version 4 UUID using the browser's cryptographically
 * secure random source.
 *
 * crypto.randomUUID() is available in all modern browsers and Node ≥ 14.17.
 * We intentionally do NOT provide a Math.random() fallback: a UUID built from
 * Math.random() is NOT cryptographically random and would give a false sense
 * of security to anyone using it as a secret or correlation token.
 *
 * @returns {string}  e.g. "550e8400-e29b-41d4-a716-446655440000"
 */
function generateUUID() {
  if (typeof crypto === 'undefined' || typeof crypto.randomUUID !== 'function') {
    throw new Error(
      'crypto.randomUUID() is not available in this environment. ' +
      'Use a modern browser or Node.js ≥ 14.17.'
    );
  }
  return crypto.randomUUID();
}

// ── Password Generation ────────────────────────────────────────────────────────

/**
 * Generate a cryptographically secure random password.
 *
 * Security requirement: randomness is sourced exclusively from
 * crypto.getRandomValues(). Math.random() is a pseudo-random number generator
 * that is NOT cryptographically secure and MUST NOT be used for passwords,
 * tokens, or any value where unpredictability is a security property.
 *
 * The rejection-sampling loop (discard-and-retry) avoids the modulo bias that
 * would arise from a naive `value % charsetLength` when the charset length
 * does not evenly divide 256. This ensures every character in the charset is
 * equally likely to be chosen.
 *
 * @param {number} length   - Password length (8–128)
 * @param {{ uppercase?: boolean, lowercase?: boolean, numbers?: boolean,
 *            symbols?: boolean, excludeSimilar?: boolean }} options
 * @returns {{ ok: boolean, output: string }}
 */
function generatePassword(length, options = {}) {
  const {
    uppercase      = true,
    lowercase      = true,
    numbers        = true,
    symbols        = false,
    excludeSimilar = false,
  } = options;

  // Build the character pool from enabled sets
  let pool = '';
  if (uppercase) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) pool += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers)   pool += '0123456789';
  if (symbols)   pool += '!@#$%^&*()-_=+[]{}|;:,.<>?';

  // excludeSimilar: remove visually ambiguous characters so a password is
  // easier to read from a screen or printed page without misreading a character.
  // This is a usability option, not a security one — it slightly reduces the
  // pool size and therefore entropy per character.
  if (excludeSimilar) {
    pool = pool.replace(/[0O1lI]/g, '');
  }

  if (pool.length === 0) {
    return {
      ok: false,
      output: 'Select at least one character set to generate a password.',
    };
  }

  const safeLength = Math.max(8, Math.min(128, Math.floor(length) || 16));

  // Rejection sampling to eliminate modulo bias.
  // We discard any random byte whose value falls outside the largest multiple
  // of pool.length that fits in a byte (0–255), then use value % pool.length.
  const threshold = 256 - (256 % pool.length);
  const bytes = new Uint8Array(safeLength * 4); // over-allocate to reduce retries
  let password = '';

  while (password.length < safeLength) {
    crypto.getRandomValues(bytes);
    for (let i = 0; i < bytes.length && password.length < safeLength; i++) {
      if (bytes[i] < threshold) {
        password += pool[bytes[i] % pool.length];
      }
      // bytes[i] >= threshold → discard (bias rejection)
    }
  }

  return { ok: true, output: password };
}

// ── Base64 Encoding / Decoding ─────────────────────────────────────────────────

/**
 * Encode a Unicode string to Base64.
 *
 * Naive btoa(str) only handles Latin-1 (ISO 8859-1) characters. Any character
 * with a code point above U+00FF causes btoa() to throw "InvalidCharacterError".
 * The correct approach is to first encode the string as UTF-8 bytes (via
 * TextEncoder), then convert those bytes to a Base64 string.
 *
 * @param {string} str
 * @returns {{ ok: boolean, output: string }}
 */
function encodeBase64(str) {
  if (str === '') {
    return { ok: false, output: 'Input is empty.' };
  }
  try {
    // Step 1: encode to UTF-8 bytes
    const bytes = new TextEncoder().encode(str);
    // Step 2: convert Uint8Array bytes to a binary string, then to Base64
    let binary = '';
    bytes.forEach(b => { binary += String.fromCharCode(b); });
    return { ok: true, output: btoa(binary) };
  } catch (err) {
    return { ok: false, output: `Encoding error: ${err.message}` };
  }
}

/**
 * Decode a Base64 string back to a Unicode string.
 *
 * Naive atob(str) returns a Latin-1 string of raw byte values. For multi-byte
 * UTF-8 sequences (e.g. accented characters, CJK, emoji), this produces
 * garbled output. The correct approach is to interpret the decoded bytes as a
 * UTF-8 byte sequence using TextDecoder.
 *
 * @param {string} str
 * @returns {{ ok: boolean, output: string }}
 */
function decodeBase64(str) {
  const input = str.trim();
  if (input === '') {
    return { ok: false, output: 'Input is empty.' };
  }
  try {
    // Step 1: decode Base64 to a binary string of raw byte values
    const binary = atob(input);
    // Step 2: convert binary string back to Uint8Array bytes
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    // Step 3: decode the UTF-8 byte sequence to a Unicode string
    return { ok: true, output: new TextDecoder().decode(bytes) };
  } catch (err) {
    // atob() throws DOMException on invalid Base64 input
    return {
      ok: false,
      output: `Invalid Base64 input: ${err.message}\n\nMake sure the input contains only valid Base64 characters (A–Z, a–z, 0–9, +, /, =).`,
    };
  }
}

// ── URL Encoding / Decoding ────────────────────────────────────────────────────

/**
 * Encode a string for use as a URL query parameter value.
 *
 * We use encodeURIComponent rather than encodeURI because:
 *   - encodeURI is designed for a *complete* URL and intentionally leaves
 *     structural characters like &, =, ?, #, and / unencoded (they have
 *     special meaning in a full URL).
 *   - encodeURIComponent is designed for a single *component* value (e.g. the
 *     value of a query parameter) and encodes ALL characters that are not
 *     unreserved in RFC 3986, including &, =, ?, and +. This prevents a value
 *     that contains an ampersand from being interpreted as a second parameter.
 *
 * @param {string} str
 * @returns {{ ok: boolean, output: string }}
 */
function encodeURL(str) {
  if (str === '') {
    return { ok: false, output: 'Input is empty.' };
  }
  try {
    return { ok: true, output: encodeURIComponent(str) };
  } catch (err) {
    return { ok: false, output: `Encoding error: ${err.message}` };
  }
}

/**
 * Decode a percent-encoded URL component.
 *
 * decodeURIComponent throws a URIError when it encounters a malformed
 * percent-encoding sequence (e.g. a bare "%" not followed by two hex digits).
 * We wrap it in try/catch and return a clear error message rather than letting
 * it propagate uncaught.
 *
 * @param {string} str
 * @returns {{ ok: boolean, output: string }}
 */
function decodeURL(str) {
  const input = str.trim();
  if (input === '') {
    return { ok: false, output: 'Input is empty.' };
  }
  try {
    return { ok: true, output: decodeURIComponent(input) };
  } catch (err) {
    return {
      ok: false,
      output: `Invalid percent-encoding: ${err.message}\n\nCheck for a bare "%" not followed by two hex digits (e.g. "%2" is incomplete; "%25" is a literal percent sign).`,
    };
  }
}

// ── JWT Decoding ───────────────────────────────────────────────────────────────

/**
 * Decode a JWT's header and payload.
 *
 * JWT uses base64URL encoding, which replaces '+' with '-' and '/' with '_',
 * and omits '=' padding. Before calling atob() we reverse those substitutions
 * and re-pad to a length that is a multiple of 4.
 *
 * IMPORTANT: This function only DECODES the header and payload. It does NOT
 * verify the signature. Verifying a JWT requires the issuer's secret or
 * public key, which is never available in a browser tool. The output string
 * leads with a prominent warning to make this explicit.
 *
 * @param {string} token  - Raw JWT string (three base64URL segments joined by '.')
 * @returns {{ ok: boolean, output: string }}
 */
function decodeJWT(token) {
  const trimmed = token.trim();
  if (!trimmed) {
    return { ok: false, output: 'Input is empty. Paste a JWT above.' };
  }

  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    return {
      ok: false,
      output: `Not a valid JWT structure — expected 3 dot-separated parts, got ${parts.length}.\n\nA JWT looks like: xxxxx.yyyyy.zzzzz`,
    };
  }

  function decodeSegment(segment) {
    // base64URL → standard base64: swap URL-safe chars back, re-add padding
    let b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    // Decode via atob then re-interpret bytes as UTF-8 (same pattern as decodeBase64)
    const binary = atob(b64);
    const bytes  = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  try {
    const header  = JSON.parse(decodeSegment(parts[0]));
    const payload = JSON.parse(decodeSegment(parts[1]));

    const divider = '\u2500'.repeat(54); // ─────────────
    const output = [
      '\u26a0\ufe0f  DECODED ONLY \u2014 signature has not been verified',
      divider,
      '',
      'HEADER',
      JSON.stringify(header, null, 2),
      '',
      'PAYLOAD',
      JSON.stringify(payload, null, 2),
    ].join('\n');

    return { ok: true, output };
  } catch (err) {
    return { ok: false, output: `Failed to decode JWT: ${err.message}` };
  }
}

// ── Regex Testing ──────────────────────────────────────────────────────────────

/**
 * Test a regular expression pattern against a string and return all matches.
 *
 * - Wraps RegExp construction in try/catch so invalid patterns return a clear
 *   error rather than throwing.
 * - Adds the 'g' flag internally for the exec() loop if not already present
 *   (exec() without 'g' always resets to the same first match; 'g' makes it
 *   advance through the string on each call).
 * - Guards against infinite loops on zero-length matches (e.g. pattern `x*`) by
 *   manually advancing lastIndex by 1 when the match consumed no characters.
 *
 * @param {string} pattern     - The regex pattern string (without delimiters)
 * @param {string} flags       - Flags string (e.g. 'gi')
 * @param {string} testString  - The string to test against
 * @returns {{ ok: boolean, output: string, matches: Array }}
 */
function testRegex(pattern, flags, testString) {
  if (!pattern) {
    return { ok: false, output: 'Enter a pattern to test.', matches: [] };
  }

  let regex;
  // Always include 'g' for the exec() loop — without it, exec() returns only
  // the first match repeatedly and the loop never terminates.
  const flagsForExec = flags.includes('g') ? flags : flags + 'g';

  try {
    regex = new RegExp(pattern, flagsForExec);
  } catch (err) {
    return {
      ok: false,
      output: `Invalid pattern: ${err.message}`,
      matches: [],
    };
  }

  const matches = [];
  let m;

  while ((m = regex.exec(testString)) !== null) {
    // Zero-length match guard — if the match consumed no characters, the regex
    // engine does not advance lastIndex automatically, so we force it forward
    // by 1 to prevent an infinite loop (e.g. pattern `x*` applied to "abc").
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    matches.push({
      match:  m[0],
      index:  m.index,
      groups: m.length > 1 ? Array.from(m).slice(1) : [],
    });
  }

  if (matches.length === 0) {
    return { ok: false, output: 'No matches found.', matches: [] };
  }

  const lines = [
    `${matches.length} match${matches.length === 1 ? '' : 'es'} found`,
    '',
  ];

  matches.forEach((match, i) => {
    lines.push(`Match ${i + 1}: "${match.match}" at index ${match.index}`);
    if (match.groups.length > 0) {
      match.groups.forEach((g, gi) => {
        lines.push(`  Group ${gi + 1}: ${g === undefined ? '(no match)' : `"${g}"`}`);
      });
    }
  });

  return { ok: true, output: lines.join('\n'), matches };
}

// ── Unix Timestamp Conversion ──────────────────────────────────────────────────

/**
 * Convert a Unix epoch timestamp to a human-readable date string.
 *
 * Automatically detects whether the input is in seconds or milliseconds using
 * a digit-count heuristic: 10 digits or fewer → seconds (standard Unix time);
 * 13 digits → milliseconds (JavaScript's Date.getTime()). This covers virtually
 * all real-world timestamps from 2001 to 2286.
 *
 * Returns both the UTC representation and the user's local timezone side by
 * side, because a raw epoch value is timezone-agnostic and showing only one
 * interpretation can be misleading when debugging server logs or cross-timezone
 * data.
 *
 * @param {string|number} input  - Epoch value as a number or numeric string
 * @returns {{ ok: boolean, output: string }}
 */
function epochToDate(input) {
  const trimmed = String(input).trim();
  if (!trimmed) return { ok: false, output: 'Input is empty.' };

  const num = Number(trimmed);
  if (isNaN(num)) {
    return { ok: false, output: `"${trimmed}" is not a valid number.` };
  }

  // Digit-count heuristic: 10 digits → seconds, 13 digits → milliseconds
  const digits = String(Math.abs(Math.floor(num))).length;
  const ms     = digits <= 10 ? num * 1000 : num;
  const date   = new Date(ms);

  if (isNaN(date.getTime())) {
    return { ok: false, output: 'Timestamp is out of range for a valid date.' };
  }

  const fmtOpts = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  };

  const utcStr   = new Intl.DateTimeFormat('en-US', { ...fmtOpts, timeZone: 'UTC' }).format(date) + ' UTC';
  const localStr = new Intl.DateTimeFormat('en-US', fmtOpts).format(date) + ' (local)';
  const unit     = digits <= 10 ? 'seconds (10-digit)' : 'milliseconds (13-digit)';

  return {
    ok: true,
    output: [
      `Input:     ${num}`,
      `Detected:  ${unit}`,
      '',
      `UTC:       ${utcStr}`,
      `Local:     ${localStr}`,
      '',
      `ISO 8601:  ${date.toISOString()}`,
    ].join('\n'),
  };
}

/**
 * Convert a human-readable date string to Unix epoch values.
 *
 * Parses the input via new Date(), which accepts ISO 8601 strings
 * (YYYY-MM-DD, YYYY-MM-DDTHH:mm:ss, YYYY-MM-DDTHH:mm:ssZ, etc.) and
 * many locale-specific formats. If parsing fails (isNaN of getTime()),
 * returns a clear error with format guidance rather than throwing.
 *
 * @param {string} input  - A date string in any format new Date() accepts
 * @returns {{ ok: boolean, output: string }}
 */
function dateToEpoch(input) {
  const trimmed = String(input).trim();
  if (!trimmed) return { ok: false, output: 'Input is empty.' };

  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    return {
      ok: false,
      output: 'Could not parse that date — try YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss format.',
    };
  }

  const ms  = date.getTime();
  const sec = Math.floor(ms / 1000);

  return {
    ok: true,
    output: [
      `Input:     ${trimmed}`,
      `ISO 8601:  ${date.toISOString()}`,
      '',
      `Unix timestamp (seconds):      ${sec}`,
      `Unix timestamp (milliseconds): ${ms}`,
    ].join('\n'),
  };
}

// ── Business & SaaS Calculators ──────────────────────────────────────────────

/**
 * Format a number as USD for display purposes.
 * Does not perform real currency conversion.
 */
function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calcCAC(input) {
  const marketingSpend = input.marketingSpend;
  const salesSpend     = input.salesSpend;
  const newCustomers   = input.newCustomers;

  if (newCustomers <= 0) {
    return { ok: false, error: 'Number of new customers must be greater than zero' };
  }

  const totalSpend = marketingSpend + salesSpend;
  const cac = totalSpend / newCustomers;

  return {
    ok: true,
    stats: [
      { label: 'Total Acquisition Spend', value: formatCurrency(totalSpend) },
      { label: 'Customer Acquisition Cost (CAC)', value: formatCurrency(cac) }
    ]
  };
}

function calcROAS(input) {
  const adSpend   = input.adSpend;
  const adRevenue = input.adRevenue;

  if (adSpend <= 0) {
    return { ok: false, error: 'Ad spend must be greater than zero' };
  }

  const roas = adRevenue / adSpend;

  return {
    ok: true,
    stats: [
      { label: 'ROAS Ratio', value: roas.toFixed(2) + ':1' },
      { label: 'Return on Ad Spend', value: (roas * 100).toFixed(1) + '%' },
      { label: 'Net Profit from Ads', value: formatCurrency(adRevenue - adSpend) }
    ]
  };
}

function calcBreakEven(input) {
  const fixedCosts          = input.fixedCosts;
  const pricePerUnit        = input.pricePerUnit;
  const variableCostPerUnit = input.variableCostPerUnit;

  const contributionMargin = pricePerUnit - variableCostPerUnit;
  if (contributionMargin <= 0) {
    return { ok: false, error: 'Price per unit must be greater than variable cost per unit' };
  }

  const breakEvenUnits   = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  return {
    ok: true,
    stats: [
      { label: 'Contribution Margin per Unit', value: formatCurrency(contributionMargin) },
      { label: 'Break-Even Units', value: Math.ceil(breakEvenUnits).toLocaleString() },
      { label: 'Break-Even Revenue', value: formatCurrency(breakEvenRevenue) }
    ]
  };
}

function calcSaaSChurn(input) {
  const customersStart = input.customersStart;
  const customersLost  = input.customersLost;
  const mrrStart       = input.mrrStart || 0;
  const mrrLost        = input.mrrLost || 0;

  if (customersStart <= 0) {
    return { ok: false, error: 'Starting customer count must be greater than zero' };
  }

  const customerChurnRate = (customersLost / customersStart) * 100;
  const stats = [
    { label: 'Customer Churn Rate', value: customerChurnRate.toFixed(2) + '%' },
    { label: 'Customers Retained', value: (customersStart - customersLost).toLocaleString() }
  ];

  if (mrrStart > 0) {
    const revenueChurnRate = (mrrLost / mrrStart) * 100;
    stats.push({ label: 'Revenue Churn Rate', value: revenueChurnRate.toFixed(2) + '%' });
  }

  return { ok: true, stats: stats };
}

function calcNPS(input) {
  const promoters  = input.promoters;
  const passives   = input.passives;
  const detractors = input.detractors;

  const total = promoters + passives + detractors;
  if (total <= 0) {
    return { ok: false, error: 'Enter at least one response across the three categories' };
  }

  const pPromoters  = (promoters / total) * 100;
  const pDetractors = (detractors / total) * 100;
  const nps = Math.round(pPromoters - pDetractors);

  return {
    ok: true,
    stats: [
      { label: 'Promoters', value: pPromoters.toFixed(1) + '%' },
      { label: 'Detractors', value: pDetractors.toFixed(1) + '%' },
      { label: 'Net Promoter Score', value: String(nps) }
    ]
  };
}

function buildUTMLink(input) {
  const baseUrl  = input.baseUrl;
  const source   = input.source;
  const medium   = input.medium;
  const campaign = input.campaign;
  const term     = input.term;
  const content  = input.content;

  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    return { ok: false, error: 'Enter a valid URL starting with http:// or https://' };
  }

  const params = new URLSearchParams();
  params.set('utm_source', source);
  params.set('utm_medium', medium);
  params.set('utm_campaign', campaign);
  
  if (term)    params.set('utm_term', term);
  if (content) params.set('utm_content', content);

  const separator = baseUrl.includes('?') ? '&' : '?';
  const output = baseUrl + separator + params.toString();

  return { ok: true, output: output };
}

function calcCompoundInterest(input) {
  const principal           = input.principal;
  const annualRate          = input.annualRate;
  const years               = input.years;
  const monthlyContribution = input.monthlyContribution || 0;

  if (principal < 0)  return { ok: false, error: 'Initial investment cannot be negative' };
  if (annualRate < 0) return { ok: false, error: 'Annual rate cannot be negative' };
  if (years <= 0)     return { ok: false, error: 'Years must be greater than zero' };

  const monthlyRate = annualRate / 100 / 12;
  const months      = years * 12;

  let balance               = principal;
  let totalContributedSoFar = principal;
  const rows = [];

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    totalContributedSoFar += monthlyContribution;

    if (m % 12 === 0) {
      const yearNumber     = m / 12;
      const interestEarned = balance - totalContributedSoFar;
      rows.push([
        yearNumber,
        formatCurrency(balance),
        formatCurrency(totalContributedSoFar),
        formatCurrency(interestEarned)
      ]);
    }
  }

  const totalContributed = principal + (monthlyContribution * months);
  const totalInterest    = balance - totalContributed;

  return {
    ok: true,
    summaryStats: [
      { label: 'Final Balance', value: formatCurrency(balance) },
      { label: 'Total Contributions', value: formatCurrency(totalContributed) },
      { label: 'Total Interest Earned', value: formatCurrency(totalInterest) }
    ],
    columns: ['Year', 'Balance', 'Total Contributed', 'Interest Earned'],
    rows: rows
  };
}

function calcMortgageAmortization(input) {
  const loanAmount = input.loanAmount;
  const annualRate = input.annualRate;
  const termYears  = input.termYears;

  if (loanAmount <= 0) return { ok: false, error: 'Loan amount must be greater than zero' };
  if (termYears <= 0)  return { ok: false, error: 'Term years must be greater than zero' };
  if (annualRate < 0)  return { ok: false, error: 'Annual rate cannot be negative' };

  const monthlyRate = annualRate / 100 / 12;
  const n           = termYears * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / n;
  } else {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }

  let balance = loanAmount;
  const rows = [];

  for (let m = 1; m <= n; m++) {
    const interestPortion  = balance * monthlyRate;
    const principalPortion = monthlyPayment - interestPortion;
    balance = Math.max(0, balance - principalPortion);

    rows.push([
      m,
      formatCurrency(monthlyPayment),
      formatCurrency(principalPortion),
      formatCurrency(interestPortion),
      formatCurrency(balance)
    ]);
  }

  const totalPaid     = monthlyPayment * n;
  const totalInterest = totalPaid - loanAmount;

  return {
    ok: true,
    summaryStats: [
      { label: 'Monthly Payment', value: formatCurrency(monthlyPayment) },
      { label: 'Total Paid Over Term', value: formatCurrency(totalPaid) },
      { label: 'Total Interest Paid', value: formatCurrency(totalInterest) }
    ],
    columns: ['Month', 'Payment', 'Principal', 'Interest', 'Remaining Balance'],
    rows: rows
  };
}

function calcDTI(input) {
  const monthlyDebtPayments = input.monthlyDebtPayments;
  const grossMonthlyIncome  = input.grossMonthlyIncome;

  if (grossMonthlyIncome <= 0) {
    return { ok: false, error: 'Gross monthly income must be greater than zero' };
  }

  const dti = (monthlyDebtPayments / grossMonthlyIncome) * 100;
  let classification = '';
  if (dti <= 36) {
    classification = 'Healthy';
  } else if (dti <= 43) {
    classification = 'Borderline — may affect loan approval';
  } else {
    classification = 'High — likely to limit borrowing options';
  }

  return {
    ok: true,
    stats: [
      { label: 'Debt-to-Income Ratio', value: dti.toFixed(1) + '%' },
      { label: 'Classification', value: classification }
    ]
  };
}

function calcEmergencyFund(input) {
  const monthlyExpenses = input.monthlyExpenses;
  const bufferMonths    = input.bufferMonths;

  if (monthlyExpenses <= 0) return { ok: false, error: 'Monthly expenses must be greater than zero' };
  if (bufferMonths <= 0)    return { ok: false, error: 'Buffer months must be greater than zero' };

  const target = monthlyExpenses * bufferMonths;

  return {
    ok: true,
    stats: [
      { label: 'Target Emergency Fund', value: formatCurrency(target) },
      { label: 'Monthly Expenses Used', value: formatCurrency(monthlyExpenses) },
      { label: 'Buffer Period', value: bufferMonths + ' months' }
    ]
  };
}

function calcNetWorth(input) {
  const assets      = input.assets || [];
  const liabilities = input.liabilities || [];

  const totalAssets = assets.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const totalLiabilities = liabilities.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const netWorth = totalAssets - totalLiabilities;

  return {
    ok: true,
    stats: [
      { label: 'Total Assets', value: formatCurrency(totalAssets) },
      { label: 'Total Liabilities', value: formatCurrency(totalLiabilities) },
      { label: 'Net Worth', value: formatCurrency(netWorth) }
    ]
  };
}

// ── Health & Academic Tools ────────────────────────────────────────────

function calcBMI({ heightCm, weightKg }) {
  if (heightCm <= 0) return { ok: false, error: 'Height must be greater than 0' };
  if (weightKg <= 0) return { ok: false, error: 'Weight must be greater than 0' };

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi <= 24.9) category = 'Healthy Weight';
  else if (bmi <= 29.9) category = 'Overweight';
  else category = 'Obese';

  return {
    ok: true,
    stats: [
      { label: 'BMI', value: bmi.toFixed(1) },
      { label: 'Category', value: category }
    ]
  };
}

function calcBMR({ age, gender, heightCm, weightKg, formula }) {
  if (age <= 0) return { ok: false, error: 'Age must be greater than 0' };
  if (heightCm <= 0) return { ok: false, error: 'Height must be greater than 0' };
  if (weightKg <= 0) return { ok: false, error: 'Weight must be greater than 0' };
  if (gender !== 'male' && gender !== 'female') return { ok: false, error: 'Gender must be male or female' };
  if (formula !== 'mifflin' && formula !== 'harris') return { ok: false, error: 'Invalid formula' };

  let bmr = 0;
  if (formula === 'mifflin') {
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  } else {
    // Harris-Benedict (revised)
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    }
  }

  return {
    ok: true,
    stats: [
      { label: 'Estimated BMR', value: Math.round(bmr) + ' calories/day' },
      { label: 'Formula Used', value: formula === 'mifflin' ? 'Mifflin-St Jeor' : 'Harris-Benedict' }
    ]
  };
}

function calcGPA({ courses }) {
  const gradePoints = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0
  };

  let totalPoints = 0;
  let totalCredits = 0;

  for (const c of courses) {
    if (c.creditHours <= 0) continue;
    if (gradePoints[c.grade] === undefined) continue;
    
    totalPoints += c.creditHours * gradePoints[c.grade];
    totalCredits += c.creditHours;
  }

  if (totalCredits <= 0) {
    return { ok: false, error: 'Add at least one course with valid credit hours and a grade' };
  }

  const gpa = totalPoints / totalCredits;

  return {
    ok: true,
    stats: [
      { label: 'GPA', value: gpa.toFixed(2) },
      { label: 'Total Credit Hours', value: String(totalCredits) }
    ]
  };
}

function calcAge({ birthDate }) {
  if (!birthDate) return { ok: false, error: 'Enter a valid birth date' };
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return { ok: false, error: 'Enter a valid birth date' };
  
  const now = new Date();
  if (birth > now) return { ok: false, error: 'Birth date cannot be in the future' };

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  if (days < 0) {
    months--;
    // Get days in the previous month relative to now
    let prevMonth = now.getMonth() - 1;
    let prevYear = now.getFullYear();
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    days += daysInMonth(prevYear, prevMonth);
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // using UTC difference is safer for exact days, or Math.floor without timezone offsets
  // We'll reset both to midnight local time to count whole days precisely
  const startOfDayNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDayBirth = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
  const totalDays = Math.floor((startOfDayNow - startOfDayBirth) / 86400000);

  let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (now > nextBirthday && (now.getMonth() !== birth.getMonth() || now.getDate() !== birth.getDate())) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  let daysUntilNextBirthday = 0;
  if (now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate()) {
    daysUntilNextBirthday = 0;
  } else {
    // Math.round to avoid daylight savings off-by-one-hour issues when dividing by 86400000
    daysUntilNextBirthday = Math.round((nextBirthday - startOfDayNow) / 86400000);
  }

  return {
    ok: true,
    stats: [
      { label: 'Age', value: years + ' years, ' + months + ' months, ' + days + ' days' },
      { label: 'Total Days Lived', value: totalDays.toLocaleString() },
      { label: 'Days Until Next Birthday', value: String(daysUntilNextBirthday) }
    ]
  };
}

function calcDaysBetween({ startDate, endDate }) {
  if (!startDate) return { ok: false, error: 'Start date is invalid' };
  if (!endDate) return { ok: false, error: 'End date is invalid' };
  
  const start = new Date(startDate);
  if (isNaN(start.getTime())) return { ok: false, error: 'Start date is invalid' };
  const end = new Date(endDate);
  if (isNaN(end.getTime())) return { ok: false, error: 'End date is invalid' };

  // Adjust to start of day in local time to avoid time zone jump issues
  const startLocal = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endLocal = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const totalDays = Math.round(Math.abs(endLocal - startLocal) / 86400000);
  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;
  const approxMonths = (totalDays / 30.44).toFixed(1);

  return {
    ok: true,
    stats: [
      { label: 'Total Days', value: String(totalDays) },
      { label: 'Weeks + Days', value: weeks + ' weeks, ' + remainderDays + ' days' },
      { label: 'Approx. Months', value: approxMonths }
    ]
  };
}

function convertUnit({ category, fromUnit, toUnit, value }) {
  if (typeof value !== 'number' || !isFinite(value)) {
    return { ok: false, error: 'Enter a valid number' };
  }

  if (category === 'temperature') {
    if (fromUnit.id === 'kelvin' && value < 0) {
      return { ok: false, error: 'Kelvin temperature cannot be negative' };
    }
    
    let result = value;
    if (fromUnit.id !== toUnit.id) {
      if (fromUnit.id === 'celsius' && toUnit.id === 'fahrenheit') {
        result = value * 9 / 5 + 32;
      } else if (fromUnit.id === 'celsius' && toUnit.id === 'kelvin') {
        result = value + 273.15;
      } else if (fromUnit.id === 'fahrenheit' && toUnit.id === 'celsius') {
        result = (value - 32) * 5 / 9;
      } else if (fromUnit.id === 'fahrenheit' && toUnit.id === 'kelvin') {
        result = (value - 32) * 5 / 9 + 273.15;
      } else if (fromUnit.id === 'kelvin' && toUnit.id === 'celsius') {
        result = value - 273.15;
      } else if (fromUnit.id === 'kelvin' && toUnit.id === 'fahrenheit') {
        result = (value - 273.15) * 9 / 5 + 32;
      }
    }
    
    if (toUnit.id === 'kelvin' && result < 0) {
      return { ok: false, error: 'Kelvin temperature cannot be negative' };
    }
    
    // Clean trailing zeros for display
    let dispVal = Number(result.toFixed(4)).toString();
    return {
      ok: true,
      stats: [{ label: 'Converted Value', value: dispVal + ' ' + toUnit.label }]
    };
  }

  // Length or Weight
  if (fromUnit.toBase === undefined || toUnit.toBase === undefined) {
    return { ok: false, error: 'Invalid units for conversion' };
  }

  const valueInBase = value * fromUnit.toBase;
  const result = valueInBase / toUnit.toBase;

  let dispVal = Number(result.toFixed(4)).toString();
  return {
    ok: true,
    stats: [{ label: 'Converted Value', value: dispVal + ' ' + toUnit.label }]
  };
}

// Export for both Node (build-time testing) and browser (script tag)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatJSON,
    generateUUID, generatePassword,
    encodeBase64, decodeBase64,
    encodeURL, decodeURL,
    decodeJWT,
    testRegex,
    epochToDate, dateToEpoch,
    calcCAC, calcROAS, calcBreakEven, calcSaaSChurn, calcNPS, buildUTMLink,
    calcCompoundInterest, calcMortgageAmortization, calcDTI, calcEmergencyFund, calcNetWorth,
    calcBMI, calcBMR, calcGPA, calcAge, calcDaysBetween, convertUnit
  };
}
