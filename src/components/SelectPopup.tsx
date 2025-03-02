import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Typography,
  Dialog,
  DialogContent,
  List,
  ListItem,
} from "@mui/material";

interface BaseSelectPopupProps {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (event: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectPopupWithFormProps extends BaseSelectPopupProps {
  withFormControl: true;
}

interface SelectPopupWithoutFormProps extends BaseSelectPopupProps {
  withFormControl: false;
}

type SelectPopupProps = SelectPopupWithFormProps | SelectPopupWithoutFormProps;

const SelectPopup = ({
  label,
  options,
  value,
  onChange,
  placeholder = "선택해주세요",
  disabled = false,
  withFormControl = true
}: SelectPopupProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({ target: { value: selectedValue } });
    }
    handleClose();
  };

  const SelectButton = (
    <Button
      onClick={handleOpen}
      disabled={disabled}
      sx={{
        width: "150px",
        height: "40px",
        justifyContent: "space-between",
        color: "inherit",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px 12px",
        textAlign: "left",
        '&:hover': {
          backgroundColor: "white",
          border: "1px solid #666",
        },
        '&:after': {
          content: '"▼"',
          fontSize: '12px',
          color: '#666'
        }
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          color: selectedOption ? 'inherit' : '#666',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </Typography>
    </Button>
  );

  return (
    <>
      {withFormControl ? (
        <FormControl className="form-group">
          <FormLabel>{label}</FormLabel>
          {SelectButton}
        </FormControl>
      ) : (
        SelectButton
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          '& .MuiDialog-paper': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            m: 0,
            borderRadius: '16px 16px 0 0',
            maxHeight: '70vh',
            width: '100vw',
            boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.15)'
          },
          '& .MuiDialog-container': {
            alignItems: 'flex-end'
          }
        }}
      >
        <DialogContent sx={{ p: 0, maxWidth: '100%' }}>
          <List sx={{ pt: 0, pb: 2 }}>
            {options.map((option) => (
              <ListItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                sx={{
                  py: 2,
                  px: 3,
                  textAlign: 'center',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: option.value === value ? '#1976d2' : 'inherit',
                  fontWeight: option.value === value ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  '&:active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectPopup; 