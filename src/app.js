const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { add, subtract, multiply, isPrime } = require("./services/calculator");

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "devops-cloud-interview-preparation",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/status", (req, res) => {
  res.status(200).json({
    app: "DevOps Cloud Interview Preparation",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    node: process.version,
  });
});

app.get("/api/math/add", (req, res) => {
  const left = Number(req.query.left);
  const right = Number(req.query.right);

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return res.status(400).json({
      error: "Query parameters left and right must be numbers.",
    });
  }

  return res.status(200).json({
    operation: "add",
    left,
    right,
    result: add(left, right),
  });
});

app.post("/api/math/compute", (req, res) => {
  const { operation, values } = req.body || {};

  if (!operation || !Array.isArray(values) || values.length === 0) {
    return res.status(400).json({
      error: "Body must include operation and a non-empty values array.",
    });
  }

  if (!["add", "subtract", "multiply", "isPrime"].includes(operation)) {
    return res.status(400).json({ error: "Unsupported operation." });
  }

  if (operation === "isPrime") {
    const input = Number(values[0]);

    if (Number.isNaN(input)) {
      return res.status(400).json({ error: "isPrime expects a numeric value." });
    }

    return res.status(200).json({
      operation,
      input,
      result: isPrime(input),
    });
  }

  const numericValues = values.map((value) => Number(value));

  if (numericValues.some((value) => Number.isNaN(value))) {
    return res.status(400).json({ error: "All values must be numeric." });
  }

  let result;

  if (operation === "add") {
    result = numericValues.reduce((acc, value) => add(acc, value), 0);
  }

  if (operation === "subtract") {
    result = numericValues.reduce((acc, value) => subtract(acc, value), numericValues[0]);
  }

  if (operation === "multiply") {
    result = numericValues.reduce((acc, value) => multiply(acc, value), 1);
  }

  return res.status(200).json({ operation, values: numericValues, result });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

module.exports = app;
