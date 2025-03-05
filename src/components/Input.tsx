/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/Input";
 */
import React, { useState } from "react";
import {
  FormLabel,
  Input,
  Box,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

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


// ✅ 에러 텍스트 박스
export const ErrorTextBox = ({
  label,
  value,
  onChange,
  errorMessage = "Oops! something is wrong.",
}: {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) => (
  <Box className="form-input">
    {label && <FormLabel error>{label}</FormLabel>}
    <Input 
      error 
      placeholder="내용을 입력해주세요." 
      value={value} 
      onChange={onChange}
    />
    <FormHelperText error sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <InfoOutlined fontSize="small" />
      {errorMessage}
    </FormHelperText>
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

// ✅ 금액 입력 박스
export const MoneyBox = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  // 숫자만 추출하는 함수
  const getOnlyNumbers = (str: string) => str.replace(/[^\d]/g, '');
  
  // 천 단위 콤마 포맷팅 함수
  const formatNumber = (num: string) => {
    const numbers = getOnlyNumbers(num);
    if (numbers === '') return '';
    return new Intl.NumberFormat('ko-KR').format(parseInt(numbers));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(event.target.value);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <Box className="form-input">
      <FormLabel>{label}</FormLabel>
      <Box className="form-input-box mony">
        <Input
          value={value}
          onChange={handleChange}
          placeholder="0"
          sx={{ textAlign: "right" }}
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Typography>만원</Typography>
      </Box>
    </Box>
  );
};

// ✅ 주민등록번호 입력 필드 (생년월일 + 성별코드)
export const ResidentNumber = ({
  label,
  firstValue,
  secondValue,
  onFirstChange,
  onSecondChange,
  errorMessage,
}: {
  label: string;
  firstValue?: string;
  secondValue?: string;
  onFirstChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) => {
  const [firstFocused, setFirstFocused] = useState(false);
  const [secondFocused, setSecondFocused] = useState(false);

  // 마스킹된 값을 표시하는 함수
  const getMaskedValue = (value?: string) => {
    if (!value) return '';
    return '●'.repeat(value.length);
  };

  return (
    <Box className="form-input">
      <FormLabel error={!!errorMessage}>{label}</FormLabel>
      <Box className="form-input-box flex-row">
        <Input 
          type="number" 
          placeholder="생년월일(6자리)" 
          value={firstValue} 
          onChange={onFirstChange} 
          inputProps={{ maxLength: 6 }} 
          onFocus={() => setFirstFocused(true)}
          onBlur={() => setFirstFocused(false)}
          error={!!errorMessage}
        />
        <Typography>-</Typography>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Input 
            type="password"
            placeholder="뒷자리(7자리)" 
            value={secondValue} 
            onChange={onSecondChange} 
            inputProps={{ maxLength: 7 }} 
            error={!!errorMessage}
            sx={{ 
              width: "100%", 
              textAlign: "center",
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              '&:focus': {
                '& + .masked-input': {
                  borderBottom: '2px solid var(--primary)',
                  transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                }
              }
            }}
            onFocus={() => setSecondFocused(true)}
            onBlur={() => setSecondFocused(false)}
          />
          <Input 
            readOnly
            className="masked-input"
            value={getMaskedValue(secondValue)}
            error={!!errorMessage}
            sx={{ 
              width: "100%", 
              textAlign: "center",
              backgroundColor: 'transparent',
              '& .MuiInput-input': { 
                cursor: 'default',
                userSelect: 'none',
                color: 'text.primary'
              },
              transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            }}
          />
        </Box>
      </Box>
      {errorMessage && (
        <FormHelperText error sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <InfoOutlined fontSize="small" />
          {errorMessage}
        </FormHelperText>
      )}
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
  errorMessage,
}: {
  selectLabel: string;
  selectOptions: { label: string; value: string }[];
  selectValue?: string;
  onSelectChange?: (event: any) => void;
  inputValue?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) => (
  <Box className="form-input">
    <FormLabel error={!!errorMessage}>{selectLabel}</FormLabel>
    <Box className="form-input-box flex-row">
      <SelectPopup
        label=""
        options={selectOptions}
        value={selectValue}
        onChange={onSelectChange}
        placeholder="통신사 선택"
        withFormControl={false}
      />
      <Input 
        placeholder="번호 입력" 
        value={inputValue} 
        onChange={onInputChange} 
        sx={{ width: "200px" }} 
        error={!!errorMessage}
      />
    </Box>
    {errorMessage && (
      <FormHelperText error sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <InfoOutlined fontSize="small" />
        {errorMessage}
      </FormHelperText>
    )}
  </Box>
);

// ✅ 기본 export
export default {
  TextBox,
  NumberBox,
  EmailBox,
  PwdBox,
  ResidentNumber,
  SelectBox,
  SelectInputBox,
  SelectPopup
};