"use strict";
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3001;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
let currentTimeout = null;
app.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, number } = req.body;
    if (number) {
        number = number.replace(/-/g, "");
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    if (number && !/^\d{6}$/.test(number)) {
        return res.status(400).json({ error: 'Invalid number' });
    }
    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        const data = JSON.parse(fs_1.default.readFileSync(path_1.default.join('src/data.json'), 'utf8'));
        const filteredData = data.filter((user) => {
            return user.email.includes(email) && (!number || user.number === number);
        });
        res.json(filteredData);
    }), 5000);
}));
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port} ...`);
});
