import type { Message } from '../../types'

interface Props {
  message: Message
  isStreaming: boolean
}

export function MessageBubble({ message, isStreaming }: Props) {
  return (
    <div className={`message message--${message.role}`}>
      <div className="message-content">
        <span className="message-text">{message.content}</span>
        {isStreaming && message.role === 'assistant' && (
          <span className="cursor-blink" aria-hidden="true">▋</span>
        )}
      </div>
    </div>
  )
}
