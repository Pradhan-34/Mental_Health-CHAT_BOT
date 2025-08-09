import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Simple mock response for now to test the connection
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a response based on the user's message
    let response = ""
    let assessmentData = null

    if (messages.length >= 3) {
      // After a few exchanges, provide an assessment
      response = `I understand you're dealing with some challenges. Based on our conversation, I can see that you're experiencing some stress and anxiety. It's completely normal for students to feel this way, especially with academic pressures and life changes.

Here are some thoughts and recommendations for you:`

      assessmentData = {
        stressLevel: Math.floor(Math.random() * 40) + 30, // 30-70
        anxietyLevel: Math.floor(Math.random() * 35) + 25, // 25-60
        overallWellbeing: Math.floor(Math.random() * 30) + 60, // 60-90
        recommendations: [
          "Practice deep breathing exercises for 5-10 minutes daily",
          "Establish a regular sleep schedule",
          "Try breaking large tasks into smaller, manageable steps",
          "Consider talking to a counselor or trusted friend",
        ],
      }

      if (assessmentData) {
        response += `\n\nASSESSMENT_DATA:${JSON.stringify(assessmentData)}`
      }
    } else {
      // Initial responses to gather more information
      if (messages.length === 1) {
        response = `Thank you for sharing that with me. I'm here to listen and help you understand how you're feeling. Can you tell me more about what's been causing you stress lately? Is it related to school, relationships, or something else?`
      } else {
        response = `I appreciate you opening up about that. It sounds like you're dealing with quite a bit. How has this been affecting your daily life - your sleep, concentration, or relationships with others?`
      }
    }

    // Create a simple text stream response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Send the response in chunks to simulate streaming
        const words = response.split(" ")
        let index = 0

        const sendChunk = () => {
          if (index < words.length) {
            const chunk = words[index] + " "
            const data = `0:${JSON.stringify({ content: chunk })}\n`
            controller.enqueue(encoder.encode(data))
            index++
            setTimeout(sendChunk, 50) // Delay between words
          } else {
            controller.close()
          }
        }

        sendChunk()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
