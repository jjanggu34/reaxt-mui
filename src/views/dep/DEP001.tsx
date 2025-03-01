/**
 * @fileoverview [수신] 
 *
 * @author 
 * @version 1.0.0
 */

import { useState } from "react";
import { Box } from "@mui/material";
import { Card05 } from "@src/components/Card";
import { Tab01 } from "@src/components/Tab";

const depProducts = [
  {
    pdcd: "pd001",
    pdnm: "회전정기예금",
    cmmProdCategoty: "창구전용",
    pdDesc: "약정한 회전주기별(12개월) 이자율이 변동되는 정기예금",
    keyword: ["회전", "회전정기예금", "변동금리", "2년,3년","영업점방문"],
    depdate: "12",
    intr: "2.88",
    pd_dvcd: "(연, 세전, 복리)",
    pd_kncd: "예금"
  },
  {
    pdcd: "pd002",
    pdnm: "e-회전정기예금_복리(예스뱅킹)",
    cmmProdCategoty: "온라인전용",
    pdDesc: "약정한 회전주기별(12개월) 이자율이 변동되는 정기예금",
    keyword: ["회전", "회전정기예금", "변동금리", "2년,3년","인터넷,모바일가입입"],
    depdate: "12",
    intr: "2.88",
    pd_dvcd: "(연, 세전, 복리)",
    pd_kncd: "예금"
  },
  {
    pdcd: "pd003",
    pdnm: "e-회전정기예금_단리(예스뱅킹)",
    cmmProdCategoty: "온라인전용",
    pdDesc: "약정한 회전주기별(12개월) 이자율이 변동되는 정기예금",
    keyword: ["회전", "회전정기예금", "변동금리", "2년,3년","인터넷,모바일가입"],
    depdate: "12",
    intr: "2.85",
    pd_dvcd: "(연, 세전, 단리)",
    pd_kncd: "예금"
  },
  {
    pdcd: "pd004",
    pdnm: "e-The빠른회전정기예금(6개월)_복리",
    cmmProdCategoty: "온라인전용",
    pdDesc: "약정한 회전주기별(6개월) 이자율이 변동되는 정기예금",
    keyword: ["회전", "회전정기예금", "변동금리", "3년","인터넷,모바일가입"],
    depdate: "6",
    intr: "2.86",
    pd_dvcd: "(연, 세전, 복리)",
    pd_kncd: "예금"
  },
  {
    pdcd: "pd005",
    pdnm: "The빠른회전정기예금(6개월)",
    cmmProdCategoty: "창구전용",
    pdDesc: "약정한 회전주기별(6개월) 이자율이 변동되는 정기예금",
    keyword: ["회전", "회전정기예금", "변동금리", "3년","영업점방문"],
    depdate: "6",
    intr: "2.85",
    pd_dvcd: "(연, 세전, 단리)",
    pd_kncd: "예금"
  },
  {
    pdcd: "pd006",
    pdnm: "정기적금",
    cmmProdCategoty: "창구전용",
    pdDesc: "목돈 마련을 목적으로 일정기간 매월 일정금액을 납입하는 적립식 예금",
    keyword: ["목돈", "적립식예금","가입대상제한없음음"],
    depdate: "12",
    intr: "3.50",
    pd_dvcd: "(연, 세전, 단리)",
    pd_kncd: "적금"
  },
  {
    pdcd: "pd007",
    pdnm: "RUN파킹통장(개인/대면)",
    cmmProdCategoty: "창구전용",
    pdDesc: "하루만 맡겨도 높은 금리를 드리는 파킹통장장",
    keyword: [""],
    depdate: "12",
    intr: "67.20",
    pd_dvcd: "(연, 세전, 단리)",
    pd_kncd: "입출금"
  }
];

/**
 * 탭 항목 정의
 */
const tabItems = [
  { label: "전체", value: "전체" },
  { label: "창구전용", value: "창구전용" },
  { label: "온라인전용", value: "온라인전용" },

];

const DEP001 = () => {
  const [selectedTab, setSelectedTab] = useState("전체");

  // 탭 변경 시 이벤트
  const handleTabChange = (value: string | number) => {
    setSelectedTab(value.toString());
  };

  // 탭 - 카테고리에 따라서 필터링
  const filteredProducts =
  selectedTab === "전체"
    ? depProducts
    : depProducts.filter((product) => product.cmmProdCategoty === selectedTab);

  return (

    <Box sx={{ width: "95%" }}>
      {/* 예적금 탭 컴포넌트 */}
      <Tab01 items={tabItems} initialValue="전체" onChange={handleTabChange} />

      {/* 예적금 상품 컴포넌트 */}
      <Box sx={{ minHeight: "100vh", mx: 2, width: "95%", mt:3 }}>
        {filteredProducts.map((product) => (
          <Card05
            key={product.pdcd}
            pdcd={product.pdcd} // 상품코드
            pdnm={product.pdnm} // 상품명
            pd_kncd={product.pd_kncd} // 상품종류류
            pdDesc={product.pdDesc} // 상품설명
            keyword={product.keyword} // 키워드
            depdate={product.depdate} // 예적금기간간
            intr={product.intr} // 금리
            pd_dvcd={product.pd_dvcd} // 세전,복리 단리 구분
            cmmProdCategoty={product.cmmProdCategoty}          />
        ))}
      </Box>
    </Box>
  );
};

export default DEP001;