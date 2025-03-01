import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionProps {
  title: string;
  checked: boolean;
  contents: string | React.ReactNode; 
  onChange: () => void;
}

export const Accordion01 = ({ title, checked, contents, onChange }: AccordionProps) => {
  return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Checkbox checked={checked} onChange={onChange} />
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{contents}</Typography>
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion01;


