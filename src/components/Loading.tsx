/**
 * @fileoverview 로딩 UI
 *
 * 사용 예시:
 * import { progressBar } from "@assets/ui/loading";
 */
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import React from "react";

/**
 * 로딩 on/off
 * @param isLoading 로딩 여부 (true: 표시, false: 제거)
 * @param loadingText 로딩 중에 표시할 텍스트 (옵션)
 */
export function progressBar(isLoading: boolean, msg?: string) {
  const formId = "gProgressBar";
  document.getRoot(formId).render(
    React.createElement(() => {
      //팝업 컴포넌트 생성
      return (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 어둡게
          }}
          open={isLoading}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress color="inherit" />
            {msg && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                {msg}
              </Typography>
            )}
          </div>
        </Backdrop>
      );
    })
  );
}
export default { progressBar };
