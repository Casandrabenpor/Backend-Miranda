"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /info', () => {
    it('returns status code 200 if first name is passed', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/info').send();
        // toEqual recursively checks every field of an object or array.
        expect(res.statusCode).toEqual(200);
    });
    it('returns 401 when call non authorized endpoint', async () => {
        const res = await (0, supertest_1.default)(app_1.default).get('/users').send();
        expect(res.statusCode).toEqual(401);
    });
});
