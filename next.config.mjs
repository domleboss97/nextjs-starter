import createJiti from "jiti"

const jiti = createJiti(new URL(import.meta.url).pathname)

// Import env here to validate during build. Using jiti we can import .ts files
jiti("./env/server")
jiti("./env/client")

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
