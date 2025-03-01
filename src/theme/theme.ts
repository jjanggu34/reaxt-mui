import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          border: "none",
          background: "transparent",
          color: "inherit",
          fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif" !important',
          outline: "none",
          textDecoration: "none",
          transition: "all 0.2s ease-in-out",
        },
        body: {
          backgroundColor: "transparent",
          fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif" !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
          fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif" !important',
          color: "inherit",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", "sans-serif" !important', // ✅ 강제 적용
          padding: "8px 16px",
          minWidth: "auto",
          margin: "0px",
          borderRadius: "4px",
          boxShadow: "none !important",
            "&:hover":{
              boxShadow:"none",
            },
            "&:active": {
              boxShadow: "none",
            },
            "&:focus": {
              boxShadow: "none",
            },
          textTransform: "none",
          fontSize: "inherit",
          fontWeight: "inherit",
          background: "transparent",
          transition: "background 0.2s ease-in-out, transform 0.2s ease-in-out",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
