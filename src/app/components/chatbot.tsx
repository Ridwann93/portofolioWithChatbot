'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/chatbot.module.css';

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // AUTO SCROLL REF
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AUTO SCROLL SAAT PESAN BERTAMBAH
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg: Message = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '❌ Gagal terhubung ke server' },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* TOMBOL BULAT */}
      {!open && (
        <button
          className={styles.chatButton}
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}

      {/* BOX CHATBOT */}
      {open && (
        <div className={styles.chatbotWrapper}>
          {/* HEADER */}
          <div className={styles.header}>
            Chatbot
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* PESAN */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.from === 'user' ? styles.user : styles.bot
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* INDIKATOR BOT MENGETIK */}
            {isTyping && (
              <div className={`${styles.message} ${styles.bot}`}>
                Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT + BUTTON */}
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              placeholder="send message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

            <button
              className={styles.sendButton}
              onClick={sendMessage}
              disabled={isTyping}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
