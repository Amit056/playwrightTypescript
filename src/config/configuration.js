const { spawn, execSync } = require("child_process");

// Get CLI args (after `node g.js`)
const args = process.argv.slice(2);

// Default grep tag if not passed
const tag = args[0] || "@round1";
const env = args[1] || "aci";

// Function to execute a command and log output in real-time
function executeCommand(command, args) {
  const child = spawn(command, args, { stdio: "inherit", shell: true });

  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code) => {
      code === 0 ? resolve() : reject(new Error(`Command failed with exit code ${code}`));
    });
  });
}

(async () => {
  try {
    console.log(`Running Playwright tests (ENV=${env}, TAG=${tag})`);
    await executeCommand("cross-env", ["ENV=" + env, "npx", "playwright", "test", "--grep", tag]);
  } catch (error) {
    console.error("Test command failed:", error.message);
  } finally {
    console.log("Processing Allure report...");

    try {
      // Step 1: Always generate HTML
      console.log("Generating Allure report...");
      execSync("npm run allure:generate", { stdio: "inherit" });

      // Step 2: Open only if not CI
      if (process.env.CI === "true") {
        console.log("CI detected → static Allure report ready");
      } else {
        console.log("Local run → opening Allure UI");
        execSync("npm run allure:open", { stdio: "inherit" });
      }
    } catch (err) {
      console.error("Allure processing failed:", err.message);
    }
  }
})();
