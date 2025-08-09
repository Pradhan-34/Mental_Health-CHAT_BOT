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
  Star,
} from "lucide-react"

interface ExercisePageProps {
  params: {
    slug: string
  }
}

interface Exercise {
  title: string
  duration: string
  difficulty: string
  description: string
  instructions: string[]
  benefits: string[]
  guidedSteps: {
    text: string
    duration: number
    audioText: string
  }[]
  tips: string[]
  category: string
}

const exercises: Record<string, Exercise> = {
  "deep-breathing-exercises": {
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
    ],
  },
  "progressive-muscle-relaxation": {
    title: "Progressive Muscle Relaxation",
    duration: "15-20 minutes",
    difficulty: "Beginner",
    category: "Stress Management",
    description: "Systematic tension and relaxation of muscle groups to release physical stress",
    instructions: [
      "Lie down in a comfortable position",
      "Start with your toes - tense them for 5 seconds, then relax",
      "Move to your calves - tense for 5 seconds, then relax",
      "Continue with thighs, buttocks, abdomen, hands, arms, shoulders",
      "Tense your facial muscles, then relax",
      "Finally, tense your whole body for 5 seconds, then completely relax",
      "Notice the difference between tension and relaxation",
    ],
    benefits: [
      "Reduces muscle tension and pain",
      "Improves sleep quality",
      "Increases body awareness",
      "Helps identify areas of stress in the body",
    ],
    guidedSteps: [
      {
        text: "Preparation",
        duration: 60,
        audioText: "Lie down comfortably. Close your eyes and take three deep breaths to center yourself.",
      },
      {
        text: "Toes & Feet",
        duration: 10,
        audioText: "Tense your toes and feet for 5 seconds... now release and feel the relaxation.",
      },
      {
        text: "Calves",
        duration: 10,
        audioText: "Tense your calf muscles for 5 seconds... now release and notice the difference.",
      },
      {
        text: "Thighs",
        duration: 10,
        audioText: "Tense your thigh muscles for 5 seconds... now release and feel the tension melt away.",
      },
      {
        text: "Abdomen",
        duration: 10,
        audioText: "Tense your abdominal muscles for 5 seconds... now release and breathe naturally.",
      },
      {
        text: "Arms & Hands",
        duration: 10,
        audioText: "Make fists and tense your arms for 5 seconds... now release and let them fall naturally.",
      },
      {
        text: "Shoulders & Neck",
        duration: 10,
        audioText: "Raise your shoulders to your ears for 5 seconds... now release and feel them drop.",
      },
      {
        text: "Face",
        duration: 10,
        audioText: "Scrunch your facial muscles for 5 seconds... now release and feel your face soften.",
      },
      {
        text: "Whole Body",
        duration: 15,
        audioText: "Tense your entire body for 5 seconds... now release everything and enjoy the deep relaxation.",
      },
    ],
    tips: [
      "Don't tense too hard - moderate tension is enough",
      "Focus on the contrast between tension and relaxation",
      "Practice in a quiet, comfortable environment",
      "Regular practice enhances the benefits",
    ],
  },
  "grounding-techniques-(5-4-3-2-1)": {
    title: "Grounding Techniques (5-4-3-2-1)",
    duration: "2-5 minutes",
    difficulty: "Beginner",
    category: "Anxiety Relief",
    description: "Use your senses to stay present and reduce anxiety",
    instructions: [
      "Look around and name 5 things you can see",
      "Notice 4 things you can touch (chair, table, your clothes, etc.)",
      "Listen for 3 things you can hear (traffic, birds, air conditioning)",
      "Identify 2 things you can smell",
      "Think of 1 thing you can taste",
      "Take slow, deep breaths throughout the exercise",
      "Focus completely on each sense as you go through them",
    ],
    benefits: [
      "Quickly reduces anxiety and panic",
      "Brings you back to the present moment",
      "Can be done anywhere without anyone noticing",
      "Helps interrupt anxious thought patterns",
    ],
    guidedSteps: [
      {
        text: "Preparation",
        duration: 30,
        audioText: "Take a moment to settle yourself. Take three deep breaths and prepare to engage your senses.",
      },
      {
        text: "5 Things You See",
        duration: 60,
        audioText:
          "Look around you. Name 5 things you can see. Take your time with each one. Notice their colors, shapes, and details.",
      },
      {
        text: "4 Things You Touch",
        duration: 45,
        audioText:
          "Now focus on touch. Notice 4 things you can feel - your clothes, the chair, the temperature, textures around you.",
      },
      {
        text: "3 Things You Hear",
        duration: 45,
        audioText:
          "Listen carefully. Identify 3 different sounds around you. They might be near or far, loud or quiet.",
      },
      {
        text: "2 Things You Smell",
        duration: 30,
        audioText: "Take a gentle breath in. Notice 2 different scents or smells in your environment.",
      },
      {
        text: "1 Thing You Taste",
        duration: 30,
        audioText:
          "Finally, notice any taste in your mouth, or think of a favorite taste. Take a moment to really focus on it.",
      },
    ],
    tips: [
      "Don't worry if you can't identify all senses - do what you can",
      "Take your time with each step",
      "This technique works best when practiced regularly",
      "Use this whenever you feel overwhelmed or anxious",
    ],
  },
  "mindfulness-for-beginners": {
    title: "Mindfulness for Beginners",
    duration: "5-10 minutes",
    difficulty: "Beginner",
    category: "Mindfulness & Meditation",
    description: "Introduction to present-moment awareness and mindful observation",
    instructions: [
      "Sit comfortably with your eyes closed or softly focused",
      "Notice your breathing without trying to change it",
      "When thoughts come up, acknowledge them and return to your breath",
      "Observe any sensations in your body without judgment",
      "If your mind wanders, gently bring attention back to the present",
      "Start with 5 minutes and gradually increase the time",
      "End by taking three deep breaths and slowly opening your eyes",
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves emotional regulation",
      "Enhances focus and concentration",
      "Increases self-awareness",
    ],
    guidedSteps: [
      {
        text: "Settling In",
        duration: 60,
        audioText:
          "Find a comfortable seated position. Close your eyes or soften your gaze. Take three deep breaths to settle in.",
      },
      {
        text: "Focus on Breath",
        duration: 120,
        audioText:
          "Now simply notice your natural breathing. Don't try to change it, just observe the rhythm of your breath.",
      },
      {
        text: "Body Awareness",
        duration: 90,
        audioText:
          "Expand your awareness to your whole body. Notice any sensations, tensions, or areas of comfort without trying to change anything.",
      },
      {
        text: "Thoughts & Return",
        duration: 120,
        audioText:
          "When thoughts arise, simply notice them like clouds passing in the sky, then gently return your attention to your breath.",
      },
      {
        text: "Closing",
        duration: 30,
        audioText: "Take three deep breaths. Wiggle your fingers and toes. When you're ready, slowly open your eyes.",
      },
    ],
    tips: [
      "There's no 'perfect' way to meditate - be patient with yourself",
      "It's normal for your mind to wander - that's part of the practice",
      "Start with short sessions and build up gradually",
      "Consistency is more important than duration",
    ],
  },
}

export default function ExercisePage({ params }: ExercisePageProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const exercise = exercises[params.slug as keyof typeof exercises]

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

  const submitFeedback = () => {
    // In a real app, this would send feedback to a server
    alert("Thank you for your feedback! It helps us improve the exercises.")
    setRating(0)
    setFeedback("")
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-bold mb-4">Exercise Not Found</h2>
            <p className="text-gray-600 mb-4">The exercise you're looking for doesn't exist.</p>
            <Link href="/resources">
              <Button className="bg-green-600 hover:bg-green-700">Back to Resources</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
        <div className="text-center mb-6 sm:mb-8 px-2">
          <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-800 text-xs sm:text-sm">{exercise.category}</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{exercise.title}</h1>
          <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {exercise.duration}
            </div>
            <div className="flex items-center">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              {exercise.difficulty}
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto">{exercise.description}</p>
        </div>

        {/* Interactive Exercise Player */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-center text-lg sm:text-xl">Guided Exercise</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-4 sm:space-y-6">
            {/* Progress */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-1 sm:space-y-0">
                <span className="text-xs sm:text-sm font-medium">
                  Step {currentStep + 1} of {exercise.guidedSteps.length}
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  {isActive ? formatTime(timeRemaining) : "Ready to start"}
                </span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {isCompleted ? "Exercise Complete!" : exercise.guidedSteps[currentStep].text}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {isCompleted
                  ? "Great job! Take a moment to notice how you feel."
                  : exercise.guidedSteps[currentStep].audioText}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {!isActive && !isCompleted && (
                <Button
                  onClick={startExercise}
                  className="bg-green-600 hover:bg-green-700 text-sm sm:text-base px-3 sm:px-4"
                >
                  <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Start Exercise
                </Button>
              )}

              {isActive && (
                <Button
                  onClick={pauseExercise}
                  variant="outline"
                  className="bg-transparent text-sm sm:text-base px-3 sm:px-4"
                >
                  <Pause className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Pause
                </Button>
              )}

              {!isActive && currentStep > 0 && !isCompleted && (
                <Button
                  onClick={resumeExercise}
                  className="bg-green-600 hover:bg-green-700 text-sm sm:text-base px-3 sm:px-4"
                >
                  <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Resume
                </Button>
              )}

              <Button
                onClick={resetExercise}
                variant="outline"
                className="bg-transparent text-sm sm:text-base px-3 sm:px-4"
              >
                <RotateCcw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Reset
              </Button>

              <Button
                onClick={() => setAudioEnabled(!audioEnabled)}
                variant="outline"
                className="bg-transparent px-3 sm:px-4"
              >
                {audioEnabled ? (
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <div className="text-center bg-green-100 rounded-lg p-4 sm:p-6">
                <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-2">Exercise Completed!</h3>
                <p className="text-sm sm:text-base text-green-700">
                  You've successfully completed the {exercise.title} exercise. How do you feel?
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Instructions */}
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                Step-by-Step Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <ol className="space-y-2 sm:space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <ul className="space-y-2 sm:space-y-3">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Helpful Tips</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {exercise.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600 mt-1">💡</span>
                  <span className="text-gray-700 text-xs sm:text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        {isCompleted && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How was your experience?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Rate this exercise:</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Share your thoughts (optional):</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="How did this exercise help you? Any suggestions for improvement?"
                  className="w-full h-20 p-3 border border-gray-200 rounded-lg resize-none focus:border-green-500 focus:outline-none"
                />
              </div>

              <Button onClick={submitFeedback} className="bg-green-600 hover:bg-green-700">
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        )}

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
