"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Heart, BookOpen, ClipboardList } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">
              MindfulAssess
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                <Brain className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="ghost" className="text-gray-700 hover:text-green-600">
                Resources
              </Button>
            </Link>
            <Link href="/assessment">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Start Assessment
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Understand Your{" "}
              <span className="text-green-600 block">
                Mental Health Status
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take our comprehensive mental health assessment designed for
              students. Get personalized insights and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Let's Begin - Chat Assessment
                </Button>
              </Link>
              <Link href="/assessment">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Take Structured Assessment
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Our Assessment Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <ClipboardList className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl text-gray-900">
                    Comprehensive Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Answer 10-15 carefully designed questions about your daily
                    experiences, emotions, and coping mechanisms.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl text-gray-900">
                    Instant Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Get immediate results showing your stress and anxiety levels
                    with clear visualizations and detailed explanations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-green-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-xl text-gray-900">
                    Personalized Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Receive customized recommendations and access to specific
                    self-help resources based on your results.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-600 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Understand Your Mental Health?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Take the first step towards better mental well-being. Our
              assessment takes just 5-10 minutes.
            </p>
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3"
              >
                Start Chat Assessment
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-green-400" />
            <span className="text-lg font-bold">MindfulAssess</span>
          </div>
          <p className="text-gray-400 mb-4">
            Supporting student mental health through evidence-based assessments
            and personalized resources.
          </p>
          <p className="text-green-400 font-semibold">
            Created by Rahul Pradhan
          </p>
        </div>
      </footer>
    </div>
  );
}
