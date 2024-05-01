import { URI } from "./uri"
const uri1 = new URI(
  "https",
  {
    userInfo: undefined,
    host: "example.com",
    port: 443,
  },
  "/path",
  { q: ["a", "b"] },
  { y: "aaa" }
)

console.log(uri1.toString())