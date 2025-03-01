import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const EFC002 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleInputChange = (e) => {
    const value = e.target.value;
    // 숫자만 입력 가능, 4자리 초과는 잘라냄
    if (/^\d*$/.test(value)) {
      setPassword(value.slice(0, 4));
    }
  };
  

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <p className="mb-4 text-lg">변경할 비밀번호를 입력해주세요.</p>
      <TextField
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={password}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default EFC002;
