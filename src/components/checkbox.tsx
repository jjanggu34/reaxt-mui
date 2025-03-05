import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface CheckboxItem {
  label: string;
  checked: boolean;
}

interface IndeterminateCheckboxProps {
  items: CheckboxItem[];
  onChange: (items: CheckboxItem[]) => void;
}

export default function IndeterminateCheckbox({ items, onChange }: IndeterminateCheckboxProps) {
  const [checked, setChecked] = React.useState(items.map(item => item.checked));

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = Array(items.length).fill(event.target.checked);
    setChecked(newChecked);
    onChange(items.map((item, index) => ({ ...item, checked: newChecked[index] })));
  };

  const handleChangeChild = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
    onChange(items.map((item, i) => ({ ...item, checked: newChecked[i] })));
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {items.map((item, index) => (
        <FormControlLabel
          key={index}
          label={item.label}
          control={
            <Checkbox
              checked={checked[index]}
              onChange={handleChangeChild(index)}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked.every(Boolean)}
            indeterminate={checked.some(Boolean) && !checked.every(Boolean)}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}