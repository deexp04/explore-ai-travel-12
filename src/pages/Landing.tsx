import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plane, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Travel Assistant',
      description: 'Chat with our intelligent assistant to plan your perfect trip'
    },
    {
      icon: Plane,
      title: 'Smart Booking',
      description: 'Discover the best flights, hotels, and activities through our agent network'
    },
    {
      icon: Shield,
      title: 'Budget Monitoring',
      description: 'Real-time cost tracking with smart suggestions to stay within budget'
    },
    {
      icon: Zap,
      title: 'Smart Alerts',
      description: 'Get notified about better deals and budget-friendly alternatives'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TravelAI</span>
            </div>
            <div className="space-x-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Plan Your Perfect Trip with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Agents
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of travel planning with our intelligent assistant. 
              Get personalized itineraries, budget tracking, and real-time booking recommendations.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                onClick={() => navigate('/register')}
              >
                Start Planning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg px-8 py-3"
                onClick={() => navigate('/login')}
              >
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Agents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform connects multiple specialized agents to give you the best travel experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See TravelAI in Action
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              "Plan a 4-day Tokyo trip under $1200" - Watch our AI coordinate with specialized agents 
              to create your perfect itinerary while monitoring your budget in real-time.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/register')}
            >
              Try It Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">TravelAI</span>
          </div>
          <p className="text-gray-400">
            Powered by FetchAI Agent Network - The Future of Intelligent Travel Planning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
