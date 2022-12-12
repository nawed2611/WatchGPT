// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-D5Y5JazSWxdrlFY5Y9cv41ei",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
type Data = {
  reply: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;
  console.log(query);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `The user is an avid movie watcher and would like to get some movie recommendations similar to ${query.query}`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });

  console.log(response.data);

  res.status(200).json({ reply: response.data.choices[0].text });
}
