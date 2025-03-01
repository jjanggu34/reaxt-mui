import { Box, Container } from '@mui/material';
import Header from '@views/common/Header';
import Footer from '@views/common/Footer';
import { Outlet } from 'react-router-dom';
import {headerHeight,bottomNavHeight} from "@assets/js/common"

const Layout = () => {
  return (
    <Box>
      {/* 고정 헤더 */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, height: headerHeight }}>
        <Header />
      </Box>


      {/* 메인 콘텐츠 영역 - 헤더와 바텀 네비게이션을 피해 배치 */}
      <Box
        component="main"
        sx={{
          position: 'fixed',
          top: headerHeight,
          bottom: bottomNavHeight,
          left: 0,
          right: 0,
          m: 1,
          overflow: 'auto',
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>

      
      {/* 고정 바텀 네비게이션 */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: bottomNavHeight }}>
        <Footer />
      </Box>

    </Box>
  );
};

export default Layout;
