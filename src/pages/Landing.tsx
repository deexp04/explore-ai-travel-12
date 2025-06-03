import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plane, Shield, Zap, Users, ArrowRight, Globe, Target, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingChatButton from '@/components/FloatingChatButton';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Travel Assistant',
      description: 'Chat with our intelligent assistant to plan your perfect trip',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Plane,
      title: 'Smart Booking',
      description: 'Discover the best flights, hotels, and activities through our agent network',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: 'Budget Monitoring',
      description: 'Real-time cost tracking with smart suggestions to stay within budget',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Zap,
      title: 'Smart Alerts',
      description: 'Get notified about better deals and budget-friendly alternatives',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SyncAgents
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Powered by FetchAI
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                SyncAgents
                <br />
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We lead the way in advancing intelligent travel planning through AI agent networks, 
                creating personalized experiences that adapt to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
                  onClick={() => navigate('/login')}
                >
                  Start Planning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="relative">
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Central AI element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <MessageSquare className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 left-8 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <div className="absolute top-12 right-8 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center animate-pulse">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div className="absolute bottom-8 left-12 w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center animate-bounce delay-150">
                  <Rocket className="w-7 h-7 text-purple-600" />
                </div>
                <div className="absolute bottom-12 right-16 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-pulse delay-300">
                  <Plane className="w-5 h-5 text-blue-600" />
                </div>

                {/* Connecting lines/paths */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <path
                    d="M50 80 Q200 120 350 60"
                    stroke="#e0e7ff"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M80 320 Q200 280 320 340"
                    stroke="#fef3c7"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Areas of Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects multiple specialized agents to revolutionize your planning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-xl font-bold text-white">
                TravelBud
              </span>
            </div>
            <p className="text-white-400 text-sm max-w-md mx-auto">
              Your smart travel companion
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
