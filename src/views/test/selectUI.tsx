import React, { useState } from 'react';
import styled from '@emotion/styled';
import SelectPopup from '@src/components/SelectPopup';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 15px;
  color: #666;
`;

const SelectUI = () => {
  const [basicValue, setBasicValue] = useState('');
  const [disabledValue, setDisabledValue] = useState('');
  const [customWidthValue, setCustomWidthValue] = useState('');

  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  return (
    <Container>
      <h1>Select 컴포넌트 사용 예시</h1>
      
      <Section>
        <Title>기본 Select</Title>
        <Description>기본적인 Select 컴포넌트 사용 예시입니다.</Description>
        <SelectPopup
          options={options}
          value={basicValue}
          onChange={(value) => setBasicValue(value.toString())}
          placeholder="옵션을 선택하세요"
        />
      </Section>

      <Section>
        <Title>비활성화된 Select</Title>
        <Description>disabled 속성이 적용된 Select 컴포넌트입니다.</Description>
        <SelectPopup
          options={options}
          value={disabledValue}
          onChange={(value) => setDisabledValue(value.toString())}
          placeholder="비활성화된 Select"
          disabled
        />
      </Section>

      <Section>
        <Title>커스텀 너비 Select</Title>
        <Description>width 속성으로 너비를 조절할 수 있습니다.</Description>
        <SelectPopup
          options={options}
          value={customWidthValue}
          onChange={(value) => setCustomWidthValue(value.toString())}
          placeholder="너비 800px Select"
          width="800px"
        />
      </Section>
    </Container>
  );
};

export default SelectUI; 