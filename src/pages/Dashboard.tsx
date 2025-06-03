
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, MapPin, Calendar, DollarSign, MessageSquare, Settings, LogOut, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapView from '@/components/MapView';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dummy travel data with proper tuple coordinates
  const trips = [
    {
      id: 1,
      destination: 'Paris, France',
      dates: 'Dec 15-22, 2024',
      budget: '$2,500',
      status: 'Upcoming',
      coordinates: [2.3522, 48.8566] as [number, number] // Paris coordinates
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      dates: 'Mar 10-20, 2025',
      budget: '$3,200',
      status: 'Planning',
      coordinates: [139.6917, 35.6895] as [number, number] // Tokyo coordinates
    },
    {
      id: 3,
      destination: 'New York, USA',
      dates: 'Aug 5-12, 2024',
      budget: '$1,800',
      status: 'Completed',
      coordinates: [-74.0060, 40.7128] as [number, number] // NYC coordinates
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                TravelBud
              </h1>
{/*               <Badge variant="outline" className="text-gray-400 border-gray-600">
                Dashboard
              </Badge> */}
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Button 
                onClick={() => navigate('/chat')} 
                className="text-white"
                size="sm"
              >
                <span className="hidden sm:inline">Chat Assistant</span>
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="text-white"
                size="sm"
              >
{/*                 <MessageSquare className="h-4 w-4 mr-2" /> */}
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
              <Button 
                onClick={logout} 
                className="text-white border-gray-600"
                size="sm"
              >
                <LogOut className="h-4 w-4" /> 
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl py-6">
        {/* Welcome Section */}
{/*         <Card className="mb-8 bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold text-white truncate">
              Welcome back, {user?.name}!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm sm:text-base text-gray-400">
              Explore your travel dashboard and plan your next adventure with AI assistance.
            </CardDescription>
          </CardContent>
        </Card> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 h-[500px]">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Navigation className="mr-2 h-5 w-5" />
                  Travel Map
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your travel destinations and routes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[400px]">
                <MapView trips={trips} />
              </CardContent>
            </Card>
          </div>

          {/* Trip Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Your Trips</h3>
            {trips.map((trip) => (
              <Card key={trip.id} className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center justify-between">
                    <span className="truncate">{trip.destination}</span>
                    <Badge 
                      variant={trip.status === 'Completed' ? 'secondary' : 'outline'}
                      className={`ml-2 ${
                        trip.status === 'Completed' 
                          ? 'bg-green-600 text-white' 
                          : trip.status === 'Upcoming'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 border-gray-600'
                      }`}
                    >
                      {trip.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{trip.dates}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{trip.budget}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Trips</p>
                  <p className="text-2xl font-bold text-white">{trips.length}</p>
                </div>
                <Plane className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Countries Visited</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Budget</p>
                  <p className="text-2xl font-bold text-white">$7,500</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
