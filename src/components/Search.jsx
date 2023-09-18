
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';

const InputContainer = styled.label`
  background-color: var(--colors-ui-base);
  padding: 1rem 2rem 1rem;
  display: flex;
  align-items: center;
  color: var(--colors-text)

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
  placeholder: 'Search for a...'

})`
  margin-left: 2rem;
  border: none;
  outline: none;
  background-color: var(--colors-ui-base);
  color: var(--color-text);
`;

export const Search = ({ search, setSearch }) => {
  return (
    <InputContainer>
      <SearchIcon/>
      <Input onChange={(e) => setSearch(e.target.value)} value={search}/>
    </InputContainer>
  )
}