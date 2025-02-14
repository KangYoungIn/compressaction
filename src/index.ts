import * as core from "@actions/core";
import { compress } from "./compress";
import { decompress } from "./decompress";

async function run() {
  try {
    const action = core.getInput("action");
    const format = core.getInput("format");
    const source = core.getInput("source");
    const destination = core.getInput("destination");

    if (action === "compress") {
      await compress(source, destination, format);
    } else if (action === "decompress") {
      await decompress(source, destination, format);
    } else {
      throw new Error(`Invalid action: ${action}. Use 'compress' or 'decompress'.`);
    }

    core.info(`✅ ${action} operation completed successfully.`);
  } catch (error) {
    core.setFailed(`Action failed: ${(error as Error).message}`);
  }
}

run();
