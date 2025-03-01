import React from 'react';
import styled from '@emotion/styled';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
}

const SelectContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${props => props.width || '100%'};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  width
}) => {
  return (
    <SelectContainer width={width}>
      <StyledSelect
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default Select; 