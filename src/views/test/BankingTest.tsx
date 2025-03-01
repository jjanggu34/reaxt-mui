/**
 * @fileoverview [테스트] 업무테스트
 *
 * @author 
 * @version 1.0.0
 */
import { useLocation, useNavigate } from "react-router-dom";
import { GLog, useAppNavigator } from '@assets/js/common';
import { TextBox01 } from "@src/components/Text";
import { Button01 } from "@src/components/Button";
import { openFullPopup, openBottomPopup } from "@src/components/Popup";
import { MainBox } from "@src/components/Box";
import DataSet from '@src/assets/io/DataSet';

import COM001 from "@src/views/com/COM001";
import COM002 from "@src/views/com/COM002";
import COM003 from "@src/views/com/COM003";
import COM004_1 from "@src/views/com/COM004_1";
import COM005 from "@src/views/com/COM005";
import COM006 from "@src/views/com/COM006";
import COM007 from "@src/views/com/COM007";
import COM008 from "@src/views/com/COM008";
import COM009 from "@src/views/com/COM009";
import COM010 from "@src/views/com/COM010";
import COM011 from "@src/views/com/COM011";
import COM012 from "@src/views/com/COM012";


/**
 * 메뉴별 버튼 목록 정의
 */
const menuItems: Record<string, { text: string; path: string }[]> = {
  com: [
    { text: "휴대폰본인인증", path: "COM001" },
    { text: "약관화면", path: "COM002" },
    { text: "타행본인계좌인증(이기종)", path: "COM003" },
    { text: "타행본인계좌인증(중앙회)", path: "COM004_1" },
    { text: "계좌리스트", path: "COM005" },
    { text: "은행리스트", path: "COM006" },
    { text: "주소검색", path: "COM007" },
    { text: "OCR인증", path: "COM008" },
    { text: "직종선택", path: "COM009" },
    { text: "CDD/EDD", path: "COM010" },
    { text: "보안카드", path: "COM011" },
    { text: "OTP인증", path: "COM012" },
  ],
  inq: [
    { text: "전계좌조회", path: "/inq/INQ001.view" },
    { text: "거래내역조회", path: "/inq/INQ002.view" }
  ],
  tnf: [
    { text: "이체", path: "/tnf/TNF001.view" },
    { text: "이체결과조회", path: "/tnf/TNF002.view" },
    { text: "자동이체", path: "/tnf/TNF003.view" },
    { text: "자동이체관리", path: "/tnf/TNF004.view" },
    { text: "자동이체결과조회", path: "/tnf/TNF005.view" }
  ],
  dep: [
    { text: "상품안내/신청", path: "/dep/DEP001.view" },
    { text: "입출금계좌신청", path: "/dep/DEP002.view" },
    { text: "예적금해지", path: "/dep/DEP003.view" },
    { text: "예적금해지예상조회", path: "/dep/DEP004.view" },
    { text: "만기자동재예치/만기해지송금", path: "/dep/DEP005.view" },
    { text: "적금납입일변경", path: "/dep/DEP006.view" },
  ],
  lon: [
    { text: "상품안내/신청", path: "/lon/LON001.view" },
    { text: "간편한도조회", path: "/lon/LON002.view" },
    { text: "전자약정", path: "/lon/LON003.view" },
    { text: "신용조회동의", path: "/lon/LON004.view" },
    { text: "온라인서류제출", path: "/lon/LON005.view" },
    { text: "대출상환신청", path: "/lon/LON006.view" },
    { text: "대출연장신청", path: "/lon/LON007.view" },
    { text: "대출철회신청", path: "/lon/LON008.view" },
    { text: "대출진행상태조회", path: "/lon/LON009.view" }
  ],
  efc: [
    { text: "고객정보변경", path: "/efc/EFC001.view" },
    { text: "계좌비밀번호변경", path: "/efc/EFC002.view" },
    { text: "계좌비밀번호오류해제", path: "/efc/EFC003.view" },
    { text: "자주쓰는계좌관리", path: "/efc/EFC004.view" },
    { text: "지연이체관리", path: "/efc/EFC005.view" },
    { text: "출금지정계좌관리", path: "/efc/EFC006.view" },
    { text: "입금지정계좌관리", path: "/efc/EFC007.view" },
    { text: "이체한도관리", path: "/efc/EFC008.view" },
    { text: "한도제한해제", path: "/efc/EFC009.view" },
    { text: "해지계좌조회", path: "/efc/EFC010.view" },
    { text: "거래중지좌", path: "/efc/EFC011.view" },
    { text: "비과세종합저축한도", path: "/efc/EFC012.view" },
    { text: "비과세종합저축증빙자료제출", path: "/efc/EFC013.view" },
    { text: "전자금융가입", path: "/efc/EFC014.view" }
  ]
};

/**
 * 일반 테스트 화면 드로잉
 */
const BankingTest = () => {
  const location = useLocation();
  const navigate = useAppNavigator();

  const queryParams = new URLSearchParams(location.search);
  const txGbnCd = queryParams.get("txGbnCd") || "com"; // 기본값: "com"

  GLog.d("전체 URL:" + window.location);

  // txGbnCd에 해당하는 버튼 목록 가져오기
  const buttons = menuItems[txGbnCd] || [];

  return (
     <MainBox>

      <TextBox01 text="업무 테스트"/>

      {/* 버튼 컨테이너 */}
      

      {buttons.map((item, index) => {
        // "휴대폰본인인증" 버튼이면 handleOpenAuth, 아니면 기본 doActionURL 사용
        return (
          <Button01
            key={index}
            btnName={item.text}
            fontSize="15px"
            width="43%"
            clickFunc={() => {
              // "com" 그룹의 경우 팝업 호출
              if (txGbnCd === 'com') {
                switch (item.path) {
                  case 'COM001':
                    openFullPopup({
                      component: COM001,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                    case 'COM002':
                      openFullPopup({
                          component: ({ param, onClose }) => (
                              <COM002 
                                  title={item.text}
                                  buttonText="다음 버튼"
                                  stplatClsCd="O049001"
                                  nFunc={() => onClose(param)} // onClose 호출 방식 수정
                              />
                          ),
                          param: new DataSet(), // 적절한 DataSet 객체 전달
                          nFunc: (data?) => {
                              if (data) {
                                  GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                              } else {
                                  GLog.d('팝업 취소 닫힘');
                              }
                          }
                      });
                      break;
                  case 'COM003':
                    openFullPopup({
                      component: COM003,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM004_1':
                    openFullPopup({
                      component: COM004_1,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM005':
                    openBottomPopup({
                      component: COM005,
                      title: item.text,
                      param: new DataSet({'ACCO_KNCD':'1'}),
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM006':
                    openBottomPopup({
                      component: COM006,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM007':
                    openFullPopup({
                      component: COM007,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM008':
                    openFullPopup({
                      component: COM008,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM009':
                    openFullPopup({
                      component: COM009,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM010':
                    openFullPopup({
                      component: COM010,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM011':
                    openFullPopup({
                      component: COM011,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  case 'COM012':
                    openFullPopup({
                      component: COM012,
                      title: item.text,
                      nFunc: (data?) => {
                        if (data) {
                          GLog.d('팝업 성공 닫힘' + JSON.stringify(data));
                        } else {
                          GLog.d('팝업 취소 닫힘');
                        }
                      }
                    });
                    break;
                  default:
                    GLog.d('알 수 없는 컴포넌트: ' + item.path);
                    break;
                }
              } else {
                // 그 외는 일반 페이지 이동
                navigate.doActionURL(item.path);
              }
            }}

          />
        );
      })}
    </MainBox>

  );
};

export default BankingTest;
