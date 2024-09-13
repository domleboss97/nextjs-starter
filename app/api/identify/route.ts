import { env } from "@/env/server"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createId } from "@paralleldrive/cuid2"
import { del, put, PutBlobResult } from "@vercel/blob"
import { waitUntil } from "@vercel/functions"
import { generateText } from "ai"
import { NextResponse, type NextRequest } from "next/server"
import { getUrMomPrompt } from "@/lib/prompts/ur-mom-prompt"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const image = formData.get("image") as File

  const start = Date.now()

  let result: PutBlobResult
  try {
    result = await put(`images/${createId()}`, image, {
      access: "public",
      contentType: image.type
    })
  } catch (error) {
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 })
  }

  const end = Date.now()
  console.log(`Image upload took ${end - start}ms`)

  const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY
  })

  const { text: imageDescription } = await generateText({
    model: openai("gpt-4o-mini"),
    temperature: 1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What is in this image?"
          },
          {
            type: "image",
            image: result.url
          }
        ]
      }
    ]
  })

  const anthropic = createAnthropic({
    apiKey: env.ANTHROPIC_API_KEY
  })

  const { text: urMomResponse } = await generateText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    temperature: 1.0,
    messages: [
      {
        role: "user",
        content: getUrMomPrompt(imageDescription)
      }
    ]
  })

  waitUntil(del(result.url))
  return NextResponse.json({ description: urMomResponse })
}
