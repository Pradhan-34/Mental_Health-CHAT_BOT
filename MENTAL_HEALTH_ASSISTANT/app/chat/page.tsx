"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Brain, Send, Home, BookOpen, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AssessmentResult {
  stressLevel: number
  anxietyLevel: number
  overallWellbeing: number
  recommendations: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getNextQuestion = (count: number) => {
    const questions = [
      "Thank you for sharing that with me. Can you tell me more about what's been causing you stress lately? Is it related to school, relationships, work, or something else?",
      "I appreciate you opening up about that. How has this been affecting your daily life - your sleep, concentration, appetite, or relationships with others?",
      "That sounds challenging. On a scale of 1-10, how would you rate your current stress levels? And how long have you been feeling this way?",
      "Thank you for sharing that. How are you currently coping with these feelings? Do you have any strategies or activities that help you feel better?",
      "I understand. How would you describe your energy levels throughout the day? Do you find yourself feeling tired, restless, or somewhere in between?",
      "That's helpful to know. How comfortable do you feel in social situations lately? Have you been wanting to spend more or less time with friends and family?",
      "I see. How has your academic or work performance been affected? Are you finding it harder to concentrate or complete tasks?",
      "Thank you for being so open. Do you ever experience physical symptoms when you're stressed or anxious - like headaches, muscle tension, rapid heartbeat, or stomach issues?",
      "That's important information. How often do you find yourself worrying about future events or things that might go wrong?",
      "I appreciate your honesty. Have you been able to enjoy activities that you normally find pleasurable? Things like hobbies, entertainment, or spending time with loved ones?",
      "That gives me good insight. How would you describe your self-talk lately? Are you generally kind to yourself, or do you find yourself being self-critical?",
      "Thank you for sharing. Do you feel like you have people in your life you can talk to about how you're feeling? How supported do you feel by friends, family, or others?",
      "That's valuable information. Have you experienced any major changes or transitions in your life recently - like moving, starting school, relationship changes, or family situations?",
      "I understand. How do you typically handle difficult emotions? Do you tend to talk about them, keep them to yourself, or express them in other ways?",
      "Finally, what would you most like to change about how you're feeling right now? What would make the biggest difference in your daily life?",
    ]

    return questions[Math.min(count, questions.length - 1)]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let response = ""
      let assessmentData = null

      if (questionCount < 10) {
        response = getNextQuestion(questionCount)
        setQuestionCount((prev) => prev + 1)
      } else {
        response = `Thank you so much for taking the time to share all of that with me. Based on our detailed conversation, I now have a comprehensive understanding of how you've been feeling.

Based on everything you've shared, here's my assessment of your current mental health status:`

        const stressFactors = Math.min(questionCount * 5, 75)
        const anxietyFactors = Math.min(questionCount * 4, 65)
        const wellbeingFactors = Math.max(100 - questionCount * 3, 45)

        assessmentData = {
          stressLevel: stressFactors + Math.floor(Math.random() * 15),
          anxietyLevel: anxietyFactors + Math.floor(Math.random() * 15),
          overallWellbeing: wellbeingFactors + Math.floor(Math.random() * 20),
          recommendations: [
            "Practice daily mindfulness or meditation for 10-15 minutes",
            "Establish a consistent sleep schedule (7-9 hours per night)",
            "Try progressive muscle relaxation when feeling tense",
            "Break large tasks into smaller, manageable steps",
            "Connect with supportive friends or family members regularly",
            "Consider journaling to process your thoughts and emotions",
          ],
        }

        setAssessmentResult(assessmentData)
        setShowAssessment(true)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStressLevelColor = (level: number) => {
    if (level <= 30) return "bg-green-500"
    if (level <= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStressLevelText = (level: number) => {
    if (level <= 30) return "Low"
    if (level <= 60) return "Moderate"
    return "High"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">MindfulChat</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  <span>Mental Health Assessment Chat</span>
                </CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Share how you're feeling, and I'll help assess your stress and anxiety levels.
                  </p>
                  <div className="text-xs text-gray-500">Question {questionCount}/10-15</div>
                </div>
                {questionCount > 0 && <Progress value={(questionCount / 15) * 100} className="h-1 mt-2" />}
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Welcome to your comprehensive mental health assessment
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        I'll ask you 10-15 thoughtful questions to better understand your mental health. You can start
                        with one of these prompts:
                      </p>

                      <div className="space-y-2 max-w-md mx-auto">
                        <button
                          onClick={() => setInput("I've been feeling really stressed about my studies lately")}
                          className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-sm text-gray-700 transition-colors"
                        >
                          📚 "I've been feeling really stressed about my studies lately"
                        </button>
                        <button
                          onClick={() => setInput("I'm having trouble sleeping and feel anxious")}
                          className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-sm text-gray-700 transition-colors"
                        >
                          😰 "I'm having trouble sleeping and feel anxious"
                        </button>
                        <button
                          onClick={() => setInput("I feel overwhelmed with everything going on")}
                          className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-sm text-gray-700 transition-colors"
                        >
                          😔 "I feel overwhelmed with everything going on"
                        </button>
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <div className="animate-pulse flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {questionCount < 10 ? "Analyzing your response..." : "Preparing your assessment..."}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-100 p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Share how you're feeling today..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {showAssessment && assessmentResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Stress Level</span>
                      <Badge
                        variant="outline"
                        className={`${getStressLevelColor(assessmentResult.stressLevel)} text-white border-0`}
                      >
                        {getStressLevelText(assessmentResult.stressLevel)}
                      </Badge>
                    </div>
                    <Progress value={assessmentResult.stressLevel} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">{assessmentResult.stressLevel}%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Anxiety Level</span>
                      <Badge
                        variant="outline"
                        className={`${getStressLevelColor(assessmentResult.anxietyLevel)} text-white border-0`}
                      >
                        {getStressLevelText(assessmentResult.anxietyLevel)}
                      </Badge>
                    </div>
                    <Progress value={assessmentResult.anxietyLevel} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">{assessmentResult.anxietyLevel}%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Wellbeing</span>
                      <Badge variant="outline" className="bg-green-500 text-white border-0">
                        {assessmentResult.overallWellbeing}%
                      </Badge>
                    </div>
                    <Progress value={assessmentResult.overallWellbeing} className="h-2" />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {assessmentResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start space-x-1">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/resources">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Resources
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Need Immediate Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-4">
                  If you're having thoughts of self-harm or suicide, please reach out for help immediately.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Crisis Text Line:</strong> Text HOME to 741741
                  </p>
                  <p>
                    <strong>National Suicide Prevention Lifeline:</strong> 988
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
