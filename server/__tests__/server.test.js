import request from 'supertest';
import app from '../server.js';

describe("check live", () => {
    it("return server runing", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Server is running with HTTPS!")
    })
})