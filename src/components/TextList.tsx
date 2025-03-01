/**
 * @fileoverview Text List UI
 *
 * 사용 예시:
 *  import { TextList } from "@src/components/TextList";
 *  <InfoList  
        title="보안매체에 따른 최대 이체한도"   // 제목
        items={[    // 내용
            "OTP - 1일 5억원, 1회 1억원",       
            "보안카드/mOTP - 1일 5천만원, 1회 1천만원",
            "보안카드/mOTP+SMS - 1일 2억5천만원, 1회 5천만원"
        ]}
    />
 * 
 */
import { Box, Typography, List, ListItem } from "@mui/material"; //Typography 타이포그래피 텍스트박스 생성 도구

interface InfoListProps {
  title: string;
  items: string[];
  pb?: number;
}

export const TextList = ({ title, items, pb=5 }: InfoListProps) => {
  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", textAlign: "start", pb}}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{title}</Typography>
      <List sx={{ listStyleType: "disc", pl: 2 }}>
        {items.map((item, index) => (
          <ListItem key={index} sx={{ display: "list-item", pl: 0 }}>
            <Typography variant="body2" color="textSecondary">{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
