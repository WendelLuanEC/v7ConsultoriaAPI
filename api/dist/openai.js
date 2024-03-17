"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY // A chave da API é uma string
});
exports.default = openai;
