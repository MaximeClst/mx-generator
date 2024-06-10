import axios from "axios";
import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await axios.post("/api/generate", { prompt });
      setResponse(result.data.response);
    } catch (error) {
      console.error("Error generating site:", error);
    }
  };
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center py-2">
        <h1 className="text-4xl font-bold mb-4">
          Generate a Website with ChatGPT
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            required
            className="border p-2 mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate
          </button>
        </form>
        {response && (
          <div className="mt-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">Generated Response</h2>
            <pre className="bg-gray-100 p-4 rounded">{response}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
