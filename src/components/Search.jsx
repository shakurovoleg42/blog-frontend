import TextField from '@mui/material/TextField';

const Search = (props) => {
    const { onChange, value } = props;

    return <TextField
        label='Поиск'
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