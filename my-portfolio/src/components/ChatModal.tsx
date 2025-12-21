import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
            content: "Olá! Meu nome é Mirandam assistente virtual de @_jose_vitor.dev!",
            sender: "bot",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const closeAudioRef = useRef<HTMLAudioElement | null>(null);
    const messageReceivedAudioRef = useRef<HTMLAudioElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create audio context when component mounts
        if (typeof window !== 'undefined') {
            // Load the close notification sound
            closeAudioRef.current = new Audio('/audios/discord-notification-uncall-fx.wav');
            // Load the message received sound
            messageReceivedAudioRef.current = new Audio('/audios/discord-notification-fx_G_major.wav');
        }
    }, []);

    useEffect(() => {
        // Play sound when chat closes
        if (!open && closeAudioRef.current) {
            closeAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }, [open]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            content: inputValue,
            sender: "user",
        };

        setMessages([...messages, newMessage]);
        setInputValue("");

        try {
            // Call our own backend API
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `API request failed with status ${response.status}`);
            }

            const aiResponseText = data.reply || "Sorry, I couldn't process that request.";

            const aiResponse: Message = {
                id: messages.length + 2,
                content: aiResponseText,
                sender: "bot",
            };

            setMessages((prev) => [...prev, aiResponse]);
            
            // Play sound when receiving a message from the bot
            if (messageReceivedAudioRef.current) {
                messageReceivedAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        } catch (error: any) {
            console.error("Error calling backend API:", error);

            const errorMessage: Message = {
                id: messages.length + 2,
                content: `Error: ${error.message || "Sorry, I encountered an error processing your request. Please try again."}`,
                sender: "bot",
            };

            setMessages((prev) => [...prev, errorMessage]);
            
            // Play sound when receiving an error message from the bot
            if (messageReceivedAudioRef.current) {
                messageReceivedAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Handle click outside to close modal
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-md pointer-events-auto"
                onClick={() => onOpenChange(false)}
            />
            
            {/* Modal positioned at bottom right */}
            <div 
                ref={modalRef}
                className="sm:max-w-[500px] w-full max-h-[70vh] flex flex-col bg-background border border-border rounded-xl shadow-lg z-10 translate-y-0 translate-x-0 pointer-events-auto"
            >
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

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex items-start gap-3",
                                message.sender === "bot" && "flex-row-reverse"
                            )}
                        >
                            {/* Avatar */}
                            <div
                                className={cn(
                                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
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

                            {/* Bubble */}
                            <div
                                className={cn(
                                    "max-w-[75%] px-4 py-3 rounded-2xl",
                                    message.sender === "bot"
                                        ? "bg-muted text-foreground rounded-tl-sm"
                                        : "bg-primary text-primary-foreground rounded-tr-sm"
                                )}
                            >
                                <p className="text-sm leading-relaxed">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                {/* <div className="px-4 py-2 border-t border-border">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                            FAQ
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                            Pricing
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                            Support
                        </Button>
                    </div>
                </div> */}

                {/* Input Area */}
                <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Type your message..."
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
            </div>
        </div>
    );
};

export default ChatModal;