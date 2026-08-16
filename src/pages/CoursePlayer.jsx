import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { FlashcardDeck } from '../components/FlashcardDeck';
import { 
  Play, CheckCircle, ChevronLeft, Award, FileText, 
  Sparkles, Clock, RefreshCw, HelpCircle, BookOpen, MessageSquare, Send, Moon, Sun 
} from 'lucide-react';

export const CoursePlayer = () => {
  const { courseId } = useParams();
  const { 
    courses, 
    completedLessons, 
    toggleLessonCompleted, 
    getCourseProgress, 
    triggerConfetti, 
    flashcardDecks, 
    addXp,
    discussions,
    addDiscussionComment 
  } = useApp();

  const course = courses.find(c => c.id === courseId) || courses[0];
  const firstModule = course.modules[0] || {};
  const firstLesson = firstModule.lessons?.[0] || {};

  const [activeLesson, setActiveLesson] = useState(firstLesson);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'quiz' | 'flashcards' | 'discussion'
  const [newQuestionText, setNewQuestionText] = useState('');
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  // Quiz & Timer State
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const progress = getCourseProgress(course.id);
  const doneLessons = completedLessons[course.id] || [];
  const activeModule = course.modules.find(m => m.lessons?.some(l => l.id === activeLesson.id)) || course.modules[0];
  const lessonComments = discussions[activeLesson.id] || [];

  // Timer Countdown Effect
  useEffect(() => {
    let timer = null;
    if (timerRunning && timeLeft > 0 && !quizSubmitted) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !quizSubmitted && timerRunning) {
      handleQuizSubmit();
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft, quizSubmitted]);

  const startQuiz = () => {
    setTimeLeft(60);
    setTimerRunning(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const handleQuizAnswerSelect = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    setTimerRunning(false);
    setQuizSubmitted(true);
    addXp(50);
  };

  const handleLessonToggle = (lessonId) => {
    toggleLessonCompleted(course.id, lessonId);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (newQuestionText.trim()) {
      addDiscussionComment(activeLesson.id, newQuestionText);
      setNewQuestionText('');
    }
  };

  return (
    <div className={`min-h-screen text-stone-100 flex flex-col font-sans transition-colors ${focusMode ? 'bg-black' : 'bg-stone-950'}`}>
      
      {/* Top Header */}
      <header className="bg-stone-900 border-b border-stone-800 px-4 sm:px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-stone-400 hover:text-white flex items-center gap-1.5 text-xs font-bold bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div>
            <h1 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-1">{course.title}</h1>
            <p className="text-[11px] text-stone-400">Lesson: {activeLesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className="text-stone-400 hover:text-white text-xs flex items-center gap-1 bg-stone-800 px-3 py-1.5 rounded-xl"
            title="Toggle Focus Dark Mode"
          >
            {focusMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{focusMode ? 'Normal Mode' : 'Focus Mode'}</span>
          </button>

          <div className="w-32 hidden sm:block">
            <ProgressBar progress={progress} showLabel={false} size="sm" />
          </div>
          <span className="text-xs font-bold text-emerald-400 hidden sm:inline">{progress}% Complete</span>

          {progress === 100 && (
            <button
              onClick={triggerConfetti}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 animate-bounce"
            >
              <Sparkles className="w-4 h-4 fill-stone-950" /> Celebrate 100%!
            </button>
          )}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Video & Interactive Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          <div className="bg-black relative aspect-video w-full flex items-center justify-center border-b border-stone-800">
            <video
              key={activeLesson.id}
              controls
              autoPlay
              controlsList="nodownload"
              poster={course.thumbnail}
              className="w-full h-full object-contain"
            >
              <source src={activeLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"} type="video/mp4" />
              {showSubtitles && <track kind="captions" srcLang="en" label="English" default />}
            </video>
          </div>

          <div className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            <div className="space-y-1">
              <h2 className="text-base font-serif font-bold text-white">{activeLesson.title}</h2>
              <p className="text-xs text-stone-400">{activeLesson.summary}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLessonToggle(activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  doneLessons.includes(activeLesson.id)
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                {doneLessons.includes(activeLesson.id) ? 'Completed' : 'Mark Completed'}
              </button>
            </div>
          </div>

          {/* Interactive Content Tabs */}
          <div className="p-6 bg-stone-900/60 flex-1 space-y-6">
            
            <div className="flex border-b border-stone-800 space-x-6 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'overview' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-400 hover:text-white'}`}
              >
                <FileText className="w-4 h-4" /> Overview & Downloads
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'discussion' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-400 hover:text-white'}`}
              >
                <MessageSquare className="w-4 h-4" /> Lesson Q&A Forum ({lessonComments.length})
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'quiz' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-400 hover:text-white'}`}
              >
                <HelpCircle className="w-4 h-4" /> Timed Quiz Mode ⏱️
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'flashcards' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-400 hover:text-white'}`}
              >
                <BookOpen className="w-4 h-4" /> Flashcards
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl text-xs text-stone-300 leading-relaxed">
                <h3 className="font-serif font-bold text-white text-base">Lesson Materials</h3>
                <div className="flex items-center gap-3 bg-stone-800 p-4 rounded-2xl border border-stone-700">
                  <FileText className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-white">{activeLesson.title} - Guided Worksheet.pdf</p>
                    <p className="text-[10px] text-stone-400">PDF Document • 1.2 MB</p>
                  </div>
                  <button className="bg-amber-800 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold">
                    Download
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Q&A Discussion Forum */}
            {activeTab === 'discussion' && (
              <div className="space-y-6 max-w-2xl text-xs">
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask instructor or peers a question on this lesson..."
                    className="flex-1 p-3 bg-stone-800 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                  <button type="submit" className="bg-amber-800 hover:bg-amber-700 text-white font-bold px-4 rounded-xl flex items-center gap-1.5">
                    <Send className="w-4 h-4" /> Post
                  </button>
                </form>

                <div className="space-y-4">
                  {lessonComments.length > 0 ? (
                    lessonComments.map(c => (
                      <div key={c.id} className="bg-stone-900 p-4 rounded-xl border border-stone-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-bold text-white">{c.author}</span>
                          <span className="text-[10px] text-stone-500">{c.timestamp}</span>
                        </div>
                        <p className="text-stone-300 pl-8">{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 italic">No questions asked yet for this lesson. Be the first!</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Quiz */}
            {activeTab === 'quiz' && (
              <div className="space-y-6 max-w-2xl">
                {activeModule.quiz ? (
                  <div className="bg-stone-800/80 p-6 rounded-2xl border border-stone-700 space-y-6">
                    <div className="flex justify-between items-center border-b border-stone-700 pb-3">
                      <div>
                        <h3 className="font-serif font-bold text-white text-base">{activeModule.quiz.title}</h3>
                        <p className="text-xs text-stone-400">60-second timed module test.</p>
                      </div>

                      <div className="flex items-center gap-2 bg-stone-900 px-3 py-1.5 rounded-xl border border-stone-700 text-xs font-mono font-bold text-amber-400">
                        <Clock className="w-4 h-4 text-amber-500" /> {timeLeft}s remaining
                      </div>
                    </div>

                    {!timerRunning && !quizSubmitted ? (
                      <div className="text-center py-6 space-y-3">
                        <p className="text-xs text-stone-300">Ready to test your speed and accuracy?</p>
                        <button
                          onClick={startQuiz}
                          className="bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors"
                        >
                          Start Timed Quiz
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activeModule.quiz.questions.map((q, idx) => (
                          <div key={q.id} className="space-y-2 pt-2">
                            <p className="font-bold text-xs text-stone-200">{idx + 1}. {q.question}</p>
                            <div className="space-y-1.5">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = selectedAnswers[q.id] === oIdx;
                                const isCorrect = q.correctIndex === oIdx;
                                let btnStyle = 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-700';

                                if (quizSubmitted) {
                                  if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                                  else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950 border-rose-500 text-rose-300';
                                } else if (isSelected) {
                                  btnStyle = 'bg-amber-900/60 border-amber-500 text-amber-200 font-bold';
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={quizSubmitted}
                                    onClick={() => handleQuizAnswerSelect(q.id, oIdx)}
                                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <div className="pt-4 border-t border-stone-700 flex justify-between items-center">
                          {!quizSubmitted ? (
                            <button
                              onClick={handleQuizSubmit}
                              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
                            >
                              Submit Quiz
                            </button>
                          ) : (
                            <button
                              onClick={startQuiz}
                              className="text-xs font-bold text-stone-400 hover:text-white flex items-center gap-1"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">No timed quiz for this module.</p>
                )}
              </div>
            )}

            {/* Tab 4: Flashcards */}
            {activeTab === 'flashcards' && (
              <div className="space-y-4 max-w-xl">
                <FlashcardDeck deck={flashcardDecks[0]} />
              </div>
            )}

          </div>

        </div>

        {/* Right Module Sidebar */}
        <div className="w-full lg:w-80 bg-stone-900 border-l border-stone-800 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-stone-800 font-serif font-bold text-sm text-white">
            Curriculum Outline
          </div>

          <div className="divide-y divide-stone-800">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="py-2">
                <div className="px-4 py-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                  Module {mIdx + 1}: {mod.title}
                </div>

                <div className="space-y-1">
                  {mod.lessons?.map(lesson => {
                    const isCurrent = lesson.id === activeLesson.id;
                    const isDone = doneLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between transition-colors ${
                          isCurrent 
                            ? 'bg-amber-900/30 text-white border-l-4 border-amber-600 font-bold' 
                            : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Play className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-500' : 'text-stone-500'}`} />
                          )}
                          <span className="line-clamp-1">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 shrink-0 ml-2">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
