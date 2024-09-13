import { TEST_PRODUCT_PRICE_ID } from "@/config/stripe/products"
import { stripe } from "@/lib/stripe/client"
import { fullURL } from "@/lib/url-fns/full-url"
import { redirect } from "next/navigation"
import { Button } from "./ui/button"
import { Donut } from "lucide-react"

async function createSession() {
  "use server"

  let sessionUrl: string | null = null

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: TEST_PRODUCT_PRICE_ID,
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: fullURL("/thanks").toString(),
      cancel_url: fullURL().toString()
    })
    sessionUrl = session.url
  } catch (error) {
    console.error("Error creating checkout session", error)
  }

  if (sessionUrl) {
    redirect(sessionUrl)
  }
}

export function DonateButton() {
  return (
    <form action={createSession}>
      <Button
        className="flex-row items-center gap-2 text-muted-foreground hover:text-foreground"
        variant="link"
        type="submit"
      >
        <Donut className="size-4" />
        <span className="block">Buy me a donut</span>
      </Button>
    </form>
  )
}
