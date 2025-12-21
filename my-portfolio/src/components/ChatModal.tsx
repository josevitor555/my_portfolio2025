import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    content: string;
    sender: "bot" | "user";
}

interface ChatModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ChatModal = ({ open, onOpenChange }: ChatModalProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "Olá! Meu nome é Miranda, assistente virtual de @_jose_vitor.dev!",
            sender: "bot",
        },
    ]);

    const [inputValue, setInputValue] = useState("");

    const closeAudioRef = useRef<HTMLAudioElement | null>(null);
    const messageReceivedAudioRef = useRef<HTMLAudioElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            closeAudioRef.current = new Audio(
                "/audios/discord-notification-uncall-fx.wav"
            );
            messageReceivedAudioRef.current = new Audio(
                "/audios/discord-notification-fx_G_major.wav"
            );
        }
    }, []);

    useEffect(() => {
        if (!open && closeAudioRef.current) {
            closeAudioRef.current
                .play()
                .catch((e) => console.log("Audio play failed:", e));
        }
    }, [open]);
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            content: inputValue,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: inputValue }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao chamar a API");
            }

            const botMessage: Message = {
                id: messages.length + 2,
                content: data.reply || "Não consegui processar sua mensagem.",
                sender: "bot",
            };

            setMessages((prev) => [...prev, botMessage]);

            messageReceivedAudioRef.current?.play().catch(() => { });
        } catch (error: any) {
            const errorMessage: Message = {
                id: messages.length + 2,
                content: `Erro: ${error.message}`,
                sender: "bot",
            };

            setMessages((prev) => [...prev, errorMessage]);
            messageReceivedAudioRef.current?.play().catch(() => { });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onOpenChange]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md pointer-events-auto"
                        onClick={() => onOpenChange(false)}
                    />

                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.10, ease: "easeOut" }}
                        className="sm:max-w-[500px] w-full max-h-[70vh] flex flex-col bg-background border border-border rounded-xl shadow-lg z-10 pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                <span className="font-semibold">Miranda Assistant</span>
                            </div>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="p-1 rounded-full hover:bg-muted transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex items-start gap-3",
                                        message.sender === "bot" && "flex-row-reverse"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center",
                                            message.sender === "bot"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground"
                                        )}
                                    >
                                        {message.sender === "bot" ? (
                                            <Bot className="w-4 h-4" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>

                                    <div
                                        className={cn(
                                            "max-w-[75%] px-4 py-3 rounded-2xl text-sm",
                                            message.sender === "bot"
                                                ? "bg-muted rounded-tl-sm"
                                                : "bg-primary text-primary-foreground rounded-tr-sm"
                                        )}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Digite sua mensagem..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="flex-1"
                                />
                                <Button onClick={handleSend} size="icon">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ChatModal;
