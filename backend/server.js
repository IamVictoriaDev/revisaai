const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const GROQ_API_KEY = process.env.GROQ_API_KEY

async function chamarGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  })

  const data = await response.json()
  console.log('Resposta Groq:', JSON.stringify(data))

  if (!data.choices || data.choices.length === 0) {
    throw new Error(data.error?.message || 'Resposta inválida do Groq')
  }

  return data.choices[0].message.content
}

app.post('/ai/perguntas', async (req, res) => {
  const { titulo } = req.body
  if (!titulo) return res.status(400).json({ error: 'Título é obrigatório' })

  try {
    const texto = await chamarGroq(
      `Gere exatamente 4 perguntas de revisão simples e diretas sobre o seguinte conteúdo de estudo: "${titulo}".
Responda APENAS com as perguntas, uma por linha, sem numeração, sem introdução e sem explicação.`
    )

    const perguntas = texto.split('\n').map((p) => p.trim()).filter((p) => p.length > 0)
    res.json({ perguntas })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao chamar a IA' })
  }
})

app.post('/ai/explicar', async (req, res) => {
  const { duvida } = req.body
  if (!duvida) return res.status(400).json({ error: 'Dúvida é obrigatória' })

  try {
    const explicacao = await chamarGroq(
      `Explique de forma simples e direta, como se fosse para um estudante universitário: "${duvida}".
Seja breve, use no máximo 4 frases. Não use bullet points.`
    )

    res.json({ explicacao })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao chamar a IA' })
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Backend IA rodando em http://localhost:${PORT}`)
})
