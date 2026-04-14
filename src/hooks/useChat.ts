import { useState, useCallback } from 'react'
import type { Message } from '../types'
import { streamChat } from '../utils/claudeClient'

export function useChat(language: string = '') {
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: Date.now(),
      }

      const assistantId = crypto.randomUUID()
      const assistantMessage: Message = {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, userMessage, assistantMessage])
      setIsStreaming(true)

      const apiMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      await streamChat(apiMessages, language, {
        onToken: token => {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId ? { ...m, content: m.content + token } : m
            )
          )
        },
        onDone: () => {
          setIsStreaming(false)
        },
        onError: error => {
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, content: `⚠ Error: ${error.message}` }
                : m
            )
          )
          setIsStreaming(false)
        },
      })
    },
    [messages, isStreaming, language]
  )

  return { messages, isStreaming, sendMessage }
}
