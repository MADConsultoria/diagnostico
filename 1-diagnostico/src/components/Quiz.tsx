
import React, { useState } from 'react';
import StartScreen from './StartScreen';
import QuizScreen from './QuizScreen';
import ResultsScreen from './ResultsScreen';
import { QuizData } from '../types/quiz';

const Quiz = () => {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'quiz' | 'results'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QuizData.questions.length).fill(null));

  const startQuiz = () => {
    setCurrentScreen('quiz');
  };

  const nextQuestion = () => {
    if (currentQuestion < QuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentScreen('results');
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    const previousAnswer = newAnswers[currentQuestion];
    
    // Update score
    if (previousAnswer !== null) {
      setScore(score - QuizData.questions[currentQuestion].options[previousAnswer].score);
    }
    
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setScore(score + QuizData.questions[currentQuestion].options[optionIndex].score);
  };

  const restartQuiz = () => {
    setCurrentScreen('start');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers(Array(QuizData.questions.length).fill(null));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {currentScreen === 'start' && <StartScreen onStart={startQuiz} />}
        {currentScreen === 'quiz' && (
          <QuizScreen
            currentQuestion={currentQuestion}
            score={score}
            answers={answers}
            onSelectOption={selectOption}
            onNext={nextQuestion}
            onPrev={prevQuestion}
          />
        )}
        {currentScreen === 'results' && (
          <ResultsScreen
            score={score}
            onRestart={restartQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
