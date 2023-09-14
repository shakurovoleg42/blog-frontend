import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const Search = (props) => {
    const { onChange, value } = props;
    const { t } = useTranslation();
    return <TextField
        label={t('search')}
        type='search' 
        variant='standard'
        fullWidth
        value={value} 
        onChange={onChange}
        sx={{
            mb:"2rem"
        }}
    />
};

export default Search;