
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plane, MapPin, Calendar, DollarSign, MessageSquare, Settings, LogOut } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                SyncAgents
              </span>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Button 
                onClick={logout} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="sm"
              >
                <LogOut className="h-4 w-4" /> 
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header Section */}
{/*           <Card className="mb-8 shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl sm:text-2xl font-bold truncate">
                Welcome, {user?.name}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm sm:text-base">
                Explore the SyncAgents dashboard and start planning your next adventure.
              </CardDescription>
            </CardContent>
          </Card> */}

          {/* Tabs Section */}
          <Tabs defaultValue="chat" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat" className="text-xs sm:text-sm">
                <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="planning" className="text-xs sm:text-sm">
                <Plane className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-6">
              <Card className="min-h-0">
                <CardContent className="p-6">
                  <ChatInterface />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="planning" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Planning</CardTitle>
                  <CardDescription>
                    Organize your travel plans and view your upcoming trips.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Destination</CardTitle>
                        <CardDescription className="truncate">Paris, France</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-bold flex items-center">
                          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">Eiffel Tower</span>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="text-xs">24-30 Nov, 2024</span>
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Budget</CardTitle>
                        <CardDescription>Estimated Budget</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-bold flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span>$1,500</span>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="text-xs">7 Days</span>
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Next Trip</CardTitle>
                        <CardDescription>Upcoming Adventure</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-bold flex items-center">
                          <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">Kyoto, Japan</span>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="text-xs">15-22 Mar, 2025</span>
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Account settings content goes here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
