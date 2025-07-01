
import React from 'react';
import { Button } from '@/components/ui/button';
import { QuizData } from '../types/quiz';

interface QuizScreenProps {
  currentQuestion: number;
  score: number;
  answers: number[];
  onSelectOption: (optionIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const QuizScreen = ({
  currentQuestion,
  score,
  answers,
  onSelectOption,
  onNext,
  onPrev
}: QuizScreenProps) => {
  const question = QuizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === QuizData.questions.length - 1;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pergunta {currentQuestion + 1} de {QuizData.questions.length}</span>
          <span>Pontuação: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / QuizData.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
                onClick={() => onSelectOption(index)}
              >
                <label className="flex items-center cursor-pointer">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 mr-3 flex items-center justify-center">
                    {isSelected && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                  </div>
                  <span className="text-gray-800">{option.text}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className={`${currentQuestion === 0 ? 'invisible' : ''}`}
        >
          Anterior
        </Button>
        <Button
          onClick={onNext}
          disabled={answers[currentQuestion] === null}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLastQuestion ? 'Ver Resultado' : 'Próxima'}
        </Button>
      </div>
    </div>
  );
};

export default QuizScreen;
