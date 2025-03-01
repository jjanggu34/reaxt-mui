/**
 * @fileoverview [조회] 
 *
 * @author 
 * @version 1.0.0
 */

import { Box, Typography } from "@mui/material";
import { useEffect ,useState } from "react";

import { GLog } from "@src/assets/js/common";
import { messageView } from "@src/components/Alert";
import { progressBar } from "@src/components/Loading";
import { Button01 } from "@src/components/Button";
import { Card06 } from "@src/components/Card";


const accountData = {
  ACNO: "123-456-789012",
  ACNT_BLNC: 98750000,
};
const transactionData = [
  {
    ACNO: "123-456-789012",
    DEPR_NM: "홍길동",
    NEXT_TRAN_YN: "Y",
    DTA_NCNT: 1,
    OUT_REC: {
      TRN_DT: "2024-02-26",
      TRN_TKTM: "14:30",
      TRAN_AMT_SIGN: " ",
      TRN_AMT: 50000,
      TRNF_AF_BLNC_SIGN: "+",
      ACNT_BLNC: 98700000,
      OUTL: "스타벅스",
    },
    NEXT_DATA_XN: "N",
    API_RS_MSG: "정상 처리되었습니다.",
  }
]

interface Card06Props {
  type: string;
  acno: string;
  balance: number;
}

interface TransactionDisplayProps {
  ACNO : string;
  DEPR_NM : string;
  NEXT_TRAN_YN : string;
  DTA_NCNT : number;
  OUT_REC: {
    TRN_DT: string;                 //거래일자
    TRN_TKTM : string;              //거래시각
    TRAN_AMT_SIGN: string;          //거래금액부호
    TRN_AMT: number;                //거래금액
    TRNF_AF_BLNC_SIGN: string;      //거래후잔액부호
    ACNT_BLNC: number;              //계좌잔액
    OUTL : string                   //거래자명
  }[];
  NEXT_DATA_XN: string;
  API_RS_MSG : string
}

const INQ002 = () => {
  const [showBalance] = useState(true);
  const [accountData, setAccountData] = useState({
    ACNO: "123-456-789012",  // 초기값 설정
    ACNT_BLNC: 98750000,
  });
  const [transactionData, setTransactionData] = useState<TransactionDisplayProps[]>([
    {
      ACNO: "123-456-789012",
      DEPR_NM: "홍길동",
      NEXT_TRAN_YN: "Y",
      DTA_NCNT: 1,
      OUT_REC: [{
        TRN_DT: "2024-02-26",
        TRN_TKTM: "14:30",
        TRAN_AMT_SIGN: " ",
        TRN_AMT: 50000,
        TRNF_AF_BLNC_SIGN: "+",
        ACNT_BLNC: 98700000,
        OUTL: "스타벅스",
      },{
        TRN_DT: "2024-02-27",
        TRN_TKTM: "14:40",
        TRAN_AMT_SIGN: " ",
        TRN_AMT: 50000,
        TRNF_AF_BLNC_SIGN: "+",
        ACNT_BLNC: 98700000,
        OUTL: "구내식당",
      }],
      NEXT_DATA_XN: "N",
      API_RS_MSG: "정상 처리되었습니다.",
    }
  ]);

  //TODO 백엔드 연결해서 데이터 받아와야함함
  // const { doAction, makeForm, addFormData } = Common();


  // useEffect(() => {
  //   const fetchData = async () => {
  //     //Form 생성 및 데이터 셋팅
  //     const form = makeForm("INQ002SC");
  //     addFormData(form, "acno", "123-456-789012"); // 계좌번호 추가

  //     //로딩 시작
  //     progressBar(true, "");

  //     //API 호출
  //     const resDs = await doAction(form);

  //     //로딩 끝
  //     progressBar(false);

  //     //응답값 확인
  //     // if (resDs.header.respCd !== "N00000") {
  //     //   messageView(`통신 실패 : ${resDs.header.respMsg}`, "확인", () =>
  //     //     console.log("확인 클릭")
  //     //   );
  //     //   return; 
  //     // }

  //     //응답값 세팅 TODO INQ002SC 완성하면 데이터 셋팅 해줘야함함
  //     setAccountData(accountData);
  //     setTransactionData(transactionData);
  //     //GLog.d(`${JSON.stringify(resDs)}`)

      
  //   };

  //   fetchData();
  // }, []);
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
      {/* 페이지 메인 제목 */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>거래내역조회</Typography>

      {/* 계좌정보 */}
      <Card06
        type="입출금"    // 계좌 타입 (예금, 대출 등)
        acno="123-456-789012" // 계좌 번호
        balance={1000000} // 계좌 잔액
        pdnm="보통예금(예스뱅킹)"
      />
      
      {/* 거래내역 */}
      {transactionData.map((transaction, index) => (
        transaction.OUT_REC.map((outRec, outRecIndex) => (
          <Box
            key={`${index}-${outRecIndex}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid lightgray",
              pb: "12px",
              width: "100%",
            }}
          >
            {/* 첫 번째 Box (거래 정보) */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" sx={{ color: "#888", marginBottom: "4px" }}>
                {outRec.TRN_DT} <span>{outRec.TRN_TKTM}</span>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {outRec.OUTL}
              </Typography>
            </Box>

            {/* 두 번째 Box (금액 정보) */}
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: outRec.TRAN_AMT_SIGN === " " ? "#1976D2" : "#000",
                }}
              >
                {outRec.TRAN_AMT_SIGN === " " ? "+" : "-"}
                {outRec.TRN_AMT.toLocaleString()} 원
              </Typography>

              <Typography variant="body2" sx={{ color: "#555" }}>
                잔액: {outRec.ACNT_BLNC.toLocaleString()} 원
              </Typography>
            </Box>
          </Box>
        ))
      ))}
      

      
    </Box>
   
  );
};

export default INQ002;

