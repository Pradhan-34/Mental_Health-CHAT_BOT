"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Home, BookOpen, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface Question {
  id: number
  text: string
  category: "stress" | "anxiety" | "wellbeing"
  options: { value: number; text: string }[]
}

interface AssessmentResult {
  stressLevel: number
  anxietyLevel: number
  overallWellbeing: number
  recommendations: string[]
  riskLevel: "low" | "moderate" | "high"
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<AssessmentResult | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      text: "How often do you feel overwhelmed by your daily responsibilities?",
      category: "stress",
      options: [
        { value: 0, text: "Never" },
        { value: 1, text: "Rarely" },
        { value: 2, text: "Sometimes" },
        { value: 3, text: "Often" },
        { value: 4, text: "Always" },
      ],
    },
    {
      id: 2,
      text: "How well are you managing your academic workload?",
      category: "stress",
      options: [
        { value: 0, text: "Very well" },
        { value: 1, text: "Well" },
        { value: 2, text: "Okay" },
        { value: 3, text: "Poorly" },
        { value: 4, text: "Very poorly" },
      ],
    },
    {
      id: 3,
      text: "How often do you have trouble sleeping due to worry or stress?",
      category: "stress",
      options: [
        { value: 0, text: "Never" },
        { value: 1, text: "Rarely" },
        { value: 2, text: "Sometimes" },
        { value: 3, text: "Often" },
        { value: 4, text: "Always" },
      ],
    },
    {
      id: 4,
      text: "How often do you experience racing thoughts or can't turn your mind off?",
      category: "anxiety",
      options: [
        { value: 0, text: "Never" },
        { value: 1, text: "Rarely" },
        { value: 2, text: "Sometimes" },
        { value: 3, text: "Often" },
        { value: 4, text: "Always" },
      ],
    },
    {
      id: 5,
      text: "How comfortable do you feel in social situations with peers?",
      category: "anxiety",
      options: [
        { value: 0, text: "Very comfortable" },
        { value: 1, text: "Comfortable" },
        { value: 2, text: "Somewhat comfortable" },
        { value: 3, text: "Uncomfortable" },
        { value: 4, text: "Very uncomfortable" },
      ],
    },
    {
      id: 6,
      text: "How satisfied are you with your current life situation?",
      category: "wellbeing",
      options: [
        { value: 4, text: "Very satisfied" },
        { value: 3, text: "Satisfied" },
        { value: 2, text: "Neutral" },
        { value: 1, text: "Dissatisfied" },
        { value: 0, text: "Very dissatisfied" },
      ],
    },
    {
      id: 7,
      text: "How often do you engage in activities you enjoy?",
      category: "wellbeing",
      options: [
        { value: 4, text: "Daily" },
        { value: 3, text: "Several times a week" },
        { value: 2, text: "Weekly" },
        { value: 1, text: "Rarely" },
        { value: 0, text: "Never" },
      ],
    },
    {
      id: 8,
      text: "How would you rate your energy levels throughout the day?",
      category: "wellbeing",
      options: [
        { value: 4, text: "Very high" },
        { value: 3, text: "High" },
        { value: 2, text: "Moderate" },
        { value: 1, text: "Low" },
        { value: 0, text: "Very low" },
      ],
    },
    {
      id: 9,
      text: "How often do you worry about future events or outcomes?",
      category: "anxiety",
      options: [
        { value: 0, text: "Never" },
        { value: 1, text: "Rarely" },
        { value: 2, text: "Sometimes" },
        { value: 3, text: "Often" },
        { value: 4, text: "Always" },
      ],
    },
    {
      id: 10,
      text: "Overall, how would you rate your mental health right now?",
      category: "wellbeing",
      options: [
        { value: 4, text: "Excellent" },
        { value: 3, text: "Good" },
        { value: 2, text: "Fair" },
        { value: 1, text: "Poor" },
        { value: 0, text: "Very poor" },
      ],
    },
  ]

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const stressQuestions = questions.filter((q) => q.category === "stress")
    const anxietyQuestions = questions.filter((q) => q.category === "anxiety")
    const wellbeingQuestions = questions.filter((q) => q.category === "wellbeing")

    const stressScore = stressQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    const anxietyScore = anxietyQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    const wellbeingScore = wellbeingQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)

    const maxStressScore = stressQuestions.length * 4
    const maxAnxietyScore = anxietyQuestions.length * 4
    const maxWellbeingScore = wellbeingQuestions.length * 4

    const stressLevel = Math.round((stressScore / maxStressScore) * 100)
    const anxietyLevel = Math.round((anxietyScore / maxAnxietyScore) * 100)
    const overallWellbeing = Math.round((wellbeingScore / maxWellbeingScore) * 100)

    const averageDistress = (stressLevel + anxietyLevel) / 2
    const riskLevel: "low" | "moderate" | "high" =
      averageDistress <= 30 ? "low" : averageDistress <= 60 ? "moderate" : "high"

    const recommendations = [
      "Practice deep breathing exercises for 5-10 minutes daily",
      "Establish a regular sleep schedule",
      "Try breaking large tasks into smaller, manageable steps",
      "Consider talking to a counselor or trusted friend",
      "Engage in regular physical activity",
      "Practice mindfulness or meditation",
    ]

    setResults({
      stressLevel,
      anxietyLevel,
      overallWellbeing,
      recommendations,
      riskLevel,
    })
    setShowResults(true)
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

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const isAnswered = answers[currentQ.id] !== undefined

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">MindfulAssess</span>
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete</h1>
            <p className="text-gray-600">Here are your personalized mental health insights</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Mental Health Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getRiskLevelColor(results.riskLevel)}`}>
                      {results.riskLevel.charAt(0).toUpperCase() + results.riskLevel.slice(1)} Risk Level
                    </Badge>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Stress Level</span>
                      <Badge
                        variant="outline"
                        className={`${getStressLevelColor(results.stressLevel)} text-white border-0`}
                      >
                        {getStressLevelText(results.stressLevel)}
                      </Badge>
                    </div>
                    <Progress value={results.stressLevel} className="h-3" />
                    <p className="text-xs text-gray-600 mt-1">{results.stressLevel}%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Anxiety Level</span>
                      <Badge
                        variant="outline"
                        className={`${getStressLevelColor(results.anxietyLevel)} text-white border-0`}
                      >
                        {getStressLevelText(results.anxietyLevel)}
                      </Badge>
                    </div>
                    <Progress value={results.anxietyLevel} className="h-3" />
                    <p className="text-xs text-gray-600 mt-1">{results.anxietyLevel}%</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Wellbeing</span>
                      <Badge variant="outline" className="bg-green-500 text-white border-0">
                        {results.overallWellbeing}%
                      </Badge>
                    </div>
                    <Progress value={results.overallWellbeing} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/resources">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Explore Self-Help Resources
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setShowResults(false)
                  setCurrentQuestion(0)
                  setAnswers({})
                  setResults(null)
                }}
                variant="outline"
                className="bg-transparent"
              >
                Retake Assessment
              </Button>
              <Link href="/chat">
                <Button className="bg-green-600 hover:bg-green-700">Start Chat Assessment</Button>
              </Link>
            </div>

            {results.riskLevel === "high" && (
              <Card className="border-red-200 bg-red-50 mt-6">
                <CardContent className="pt-6">
                  <p className="text-red-800 font-medium mb-2">Need Immediate Support?</p>
                  <p className="text-red-700 text-sm mb-4">
                    Your results suggest you may benefit from professional support. Don't hesitate to reach out.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Crisis Text Line:</strong> Text HOME to 741741
                    </p>
                    <p>
                      <strong>National Suicide Prevention Lifeline:</strong> 988
                    </p>
                    <p>
                      <strong>Campus Counseling:</strong> Contact your student services
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">MindfulAssess</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQ.id] === option.value
                      ? "border-green-500 bg-green-50 text-green-900"
                      : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        answers[currentQ.id] === option.value ? "border-green-500 bg-green-500" : "border-gray-300"
                      }`}
                    >
                      {answers[currentQ.id] === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button onClick={prevQuestion} disabled={currentQuestion === 0} variant="outline" className="bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button onClick={nextQuestion} disabled={!isAnswered} className="bg-green-600 hover:bg-green-700">
            {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
            {currentQuestion === questions.length - 1 ? (
              <CheckCircle className="ml-2 h-4 w-4" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
