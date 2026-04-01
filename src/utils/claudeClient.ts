export interface StreamCallbacks {
  onToken: (token: string) => void
  onDone: () => void
  onError: (error: Error) => void
}

interface GeminiChunk {
  candidates?: {
    content?: {
      parts?: { text?: string }[]
    }
  }[]
}

export async function streamChat(
  messages: { role: string; content: string }[],
  language: string,
  callbacks: StreamCallbacks
): Promise<void> {
  let response: Response

  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
    })
  } catch (err) {
    callbacks.onError(err instanceof Error ? err : new Error(String(err)))
    return
  }

  if (!response.ok) {
    callbacks.onError(new Error(`API error: ${response.status}`))
    return
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim()
          try {
            const parsed = JSON.parse(data) as GeminiChunk
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) callbacks.onToken(text)
          } catch {
            // ignore malformed SSE chunks
          }
        }
      }
    }
  } catch (err) {
    callbacks.onError(err instanceof Error ? err : new Error(String(err)))
    return
  }

  callbacks.onDone()
}

export async function tailorCV(
  jobDescription: string,
  language: string
): Promise<string> {
  const response = await fetch('/api/tailor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription, language }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json() as { text: string }
  if (!data.text) throw new Error('Empty response from server')
  return data.text
}
