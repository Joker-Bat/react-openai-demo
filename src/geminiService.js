/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.VITE_GEMINI_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
  Give html as output use only tags that I can put it inside 'p' tag. 
  use 'strong' tag to highlight and use 'ul' tag to represent list. 
  use 'br' tags to make a space between content when needed
  Format the response to make it easy to read. 
  don't include html wrapper`
});

const chat = model.startChat();

export const getGeminiResponse = async prompt => {
  const result = await chat.sendMessage(prompt);
  console.log("🚀 ~ result:", result);
  return result.response.text();
};
