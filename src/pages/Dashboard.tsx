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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <Card className="mb-8 shadow-xl border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Welcome, {user?.name}!
            </CardTitle>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Explore the TravelAI dashboard and start planning your next adventure.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="chat" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="planning">
              <Plane className="mr-2 h-4 w-4" />
              Planning
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Travel Assistant</CardTitle>
                <CardDescription>
                  Get personalized travel recommendations and plan your trips with AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    <CardHeader>
                      <CardTitle>Destination</CardTitle>
                      <CardDescription>Paris, France</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        <MapPin className="mr-2 inline-block h-5 w-5" />
                        Eiffel Tower
                      </div>
                      <Badge variant="secondary">
                        <Calendar className="mr-2 h-4 w-4" />
                        24-30 Nov, 2024
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Budget</CardTitle>
                      <CardDescription>Estimated Budget</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        <DollarSign className="mr-2 inline-block h-5 w-5" />
                        $1,500
                      </div>
                      <Badge variant="secondary">
                        <Calendar className="mr-2 h-4 w-4" />
                        7 Days
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Next Trip</CardTitle>
                      <CardDescription>Upcoming Adventure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        <MapPin className="mr-2 inline-block h-5 w-5" />
                        Kyoto, Japan
                      </div>
                      <Badge variant="secondary">
                        <Calendar className="mr-2 h-4 w-4" />
                        15-22 Mar, 2025
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
  );
};

export default Dashboard;
