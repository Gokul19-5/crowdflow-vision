import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Users, Eye, Layers } from "lucide-react";

interface HeatZone {
  id: string;
  name: string;
  density: number;
  capacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const HeatMap = () => {
  const [zones, setZones] = useState<HeatZone[]>([
    { id: '1', name: 'Main Stage', density: 85, capacity: 5000, x: 40, y: 20, width: 20, height: 15 },
    { id: '2', name: 'VIP Section', density: 45, capacity: 500, x: 10, y: 25, width: 15, height: 10 },
    { id: '3', name: 'Food Court', density: 92, capacity: 1200, x: 70, y: 50, width: 25, height: 20 },
    { id: '4', name: 'Entry Plaza', density: 38, capacity: 2000, x: 20, y: 70, width: 30, height: 15 },
    { id: '5', name: 'Exit Zone A', density: 76, capacity: 1500, x: 60, y: 25, width: 20, height: 12 },
    { id: '6', name: 'Merchandise', density: 55, capacity: 800, x: 15, y: 50, width: 18, height: 12 },
    { id: '7', name: 'Bar Area', density: 68, capacity: 600, x: 45, y: 55, width: 15, height: 10 },
    { id: '8', name: 'Restrooms', density: 42, capacity: 300, x: 75, y: 75, width: 10, height: 8 }
  ]);

  const [viewMode, setViewMode] = useState<'density' | 'capacity' | 'safety'>('density');

  // Simulate real-time density updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => 
        prev.map(zone => ({
          ...zone,
          density: Math.max(10, Math.min(100, 
            zone.density + (Math.random() * 20 - 10)
          ))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getHeatIntensity = (density: number) => {
    if (density >= 80) return 'heat-high';
    if (density >= 50) return 'heat-medium';
    return 'heat-low';
  };

  const getSafetyColor = (density: number) => {
    if (density >= 85) return 'bg-destructive/70';
    if (density >= 70) return 'bg-warning/60';
    return 'bg-success/50';
  };

  const getCapacityColor = (density: number, capacity: number) => {
    const utilization = (density / 100) * capacity;
    if (utilization >= capacity * 0.9) return 'bg-destructive/70';
    if (utilization >= capacity * 0.7) return 'bg-warning/60';
    return 'bg-primary/50';
  };

  const getZoneStyle = (zone: HeatZone) => {
    let bgClass = '';
    switch (viewMode) {
      case 'density':
        bgClass = getHeatIntensity(zone.density);
        break;
      case 'capacity':
        bgClass = getCapacityColor(zone.density, zone.capacity);
        break;
      case 'safety':
        bgClass = getSafetyColor(zone.density);
        break;
    }

    return {
      position: 'absolute' as const,
      left: `${zone.x}%`,
      top: `${zone.y}%`,
      width: `${zone.width}%`,
      height: `${zone.height}%`,
      className: `${bgClass} rounded-lg border-2 border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 cursor-pointer`
    };
  };

  return (
    <Card className="gradient-card border-border card-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Thermometer className="h-6 w-6 text-accent animate-glow-pulse" />
            <h2 className="text-xl font-semibold">Live Heat Map</h2>
          </div>
          
          <div className="flex gap-2">
            {[
              { key: 'density', label: 'Density', icon: Users },
              { key: 'capacity', label: 'Capacity', icon: Layers },
              { key: 'safety', label: 'Safety', icon: Eye }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={viewMode === key ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(key as any)}
                className={viewMode === key ? "gradient-primary" : ""}
              >
                <Icon className="h-3 w-3 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Heat Map Visualization */}
        <div className="relative bg-muted/10 rounded-lg border border-border overflow-hidden" style={{ height: '400px' }}>
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Heat zones */}
          {zones.map((zone) => {
            const style = getZoneStyle(zone);
            return (
              <div
                key={zone.id}
                style={style}
                className={style.className}
                title={`${zone.name}: ${Math.round(zone.density)}% density`}
              >
                <div className="h-full w-full flex flex-col items-center justify-center text-white text-xs font-semibold p-2">
                  <div className="text-center">
                    <div className="text-lg font-bold">{Math.round(zone.density)}%</div>
                    <div className="opacity-80">{zone.name}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Stage indicator */}
          <div className="absolute top-[10%] left-[42%] w-16 h-4 bg-gradient-concert rounded border border-white/40 flex items-center justify-center">
            <span className="text-white text-xs font-bold">STAGE</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 heat-low rounded"></div>
              <span className="text-sm text-muted-foreground">Low Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 heat-medium rounded"></div>
              <span className="text-sm text-muted-foreground">Medium Density</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 heat-high rounded"></div>
              <span className="text-sm text-muted-foreground">High Density</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {viewMode === 'density' && 'Crowd Density Visualization'}
              {viewMode === 'capacity' && 'Capacity Utilization'}
              {viewMode === 'safety' && 'Safety Risk Assessment'}
            </div>
            <div className="text-xs text-accent">Updated every 3 seconds</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HeatMap;