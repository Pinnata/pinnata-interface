"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = void 0;
const crypto_1 = __importDefault(require("crypto"));
const enc_utils_1 = require("enc-utils");
function randomBytes(length) {
    const buf = crypto_1.default.randomBytes(length);
    return enc_utils_1.bufferToArray(buf);
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=index.js.map