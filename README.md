# DevOps-Cloud-Interview-Preparation

This repository now includes a simple Node.js + Express sample app to demonstrate DevOps fundamentals, API testing, and GitHub Actions CI.

## Features
- Health check endpoint
- Basic math utilities API
- Jest + Supertest test suite
- GitHub Actions CI workflow

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

## Test

```bash
npm test
```

## Validate health

```bash
curl http://localhost:3000/health
```
