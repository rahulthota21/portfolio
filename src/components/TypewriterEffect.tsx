
'use client';

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
}

export default function TypewriterEffect({ texts, className = '' }: TypewriterEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeDelay = 100; // Milliseconds between each character
    const pauseDelayStart = 1000; // Pause time before deleting
    const pauseDelayEnd = 500; // Pause time before typing again
    const deleteDelay = 50; // Milliseconds between deleting each character

    const currentText = texts[currentTextIndex];

    if (isTyping) {
      // If we haven't reached the full text yet
      if (text.length < currentText.length) {
        const timeoutId = setTimeout(() => {
          setText(currentText.substring(0, text.length + 1));
        }, typeDelay);
        return () => clearTimeout(timeoutId);
      } else {
        // Typing complete, wait before starting to delete
        setIsTyping(false);
        const timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, pauseDelayStart);
        return () => clearTimeout(timeoutId);
      }
    } else {
      // We're in delete mode
      if (text.length === 0) {
        // Deleting complete, move to next text and switch to typing mode
        setIsTyping(true);
        const timeoutId = setTimeout(() => {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }, pauseDelayEnd);
        return () => clearTimeout(timeoutId);
      }

      // Still deleting
      const timeoutId = setTimeout(() => {
        setText(text.substring(0, text.length - 1));
      }, deleteDelay);
      return () => clearTimeout(timeoutId);
    }
  }, [text, currentTextIndex, isTyping, texts]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`inline-block ${className}`}>
      <span>{text}</span>
      <span className={`inline-block w-1 h-8 bg-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </div>
  );
}
