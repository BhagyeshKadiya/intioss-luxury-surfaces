const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'products.ts');
let content = fs.readFileSync(filePath, 'utf-8');

function extractCountry(str) {
  if (!str) return "[COUNTRY]";
  const lower = str.toLowerCase();
  if (lower.includes("italy")) return "Italy";
  if (lower.includes("brazil")) return "Brazil";
  if (lower.includes("india") || lower.includes("makrana") || lower.includes("rajasthan")) return "India";
  if (lower.includes("spain")) return "Spain";
  if (lower.includes("turkey") || lower.includes("denizli")) return "Turkey";
  if (lower.includes("south africa")) return "South Africa";
  if (lower.includes("madagascar")) return "Madagascar";
  if (lower.includes("greece")) return "Greece";
  if (lower.includes("iran")) return "Iran";
  if (lower.includes("portugal")) return "Portugal";
  return "[COUNTRY]";
}

// Replace description blocks: description: "..." -> description: "[DESCRIPTION]"
content = content.replace(/description:\s*(?:"(?:[^"\\]|\\.)*"|`[\s\S]*?`)/g, 'description: "[DESCRIPTION]"');

// Remove compressiveStrength lines
content = content.replace(/\s*compressiveStrength:\s*"[^"]*",?/g, '');

// Remove waterAbsorption lines
content = content.replace(/\s*waterAbsorption:\s*"[^"]*",?/g, '');

// Clean quarryLocation to country only
content = content.replace(/quarryLocation:\s*"([^"]*)"/g, (match, loc) => {
  const country = extractCountry(loc);
  return `quarryLocation: "${country}"`;
});

// Clean origin to country only
content = content.replace(/origin:\s*"([^"]*)"/g, (match, loc) => {
  const country = extractCountry(loc);
  return `origin: "${country}"`;
});

// Remove "In stock" from availability
content = content.replace(/availability:\s*"In stock"/g, 'availability: ""');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully sanitized data/products.ts');
