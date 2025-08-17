import { useState } from 'react';
import TransportCalculator from '../components/TransportCalculator';
import EnergyCalculator from '../components/EnergyCalculator';
import DietCalculator from '../components/DietCalculator';
import CalculatorResults from '../components/CalculatorResults';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState('transport');
  const [calculations, setCalculations] = useState({
    transport: 0,
    energy: 0,
    diet: 0,
    total: 0
  });

  const [savedCalculations, setSavedCalculations] = useState([]);

  const updateCalculation = (category, value) => {
    setCalculations(prev => {
      const updated = { ...prev, [category]: value };
      updated.total = updated.transport + updated.energy + updated.diet;
      return updated;
    });
  };

  const saveCalculation = () => {
    const newCalculation = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...calculations
    };
    setSavedCalculations(prev => [newCalculation, ...prev.slice(0, 4)]);
  };

  const resetCalculations = () => {
    setCalculations({
      transport: 0,
      energy: 0,
      diet: 0,
      total: 0
    });
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>Carbon Footprint Calculator</h1>
        <p>Calculate your daily carbon emissions across different categories</p>
      </div>

      <div className="calculator-tabs">
        <button 
          className={activeTab === 'transport' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('transport')}
        >
          🚗 Transport
        </button>
        <button 
          className={activeTab === 'energy' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('energy')}
        >
          ⚡ Energy
        </button>
        <button 
          className={activeTab === 'diet' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('diet')}
        >
          🍽️ Diet
        </button>
      </div>

      <div className="calculator-content">
        <div className="calculator-forms">
          {activeTab === 'transport' && (
            <TransportCalculator 
              onCalculate={(value) => updateCalculation('transport', value)}
            />
          )}
          {activeTab === 'energy' && (
            <EnergyCalculator 
              onCalculate={(value) => updateCalculation('energy', value)}
            />
          )}
          {activeTab === 'diet' && (
            <DietCalculator 
              onCalculate={(value) => updateCalculation('diet', value)}
            />
          )}
        </div>

        <CalculatorResults 
          calculations={calculations}
          savedCalculations={savedCalculations}
          onSave={saveCalculation}
          onReset={resetCalculations}
        />
      </div>
    </div>
  );
}