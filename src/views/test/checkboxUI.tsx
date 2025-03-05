import React from 'react';
import IndeterminateCheckbox from '../../components/checkbox';

interface CheckboxItem {
  label: string;
  checked: boolean;
}

export default function CheckboxUI() {
  const [items, setItems] = React.useState<CheckboxItem[]>([
    { label: 'Child 1', checked: true },
    { label: 'Child 2', checked: false },
    { label: 'Child 3', checked: false },
  ]);

  const handleChange = (newItems: CheckboxItem[]) => {
    setItems(newItems);
    console.log('Selected items:', newItems);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>체크박스 예시</h2>
      <IndeterminateCheckbox
        items={items}
        onChange={handleChange}
      />
    </div>
  );
} 