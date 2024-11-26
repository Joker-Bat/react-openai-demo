import { useState } from "react";
import "./App.css";
// import { getOpenAIResponse } from "./openaiService";
import { getGeminiResponse } from "./geminiService";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePromptChange = e => {
    setPrompt(e.target.value);
  };

  const getResponse = async e => {
    e.preventDefault();

    if (prompt !== "") {
      try {
        // const apiResponse = await getOpenAIResponse(prompt);
        const apiResponse = await getGeminiResponse(prompt);
        console.log("🚀 ~ apiResponse:", apiResponse);
        setResponse(apiResponse);
        setPrompt("");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        setResponse("Error occured: ");
      }
    }
  };

  return (
    <form onSubmit={getResponse}>
      <h1>Gemini API</h1>
      <input
        style={{ width: "400px", padding: "5px", fontSize: 20 }}
        value={prompt}
        onChange={handlePromptChange}
      />
      <button type="submit">Submit</button>
      <p>{response}</p>
    </form>
  );
}

export default App;
