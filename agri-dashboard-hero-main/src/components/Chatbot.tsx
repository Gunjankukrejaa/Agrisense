import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAgriResponse } from "../../utils/agricultureResponses";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const { t, currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your agriculture assistant. I can help you with crop management, tasks, disease detection, crop recommendations, weather info, and budget planning. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isExpanded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateAgriResponse(input);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card 
      className={cn(
        "fixed right-6 bottom-6 bg-white overflow-hidden transition-all duration-300 ease-in-out border shadow-lg",
        isExpanded 
          ? "w-96 h-[500px] rounded-xl" 
          : "w-14 h-14 rounded-full cursor-pointer chatbot-pulse"
      )}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-3 bg-green-600 text-white">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <h3 className="text-sm font-medium">Agriculture Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-green-700 p-1 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              ✕
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[85%] p-3 rounded-lg text-sm",
                  message.sender === "user"
                    ? "ml-auto bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about crops, diseases, weather, or budget..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-sm"
              />
              <Button 
                size="icon" 
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-green-600 text-white">
          <Bot size={20} />
        </div>
      )}
    </Card>
  );
};

export default Chatbot;
