import React from 'react';
import './Home.css';
import userAvatar from '../../assets/user-avatar.svg';
import aiAvatar from '../../assets/ai-avatar.svg';
import ChatInput from '../ChatInput/ChatInput';
import ReactMarkdown from 'react-markdown';

function Home({ messages, onSubmit, isLoading }) {
    return (
        <div className="chat-wrapper">
            <div className="chat-container">
                {messages.map((message, index) => (
                    <div key={index} className={`message-row ${message.user ? 'user' : 'ai'}`}>
                        <div className="message-avatar">
                            <img src={message.user ? userAvatar : aiAvatar} alt={`${message.user ? 'User' : 'AI'} Avatar`} className="avatar-img" />
                        </div>
                        <div className="message-content">
                            <div className="message-header">
                                <span className="message-sender">{message.user ? 'You' : 'AI'}</span>
                                <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <div className="message-text">
                                {message.user ? (
                                    message.text
                                ) : (
                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message-row ai">
                        <div className="message-avatar">
                            <img src={aiAvatar} alt="AI Avatar" className="avatar-img" />
                        </div>
                        <div className="message-content">
                            <div className="message-text loading-animation">
                                <span>.</span><span>.</span><span>.</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="chat-bottom-padding"></div>
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
}

export default Home;
