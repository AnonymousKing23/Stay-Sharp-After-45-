import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Brain, Zap, Moon, Apple, Users, Wind, TrendingUp, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { SelfAssessment, HabitLog } from '../types';

export const AnalyticsScreen = ({ 
  assessments, 
  habitLogs, 
  completedDays 
}: { 
  assessments: SelfAssessment[], 
  habitLogs: Record<string, HabitLog>,
  completedDays: number[]
}) => {
  const hasData = assessments.length > 0 || Object.keys(habitLogs).length > 0 || completedDays.length > 0;

  // Real data for trends
  const trendData = assessments.length > 0 ? assessments.map(a => ({
    date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    clarity: a.mentalClarity,
    memory: a.memory,
    focus: a.focus,
    energy: a.energy
  })) : [
    { date: 'No Data', clarity: 0, memory: 0, focus: 0, energy: 0 },
  ];

  const radarData = assessments.length > 0 ? [
    { subject: 'Clarity', A: assessments[assessments.length-1].mentalClarity, fullMark: 10 },
    { subject: 'Memory', A: assessments[assessments.length-1].memory, fullMark: 10 },
    { subject: 'Focus', A: assessments[assessments.length-1].focus, fullMark: 10 },
    { subject: 'Mood', A: assessments[assessments.length-1].mood, fullMark: 10 },
    { subject: 'Energy', A: assessments[assessments.length-1].energy, fullMark: 10 },
    { subject: 'Sleep', A: assessments[assessments.length-1].sleepQuality, fullMark: 10 },
  ] : [
    { subject: 'Clarity', A: 0, fullMark: 10 },
    { subject: 'Memory', A: 0, fullMark: 10 },
    { subject: 'Focus', A: 0, fullMark: 10 },
    { subject: 'Mood', A: 0, fullMark: 10 },
    { subject: 'Energy', A: 0, fullMark: 10 },
    { subject: 'Sleep', A: 0, fullMark: 10 },
  ];

  // Calculate pillar scores based on habit logs
  const logsArray = Object.values(habitLogs);
  const totalLogs = logsArray.length || 1; // Avoid division by zero

  const calculateScore = (key: keyof HabitLog) => {
    if (logsArray.length === 0) return 0;
    const count = logsArray.filter(log => log[key]).length;
    return Math.round((count / logsArray.length) * 100);
  };

  const pillars = [
    { name: 'Nutrition', score: calculateScore('brainFood'), icon: Apple, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Movement', score: calculateScore('movement'), icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Sleep', score: calculateScore('sleep'), icon: Moon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Mental', score: calculateScore('brainChallenge'), icon: Brain, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Stress', score: calculateScore('stressManagement'), icon: Wind, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { name: 'Social', score: calculateScore('socialConnection'), icon: Users, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  ];

  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-bold text-primary mb-2">Advanced Analytics</h1>
        <p className="text-muted-foreground text-sm">Visualizing your brain health journey</p>
      </header>

      {!hasData && (
        <Card className="border-dashed border-2 bg-muted/20">
          <CardContent className="py-10 text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
            <p className="text-sm text-muted-foreground">Complete your first daily tasks and assessments to see your brain health trends here.</p>
          </CardContent>
        </Card>
      )}

      <section className={cn("space-y-4", !hasData && "opacity-50 pointer-events-none")}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Cognitive Trends</h2>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="clarity" stroke="var(--primary)" fillOpacity={1} fill="url(#colorClarity)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className={cn("space-y-4", !hasData && "opacity-50 pointer-events-none")}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Brain Pillar Balance</h2>
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-xl">
          <CardContent className="pt-6 flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: 'var(--muted-foreground)'}} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} hide />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className={cn("space-y-4", !hasData && "opacity-50 pointer-events-none")}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Pillar Performance</h2>
        <div className="grid grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className={cn("p-2 rounded-lg", pillar.bg)}>
                    <pillar.icon className={cn("w-4 h-4", pillar.color)} />
                  </div>
                  <span className="text-lg font-bold text-primary">{pillar.score}%</span>
                </div>
                <div>
                  <p className="text-xs font-medium">{pillar.name}</p>
                  <div className="h-1 w-full bg-muted rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pillar.score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn("h-full", pillar.color.replace('text-', 'bg-'))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {hasData && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Insights</h2>
          <Card className="border-none shadow-xl bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-heading">Engagement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have completed <span className="text-primary font-bold">{completedDays.length}</span> protocol days. Consistency is key to cognitive longevity!
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
};
