/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.VITE_GEMINI_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chat = model.startChat();

export const getGeminiResponse = async prompt => {
  const result = await chat.sendMessage(prompt);
  console.log("🚀 ~ result:", result);
  return result.response.text();
};
