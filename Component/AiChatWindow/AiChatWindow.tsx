"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const AiChatWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I am your Travel Assistant. How can I help you today? 🌍",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // অটো স্ক্রল লজিক
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const quickSuggestions = [
    {
      label: "Best Hotels 🏨",
      prompt: "Suggest some top-rated hotels for my trip.",
    },
    {
      label: "Top Deals 🔥",
      prompt: "Are there any travel deals or discounts available?",
    },
    {
      label: "Budget Trip 💰",
      prompt: "Plan a low-budget 3-day trip in Bangladesh.",
    },
  ];

  const sendMessage = async (customPrompt?: string) => {
    const messageText = customPrompt || input;
    if (!messageText.trim()) return;

    const userMsg = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://ai-travel-booking-platform-server.onrender.com/api/v1/ai/chat",
        { prompt: messageText },
      );

      const aiMsg = { role: "ai", text: data.data };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I am having trouble connecting. Please check if the server is running. 🛠️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* চ্যাট উইন্ডো */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] shadow-2xl rounded-2xl flex flex-col mb-4 overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* হেডার */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-lg">Travel Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>

          {/* মেসেজ এরিয়া */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* কুইক সাজেশন্স */}
          {!loading && messages.length < 4 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-gray-50">
              {quickSuggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(item.prompt)}
                  className="text-[11px] font-medium bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* ইনপুট এরিয়া */}
          <div className="p-4 bg-white border-t flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your next trip..."
              className="flex-1 bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 text-sm p-3 rounded-xl outline-none transition-all"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className={`p-3 rounded-xl transition-all ${
                input.trim()
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <svg
                fill="currentColor"
                className="w-5 h-5 rotate-90"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
          <div className="text-[10px] text-center pb-2 text-gray-400 bg-white">
            Powered by Gemini AI ✨
          </div>
        </div>
      )}

      {/* মেইন বাটন */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <>
            <span className="text-3xl">💬</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default AiChatWindow;
