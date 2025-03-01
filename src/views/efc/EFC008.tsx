import { Box, Typography, Divider } from "@mui/material";
import {LimitDisplay} from "@src/components/Display";
import {LimitInput} from "@src/components/Input";
import {TextList} from "@src/components/TextList";

const EFC008 = () => {
  return (
        <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "center", p: 3 }}>
        
          {/* 페이지 메인 제목 */}
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>이체한도관리</Typography>{/* mb: 아래 box와 간격 조정, mt: 위 Header와 간격 조정 */}

          {/* 현재 이체 한도 정보 */}
          <Box sx={{ border: "1px solid black", borderRadius: "12px", padding: "25px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>{/* box 안의 요소들끼리의 위아래 간격(flexDirection: "column") 3씩 */}
                  <LimitDisplay label="1회 이체한도" value={500000} />
                  <LimitDisplay label="1일 이체한도" value={1000000} />
              </Box>
          </Box>

          {/* 변경 이체 한도 입력 */}
          <Box sx={{ textAlign: "start" }}>
              <Typography variant="h6" sx={{ mb: 1, mt: 3, fontWeight: "bold" }}>변경이체한도</Typography>
              <LimitInput label="1회 이체한도" placeholder="1회이체한도입력" />
              <LimitInput label="1일 이체한도" placeholder="1일이체한도입력" />
          </Box>

          {/* 보안매체에 따른 최대 이체한도 */}
          <TextList 
              title="보안매체에 따른 최대 이체한도"
              items={[
              "OTP - 1일 5억원, 1회 1억원",
              "보안카드/mOTP - 1일 5천만원, 1회 1천만원",
              "보안카드/mOTP+SMS - 1일 2억5천만원, 1회 5천만원"
              ]}
              pb={1}
          />

          {/* 구분선 */}
          <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 3 }} />{/* my: 구분선을 기준으로 위아래 간격 3씩 */}

          {/* 알아두세요 */}
          <TextList 
              title="알아두세요"
              items={[
              "비대면한도 계좌 또는 금융거래한도제한계좌 등 계좌별 제한이 있는 경우 이체한도가 제한돼요",
              "인터넷뱅킹과 텔레뱅킹 서비스도 함께 적용돼요"
              ]}
              pb={15}
          />
        </Box>
  );
};

export default EFC008;
