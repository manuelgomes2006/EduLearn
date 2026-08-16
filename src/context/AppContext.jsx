import React, { createContext, useContext, useState, useEffect } from 'react';
import { COURSES, MOCK_FLASHCARD_DECKS, MOCK_BADGES } from '../data/courses';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState(COURSES);
  const [flashcardDecks] = useState(MOCK_FLASHCARD_DECKS);
  const [badges] = useState(MOCK_BADGES);

  // Role State: 'student' | 'instructor' | 'admin'
  const [activeRole, setActiveRole] = useState('student');

  // Dark Focus Mode State
  const [darkFocusMode, setDarkFocusMode] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Algebra Module 2 Quiz Graded", time: "2 hours ago", read: false, type: "grade" },
    { id: 2, title: "Live Faculty Office Hours Tomorrow", time: "5 hours ago", read: false, type: "calendar" },
    { id: 3, title: "New Badge Unlocked: Math Wizard 📐", time: "1 day ago", read: true, type: "badge" }
  ]);

  // Parent / Guardian Account Linking State
  const [parentAccount, setParentAccount] = useState({
    linked: true,
    parentEmail: "guardian.morgan@family.org",
    weeklyDigest: true,
    coppaConsented: true
  });

  // School District B2B License State
  const [districtLicense] = useState({
    schoolName: "Oakridge Unified School District",
    totalSeats: 500,
    usedSeats: 342,
    planName: "Enterprise District Unlimited",
    roster: [
      { id: "s1", name: "Alex Morgan", grade: "Grade 10", email: "alex.m@oakridge.edu", progress: "80%" },
      { id: "s2", name: "Samantha Kelly", grade: "Grade 10", email: "sam.k@oakridge.edu", progress: "95%" },
      { id: "s3", name: "Marcus Vance", grade: "Grade 12", email: "marcus.v@oakridge.edu", progress: "65%" }
    ]
  });

  // Discussions State
  const [discussions, setDiscussions] = useState({
    "l1": [
      { id: "d1", author: "Samantha K.", avatar: "https://ui-avatars.com/api/?name=SK", text: "Why do we flip the inequality sign when multiplying by a negative number?", timestamp: "Yesterday" },
      { id: "d2", author: "Dr. Robert Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200", text: "Great question! Because multiplying by a negative reverses the direction on the number line.", timestamp: "10 hours ago" }
    ]
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('edulearn_wishlist');
    return saved ? JSON.parse(saved) : ['sci-101'];
  });

  // User Stats (XP & Streak)
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('edulearn_user_stats');
    return saved ? JSON.parse(saved) : { xp: 1450, streakDays: 5 };
  });

  const [showReportCardModal, setShowReportCardModal] = useState(false);

  // Auth User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edulearn_user_session');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: true,
      name: "Alex Morgan",
      email: "alex.morgan@school.edu",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    };
  });

  // Enrolled Courses & Completed Lessons
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('edulearn_enrolled');
    return saved ? JSON.parse(saved) : ['math-101', 'cs-101'];
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('edulearn_completed');
    return saved ? JSON.parse(saved) : {
      'math-101': ['l1', 'l2'],
      'cs-101': ['csl1']
    };
  });

  // LocalStorage Syncing
  useEffect(() => {
    localStorage.setItem('edulearn_user_session', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('edulearn_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('edulearn_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('edulearn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlist Methods
  const toggleWishlist = (courseId) => {
    setWishlist(prev => prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]);
  };

  const isWishlisted = (courseId) => wishlist.includes(courseId);

  const addXp = (amount) => {
    setUserStats(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const addDiscussionComment = (lessonId, commentText) => {
    const newComment = {
      id: `d-${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      text: commentText,
      timestamp: "Just now"
    };
    setDiscussions(prev => ({
      ...prev,
      [lessonId]: [newComment, ...(prev[lessonId] || [])]
    }));
  };

  // Create Course Method (for Instructor Dashboard)
  const createNewCourse = (newCourseData) => {
    const courseId = `course-${Date.now()}`;
    const formatted = {
      id: courseId,
      title: newCourseData.title,
      subject: newCourseData.subject || "Mathematics",
      gradeLevel: newCourseData.gradeLevel || "Grade 9-10",
      price: parseFloat(newCourseData.price) || 0,
      isFree: parseFloat(newCourseData.price) === 0,
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 1,
      duration: newCourseData.duration || "8 Weeks",
      level: newCourseData.level || "Beginner",
      thumbnail: newCourseData.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      description: newCourseData.description,
      whatYouWillLearn: ["Master key concepts.", "Solve multi-step problems."],
      instructor: {
        name: user.name,
        title: "Certified Academic Instructor",
        avatar: user.avatar,
        rating: 5.0,
        bio: "Educator committed to high quality secondary education."
      },
      modules: [
        {
          id: `m-${Date.now()}`,
          title: `Module 1: Introduction to ${newCourseData.title}`,
          duration: "45 mins",
          lessons: [
            { id: `l-${Date.now()}`, title: "Lesson 1: Overview & Concepts", duration: "10:00", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", summary: "Introduction to course goals." }
          ]
        }
      ],
      reviews: []
    };

    setCourses(prev => [formatted, ...prev]);
    setEnrolledCourses(prev => [...prev, courseId]);
    return courseId;
  };

  // Auth methods
  const login = (email, password, role = 'student') => {
    setUser({
      isLoggedIn: true,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    });
    setActiveRole(role);
  };

  const signup = (name, email, password, role = 'student') => {
    setUser({
      isLoggedIn: true,
      name,
      email,
      role,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    });
    setActiveRole(role);
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: '', email: '', role: 'student', avatar: '' });
  };

  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      addXp(100);
    }
  };

  const getCourseProgress = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;

    let totalLessons = 0;
    course.modules.forEach(m => {
      totalLessons += m.lessons ? m.lessons.length : 0;
    });

    if (totalLessons === 0) return 0;
    const completedCount = (completedLessons[courseId] || []).length;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  };

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } catch (e) {
      console.log('Confetti!');
    }
  };

  const toggleLessonCompleted = (courseId, lessonId) => {
    setCompletedLessons(prev => {
      const current = prev[courseId] || [];
      const exists = current.includes(lessonId);
      const updated = exists ? current.filter(id => id !== lessonId) : [...current, lessonId];
      if (!exists) addXp(50);
      return { ...prev, [courseId]: updated };
    });
  };

  return (
    <AppContext.Provider value={{
      courses,
      flashcardDecks,
      badges,
      user,
      activeRole,
      setActiveRole,
      darkFocusMode,
      setDarkFocusMode,
      notifications,
      setNotifications,
      parentAccount,
      setParentAccount,
      districtLicense,
      discussions,
      addDiscussionComment,
      createNewCourse,
      login,
      signup,
      logout,
      enrolledCourses,
      completedLessons,
      wishlist,
      toggleWishlist,
      isWishlisted,
      userStats,
      addXp,
      showReportCardModal,
      setShowReportCardModal,
      enrollInCourse,
      getCourseProgress,
      toggleLessonCompleted,
      triggerConfetti
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
