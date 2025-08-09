import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Home, MessageCircle, Heart, Moon, Activity, Phone, Clock, Target } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Stress Management",
      icon: Activity,
      color: "bg-green-100 text-green-700",
      items: [
        {
          title: "Deep Breathing Exercises",
          description: "Simple breathing techniques to reduce stress in minutes",
          duration: "5-10 min",
          difficulty: "Beginner",
        },
        {
          title: "Progressive Muscle Relaxation",
          description: "Systematic tension and relaxation of muscle groups",
          duration: "15-20 min",
          difficulty: "Beginner",
        },
        {
          title: "Time Management for Students",
          description: "Strategies to balance academic and personal life",
          duration: "Read",
          difficulty: "All levels",
        },
      ],
    },
    {
      category: "Anxiety Relief",
      icon: Heart,
      color: "bg-teal-100 text-teal-700",
      items: [
        {
          title: "Grounding Techniques (5-4-3-2-1)",
          description: "Use your senses to stay present during anxiety",
          duration: "2-5 min",
          difficulty: "Beginner",
        },
        {
          title: "Cognitive Restructuring",
          description: "Challenge and reframe anxious thoughts",
          duration: "10-15 min",
          difficulty: "Intermediate",
        },
        {
          title: "Mindful Walking",
          description: "Combine movement with mindfulness to reduce anxiety",
          duration: "10-30 min",
          difficulty: "Beginner",
        },
      ],
    },
    {
      category: "Sleep & Rest",
      icon: Moon,
      color: "bg-purple-100 text-purple-700",
      items: [
        {
          title: "Sleep Hygiene for Students",
          description: "Create healthy sleep habits despite busy schedules",
          duration: "Read",
          difficulty: "All levels",
        },
        {
          title: "Bedtime Meditation",
          description: "Guided meditation to prepare for restful sleep",
          duration: "10-20 min",
          difficulty: "Beginner",
        },
        {
          title: "Power Nap Techniques",
          description: "Maximize rest during short breaks between classes",
          duration: "15-20 min",
          difficulty: "Beginner",
        },
      ],
    },
    {
      category: "Mindfulness & Meditation",
      icon: Brain,
      color: "bg-orange-100 text-orange-700",
      items: [
        {
          title: "Mindfulness for Beginners",
          description: "Introduction to present-moment awareness",
          duration: "5-10 min",
          difficulty: "Beginner",
        },
        {
          title: "Study Break Meditations",
          description: "Quick mindfulness exercises between study sessions",
          duration: "3-5 min",
          difficulty: "Beginner",
        },
        {
          title: "Body Scan Meditation",
          description: "Full-body awareness and relaxation practice",
          duration: "20-30 min",
          difficulty: "Intermediate",
        },
      ],
    },
  ]

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
              <Link href="/chat">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Self-Help Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover evidence-based techniques and strategies to support your mental health journey.
          </p>
        </div>

        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Crisis Support - Available 24/7</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="font-semibold text-red-800">Crisis Text Line</h3>
                <p className="text-red-700 font-mono text-sm">Text HOME to 741741</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-red-800">National Suicide Prevention Lifeline</h3>
                <p className="text-red-700 font-mono text-sm">Call or text 988</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-red-800">SAMHSA National Helpline</h3>
                <p className="text-red-700 font-mono text-sm">1-800-662-4357</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-12">
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.difficulty}
                        </Badge>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Target className="mr-2 h-4 w-4" />
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Mental Health Journey?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These resources work best when combined with personalized assessment and guidance.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Chat Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
