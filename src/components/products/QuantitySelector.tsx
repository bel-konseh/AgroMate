
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
}) => {
  const canDecrement = quantity > min;
  const canIncrement = quantity < max;

  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={onDecrement}
        disabled={!canDecrement}
        className={`px-4 py-2 rounded-l-lg transition-colors ${
          canDecrement
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span 
        className="px-4 py-2 border-l border-r border-gray-300 min-w-12 text-center"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        disabled={!canIncrement}
        className={`px-4 py-2 rounded-r-lg transition-colors ${
          canIncrement
            ? 'text-gray-600 hover:bg-gray-100'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;