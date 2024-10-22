import React, { useState } from 'react';
import { FaPaperclip, FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatInput.css';

function ChatInput({ onSubmit = () => { } }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    let googleApiKey = "AIzaSyBFI_DYR89mzFzkbyTaG-fPeHDlJlizjV4";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const genAI = new GoogleGenerativeAI(googleApiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const result = await model.generateContent(input);
            const response = await result.response;
            const text = response.text();

            if (typeof onSubmit === 'function') {
                onSubmit(input, text);  // Pass both input and response to onSubmit
            } else {
                console.warn('onSubmit prop is not a function');
            }
            setInput('');
        } catch (error) {
            console.error('Error generating content:', error);
            setError('An error occurred while generating content. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Gemini..."
                    className="chat-input"
                    disabled={isLoading}
                />
                <button type="button" className="chat-input-button upload-button" disabled={isLoading}>
                    <FaPaperclip />
                </button>
                <button type="button" className="chat-input-button mic-button" disabled={isLoading}>
                    <FaMicrophone />
                </button>
                <button type="submit" className="chat-input-button submit-button" disabled={isLoading}>
                    <FaPaperPlane />
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="chat-input-disclaimer">Gemini can make mistakes. Please verify important information.</p>
        </div>
    );
}

export default ChatInput;
