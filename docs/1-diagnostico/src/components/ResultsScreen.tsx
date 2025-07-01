
import React from 'react';
import { CheckCircle, Search, Settings, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizData } from '../types/quiz';

interface ResultsScreenProps {
  score: number;
  onRestart: () => void;
}

const ResultsScreen = ({ score, onRestart }: ResultsScreenProps) => {
  // Find the appropriate diagnosis based on score
  const diagnosis = QuizData.diagnoses.find(
    diag => score >= diag.range[0] && score <= diag.range[1]
  ) || QuizData.diagnoses[0];

  const handleCTA = () => {
    alert('Obrigado pelo seu interesse! Um especialista entrará em contato para ajudar a implementar seu plano de ação personalizado.');
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <CheckCircle className="h-20 w-20 mx-auto mb-4 text-green-500" />
        <h2 className="text-2xl font-bold mb-2">Seu Diagnóstico Está Pronto!</h2>
        <p className="text-gray-600">
          Pontuação total: <span className="font-semibold">{score}</span> pontos
        </p>
        <h3 className="text-xl font-bold mt-4 text-blue-700">{diagnosis.title}</h3>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-6">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-3">
            <Search className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="font-semibold text-lg text-blue-700">Observação</h4>
          </div>
          <p className="text-gray-700">{diagnosis.observation}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-3">
            <Settings className="h-6 w-6 text-green-600 mr-2" />
            <h4 className="font-semibold text-lg text-green-700">Plano de Ação</h4>
          </div>
          <ul className="text-gray-700 list-disc pl-5 space-y-2">
            {diagnosis.actionPlan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center mb-3">
            <DollarSign className="h-6 w-6 text-yellow-600 mr-2" />
            <h4 className="font-semibold text-lg text-yellow-700">Impacto no Lucro</h4>
          </div>
          <p className="text-gray-700">{diagnosis.profitImpact}</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <Button
          onClick={handleCTA}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg animate-pulse"
        >
          Quero ajuda para aplicar isso agora
        </Button>
      </div>

      <div className="text-center">
        <Button
          onClick={onRestart}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Refazer Diagnóstico
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
