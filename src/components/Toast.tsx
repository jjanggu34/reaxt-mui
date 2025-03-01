
/**
 * @fileoverview 토스트 UI
 *
 * 사용 예시:
 * import { toast } from "@assets/ui/toast";
 */
import { createRoot, Root } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

let root: Root | null = null;

/**
 * 하단 토스트(Alert) 창을 띄웁니다.
 * @param message - 보여줄 텍스트
 * @param successCallback - 토스트 창이 닫힌 후 실행할 콜백 함수
 */
export function toast(message: string, successCallback: () => void) {
  const formId = 'g-Toast-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('div');
    container.id = formId;
    document.body.appendChild(container);
  }

  // 새로운 Root 생성
  if (!root) {
    root = createRoot(container);
  }

  // inline으로 토스트 컴포넌트 정의
  const ToastAlert = () => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000); // 3초 후에 자동 종료
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (!open) {
        // 현재 렌더링이 끝난 후에 unmount가 실행되도록 지연 처리
        setTimeout(() => {
          successCallback();
          if (root) {
            root.unmount();
            root = null;
          }
          if (container) {
            container.remove();
          }
        }, 0);
      }
    }, [open]);

    return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ bottom: 40 }} // 기본 위치에서 40px 위로 이동
      >
        <Alert
          severity="success"
          icon={false} // X 아이콘 제거
          sx={{
            fontFamily: "SCDream",
            fontWeight: 800,
            fontSize: "12px",
            backgroundColor: 'primary.main',
            color: '#fff',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  root.render(<ToastAlert />);
}
export default { toast };