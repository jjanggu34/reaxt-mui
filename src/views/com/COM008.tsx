/**
 * @fileoverview [공통] OCR 화면
 *
 * @author 
 * @version 1.0.0
 */

import { useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

import { Box, Button } from "@mui/material";
import { progressBar } from "@src/components/Loading";
import { GLog } from "@assets/js/common";

const COM008 = () => {
  const webcamRef = useRef<Webcam>(null);

  // progressBar(true);

  // useEffect(() => {
  //   progressBar(false);
  // }, []); // []을 넣어야 최초 렌더링 후 한 번만 실행됨

  setTimeout(() => {  
  }, 1000); // 1초 후에 로딩 종료

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // 캡처된 이미지 데이터 URL
      GLog.d('이미지 '+ imageSrc); // 여기서 저장하거나 업로드 가능
    }
  }, [webcamRef]);


  return (
    <Box
      sx={{
        width: "100%", // 부모 박스 크기 지정
        height: "400px", // 고정 높이 설정
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // 넘치는 부분 숨기기
      }}
    >
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        style={{
          width: "100%", // 부모 크기에 맞춤
          height: "100%", // 부모 크기에 맞춤
          borderRadius: "10px", // 모서리 둥글게
          objectFit: "cover", // 화면 꽉 차게 조정 (비율 유지)
        }}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment", // 후면 카메라 사용
        }}
      />
      <Button variant="contained" onClick={capture} sx={{ mt: 2 }}>
        사진 찍기
      </Button>
    </Box>
  );
};

export default COM008;
