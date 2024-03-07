import React from 'react';
import './FetchLimitSelector.css'

interface DropdownSelectorProps {
  options: number[];
  selectedOption: number;
  onSelect: (value: number) => void;
}

const FetchLimitSelector: React.FC<DropdownSelectorProps> = ({options, onSelect, selectedOption}) => {
  return (
    <div className={'fetch-limit-selector-wrapper'}>
      <div className={'info-text'}>Лимит:</div>
      <select
        title={'ntcn'}
        className={'fetch-limit-selector'}
        value={selectedOption} onChange={e => onSelect(e.target.value as unknown as number)}
      >
        {options.map((option) => (
          <option
            key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FetchLimitSelector;
