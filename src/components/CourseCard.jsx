import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Rating } from './Rating';
import { ProgressBar } from './ProgressBar';
import { Clock, CheckCircle, ArrowRight, Heart, Award, Users } from 'lucide-react';

export const CourseCard = ({ course }) => {
  const { enrolledCourses, getCourseProgress, isWishlisted, toggleWishlist } = useApp();
  const isEnrolled = enrolledCourses.includes(course.id);
  const progress = isEnrolled ? getCourseProgress(course.id) : 0;
  const wishlisted = isWishlisted(course.id);

  return (
    <div className="pro-card rounded-2xl overflow-hidden flex flex-col justify-between group relative bg-white">
      
      {/* Course Thumbnail */}
      <div className="relative h-44 bg-slate-900 overflow-hidden">
        <Link to={`/course/${course.id}`}>
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider rounded-md shadow-xs uppercase">
            {course.subject}
          </span>
          <span className="px-2 py-0.5 bg-indigo-600/90 text-white text-[10px] font-bold rounded-md shadow-xs">
            {course.level}
          </span>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(course.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-rose-600 transition-transform active:scale-95"
          title={wishlisted ? "Remove from Saved Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">{course.gradeLevel}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {course.duration}</span>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            <Link to={`/course/${course.id}`}>
              {course.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <Rating rating={course.rating} count={course.reviewsCount} />
            <span className="text-xs font-bold text-slate-900">{course.isFree ? 'FREE' : `$${course.price}`}</span>
          </div>

          {isEnrolled ? (
            <div className="space-y-2">
              <ProgressBar progress={progress} size="sm" />
              <Link
                to={`/player/${course.id}`}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Continue Learning
              </Link>
            </div>
          ) : (
            <Link
              to={`/course/${course.id}`}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              Enroll Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

    </div>
  );
};
