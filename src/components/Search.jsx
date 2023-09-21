import React from 'react';
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';

const InputContainer = styled.label`
  background-color: var(--colors-ui-base);
  padding: 1rem 2rem 1rem;
  display: flex;
  align-items: center;
  color: var(--colors-text);

  border-radius: var(--radii);
  box-shadow: var(--shadow);
  width: 100%;
  margin-bottom: 1rem;

  @media(min-width: 767px) {
    margin-bottom: 0rem;
    width: 280px;
  }
`;

const Input = styled.input.attrs({
  type: 'search',
  placeholder: "Search for a..."
})`
  margin-left: 1rem;
  border: none;
  outline: none;
  background-color: var(--colors-ui-base);
  color: var(--color-text);

  &:hover {
    border: 1px solid #08d3ee;
  }
`;

export const Search = ({ searchValue, setSearchValue }) => {
  

  return (
    <InputContainer>
      <SearchIcon/>
      <Input 
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        
      />
    </InputContainer>
  )
}