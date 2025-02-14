import * as fs from "fs";
import archiver from "archiver";
import * as path from "path";
import * as zlib from "zlib";
import * as tar from "tar-stream";

/**
 * 파일/폴더를 압축하는 함수 (다중 파일 지원)
 * @param source - 압축할 파일 또는 폴더의 경로 (배열 지원)
 * @param destination - 압축된 파일의 경로
 * @param format - 압축 형식 (zip, tar, tar.gz)
 */
export async function compress(source: string | string[], destination: string, format: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // source가 단일 문자열이면 배열로 변환
    const sources = Array.isArray(source) ? source : [source];

    // 모든 소스가 존재하는지 확인
    for (const src of sources) {
      if (!fs.existsSync(src)) {
        return reject(new Error(`❌ Source path does not exist: ${src}`));
      }
    }

    const ext = path.extname(destination);
    const output = fs.createWriteStream(destination);

    console.log(`📦 Compressing ${sources.join(", ")} to ${destination} (format: ${format})`);

    // ZIP 파일 압축
    if (format === "zip" || ext === ".zip") {
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        console.log(`✅ ZIP compression complete: ${destination}`);
        resolve();
      });
      archive.on("error", (err) => {
        console.error(`❌ ZIP compression failed: ${err.message}`);
        reject(err);
      });

      archive.pipe(output);

      // 다중 파일/폴더 지원
      for (const src of sources) {
        const srcStat = fs.statSync(src);
        if (srcStat.isDirectory()) {
          archive.directory(src, path.basename(src)); // 폴더 추가
        } else {
          archive.file(src, { name: path.basename(src) }); // 개별 파일 추가
        }
      }

      archive.finalize();
    }
    // TAR 및 TAR.GZ 압축
    else if (format === "tar" || format === "tar.gz" || ext === ".tar" || ext === ".gz") {
      const pack = tar.pack();

      const addToArchive = (filePath: string, relativePath: string) => {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          fs.readdirSync(filePath).forEach((file) =>
            addToArchive(path.join(filePath, file), path.join(relativePath, file))
          );
        } else {
          pack.entry({ name: relativePath, size: stat.size }, fs.readFileSync(filePath));
        }
      };

      // 다중 파일/폴더 지원
      for (const src of sources) {
        const baseName = path.basename(src);
        addToArchive(src, baseName);
      }

      pack.finalize();

      if (format === "tar" || ext === ".tar") {
        pack.pipe(output);
      } else if (format === "tar.gz" || ext === ".gz") {
        pack.pipe(zlib.createGzip()).pipe(output);
      }

      output.on("close", () => {
        console.log(`✅ ${format.toUpperCase()} compression complete: ${destination}`);
        resolve();
      });
      output.on("error", (err) => {
        console.error(`❌ TAR compression failed: ${err.message}`);
        reject(err);
      });
    }
    // 지원하지 않는 포맷 처리
    else {
      reject(new Error(`❌ Unsupported format: ${format}`));
    }
  });
}
