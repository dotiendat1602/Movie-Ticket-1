import React, { useState, useEffect } from 'react';

export default function Textt({ fullText}) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Initialize to 0

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const typingInterval = setTimeout(() => {
        setText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 80);

      return () => clearTimeout(typingInterval); // Clean up timeout
    }
  }, [currentIndex, fullText]); 
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Sriracha',
        fontWeight: '800',
        fontSize: '20px',
        color: '#fafafa',
        marginTop: '30px',
        whiteSpace: "nowrap"
      }}
    >
      {text}
    </div>
  );
}

