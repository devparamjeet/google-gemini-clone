import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
    const [recentChats, setRecentChats] = useState([]);
    const [newChatInput, setNewChatInput] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleNewChat = () => {
        setIsDialogOpen(true);
    };

    const handleDialogSubmit = (e) => {
        e.preventDefault();
        if (newChatInput.trim()) {
            setRecentChats([newChatInput, ...recentChats.slice(0, 4)]);
            setNewChatInput('');
        }
        setIsDialogOpen(false);
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-content">
                {isOpen ? (
                    <>
                        <div className="logo">
                            <span className="menu-icon" onClick={toggleSidebar}>☰</span>
                        </div>
                        <button onClick={handleNewChat} className="new-chat-button">
                            + New chat
                        </button>
                        <div className="recent-chats">
                            <h3>Recent</h3>
                            {recentChats.length > 0 ? (
                                <ul>
                                    {recentChats.map((chat, index) => (
                                        <li key={index}>{chat}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent chats</p>
                            )}
                            {recentChats.length > 0 && (
                                <button className="show-more">Show more</button>
                            )}
                        </div>
                        <div className="sidebar-footer">
                            <div className="footer-buttons">
                                <button className="footer-item">
                                    <span className="icon">💎</span>
                                    <span className="text">Gem manager</span>
                                </button>
                                <button className="footer-item">
                                    <span className="icon">❓</span>
                                    <span className="text">Help</span>
                                </button>
                                <button className="footer-item">
                                    <span className="icon">🕒</span>
                                    <span className="text">Activity</span>
                                </button>
                                <button className="footer-item">
                                    <span className="icon">⚙️</span>
                                    <span className="text">Settings</span>
                                </button>
                            </div>
                            <div className="location-container">
                                <div className="location">
                                    <span className="location-dot">•</span>
                                    <span className="location-text">Jabalpur, Madhya Pradesh, India</span>
                                </div>
                                <div className="location-info">From your IP address • Update location</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="closed-sidebar">
                        <button className="menu-icon" onClick={toggleSidebar}>☰</button>
                        <div className="closed-sidebar-icons">
                            <button className="icon-button" title="New chat">
                                <span className="icon">+</span>
                            </button>
                            <button className="icon-button" title="Gem manager">
                                <span className="icon">💎</span>
                            </button>
                            <button className="icon-button" title="Help">
                                <span className="icon">❓</span>
                            </button>
                            <button className="icon-button" title="Activity">
                                <span className="icon">🕒</span>
                            </button>
                            <button className="icon-button" title="Settings">
                                <span className="icon">⚙️</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h2>Start a new chat</h2>
                        <form onSubmit={handleDialogSubmit}>
                            <input
                                type="text"
                                value={newChatInput}
                                onChange={(e) => setNewChatInput(e.target.value)}
                                placeholder="Enter new chat topic"
                                autoFocus
                            />
                            <div className="dialog-buttons">
                                <button type="button" onClick={() => setIsDialogOpen(false)}>Cancel</button>
                                <button type="submit">Start Chat</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;
