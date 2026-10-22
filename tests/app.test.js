const request = require("supertest");
const app = require("../src/app");

describe("DevOps sample Node.js API", () => {
  test("GET /health returns service status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("devops-cloud-interview-preparation");
  });

  test("GET /api/status returns application metadata", async () => {
    const response = await request(app).get("/api/status");

    expect(response.statusCode).toBe(200);
    expect(response.body.app).toBe("DevOps Cloud Interview Preparation");
    expect(response.body.version).toBe("1.0.0");
  });

  test("GET /api/math/add returns correct sum", async () => {
    const response = await request(app).get("/api/math/add").query({ left: 12, right: 8 });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(20);
  });

  test("POST /api/math/compute supports add operation", async () => {
    const response = await request(app).post("/api/math/compute").send({ operation: "add", values: [1, 2, 3, 4] });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(10);
  });

  test("POST /api/math/compute supports subtract operation", async () => {
    const response = await request(app).post("/api/math/compute").send({ operation: "subtract", values: [10, 3, 2] });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(5);
  });

  test("POST /api/math/compute supports multiply operation", async () => {
    const response = await request(app).post("/api/math/compute").send({ operation: "multiply", values: [2, 3, 4] });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(24);
  });

  test("POST /api/math/compute supports isPrime operation", async () => {
    const response = await request(app).post("/api/math/compute").send({ operation: "isPrime", values: [17] });

    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(true);
  });

  test("POST /api/math/compute rejects unsupported operation", async () => {
    const response = await request(app).post("/api/math/compute").send({ operation: "divide", values: [10, 2] });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Unsupported operation.");
  });
});
