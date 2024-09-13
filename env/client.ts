import { createEnv } from "@t3-oss/env-nextjs"
import { env as shared } from "./shared"

export const env = createEnv({
  extends: [shared],
  client: {},
  runtimeEnv: {}
})
