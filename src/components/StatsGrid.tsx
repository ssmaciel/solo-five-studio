import { Card } from '@/components/ui/card';
import { Users, TrendingUp, Clock, Target } from 'lucide-react';

interface StatsGridProps {
  stats: {
    total: number;
    active: number;
    avgAdherence: number;
    recentCheckIns: number;
    remainingSlots: number;
  };
  maxStudents: number;
}

export function StatsGrid({ stats, maxStudents }: StatsGridProps) {
  const statsData = [
    {
      title: 'Alunos Ativos',
      value: `${stats.active}/${stats.total}`,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Vagas Restantes',
      value: stats.remainingSlots.toString(),
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Adesão Média',
      value: `${stats.avgAdherence}%`,
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Check-ins (7d)',
      value: stats.recentCheckIns.toString(),
      icon: Clock,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <Card key={stat.title} className="p-6 shadow-card hover:shadow-elevated transition-smooth animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}