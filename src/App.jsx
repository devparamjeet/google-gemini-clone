import { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import './App.css'

let googleApiKey = "AIzaSyBFI_DYR89mzFzkbyTaG-fPeHDlJlizjV4";
// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(googleApiKey);

function App() {
  const [messages, setMessages] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (input) => {
    const timestamp = new Date().toISOString()

    // Immediately add user message
    setMessages(prevMessages => [
      ...prevMessages,
      { text: input, user: true, timestamp }
    ])

    // Set loading state
    setIsLoading(true)

    try {
      // Prepare conversation history
      const conversationHistory = messages.map(msg => 
        `${msg.user ? 'Human' : 'AI'}: ${msg.text}`
      ).join('\n');

      // Append the new user input
      const fullPrompt = `${conversationHistory}\nHuman: ${input}\nAI:`;

      // Call the Gemini API with the full conversation history
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const aiResponse = response.text();

      // Add AI response
      setMessages(prevMessages => [
        ...prevMessages,
        { text: aiResponse, user: false, timestamp: new Date().toISOString() }
      ])
    } catch (error) {
      console.error('Error getting AI response:', error)
      // Add an error message to the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your request. Please try again.", user: false, timestamp: new Date().toISOString() }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Header />
        <Home messages={messages} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default App
