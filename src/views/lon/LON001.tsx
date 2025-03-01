/**
 * @fileoverview [여신] 대출상품 목록
 *
 * @author
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { GLog, doAction,makeForm, addFormData, useAppNavigator } from '@assets/js/common';
import DataSet from '@src/assets/io/DataSet';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { Box } from "@mui/material";
import { Card03 } from "@src/components/Card";
import { Tab01 } from "@src/components/Tab";
import { Box02 } from "@src/components/Box";

/**
 * 대출 상품 데이터 타입 정의
 */
interface LoanProduct {
  pdcd: string;               // 상품코드
  pdnm: string;               // 상품명
  cmmProdCategoty: string;    // 카테고리
  pdDesc: string;             // 상품설명
  keyword: string[];          // 키워드 배열
  maxLimit: string;           // 최대한도
  minIntrate: string;         // 최저금리
  maxIntrate: string;         // 최대금리
}

/**
 * 탭 항목 정의
 */
const tabItems = [
  { label: "전체", value: "전체" },
  { label: "신용대출", value: "신용대출" },
  { label: "담보대출", value: "담보대출" },
  { label: "정책자금대출", value: "정책자금대출" },
  { label: "외국인대출", value: "외국인대출" }
];

const LON001 = () => {
  const [selectedTab, setSelectedTab] = useState("전체");
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const navigate = useAppNavigator();

  const fetchLoanProducts = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('LON0000SC');
    addFormData(form,'txGbnCd','TEST');

    //로딩 ON
    progressBar(true, "통신중");

    try {
      //통신
      const response = await doAction(form);
      //로딩 OFF
      progressBar(false);

      if (response.header.respCd !== "N00000") {
        GLog.e("대출상품 조회 실패:", response.header.respMsg);
        messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
        return;
      }

      // 대출상품 리스트 가져오기
      const resData = new DataSet(response.data);
      const loanList = resData.getList<Record<string, unknown>>("LIST");

      const formattedData: LoanProduct[] = loanList.map((item) => ({
        pdcd: String(item["pdcd"] || ""),
        pdnm: String(item["pdnm"] || ""),
        cmmProdCategoty: String(item["cmmProdCategoty"] || ""),
        pdDesc: String(item["pdDesc"] || ""),
        keyword: item["keyword"] ? String(item["keyword"]).split("/") : [],
        maxLimit: String(item["maxLimit"] || "0"),
        minIntrate: String(item["minIntrate"] || "0"),
        maxIntrate: String(item["maxIntrate"] || "0"),
      }));
      
      setLoanProducts(formattedData);  

    } catch (error) {
        GLog.e("대출상품 조회 중 오류 발생:", error);
        messageView("대출상품 조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
    }
  };

  // 최초 조회
  useEffect(() => {
    fetchLoanProducts();
  }, []);

  // 탭 변경 시 이벤트
  const handleTabChange = (value: string | number) => {
    setSelectedTab(value.toString());
  };

  // 탭 - 카테고리에 따라서 필터링
  const filteredProducts =
  selectedTab === "전체"
    ? loanProducts
    : loanProducts.filter((product) => product.cmmProdCategoty === selectedTab);

  return (
    <Box>
      {/* 대출 탭 컴포넌트 */}
      <Tab01 items={tabItems} initialValue="전체" onChange={handleTabChange} />

      {/* 대출 한도 조회 컴포넌트 */}
      <Box02
        title="내 대출한도가 궁금하세요?"
        description="신용평점에 영향 없이 대출한도를 알아보세요."
        buttonText="간편대출한도조회 ▶"
        onButtonClick={() => navigate.doActionURL("/")}
      />

      {/* 대출 상품 컴포넌트 */}
      {filteredProducts.map((product) => (
        <Card03
          key={product.pdcd}                          
          pdcd={product.pdcd}                 // 상품코드
          pdnm={product.pdnm}                 // 상품명
          categoty={product.cmmProdCategoty}  // 카테고리
          pdDesc={product.pdDesc}             // 상품설명
          keyword={product.keyword}           // 키워드
          contents1={`최대한도 ${product.maxLimit}만원`}                   // 최대한도
          contents2={`연 ${product.minIntrate}%~${product.maxIntrate}%`}  // 금리
        />
      ))}
    </Box>
  );
};

export default LON001;