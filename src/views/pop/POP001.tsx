/**
 * @fileoverview [팝업] 샘플페이지
 *
 * @author 
 * @version 1.0.0
 */
import DataSet from "@src/assets/io/DataSet";
import { MainBox } from "@src/components/Box";
import { Button01 } from "@src/components/Button";

const POP001 = ({ param, onClose }: { param: DataSet; onClose: (data?: DataSet) => void }) => {
  const result = new DataSet({ result: "콜백 가자" });

  return (
    <MainBox>
      <h1>타이틀</h1>
      <p>이것은 설명입니다. : {param.getString("aa")}</p>
      <Button01 btnName="확인" clickFunc={() => onClose(result)} />
    </MainBox>
  );
};

export default POP001;
