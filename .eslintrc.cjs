/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  settings: {
    tailwindcss: {
      callees: ["className", "clsx", "cn"]
    }
  }
}
