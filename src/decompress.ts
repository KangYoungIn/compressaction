import * as fs from "fs";
import * as unzipper from "unzipper";
import * as tar from "tar-stream";
import * as zlib from "zlib";
import * as path from "path";

export async function decompress(source: string, destination: string, format: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(source)) {
      return reject(new Error(`❌ Source file does not exist: ${source}`));
    }

    console.log(`📂 Decompressing ${source} to ${destination} (format: ${format})`);

    // ZIP 파일 압축 해제
    if (format === "zip" || path.extname(source) === ".zip") {
      fs.createReadStream(source)
        .pipe(unzipper.Extract({ path: destination }))
        .on("close", () => {
          console.log(`✅ ZIP decompression complete: ${destination}`);
          resolve();
        })
        .on("error", (err) => {
          console.error(`❌ ZIP decompression failed: ${err.message}`);
          reject(err);
        });
    }
    // TAR 및 TAR.GZ 파일 압축 해제
    else if (format === "tar" || format === "tar.gz" || path.extname(source) === ".tar" || path.extname(source) === ".gz") {
      const extract = tar.extract();
      const stream = fs.createReadStream(source);
      
      extract.on("entry", (header, stream, next) => {
        let filePath = path.join(destination, header.name);

        // **destination 하위에 추가 폴더가 생기지 않도록 조정**
        if (filePath.startsWith(destination)) {
          filePath = path.resolve(destination, path.basename(header.name));
        }

        if (header.type === "directory") {
          fs.mkdirSync(filePath, { recursive: true });
          console.log(`📂 Created directory: ${filePath}`);
          next();
        } else {
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
          const fileStream = fs.createWriteStream(filePath);
          stream.pipe(fileStream);
          stream.on("end", () => {
            console.log(`✅ Extracted: ${filePath}`);
            fileStream.close();
            next();
          });
        }
      });

      extract.on("finish", () => {
        console.log(`✅ TAR decompression complete: ${destination}`);
        resolve();
      });

      extract.on("error", (err) => {
        console.error(`❌ TAR decompression failed: ${err.message}`);
        reject(err);
      });

      // 압축 포맷에 따른 스트림 처리
      if (format === "tar" || path.extname(source) === ".tar") {
        stream.pipe(extract);
      } else if (format === "tar.gz" || path.extname(source) === ".gz") {
        stream.pipe(zlib.createGunzip()).pipe(extract);
      }
    }
    // 지원하지 않는 포맷 처리
    else {
      reject(new Error(`❌ Unsupported format: ${format}`));
    }
  });
}
