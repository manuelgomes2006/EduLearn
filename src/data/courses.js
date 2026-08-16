export const COURSES = [
  {
    id: "math-101",
    title: "Advanced Algebra & Functions",
    subject: "Mathematics",
    gradeLevel: "Grade 9-10",
    price: 49.99,
    isFree: false,
    rating: 4.8,
    reviewsCount: 124,
    studentsCount: 1420,
    duration: "8 Weeks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    description: "Master quadratic equations, polynomials, and advanced graphing techniques required for high school success and standardized test preparation.",
    whatYouWillLearn: [
      "Solve complex quadratic equations using multiple algebraic methods.",
      "Understand and graph polynomial and rational functions.",
      "Apply algebraic concepts to real-world word problems.",
      "Master logarithms and exponential growth/decay models."
    ],
    instructor: {
      name: "Dr. Robert Chen",
      title: "PhD in Math Education",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
      bio: "Dr. Chen has been teaching high school and AP Mathematics for over 15 years. His approach focuses on breaking down complex mathematical theories into visual steps."
    },
    modules: [
      {
        id: "m1",
        title: "Module 1: Foundations & Linear Equations",
        duration: "45 mins",
        lessons: [
          { id: "l1", title: "Variables, Expressions & Order of Operations", duration: "10:25", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", summary: "Fundamentals of algebraic terms." },
          { id: "l2", title: "Solving Multi-Step Equations & Inequalities", duration: "12:14", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", summary: "Isolating variables in multi-step equations." }
        ],
        quiz: {
          id: "q1",
          title: "Module 1 Assessment: Algebra Foundations",
          timeLimitSeconds: 60,
          questions: [
            { id: 1, question: "What is the solution for x in 3x - 7 = 14?", options: ["x = 5", "x = 7", "x = 21", "x = 3"], correctIndex: 1, explanation: "Add 7 to both sides (3x = 21), then divide by 3 (x = 7)." },
            { id: 2, question: "What is the slope of the line y = -4x + 9?", options: ["4", "-4", "9", "-9"], correctIndex: 1, explanation: "In y = mx + b, m represents the slope. Here m = -4." }
          ]
        }
      },
      {
        id: "m2",
        title: "Module 2: Quadratic Equations & Factoring",
        duration: "1 hr 20 mins",
        lessons: [
          { id: "l3", title: "Introduction to Quadratics & Parabolas", duration: "14:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", summary: "Anatomy of parabolas and vertex form." },
          { id: "l4", title: "The Quadratic Formula & Discriminant", duration: "18:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", summary: "Using b^2 - 4ac to find real and complex roots." }
        ]
      }
    ],
    reviews: [
      { id: "r1", author: "Sarah M.", rating: 5, date: "2 days ago", comment: "Dr. Chen makes quadratic equations so clear! Helped me score an A on my midterm." },
      { id: "r2", author: "Marcus Vance", rating: 5, date: "1 week ago", comment: "Awesome notebook style notes and interactive video lessons!" }
    ]
  },
  {
    id: "sci-101",
    title: "Fundamentals of Chemistry & Virtual Labs",
    subject: "Science",
    gradeLevel: "Grade 10-11",
    price: 39.99,
    isFree: false,
    rating: 4.9,
    reviewsCount: 89,
    studentsCount: 980,
    duration: "10 Weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    description: "Explore atomic structure, chemical bonds, reactions, stoichiometry, and thermodynamics with hands-on virtual laboratory simulations.",
    whatYouWillLearn: [
      "Understand atomic numbers, electron configurations, and periodic trends.",
      "Balance chemical equations and compute molar mass.",
      "Identify covalent, ionic, and metallic bonding structures."
    ],
    instructor: {
      name: "Prof. Elena Rostova",
      title: "Senior Chemistry Research Fellow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
      bio: "Prof. Rostova specializes in making chemistry accessible through visual experiments and molecular modeling."
    },
    modules: [
      {
        id: "sm1",
        title: "Module 1: Atomic Structure & Subatomic Particles",
        duration: "50 mins",
        lessons: [
          { id: "sl1", title: "Protons, Neutrons & Isotopes", duration: "12:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", summary: "Subatomic building blocks of matter." },
          { id: "sl2", title: "The Periodic Table & Electronegativity", duration: "18:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", summary: "Trends across groups and periods." }
        ],
        quiz: {
          id: "sq1",
          title: "Chemistry Module 1 Quiz",
          timeLimitSeconds: 60,
          questions: [
            { id: 1, question: "Which subatomic particle has a negative electric charge?", options: ["Proton", "Neutron", "Electron", "Positron"], correctIndex: 2, explanation: "Electrons carry a negative electrical charge." }
          ]
        }
      }
    ],
    reviews: [
      { id: "sr1", author: "David K.", rating: 5, date: "3 days ago", comment: "The periodic table visualizer helped me memorize trends effortlessly!" }
    ]
  },
  {
    id: "cs-101",
    title: "Intro to Python Programming & Game Building",
    subject: "Computer Science",
    gradeLevel: "Grade 7-9",
    price: 0,
    isFree: true,
    rating: 4.85,
    reviewsCount: 234,
    studentsCount: 2890,
    duration: "6 Weeks",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    description: "Learn Python from scratch! Master variables, conditionals, loops, functions, and create your very first playable text adventure game.",
    whatYouWillLearn: [
      "Write clean Python syntax using variables, strings, and numbers.",
      "Control program flow with IF/ELSE logic and loops.",
      "Design and code an interactive text-based RPG game project."
    ],
    instructor: {
      name: "Alex Rivera",
      title: "Lead Software Educator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 4.88,
      bio: "Alex loves teaching kids and young adults how to code their own games and apps."
    },
    modules: [
      {
        id: "csm1",
        title: "Module 1: Hello World & Variables",
        duration: "40 mins",
        lessons: [
          { id: "csl1", title: "Setting Up Python & Printing Output", duration: "10:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnTheLoose.mp4", summary: "Installing Python and writing your first script." },
          { id: "csl2", title: "Variables & Receiving User Input", duration: "14:40", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", summary: "Storing user responses in program memory." }
        ]
      }
    ],
    reviews: [
      { id: "csr1", author: "Leo T.", rating: 5, date: "Yesterday", comment: "Built my first adventure game in less than a week!" }
    ]
  }
];

export const SUBJECT_CATEGORIES = [
  { name: "Mathematics", icon: "Calculator", color: "bg-amber-100 text-amber-900 border-amber-300", desc: "Algebra, Geometry, and foundations." },
  { name: "Science", icon: "FlaskConical", color: "bg-emerald-100 text-emerald-900 border-emerald-300", desc: "Physics, Chemistry, and Biology." },
  { name: "Computer Science", icon: "Code", color: "bg-sky-100 text-sky-900 border-sky-300", desc: "Python coding and algorithms." },
  { name: "English", icon: "BookOpen", color: "bg-rose-100 text-rose-900 border-rose-300", desc: "Literature, Grammar, and Essay writing." },
  { name: "History", icon: "Globe", color: "bg-orange-100 text-orange-900 border-orange-300", desc: "World history, civics, and geography." },
  { name: "Foreign Languages", icon: "Languages", color: "bg-purple-100 text-purple-900 border-purple-300", desc: "Spanish, French, and conversation." },
  { name: "Arts & Music", icon: "Palette", color: "bg-pink-100 text-pink-900 border-pink-300", desc: "Visual design and music theory." },
];

export const MOCK_FLASHCARD_DECKS = [
  {
    id: "deck-math",
    title: "Essential Algebra & Geometry Formulas",
    subject: "Mathematics",
    cards: [
      { front: "Quadratic Formula", back: "x = (-b ± √(b² - 4ac)) / (2a)" },
      { front: "Slope-Intercept Form", back: "y = mx + b (where m is slope, b is y-intercept)" },
      { front: "Pythagorean Theorem", back: "a² + b² = c² (for right-angled triangles)" },
      { front: "Area of a Circle", back: "A = πr²" },
      { front: "Exponent Multiplication Rule", back: "xᵃ · xᵇ = xᵃ⁺ᵇ" }
    ]
  },
  {
    id: "deck-chem",
    title: "Chemistry Symbols & Periodic Trends",
    subject: "Science",
    cards: [
      { front: "Electronegativity Trend", back: "Increases left-to-right across periods, decreases down groups." },
      { front: "Avogadro's Number", back: "6.022 × 10²³ particles / mole" },
      { front: "Ideal Gas Law", back: "PV = nRT" },
      { front: "Atomic Number", back: "Number of protons in an atom's nucleus." }
    ]
  },
  {
    id: "deck-spanish",
    title: "Spanish Conversation & Verb Stems",
    subject: "Foreign Languages",
    cards: [
      { front: "¿Cómo te llamas?", back: "What is your name?" },
      { front: "Hablar (Present Tense)", back: "hablo, hablas, habla, hablamos, hablan" },
      { front: "Muchas gracias", back: "Thank you very much" },
      { front: "Hasta luego", back: "See you later" }
    ]
  }
];

export const MOCK_BADGES = [
  { id: "b1", title: "5-Day Study Streak", icon: "🔥", desc: "Logged in and studied 5 days in a row!", unlocked: true },
  { id: "b2", title: "Math Wizard", icon: "📐", desc: "Scored 100% on an Algebra quiz.", unlocked: true },
  { id: "b3", title: "Python Coder", icon: "🐍", desc: "Completed Module 1 in Python game development.", unlocked: true },
  { id: "b4", title: "Flashcard Master", icon: "🃏", desc: "Reviewed 20+ study deck flashcards.", unlocked: false },
  { id: "b5", title: "Night Owl Learner", icon: "🦉", desc: "Completed a video lesson after 8 PM.", unlocked: true }
];
