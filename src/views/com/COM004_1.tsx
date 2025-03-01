import React, { useState, useEffect } from "react";
import { Select } from "@mui/material";
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { NumberBox } from "@src/components/Input";
import { Button01 } from "@src/components/Button";
import { TextBox02 } from "@src/components/Text";
import { Box01 } from "@src/components/Box";
import { openBottomPopup,openFullPopup } from "@src/components/Popup";
import COM006 from "@src/views/com/COM006";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import COM004_2 from "./COM004_2";
import DataSet from "@assets/io/DataSet";

const COM004_1 = () => {
  const [inputAcno, setinputAcno] = useState('');
  const [selectedBankCd, setSelectedBankCd] = useState<string>("");
  const [selectedBankNm, setSelectedBankNm] = useState<string>("");
  const form = makeForm('COM0004SC');
  
  // 은행선택 콜백
  function selectBankCd(data?: DataSet) {
    if (!data || !("bankCode" in data)) {
      setSelectedBankCd(""); 
      setSelectedBankNm(""); 
      return;
    }else {
      setSelectedBankCd(data.bankCode as string);
      setSelectedBankNm(data.bankName as string);
    }
  };
    
  // 인증번호받기 이벤트 
  const fsbAcnoAuth = async () => { 

    //폼생성,데이터 주입
    
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'BKCD', selectedBankCd); // 은행코드
    addFormData(form,'ACNO', inputAcno);      // 계좌번호
    
    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const test01 = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    //결과실패
    if(test01.header.respCd != 'N00000'){
    GLog.e('에러발생 !!!');
    messageView(
        '통신 실패 : '+test01.header.respMsg,
        '확인',
        () => GLog.d('확인 클릭')
    )
    return;
    }

    //정상
    messageView(
    '통신완료 : '+JSON.stringify(test01.data),
    '확인',
    (() => {
        // TODO컨펌화면으로 이동

        const bkData = new DataSet();
        bkData.putString('BKCD',selectedBankCd);
        bkData.putString('ACNO',inputAcno);

        openFullPopup({
          component: COM004_2,
          title: '타행계좌본인인증확인',
          param:new DataSet(bkData),
          nFunc: (data?) => {
            if (data) {
              GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
            } else {
              GLog.d('팝업 취소 닫힘');
            }
          }
        });


    })
    
    )
    

  };

  return (
    
      <Box01>
           <TextBox02 text="타행 본인 계좌 인증으로 본인 확인을 진행해요"/>
         

            <TextBox02 text="입금은행"/>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">은행선택</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedBankCd}
                    // onChange={handleChange}
                    open={false}
                    renderValue={(selected) => {
                      // 아무것도 선택되지 않았다면 '은행선택' 표시
                      if (!selected) return "은행선택";
                      // 선택된 은행명이 있으면 그 이름을 표시
                      return selectedBankNm;
                    }}
                    onClick={() => {

                      openBottomPopup({
                        component: COM006,
                        title: "은행선택",
                        nFunc: (data?) => {
                          if (data) {
                            GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                            selectBankCd(data);
                          } else {
                            GLog.d('팝업 취소 닫힘');
                          }
                        }
                      });
                    
                    }}
                  ></Select>
              </FormControl>        

    
            <TextBox02 text="계좌번호"/>
            <NumberBox label="계좌번호입력" value={inputAcno} onChange={(e) => setinputAcno(e.target.value)} />
    

          <Button01 btnName = '계좌인증'clickFunc={fsbAcnoAuth}/>
          
      </Box01>
 
  );
};

export default COM004_1;