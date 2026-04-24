import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  text: string;
  options: { text: string; value: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is your primary investment goal?",
    options: [
      { text: "Preserve my capital", value: "Conservative", score: 1 },
      { text: "Balance between growth and safety", value: "Moderate", score: 2 },
      { text: "Maximize long-term growth", value: "Aggressive", score: 3 },
    ]
  },
  {
    id: 2,
    text: "How would you react if your portfolio dropped 20% in a month?",
    options: [
      { text: "Sell everything immediately", value: "Conservative", score: 1 },
      { text: "Do nothing and wait", value: "Moderate", score: 2 },
      { text: "Buy more at a discount", value: "Aggressive", score: 3 },
    ]
  },
  {
    id: 3,
    text: "What is your investment time horizon?",
    options: [
      { text: "Less than 3 years", value: "Conservative", score: 1 },
      { text: "3 to 7 years", value: "Moderate", score: 2 },
      { text: "More than 7 years", value: "Aggressive", score: 3 },
    ]
  }
];

export function RiskAssessment({ onComplete }: { onComplete: (profile: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = newScores.reduce((a, b) => a + b, 0);
      let profile = "Moderate";
      if (totalScore <= 4) profile = "Conservative";
      else if (totalScore >= 8) profile = "Aggressive";
      
      setIsFinished(true);
      setTimeout(() => onComplete(profile), 2000);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full mx-auto">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Shield size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Risk Assessment</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500" 
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-bold leading-tight">
              {questions[currentStep].text}
            </h3>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option.score)}
                  className="w-full p-4 text-left border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700 group-hover:text-blue-700">{option.text}</span>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold">Assessment Complete!</h3>
            <p className="text-slate-500">We've calculated your risk profile. Updating your dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
