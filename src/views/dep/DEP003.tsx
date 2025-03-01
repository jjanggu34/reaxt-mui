/**
 * @fileoverview [수신] 
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";

const DEP003 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      <h1>타이틀~</h1>
      <p>개발중</p>
    </MainBox>
  );
};

export default DEP003;