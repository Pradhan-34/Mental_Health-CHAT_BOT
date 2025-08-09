"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Home,
  BookOpen,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Target,
  Heart,
  Volume2,
  VolumeX,
  CheckCircle,
} from "lucide-react"

export default function DeepBreathingPage() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const exercise = {
    title: "Deep Breathing Exercises",
    duration: "5-10 minutes",
    difficulty: "Beginner",
    category: "Stress Management",
    description: "Simple breathing techniques to reduce stress and anxiety in minutes",
    instructions: [
      "Find a comfortable seated position with your back straight",
      "Place one hand on your chest and one on your belly",
      "Breathe in slowly through your nose for 4 counts",
      "Hold your breath for 4 counts",
      "Exhale slowly through your mouth for 6 counts",
      "Repeat this cycle 5-10 times",
      "Focus on the hand on your belly rising and falling",
    ],
    benefits: [
      "Reduces stress hormones in the body",
      "Lowers heart rate and blood pressure",
      "Improves focus and concentration",
      "Can be done anywhere, anytime",
      "Activates the body's relaxation response",
      "Helps manage anxiety and panic attacks",
    ],
    guidedSteps: [
      {
        text: "Get Ready",
        duration: 30,
        audioText:
          "Find a comfortable position and place your hands as instructed. Close your eyes if you feel comfortable doing so.",
      },
      {
        text: "Breathe In",
        duration: 4,
        audioText: "Slowly breathe in through your nose for 4 counts. Feel your belly rise.",
      },
      {
        text: "Hold",
        duration: 4,
        audioText: "Hold your breath gently for 4 counts. Stay relaxed.",
      },
      {
        text: "Breathe Out",
        duration: 6,
        audioText: "Slowly exhale through your mouth for 6 counts. Feel the tension leaving your body.",
      },
    ],
    tips: [
      "Start with shorter sessions and gradually increase duration",
      "Practice regularly for best results",
      "Don't force your breathing - let it flow naturally",
      "If you feel dizzy, return to normal breathing",
      "Try to practice at the same time each day",
      "Use this technique before stressful situations",
    ],
  }

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            nextStep()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeRemaining])

  const startExercise = () => {
    setIsActive(true)
    setCurrentStep(0)
    setTimeRemaining(exercise.guidedSteps[0].duration)
    setIsCompleted(false)
    speakText(exercise.guidedSteps[0].audioText)
  }

  const pauseExercise = () => {
    setIsActive(false)
    window.speechSynthesis.cancel()
  }

  const resumeExercise = () => {
    setIsActive(true)
    if (audioEnabled) {
      speakText(exercise.guidedSteps[currentStep].audioText)
    }
  }

  const resetExercise = () => {
    setIsActive(false)
    setCurrentStep(0)
    setTimeRemaining(0)
    setIsCompleted(false)
    window.speechSynthesis.cancel()
  }

  const nextStep = () => {
    if (currentStep < exercise.guidedSteps.length - 1) {
      const nextStepIndex = currentStep + 1
      setCurrentStep(nextStepIndex)
      setTimeRemaining(exercise.guidedSteps[nextStepIndex].duration)
      if (audioEnabled) {
        speakText(exercise.guidedSteps[nextStepIndex].audioText)
      }
    } else {
      setIsActive(false)
      setIsCompleted(true)
      window.speechSynthesis.cancel()
      if (audioEnabled) {
        speakText("Great job! You've completed the exercise. Take a moment to notice how you feel.")
      }
    }
  }

  const speakText = (text: string) => {
    if (audioEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Navigation */}
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/resources">
          <Button variant="outline" className="mb-6 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>
        </Link>

        {/* Exercise Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-100 text-green-800">{exercise.category}</Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{exercise.title}</h1>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {exercise.duration}
            </div>
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              {exercise.difficulty}
            </div>
          </div>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{exercise.description}</p>
        </div>

        {/* Interactive Exercise Player */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-center text-xl">Guided Exercise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  Step {currentStep + 1} of {exercise.guidedSteps.length}
                </span>
                <span className="text-sm font-medium">{isActive ? formatTime(timeRemaining) : "Ready to start"}</span>
              </div>
              <Progress
                value={
                  isActive
                    ? ((exercise.guidedSteps[currentStep].duration - timeRemaining) /
                        exercise.guidedSteps[currentStep].duration) *
                      100
                    : 0
                }
                className="h-2"
              />
            </div>

            {/* Current Step */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isCompleted ? "Exercise Complete!" : exercise.guidedSteps[currentStep].text}
              </h3>
              <p className="text-base text-gray-600">
                {isCompleted
                  ? "Great job! Take a moment to notice how you feel."
                  : exercise.guidedSteps[currentStep].audioText}
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!isActive && !isCompleted && (
                <Button onClick={startExercise} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Start Exercise
                </Button>
              )}

              {isActive && (
                <Button onClick={pauseExercise} variant="outline" className="bg-transparent">
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}

              {!isActive && currentStep > 0 && !isCompleted && (
                <Button onClick={resumeExercise} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              )}

              <Button onClick={resetExercise} variant="outline" className="bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>

              <Button onClick={() => setAudioEnabled(!audioEnabled)} variant="outline" className="bg-transparent">
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <div className="text-center bg-green-100 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">Exercise Completed!</h3>
                <p className="text-base text-green-700">
                  You've successfully completed the {exercise.title} exercise. How do you feel?
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2 text-green-600" />
                Step-by-Step Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-base text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-green-600" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-base text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Helpful Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercise.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600 mt-1">💡</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Continue Your Mental Health Journey</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources">
                <Button variant="outline" className="bg-transparent">
                  Try Another Exercise
                </Button>
              </Link>
              <Link href="/assessment">
                <Button className="bg-green-600 hover:bg-green-700">Take Assessment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
