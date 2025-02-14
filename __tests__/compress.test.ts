import { compress } from "../src/compress";
import { decompress } from "../src/decompress";
import * as fs from "fs";

describe("Compression and Decompression", () => {
  const testDir = "./__tests__/test-data";
  const zipFile = "./__tests__/test.zip";
  const extractDir = "./__tests__/extracted";

  beforeAll(() => {
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(`${testDir}/test.txt`, "Hello, this is a test file!");
  });

  afterAll(() => {
    fs.rmSync(zipFile, { force: true });
    fs.rmSync(extractDir, { recursive: true, force: true });
  });

  test("Should compress files", async () => {
    await compress(testDir, zipFile, "zip");
    expect(fs.existsSync(zipFile)).toBeTruthy();
  });

  test("Should decompress files", async () => {
    await decompress(zipFile, extractDir, "zip");
    expect(fs.existsSync(`${extractDir}/test.txt`)).toBeTruthy();
  });
});
