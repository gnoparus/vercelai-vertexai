// import { vertex } from "@ai-sdk/google-vertex";
import { streamText } from "ai";
import { GoogleAuth } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();
import { createVertex } from '@ai-sdk/google-vertex';

const keyFilename = './privatekey.json';
const auth = new GoogleAuth({keyFilename});

const vertex = createVertex({
  project: 'impactchatv3', // optional
  location: 'us-central1', // optional
  googleAuthOptions: auth,
});
async function main() {
   
  const result = await streamText({
    model: vertex('gemini-1.5-pro'),
    // prompt: "Invent a new holiday and describe its traditions.",
    prompt: "What is 5+3?",    
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log("Token usage:", await result.usage);
  console.log("Finish reason:", await result.finishReason);
}

main().catch(console.error);
