
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ChatInterface from '@/components/ChatInterface';
import { MessageSquare, Settings, Bell, Home, Calendar, Airplane, DollarSign } from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  dates: string;
  budget: number;
  spent: number;
  status: 'planning' | 'booked' | 'completed';
  itinerary: Array<{
    time: string;
    activity: string;
    location: string;
    icon: string;
  }>;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'trip'>('overview');
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);

  // Mock trip data
  useEffect(() => {
    const mockTrip: Trip = {
      id: '1',
      destination: 'Tokyo, Japan',
      dates: 'June 10 - June 15',
      budget: 1200,
      spent: 950,
      status: 'planning',
      itinerary: [
        { time: '10:46 AM', activity: 'Arrive in Tokyo', location: 'Narita Airport', icon: 'plane' },
        { time: '9:05 AM', activity: 'Visit Senso-ji Temple', location: 'Asakusa', icon: 'calendar' },
        { time: '1:30 PM', activity: 'Tokyo National Museum', location: 'Ueno', icon: 'calendar' },
        { time: '3:30 PM', activity: 'Walk in Ueno Park', location: 'Ueno', icon: 'calendar' },
      ]
    };
    setCurrentTrip(mockTrip);
  }, []);

  const budgetPercentage = currentTrip ? (currentTrip.spent / currentTrip.budget) * 100 : 0;
  const remaining = currentTrip ? currentTrip.budget - currentTrip.spent : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TravelAI</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'chat' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('trip')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'trip' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Itinerary</span>
              </button>
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                activeTab === 'chat' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs mt-1">Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('trip')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                activeTab === 'trip' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs mt-1">Itinerary</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20 md:pb-4">
          {activeTab === 'overview' && (
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                <p className="opacity-90">Your AI travel assistant is ready to help plan your next adventure.</p>
              </div>

              {currentTrip && (
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Current Trip */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Airplane className="w-5 h-5 text-blue-600" />
                            <span>Your Trip to {currentTrip.destination}</span>
                          </CardTitle>
                          <CardDescription>{currentTrip.dates}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {currentTrip.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentTrip.itinerary.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.activity}</p>
                            <p className="text-xs text-gray-600">{item.time} • {item.location}</p>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => setActiveTab('trip')}
                      >
                        View Full Itinerary
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Budget Tracking */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span>Budget</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">
                          ${currentTrip.spent}
                        </div>
                        <div className="text-sm text-gray-600">
                          of ${currentTrip.budget}
                        </div>
                      </div>
                      
                      <Progress value={budgetPercentage} className="h-3" />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expenses</span>
                          <span className="font-medium">${currentTrip.spent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Remaining</span>
                          <span className="font-medium text-green-600">${remaining}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveTab('chat')}
                      >
                        Ask AI for Budget Tips
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Start planning your next adventure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('chat')}
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Plan New Trip</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('chat')}
                    >
                      <DollarSign className="w-6 h-6" />
                      <span>Budget Helper</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col space-y-2"
                      onClick={() => setActiveTab('chat')}
                    >
                      <Bell className="w-6 h-6" />
                      <span>Deal Alerts</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          )}

          {activeTab === 'trip' && currentTrip && (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Trip Itinerary - {currentTrip.destination}</span>
                  </CardTitle>
                  <CardDescription>{currentTrip.dates}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentTrip.itinerary.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.activity}</h3>
                          <p className="text-sm text-gray-600">{item.time} • {item.location}</p>
                        </div>
                      </div>
                      {index < currentTrip.itinerary.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full mt-6"
                    onClick={() => setActiveTab('chat')}
                  >
                    Modify Itinerary with AI
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
