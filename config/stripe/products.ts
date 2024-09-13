import { env } from "@/env/server"

export const TEST_PRODUCT_PRICE_ID =
  env.STRIPE_MODE === "test"
    ? "price_1PqxKfBOp8F3hTg3YUuM0cYM" // Donation in Stripe 'test' mode
    : "price_1PqxoKBOp8F3hTg3b8IIhzKT" // Donation in Stripe 'live' mode
