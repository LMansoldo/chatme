import { useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'

export function ChatInterface() {
  const { messages, isStreaming, sendMessage } = useChat('')
  const questions = [  "What is Lucas's main tech stack?", "Tell me about his experience at Ília Digital.", "What testing tools does he use?"]
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="chat-interface">
      <><div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <p className="chat-empty-text">
              Ask me anything about Lucas's career, skills, or projects.
            </p>
            <div className="chat-suggestions">
              {questions.map(s => (
                <button
                  key={s}
                  className="suggestion-chip"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isStreaming={isStreaming && i === messages.length - 1} />
        ))}
        <div ref={bottomRef} />
      </div><ChatInput onSend={sendMessage} disabled={isStreaming} /></>
    </div>
  )
}
