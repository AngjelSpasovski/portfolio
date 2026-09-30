import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
const playwrightCli = path.join(root, "node_modules", "@playwright", "test", "cli.js");
const staticServer = path.join(root, "scripts", "serve-static.mjs");
const testUrl = "http://127.0.0.1:3100/en/";
const staticDirectory = process.env.E2E_STATIC_DIR;

const server = process.env.E2E_BASE_URL ? null : spawn(
  process.execPath,
  staticDirectory
    ? [staticServer, staticDirectory, "3100"]
    : [nextCli, "dev", "--hostname", "127.0.0.1", "--port", "3100"],
  {
    cwd: root,
    env: process.env,
    stdio: "inherit",
    detached: process.platform !== "win32",
  },
);

function waitForExit(child) {
  return new Promise((resolve) => child.once("exit", (code) => resolve(code ?? 1)));
}

async function waitForServer() {
  const deadline = Date.now() + 120_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js test server exited with code ${server.exitCode}.`);
    }

    try {
      const response = await fetch(testUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  throw new Error("Timed out while starting the Next.js test server.");
}

async function stopServer() {
  if (!server?.pid || server.exitCode !== null) return;

  if (process.platform === "win32") {
    const killer = spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    await waitForExit(killer);
    return;
  }

  process.kill(-server.pid, "SIGTERM");
  await Promise.race([
    waitForExit(server),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
}

let exitCode = 1;

try {
  if (server) await waitForServer();
  const tests = spawn(process.execPath, [playwrightCli, "test", ...process.argv.slice(2)], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });
  exitCode = await waitForExit(tests);
} finally {
  await stopServer();
}

process.exit(exitCode);
