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
const core = __importStar(require("@actions/core"));
const compress_1 = require("./compress");
const decompress_1 = require("./decompress");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
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
                yield (0, compress_1.compress)(source, destination, format);
                console.log(`✅ Compression complete: ${destination}`);
            }
            else if (action === "decompress") {
                yield (0, decompress_1.decompress)(destination, source[0], format);
                console.log(`✅ Decompression complete: ${source[0]}`);
            }
            else {
                core.setFailed("❌ Invalid action. Use 'compress' or 'decompress'.");
            }
        }
        catch (error) {
            core.setFailed(`❌ Error: ${error.message}`);
        }
    });
}
run();
