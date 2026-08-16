export const INITIAL_COURSES = [
  {
    id: "math-101",
    title: "Advanced Algebra & Functions",
    category: "Mathematics",
    gradeLevel: "High School (9-12)",
    price: 49.99,
    isFree: false,
    rating: 4.8,
    reviewsCount: 1248,
    studentsCount: 14302,
    duration: "12 Hours",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    description: "Master quadratic equations, polynomials, logarithms, and advanced graphing techniques required for high school math success and standardized test preparation.",
    whatYouWillLearn: [
      "Solve complex quadratic equations using multiple algebraic methods.",
      "Understand, construct, and graph polynomial and rational functions.",
      "Apply exponential growth and decay models to real-world scenarios.",
      "Master logarithms and fundamental function transformations."
    ],
    instructor: {
      name: "Dr. Robert Chen",
      title: "PhD in Mathematics Education, 15+ Yrs Experience",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
      studentsCount: "50,000+",
      bio: "Dr. Chen has taught high school and AP Mathematics for over 15 years. His approach focuses on breaking down complex mathematical concepts into digestible visual steps."
    },
    syllabus: [
      {
        id: "m1",
        title: "Module 1: Foundations of Algebra & Linear Equations",
        duration: "45 mins",
        lessons: [
          {
            id: "l1",
            title: "Variables, Expressions, and Order of Operations",
            duration: "10:25",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            summary: "Learn how to simplify expressions using standard algebraic properties."
          },
          {
            id: "l2",
            title: "Solving Multi-Step Linear Equations & Inequalities",
            duration: "12:14",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            summary: "Step-by-step techniques to isolate variables in multi-step equations."
          },
          {
            id: "l3",
            title: "Linear Functions & Slope-Intercept Graphing",
            duration: "15:00",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            summary: "Understanding slope, x and y intercepts, and coordinate graphing."
          }
        ],
        quiz: {
          id: "q1",
          title: "Module 1 Assessment: Algebra Foundations",
          questions: [
            {
              id: 1,
              question: "What is the solution for x in 3x - 7 = 14?",
              options: ["x = 5", "x = 7", "x = 21", "x = 3"],
              correctIndex: 1,
              explanation: "Add 7 to both sides: 3x = 21. Divide by 3: x = 7."
            },
            {
              id: 2,
              question: "What is the slope of the line y = -4x + 9?",
              options: ["4", "-4", "9", "-9"],
              correctIndex: 1,
              explanation: "In y = mx + b, m represents the slope. Here m = -4."
            }
          ]
        }
      },
      {
        id: "m2",
        title: "Module 2: Quadratic Equations & Factoring",
        duration: "1 hr 20 mins",
        lessons: [
          {
            id: "l4",
            title: "Introduction to Quadratic Functions & Parabolas",
            duration: "14:20",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            summary: "Anatomy of a parabola: vertex, axis of symmetry, and intercepts."
          },
          {
            id: "l5",
            title: "Factoring Trinomials and Special Products",
            duration: "18:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            summary: "Factoring quadratic expressions where a = 1 and a > 1."
          },
          {
            id: "l6",
            title: "The Quadratic Formula & Discriminant",
            duration: "22:15",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            summary: "Using b^2 - 4ac to determine real vs complex solutions."
          }
        ],
        quiz: {
          id: "q2",
          title: "Module 2 Quiz: Quadratic Equations",
          questions: [
            {
              id: 1,
              question: "What are the roots of x^2 - 5x + 6 = 0?",
              options: ["x = 2, 3", "x = -2, -3", "x = 1, 6", "x = -1, -6"],
              correctIndex: 0,
              explanation: "Factoring gives (x - 2)(x - 3) = 0, so x = 2 and x = 3."
            }
          ]
        }
      },
      {
        id: "m3",
        title: "Module 3: Polynomials & Exponential Functions",
        duration: "1 hr 10 mins",
        lessons: [
          {
            id: "l7",
            title: "Polynomial Division & Synthetic Division",
            duration: "16:45",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnTheLoose.mp4",
            summary: "Dividing higher degree polynomials with remainder theorem."
          },
          {
            id: "l8",
            title: "Logarithmic Rules & Exponential Decay",
            duration: "20:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            summary: "Converting between exponential and logarithmic equations."
          }
        ]
      }
    ],
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        comment: "Dr. Chen makes quadratic equations so easy to understand! Raised my exam score from a B to an A."
      },
      {
        id: "r2",
        author: "Marcus Vance",
        rating: 5,
        date: "1 week ago",
        comment: "The video lessons are concise and the quizzes really solidify the concepts."
      }
    ]
  },

  {
    id: "sci-201",
    title: "Fundamentals of Chemistry & Virtual Labs",
    category: "Science",
    gradeLevel: "High School (9-12)",
    price: 39.99,
    isFree: false,
    rating: 4.9,
    reviewsCount: 890,
    studentsCount: 9840,
    duration: "10 Hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    description: "Explore atomic structure, chemical bonds, reactions, stoichiometry, and thermodynamics with hands-on virtual laboratory simulations.",
    whatYouWillLearn: [
      "Understand atomic numbers, electron configurations, and periodic trends.",
      "Balance chemical equations and compute molar mass.",
      "Identify covalent, ionic, and metallic bonding structures.",
      "Conduct virtual lab experiments safely with digital tools."
    ],
    instructor: {
      name: "Prof. Elena Rostova",
      title: "Senior Chemistry Research Fellow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      rating: 4.9,
      studentsCount: "32,000+",
      bio: "Prof. Rostova specializes in making chemistry accessible through high-impact visual experiments and interactive molecular modeling."
    },
    syllabus: [
      {
        id: "sm1",
        title: "Module 1: Matter & Atomic Structure",
        duration: "50 mins",
        lessons: [
          {
            id: "sl1",
            title: "Subatomic Particles & Isotopes",
            duration: "12:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            summary: "Protons, neutrons, electrons, and atomic mass units."
          },
          {
            id: "sl2",
            title: "The Periodic Table & Trends",
            duration: "18:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            summary: "Electronegativity, ionization energy, and atomic radius."
          }
        ],
        quiz: {
          id: "sq1",
          title: "Chemistry Module 1 Quiz",
          questions: [
            {
              id: 1,
              question: "Which subatomic particle has a negative electric charge?",
              options: ["Proton", "Neutron", "Electron", "Positron"],
              correctIndex: 2,
              explanation: "Electrons carry a negative electrical charge."
            }
          ]
        }
      }
    ],
    reviews: [
      {
        id: "sr1",
        author: "David K.",
        rating: 5,
        date: "3 days ago",
        comment: "The periodic table visualizer helped me memorize trends effortlessly!"
      }
    ]
  },

  {
    id: "cs-101",
    title: "Intro to Python Programming & Game Building",
    category: "Computer Science",
    gradeLevel: "Middle School (6-8)",
    price: 0,
    isFree: true,
    rating: 4.85,
    reviewsCount: 2340,
    studentsCount: 28900,
    duration: "8 Hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    description: "Learn Python from scratch! Master variables, conditionals, loops, functions, and create your very first playable text adventure game.",
    whatYouWillLearn: [
      "Write clean Python syntax using variables, strings, and numbers.",
      "Control program flow with IF/ELSE logic and WHILE/FOR loops.",
      "Build modular reusable code with functions and parameters.",
      "Design and code an interactive text-based RPG game project."
    ],
    instructor: {
      name: "Alex Rivera",
      title: "Lead Software Engineer & Educator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 4.88,
      studentsCount: "45,000+",
      bio: "Alex is a software engineer passionate about teaching kids and young adults how to code their own software and games."
    },
    syllabus: [
      {
        id: "csm1",
        title: "Module 1: Hello World & Variables",
        duration: "40 mins",
        lessons: [
          {
            id: "csl1",
            title: "Setting Up Python & Writing Your First Script",
            duration: "10:15",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            summary: "Installing Python and running code in VS Code or web editor."
          },
          {
            id: "csl2",
            title: "Variables, Input, and Data Types",
            duration: "14:40",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            summary: "Storing strings, integers, and receiving input from users."
          }
        ],
        quiz: {
          id: "csq1",
          title: "Python Module 1 Quiz",
          questions: [
            {
              id: 1,
              question: "What function is used to output text to the console in Python?",
              options: ["console.log()", "print()", "echo()", "write()"],
              correctIndex: 1,
              explanation: "In Python, print() is the built-in function for displaying output."
            }
          ]
        }
      }
    ],
    reviews: [
      {
        id: "csr1",
        author: "Leo T.",
        rating: 5,
        date: "Yesterday",
        comment: "Awesome course! I built a text adventure game in less than a week."
      }
    ]
  },

  {
    id: "eng-301",
    title: "World Literature & AP Essay Writing",
    category: "English",
    gradeLevel: "High School (9-12)",
    price: 29.99,
    isFree: false,
    rating: 4.75,
    reviewsCount: 610,
    studentsCount: 7120,
    duration: "14 Hours",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=800",
    description: "Analyze classic literary masterpieces and craft persuasive, well-structured analytical essays tailored for AP English and college admission.",
    whatYouWillLearn: [
      "Deconstruct literary themes, motifs, and authorial intent.",
      "Formulate strong thesis statements and evidence-backed arguments.",
      "Master MLA & APA citation styles and formal tone.",
      "Edit and refine essays for clarity, vocabulary, and flow."
    ],
    instructor: {
      name: "Clara Vance",
      title: "AP Literature Exam Reader & Author",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: 4.82,
      studentsCount: "18,000+",
      bio: "Clara has graded over 10,000 AP English exams and guides students toward compelling academic writing."
    },
    syllabus: [
      {
        id: "em1",
        title: "Module 1: Literary Analysis & Thesis Design",
        duration: "1 hr",
        lessons: [
          {
            id: "el1",
            title: "Anatomy of an A+ Thesis Statement",
            duration: "15:20",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            summary: "Transforming vague opinions into sharp analytical claims."
          }
        ]
      }
    ],
    reviews: []
  },

  {
    id: "hist-202",
    title: "Modern World History (1450 - Present)",
    category: "History",
    gradeLevel: "High School (9-12)",
    price: 34.99,
    isFree: false,
    rating: 4.9,
    reviewsCount: 940,
    studentsCount: 11200,
    duration: "16 Hours",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800",
    description: "An engaging journey through world history covering the Renaissance, Industrial Revolution, World Wars, Cold War, and global modernity.",
    whatYouWillLearn: [
      "Trace major geopolitical shifts across continents from 1450 to modern day.",
      "Analyze primary sources, historical maps, and documents.",
      "Understand economic systems, trade routes, and revolutions.",
      "Prepare thoroughly for AP World History exam DBQs."
    ],
    instructor: {
      name: "Marcus Thorne",
      title: "History Department Chair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 4.92,
      studentsCount: "25,000+",
      bio: "Marcus brings history to life with storytelling, rich historical imagery, and interactive timelines."
    },
    syllabus: [
      {
        id: "hm1",
        title: "Module 1: Global Tapestry & Trade Networks",
        duration: "1 hr 15 mins",
        lessons: [
          {
            id: "hl1",
            title: "The Silk Road & Maritime Commerce",
            duration: "18:00",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            summary: "Exchange of culture, technology, and goods in early modern Afro-Eurasia."
          }
        ]
      }
    ],
    reviews: []
  },

  {
    id: "art-105",
    title: "Visual Arts & Digital Illustration",
    category: "Arts & Music",
    gradeLevel: "Middle School (6-8)",
    price: 24.99,
    isFree: false,
    rating: 4.8,
    reviewsCount: 320,
    studentsCount: 4100,
    duration: "6 Hours",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    description: "Unlock your creative potential! Master color theory, perspective, character sketch design, and digital painting tools.",
    whatYouWillLearn: [
      "Master color palettes, contrast, and visual composition.",
      "Use perspective drawing guidelines for 3D depth.",
      "Design original character concepts and digital assets.",
      "Export high-resolution artwork for portfolios."
    ],
    instructor: {
      name: "Maya Lin",
      title: "Digital Artist & Animator",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      rating: 4.85,
      studentsCount: "12,000+",
      bio: "Maya is a professional concept artist who loves helping aspiring creators discover digital art techniques."
    },
    syllabus: [
      {
        id: "am1",
        title: "Module 1: Color Theory & Sketching",
        duration: "45 mins",
        lessons: [
          {
            id: "al1",
            title: "Understanding Color Harmony & Mood",
            duration: "12:00",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnTheLoose.mp4",
            summary: "Complementary, triadic, and analogous color schemes."
          }
        ]
      }
    ],
    reviews: []
  }
];

export const SUBJECT_CATEGORIES = [
  { name: "Mathematics", icon: "Calculator", color: "bg-blue-100 text-blue-600", desc: "Algebra, Geometry, Calculus, and foundations." },
  { name: "Science", icon: "FlaskConical", color: "bg-green-100 text-green-600", desc: "Physics, Chemistry, and Biology made interactive." },
  { name: "Computer Science", icon: "Laptop", color: "bg-purple-100 text-purple-600", desc: "Coding, algorithms, and digital literacy." },
  { name: "English", icon: "BookOpen", color: "bg-red-100 text-red-600", desc: "Literature, Grammar, and essay writing." },
  { name: "History", icon: "Globe", color: "bg-amber-100 text-amber-600", desc: "World history, civics, and geography." },
  { name: "Arts & Music", icon: "Palette", color: "bg-pink-100 text-pink-600", desc: "Visual design, illustration, and theory." },
];

export const INITIAL_USER = {
  name: "Alex Morgan",
  email: "alex.student@edulearn.org",
  role: "student", // 'student' | 'instructor' | 'admin'
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  enrolledCourses: ["math-101", "cs-101"],
  completedLessons: {
    "math-101": ["l1", "l2"],
    "cs-101": ["csl1"]
  },
  quizScores: {
    "q1": { score: 100, date: "2026-08-15" }
  },
  notes: {
    "l1": "Linear equations rule: whatever you do to one side of the equation, you MUST do to the other."
  },
  discussions: {
    "l1": [
      { id: "d1", author: "Sarah M.", avatar: "https://ui-avatars.com/api/?name=SM", text: "Why do we flip the inequality sign when multiplying by a negative number?", timestamp: "Yesterday" },
      { id: "d2", author: "Dr. Robert Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200", text: "Great question Sarah! Because multiplying by a negative reverses the order on the number line.", timestamp: "10 hours ago" }
    ]
  }
};
