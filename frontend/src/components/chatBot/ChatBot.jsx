import React, { useEffect, useRef, useState } from 'react'
import './chatBot.css'
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
export default function ChatBot({closeClick}) {
    const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
      const handleInputChange = (e) => {
        setInput(e.target.value); // Cập nhật giá trị input khi người dùng nhập
      };
      const handleSendMessage = async () => {
        if (input.trim() === '') return;
    
        const userMessage = { role: 'user', parts: [{ text: input }] };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        var postMessage = input
        setInput(''); // Xóa nội dung input sau khi gửi
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chatBot`, { message: postMessage });
          console.log(response)
          const botMessage = { role: 'model', parts: [{ text: response.data }] };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
          console.error('Error sending message:', error);
        }
    
      };
  return (
    <div className="chatbot-container">
        <div className="chatbot-box">
          <div className="chatbot-header">
            <div style={{display: 'flex',gap: '10px',alignItems: 'center', height: 'auto', minHeight :'50px', paddingLeft: '10px'}}>
            <img src='/6098491.png' style={{
              width:'40px',
              height: '40px',
            }}></img>
            <div>Trợ lí ảo Lilias</div>
            </div>

            
            <CloseIcon style={{marginLeft: '22%', cursor: 'pointer', position: 'absolute', right: '10px'}} onClick={closeClick}></CloseIcon>
            </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'chatbot-message user' : 'chatbot-message model'}>
                {message.parts.map((part, i) => (
                  <p key={i}>{part.text}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{display: 'flex', justifyContent: 'start', position:'relative', height:'45px', backgroundColor:'#e7e2e6', padding:'5px', gap:'0px', borderRadius: '0 0 5px 5px'}}>
          <input className='input__text'
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập tin nhắn..." />
          <button onClick={handleSendMessage}>
             <SendIcon sx={{width:'20px'}}></SendIcon>
          </button>
          </div>
        </div>
    </div>
  )
}
