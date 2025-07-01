
import React from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="text-center py-8">
      <Calculator className="h-24 w-24 mx-auto mb-6 text-blue-600" />
      <h2 className="text-2xl font-semibold mb-4">
        Pronto para descobrir como aumentar seus lucros?
      </h2>
      <p className="text-gray-600 mb-8">
        Este quiz vai ajudar você a identificar oportunidades de melhoria na gestão do seu negócio e criar um plano de ação personalizado.
      </p>
      <Button 
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
      >
        Iniciar Diagnóstico
      </Button>
    </div>
  );
};

export default StartScreen;
