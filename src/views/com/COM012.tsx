/**
 * @fileoverview [공통] OTP 입력 화면
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";

const COM012 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      <h1>타이틀~</h1>
      <p>개발중</p>
    </MainBox>
  );
};

export default COM012;
