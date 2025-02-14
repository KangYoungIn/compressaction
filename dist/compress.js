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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compress = compress;
const fs = __importStar(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const path = __importStar(require("path"));
const zlib = __importStar(require("zlib"));
const tar = __importStar(require("tar-stream"));
/**
 * 파일/폴더를 압축하는 함수 (다중 파일 지원)
 * @param source - 압축할 파일 또는 폴더의 경로 (배열 지원)
 * @param destination - 압축된 파일의 경로
 * @param format - 압축 형식 (zip, tar, tar.gz)
 */
function compress(source, destination, format) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
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
                const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
                output.on("close", () => {
                    console.log(`✅ ZIP compression complete: ${destination}`);
                    resolve();
                });
                archive.on("error", (err) => {
                    console.error(`❌ ZIP compression failed: ${err.message}`);
                    reject(err);
                });
                archive.pipe(output);
                // ✅ 상위 폴더 없이 개별 파일 직접 추가
                for (const src of sources) {
                    const srcStat = fs.statSync(src);
                    if (srcStat.isDirectory()) {
                        fs.readdirSync(src).forEach((file) => {
                            const fullPath = path.join(src, file);
                            const relativePath = path.relative(src, fullPath);
                            archive.file(fullPath, { name: relativePath });
                        });
                    }
                    else {
                        archive.file(src, { name: path.basename(src) });
                    }
                }
                archive.finalize();
            }
            // TAR 및 TAR.GZ 압축
            else if (format === "tar" || format === "tar.gz" || ext === ".tar" || ext === ".gz") {
                const pack = tar.pack();
                const addToArchive = (filePath, relativePath) => {
                    const stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        fs.readdirSync(filePath).forEach((file) => addToArchive(path.join(filePath, file), path.join(relativePath, file)));
                    }
                    else {
                        pack.entry({ name: relativePath, size: stat.size }, fs.readFileSync(filePath));
                    }
                };
                // 상위 폴더 없이 개별 파일 직접 추가
                for (const src of sources) {
                    const srcStat = fs.statSync(src);
                    if (srcStat.isDirectory()) {
                        fs.readdirSync(src).forEach((file) => {
                            const fullPath = path.join(src, file);
                            const relativePath = path.relative(src, fullPath);
                            addToArchive(fullPath, relativePath);
                        });
                    }
                    else {
                        addToArchive(src, path.basename(src));
                    }
                }
                pack.finalize();
                if (format === "tar" || ext === ".tar") {
                    pack.pipe(output);
                }
                else if (format === "tar.gz" || ext === ".gz") {
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
    });
}
