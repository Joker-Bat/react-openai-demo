import { useEffect, useRef, useState } from "react";
import "./App.css";
// import { getOpenAIResponse } from "./openaiService";
import { getGeminiResponse } from "./geminiService";
import MessageBubble from "./components/messageBubble";

function App() {
  const chatContainerRef = useRef();

  const [previousPrompts, setPreviousPrompts] = useState([
    // {
    //   id: "1",
    //   user: "Hello there",
    //   response: "Hello there! How can I help you today?",
    // },
    // {
    //   id: "2",
    //   user: "Hello there",
    //   response: "Hello there! How can I help you today?",
    // },
  ]);

  const [userPrompt, setUserPrompt] = useState("");

  const handlePromptChange = e => {
    setUserPrompt(e.target.value);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [previousPrompts]);

  const getResponse = async e => {
    e.preventDefault();

    // setPreviousPrompts(prev => [
    //   ...prev,
    //   { id: prev.length + 1, user: userPrompt, response: userPrompt },
    // ]);

    // return;

    if (userPrompt !== "") {
      try {
        // const apiResponse = await getOpenAIResponse(prompt);
        const apiResponse = await getGeminiResponse(userPrompt);
        console.log("🚀 ~ apiResponse:", apiResponse);
        setPreviousPrompts(prev => [
          ...prev,
          { id: prev.length + 1, user: userPrompt, response: apiResponse },
        ]);
        setUserPrompt("");
      } catch (error) {
        console.log("🚀 ~ error:", error);
        alert("error occured");
      }
    }
  };

  return (
    <>
      <header>
        <h1>Gemini API</h1>
      </header>

      <main>
        <div className="chatContainer">
          {previousPrompts.map(prompt => {
            return <MessageBubble key={prompt.id} prompt={prompt} />;
          })}
        </div>
        <div ref={chatContainerRef} />
      </main>

      <div className="prompt-container">
        <form onSubmit={getResponse} className="prompt-input">
          <input placeholder="Message Gemini" value={userPrompt} onChange={handlePromptChange} />
          <button type="submit" disabled={userPrompt === ""}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
