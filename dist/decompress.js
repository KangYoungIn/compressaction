"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompress = decompress;
const fs = __importStar(require("fs"));
const unzipper = __importStar(require("unzipper"));
const tar = __importStar(require("tar-stream"));
const zlib = __importStar(require("zlib"));
const path = __importStar(require("path"));
function decompress(source, destination, format) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    }
                    else {
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
                }
                else if (format === "tar.gz" || path.extname(source) === ".gz") {
                    stream.pipe(zlib.createGunzip()).pipe(extract);
                }
            }
            // 지원하지 않는 포맷 처리
            else {
                reject(new Error(`❌ Unsupported format: ${format}`));
            }
        });
    });
}
