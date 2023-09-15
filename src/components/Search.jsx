import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const Search = (props) => {
    const { onChange, value } = props;
    const { t } = useTranslation();
  
    return (
      <TextField
        label={t('search')}
        type='search'
        variant='outlined'
        fullWidth
        value={value}
        onChange={onChange}
        sx={{ mb: "2rem", backgroundColor: "white" }}
      />
    );
  };

export default Search;