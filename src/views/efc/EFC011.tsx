/**
 * @fileoverview [전자금융관리] 
 *
 * @author 
 * @version 1.0.0
 */
import { GLog } from "@src/assets/js/common";
import { MainBox } from "@src/components/Box";

const EFC011 = () => {

  const test = '1234';
  GLog.d('로그는 이거쓰세요 : '+test);

  return (
    <MainBox>
      <h1>타이틀~</h1>
      <p>개발중</p>
    </MainBox>
  );
};

export default EFC011;