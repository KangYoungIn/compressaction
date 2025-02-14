import * as core from "@actions/core";
import { compress } from "./compress";
import { decompress } from "./decompress";

async function run() {
  try {
    const action = core.getInput("action");
    const format = core.getInput("format");
    const source = core.getInput("source").split(",");
    const destination = core.getInput("destination");

    console.log(`🔹 Action: ${action}`);
    console.log(`📦 Format: ${format}`);
    console.log(`📂 Source: ${source}`);
    console.log(`🎯 Destination: ${destination}`);

    if (action === "compress") {
      await compress(source, destination, format);
      console.log(`✅ Compression complete: ${destination}`);
    } else if (action === "decompress") {
      await decompress(destination, source[0], format);
      console.log(`✅ Decompression complete: ${source[0]}`);
    } else {
      core.setFailed("❌ Invalid action. Use 'compress' or 'decompress'.");
    }
  } catch (error: any) {
    core.setFailed(`❌ Error: ${error.message}`);
  }
}

run();
