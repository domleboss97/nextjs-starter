import { createEnv } from "@t3-oss/env-nextjs"
import { env as shared } from "./shared"
import { z } from "zod"

export const env = createEnv({
  extends: [shared],
  server: {
    OPENAI_API_KEY: z.string(),
    ANTHROPIC_API_KEY: z.string(),

    // Stripe
    STRIPE_API_KEY: z.string(),
    STRIPE_MODE: z.enum(["test", "live"]).default("test")
  },
  experimental__runtimeEnv: process.env
})
