/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/Input";
 */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  List,
  ListItem,
  Button,
} from "@mui/material";

import SelectPopup from './SelectPopup';


// ✅ 일반 텍스트 박스
export const TextBox = ({
  label,
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    {label && <FormLabel>{label}</FormLabel>}
    <Input placeholder="내용을 입력해주세요." value={value} onChange={onChange} />
  </Box>
);

// ✅ 숫자 입력 박스
export const NumberBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{label}</FormLabel>
    <Input type="number" placeholder="숫자를 입력해주세요." value={value} onChange={onChange} />
  </Box>
);

// ✅ 주민등록번호 입력 필드 (생년월일 + 성별코드)
export const ResidentNumber = ({
  label,
  firstValue,
  secondValue,
  onFirstChange,
  onSecondChange,
}: {
  label: string;
  firstValue?: string;
  secondValue?: string;
  onFirstChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [firstFocused, setFirstFocused] = useState(false);
  const [secondFocused, setSecondFocused] = useState(false);

  return (
    <Box className="form-input">
      <FormLabel>{label}</FormLabel>
      <Box className="form-input-box flex-row">
        <Input 
          type="number" 
          placeholder="생년월일(6자리)" 
          value={firstValue} 
          onChange={onFirstChange} 
          inputProps={{ maxLength: 6 }} 
          sx={{ 
            width: "120px", 
            textAlign: "center",
            opacity: firstFocused ? 1 : 0.7,
            transition: 'opacity 0.2s'
          }}
          onFocus={() => setFirstFocused(true)}
          onBlur={() => setFirstFocused(false)}
        />
        <Typography sx={{ textAlign: "center" }}>-</Typography>
        <Input 
          type="password" 
          placeholder="뒷자리(7자리)" 
          value={secondValue} 
          onChange={onSecondChange} 
          inputProps={{ maxLength: 7 }} 
          sx={{ 
            width: "140px", 
            textAlign: "center",
            opacity: secondFocused ? 1 : 0.7,
            transition: 'opacity 0.2s'
          }}
          onFocus={() => setSecondFocused(true)}
          onBlur={() => setSecondFocused(false)}
        />
      </Box>
    </Box>
  );
};

// ✅ 이메일 입력 박스
export const EmailBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{label}</FormLabel>
    <Input type="email" placeholder="이메일을 입력해주세요." value={value} onChange={onChange} />
  </Box>
);

// ✅ 비밀번호 입력 박스
export const PwdBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{label}</FormLabel>
    <Input type="password" placeholder="비밀번호를 입력해주세요." value={value} onChange={onChange} />
  </Box>
);


// ✅ 이체 한도 입력 컴포넌트
export const LimitInput = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{label}</FormLabel>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input type="number" placeholder={placeholder} value={value} onChange={onChange} sx={{ fontWeight: "bold" }} />
      <Typography sx={{ fontWeight: "bold" }}>원</Typography>
    </Box>
  </Box>
);

// ✅ 선택 박스 (Select)
export const SelectBox = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (event: any) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{label}</FormLabel>
    <Select 
      value={value || ""} 
      onChange={onChange} 
      displayEmpty 
      sx={{ width: "150px" }}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        PaperProps: {
          style: {
            maxHeight: '40vh',
            width: '100%',
            position: 'fixed',
            bottom: 0,
            left: 0,
            borderRadius: '16px 16px 0 0',
          }
        },
        sx: {
          '& .MuiMenu-paper': {
            borderRadius: '16px 16px 0 0',
          }
        }
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

// ✅ Select + Input 조합 (예: 휴대폰 번호 입력)
export const SelectInputBox = ({
  selectLabel,
  selectOptions,
  selectValue,
  onSelectChange,
  inputValue,
  onInputChange,
}: {
  selectLabel: string;
  selectOptions: { label: string; value: string }[];
  selectValue?: string;
  onSelectChange?: (event: any) => void;
  inputValue?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Box className="form-input">
    <FormLabel>{selectLabel}</FormLabel>
    <Box className="form-input-box flex-row">
        <SelectPopup className="form-select-btn"
          label=""
          options={selectOptions}
          value={selectValue}
          onChange={onSelectChange}
          placeholder="선택"
          withFormControl={false}
        />
      <Input placeholder="번호 입력" value={inputValue} onChange={onInputChange} sx={{ width: "200px" }} />
    </Box>
  </Box>
);

// ✅ 기본 export
export default {
  TextBox,
  NumberBox,
  EmailBox,
  PwdBox,
  ResidentNumber,
  LimitInput,
  SelectBox,
  SelectInputBox,
  SelectPopup
};