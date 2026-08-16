import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RotateCw, ThumbsUp, RefreshCw, Award } from 'lucide-react';

export const FlashcardDeck = ({ deck }) => {
  const { addXp } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!deck || !deck.cards || deck.cards.length === 0) return null;

  const currentCard = deck.cards[currentIndex];

  const handleNext = (known) => {
    if (known) setKnownCount(prev => prev + 1);

    if (currentIndex + 1 < deck.cards.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsCompleted(true);
      addXp(75);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 paper-tape max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-stone-100 pb-3">
        <div>
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest font-mono">Flashcard Study Deck</span>
          <h3 className="font-serif font-bold text-lg text-stone-900">{deck.title}</h3>
        </div>
        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
          {isCompleted ? 'Finished' : `${currentIndex + 1} / ${deck.cards.length}`}
        </span>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          
          {/* Flip Card Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-56 bg-[#FFFDF9] border-2 border-dashed border-amber-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-xs hover:border-amber-500 transition-all relative select-none"
          >
            <span className="text-[10px] uppercase font-bold text-stone-400 absolute top-4 left-4">
              {isFlipped ? 'Answer Side' : 'Question / Prompt'}
            </span>

            <p className={`font-serif font-bold text-stone-900 transition-all ${isFlipped ? 'text-lg sm:text-xl text-amber-900' : 'text-xl sm:text-2xl'}`}>
              {isFlipped ? currentCard.back : currentCard.front}
            </p>

            <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1 absolute bottom-4">
              <RotateCw className="w-3.5 h-3.5" /> Click anywhere to flip card
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => handleNext(false)}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-stone-500" /> Needs Review
            </button>

            <button
              onClick={() => handleNext(true)}
              className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <ThumbsUp className="w-4 h-4" /> Got It! (+15 XP)
            </button>
          </div>

        </div>
      ) : (
        /* Completion State */
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto text-2xl">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="font-serif font-bold text-xl text-stone-900">Deck Mastered!</h4>
          <p className="text-xs text-stone-600">
            You knew <span className="font-bold text-emerald-700">{knownCount} out of {deck.cards.length}</span> cards on the first try. Earned <span className="font-bold text-amber-800">+75 XP</span>!
          </p>
          <button
            onClick={handleReset}
            className="bg-amber-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-900 transition-colors shadow-xs"
          >
            Study Deck Again
          </button>
        </div>
      )}

    </div>
  );
};
