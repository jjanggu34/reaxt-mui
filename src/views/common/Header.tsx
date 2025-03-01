import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "@assets/images/logo.svg";

const Header = () => {
  return (
    <AppBar position="fixed" color="inherit" elevation={0} >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* 왼쪽 로고 */}
        <Box component="img" src={Logo} alt="Logo" sx={{ height: 20}} />

        {/* 오른쪽 로그인 + 돋보기 아이콘 */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* 로그인 버튼 (SCDream5 폰트 적용 & 패딩 축소) */}
          <Button
            color="inherit"
            sx={{
              fontFamily: "SCDream",
              fontWeight: 500, // SCDream5 적용
              fontSize: "14px",
              textTransform: "none",
            }}
          >
            로그인 &gt;
          </Button>

          {/* 돋보기 아이콘 (간격 조절) */}
          <IconButton edge="end" color="inherit" sx={{ fontSize: 28 }}>
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;