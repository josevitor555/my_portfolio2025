import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
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
            content: "Olá! Como posso ajudar você hoje?",
            sender: "bot",
        },
    ]);
    const [inputValue, setInputValue] = useState("");

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
        } catch (error: any) {
            console.error("Error calling backend API:", error);

            const errorMessage: Message = {
                id: messages.length + 2,
                content: `Error: ${error.message || "Sorry, I encountered an error processing your request. Please try again."}`,
                sender: "bot",
            };

            setMessages((prev) => [...prev, errorMessage]);
        }
    }; const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0">
                <DialogHeader className="px-6 py-4 border-b border-border">
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        Chat Assistant
                    </DialogTitle>
                </DialogHeader>

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
                <div className="px-4 py-2 border-t border-border">
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
                </div>

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
            </DialogContent>
        </Dialog>
    );
};

export default ChatModal;