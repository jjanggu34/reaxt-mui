import { Box, Container } from '@mui/material';
import Header from '@views/common/Header';
import Footer from '@views/common/Footer';
import { Outlet } from 'react-router-dom';
import {headerHeight,bottomNavHeight} from "@assets/js/common"

const Layout = () => {
  return (
    <Box component="article" className="wrap">
      {/* 고정 헤더 */}
      <Box component="section" className="headerWrap">
        <Header />
      </Box>


      <Box component="section" className="contentWrap">
        <Box component="main">
          <Container>
          <Outlet />
        </Container>
        </Box>
      </Box>

      <Box component="section" className="btmWrap">
        <Footer />
      </Box>

    </Box>
  );
};

export default Layout;
