import Stripe from "stripe"

import { env } from "@/env/server"

export const stripe = new Stripe(env.STRIPE_API_KEY)
