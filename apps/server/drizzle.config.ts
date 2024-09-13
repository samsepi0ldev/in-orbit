import { defineConfig } from 'drizzle-kit'

import { env } from '@/main/config/env'

export default defineConfig({
  schema: './src/infra/db/schema.ts',
  dialect: 'postgresql',
  out: './.migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
