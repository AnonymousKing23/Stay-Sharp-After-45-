import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  CheckCircle2, 
  LayoutDashboard, 
  User, 
  HeartPulse, 
  Settings, 
  ChevronRight, 
  Info, 
  Clock, 
  Award,
  Plus,
  Moon,
  Droplets,
  Zap,
  Brain,
  Wind,
  Users,
  BookOpen,
  Apple,
  ChevronLeft,
  Share2,
  Bell,
  Sun,
  MessageSquare,
  BarChart3,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Activity,
  Library,
  ArrowRight,
  Heart,
  Camera,
  Trash2
} from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  UserSettings, 
  HabitLog, 
  SelfAssessment, 
  CaregiverNote, 
  DailyTask 
} from './types';
import { PROTOCOL_TASKS, MIND_DIET_FOODS } from './constants';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Checkbox } from './components/ui/checkbox';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Switch } from './components/ui/switch';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from './components/ui/dialog';
import { AnalyticsScreen } from './components/Analytics';
import { AuthScreen } from './components/Auth';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// --- Components ---

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: Sun },
    { id: 'plan', label: 'Plan', icon: Calendar },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'track', label: 'Track', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border px-2 py-3 flex justify-around items-center z-50 pb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300 relative px-2",
            activeTab === tab.id ? "text-primary scale-110" : "text-muted-foreground hover:text-primary/60"
          )}
        >
          <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "fill-current opacity-20")} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="activeTab"
              className="absolute -top-1 w-8 h-0.5 rounded-full bg-primary"
            />
          )}
        </button>
      ))}
    </nav>
  );
};

// --- Screens ---

const Onboarding = ({ onComplete }: { onComplete: (settings: UserSettings) => void }) => {
  const [step, setStep] = useState(0);
  const [settings, setSettings] = useState<UserSettings>({
    role: 'adult',
    ageRange: '45-54',
    goals: [],
    reminderTime: '08:00',
    reminderStyle: 'gentle',
    remindersEnabled: false,
    theme: 'light',
    onboarded: false,
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const steps = [
    {
      title: "Welcome to Stay Sharp",
      description: "Your daily companion for brain health and longevity.",
      content: (
        <div className="flex flex-col gap-4 mt-8">
          <p className="text-center text-muted-foreground">Are you using this app for yourself or as a caregiver?</p>
          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant={settings.role === 'adult' ? 'default' : 'outline'} 
              className="h-16 text-lg"
              onClick={() => { setSettings({ ...settings, role: 'adult' }); next(); }}
            >
              For Myself
            </Button>
            <Button 
              variant={settings.role === 'caregiver' ? 'default' : 'outline'} 
              className="h-16 text-lg"
              onClick={() => { setSettings({ ...settings, role: 'caregiver' }); next(); }}
            >
              For a Loved One
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "Tell us about you",
      description: "This helps us tailor the experience.",
      content: (
        <div className="flex flex-col gap-6 mt-8">
          <div>
            <label className="text-sm font-medium mb-2 block">Age Range</label>
            <div className="grid grid-cols-2 gap-2">
              {['45-54', '55-64', '65-74', '75+'].map((range) => (
                <Button
                  key={range}
                  variant={settings.ageRange === range ? 'default' : 'outline'}
                  onClick={() => setSettings({ ...settings, ageRange: range as any })}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={next} className="mt-4">Continue</Button>
        </div>
      )
    },
    {
      title: "What are your goals?",
      description: "Select all that apply to your brain health journey.",
      content: (
        <div className="flex flex-col gap-4 mt-8">
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'memory', label: 'Improve Memory' },
              { id: 'focus', label: 'Sharper Focus' },
              { id: 'sleep', label: 'Better Sleep' },
              { id: 'stress', label: 'Reduce Stress' },
              { id: 'routine', label: 'Daily Routine' },
              { id: 'healthy-aging', label: 'Healthy Aging' },
            ].map((goal) => (
              <Button
                key={goal.id}
                variant={settings.goals.includes(goal.id as any) ? 'default' : 'outline'}
                className="justify-start h-12 px-4"
                onClick={() => {
                  const newGoals = settings.goals.includes(goal.id as any)
                    ? settings.goals.filter(g => g !== goal.id)
                    : [...settings.goals, goal.id as any];
                  setSettings({ ...settings, goals: newGoals });
                }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={settings.goals.includes(goal.id as any)} />
                  {goal.label}
                </div>
              </Button>
            ))}
          </div>
          <Button onClick={next} className="mt-4">Next</Button>
        </div>
      )
    },
    {
      title: "Daily Reminders",
      description: "Consistency is key to the 30-day protocol.",
      content: (
        <div className="flex flex-col gap-6 mt-8">
          <div>
            <label className="text-sm font-medium mb-2 block">Preferred Time</label>
            <input 
              type="time" 
              className="w-full p-3 rounded-md border border-input bg-background"
              value={settings.reminderTime}
              onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Reminder Style</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={settings.reminderStyle === 'gentle' ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, reminderStyle: 'gentle' })}
              >
                Gentle
              </Button>
              <Button
                variant={settings.reminderStyle === 'strict' ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, reminderStyle: 'strict' })}
              >
                Strict
              </Button>
            </div>
          </div>
          <Button onClick={() => onComplete({ ...settings, onboarded: true })} className="mt-4">Start My Journey</Button>
        </div>
      )
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-primary" : "bg-primary/10"
              )} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h2 className="text-4xl font-heading font-medium text-primary mb-3">{currentStep.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">{currentStep.description}</p>
            
            <div className="min-h-[300px]">
              {currentStep.content}
            </div>

            {step > 0 && (
              <button 
                onClick={prev}
                className="mt-8 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 self-center"
              >
                <ChevronLeft className="w-3 h-3" />
                Go Back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const TodayScreen = ({ 
  currentDay, 
  task, 
  onComplete, 
  completed,
  onRemindLater
}: { 
  currentDay: number, 
  task: DailyTask, 
  onComplete: () => void,
  completed: boolean,
  onRemindLater: () => void
}) => {
  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-secondary uppercase tracking-widest">Day {currentDay} of 30</span>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">
            {task.phase === 'foundation' ? 'Foundation Phase' : 'Acceleration Phase'}
          </Badge>
        </div>
        <h1 className="text-3xl font-heading font-bold text-primary leading-tight">{task.title}</h1>
      </header>

      <Card className="border-none shadow-sm bg-card mb-6 overflow-hidden">
        <div className={cn(
          "h-2 w-full",
          task.pillar === 'sleep' && "bg-blue-400",
          task.pillar === 'nutrition' && "bg-green-400",
          task.pillar === 'movement' && "bg-orange-400",
          task.pillar === 'mental' && "bg-purple-400",
          task.pillar === 'stress' && "bg-teal-400",
          task.pillar === 'social' && "bg-pink-400",
          task.pillar === 'routine' && "bg-gold-400",
        )} />
        <CardHeader>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Estimated: {task.estimatedTime}</span>
          </div>
          <CardTitle className="text-xl font-heading">Why it matters</CardTitle>
          <CardDescription className="text-base text-foreground/80 leading-relaxed italic">
            "{task.whyItMatters}"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-primary">Instructions:</h3>
          <ul className="space-y-3">
            {task.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/5 text-primary text-[10px] flex items-center justify-center font-bold border border-primary/10">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button 
            className={cn("w-full h-14 text-lg font-medium transition-all", completed && "bg-secondary hover:bg-secondary/90")}
            onClick={onComplete}
            disabled={completed}
          >
            {completed ? (
              <><CheckCircle2 className="w-5 h-5 mr-2" /> Completed</>
            ) : (
              "Mark as Complete"
            )}
          </Button>
          {!completed && (
            <Button 
              variant="ghost" 
              className="text-muted-foreground"
              onClick={onRemindLater}
            >
              Remind me later
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary mb-1">Daily Encouragement</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              "Every small step you take today is a massive investment in your future self. You're doing great!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanScreen = ({ currentDay, completedDays }: { currentDay: number, completedDays: number[] }) => {
  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">30-Day Protocol</h1>
        <p className="text-muted-foreground">Track your journey through the phases.</p>
      </header>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Phase 1: Foundation</h2>
            <span className="text-xs text-muted-foreground">Days 1–14</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PROTOCOL_TASKS.slice(0, 14).map((task) => {
              const isCompleted = completedDays.includes(task.day);
              const isCurrent = task.day === currentDay;
              const isLocked = task.day > currentDay;

              return (
                <div 
                  key={task.day}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all relative",
                    isCompleted ? "bg-secondary/10 border-secondary text-secondary" : 
                    isCurrent ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105 z-10" :
                    isLocked ? "bg-muted/50 border-border text-muted-foreground" :
                    "bg-background border-border text-foreground"
                  )}
                >
                  <span className="text-xs font-bold">{task.day}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      task.pillar === 'sleep' && "bg-blue-400",
                      task.pillar === 'nutrition' && "bg-green-400",
                      task.pillar === 'movement' && "bg-orange-400",
                      task.pillar === 'mental' && "bg-purple-400",
                      task.pillar === 'stress' && "bg-teal-400",
                      task.pillar === 'social' && "bg-pink-400",
                      task.pillar === 'routine' && "bg-gold-400",
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Phase 2: Acceleration</h2>
            <span className="text-xs text-muted-foreground">Days 15–30</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PROTOCOL_TASKS.slice(14).map((task) => {
              const isCompleted = completedDays.includes(task.day);
              const isCurrent = task.day === currentDay;
              const isLocked = task.day > currentDay;

              return (
                <div 
                  key={task.day}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all relative",
                    isCompleted ? "bg-secondary/10 border-secondary text-secondary" : 
                    isCurrent ? "bg-primary border-primary text-primary-foreground shadow-lg scale-105 z-10" :
                    isLocked ? "bg-muted/50 border-border text-muted-foreground" :
                    "bg-background border-border text-foreground"
                  )}
                >
                  <span className="text-xs font-bold">{task.day}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      task.pillar === 'sleep' && "bg-blue-400",
                      task.pillar === 'nutrition' && "bg-green-400",
                      task.pillar === 'movement' && "bg-orange-400",
                      task.pillar === 'mental' && "bg-purple-400",
                      task.pillar === 'stress' && "bg-teal-400",
                      task.pillar === 'social' && "bg-pink-400",
                      task.pillar === 'routine' && "bg-gold-400",
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

const TrackScreen = ({ 
  habitLog, 
  onToggleHabit,
  assessments,
  completedDays,
  setActiveTab,
  currentDay
}: { 
  habitLog: HabitLog, 
  onToggleHabit: (habit: keyof HabitLog) => void,
  assessments: SelfAssessment[],
  completedDays: number[],
  setActiveTab: (tab: string) => void,
  currentDay: number
}) => {
  const habits = [
    { id: 'sleep', label: '7-9h Sleep', icon: Moon, color: 'text-blue-500' },
    { id: 'brainFood', label: 'Brain Food', icon: Apple, color: 'text-green-500' },
    { id: 'movement', label: 'Movement', icon: Zap, color: 'text-orange-500' },
    { id: 'brainChallenge', label: 'Brain Game', icon: Brain, color: 'text-purple-500' },
    { id: 'stressManagement', label: 'Stress Mgmt', icon: Wind, color: 'text-teal-500' },
    { id: 'socialConnection', label: 'Social', icon: Users, color: 'text-pink-500' },
    { id: 'readingLearning', label: 'Reading', icon: BookOpen, color: 'text-indigo-500' },
    { id: 'hydration', label: 'Hydration', icon: Droplets, color: 'text-cyan-500' },
  ];

  const completionRate = Math.round((completedDays.length / 30) * 100);
  
  // Simple streak calculation (consecutive days ending today)
  let streak = 0;
  const sortedDays = [...completedDays].sort((a, b) => b - a);
  if (sortedDays.includes(currentDay)) {
    streak = 1;
    for (let i = 0; i < sortedDays.length - 1; i++) {
      if (sortedDays[i] - sortedDays[i+1] === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Daily Habits</h1>
        <p className="text-muted-foreground">Small actions, big results.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {habits.map((habit) => (
          <Button
            key={habit.id}
            variant="outline"
            className={cn(
              "h-auto py-4 flex flex-col items-center gap-2 border-2 transition-all",
              habitLog[habit.id as keyof HabitLog] ? "border-secondary bg-secondary/5" : "border-border"
            )}
            onClick={() => onToggleHabit(habit.id as keyof HabitLog)}
          >
            <div className={cn("p-2 rounded-full bg-background shadow-sm", habit.color)}>
              <habit.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{habit.label}</span>
            <Checkbox checked={!!habitLog[habit.id as keyof HabitLog]} className="mt-1" />
          </Button>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-4">Your Achievements</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { title: '7-Day Streak', icon: Award, unlocked: assessments.length > 0 },
            { title: 'Foundation', icon: Brain, unlocked: completedDays.length >= 14 },
            { title: 'Hydrator', icon: Droplets, unlocked: habitLog.hydration },
            { title: 'Early Bird', icon: Sun, unlocked: habitLog.sleep },
          ].map((badge, i) => (
            <div key={i} className={cn(
              "flex-shrink-0 w-24 h-24 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all",
              badge.unlocked ? "bg-accent/10 border-accent/30 text-accent" : "bg-muted/30 border-border text-muted-foreground opacity-40"
            )}>
              <badge.icon className="w-8 h-8" />
              <span className="text-[10px] font-bold text-center px-2">{badge.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Progress Insights</h2>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveTab('analytics')}>View Detailed Analytics</Button>
        </div>
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Monthly Completion</span>
              <span className="text-sm font-bold text-primary">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
            <p className="text-[10px] text-muted-foreground mt-2">You've completed {completedDays.length} out of 30 days this month.</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-primary mb-4">Weekly Review</h2>
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs opacity-70 uppercase tracking-widest font-bold">Current Streak</p>
                <p className="text-3xl font-heading font-bold">{streak} {streak === 1 ? 'Day' : 'Days'}</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary-foreground/20 flex items-center justify-center">
                <span className="text-xl font-bold">{completionRate}%</span>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {streak > 0 
                ? `You're on a ${streak}-day streak! Keep up the amazing momentum.` 
                : "Start your journey today to build a healthy brain streak!"}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const CaregiverScreen = ({ notes, onAddNote }: { notes: CaregiverNote[], onAddNote: (note: string, category: any) => void }) => {
  const [newNote, setNewNote] = useState('');
  const [category, setCategory] = useState<'sleep' | 'nutrition' | 'movement' | 'social' | 'brain'>('brain');

  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto relative z-10">
      <header className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Caregiver Hub</h1>
        <p className="text-muted-foreground">Support your loved one's brain health.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-primary mb-4">Action Plan</h2>
        <div className="space-y-3">
          {[
            { label: 'Check hydration levels', done: true },
            { label: 'Encourage 15min walk', done: false },
            { label: 'Prepare MIND-diet lunch', done: false },
            { label: 'Schedule social call', done: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
              <Checkbox checked={item.done} />
              <span className={cn("text-sm", item.done && "line-through text-muted-foreground")}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Observations</h2>
          <Dialog>
            <DialogTrigger render={<Button size="sm" className="rounded-full h-8 w-8 p-0" />}>
              <Plus className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Log Observation</DialogTitle>
                <DialogDescription>Record any changes in mood, energy, or cognitive function.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['brain', 'sleep', 'nutrition', 'movement', 'social'].map((cat) => (
                    <Button
                      key={cat}
                      variant={category === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategory(cat as any)}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <textarea
                  className="w-full h-32 p-3 rounded-md border border-input bg-background text-sm"
                  placeholder="What did you notice today?"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => { onAddNote(newNote, category); setNewNote(''); }}>Save Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {notes.length > 0 ? notes.map((note) => (
            <Card key={note.id} className="border-none shadow-sm">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="capitalize text-[10px]">{note.category}</Badge>
                  <span className="text-[10px] text-muted-foreground">{new Date(note.date).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm leading-relaxed">{note.observation}</p>
              </CardContent>
            </Card>
          )) : (
            <div className="text-center py-12 bg-muted/20 rounded-2xl border border-dashed border-border">
              <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No observations logged yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const MovementGuide = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Walking Goals</h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Aim for 20-30 minutes daily. Even 10 minutes makes a difference.
      </p>
      <div className="grid gap-3">
        {[
          { label: 'Brisk Walk', desc: '20 mins at a steady pace' },
          { label: 'Nature Walk', desc: '60 mins in a park or trail' },
          { label: 'Family Walk', desc: 'Walk with a loved one' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-card border border-border">
            <p className="text-sm font-semibold">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Limited Mobility</h2>
      <div className="space-y-3">
        {[
          "Seated marching (10 mins)",
          "Resistance band exercises",
          "Chair yoga or stretching",
          "Seated leg raises"
        ].map((tip, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <CheckCircle2 className="w-4 h-4 text-orange-500" />
            <span className="text-sm">{tip}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const MentalGuide = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Brain Challenges</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Puzzles', icon: Brain },
          { label: 'Reading', icon: BookOpen },
          { label: 'Languages', icon: MessageSquare },
          { label: 'Strategy', icon: Zap },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-card border border-border flex flex-col items-center gap-2 text-center">
            <item.icon className="w-6 h-6 text-purple-500" />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Novelty is Key</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Don't just do what you're good at. Try something new:
      </p>
      <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
        <li>Learn 5 words in a new language</li>
        <li>Try a new recipe</li>
        <li>Write with your non-dominant hand</li>
        <li>Learn a new craft or hobby</li>
      </ul>
    </section>
  </div>
);

const ProfileScreen = ({ 
  settings, 
  setSettings, 
  onOpenResource,
  onReset,
  caregiverNotes,
  onAddNote,
  requestNotificationPermission,
  onLogout,
  user
}: { 
  settings: UserSettings, 
  setSettings: (s: UserSettings) => void,
  onOpenResource: (tab: string) => void,
  onReset: () => void,
  caregiverNotes: CaregiverNote[],
  onAddNote: (note: string, category: any) => void,
  requestNotificationPermission: () => void,
  onLogout: () => void,
  user: FirebaseUser | null
}) => {
  const [showCaregiverScreen, setShowCaregiverScreen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Save to local settings
        setSettings({ ...settings, profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoDelete = async () => {
    try {
      setSettings({ ...settings, profilePicture: undefined });
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  if (showCaregiverScreen) {
    return (
      <div className="pb-24 pt-6 px-6 max-w-md mx-auto">
        <Button variant="ghost" onClick={() => setShowCaregiverScreen(false)} className="mb-4 -ml-4 text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Profile
        </Button>
        <CaregiverScreen notes={caregiverNotes} onAddNote={onAddNote} />
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto relative z-10">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden border-2 border-primary/20">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : settings.profilePicture ? (
                <img src={settings.profilePicture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={isUploading} />
            </label>
            {settings.profilePicture && (
              <button 
                onClick={handlePhotoDelete}
                className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-primary">{user?.displayName || 'Your Profile'}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-[10px] text-muted-foreground uppercase mt-1 tracking-widest">{settings.role} Mode • {settings.ageRange}</p>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Settings</h2>
          <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-xl">
            <div className="divide-y divide-border">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={(e) => {
                  // Only trigger if not clicking the switch directly
                  if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
                  
                  if (!settings.remindersEnabled) {
                    requestNotificationPermission();
                  } else {
                    setSettings({ ...settings, remindersEnabled: false });
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary/60" />
                  <span className="text-sm font-medium">Daily Reminders</span>
                </div>
                <Switch 
                  checked={!!settings.remindersEnabled} 
                  onCheckedChange={(checked) => {
                    if (checked) requestNotificationPermission();
                    else setSettings({ ...settings, remindersEnabled: false });
                  }}
                />
              </div>
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-primary/60" />
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                <Switch 
                  checked={!!(settings.theme === 'dark')} 
                  onCheckedChange={(checked) => setSettings({ ...settings, theme: checked ? 'dark' : 'light' })}
                />
              </div>
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setSettings({ ...settings, role: settings.role === 'caregiver' ? 'adult' : 'caregiver' })}
              >
                <div className="flex items-center gap-3">
                  <HeartPulse className="w-5 h-5 text-primary/60" />
                  <span className="text-sm font-medium">Caregiver Mode</span>
                </div>
                <Switch 
                  checked={!!(settings.role === 'caregiver')} 
                  onCheckedChange={(checked) => setSettings({ ...settings, role: checked ? 'caregiver' : 'adult' })}
                />
              </div>
            </div>
          </Card>
        </section>

        {settings.role === 'caregiver' && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Caregiver Tools</h2>
            <Button 
              variant="outline" 
              className="w-full h-16 justify-between px-4 border-primary/20 bg-primary/5 hover:bg-primary/10"
              onClick={() => setShowCaregiverScreen(true)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Caregiver Portal</p>
                  <p className="text-[10px] text-muted-foreground">Log notes and monitor progress</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </section>
        )}

        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Resources</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'nutrition', label: 'Nutrition Guide', icon: Apple, color: 'bg-green-500/10 text-green-600' },
              { id: 'sleep', label: 'Sleep & Stress', icon: Moon, color: 'bg-blue-500/10 text-blue-600' },
              { id: 'movement', label: 'Movement Library', icon: Zap, color: 'bg-orange-500/10 text-orange-600' },
              { id: 'mental', label: 'Mental Stimulation', icon: Brain, color: 'bg-purple-500/10 text-purple-600' },
            ].map((res, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="h-16 justify-between px-4 border-none shadow-sm bg-card/50 backdrop-blur-xl hover:bg-muted/50"
                onClick={() => onOpenResource(res.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", res.color)}>
                    <res.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{res.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </section>

        <div className="pt-8 space-y-4">
          <Button 
            className="w-full h-14 font-bold bg-primary hover:bg-primary/90 rounded-2xl"
            onClick={onLogout}
          >
            Sign Out
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-14 text-destructive hover:bg-destructive/5 font-medium underline"
            onClick={onReset}
          >
            Reset Application Data
          </Button>
          <p className="text-[10px] text-center text-muted-foreground/40 px-8">
            Stay Sharp After 45 • Version 2.0.0<br/>
            Secured by Firebase Authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

const ResourceDetail = ({ title, content, onBack }: { title: string, content: React.ReactNode, onBack: () => void }) => (
  <div className="pb-24 pt-6 px-6 max-w-md mx-auto relative z-10">
    <Button variant="ghost" onClick={onBack} className="mb-4 -ml-4 text-muted-foreground">
      <ChevronLeft className="w-4 h-4 mr-1" /> Back to Resources
    </Button>
    <h1 className="text-3xl font-heading font-bold text-primary mb-6">{title}</h1>
    {content}
  </div>
);

const NutritionGuide = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">The MIND Diet</h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        The MIND diet combines the best of Mediterranean and DASH diets to specifically target brain health.
      </p>
      <Card className="border-none shadow-sm bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-lg font-heading">The One-Plate Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-green-500/20 flex items-center justify-center text-[10px] text-center p-2 font-bold text-green-700">
              1/2 Veggies<br/>1/4 Protein<br/>1/4 Grains
            </div>
            <p className="text-xs text-muted-foreground">
              Visualize your plate: half colorful vegetables, one quarter lean protein, and one quarter whole grains. Drizzle with olive oil.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>

    <section>
      <h3 className="font-semibold text-primary mb-3">10 Foods to Embrace</h3>
      <div className="grid gap-2">
        {MIND_DIET_FOODS.embrace.map((food, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
            <div>
              <p className="text-sm font-medium">{food.name}</p>
              <p className="text-[10px] text-muted-foreground">{food.nutrients}</p>
            </div>
            <Badge variant="secondary" className="text-[10px]">{food.target}</Badge>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="font-semibold text-primary mb-3">5 Foods to Limit</h3>
      <div className="grid gap-2">
        {MIND_DIET_FOODS.limit.map((food, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-card border border-border">
            <p className="text-sm font-medium">{food.name}</p>
            <Badge variant="outline" className="text-[10px] text-destructive border-destructive/20">{food.limit}</Badge>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const SleepStressGuide = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Sleep Hygiene</h2>
      <div className="space-y-3">
        {[
          "Maintain consistent bedtime and wake time",
          "Limit daytime naps to 30 minutes",
          "Reduce caffeine after 2 PM",
          "Keep bedroom cool (65-68°F)",
          "Avoid screens 1 hour before bed"
        ].map((tip, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{tip}</span>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-heading font-bold text-primary mb-4">Stress Reduction</h2>
      <Card className="border-none shadow-sm bg-teal-500/5">
        <CardHeader>
          <CardTitle className="text-lg font-heading">4-7-8 Breathing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-around text-center">
            <div><p className="text-2xl font-bold text-teal-600">4</p><p className="text-[10px] uppercase">Inhale</p></div>
            <div><p className="text-2xl font-bold text-teal-600">7</p><p className="text-[10px] uppercase">Hold</p></div>
            <div><p className="text-2xl font-bold text-teal-600">8</p><p className="text-[10px] uppercase">Exhale</p></div>
          </div>
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Timer</Button>
        </CardContent>
      </Card>
    </section>
  </div>
);

const AssessmentScreen = ({ onComplete }: { onComplete: (a: Omit<SelfAssessment, 'id' | 'date'>) => void }) => {
  const [scores, setScores] = useState({
    mentalClarity: 5,
    memory: 5,
    focus: 5,
    mood: 5,
    energy: 5,
    sleepQuality: 5,
  });

  const metrics = [
    { id: 'mentalClarity', label: 'Mental Clarity' },
    { id: 'memory', label: 'Memory' },
    { id: 'focus', label: 'Focus & Concentration' },
    { id: 'mood', label: 'Overall Mood' },
    { id: 'energy', label: 'Energy Level' },
    { id: 'sleepQuality', label: 'Sleep Quality' },
  ];

  return (
    <div className="pb-24 pt-6 px-6 max-w-md mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-2">Self-Assessment</h1>
      <p className="text-muted-foreground mb-8 text-sm">Rate each area from 1 (very poor) to 10 (excellent).</p>
      
      <div className="space-y-8 mb-12">
        {metrics.map((m) => (
          <div key={m.id} className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">{m.label}</label>
              <span className="text-lg font-bold text-primary">{scores[m.id as keyof typeof scores]}</span>
            </div>
            <input 
              type="range" min="1" max="10" 
              value={scores[m.id as keyof typeof scores]}
              onChange={(e) => setScores({ ...scores, [m.id]: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        ))}
      </div>

      <Button className="w-full h-14 text-lg" onClick={() => onComplete(scores)}>
        Complete Assessment
      </Button>
    </div>
  );
};

// --- Main App ---

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/10">
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* Left Pane - Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 py-24 z-10 bg-background relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">The Gold Standard in Cognitive Longevity</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-medium text-primary mb-8 leading-[0.9] tracking-tight">
              Preserve Your <br /> 
              <span className="italic text-accent font-light">Mental Edge.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed font-light">
              Stay Sharp is a premium, science-backed protocol designed for high-performers over 45 who refuse to let cognitive decline define their future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button 
                size="lg" 
                className="h-16 px-10 text-lg rounded-full shadow-2xl shadow-primary/20 group bg-primary hover:bg-primary/90"
                onClick={onStart}
              >
                Begin Your Protocol
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-16 px-10 text-lg rounded-full border-primary/20 hover:bg-primary/5"
                onClick={() => {
                  const el = document.getElementById('science');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore the Science
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <p className="text-2xl font-heading font-bold text-primary">30</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Day Protocol</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Science Backed</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-primary">45+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Target Age</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Pane - Visual/Atmospheric */}
        <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse delay-700" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center w-full p-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative"
            >
              <div className="w-80 h-80 rounded-[4rem] border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 rotate-12">
                <Brain className="w-32 h-32 text-white/80 -rotate-12" />
              </div>
              <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-3xl shadow-2xl rotate-[-6deg]">
                <Activity className="w-8 h-8 text-primary mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Real-time Bio-feedback</p>
              </div>
              <div className="absolute -top-10 -right-10 p-6 bg-accent rounded-3xl shadow-2xl rotate-[6deg] text-accent-foreground">
                <ShieldCheck className="w-8 h-8 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Cognitive Shield</p>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <div className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold vertical-text">
              Stay Sharp Protocol © 2026
            </div>
            <div className="max-w-[200px] text-right">
              <p className="text-white/60 text-[10px] leading-relaxed italic">
                "The brain is the only organ that can improve with age if given the right environment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars Section - Professional Grid */}
      <section id="science" className="py-32 px-6 bg-muted/20 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-heading font-medium text-primary mb-6">The Five Pillars of <br />Cognitive Reserve</h2>
              <p className="text-muted-foreground leading-relaxed">Our protocol isn't just a habit tracker. It's a comprehensive lifestyle architecture based on the latest neuro-longevity research.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40 mb-2">Scientific Foundation</p>
              <div className="h-px w-32 bg-primary/20 ml-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Apple, title: "MIND Nutrition", color: "bg-green-500/10 text-green-600", desc: "Neuro-protective dietary patterns." },
              { icon: Activity, title: "Vascular Flow", color: "bg-red-500/10 text-red-600", desc: "Optimizing oxygen delivery." },
              { icon: Brain, title: "Neuro-Stim", color: "bg-blue-500/10 text-blue-600", desc: "Building synaptic density." },
              { icon: Moon, title: "Glymphatic Reset", color: "bg-indigo-500/10 text-indigo-600", desc: "Deep metabolic clearing." },
              { icon: Wind, title: "Cortisol Control", color: "bg-orange-500/10 text-orange-600", desc: "Stress-resilience training." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", pillar.color)}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold mb-3 text-primary">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Detailed Steps */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-heading font-medium text-primary mb-4">How the Protocol Works</h2>
            <p className="text-muted-foreground">A structured 30-day journey from foundation to peak performance.</p>
          </div>

          <div className="space-y-24 relative">
            {/* Connecting Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 hidden md:block" />

            {[
              { 
                step: "01", 
                title: "Baseline Assessment", 
                desc: "We begin with a comprehensive cognitive and lifestyle audit to understand your current neuro-profile.",
                icon: BarChart3,
                side: "left"
              },
              { 
                step: "02", 
                title: "The 30-Day Immersion", 
                desc: "Daily micro-habits across all five pillars, delivered through a focused, distraction-free interface.",
                icon: Calendar,
                side: "right"
              },
              { 
                step: "03", 
                title: "Biometric Tracking", 
                desc: "Monitor your progress with advanced analytics that visualize your cognitive trends and habit consistency.",
                icon: Activity,
                side: "left"
              },
              { 
                step: "04", 
                title: "Peak Optimization", 
                desc: "Advanced protocols for those who have mastered the basics and want to push their mental boundaries.",
                icon: Zap,
                side: "right"
              }
            ].map((item, i) => (
              <div key={i} className={cn("flex flex-col md:flex-row items-center gap-12 relative", item.side === 'right' && "md:flex-row-reverse")}>
                <div className="flex-1 w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn("p-10 rounded-[2.5rem] bg-card border border-border/50 shadow-sm relative overflow-hidden", item.side === 'left' ? "md:text-right" : "md:text-left")}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                      <item.icon className="w-32 h-32" />
                    </div>
                    <span className="text-4xl font-heading font-bold text-primary/10 mb-4 block">{item.step}</span>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
                <div className="z-10 w-10 h-10 rounded-full bg-primary border-4 border-background shadow-xl hidden md:flex items-center justify-center text-white text-[10px] font-bold">
                  {item.step}
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-12">
            <HeartPulse className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-light italic mb-12 leading-tight">
            "The Stay Sharp protocol has given me back the mental clarity I thought was lost to age. It's not just an app; it's a second chance at my best self."
          </h2>
          <div className="h-px w-12 bg-accent/30 mx-auto mb-6" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Dr. Elena Vance • Neuro-Longevity Specialist</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading font-medium text-primary mb-8">Ready to Reclaim <br /> Your Edge?</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed">Join thousands of high-performers who are securing their cognitive future today.</p>
          <Button 
            size="lg" 
            className="h-20 px-12 text-xl rounded-full shadow-2xl shadow-primary/20 group bg-primary hover:bg-primary/90"
            onClick={onStart}
          >
            Start Your 30-Day Journey
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-8 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">No Credit Card Required • Science-Backed Protocol</p>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-20 px-8 border-t border-border/50 bg-muted/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-primary">Stay Sharp</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-8">
              Stay Sharp is the world's leading digital companion for cognitive longevity after 45. We combine cutting-edge neuroscience with effortless habit design.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5"><Share2 className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5"><Users className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5"><MessageSquare className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">The Protocol</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><button className="hover:text-primary transition-colors">MIND Nutrition</button></li>
              <li><button className="hover:text-primary transition-colors">Vascular Health</button></li>
              <li><button className="hover:text-primary transition-colors">Sleep Architecture</button></li>
              <li><button className="hover:text-primary transition-colors">Mental Stimulation</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><button className="hover:text-primary transition-colors">Scientific Whitepaper</button></li>
              <li><button className="hover:text-primary transition-colors">Caregiver Guide</button></li>
              <li><button className="hover:text-primary transition-colors">Community Forum</button></li>
              <li><button className="hover:text-primary transition-colors">Contact Support</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">© 2026 Stay Sharp Wellness. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
            <button className="hover:text-primary transition-colors">Cookie Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const [settings, setSettings] = useLocalStorage<UserSettings>('ss45_settings', {
    role: 'adult',
    ageRange: '45-54',
    goals: [],
    reminderTime: '08:00',
    reminderStyle: 'gentle',
    remindersEnabled: false,
    theme: 'light',
    onboarded: false,
  });

  const [activeTab, setActiveTab] = useState('today');
  const [resourceTab, setResourceTab] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  
  // currentDay is now derived from startDate
  const currentDay = settings.startDate 
    ? Math.min(30, Math.max(1, Math.floor((Date.now() - new Date(settings.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1))
    : 1;

  const [completedDays, setCompletedDays] = useLocalStorage<number[]>('ss45_completed_days', []);
  const [habitLogs, setHabitLogs] = useLocalStorage<Record<string, HabitLog>>('ss45_habit_logs', {});
  const [assessments, setAssessments] = useLocalStorage<SelfAssessment[]>('ss45_assessments', []);
  const [caregiverNotes, setCaregiverNotes] = useLocalStorage<CaregiverNote[]>('ss45_caregiver_notes', []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayHabitLog = habitLogs[todayStr] || {
    date: todayStr,
    sleep: false,
    hydration: false,
    movement: false,
    brainChallenge: false,
    stressManagement: false,
    socialConnection: false,
    readingLearning: false,
    brainFood: false,
  };

  const [hasStarted, setHasStarted] = useLocalStorage<boolean>('ss45_has_started', false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setSigningIn(false);
    }
  };

  const handleEmailAuth = async (email: string, pass: string, isSignUp: boolean) => {
    setSigningIn(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, pass);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
    } catch (error) {
      console.error("Email auth failed:", error);
      throw error;
    } finally {
      setSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleCompleteTask = async () => {
    if (!completedDays.includes(currentDay)) {
      const newCompleted = [...completedDays, currentDay];
      setCompletedDays(newCompleted);
      
      if (currentDay === 14 || currentDay === 29) {
        setShowAssessment(true);
      }
    }
  };

  const handleToggleHabit = async (habit: keyof HabitLog) => {
    const updatedLog = { ...todayHabitLog, [habit]: !todayHabitLog[habit] };
    setHabitLogs({ ...habitLogs, [todayStr]: updatedLog });
  };

  const handleAddCaregiverNote = async (observation: string, category: any) => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      observation,
      category
    };
    setCaregiverNotes([newNote as CaregiverNote, ...caregiverNotes]);
  };

  const handleCompleteAssessment = async (scores: Omit<SelfAssessment, 'id' | 'date'>) => {
    const newAssessment = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      ...scores
    };
    setAssessments([newAssessment as SelfAssessment, ...assessments]);
    setShowAssessment(false);
  };

  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleReset = async () => {
    // Clear local progress states
    setCompletedDays([]);
    setHabitLogs({});
    setAssessments([]);
    setCaregiverNotes([]);
    
    // Reset settings but keep onboarded status if we want to stay in app
    // We reset startDate to now so they start at Day 1 again
    const now = new Date().toISOString();
    const resetSettings = { ...settings, onboarded: true, startDate: now };
    setSettings(resetSettings);
    
    setShowResetDialog(false);
  };

  // Reminder Logic
  useEffect(() => {
    if (!settings.remindersEnabled) return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (currentTime === settings.reminderTime) {
        triggerAlarm();
      }
    };

    const triggerAlarm = () => {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Brain Health Reminder", {
          body: settings.reminderStyle === 'strict' 
            ? "Time for your brain health protocol! No excuses." 
            : "Ready for your daily brain health tasks?",
          icon: "/favicon.ico",
          tag: 'brain-health-reminder',
          requireInteraction: true
        });
        
        if ("vibrate" in navigator) {
          navigator.vibrate([500, 200, 500, 200, 500]);
        }
        
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log("Audio play blocked by browser"));
      }
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Initial check
    return () => clearInterval(interval);
  }, [settings.remindersEnabled, settings.reminderTime, settings.reminderStyle]);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) return;
    
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSettings(prev => ({ ...prev, remindersEnabled: true }));
        new Notification("Notifications Enabled", {
          body: "You'll now receive daily reminders for your protocol.",
          icon: "/favicon.ico"
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const handleRemindLater = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Reminder Delayed", {
        body: "We'll remind you again in a bit to stay on track!",
        icon: "/favicon.ico"
      });
      alert("We'll remind you again later today!");
    } else {
      requestNotificationPermission();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasStarted) return <LandingPage onStart={() => setHasStarted(true)} />;

  if (!user) {
    return <AuthScreen onGoogleLogin={handleLogin} onEmailAuth={handleEmailAuth} isLoading={signingIn} />;
  }

  if (!settings.onboarded) {
    return <Onboarding onComplete={(s) => {
      const onboardSettings = { ...s, startDate: new Date().toISOString() };
      setSettings(onboardSettings);
    }} />;
  }

  if (showAssessment) {
    return <AssessmentScreen onComplete={handleCompleteAssessment} />;
  }

  const currentTask = PROTOCOL_TASKS.find(t => t.day === currentDay) || PROTOCOL_TASKS[0];

  const renderContent = () => {
    if (resourceTab === 'nutrition') return <ResourceDetail title="Nutrition Guide" content={<NutritionGuide />} onBack={() => setResourceTab(null)} />;
    if (resourceTab === 'sleep') return <ResourceDetail title="Sleep & Stress" content={<SleepStressGuide />} onBack={() => setResourceTab(null)} />;
    if (resourceTab === 'movement') return <ResourceDetail title="Movement Library" content={<MovementGuide />} onBack={() => setResourceTab(null)} />;
    if (resourceTab === 'mental') return <ResourceDetail title="Mental Stimulation" content={<MentalGuide />} onBack={() => setResourceTab(null)} />;
    
    switch (activeTab) {
      case 'today':
        return (
          <TodayScreen 
            currentDay={currentDay} 
            task={currentTask} 
            onComplete={handleCompleteTask}
            completed={completedDays.includes(currentDay)}
            onRemindLater={handleRemindLater}
          />
        );
      case 'plan':
        return <PlanScreen currentDay={currentDay} completedDays={completedDays} />;
      case 'nutrition':
        return <ResourceDetail title="Nutrition" content={<NutritionGuide />} onBack={() => setActiveTab('today')} />;
      case 'track':
        return (
          <TrackScreen 
            habitLog={todayHabitLog} 
            onToggleHabit={handleToggleHabit}
            assessments={assessments}
            completedDays={completedDays}
            setActiveTab={setActiveTab}
            currentDay={currentDay}
          />
        );
      case 'analytics':
        return <AnalyticsScreen assessments={assessments} habitLogs={habitLogs} completedDays={completedDays} />;
      case 'profile':
        return (
          <ProfileScreen 
            settings={settings} 
            setSettings={setSettings} 
            onOpenResource={setResourceTab} 
            onReset={() => setShowResetDialog(true)}
            caregiverNotes={caregiverNotes}
            onAddNote={handleAddCaregiverNote}
            requestNotificationPermission={requestNotificationPermission}
            onLogout={handleLogout}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab + (resourceTab || '') + showAssessment}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.main>
      </AnimatePresence>

      {!showAssessment && !resourceTab && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Reset All Data?</DialogTitle>
            <DialogDescription>
              This will clear your progress and history from this device.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={() => setShowResetDialog(false)}>Cancel</Button>
            <Button variant="destructive" className="flex-1" onClick={handleReset}>Reset Everything</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
