import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
  path: './.env'
})

if (typeof process.env.DATABASE_URL !== 'string') {
  throw new Error('Please set your DATABASE_URL');
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});