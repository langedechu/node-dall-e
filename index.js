const fs = require("node:fs");
const dotenv = require("dotenv");
dotenv.config();

const openai = require("openai");
const ai = new openai.OpenAIApi(
  new openai.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const size = process.argv[2] || "512";
const prompt =
  process.argv.slice(3).join(" ") ||
  "a funny black and white cat trapped under a transparent bowl.";

(async () => {
  const request = await ai.createImage({
    prompt: prompt,
    response_format: "b64_json",
    size: `${size}x${size}`,
  });

  const data = request.data.data[0].b64_json;
  const buffer = Buffer.from(data, "base64");
  const filename = `./generated/${Date.now()}_${size}.png`;
  fs.writeFileSync(filename, buffer);

  console.log(`Done. (${filename})`);
})();
