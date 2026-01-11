const { spawn } = require('child_process');

// Get CLI args (after `node g.js`)
const args = process.argv.slice(2);

// Default grep tag if not passed
const tag = args[0] || '@smoke';
const env= args[1] || 'qa';

// Playwright command
const testCmd = `cross-env ENV=${env} npx playwright test --grep ${tag}`;

// Post test command
const postTestCmd = `npm run posttest`;

// Function to execute a command and log output in real-time
function executeCommand(command, args) {
  const child = spawn(command, args, { stdio: 'inherit', shell: true });

  return new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code) => {
      code === 0 ? resolve() : reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

(async () => {
  try {
    console.log(`Running: ${testCmd}`);
    await executeCommand('cross-env', [`ENV=${env}`, 'npx', 'playwright', 'test', '--grep', tag]);
  } catch (error) {
    console.error('Test command failed:', error.message);
  } finally {
    console.log('Running posttest (Allure report)...');
    try {
      await executeCommand('npm', ['run', 'posttest']);
    } catch (postErr) {
      console.error('Posttest failed:', postErr.message);
    }
  }
})();


