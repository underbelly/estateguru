import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const stagingDir = 'staging';
const productionDir = 'production';

const files = [
  { from: 'style.css', to: 'style.css' },
  { from: 'app.bundle.js', to: 'app.bundle.js' }
];

console.log('🚀 Promoting staging files to production...\n');

let promoted = 0;
let errors = 0;

files.forEach(({ from, to }) => {
  const sourcePath = join(stagingDir, from);
  const destPath = join(productionDir, to);

  if (!existsSync(sourcePath)) {
    console.error(`❌ Error: ${sourcePath} not found`);
    errors++;
    return;
  }

  try {
    copyFileSync(sourcePath, destPath);
    console.log(`✅ Promoted: ${from} → production/${to}`);
    promoted++;
  } catch (error) {
    console.error(`❌ Error copying ${from}:`, error.message);
    errors++;
  }
});

console.log(`\n📦 Promotion complete: ${promoted} file(s) promoted`);

if (errors > 0) {
  console.error(`⚠️  ${errors} error(s) occurred`);
  process.exit(1);
} else {
  console.log('✨ All files promoted successfully!');
  console.log('\n💡 Next steps:');
  console.log('   1. Review the production files');
  console.log('   2. Commit: git add production/');
  console.log('   3. Push: git push origin main');
}
