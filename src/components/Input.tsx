/**
 * @fileoverview Input 박스 UI
 *
 * 사용 예시:
 * import { TextBox } from "@src/components/Input";
 */
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

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
  <FormControl className="form-group">
    {label && <FormLabel>{label}</FormLabel>}
    <Input placeholder="내용을 입력해주세요." value={value} onChange={onChange} />
  </FormControl>
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
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Input type="number" placeholder="숫자를 입력해주세요." value={value} onChange={onChange} />
  </FormControl>
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
}) => (
  <Box className="form-group">
    <FormLabel>{label}</FormLabel>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input type="number" placeholder="생년월일(6자리)" value={firstValue} onChange={onFirstChange} inputProps={{ maxLength: 6 }} sx={{ width: "120px", textAlign: "center" }} />
      <Typography sx={{ textAlign: "center" }}>-</Typography>
      <Input type="password" placeholder="뒷자리(7자리)" value={secondValue} onChange={onSecondChange} inputProps={{ maxLength: 7 }} sx={{ width: "140px", textAlign: "center" }} />
    </Box>
  </Box>
);

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
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Input type="email" placeholder="이메일을 입력해주세요." value={value} onChange={onChange} />
  </FormControl>
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
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Input type="password" placeholder="비밀번호를 입력해주세요." value={value} onChange={onChange} />
  </FormControl>
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
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Input type="number" placeholder={placeholder} value={value} onChange={onChange} sx={{ fontWeight: "bold" }} />
      <Typography sx={{ fontWeight: "bold" }}>원</Typography>
    </Box>
  </FormControl>
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
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Select value={value || ""} onChange={onChange} displayEmpty sx={{ width: "150px" }}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
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
  <FormControl className="form-group">
    <FormLabel>{selectLabel}</FormLabel>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Select value={selectValue || ""} onChange={onSelectChange} displayEmpty>
        {selectOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Input placeholder="번호 입력" value={inputValue} onChange={onInputChange} sx={{ width: "200px" }} />
    </Box>
  </FormControl>
);

// ✅ SelectPopup 컴포넌트
export const SelectPopup = ({
  label,
  options,
  value,
  onChange,
  placeholder = "선택해주세요"
}: {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (event: any) => void;
  placeholder?: string;
}) => (
  <FormControl className="form-group">
    <FormLabel>{label}</FormLabel>
    <Select
      value={value || ""}
      onChange={onChange}
      displayEmpty
      sx={{ minWidth: "200px" }}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
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