/**
 * @fileoverview [공통] 주소검색팝업
 *
 * @author 
 * @version 1.0.0
 */
import { useState, useEffect } from "react";
import { GLog, doAction, makeForm, addFormData } from "@src/assets/js/common";
import { progressBar } from "@src/components/Loading";
import { TextBox } from "@src/components/Input";
import { Button01 } from "@src/components/Button";
import { Box01, BoxList } from "@src/components/Box";
import { messageView } from '@src/components/Alert';
import DataSet from "@assets/io/DataSet";

const COM007 = (props: { onClose: (data?: DataSet) => void }) => {

  const [inputAddr, setInputAddr] = useState("");   // 검색어
  const [flag, setFlag] = useState("");             // 주소조회검증플래그 1:조회, 2:검증
  const [addrList, setAddrList] = useState<{ ZPCD: string; ZPCD_ADDR: string }[]>([]);
  const [selectedAddr, setSelectedAddr] = useState<string | null>(null); 
  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  // 입력값 초기화 함수
  const resetForm = () => {
    setInputAddr("");
    setFlag("");
    setAddrList([]);
  };

  // 주소검색이벤트
  const searchAddr = async () => { 

    if(inputAddr.trim() === '') {
      messageView("주소를 입력해 주세요", "확인");
      return;
    }

    setFlag('1');

    //폼생성,데이터 주입
    const form = makeForm('COM0007SC');
    addFormData(form,'txGbnCd','S01');
    addFormData(form,'INPT_ADDR',inputAddr);
    addFormData(form,'FLAG',flag);

    //로딩 ON
    progressBar(true, "통신중");

    try {

      //통신
      const resDs = await doAction(form);

      //로딩 OFF
      progressBar(false);

      if(resDs.header.respCd != 'N00000'){
        messageView(resDs.header.respMsg, "확인", () => resetForm());
        return;
      }else {
        const resData = new DataSet(resDs);
        if(resData.getString('resData').split(',')[0] === 'ECB12262'){
          
          messageView("입력하신 주소로 200건 이상의 주소가 검색돼요.", "확인", () => resetForm());
          return;
        }else {
          const list = (resDs.data.getList<{ ZPCD: string; ZPCD_ADDR: string }>("REC") ?? []).flat();
          setAddrList(list);
        }
      }
      

    } catch(error){
      progressBar(false);
      GLog.e("주소 검색 중 오류 발생:", error);
      messageView("주소 검색 중 오류가 발생했습니다.", "확인", () => resetForm());
               
    }
   
  };

  const handleAddrSelect = (addr: { ZPCD: string; ZPCD_ADDR: string }) =>  {
  
      console.log("선택한 주소:", addr);
      setSelectedAddr(addr.ZPCD); 
  
      const selectedData = new DataSet({ addr});
      props.onClose(selectedData); // 팝업 닫고 데이터 전달
      resetForm();
  
    };

  return (
    <Box01>

    {/* 검색 입력 필드 */}
    <TextBox label="주소검색" value={inputAddr} onChange={(e) => setInputAddr(e.target.value)} />
    <Button01 btnName="검색" clickFunc={searchAddr}></Button01>
    
    <BoxList
      items = {addrList.map((addr, index) => {
        const roadAddr = addr.ZPCD_ADDR.split("\n")[0].replace("[도로명주소] ", ""); // 도로명 주소
        const jibunAddr = addr.ZPCD_ADDR.split("\n")[1]?.replace("[지번주소] ", ""); // 지번 주소

        return {
          key: addr.ZPCD + index, // 우편번호를 key 값으로 설정
          label: (<div className="result-box">
            <span className="zipcode">{addr.ZPCD}</span>
            <div>
                <p>도로명 : {roadAddr}</p>
                <p className="">지&nbsp;&nbsp;&nbsp;&nbsp;번 : {jibunAddr}</p>
            </div>
          </div>),
          onClick: () => handleAddrSelect(addr), // 선택 이벤트 실행
        };
      })}
      selectedKey={selectedAddr ?? undefined} 
    />
   
    </Box01>
  );
};

export default COM007;