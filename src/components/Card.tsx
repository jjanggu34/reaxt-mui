/**
 * @fileoverview 카드 UI
 *
 * 사용 예시:
 * import { Card01, Card02 } from "@src/components/Card";
 */
import { Card as MuiCard, Card, CardHeader, CardContent, Box, Typography, IconButton, Divider, ListItemButton, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Button01, Button02, Button03 } from "@src/components/Button";
import CompareArrowsIcon from "@mui/icons-material/CardGiftcard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

/**
 * 카드 기본 속성
 */
interface CardProps {
  children: React.ReactNode;
  padding?: string;         // 내부 여백
  borderRadius?: string;    // 테두리 둥글기
  elevation?: number;       // 그림자 (0~24까지)
  width?: string;           // 카드 너비
  height?: string;          // 카드 높이
}

/**
 * 카드 컴포넌트 (기본)
 */
export const Card01 = ({
  children,
  padding = "5px",
  borderRadius = "20px",
  elevation = 5,
  width = "95%",
  height = "auto",
}: CardProps) => {
  return (
    <Card
      elevation={elevation}
      sx={{
        mb: 2,
        p: padding,
        borderRadius: borderRadius,
        width: width,
        height: height,
      }}
    >
      {children}
    </Card>
  );
};

/**
 * 카드 기본 속성
 */
interface Card04Props {
    children: React.ReactNode;
    title: string;         // 제목
  }

/**
 * 카드 컴포넌트 (제목이 있는 기본 카드)
 */
export const Card04 = ({ title, children }: Card04Props) => {
    return (
      <MuiCard sx={{ p: 2, borderRadius: "12px", mb: 2 }}>
        {title && (
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {title}
          </Typography>
        )}
        <Box>{children}</Box>
      </MuiCard>
    );
  };

/**
 * 계좌 카드 속성
 */
interface Card02Props {
  type: string;
  acno: string;
  balance: number;
}

/**
 * 카드 컴포넌트 (계좌 전용)
 */
export const Card02 = ({ type, acno, balance }: Card02Props) => {
  return (
    <Card
      elevation={5}
      sx={{
        mb: 2,
        p: 2,
        borderRadius: "12px",
        width: "95%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {type} 계좌
        </Typography>
      </Box>

      {/* 계좌번호 및 복사 아이콘 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" color="textSecondary">
          {acno}
          <IconButton onClick={() => navigator.clipboard.writeText(acno)} sx={{ p: 1 }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Typography>

        {/* 계좌 잔액 */}
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "right" }}>
          {balance.toLocaleString()} 원
        </Typography>
      </Box>

      {/* 구분선 */}
      <Divider sx={{ borderColor: "lightgray", borderBottomWidth: 1, my: 1 }} />

      {/* 버튼 영역 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "center" }}>
        {type === "대출" ? (
          <ListItemButton
            sx={{
              justifyContent: "center",
              width: "100px",
              bgcolor: "transparent",
              color: "black",
              borderRadius: 2,
              "&:hover": { bgcolor: "grey.400" },
            }}
          >
            상환
          </ListItemButton>
        ) : (
          <>
            <ListItemButton
              sx={{
                justifyContent: "center",
                width: "100px",
                bgcolor: "transparent",
                color: "black",
                borderRadius: 2,
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              거래내역
            </ListItemButton>

            <Divider orientation="vertical" flexItem sx={{ height: "35px", borderColor: "lightgray" }} />

            <ListItemButton
              sx={{
                justifyContent: "center",
                width: "100px",
                bgcolor: "transparent",
                color: "black",
                borderRadius: 2,
                "&:hover": { bgcolor: "grey.400" },
              }}
            >
              이체
            </ListItemButton>
          </>
        )}
      </Box>
    </Card>
  );
};


/**
 * 상품 카드 속성
 */
interface Card03Props {
  pdcd: string;             // 상품코드
  pdnm: string;             // 상품명
  categoty: string;         // 카테고리
  pdDesc: string;           // 상품설명
  keyword: string[];        // 키워드
  contents1: string;        // 내용1
  contents2: string;        // 내용2
}

/**
 * 스타일 지정 (아이콘 클릭 시 테두리 제거)
 */
const StyledIconButton = styled(IconButton)({
  outline: "none",
  "&:focus": {
    outline: "none",
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&.active": {
    color: "Salmon",
  },
});

/**
 * 상품 카드 컴포넌트
 */
export const Card03 = ({
  pdcd,
  pdnm,
  categoty,
  pdDesc,
  keyword,
  contents1,
  contents2
}: Card03Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 관심상품 클릭 핸들러
  const handleGiftClick = () => {
    setIsFavorite(!isFavorite);
    setSnackbarMessage(
      isFavorite ? "관심상품에서 제거되었습니다." : "관심상품으로 등록했어요."
    );
    setSnackbarOpen(true);
  };

  // 비교상품 클릭 핸들러
  const handleCompareClick = () => {
    setIsCompared(!isCompared);
    setSnackbarMessage(
      isCompared ? "비교상품에서 제거되었습니다." : "비교상품으로 등록했어요."
    );
    setSnackbarOpen(true);
  };

  // 알림 닫기
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ mt:2, mb: 2, borderRadius: "20px"}}>
        {/* 카드 헤더 - 상품 설명 + 아이콘 */}
        <CardHeader
          sx={{ pb: 0 }}
          title={
            <Typography variant="body2">
              {pdDesc}
            </Typography>
          }
          action={
            <Box>
              {/* 비교상품 아이콘 */}
              <StyledIconButton
                onClick={handleCompareClick}
                disableRipple
                className={isCompared ? "active" : ""}
              >
                <CompareArrowsIcon />
              </StyledIconButton>

              {/* 관심상품 아이콘 */}
              <StyledIconButton
                onClick={handleGiftClick}
                disableRipple
                className={isFavorite ? "active" : ""}
              >
                <FavoriteIcon />
              </StyledIconButton>
            </Box>
          }
        />

        {/* 카드 본문 */}
        <CardContent sx={{ pt: 1 }}>
          {/* 상품명 + 카테고리 (첫 줄) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                border: "2px solid Salmon",
                color: "Salmon !important",
                px: 1,
                py: 0.3,
                borderRadius: "20px",
                fontWeight: "bold",
              }}
            >
              {categoty}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {pdnm}
            </Typography>
          </Box>

          {/* 키워드 */}
          <Typography variant="body2" sx={{ mt: 1.5 }}>
            {keyword.join(" | ")}
          </Typography>

          {/* 내용1 */}
          <Typography variant="subtitle2" sx={{ mt: 1.5, fontWeight: "bold" }}>
            {contents1}
          </Typography>

          {/* 내용2 */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {contents2}
          </Typography>
        </CardContent>
      </Card>

      {/* 알림창 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};



  /**
 * 예적금상품 카드 컴포넌트
 */
  interface Card05Props {
    pdcd: string;               // 상품코드
    pdnm: string;               // 상품명
    cmmProdCategoty: string;    // 카테고리
    pdDesc: string;             // 상품설명
    keyword: string[];          // 키워드
    depdate: string;            // 예적금기간
    intr: string;               // 금리
    pd_dvcd: string;            // 상품종류(단리,복리)
    pd_kncd: string;            // 상품카테고리리
  }

export const Card05 = ({
  pdcd,
  pdnm,
  cmmProdCategoty,
  pdDesc,
  keyword,
  depdate,       //예적금 기간 
  intr,           //금리
  pd_dvcd,
  pd_kncd
}: Card05Props) => {

  return (
      <Card01 padding="2px" elevation={3}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {pdDesc}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Box
                sx={{
                  color: "#612AD0",
                  border: "2px solid #612AD0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  px: 1,
                  py: 0.3,
                  borderRadius: "20px",
                }}
              >
                {pd_kncd}
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {pdnm}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {keyword.join(" | ")}
            </Typography>

            <Typography variant="subtitle2" color="secondary" sx={{ fontWeight: 700, mt: 2 }}>
              {depdate}개월
            </Typography>

            <Typography variant="h6" color="rgb(97, 42, 208)" sx={{ fontWeight: "bold"}}>
              연 {intr}% {pd_dvcd}
            </Typography>
          </CardContent>

      </Card01>
    );
  };

  interface Card06props {
    type: string;
    acno: string;
    balance: number;
    pdnm: string;
  }

  export const Card06 = ({ type, pdnm, acno, balance }: Card06props) => {
    return (
      <Card
        elevation={5}
        sx={{
          mb: 2,
          p: 2,
          borderRadius: "12px",
          width: "95%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {type} {pdnm}
          </Typography>
        </Box>
  
        {/* 계좌번호 및 복사 아이콘 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body1" color="textSecondary">
            {acno}
            <IconButton onClick={() => navigator.clipboard.writeText(acno)} sx={{ p: 1 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* 계좌 잔액 */}
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "right" }}>
            잔액 {balance.toLocaleString()} 원
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* 계좌 잔액 */}
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "right" }}>
            출금가능금액 {balance.toLocaleString()} 원
          </Typography>
        </Box>
        {/* 버튼 영역 */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, alignItems: "center" }}>
          <Button01
            btnName="이체"
            clickFunc={async () => { //TODO 이체페이지 doactionurl 달아야함
              // 이체 로직
            }}
          />
        </Box>
      </Card>
    );
  };

export default { Card01, Card02, Card03, Card04, Card05, Card06 };
