import "dotenv/config";
import Groq from "groq-sdk";

let groqClient;

const getGroq = () => (groqClient ??= new Groq());

export const generateEditInstruction = async ({
  feedback,
  currentPrompt,
}) => {
  const systemPrompt = `
You are a UI/UX design refinement assistant.

Your job is to convert a user's short website design feedback
into a clear, specific instruction that can be directly given
to Google Stitch to edit an EXISTING website screen.

Rules:

1. Understand the user's intended change.
2. Use the existing Stitch prompt as context.
3. Preserve the existing website structure, content, functionality,
   and visual direction unless the user explicitly asks to change them.
4. Make the instruction specific enough for Stitch to execute.
5. If the user asks to modify one section, explicitly say that
   other sections should remain unchanged.
6. Do not invent new business requirements.
7. Do not explain your reasoning.
8. Return ONLY the final Stitch edit instruction.
`;

  const userPrompt = `
CURRENT STITCH PROMPT:
${currentPrompt}

USER FEEDBACK:
${feedback}

Convert the user's feedback into a precise edit instruction
for the existing Stitch screen.
`;

  const completion = await getGroq().chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const instruction =
    completion.choices?.[0]?.message?.content?.trim();

  if (!instruction) {
    throw new Error(
      "Groq did not generate an edit instruction"
    );
  }

  return instruction;
};