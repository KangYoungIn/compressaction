import { compress } from "../src/compress";
import { decompress } from "../src/decompress";
import * as fs from "fs";
import * as path from "path";

describe("Compression and Decompression", () => {
  const testDir = "./__tests__/test-data";
  const zipFile = "./__tests__/test.zip";
  const extractDir = "./__tests__/extracted";

  beforeAll(() => {
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(path.join(testDir, "test.txt"), "Hello, this is a test file!");
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

    // 🔹 압축 해제된 파일 목록을 확인하여 디버깅
    console.log("📂 Extracted files:", fs.readdirSync(extractDir));

    // 🔹 올바른 경로 찾기 (압축 해제 시 폴더가 추가되는지 체크)
    let extractedFilePath = path.join(extractDir, "test.txt");
    if (!fs.existsSync(extractedFilePath)) {
      extractedFilePath = path.join(extractDir, "test-data", "test.txt"); // 혹시 내부에 폴더가 생겼는지 확인
    }

    // 🔹 최종적으로 파일이 존재하는지 확인
    expect(fs.existsSync(extractedFilePath)).toBeTruthy();
  });
});
