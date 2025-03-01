import { Box } from "@mui/material";
import { messageView } from '@src/components/Alert';
import { TextBox01 } from "@src/components/Text";
import { Button01 } from "@src/components/Button";
import { progressBar } from "@src/components/Loading";
import { NativeUtil } from '@assets/js/common_native';
import DataSet from "@src/assets/io/DataSet";

const NativeTest = () => {
  return (
    <Box sx={{textAlign: 'center'}}>
      
      {/* 
        타이틀
      */}
      <TextBox01 text="네이티브 기능 테스트"/>


      {/* 
        네이티브 테스트 버튼 모음
      */}

      <Button01 
        btnName="앱 종료"
        clickFunc={async () => {
          NativeUtil.appClose();
        }}
      />

      <Button01 
        btnName="디바이스 정보 조회"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.getDeviceInfo();
          progressBar(false);
          messageView("디바이스 정보 조회 : " + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="내부 저장소 등록"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.setAppdata(new DataSet({'data':{"testKey" : "testValue22"}}));
          progressBar(false);
          messageView("내부 저장소 등록 : " + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="내부 저장소 조회"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.getAppdata(["testKey"]);
          progressBar(false);
          messageView("내부 저장소 조회: " + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="갤러리 이미지 조회"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.getGalleryImage();
          progressBar(false);
          messageView("갤러리 이미지: " + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="카메라 촬영 후 이미지 조회"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.getCameraImage();
          progressBar(false);
          messageView("카메라 이미지: " + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="파일 다운로드 (URL)"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.urlFileDownload("https://www.gnbsoftec.com/asset/css/img/dolphin1.png");
          progressBar(false);
          messageView("파일 다운로드 완료 (URL)" + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="파일 다운로드 (Base64)"
        clickFunc={async () => {
          progressBar(true);
          const callData = await NativeUtil.base64FileDownload("test.png","iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=");
          progressBar(false);
          messageView("파일 다운로드 완료 (Base64)" + JSON.stringify(callData));
        }}
      />

      <Button01 
        btnName="퍼미션 상태 체크"
        clickFunc={async () => {
          progressBar(true);
          const permission = await NativeUtil.permissionSelect();
          progressBar(false);
          messageView("퍼미션 상태: " + JSON.stringify(permission));
        }}
      />

      <Button01 
        btnName="퍼미션 체크"
        clickFunc={async () => {
          progressBar(true);
          const permission = await NativeUtil.permissionCheck();
          progressBar(false);
          messageView("퍼미션 체크 결과: " + JSON.stringify(permission));
        }}
      />

      <Button01 
        btnName="알림 메시지 출력"
        clickFunc={async () => {
          progressBar(true);
          await NativeUtil.showNotification("알림 제목", "이것은 알림 메시지입니다.");
          progressBar(false);
          messageView("알림 메시지 출력 완료");
        }}
      />

      <Button01 
        btnName="푸시 리스트 조회"
        clickFunc={async () => {
          progressBar(true);
          const pushList = await NativeUtil.pushList();
          progressBar(false);
          messageView("푸시 리스트: " + JSON.stringify(pushList));
        }}
      />

      <Button01 
        btnName="푸시 리스트 제거"
        clickFunc={async () => {
          progressBar(true);
          await NativeUtil.pushDelete();
          progressBar(false);
          messageView("푸시 리스트 제거 완료");
        }}
      />

      <Button01 
        btnName="푸시 그룹 변경"
        clickFunc={async () => {
          progressBar(true);
          await NativeUtil.pushTopicUpdate("newTopic");
          progressBar(false);
          messageView("푸시 그룹 변경 완료");
        }}
      />

      <Button01 
        btnName="캡처하기"
        clickFunc={async () => {
          progressBar(true);
          await NativeUtil.capture('1');
          progressBar(false);
          messageView("화면 캡처 완료");
        }}
      />


    </Box>
  );
};

export default NativeTest;
