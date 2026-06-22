import fs from 'fs/promises';
import path from 'path';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'frontend', 'src', 'lib', 'tools', 'registry.ts');
const toolsDir = path.join(repoRoot, 'frontend', 'src', 'components', 'tools');

function uniq(arr){return [...new Set(arr)];}

async function readRegistrySlugs(){
  const txt = await fs.readFile(registryPath, 'utf8');
  const slugs = [];
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while((m = re.exec(txt))){ slugs.push(m[1]); }
  return slugs;
}

function extractTextNodes(content){
  const texts = [];
  // capture simple text between tags (avoid JSX expressions containing { or })
  const nodeRe = />\s*([^<{][^<>{}]*)\s*</g;
  let m;
  while((m = nodeRe.exec(content))){
    const t = m[1].trim();
    if(t && !/^[\W_]+$/.test(t)) texts.push(t);
  }
  // capture attribute strings commonly used for visible text
  const attrRe = /(?:aria-label|alt|title|placeholder|label|aria-describedby)=\s*["']([^"']+)["']/g;
  while((m = attrRe.exec(content))){
    const t = m[1].trim(); if(t) texts.push(t);
  }
  // capture JSX literal prop strings that appear in elements (e.g., <button>Text</button>)
  const inlineRe = /<\w+[^>]*>\s*([A-Za-z0-9\-–—'"\s:\(\)\.\,\%\+\/\#]+?)\s*<\//g;
  while((m = inlineRe.exec(content))){
    const t = (m[1]||'').trim(); if(t && !/\{/.test(t)) texts.push(t);
  }
  return uniq(texts);
}

function countWords(s){
  if(!s) return 0;
  const cleaned = s.replace(/\s+/g,' ').trim();
  if(!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

function detectStructure(content){
  const s = content;
  const hasTitle = /<h1\b|className=["'].*tu-title.*["']|className=["'].*title.*["']/i.test(s);
  const hasSubtitle = /className=["'].*tu-subtitle.*["']|<h2\b|<h3\b|className=["'].*subtitle.*["']/i.test(s);
  const hasInputs = /<input\b|<select\b|<textarea\b|className=["'].*tu-option.*["']|type=["']checkbox|type=["']text|<label\b/i.test(s);
  const hasResults = /className=["'].*tu-result.*["']|tu-risk-box|tu-result|<pre\b|<table\b|className=["'].*result.*["']/i.test(s);
  const hasPrimaryCTA = /tu-btn-primary|btn-primary|Download Audit|Calculate|Run|Submit|Primary/i.test(s);
  return { hasTitle, hasSubtitle, hasInputs, hasResults, hasPrimaryCTA };
}

(async function main(){
  try{
    const slugs = await readRegistrySlugs();
    const files = await fs.readdir(toolsDir);
    const tsxFiles = files.filter(f=>/\.tsx?$/.test(f)).map(f=>f);

    const mapping = [];
    for(const slug of slugs){
      const tokens = slug.split(/[-_]/).filter(Boolean);
      let best = null; let bestScore = 0;
      for(const f of tsxFiles){
        const name = f.toLowerCase();
        let score = 0;
        for(const t of tokens){ if(name.includes(t)) score++; }
        if(score > bestScore){ bestScore = score; best = f; }
      }
      mapping.push({slug, file: bestScore>0?path.join(toolsDir,best):null});
    }

    const results = [];
    for(const map of mapping){
      if(!map.file){ results.push({slug:map.slug,file:null, error:'no match'}); continue; }
      const content = await fs.readFile(map.file,'utf8');
      const texts = extractTextNodes(content);
      const joined = texts.join(' ');
      const wordCount = countWords(joined);
      const struct = detectStructure(content);
      results.push({slug:map.slug, file: path.basename(map.file), wordCount, texts, struct});
    }

    const sorted = results.slice().sort((a,b)=> (a.wordCount||0) - (b.wordCount||0));

    const csvLines = ['slug,file,wordCount'];
    for(const r of sorted){ csvLines.push(`${r.slug},${r.file||''},${r.wordCount||0}`); }
    await fs.writeFile(path.join(repoRoot,'tool-wordcounts.csv'), csvLines.join('\n'));

    const md = [];
    md.push('# Tool Word-Count Report (static JSX text)\n');
    md.push('| Rank | Tool Slug | File | Word Count | Title? | Subtitle? | Inputs? | Results? | Primary CTA? |');
    md.push('|---:|---|---|---:|:-:|:-:|:-:|:-:|:-:|');
    let rank=1;
    for(const r of sorted){
      const s = r.struct || {};
      md.push(`| ${rank++} | ${r.slug} | ${r.file||'MISSING'} | ${r.wordCount||0} | ${s.hasTitle? 'Y':'N'} | ${s.hasSubtitle? 'Y':'N'} | ${s.hasInputs? 'Y':'N'} | ${s.hasResults? 'Y':'N'} | ${s.hasPrimaryCTA? 'Y':'N'} |`);
    }
    md.push('\n\n## Per-file extracted strings and counts\n');
    for(const r of sorted){
      md.push(`### ${r.slug} — ${r.file||'MISSING'} — ${r.wordCount||0} words\n`);
      if(r.texts && r.texts.length){
        md.push('Extracted static text:\n');
        for(const t of r.texts.slice(0,200)){
          md.push(`- ${t}`);
        }
      } else {
        md.push('No static text extracted.');
      }
      md.push('\n');
    }
    await fs.writeFile(path.join(repoRoot,'tool-wordcounts.md'), md.join('\n'));

    const summary = [];
    summary.push('# Tool Structure Summary\n');
    for(const r of sorted){
      const s = r.struct || {};
      summary.push(`- ${r.slug} (${r.file||'MISSING'}): Title=${s.hasTitle? 'Y':'N'}, Subtitle=${s.hasSubtitle? 'Y':'N'}, Inputs=${s.hasInputs? 'Y':'N'}, Results=${s.hasResults? 'Y':'N'}, CTA=${s.hasPrimaryCTA? 'Y':'N'}`);
    }
    await fs.writeFile(path.join(repoRoot,'tool-structure-report.md'), summary.join('\n'));

    console.log('Wrote tool-wordcounts.csv, tool-wordcounts.md, tool-structure-report.md');
    console.log('Top-level sorted counts:');
    for(const r of sorted) console.log(`${r.wordCount||0}\t${r.slug}\t${r.file||'MISSING'}`);

  }catch(err){
    console.error('ERROR',err);
    process.exitCode = 2;
  }
})();
