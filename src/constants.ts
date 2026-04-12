import { DailyTask } from './types';

export const PROTOCOL_TASKS: DailyTask[] = [
  {
    day: 1,
    phase: 'foundation',
    title: 'Start Your Sleep Transformation',
    whyItMatters: 'Deep sleep activates the glymphatic system, which flushes out amyloid beta and tau proteins associated with Alzheimer\'s.',
    instructions: [
      'Calculate your ideal 8-hour sleep window.',
      'Set a phone alarm for 30 minutes before your target bedtime as a "wind-down" signal.',
      'When the alarm sounds, stop all screens and dim the lights.',
      'Remove your phone from the bedroom entirely.',
      'If you cannot fall asleep within 20 minutes, get up and do a quiet activity until sleepy.'
    ],
    estimatedTime: '30 mins',
    pillar: 'sleep'
  },
  {
    day: 2,
    phase: 'foundation',
    title: 'Hydrate Your Brain',
    whyItMatters: 'Dehydration of just 2% body weight reduces cognitive performance, working memory, and attention.',
    instructions: [
      'Drink a full 16-ounce glass of water immediately upon waking.',
      'Fill a water bottle and keep it visible on your desk or counter.',
      'Set 4-5 reminders on your phone to drink 8 ounces every 2 hours.',
      'Replace one sugary or caffeinated drink today with water.',
      'Aim for at least 8 glasses (64 ounces) by the end of the day.'
    ],
    estimatedTime: '5 mins',
    pillar: 'nutrition'
  },
  {
    day: 3,
    phase: 'foundation',
    title: 'Take Your First Brain-Boosting Walk',
    whyItMatters: 'A single 20-minute walk increases BDNF levels by approximately 32%, supporting the growth of new neural connections.',
    instructions: [
      'Walk for 20 minutes at a brisk pace.',
      'Walk outdoors if possible, preferably in a park or trail.',
      'Leave your phone in your pocket and notice the sights and sounds.',
      'Try to walk at the same time each day to build consistency.'
    ],
    estimatedTime: '20 mins',
    pillar: 'movement'
  },
  {
    day: 4,
    phase: 'foundation',
    title: 'Eat One Brain-Boosting Food Today',
    whyItMatters: 'People who eat just one serving of leafy greens daily have brains that appear 11 years younger on MRI scans.',
    instructions: [
      'Choose ONE brain-boosting food: walnuts, blueberries, fatty fish, or leafy greens.',
      'Prepare it simply: walnuts as a snack, blueberries in yogurt, or sauteed greens.',
      'Notice the taste and texture while eating.',
      'Plan which brain-boosting food you will eat tomorrow.'
    ],
    estimatedTime: '15 mins',
    pillar: 'nutrition'
  },
  {
    day: 5,
    phase: 'foundation',
    title: 'Learn Something Completely New',
    whyItMatters: 'Learning a completely new skill builds 3x more neural connections than repeating a familiar activity.',
    instructions: [
      'Spend 15 minutes today learning something you have NEVER done before.',
      'Options: 5 words in a new language, a Sudoku puzzle, juggling, or a new craft.',
      'Focus on being a beginner and embrace the discomfort of learning.'
    ],
    estimatedTime: '15 mins',
    pillar: 'mental'
  },
  {
    day: 6,
    phase: 'foundation',
    title: 'Have a Meaningful Conversation',
    whyItMatters: 'Adults with strong social networks have a 50% lower risk of developing dementia compared to those who are socially isolated.',
    instructions: [
      'Have a 15-minute or longer face-to-face or phone conversation.',
      'Go beyond small talk: ask open-ended questions about their life or share a story.',
      'Practice active listening: make eye contact and respond thoughtfully.'
    ],
    estimatedTime: '15 mins',
    pillar: 'social'
  },
  {
    day: 7,
    phase: 'foundation',
    title: 'Practice 5 Minutes of Deep Breathing',
    whyItMatters: 'Just 5 minutes of daily deep breathing practice reduces cortisol levels by up to 25% and improves attention.',
    instructions: [
      'Set a timer for 5 minutes in a quiet place.',
      'Breathe in slowly through your nose for 4 counts.',
      'Hold the breath gently for 4 counts.',
      'Exhale slowly through your mouth for 6 counts.',
      'Repeat this cycle for the full 5 minutes.'
    ],
    estimatedTime: '5 mins',
    pillar: 'stress'
  },
  {
    day: 8,
    phase: 'foundation',
    title: 'Read for 15 Minutes (Aloud)',
    whyItMatters: 'Adults who read regularly have a 32% lower rate of cognitive decline compared to non-readers.',
    instructions: [
      'Choose a book or article to read aloud for 15 minutes.',
      'Read slowly and clearly, focusing on comprehension.',
      'After reading, try to summarize the key points from memory.'
    ],
    estimatedTime: '15 mins',
    pillar: 'mental'
  },
  {
    day: 9,
    phase: 'foundation',
    title: 'Eliminate One Brain-Damaging Food',
    whyItMatters: 'Adults who consume high amounts of processed foods have a 25% higher risk of cognitive decline.',
    instructions: [
      'Choose ONE brain-damaging food to eliminate today (sugary drinks, processed snacks, fried foods).',
      'Replace it with a brain-healthy alternative (sparkling water, mixed nuts, baked option).',
      'Notice how you feel after the swap.'
    ],
    estimatedTime: '5 mins',
    pillar: 'nutrition'
  },
  {
    day: 10,
    phase: 'foundation',
    title: 'Try a Brain Challenge Game',
    whyItMatters: 'Strategic game players show improved executive function, memory, and processing speed.',
    instructions: [
      'Play a game that requires strategy AND speed for 15-20 minutes.',
      'Options: chess, bridge, strategy board game, or dual n-back exercise.',
      'Choose a game that is challenging but not frustrating.'
    ],
    estimatedTime: '20 mins',
    pillar: 'mental'
  },
  {
    day: 11,
    phase: 'foundation',
    title: 'Get 15 Minutes of Morning Sunlight',
    whyItMatters: 'Morning light exposure improves sleep quality by 85% and increases next-day cognitive performance by 20%.',
    instructions: [
      'Within 30 minutes of waking, get outside for 15 minutes of direct sunlight.',
      'Do not wear sunglasses during this time.',
      'Combine this with your daily walk for a double benefit.'
    ],
    estimatedTime: '15 mins',
    pillar: 'sleep'
  },
  {
    day: 12,
    phase: 'foundation',
    title: 'Do a Digital Detox Evening',
    whyItMatters: 'Adults who use screens within 1 hour of bedtime have 30% less deep sleep and 40% worse memory consolidation.',
    instructions: [
      'After 7 PM today, turn off all non-essential screens.',
      'Replace screen time with reading, conversation, puzzles, or journaling.',
      'Notice how you feel before bed and the next morning.'
    ],
    estimatedTime: 'Evening',
    pillar: 'sleep'
  },
  {
    day: 13,
    phase: 'foundation',
    title: 'Cook a Brain-Boosting Meal',
    whyItMatters: 'Cooking complex meals from scratch engages working memory, executive function, and spatial reasoning.',
    instructions: [
      'Prepare a meal today using at least 3 brain-boosting ingredients.',
      'Try a new recipe that you have never made before.',
      'Focus on the sensory experience: colors, smells, textures, and flavors.'
    ],
    estimatedTime: '45 mins',
    pillar: 'nutrition'
  },
  {
    day: 14,
    phase: 'foundation',
    title: 'Reflect and Plan: Foundation Assessment',
    whyItMatters: 'People who track their habits and reflect on progress are 42% more likely to maintain them long-term.',
    instructions: [
      'Rate yourself 1 to 10 on each of the 6 pillars from Weeks 1-2.',
      'Write down which habit felt easiest and which felt hardest.',
      'Choose one specific improvement you will make for Phase 2.'
    ],
    estimatedTime: '15 mins',
    pillar: 'mental'
  },
  {
    day: 15,
    phase: 'acceleration',
    title: 'Increase Your Walk to 30 Minutes',
    whyItMatters: 'Walking 30+ minutes daily is associated with 50% greater hippocampal volume compared to sedentary adults.',
    instructions: [
      'Walk for 30 minutes at a moderate pace.',
      'If possible, walk in a natural setting for a "forest bathing" effect.',
      'Try walking with a friend or family member to combine movement and social connection.'
    ],
    estimatedTime: '30 mins',
    pillar: 'movement'
  },
  {
    day: 16,
    phase: 'acceleration',
    title: 'Try the Mediterranean Plate Method',
    whyItMatters: 'Adults following a Mediterranean diet pattern show 40% lower rates of cognitive decline.',
    instructions: [
      'Build every meal today using this structure: half vegetables, quarter lean protein, quarter whole grains.',
      'Use olive oil as your primary cooking and dressing fat.',
      'Include at least 2 different colors of vegetables at lunch and dinner.'
    ],
    estimatedTime: 'Daily',
    pillar: 'nutrition'
  },
  {
    day: 17,
    phase: 'acceleration',
    title: 'Learn 10 Words in a New Language',
    whyItMatters: 'Bilingual individuals develop dementia an average of 4.5 years later than monolinguals.',
    instructions: [
      'Use a free app or channel to learn 10 words or phrases in a new language.',
      'Practice saying each word aloud multiple times.',
      'Try to use one word or phrase in a real conversation.'
    ],
    estimatedTime: '20 mins',
    pillar: 'mental'
  },
  {
    day: 18,
    phase: 'acceleration',
    title: 'Practice the 4-7-8 Breathing Technique',
    whyItMatters: 'The 4-7-8 breathing technique reduces cortisol by 30% and activates the parasympathetic nervous system within 90 seconds.',
    instructions: [
      'Inhale quietly through your nose for 4 counts.',
      'Hold your breath gently for 7 counts.',
      'Exhale completely through your mouth for 8 counts.',
      'Repeat this cycle 4 times, twice today.'
    ],
    estimatedTime: '5 mins',
    pillar: 'stress'
  },
  {
    day: 19,
    phase: 'acceleration',
    title: 'Have a Technology-Free Social Meal',
    whyItMatters: 'Families who share regular device-free meals report 30% higher relationship satisfaction and 25% lower stress levels.',
    instructions: [
      'Share a meal with someone today with all devices put away.',
      'Focus entirely on the conversation and the food.',
      'Notice how the meal feels different without screens.'
    ],
    estimatedTime: '45 mins',
    pillar: 'social'
  },
  {
    day: 20,
    phase: 'acceleration',
    title: 'Try a New Physical Activity',
    whyItMatters: 'Novel physical activities create 40% more new neural pathways than repeating familiar exercises.',
    instructions: [
      'Try a physical activity you have NEVER done before for 15-20 minutes.',
      'Options: yoga, tai chi, swimming, dancing, or resistance training.',
      'Focus on learning and having fun, not being perfect.'
    ],
    estimatedTime: '20 mins',
    pillar: 'movement'
  },
  {
    day: 21,
    phase: 'acceleration',
    title: 'Write a Gratitude Letter',
    whyItMatters: 'Gratitude practice activates the medial prefrontal cortex and increases dopamine and serotonin by up to 25%.',
    instructions: [
      'Think of someone who has positively impacted your life.',
      'Write a handwritten letter to this person being specific about what they did.',
      'Deliver the letter in person if possible, or mail it.'
    ],
    estimatedTime: '20 mins',
    pillar: 'social'
  },
  {
    day: 22,
    phase: 'acceleration',
    title: 'Do a Complex Puzzle or Strategy Challenge',
    whyItMatters: 'Adults who engage in progressively challenging cognitive activities show 60% slower cognitive decline.',
    instructions: [
      'Spend 30 minutes today on a challenging cognitive activity.',
      'Options: learning a chess opening, solving a difficult crossword, or trying a Rubik\'s cube.',
      'The activity should feel challenging but not frustrating.'
    ],
    estimatedTime: '30 mins',
    pillar: 'mental'
  },
  {
    day: 23,
    phase: 'acceleration',
    title: 'Take a Nature Walk (60 Minutes)',
    whyItMatters: 'A 60-minute nature walk reduces cortisol by 16%, increases creativity by 50%, and improves working memory by 20%.',
    instructions: [
      'Walk in a natural setting (park, trail, garden) for 60 minutes.',
      'Leave your phone in your pocket or on airplane mode.',
      'Observe 5 specific things in nature that you have never noticed before.'
    ],
    estimatedTime: '60 mins',
    pillar: 'movement'
  },
  {
    day: 24,
    phase: 'acceleration',
    title: 'Prepare a Brain-Boosting Snack Kit',
    whyItMatters: 'People who pre-portion healthy snacks eat 45% more fruits and nuts and 60% less processed food.',
    instructions: [
      'Create a snack kit for the week with walnuts, almonds, and dark chocolate.',
      'Wash and prep berries, carrots, and celery for easy snacking.',
      'Place your snack kit in a visible, accessible location.'
    ],
    estimatedTime: '20 mins',
    pillar: 'nutrition'
  },
  {
    day: 25,
    phase: 'acceleration',
    title: 'Teach Someone Something New',
    whyItMatters: 'Teaching others activates the same brain regions as learning and strengthens neural connections by up to 40%.',
    instructions: [
      'Teach someone a skill, fact, or technique you have learned during this protocol.',
      'Explain it clearly and answer questions.',
      'Ask the person to teach you something in return.'
    ],
    estimatedTime: '20 mins',
    pillar: 'social'
  },
  {
    day: 26,
    phase: 'acceleration',
    title: 'Do a Full Digital Detox Day',
    whyItMatters: 'A single day of digital detox reduces anxiety by 20% and enhances sleep quality by 25%.',
    instructions: [
      'From waking until 7 PM today, use screens only for essential tasks.',
      'Fill the time with walking, reading, cooking, or socializing in person.',
      'Notice what happens when you eliminate the constant stream of digital input.'
    ],
    estimatedTime: 'Full Day',
    pillar: 'sleep'
  },
  {
    day: 27,
    phase: 'acceleration',
    title: 'Practice Mindful Eating for One Meal',
    whyItMatters: 'Mindful eating reduces overeating by 30%, improves digestion by 25%, and engages multiple brain regions.',
    instructions: [
      'Choose one meal today to eat in complete silence.',
      'Observe the colors, smells, and arrangement of the food.',
      'Eat slowly and chew each bite thoroughly.',
      'Pay attention to your body\'s signals of fullness.'
    ],
    estimatedTime: '20 mins',
    pillar: 'nutrition'
  },
  {
    day: 28,
    phase: 'acceleration',
    title: 'Create Your Personal Brain Health Routine',
    whyItMatters: 'Adults who establish a written daily routine are 3x more likely to maintain healthy habits after 6 months.',
    instructions: [
      'Write down your ideal daily brain health schedule.',
      'Include wake time, morning sunlight, exercise, brain challenge, and bedtime.',
      'Start with just 3-4 habits and build up gradually.'
    ],
    estimatedTime: '20 mins',
    pillar: 'routine'
  },
  {
    day: 29,
    phase: 'acceleration',
    title: 'Complete Your Final Self-Assessment',
    whyItMatters: 'Adults who complete regular self-assessments are 65% more likely to maintain new habits.',
    instructions: [
      'Rate yourself 1 to 10 on all 6 pillars again.',
      'Compare your Day 29 scores to your Day 14 scores.',
      'Write down your top 3 wins from the 30 days.'
    ],
    estimatedTime: '15 mins',
    pillar: 'mental'
  },
  {
    day: 30,
    phase: 'acceleration',
    title: 'Celebrate and Commit',
    whyItMatters: 'Written commitment increases the likelihood of maintaining new habits by 42% over 6 months.',
    instructions: [
      'Celebrate your achievement in a meaningful way.',
      'Write a commitment letter to yourself to maintain these habits.',
      'Choose 3 non-negotiable daily habits to keep forever.'
    ],
    estimatedTime: '30 mins',
    pillar: 'routine'
  }
];

export const MIND_DIET_FOODS = {
  embrace: [
    { name: 'Leafy Greens', target: '1+ serving daily', nutrients: 'Vitamin K, folate, lutein' },
    { name: 'Other Vegetables', target: '1+ serving daily', nutrients: 'Antioxidants, fiber' },
    { name: 'Nuts', target: '1 handful daily', nutrients: 'Omega-3s, Vitamin E' },
    { name: 'Berries', target: '2+ servings weekly', nutrients: 'Anthocyanins, antioxidants' },
    { name: 'Beans & Lentils', target: '3+ servings weekly', nutrients: 'Folate, fiber, protein' },
    { name: 'Whole Grains', target: '3+ servings daily', nutrients: 'B vitamins, fiber' },
    { name: 'Fish', target: '1+ serving weekly', nutrients: 'Omega-3 fatty acids (DHA, EPA)' },
    { name: 'Poultry', target: '2+ servings weekly', nutrients: 'Lean protein, B vitamins' },
    { name: 'Olive Oil', target: 'Primary cooking fat', nutrients: 'Polyphenols, oleocanthal' },
    { name: 'Wine (Optional)', target: '1 glass daily (red)', nutrients: 'Resveratrol, flavonoids' }
  ],
  limit: [
    { name: 'Red Meat', limit: 'Fewer than 4 servings/week' },
    { name: 'Butter & Margarine', limit: 'Less than 1 Tbsp daily' },
    { name: 'Cheese', limit: 'Less than 1 serving weekly' },
    { name: 'Pastries & Sweets', limit: 'Fewer than 5 servings/week' },
    { name: 'Fried & Fast Food', limit: 'Less than 1 serving weekly' }
  ]
};
