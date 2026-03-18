"use client";

import { ArrowExpand01Icon } from "@typebot.io/ui/icons/ArrowExpand01Icon";
import { ArrowShrink02Icon } from "@typebot.io/ui/icons/ArrowShrink02Icon";
import { Cancel01Icon } from "@typebot.io/ui/icons/Cancel01Icon";
import { HelpCircleIcon } from "@typebot.io/ui/icons/HelpCircleIcon";
import { LoaderCircleIcon } from "@typebot.io/ui/icons/LoaderCircleIcon";
import { RepeatIcon } from "@typebot.io/ui/icons/RepeatIcon";
import { SentIcon } from "@typebot.io/ui/icons/SentIcon";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getPageContext, type PageContext } from "@/lib/help-context";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PanelSize {
  width: number;
  height: number;
}

const STORAGE_KEY = "helpChatPanelSize";
const DEFAULT_SIZE: PanelSize = { width: 400, height: 560 };
const MIN_SIZE: PanelSize = { width: 320, height: 400 };

const loadSavedSize = (): PanelSize => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return DEFAULT_SIZE;
};

const saveSize = (size: PanelSize) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(size));
  } catch {
    // ignore
  }
};

export const HelpChat = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelSize, setPanelSize] = useState<PanelSize>(DEFAULT_SIZE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasRestoredSession, setHasRestoredSession] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPanelSize(loadSavedSize());
  }, []);

  const pageContext: PageContext = useMemo(
    () => getPageContext(router.pathname),
    [router.pathname],
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || hasRestoredSession) return;
    const restoreSession = async () => {
      try {
        const res = await fetch("/api/help-chat/sessions");
        const data = await res.json();
        if (data.session) {
          setSessionId(data.session.id);
          setMessages(data.session.messages);
        }
      } catch {
        // silently fail
      }
      setHasRestoredSession(true);
    };
    restoreSession();
  }, [isOpen, hasRestoredSession]);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = panelSize.width;
      const startHeight = panelSize.height;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = startX - moveEvent.clientX;
        const deltaY = startY - moveEvent.clientY;
        const newWidth = Math.max(MIN_SIZE.width, startWidth + deltaX);
        const newHeight = Math.max(MIN_SIZE.height, startHeight + deltaY);
        setPanelSize({ width: newWidth, height: newHeight });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setPanelSize((current) => {
          saveSize(current);
          return current;
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [panelSize],
  );

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/help-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-10),
          pageContext: {
            pageName: pageContext.pageName,
            description: pageContext.description,
          },
          sessionId,
        }),
      });

      const data = await res.json();
      if (data.sessionId) setSessionId(data.sessionId);

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response ?? "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the help assistant right now.",
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const startNewConversation = () => {
    setSessionId(null);
    setMessages([]);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0d7377] text-white shadow-lg hover:bg-[#0a5c5f] transition-all hover:scale-105 flex items-center justify-center"
        title="Help"
      >
        <HelpCircleIcon className="w-7 h-7" />
      </button>
    );
  }

  const panelStyle = isExpanded
    ? {}
    : { width: panelSize.width, height: panelSize.height };

  const panelClassName = isExpanded
    ? "fixed inset-6 z-50"
    : "fixed bottom-6 right-6 z-50";

  return (
    <div
      ref={panelRef}
      className={`${panelClassName} bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in-0 duration-200`}
      style={panelStyle}
    >
      {/* Resize handle (top-left corner) — only when not expanded */}
      {!isExpanded && (
        <button
          type="button"
          onMouseDown={handleResizeStart}
          className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10 group bg-transparent border-none p-0 appearance-none"
          title="Drag to resize"
          aria-label="Resize panel"
        >
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-gray-300 group-hover:border-[#0d7377] transition-colors rounded-tl-sm" />
        </button>
      )}

      <div className="flex items-center justify-between px-4 py-3 bg-[#0d7377] text-white rounded-t-2xl">
        <div className="flex items-center gap-2 min-w-0">
          <HelpCircleIcon className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-sm truncate">Help Assistant</span>
          <span className="text-xs opacity-70 truncate">
            — {pageContext.pageName}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={startNewConversation}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="New conversation"
          >
            <RepeatIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={toggleExpanded}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ArrowShrink02Icon className="w-4 h-4" />
            ) : (
              <ArrowExpand01Icon className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Close"
          >
            <Cancel01Icon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto px-4 py-3 space-y-3 ${isResizing ? "select-none" : ""}`}
      >
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 mt-2">
            <p className="text-sm text-gray-500 text-center">
              Hi! I can help you with anything on this page. Try asking:
            </p>
            <div className="flex flex-col gap-2">
              {pageContext.suggestedQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}-${msg.content.slice(0, 20)}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                isExpanded ? "max-w-[70%]" : "max-w-[85%]"
              } ${
                msg.role === "user"
                  ? "bg-[#0d7377] text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-xl rounded-bl-sm">
              <LoaderCircleIcon className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7377] focus:border-transparent"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-[#0d7377] text-white hover:bg-[#0a5c5f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <SentIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
