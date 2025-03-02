import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "@views/common/Menu"
import { bottomNavHeight, useAppNavigator } from "@assets/js/common"

const BottomNav = () => {
  const navigate = useAppNavigator();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Paper>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="홈"
          onClick={() => {
            navigate.doActionURL('/');
          }}
          icon={<HomeIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="대출"
          onClick={() => {
            navigate.doActionURL('/');
          }}
          icon={<AttachMoneyIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="예/적금"
          onClick={() => {
            navigate.doActionURL('/');
          }}
          icon={<SavingsIcon />}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <BottomNavigationAction
          label="전체메뉴"
          icon={<MenuIcon />}
          onClick={() => setMenuOpen(true)} // 여기서 바로 메뉴 열기
          sx={{
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "SCDream", fontWeight: 800, fontSize: "12px", mt: 0.5
            }
          }}
        />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </BottomNavigation>
    </Paper>
  );
};
export default BottomNav;