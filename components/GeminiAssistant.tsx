import React, { useState, useRef, useEffect } from 'react';
// GoogleGenAI import removed
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Loader2, Mic, MicOff, Volume2, VolumeX, Maximize2, Minimize2, Phone, MessageCircle, PhoneOff } from 'lucide-react';
import { ChatMessage } from '../types';
import { PORTFOLIO_CONTEXT } from '../data/portfolioContext';

type InteractionMode = 'SELECTION' | 'CHAT' | 'CALL';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<InteractionMode>('SELECTION');
  const modeRef = useRef<InteractionMode>('SELECTION');

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Namaste. I am Sunni's AI Assistant. How may I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Speech Recognition Setup
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const isProcessingRef = useRef(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Sync ref with state
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    // Load voices
    const updateVoices = () => {
      if (typeof window !== 'undefined') {
        setVoices(window.speechSynthesis.getVoices());
      }
    };

    updateVoices();
    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (interimTranscript) {
            setInput(interimTranscript);
          }

          if (finalTranscript) {
            setInput(finalTranscript);
            handleSend(finalTranscript);
          }
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          // Auto-restart listening ONLY if in Call Mode and NOT processing and NOT speaking
          if (modeRef.current === 'CALL' && !isProcessingRef.current && !synthesisRef.current?.speaking) {
            // Small delay to prevent instant loop if errors occur
            // setTimeout(() => recognitionRef.current.start(), 500);
          }
        };
        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, input]);

  const speak = (text: string) => {
    if (!synthesisRef.current) return;

    if (synthesisRef.current.speaking) {
      synthesisRef.current.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);

    // Select Indian Accent Voice if available
    const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Hindi'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.15;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // In Call Mode, auto-listen after AI finishes speaking
      if (modeRef.current === 'CALL') {
        setTimeout(() => {
          if (!isListening && !isProcessingRef.current) {
            toggleListening();
          }
        }, 500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    synthesisRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Interrupt AI if it's speaking
      if (synthesisRef.current?.speaking) {
        synthesisRef.current.cancel();
        setIsSpeaking(false);
      }
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const stopSpeaking = () => {
    synthesisRef.current?.cancel();
    setIsSpeaking(false);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isProcessingRef.current) return;

    isProcessingRef.current = true;
    // Don't clutter UI with messages in Call Mode (optional, but keeping them for history is good)
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setIsTyping(true);

    try {
      // API Key is now handled by the serverless function at /api/proxy
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization header is added by the proxy
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            { role: "user", content: textToSend }
          ],
          temperature: 0.7,
          top_p: 1,
          max_tokens: 1024,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I could not generate a response.";

      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
      speak(aiResponse);
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.message || JSON.stringify(error);
      setMessages(prev => [...prev, { role: 'assistant', text: `Error: ${errorMsg}.` }]);
      speak("I encountered an error. Please check your connection.");
    } finally {
      setIsTyping(false);
      isProcessingRef.current = false;
    }
  };

  const startCall = () => {
    setMode('CALL');
    // Small delay to allow transition then start listening
    setTimeout(() => {
      speak("Hello! I am ready to talk. What would you like to know?");
    }, 500);
  };

  const endCall = () => {
    stopSpeaking();
    if (isListening) recognitionRef.current?.stop();
    setMode('SELECTION');
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-end justify-end">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="chat-button"
            layoutId="chat-box"
            onClick={() => { setIsOpen(true); setIsExpanded(true); setMode('SELECTION'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-10 right-10 pointer-events-auto group relative bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 group-hover:opacity-100 transition-opacity opacity-0" />
            <MessageSquare className="w-6 h-6 relative z-10" />
            <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-20" />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            layoutId="chat-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: isExpanded ? '100%' : '350px',
              height: isExpanded ? '100%' : '600px',
              borderRadius: isExpanded ? '0px' : '16px',
              right: isExpanded ? 0 : '40px',
              bottom: isExpanded ? 0 : '40px'
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              borderRadius: '50%;' // Morph back to circle shape on exit
            }}
            className={`pointer-events-auto bg-[#050505] border border-white/10 flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/10 ${isExpanded ? 'absolute inset-0' : 'absolute bottom-10 right-10 w-[350px] md:w-[400px] h-[600px] rounded-2xl'}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 relative overflow-hidden shrink-0 z-50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-400 animate-pulse' : 'bg-green-500'}`} />
                <div>
                  <span className="heading-font text-[10px] font-bold tracking-widest uppercase block text-white">Sunni AI</span>
                  <span className="text-[9px] text-white/40 block">Portfolio Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                {(mode !== 'SELECTION' || !isExpanded) && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors hidden md:block"
                  >
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>
                )}
                <button onClick={() => { setIsOpen(false); setIsExpanded(false); endCall(); }} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* SELECTION MODE */}
            {mode === 'SELECTION' && (
              <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />

                <div className="text-center space-y-2 z-10">
                  <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">How would you like to interact?</h2>
                  <p className="text-white/40">Choose your preferred way to talk with Sunni's Assistant</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl z-10">
                  <button
                    onClick={() => setMode('CHAT')}
                    className="flex-1 group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 p-8 rounded-3xl transition-all hover:scale-105 flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <MessageCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-1">Text Chat</h3>
                      <p className="text-sm text-white/50">Type or speak messages. View history.</p>
                    </div>
                  </button>
                  <button
                    onClick={startCall}
                    className="flex-1 group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 p-8 rounded-3xl transition-all hover:scale-105 flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Phone className="w-8 h-8 text-purple-400" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-1">Live Call</h3>
                      <p className="text-sm text-white/50">Hands-free voice conversation with Avatar.</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* CALL MODE */}
            {mode === 'CALL' && (
              <div className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black z-0" />
                <div className="relative z-10 flex flex-col items-center gap-8">
                  <div className="relative">
                    {isSpeaking && (
                      <>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_200ms]" />
                      </>
                    )}
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative">
                      <img src="/ai-avatar.png" alt="AI Avatar" className="w-full h-full object-cover" />
                      {isListening && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="w-1 bg-white animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s`, height: '20px' }} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {isSpeaking ? "Sunni AI is talking..." : isListening ? "Listening..." : "Thinking..."}
                    </h3>
                    <p className="text-white/40 text-sm max-w-md mx-auto line-clamp-2">
                      {input || (messages.length > 0 ? messages[messages.length - 1].text : "Say 'Hello' to start")}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6 z-20">
                  <button
                    onClick={toggleListening}
                    className={`p-6 rounded-full transition-all ${isListening ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                  <button
                    onClick={endCall}
                    className="p-6 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all transform hover:scale-105"
                  >
                    <PhoneOff size={24} />
                  </button>
                </div>
              </div>
            )}

            {/* CHAT MODE */}
            {mode === 'CHAT' && (
              <>
                <div
                  ref={scrollRef}
                  data-lenis-prevent
                  className={`flex-grow overflow-y-auto space-y-6 scrollbar-hide relative overscroll-contain ${isExpanded ? 'p-10 md:p-20' : 'p-6'}`}
                >
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
                  <div className={`${isExpanded ? 'max-w-4xl mx-auto w-full' : 'w-full'} space-y-6`}>
                    {isExpanded && (
                      <button onClick={() => setMode('SELECTION')} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 text-sm uppercase tracking-widest">
                        ← Back to Modes
                      </button>
                    )}
                    {messages.map((msg, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-sm relative z-10 ${msg.role === 'user'
                          ? 'bg-white text-black font-medium rounded-tr-none'
                          : 'bg-white/10 text-white/90 border border-white/5 rounded-tl-none'
                          } ${isExpanded ? 'text-lg p-6 max-w-[80%]' : 'max-w-[85%]'}`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t border-white/10 bg-white/5 relative z-20 shrink-0">
                  <div className={`${isExpanded ? 'max-w-3xl mx-auto' : 'w-full'}`}>
                    <div className={`flex items-center gap-2 bg-black/50 border border-white/10 rounded-full focus-within:border-white/30 transition-colors ${isExpanded ? 'p-4 pl-6' : 'p-2 pl-4'}`}>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={isListening ? "Listening..." : "Ask questions about Sunni..."}
                        className={`flex-grow bg-transparent focus:outline-none text-white placeholder:text-white/20 h-full ${isExpanded ? 'text-lg' : 'text-sm'}`}
                        disabled={isListening}
                      />
                      <button
                        onClick={toggleListening}
                        className={`rounded-full transition-all flex items-center justify-center ${isListening
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'hover:bg-white/10 text-white/50 hover:text-white'
                          } ${isExpanded ? 'p-4' : 'p-2'}`}
                      >
                        {isListening ? <MicOff size={isExpanded ? 24 : 18} /> : <Mic size={isExpanded ? 24 : 18} />}
                      </button>
                      <button
                        onClick={() => handleSend()}
                        disabled={isTyping || (!input.trim() && !isListening)}
                        className={`bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center ${isExpanded ? 'p-4' : 'p-2'}`}
                      >
                        <Send size={isExpanded ? 20 : 16} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
