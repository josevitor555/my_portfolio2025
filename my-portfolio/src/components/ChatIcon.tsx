
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import ChatModal from './ChatModal';
const ChatIcon = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio context when component mounts
        if (typeof window !== 'undefined') {
            // Load the notification sound
            audioRef.current = new Audio('/audios/discord-call-join-sfx.wav');
        }
    }, []);
    useEffect(() => {
        // Play sound when chat opens
        if (isChatOpen && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }, [isChatOpen]);

    return (<>
        <div className="fixed bottom-8 right-8 z-50">
            <button
                className="bg-white border border-gray-600 p-6 cursor-pointer rounded-full shadow-lg flex items-center justify-center w-12 h-12"
                onClick={() => setIsChatOpen(true)}
            >
                <FontAwesomeIcon icon={faComment} className='text-gray-900' />
            </button>
        </div>
        <ChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
    );
};

export default ChatIcon;