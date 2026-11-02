import { useEffect, useRef, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";

const ChatArea = ({ name,normalChat }) => {
  const API_URL = import.meta.env.VITE_API_URL
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  // Open PDF file selector
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Upload PDF to FastAPI
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in first.");
      }

      const response = await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "File upload failed."
        );
      }

      alert(`${file.name} uploaded successfully!`);
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.message || "Unable to upload the PDF.");
    } finally {
      event.target.value = "";
    }
  };

  // Send message to FastAPI
  const submitHandle = async (e) => {
    e.preventDefault();

    const question = query.trim();

    if (!question || isLoading) return;

    // Display user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setQuery("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in first.");
      }
      let type = ""
      if (normalChat){
        type = "normal"
      }else{
        type = ""
      }
      

      const res = await fetch(
        `${API_URL}/${type}chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to get an answer."
        );
      }

      

      // Extract answer from API response
      const answer =
        data.answer ??
        data.response ??
        data.message;

      if (answer === undefined || answer === null) {
        throw new Error(
          "Answer field not found in API response."
        );
      }

      // Display assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            typeof answer === "string"
              ? answer
              : JSON.stringify(answer, null, 2),
        },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-w-0 flex-1 bg-slate-50 p-3 sm:p-4">
      <div className="flex h-[calc(100vh-88px)] min-h-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {/* Welcome Section */}
        {messages.length === 0 && (
          <>
            <div className="px-5 pt-10 sm:px-10 sm:pt-12">
              <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:h-32 sm:w-32">
                  <span className="text-6xl sm:text-7xl">
                    🤖
                  </span>
                </div>

                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-semibold text-slate-800 sm:text-4xl">
                    Hello{" "}
                    <span className="text-blue-500">
                      {name || "there"}!
                    </span>
                  </h1>

                  <p className="mt-3 text-base leading-7 text-slate-500 sm:text-lg">
                    I'm DocAI, your AI assistant.
                    <br className="hidden sm:block" />
                    Upload your document and ask me
                    anything about it.
                  </p>
                </div>
              </div>
            </div>

           

            {/* Empty State */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                <span className="text-5xl">📄</span>
              </div>

              <h2 className="mt-5 text-lg font-medium text-slate-700 sm:text-xl">
                Upload a PDF or start a new chat
              </h2>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Your documents are safe and private.
              </p>
            </div>
          </>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-6 overflow-y-auto chat px-6 py-6 sm:px-12 lg:px-16">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  message.role === "user"
                    ? "justify-end pr-3 sm:pr-5"
                    : "justify-start pl-3 sm:pl-5"
                }`}
              >
                <div
                  className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-base leading-7  sm:max-w-[80%] sm:px-5 ${
                    message.role === "user"
                      ? "rounded-br-sm bg-blue-500 text-white"
                      : message.isError
                      ? "rounded-bl-sm bg-red-50 text-red-700"
                      : "rounded-bl-sm bg-slate-100 text-slate-800"
                  }`}
                >
                  {message.role === "assistant" && (
                    <p className="mb-2 text-sm font-semibold text-blue-600">
                      DocAI
                    </p>
                  )}

                  {message.content}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex w-full justify-start pl-3 sm:pl-5">
                <div className="rounded-2xl rounded-bl-sm bg-slate-100 px-5 py-3 text-base text-slate-500">
                  <span className="animate-pulse">
                    DocAI is thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Hidden PDF Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Chat Input */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-4 sm:px-7">
          <form
            onSubmit={submitHandle}
            className="flex h-16 w-full items-center rounded-2xl border border-slate-200 bg-white px-2 shadow-sm transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 sm:h-[72px] sm:px-3"
          >
            {/* Upload Button */}
            <button
              type="button"
              onClick={handleFileUpload}
              aria-label="Upload PDF"
              title="Upload PDF"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-blue-500"
            >
              <BsCloudUpload />
            </button>

            <div className="mx-2 h-8 w-px shrink-0 bg-slate-200" />

            {/* Message Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your document..."
              aria-label="Ask a question"
              className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-slate-700 outline-none placeholder:text-sm placeholder:text-slate-400 sm:placeholder:text-base"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              aria-label="Send message"
              title="Send message"
              className="mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-xl text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ➤
            </button>
          </form>

          <p className="mt-2 text-center text-xs text-slate-400">
            DocAI may make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </main>
  );
};




export default ChatArea;