import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, AlertTriangle, BarChart3, Eye, Zap } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border mb-8">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">AI-Powered Crowd Safety</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              CrowdSense
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered crowd management system that ensures safety and enhances experiences at concerts and large events through real-time monitoring and intelligent analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={() => setShowDashboard(true)}
                className="gradient-primary text-lg px-8 py-6 glow-effect hover:scale-105 transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-6 border-border hover:bg-card/50 transition-all duration-300"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Technology for <span className="text-accent">Safer Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI algorithms combined with real-time monitoring deliver unprecedented crowd safety capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI Crowd Detection</h3>
            <p className="text-muted-foreground">
              Advanced computer vision tracks crowd density in real-time, even in low-light conditions using infrared-like analysis.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <AlertTriangle className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Real-time Alerts</h3>
            <p className="text-muted-foreground">
              Color-coded indicators instantly show risk levels with Green, Yellow, and Red zones for immediate response.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Interactive Dashboards</h3>
            <p className="text-muted-foreground">
              Beautiful visualizations display crowd movement, entry points, and safe routes with actionable insights.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Emergency Guidance</h3>
            <p className="text-muted-foreground">
              Automated emergency protocols provide instant evacuation guidance and controlled entry instructions.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Future-Ready Insights</h3>
            <p className="text-muted-foreground">
              Post-event analytics help optimize future crowd management strategies and venue planning.
            </p>
          </Card>

          <Card className="gradient-card p-8 border-border card-shadow hover:scale-105 transition-all duration-300">
            <div className="gradient-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Eye className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Multi-Zone Monitoring</h3>
            <p className="text-muted-foreground">
              Simultaneous monitoring of multiple zones with individual risk assessment and capacity management.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;