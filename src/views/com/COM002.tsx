import { useState, useEffect } from "react";
import { GLog, doAction, makeForm, addFormData } from '@assets/js/common';
import DataSet from '@src/assets/io/DataSet';
import { Box01 } from "@src/components/Box";
import { Button01 } from "@src/components/Button";
import { Card04 } from "@src/components/Card";
import { Accordion01 } from "@src/components/Accordion";
import { EmailBox } from "@src/components/Input";
import { TextBox01, TextBox02 } from "@src/components/Text";
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { decode } from "html-entities";

// COM002의 props 타입 정의
interface COM002Props {
  title?: string;           // 헤더 제목f
  buttonText?: string;      // 버튼 텍스트
  stplatClsCd?: string;     // 약관분류코드
  nFunc?: () => void;       // 버튼 클릭 시 실행할 함수
}

// 서버에서 받아올 약관 데이터 타입 정의
interface Agreement {
  stplatCd: string;     // 약관 코드
  title: string;        // 약관명
  apiCd: string;        // API 코드
  prdctCd: string;      // 상품 코드
  cmpusYn: string;      // 필수 여부 (Y/N)
  contents: string;     // 약관 내용 (HTML 가능)
  atchFileNm?: string;  // 첨부파일명
  summary?: string;     // 요약설명
  checked: boolean;     // 사용자가 체크 여부 (UI용)
}

export const COM002 = ({
  title = "헤더 제목",
  buttonText = "다음 버튼 문구",
  stplatClsCd = "O049001", //TODO 제거
  nFunc
}: COM002Props) => {
  const [requiredAgreements, setRequiredAgreements] = useState<Agreement[]>([]);
  const [optionalAgreements, setOptionalAgreements] = useState<Agreement[]>([]);

  // 약관 조회 함수 (DataSet 활용)
  const fetchStplatList = async () => {
    if (!stplatClsCd) return;

    const form = makeForm("COM0002SC");
    addFormData(form, "txGbnCd", "S01");
    addFormData(form, "STPLAT_CLS_CD", stplatClsCd);

    progressBar(true);

    try {
      const response = await doAction(form);
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("약관 조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      const resData = new DataSet(response.data);

      // 약관 리스트 가져오기
      const fetchedAgreements = resData.getList<Record<string, unknown>>("stplatList").map((item) => ({
        stplatCd: String(item["STPLAT_CD"] || ""),
        title: String(item["STPLAT_NM"] || ""),
        apiCd: String(item["API_CD"] || ""),
        prdctCd: String(item["PRDCT_CD"] || ""),
        cmpusYn: String(item["CMPUS_YN"] || ""),
        contents: decode(String(item["STPLAT_CNTN"] || "")),
        atchFileNm: item["ATCH_FLE_NM"] ? String(item["ATCH_FLE_NM"]) : undefined,
        summary: item["SMR_DC_CNTN"] ? String(item["SMR_DC_CNTN"]) : undefined,
        checked: false
      }));

      // 필수(Y)와 선택(N) 약관으로 분리
      setRequiredAgreements(fetchedAgreements.filter((item) => item.cmpusYn === "Y"));
      setOptionalAgreements(fetchedAgreements.filter((item) => item.cmpusYn === "N"));

    } catch (error) {
      GLog.e("약관 조회 중 오류 발생:", error);
      messageView("약관 조회 중 오류가 발생했습니다.", "확인");
      progressBar(false);
    }
  };

  useEffect(() => {
    fetchStplatList();
  }, [stplatClsCd]);

  // 약관 체크 상태 변경
  const handleAgreementChange = (index: number, type: "required" | "optional") => {
    if (type === "required") {
      setRequiredAgreements((prev) =>
        prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
      );
    } else {
      setOptionalAgreements((prev) =>
        prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
      );
    }
  };

  return (
    <Box01>
      {/* 헤더 */}
      <TextBox01 text={title} />

      {/* 필수 약관 (약관이 있는 경우만 렌더링) */}
      {requiredAgreements.length > 0 && (
        <Card04 title="필수 약관">
          {requiredAgreements.map((agreement, index) => (
            <Accordion01 
              key={agreement.stplatCd} 
              title={agreement.title} 
              checked={agreement.checked}
              contents={<div dangerouslySetInnerHTML={{ __html: agreement.contents }} />} 
              onChange={() => handleAgreementChange(index, "required")}
            />
          ))}
        </Card04>
      )}
      
      {/* 선택 약관 (약관이 있는 경우만 렌더링) */}
      {optionalAgreements.length > 0 && (
        <Card04 title="선택 약관">
          {optionalAgreements.map((agreement, index) => (
            <Accordion01 
              key={agreement.stplatCd} 
              title={agreement.title} 
              checked={agreement.checked}
              contents={<div dangerouslySetInnerHTML={{ __html: agreement.contents }} />} 
              onChange={() => handleAgreementChange(index, "optional")}
            />
          ))}
        </Card04>
      )}

      {/* 이메일 입력 (stplatClsCd 값이 "1"일 경우) */}
      {stplatClsCd === "O049001" && (
        <>
          <TextBox02 text="이메일" />
          <EmailBox label="abc@email.com" value="" onChange={(e) => console.log(e.target.value)} />
        </>
      )}

      {/* 제출 버튼 */}
      <Button01 btnName={buttonText} clickFunc={nFunc} />
    </Box01>
  );
};

export default COM002;
