/**
 * @fileoverview [공통] 계좌리스트팝업
 *
 * @author 
 * @version 1.0.0
 */
import React, { useState, useEffect } from "react";
import DataSet from "@assets/io/DataSet";
import { GLog } from "@src/assets/js/common";
import { BoxList } from "@src/components/Box";
import { doAction, makeForm, addFormData } from '@assets/js/common';
import { progressBar } from "@src/components/Loading";
import { messageView } from '@src/components/Alert';

const COM005 = ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => {

  const [acnoList, setAcnoList] = useState<{ ACNO: string; PROD_NM: string }[]>([]); // 전체계좌리스트
  const [selectedAcno, setSelectedAcno] = useState<string>("");          

  const searchAcnoList = async () => {
      
      const form = makeForm("COM0005SC");
      addFormData(form, "txGbnCd", "S01");
      addFormData(form, "ACCO_KNCD", param.getString('ACCO_KNCD')); // 계좌종류 1:요구성, 2:적금, 3:정기예금, 4:대출, 9:전체
  
      progressBar(true);
  
      try {
        const response = await doAction(form);
        progressBar(false);
  
        if (response.header.respCd !== "N00000") {
          GLog.e("계좌 조회 실패:", response.header.respMsg);
          messageView(`통신 실패 : ${response.header.respMsg}`, "확인", () => GLog.d("확인 클릭"));
          return;
        }
  
        const resData = new DataSet(response.data);
  
        // 계좌리스트 가져오기
        const accountList = resData.getList<{ ACNO: string; PROD_NM: string }>("OUT_REC");
        setAcnoList(accountList);

        GLog.d("계좌 조회 :"+ resData.getList('OUT_REC'));
  
      } catch (error) {
        GLog.e("전계좌 조회 중 오류 발생:", error);
        messageView("전계좌 조회 중 오류가 발생했습니다.", "확인");
        progressBar(false);
      }
    };

    useEffect(() => {
      searchAcnoList();
      }, []);


    const handleAcnoSelect = (acno: string) => {
        const selectedData = new DataSet({acno});
        setSelectedAcno(acno);
       // onClose(selectedData); // 팝업 닫고 데이터 전달
    
    };


  return (

      <BoxList
          items={acnoList.map((acno) => ({
            key: acno.ACNO,
            label: acno.PROD_NM+' : ' + acno.ACNO,
            onClick: () => handleAcnoSelect(acno.ACNO),
          }))}
          selectedKey={selectedAcno}
      />
  
  );
};

export default COM005;
