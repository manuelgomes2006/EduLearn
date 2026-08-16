import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const ClassroomPage = () => {
  const { 
    selectedCourseId, 
    selectedLessonId, 
    courses, 
    user, 
    markLessonCompleted, 
    getCourseProgress, 
    navigateTo, 
    saveQuizScore, 
    saveNote, 
    addDiscussionComment, 
    setCertificateCourse 
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  
  const firstModule = course.syllabus[0] || {};
  const firstLesson = firstModule.lessons?.[0] || {};

  const [activeLesson, setActiveLesson] = useState(() => {
    if (selectedLessonId) {
      for (const mod of course.syllabus) {
        const found = mod.lessons?.find(l => l.id === selectedLessonId);
        if (found) return found;
      }
    }
    return firstLesson;
  });

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'quiz' | 'notes' | 'discussion'
  const [noteText, setNoteText] = useState('');
  const [discussionInput, setDiscussionInput] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setNoteText(user.notes[activeLesson.id] || '');
    setSelectedAnswers({});
    setQuizSubmitted(false);
  }, [activeLesson, user.notes]);

  const progress = getCourseProgress(course.id);
  const completedLessonIds = user.completedLessons[course.id] || [];
  const activeModule = course.syllabus.find(m => m.lessons?.some(l => l.id === activeLesson.id)) || course.syllabus[0];

  const handleLessonSelect = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleMarkCompleteAndNext = () => {
    markLessonCompleted(course.id, activeLesson.id);

    let foundCurrent = false;
    let nextLessonCandidate = null;

    for (const mod of course.syllabus) {
      for (const l of mod.lessons || []) {
        if (foundCurrent) {
          nextLessonCandidate = l;
          break;
        }
        if (l.id === activeLesson.id) {
          foundCurrent = true;
        }
      }
      if (nextLessonCandidate) break;
    }

    if (nextLessonCandidate) {
      setActiveLesson(nextLessonCandidate);
    }
  };

  const handleNoteSave = (e) => {
    e.preventDefault();
    saveNote(activeLesson.id, noteText);
  };

  const handleDiscussionSubmit = (e) => {
    e.preventDefault();
    if (discussionInput.trim()) {
      addDiscussionComment(activeLesson.id, discussionInput);
      setDiscussionInput('');
    }
  };

  const handleQuizAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    if (!activeModule.quiz) return;
    let scoreCount = 0;
    activeModule.quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) scoreCount += 1;
    });

    const percentScore = Math.round((scoreCount / activeModule.quiz.questions.length) * 100);
    saveQuizScore(activeModule.quiz.id, percentScore);
    setQuizSubmitted(true);
  };

  const currentDiscussions = user.discussions[activeLesson.id] || [];

  return (
    <div className="bg-dark min-h-screen text-gray-100 flex flex-col font-sans">
      
      {/* Classroom Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('dashboard')}
            className="text-gray-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <i className="fas fa-chevron-left"></i> Dashboard
          </button>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-white line-clamp-1">{course.title}</h1>
            <p className="text-xs text-gray-400">Lesson: {activeLesson.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400">Overall Progress</span>
            <span className="text-xs font-bold text-secondary">{progress}% Complete</span>
          </div>

          <div className="w-24 sm:w-32 bg-gray-800 rounded-full h-2 overflow-hidden hidden sm:block">
            <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          {progress === 100 && (
            <button 
              onClick={() => setCertificateCourse(course)}
              className="bg-yellow-500 hover:bg-yellow-600 text-dark text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 animate-pulse"
            >
              <i className="fas fa-certificate"></i> View Certificate
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* HTML5 Video Player */}
          <div className="bg-black relative aspect-video w-full flex items-center justify-center border-b border-gray-800">
            <video 
              key={activeLesson.id}
              controls
              autoPlay
              controlsList="nodownload"
              poster={course.thumbnail}
              className="w-full h-full object-contain"
            >
              <source src={activeLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"} type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
          </div>

          {/* Action Bar */}
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold">
            <div className="flex items-center gap-3">
              <span className="text-gray-200 font-bold text-sm sm:text-base">{activeLesson.title}</span>
              <span className="bg-gray-800 text-gray-400 px-2.5 py-1 rounded text-xs">{activeLesson.duration}</span>
            </div>

            <button 
              onClick={handleMarkCompleteAndNext}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                completedLessonIds.includes(activeLesson.id)
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                  : 'bg-primary hover:bg-indigo-700 text-white'
              }`}
            >
              <i className="fas fa-check-circle"></i>
              {completedLessonIds.includes(activeLesson.id) ? 'Completed (Next Lesson)' : 'Mark Complete & Continue'}
            </button>
          </div>

          {/* Tabbed Interactive Content Area */}
          <div className="p-6 bg-gray-900/60 flex-1 space-y-6">
            
            {/* Tabs Header */}
            <div className="flex border-b border-gray-800 space-x-6 text-xs font-bold">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'overview' ? 'border-primary text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fas fa-file-alt"></i> Lesson Overview
              </button>

              <button 
                onClick={() => setActiveTab('quiz')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'quiz' ? 'border-primary text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fas fa-question-circle"></i> Module Quiz
              </button>

              <button 
                onClick={() => setActiveTab('notes')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'notes' ? 'border-primary text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fas fa-pen"></i> My Notes
              </button>

              <button 
                onClick={() => setActiveTab('discussion')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${activeTab === 'discussion' ? 'border-primary text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                <i className="fas fa-comments"></i> Q&A Forum ({currentDiscussions.length})
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl text-sm leading-relaxed text-gray-300">
                <h3 className="font-bold text-white text-base">Lesson Summary</h3>
                <p>{activeLesson.summary || "In this lesson, you will explore core foundational topics and practical examples designed for deep subject mastery."}</p>
                
                <div className="pt-4 border-t border-gray-800 space-y-3">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Downloadable Worksheets & Attachments</h4>
                  <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl border border-gray-700 text-xs text-gray-200">
                    <i className="far fa-file-pdf text-xl text-primary"></i>
                    <div className="flex-1">
                      <p className="font-bold text-white">{activeLesson.title} - Guided Worksheet.pdf</p>
                      <p className="text-[10px] text-gray-400">PDF Document • 1.2 MB</p>
                    </div>
                    <button className="bg-primary hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Quiz Engine */}
            {activeTab === 'quiz' && (
              <div className="space-y-6 max-w-2xl">
                {activeModule.quiz ? (
                  <div className="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 space-y-6">
                    <div>
                      <h3 className="font-bold text-white text-lg">{activeModule.quiz.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">Answer all questions and submit for instant scoring.</p>
                    </div>

                    {activeModule.quiz.questions.map((q, idx) => (
                      <div key={q.id} className="space-y-3 pt-4 border-t border-gray-700">
                        <p className="font-bold text-sm text-gray-200">{idx + 1}. {q.question}</p>

                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isSelected = selectedAnswers[q.id] === oIdx;
                            const isCorrect = q.correctIndex === oIdx;
                            
                            let optionStyle = 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700';
                            if (quizSubmitted) {
                              if (isCorrect) optionStyle = 'bg-green-950 border-green-500 text-green-300 font-bold';
                              else if (isSelected && !isCorrect) optionStyle = 'bg-red-950 border-red-500 text-red-300';
                            } else if (isSelected) {
                              optionStyle = 'bg-indigo-900/60 border-primary text-indigo-200 font-bold';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleQuizAnswerSelect(q.id, oIdx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && isCorrect && <i className="fas fa-check-circle text-green-400"></i>}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <p className="text-xs text-indigo-300 italic pt-1 bg-indigo-950/40 p-2 rounded border border-indigo-900/50">
                            💡 Explanation: {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={Object.keys(selectedAnswers).length < activeModule.quiz.questions.length}
                          className="bg-primary hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors"
                        >
                          Submit Quiz Answers
                        </button>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-bold text-secondary">Quiz Submitted! Score saved to Dashboard.</span>
                          <button
                            onClick={() => { setQuizSubmitted(false); setSelectedAnswers({}); }}
                            className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1"
                          >
                            <i className="fas fa-redo"></i> Retake
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No quiz attached to this specific module yet.</p>
                )}
              </div>
            )}

            {/* Tab 3: Personal Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="font-bold text-white text-base">Personal Journal & Notes</h3>
                  <p className="text-xs text-gray-400">Notes are saved automatically to your local storage.</p>
                </div>

                <form onSubmit={handleNoteSave} className="space-y-3">
                  <textarea
                    rows={6}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Type your notes, formulas, or reminders for this lesson here..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-xs text-gray-100 focus:outline-none focus:border-primary"
                  />
                  <button type="submit" className="bg-primary hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors">
                    Save Notes
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Discussion Q&A Forum */}
            {activeTab === 'discussion' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-bold text-white text-base">Lesson Discussion Q&A</h3>
                  <p className="text-xs text-gray-400">Ask questions or share insights with fellow students and instructors.</p>
                </div>

                <form onSubmit={handleDiscussionSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    placeholder="Ask a question about this lesson..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  <button type="submit" className="bg-primary hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0">
                    Post
                  </button>
                </form>

                <div className="space-y-4">
                  {currentDiscussions.map(disc => (
                    <div key={disc.id} className="bg-gray-800/60 p-4 rounded-xl border border-gray-700/60 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <img src={disc.avatar} alt={disc.author} className="w-6 h-6 rounded-full" />
                          <span className="font-bold text-white">{disc.author}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{disc.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed pl-8">{disc.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Sidebar Syllabus */}
        <div className="w-full lg:w-80 bg-gray-900 border-l border-gray-800 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-gray-800 font-bold text-sm text-white">
            Course Syllabus Outline
          </div>

          <div className="divide-y divide-gray-800">
            {course.syllabus.map((module, mIdx) => (
              <div key={module.id} className="py-2">
                <div className="px-4 py-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Module {mIdx + 1}: {module.title}
                </div>

                <div className="space-y-1">
                  {module.lessons?.map(lesson => {
                    const isCurrent = lesson.id === activeLesson.id;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        className={`w-full text-left px-4 py-3 text-xs flex items-center justify-between transition-colors ${
                          isCurrent 
                            ? 'bg-indigo-600/30 text-white border-l-4 border-primary font-bold' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isDone ? (
                            <i className="fas fa-check-circle text-secondary shrink-0"></i>
                          ) : (
                            <i className={`fas fa-play text-xs shrink-0 ${isCurrent ? 'text-primary' : 'text-gray-500'}`}></i>
                          )}
                          <span className="line-clamp-1">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 shrink-0 ml-2">{lesson.duration}</span>
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
