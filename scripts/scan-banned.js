const fs = require('fs');
const path = require('path');

const bannedStrings = [
  'turnkey', 'Top 2%', 'unparalleled', 'zenith', 'Quarried exclusively', 
  'Unlike surface retailers', 'millimeter', 'lifetime durability', 'generational resilience', 
  'Direct quarrier', 'Rare Monumental', 'In stock', '280+', '180+', '40+', '80,000', 
  'Hafeez', 'Macma', 'Silvasa', 'Ahmedabad', 'Worli', 'Malabar Hill', 'BKC', 'Bodakdev', 
  'Gujarat', 'South Mumbai', 'Pooja', 'Staircase', 'Bedroom', 'Hotel & Hospitality', 
  'Commercial / Lobby', 'Outdoor & Landscape', 'Atelier', 'ultra-luxury', 'ultra-premium', 
  'Parent Brand', 'Lorem ipsum', 'Makrana', 'Taj Mahal', '5th-generation', '600 hours', 
  'Sichuan', 'sculptors', '5-axis', '60,000 PSI', '0.1 mm', '16-head', '35-ton', 
  '105 gloss', 'wind-load', 'Fischer', 'SS316', 'quarry bench', 'private reserve', 
  'laser-scan', '38 slabs', 'crystallisation', 'compressive', 'water absorption', 
  'Origin Source', 'Vision to Reality', 'Compressive Strength'
];

const ignoreDirs = new Set(['.next', 'node_modules', '.git', 'qa', 'scripts']);
const ignoreFiles = new Set(['package-lock.json']);
const hits = [];

function searchDir(currentDir) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        searchDir(path.join(currentDir, entry.name));
      }
    } else if (entry.isFile()) {
      if (ignoreFiles.has(entry.name)) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.css', '.md', '.html'].includes(ext)) {
        const filePath = path.join(currentDir, entry.name);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            for (const banned of bannedStrings) {
              const regex = new RegExp(banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
              if (regex.test(line)) {
                hits.push({
                  file: path.relative(process.cwd(), filePath),
                  line: idx + 1,
                  banned,
                  content: line.trim()
                });
              }
            }
          });
        } catch (e) {
          // ignore binary / unreadable
        }
      }
    }
  }
}

searchDir(process.cwd());

let output = `BANNED STRINGS AUDIT - BEFORE\nTotal hits: ${hits.length}\nDate: ${new Date().toISOString()}\n\n`;
hits.forEach(h => {
  output += `[${h.banned}] ${h.file}:${h.line} -> ${h.content}\n`;
});

fs.writeFileSync(path.join(process.cwd(), 'qa', 'banned-before.txt'), output, 'utf-8');
console.log(`Scan completed. Found ${hits.length} hits. Saved to qa/banned-before.txt`);
