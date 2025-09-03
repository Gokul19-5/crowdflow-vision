import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, AlertTriangle, BarChart3, Eye, Zap, Music, Flame, Search, UserX } from "lucide-react";
import EventDashboard from "@/components/EventDashboard";

interface Event {
  id: string;
  name: string;
  artist: string;
  date: string;
  venue: string;
  capacity: number;
  current: number;
  status: 'live' | 'upcoming' | 'ended';
  color: string;
}

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: '1',
      name: 'Electric Night',
      artist: 'Neon Dreams',
      date: 'Tonight 8:00 PM',
      venue: 'MetroArena',
      capacity: 15000,
      current: 12800,
      status: 'live',
      color: 'gradient-concert'
    },
    {
      id: '2', 
      name: 'Summer Vibes Festival',
      artist: 'Various Artists',
      date: 'Tomorrow 6:00 PM',
      venue: 'Sunset Stadium',
      capacity: 25000,
      current: 0,
      status: 'upcoming',
      color: 'gradient-primary'
    },
    {
      id: '3',
      name: 'Rock Revolution',
      artist: 'Thunder Strike',
      date: 'Next Week',
      venue: 'Rock Palace',
      capacity: 8000,
      current: 0,
      status: 'upcoming', 
      color: 'gradient-secondary'
    }
  ];

  if (selectedEvent) {
    return <EventDashboard event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-8 animate-bounce-in">
              <Shield className="h-4 w-4 text-accent animate-glow-pulse" />
              <span className="text-sm text-muted-foreground">AI-Powered Concert Safety</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-concert-pink bg-clip-text text-transparent animate-fade-in">
              CrowdSense
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Revolutionary AI-powered concert safety platform featuring <span className="text-accent font-semibold">virtual wristband technology</span>, 
              real-time crowd monitoring, and intelligent emergency response for unforgettable and safe live experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
              <Button 
                onClick={() => setSelectedEvent(events[0])}
                className="gradient-concert text-lg px-8 py-6 concert-glow hover:scale-105 transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                Experience Live Demo
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-border hover:bg-card/50 transition-all duration-300"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Events Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-rainbow bg-clip-text text-transparent">Live Concert Dashboards</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each event features its own interactive dashboard with AI-powered safety monitoring and vibrant real-time visualizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {events.map((event, index) => (
            <Card 
              key={event.id}
              className={`gradient-card p-6 border-border card-shadow hover:scale-105 transition-all duration-300 cursor-pointer hover:floating-shadow animate-bounce-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{event.name}</h3>
                  <p className="text-accent font-semibold">{event.artist}</p>
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'live' ? 'status-danger animate-glow-pulse' :
                  event.status === 'upcoming' ? 'status-warning' : 'status-safe'
                }`}>
                  {event.status.toUpperCase()}
                </div>
              </div>

              <div className={`h-32 rounded-lg mb-4 ${event.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-xs opacity-80">{event.date}</div>
                  <div className="text-sm font-semibold">
                    {event.current > 0 ? `${event.current.toLocaleString()} attendees` : 'Ready for crowds'}
                  </div>
                </div>
                <Music className="absolute top-2 right-2 h-6 w-6 text-white/60" />
              </div>

              <Button className="w-full gradient-primary">
                <Eye className="mr-2 h-4 w-4" />
                Enter Dashboard
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Technology for <span className="text-accent">Concert Safety</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI algorithms with virtual wristband integration deliver unprecedented concert safety and experience enhancement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Wristband Tracking</h3>
            <p className="text-muted-foreground">
              Virtual wristband technology enables real-time attendee location tracking, emergency response, and personalized safety alerts.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-warning w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Search className="h-6 w-6 text-warning-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Missing Person Detection</h3>
            <p className="text-muted-foreground">
              AI-powered person detection combined with wristband signals instantly locates missing attendees and guides reunion efforts.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-danger w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Flame className="h-6 w-6 text-destructive-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Fire & Emergency Detection</h3>
            <p className="text-muted-foreground">
              Advanced thermal imaging and smoke detection with automatic evacuation route calculation and emergency broadcast systems.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-success w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <AlertTriangle className="h-6 w-6 text-success-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Fight Detection</h3>
            <p className="text-muted-foreground">
              Real-time behavioral analysis identifies potential conflicts and automatically dispatches security teams to prevent escalation.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Heat Map Visualization</h3>
            <p className="text-muted-foreground">
              Beautiful real-time crowd density heat maps with color-coded safety zones and dynamic capacity management.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Evacuation Routes</h3>
            <p className="text-muted-foreground">
              Dynamic evacuation path calculation with real-time crowd flow optimization and wristband-guided attendee direction.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;