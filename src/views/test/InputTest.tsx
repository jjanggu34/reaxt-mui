import { useState } from "react";
import { Box } from "@mui/material";
import {
  TextBox,
  NumberBox,
  EmailBox,
  PwdBox,
  ResidentNumber,
  SelectInputBox
} from "@src/components/Input";

/**
 * 일반 테스트 화면 드로잉
 */
const InputTest  = () => {
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 주민등록번호 입력을 위한 상태 추가
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");

  // ✅ 셀렉트 + 입력 필드 조합 (예: 휴대폰 번호)
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* ✅ 일반 입력 필드 */}
      <TextBox label="텍스트 입력" value={text} onChange={(e) => setText(e.target.value)} />
      <NumberBox label="숫자 입력" value={number} onChange={(e) => setNumber(e.target.value)} />
      <EmailBox label="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PwdBox label="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />

      {/* ✅ 주민등록번호 입력 */}
      <ResidentNumber
        label="주민등록번호 입력"
        firstValue={firstPart}
        secondValue={secondPart}
        onFirstChange={(e) => setFirstPart(e.target.value)}
        onSecondChange={(e) => setSecondPart(e.target.value)}
      />
      {/* ✅ 셀렉트 + 입력 필드 조합 (예: 휴대전화 번호 입력) */}
      <SelectInputBox
        selectLabel="휴대전화 번호"
        selectOptions={[
          { label: "010", value: "010" },
          { label: "011", value: "011" },
          { label: "016", value: "016" },
          { label: "019", value: "019" }
        ]}
        selectValue={phonePrefix}
        onSelectChange={(e) => setPhonePrefix(e.target.value as string)}
        inputValue={phoneNumber}
        onInputChange={(e) => setPhoneNumber(e.target.value)}
      />
    </Box>
  );
};

export default InputTest
