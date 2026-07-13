"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Leaf } from "lucide-react";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

const FAQS = [
  {
    question: "Are your products environmentally safe?",
    answer: "Yes! All our products are formulated with readily biodegradable ingredients, free from phosphates and APEs. We hold the prestigious GreenPro certification for our environmental commitment."
  },
  {
    question: "Do you have FDA approval?",
    answer: "Yes, we hold FDA licenses for our hospital-grade disinfectants and our food-service chemistry complies with US FDA GRAS standards."
  },
  {
    question: "Can I use these for industrial laundry?",
    answer: "Absolutely. We offer specialized soda-free and silicate-free laundry formulations designed to save water, electricity, and extend the life of your linens."
  },
  {
    question: "How do I place a bulk order?",
    answer: "For bulk or industrial orders, please reach out to us via the Contact Us page or email support@mamtaassociates.in directly for a customized quote."
  }
];

export function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! 👋 I'm the Mamta Associates Assistant. How can I help you learn about our Green Cleaning Technology today?",
      isBot: true,
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleQuestionClick = (faq: typeof FAQS[0]) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: faq.question, isBot: false }
    ]);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: faq.answer, isBot: true }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-forest px-4 py-4 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Leaf className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Mamta Assistant</h3>
                  <p className="text-xs text-emerald-100">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition hover:bg-white/20"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.isBot
                          ? "bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-sm"
                          : "bg-forest text-white shadow-sm rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Options Area */}
            <div className="border-t border-slate-100 bg-white p-4">
              <p className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Suggested Questions</p>
              <div className="flex flex-wrap gap-2">
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestionClick(faq)}
                    className="inline-flex text-left items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-forest transition hover:bg-emerald-100"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-xl transition-shadow hover:shadow-2xl hover:bg-canopy focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
