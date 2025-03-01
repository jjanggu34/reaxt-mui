import { useState, useEffect } from "react";
import { 
  Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card02 } from "@src/components/Card"; // 변경된 컴포넌트 임포트
import { GLog, doAction, makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading"
import { messageView } from '@src/components/Alert';

const INQ001 = () => {

  useEffect(() => {
    const fetchAccountList = async () => { 
      // 폼 생성 및 데이터 주입
      const form = makeForm('INQ0000SC');
      addFormData(form, 'txGbnCd'   , 'TEST3'     );
      addFormData(form, 'SBCD'      , "050"       );
      addFormData(form, 'CSNO'      , "12345679"  );
      addFormData(form, 'USR_ID'    , "cjh"       );
      addFormData(form, 'ACCO_KNCD' , "9"         );

      // 로딩 ON
      progressBar(true, "통신중");

      // 통신
      const response = await doAction(form);

      // 로딩 OFF
      progressBar(false);
      
      // 결과 실패 처리
      if (response.header.respCd !== 'N00000') {
        GLog.e('에러발생 !!!');
        messageView(
          '통신 실패 : ' + response.header.respMsg,
          '확인',
          () => GLog.d('확인 클릭')
        );
        return;
      }

      // 정상 응답 처리
      messageView(
        '통신완료 : ' + JSON.stringify(response.data),
        '확인',
        () => {
          console.log("response.data :::::" + JSON.stringify(response.data))
        }
      );
    };

    fetchAccountList(); 
  }, []);

  const [accounts] = useState([
    { type: "입출금", number: "123-456-789012", balance: 3540000 },
    { type: "적금", number: "789-123-456789", balance: 23500000 },
    { type: "대출", number: "456-789-123456", balance: -5000000 },
    { type: "입출금", number: "321-654-098765", balance: 100000 },
    { type: "적금", number: "254-123-995152", balance: 12000000 },
    { type: "대출", number: "456-951-665423", balance: -4455000 },
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const [isHidden, setIsHidden] = useState(false); 
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (type: string) => {
    setExpanded((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const accountTypes = ["입출금", "적금", "대출"];

  return (
    <>
      <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, mt: 1 }}>전계좌조회</Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", mb: 3 }}>
        자산 
        <br />
        <span style={{color: isHidden ? "gray" : "black"}}>
          {isHidden ? "금액 숨김" : `${totalBalance.toLocaleString()} 원`}
        </span>
        <Button 
          variant="outlined" size="small" 
          sx={{ 
            fontSize: "10px", 
            minWidth: "30px",
            borderRadius: "15px", 
            backgroundColor: "lightgray",
            color: "white",
          }}
          onClick={() => setIsHidden((prev) => !prev)}
        >
            {isHidden ? "보기" : "숨김"}
        </Button>
      </Typography>

      {accountTypes.map((type) => {
        const filteredAccounts = accounts.filter(account => account.type === type);
        if (filteredAccounts.length === 0) return null;

        return (
          <Box key={type} sx={{ mb: 3 }}>
            <Accordion expanded={!!expanded[type]} onChange={() => handleToggle(type)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {type} 계좌 ({filteredAccounts.length}개)
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filteredAccounts.map((account, index) => (
                  <Card02 key={index} type={account.type} acno={account.number} balance={account.balance} />
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </>
  );
};

export default INQ001;
