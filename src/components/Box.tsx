/**
 * @fileoverview 박스 UI
 *
 * 사용 예시:
 * import { MainBox } from "@src/components/Box";
 */
import { ReactNode } from "react";
import { Box as MuiBox, Box, Typography, Button } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const MainBox = ({ children }: {children ?: ReactNode}) => {
  return <Box sx={{ textAlign: "center" }}>{children}</Box>;
};


interface BoxProps {
  children?: React.ReactNode;
  padding?: string;
  maxWidth?: string;
}

export const Box01 = ({ children, padding = "16px", maxWidth = "600px" }: BoxProps) => {
  return (
    <MuiBox sx={{ maxWidth, mx: "auto", p: padding }}>
      {children}
    </MuiBox>
  );
};

/**
 * 박스 속성2
 */
interface Box02Props {
  title: string;          // 제목
  description: string;    // 설명
  buttonText: string;     // 버튼 텍스트
  onButtonClick: () => void;
}

/**
 * 박스 컴포넌트2
 */
export const Box02 = ({ title, description, buttonText, onButtonClick }: Box02Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F9F7FF",
        borderRadius: "12px",
        textAlign: "center",
        py: 3,
        px: 2,
        mt: 2,
      }}
    >
      {/* 아이콘 */}
      <Box>
        <AccountBalanceWalletIcon sx={{ fontSize: 50, color: "#6A0DAD" }} />
      </Box>

      {/* 제목 */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
        {title}
      </Typography>

      {/* 설명 */}
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
        {description}
      </Typography>

      {/* 버튼 */}
      <Button
        variant="text"
        sx={{
          mt: 1,
          fontWeight: "bold",
          color: "#6A0DAD",
          textDecoration: "underline",
          cursor: "pointer",
          outline: "none",
          "&:focus": { outline: "none", backgroundColor: "transparent" },
          "&:focus-visible": { outline: "none", backgroundColor: "transparent" },
          "&:active": { outline: "none", backgroundColor: "transparent" },
          "&:hover": { backgroundColor: "transparent" },
        }}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

interface ListItem {
  key: string;
  label: ReactNode;
  onClick?: () => void;
}

interface BoxListProps {
  items: ListItem[];
  selectedKey?: string;
  filterPrefix?: string;
}

export function BoxList({ items, selectedKey, filterPrefix = "" }: BoxListProps) {
  return (
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
      {items
        .filter((item) => item.key.startsWith(filterPrefix)) // 특정 접두사로 필터링 가능
        .map((item) => (
          <Box
            key={item.key}
            component="li"
            sx={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: item.onClick ? "pointer" : "default",
              backgroundColor: selectedKey === item.key ? "#f0f0f0" : "transparent",
              "&:hover": item.onClick ? { backgroundColor: "#e0e0e0" } : {},
            }}
            onClick={item.onClick}
          >
            {item.label}
          </Box>
        ))}
    </Box>
  );
};

export default { MainBox, Box01, Box02, BoxList };
