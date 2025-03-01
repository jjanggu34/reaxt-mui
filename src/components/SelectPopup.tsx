import React, { useState } from 'react';
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
  width: ${props => props.width || '100%'};
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  outline: none;
  text-align: left;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const PopupContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
  transform: translateY(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  max-height: 70vh;
  overflow-y: auto;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${props => props.isSelected ? '#f0f0f0' : 'transparent'};

  &:hover {
    background-color: #f5f5f5;
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
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    handleClose();
  };

  return (
    <>
      <SelectContainer width={width}>
        <SelectButton onClick={handleOpen} disabled={disabled}>
          {selectedOption ? selectedOption.label : placeholder || '선택하세요'}
        </SelectButton>
      </SelectContainer>

      <Overlay isOpen={isOpen} onClick={handleClose} />
      <PopupContainer isOpen={isOpen}>
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              isSelected={option.value === value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionList>
      </PopupContainer>
    </>
  );
};

export default Select; 