/*
  # Seed Health Articles

  1. Inserts sample articles for each category
  2. Uses stock images from Pexels
  3. Includes realistic health content
*/

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at) 
SELECT 
  'The Complete Guide to Balanced Nutrition',
  'complete-guide-balanced-nutrition',
  'Learn the fundamentals of nutrition and how to build a diet that works for your body type and lifestyle.',
  '<h2>Understanding Macronutrients</h2><p>A balanced diet contains three main macronutrients: carbohydrates, proteins, and fats. Each plays a crucial role in maintaining your health.</p><h3>Carbohydrates</h3><p>Carbohydrates are your body''s primary energy source. They should comprise about 45-65% of your daily calories. Focus on complex carbohydrates like whole grains, vegetables, and legumes rather than refined sugars.</p><h3>Proteins</h3><p>Proteins are essential for building and repairing tissues. Aim for 10-35% of your daily calories from protein sources such as lean meats, fish, eggs, legumes, and dairy products.</p><h3>Healthy Fats</h3><p>Don''t fear fats! Healthy fats are vital for brain function and hormone production. Include sources like avocados, nuts, olive oil, and fatty fish.</p><h2>Building Your Perfect Plate</h2><p>A simple way to ensure balanced nutrition is the "plate method": half your plate should be vegetables and fruits, one quarter protein, and one quarter whole grains.</p><h2>Hydration Matters</h2><p>Drink at least 8 glasses of water daily. Water aids digestion, supports metabolism, and helps regulate body temperature.</p><h2>Tips for Success</h2><ul><li>Plan meals in advance</li><li>Shop with a list to avoid impulse purchases</li><li>Cook at home more often</li><li>Read nutrition labels</li><li>Listen to your body''s hunger cues</li></ul>',
  c.id,
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
  'Dr. Sarah Mitchell',
  8,
  now() - interval '30 days'
FROM categories c WHERE c.slug = 'nutrition'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Effective Home Workout Routines',
  'effective-home-workout-routines',
  'No gym needed! Discover powerful exercises you can do at home with minimal or no equipment.',
  '<h2>Getting Started with Home Fitness</h2><p>You don''t need an expensive gym membership to get fit. With bodyweight exercises and creative use of household items, you can build a complete fitness routine at home.</p><h2>Essential Bodyweight Exercises</h2><h3>Squats</h3><p>Squats strengthen your legs and glutes. Start with 3 sets of 15 reps and gradually increase.</p><h3>Push-ups</h3><p>Perfect for chest, shoulders, and triceps. Modify on your knees if needed.</p><h3>Planks</h3><p>Build core strength by holding a plank for 30-60 seconds. Rest and repeat 3 times.</p><h3>Lunges</h3><p>Alternate legs for 20 total reps (10 per leg) for lower body strength.</p><h2>Creating Your Routine</h2><p>Aim for 150 minutes of moderate exercise weekly. This could be 30 minutes, 5 days a week. Include strength training 2-3 times weekly and mix in cardio on other days.</p><h2>Cardio at Home</h2><p>Jump rope, dancing, jogging in place, or following online workout videos are excellent cardio options that require minimal space.</p><h2>Recovery is Key</h2><p>Include rest days, stretch regularly, and ensure adequate sleep for optimal results.</p>',
  c.id,
  'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
  'Coach James Davis',
  7,
  now() - interval '25 days'
FROM categories c WHERE c.slug = 'fitness'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Managing Stress: Practical Techniques for Daily Life',
  'managing-stress-practical-techniques',
  'Discover evidence-based methods to reduce stress and improve your mental wellbeing.',
  '<h2>Understanding Stress</h2><p>Stress is a natural response to demands, but chronic stress can harm your health. Learning to manage it is essential.</p><h2>Mindfulness and Meditation</h2><p>Spend 10 minutes daily practicing mindfulness or meditation. Focus on your breath and observe your thoughts without judgment.</p><h2>Physical Activity</h2><p>Exercise is one of the most effective stress relievers. Even a 20-minute walk can significantly reduce anxiety and improve mood.</p><h2>Sleep Quality</h2><p>Aim for 7-9 hours of quality sleep. Establish a consistent sleep schedule and create a relaxing bedtime routine.</p><h2>Social Connections</h2><p>Spend time with loved ones. Social interaction is crucial for mental health and stress reduction.</p><h2>Breathing Techniques</h2><p>Try the 4-7-8 breathing technique: Inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system.</p><h2>Time Management</h2><p>Prioritize tasks, delegate when possible, and learn to say no to protect your mental energy.</p>',
  c.id,
  'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
  'Dr. Emily Chen',
  6,
  now() - interval '20 days'
FROM categories c WHERE c.slug = 'mental-health'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Preventing Heart Disease: Know Your Risk Factors',
  'preventing-heart-disease-risk-factors',
  'Learn the key factors that increase heart disease risk and how to protect your cardiovascular health.',
  '<h2>Understanding Heart Disease</h2><p>Heart disease remains a leading cause of death, but many cases are preventable through lifestyle changes.</p><h2>Key Risk Factors</h2><h3>High Blood Pressure</h3><p>Regular blood pressure monitoring is essential. Keep it below 120/80 mmHg through diet and exercise.</p><h3>High Cholesterol</h3><p>Reduce saturated fats and increase fiber intake. Include foods like oats, nuts, and fatty fish.</p><h3>Smoking</h3><p>Smoking damages blood vessels. Quitting is the single best thing you can do for your heart.</p><h3>Diabetes</h3><p>Maintain healthy blood sugar levels through diet and exercise to reduce heart disease risk.</p><h2>Protective Strategies</h2><p>Eat a Mediterranean-style diet rich in fruits, vegetables, whole grains, and healthy fats. Exercise regularly—aim for 150 minutes of moderate activity weekly. Maintain a healthy weight and manage stress.</p><h2>Regular Checkups</h2><p>Get your blood pressure and cholesterol checked regularly. Early detection allows for prevention.</p>',
  c.id,
  'https://images.pexels.com/photos/5528269/pexels-photo-5528269.jpeg',
  'Dr. Robert Johnson',
  7,
  now() - interval '15 days'
FROM categories c WHERE c.slug = 'disease-prevention'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Building Healthy Habits That Last',
  'building-healthy-habits-that-last',
  'Transform your life by creating sustainable habits that stick. Learn the science behind habit formation.',
  '<h2>The Habit Loop</h2><p>Every habit consists of a cue, routine, and reward. Understanding this loop helps you build better habits.</p><h2>Start Small</h2><p>Don''t try to change everything at once. Pick one habit and focus on it for 30 days before adding another.</p><h2>Track Your Progress</h2><p>Keep a journal or use an app to track your habits. Seeing your progress motivates you to continue.</p><h2>Make It Easy</h2><p>Remove friction from good habits. Keep healthy snacks visible, lay out workout clothes the night before, or set phone reminders.</p><h2>Find Your Why</h2><p>Connect your habits to meaningful goals. Instead of "exercise more," think "I want to be strong and energetic for my family."</p><h2>Expect Setbacks</h2><p>Missing one day doesn''t mean failure. Get back on track the next day. Consistency matters more than perfection.</p><h2>Celebrate Wins</h2><p>Acknowledge your progress. Small celebrations reinforce the habit loop and keep you motivated.</p>',
  c.id,
  'https://images.pexels.com/photos/4545863/pexels-photo-4545863.jpeg',
  'Life Coach Maria Rodriguez',
  6,
  now() - interval '10 days'
FROM categories c WHERE c.slug = 'lifestyle'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Breakthrough in Cancer Research: New Treatment Options',
  'breakthrough-cancer-research-new-treatment',
  'Latest developments in oncology offer hope for patients with new immunotherapy treatments.',
  '<h2>Recent Medical Breakthrough</h2><p>Researchers have made significant progress in immunotherapy treatments for various cancers. These treatments work by enhancing the body''s natural immune response.</p><h2>Understanding Immunotherapy</h2><p>Unlike traditional chemotherapy, immunotherapy trains your immune system to recognize and attack cancer cells. This approach often has fewer side effects.</p><h2>Clinical Trial Results</h2><p>Recent clinical trials show promising results, with response rates improving significantly compared to conventional treatments. Patient survival rates have increased in several cancer types.</p><h2>Which Cancers Benefit?</h2><p>Currently, immunotherapies have shown effectiveness in melanoma, lung cancer, and certain lymphomas. Research continues for other cancer types.</p><h2>What''s Next?</h2><p>Researchers are working on combination therapies and personalized medicine approaches. Genetic testing will help determine which treatments work best for individual patients.</p><h2>Patient Access</h2><p>Speak with your oncologist about whether these treatments might be appropriate for your situation. Clinical trials may offer access to cutting-edge therapies.</p>',
  c.id,
  'https://images.pexels.com/photos/7651141/pexels-photo-7651141.jpeg',
  'Dr. Michael Torres',
  6,
  now() - interval '5 days'
FROM categories c WHERE c.slug = 'medical-news'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO articles (title, slug, excerpt, content, category_id, image_url, author, read_time, published_at)
SELECT
  'Superfoods You Should Be Eating',
  'superfoods-you-should-eating',
  'Discover nutrient-dense foods that pack maximum health benefits into every bite.',
  '<h2>What Are Superfoods?</h2><p>Superfoods are nutrient-dense foods with exceptional health benefits. They''re rich in vitamins, minerals, antioxidants, and other beneficial compounds.</p><h2>Top Superfoods to Add</h2><h3>Berries</h3><p>Blueberries, strawberries, and acai berries are packed with antioxidants that support brain health and reduce inflammation.</p><h3>Leafy Greens</h3><p>Spinach, kale, and romaine lettuce provide vitamins K and C, plus minerals that support bone health and immunity.</p><h3>Fatty Fish</h3><p>Salmon, mackerel, and sardines contain omega-3 fatty acids essential for heart and brain health.</p><h3>Nuts and Seeds</h3><p>Almonds, walnuts, chia seeds, and flax seeds provide healthy fats, protein, and fiber.</p><h3>Legumes</h3><p>Beans, lentils, and chickpeas are excellent plant-based proteins and fiber sources.</p><h2>How to Incorporate Them</h2><p>Add berries to breakfast, toss greens in salads, bake salmon for dinner, sprinkle seeds on yogurt, and use legumes in soups and stews.</p>',
  c.id,
  'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
  'Nutritionist Lisa Park',
  5,
  now() - interval '3 days'
FROM categories c WHERE c.slug = 'nutrition'
ON CONFLICT (slug) DO NOTHING;
