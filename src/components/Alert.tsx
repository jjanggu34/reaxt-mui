
/**
 * @fileoverview 알림창 UI
 *
 * 사용 예시:
 * import { alert } from "@assets/ui/alert";
 */
import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

let root: Root | null = null;

/**
 * messageView 함수
 *
 * @param message - 표시할 메시지
 * @param nBtn - 필수 버튼명 (예: "확인")
 * @param nFunc - 필수 버튼 클릭 시 실행할 콜백
 * @param fBtn - 선택 버튼명 (예: "취소")
 * @param fFunc - 선택 버튼 클릭 시 실행할 콜백
 */
export function messageView(
  message: string,
  nBtn?: string,
  nFunc?: () => void,
  fBtn?: string,
  fFunc?: () => void
) {

  nBtn = nBtn ?? "확인";
  nFunc = nFunc ?? (() => {});

  const formId = 'g-message-view';

  // 전역 컨테이너가 없으면 생성
  let container = document.getElementById(formId);
  if (!container) {
    container = document.createElement('Box');
    container.id = formId;
    document.body.appendChild(container);
  }

  root = createRoot(container);

  const MessageModal = () => {
    const [open, setOpen] = useState(true);

    // 닫힘 처리
    const handleClose = () => {
      setOpen(false);
    };

    // 모달이 닫히면 언마운트
    useEffect(() => {
      if (!open) {
        setTimeout(() => {
          root?.unmount();
          root = null;
          container?.remove();
        }, 0);
      }
    }, [open]);

    // 확인 버튼 클릭
    const handleConfirm = () => {
      nFunc?.()
      handleClose();
    };

    // 취소 버튼 클릭
    const handleCancel = () => {
      if (fFunc) fFunc();
      handleClose();
    };

    return (
      <Modal open={open} className="popup-container modal">
        <Box className="pop-body">
          <Typography component="p">
            {message}
          </Typography>

      
          {/* 버튼 영역 */}
          <Box className="popup-footer gap10">
            {!fBtn ? (
              // fBtn이 없으면 단일 버튼만 표시
                <Button  className="btn btn-primary" variant="contained" onClick={handleConfirm}>
                  {nBtn}
                </Button>
            ) : (
              // fBtn, fFunc가 있으면 2개 버튼 (확인/취소)
              <>
                <Button className="btn btn-secondary" variant="outlined" onClick={handleCancel}>
                  {fBtn}
                </Button>
                <Button className="btn btn-primary" variant="contained" onClick={handleConfirm}>
                  {nBtn}
                </Button>
              </>
            )}
           </Box>
        </Box>
      </Modal>
    );
  };

  root.render(<MessageModal />);
}