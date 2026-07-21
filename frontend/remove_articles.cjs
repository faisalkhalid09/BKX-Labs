const fs = require('fs');
const path = require('path');
const files = [
    'admt-proportionality-scorer.tsx',
    'ai-prompt-privacy-auditor.tsx',
    'crypto-agility-maturity.tsx',
    'direct-to-chip-liquid-cooling-roi.tsx',
    'esg-carbon-footprint.tsx',
    'nist-fips-203-migration-timeline.tsx',
    'nvidia-blackwell-estimator.tsx',
    'pq-cbom-generator.tsx',
    'zk-proof-validator.tsx'
];
files.forEach(f => {
    let p = path.join(__dirname, 'src/components/tools', f);
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf8');
    // Using simple indexOf string matching to safely remove the block
    let startIndex = c.indexOf('<article className="tu-prose">');
    if (startIndex !== -1) {
        // also include any leading spaces
        let lineStart = c.lastIndexOf('\n', startIndex);
        if (lineStart !== -1 && c.substring(lineStart, startIndex).trim() === '') {
            startIndex = lineStart + 1; // start of line
        }
        let endIndex = c.indexOf('</article>', startIndex);
        if (endIndex !== -1) {
            endIndex += '</article>'.length;
            // also remove trailing newline if it exists
            if (c[endIndex] === '\r') endIndex++;
            if (c[endIndex] === '\n') endIndex++;
            
            c = c.slice(0, startIndex) + c.slice(endIndex);
            fs.writeFileSync(p, c);
            console.log('Processed', f);
        }
    }
});
