import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';
import { GLog, doAction,makeForm, addFormData } from '@assets/js/common';
import DataSet from "@assets/io/DataSet";

const COM001 = ({ onClose }: { onClose: (data?: DataSet) => void }) => {
  const [telCdData, settelCdData] = useState<{ CD: string; CD_NM: string }[]>([]);  /** 통신사코드리스트 */
  const [selectedCarrier, setSelectedCarrier] = useState("");                       /** 선택한통신사코드 */
  const [mblCtfcNo, setmblCtfcNo] = useState("");                                   /** 인증번호*/
  const [showVerificationInput, setShowVerificationInput] = useState(false);        /** 인증번호입력필드 상태값 */
  const [isVerified, setIsVerified] = useState(false);                              /** 인증번호받기 상태값 */
  
  // 1. 초기 상태 정의
  const initialFormData = {
    custNm: "",
    telNo: "",
    rsrNo: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
      fetchTest();
    
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 입력 필드의 name과 value 가져오기
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // 해당 name에 해당하는 값 업데이트
        }));
    };

    const mblCtfcNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmblCtfcNo(event.target.value);
    }

  // 입력값 초기화 함수
  const resetForm = () => {
    setmblCtfcNo("");
    setSelectedCarrier("");
    setFormData(initialFormData);
    setShowVerificationInput(false);
    setIsVerified(false);
  };

  // 닫기 버튼 클릭 시 입력값 초기화 후 팝업 닫기
  const handleClose = () => {
    resetForm(); // 입력값 초기화
  };
    
  const fetchTest = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'CD_DMN_ID','TEL_CD');

    //로딩 ON
    progressBar(true, "통신중");

    //통신
    const test01 = await doAction(form);

    //로딩 OFF
    progressBar(false);
    
    const list = (test01.data.getList('list') as { CD: string; CD_NM: string }[]) ?? [];

    settelCdData(test01.data.getList('list'));
   
  };
  
  // 인증번호받기 이벤트 
  const userAuth = async () => { 

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','A01');
    addFormData(form,'CUSTNM', formData.custNm);
    addFormData(form,'TELNO', formData.telNo);
    addFormData(form,'RSR_RG_NO', formData.rsrNo);
    addFormData(form,'TELCD', selectedCarrier);

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
        setIsVerified(true);
        // setmblCtfcNo(test01.data.MBL_CTFC_NO);
        setShowVerificationInput(true); // 인증번호 입력 필드 표시
    })
    
    )
    

  };

  // 인증번호 확인 이벤트 TODO 인증번호체크인터페이스 필요
  const userConfirmAuth = async () => {
    console.log("인증 확인!");

    //폼생성,데이터 주입
    const form = makeForm('COM0001SC');
    addFormData(form,'txGbnCd','A02');
    addFormData(form,'MBL_CTFC_NO', mblCtfcNo);
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
        () => { resetForm(); // 입력값 초기화 
        }
    )
    return;
    }

    //정상
    messageView(
    '정상처리 되었습니다.',
    '확인',
    (() => {
        resetForm(); // 입력값 초기화
        onClose();
    })
    )
    
  };

  return (
    
      <Box
        sx={{
           
        }}
      >
       
          <Box mt={3}>
            <Typography variant="body1"><strong>본인인증을 진행해주세요.</strong></Typography>
          </Box>

     
          <Box mt={3}>
            <Typography variant="body2">이름</Typography>
            <TextField 
              fullWidth
              id="custNm"
              name="custNm"
              placeholder="이름 입력"
              variant="outlined"
              required
              value={formData.custNm}
              onChange={handleChange}
            />
          </Box>
          <Box mt={3}>
            <Typography variant="body2">주민등록번호</Typography>
            <TextField 
              fullWidth
              id="rsrNo"
              name="rsrNo"
              placeholder="주민등록번호 입력"
              variant="outlined"
              required
              value={formData.rsrNo} // 상태 값 바인딩
              onChange={handleChange} // 입력값 변경 감지
            />
          </Box>


          <Box mt={3}>
            <Typography variant="body2">통신사</Typography>
            <Select
                fullWidth
                value={selectedCarrier}
                onChange={(e) => setSelectedCarrier(e.target.value)}
                displayEmpty
            >
                <MenuItem value="" disabled>통신사를 선택하세요</MenuItem>
                {telCdData.map((carrier) => (
                <MenuItem key={carrier.CD} value={carrier.CD}>
                    {carrier.CD_NM}
                </MenuItem>
                ))}
            </Select>
          </Box>

          <Box mt={3}>
            <Typography variant="body2">휴대폰번호</Typography>
            <TextField 
              fullWidth
              id="telNo"
              name="telNo"
              placeholder="휴대폰번호 입력"
              variant="outlined"
              required
              value={formData.telNo} // 상태 값 바인딩
              onChange={handleChange} // 입력값 변경 감지
            />
          </Box>
          {showVerificationInput && (       
            <Box mt={3}>
                <Typography variant="body2">인증번호</Typography>
                <TextField 
                fullWidth
                id="telConNo"
                name="telConNo"
                placeholder="인증번호 입력"
                variant="outlined"
                required
                value={mblCtfcNo ?? ""} // 상태 값 바인딩
                onChange={mblCtfcNoChange} // 입력값 변경 감지
                />
            </Box>
            )}
          <Box mt="auto" display="flex" justifyContent="space-between"  sx={{ mt: 2 }}>
            <Button variant="contained" color="primary"   onClick={isVerified ? userConfirmAuth : userAuth} >
                {isVerified ? "인증확인" : "인증번호받기"} {/* 상태에 따라 버튼 변경 */}
            </Button>
         
          </Box>
      </Box>
 
  );
};

export default COM001;