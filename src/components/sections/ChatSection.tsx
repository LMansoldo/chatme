import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { MagicBento } from '../ui/MagicBento'
import { ChatInput } from '../Chat/ChatInput'
import { useChat } from '../../hooks/useChat'
import type { Message } from '../../types'
import { TopBar } from '../TopBar/TopBar'

function ChatMessage({ message, isStreaming }: { message: Message; isStreaming: boolean }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-msg chat-msg--${message.role}`}>
      <div className="chat-msg-bubble">
        {isUser ? (
          <span>{message.content}</span>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown>{message.content}</ReactMarkdown>
            {isStreaming && <span className="cursor-blink" aria-hidden="true">▋</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export function ChatSection() {
  const { t, i18n } = useTranslation()
  const { messages, isStreaming, sendMessage } = useChat(i18n.language)
  const bottomRef = useRef<HTMLDivElement>(null)

  const suggestions = t('chat.suggestions', { returnObjects: true }) as string[]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ChatSection.tsx (trecho modificado)
  return (
    <section id="chat" className="section">
      <div className="section-header">
        <h2 className="section-title">{t('chat.title')}</h2>
        <p className="section-desc">{t('chat.description')}</p>
      </div>

      <MagicBento className="chat-bento" enableSpotlight enableBorderGlow enableTilt={false}>
        <TopBar />
        <div className="chat-messages-wrap">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <p className="chat-empty-hint">{t('chat.emptyHint')}</p>
              <div className="chat-suggestions">
                {suggestions.map(s => (
                  <button
                    key={s}
                    className="suggestion-chip"
                    onClick={() => sendMessage(s)}
                    disabled={isStreaming}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-messages-list">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isStreaming={isStreaming && i === messages.length - 1}
                />
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
        <ChatInput
          onSend={sendMessage}
          disabled={isStreaming}
          placeholder={t('chat.placeholder')}
        />
      </MagicBento>
    </section>
  );
}
