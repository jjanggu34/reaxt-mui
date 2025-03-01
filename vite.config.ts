import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
    // host: 'nsl.yegaramsb.co.kr', 
    port: 3000, // 원하는 포트 설정 (기본값: 5173)
    strictPort: true, // 포트 고정 (사용 중이면 실행 실패)
    open: true, // 서버 실행 시 브라우저 자동 실행
  },
});