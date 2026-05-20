const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('No .env.local found');
  process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split('\n');

lines.forEach(line => {
  if (line.includes('CLOUD_')) {
    console.log(`\nLine: ${JSON.stringify(line)}`);
    const parts = line.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    console.log(`Key: "${key}"`);
    console.log(`Val: "${val}"`);
    console.log(`Val Char Codes:`, Array.from(val).map(c => c.charCodeAt(0)));
  }
});
