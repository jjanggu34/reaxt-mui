/**
 * @fileoverview Display UI
 *
 * 사용 예시:
 * import { LimitDisplay } from "@src/components/Display";
 */
import { Box, Typography, TextField } from "@mui/material";


interface LimitDisplayProps {
  label: string;
  value: number;
}


// ✅이체 한도 표시 컴포넌트
export const LimitDisplay = ({ 
    label
  , value }: LimitDisplayProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid lightgray", pb:"1px", width: "100%" }}>
      <Typography>{label}</Typography>
      <TextField
        variant="standard"
        type="number"
        value={value}
        sx={{ flexGrow: 1, width: "150px", textAlign: "right" }}
        inputProps={{ style: { textAlign: "right", fontWeight: "bold" } }}
        InputProps={{ disableUnderline: true, readOnly: true }}
      />
    </Box>
  );
};
