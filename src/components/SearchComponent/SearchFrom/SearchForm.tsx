import "./styles.css";
import React from "react";
import FetchLimitSelector from "../LimitSelector/FetchLimitSelector.tsx";

interface SearchFormProps {
  searchStringValue: string;
  onSearchStringChange: (newVal: string) => void;
  limitSelectorValue: number;
  onLimitSelectorChange: (newVal: number) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ searchStringValue, onSearchStringChange, limitSelectorValue, onLimitSelectorChange }) => {
  return (
    <div className="searchForm">
      <input
        type="text"
        onChange={e => onSearchStringChange(e?.target?.value)}
        value={searchStringValue}
        placeholder={'Введите запрос'}
      />
      <FetchLimitSelector
        options={[3, 5, 10, 20, 100, 999]}
        selectedOption={limitSelectorValue}
        onSelect={onLimitSelectorChange}
      />
    </div>
  );
}
