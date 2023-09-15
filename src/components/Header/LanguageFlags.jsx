import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cookies from 'js-cookie'


import LanguageIcon from '@mui/icons-material/Language';

import "./Header.module.scss";

import { useTranslation } from "react-i18next";
import i18next from 'i18next'
import classNames from 'classnames'


export default function LanguageFlags() {

    const languages = [
        {
            code: 'ru',
            country_code: 'ru',
            name: 'Русский',
        },
        {
            code: 'en',
            country_code: 'gb',
            name: 'English',
        },
        {
            code: 'de',
            country_code: 'de',
            name: 'Deutsch',
        },
        
        
    ]

    const { t } = useTranslation();

    const currentLanguageCode = cookies.get('i18next') || 'en'

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


return (
<div className='flags'>
<Tooltip title={t('language')} arrow>
  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
    <LanguageIcon style={{width:'32px', height:'32px'}}/>
  </IconButton>
</Tooltip>
<Menu 
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  onClick={handleClose}
  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
  disableScrollLock={false}
>
  {languages.map(({ code, country_code, name}) => (
    <Tooltip title={name} arrow placement='left'>
    <MenuItem key={code} style={{
      backgroundColor: currentLanguageCode === code ? '#D8D8D8' : '#F8F8F8',      
      border: currentLanguageCode === code ? '1px solid #989898' : '#F8F8F8'             
    }}>
    <IconButton 
      className={classNames('dropdown-item')}
      onClick={() => {
      i18next.changeLanguage(code)  
    }}                            
    >
      
    <div className={`flag-icon flag-icon-${country_code}`}
    style={{
      opacity: currentLanguageCode === code ? 1 : 0.3,
      width: '3rem',                             
      height: '2rem', 
                                    
    }}
    >
    </div>
    
    </IconButton>  
    </MenuItem>    
    </Tooltip>                                   
  ))}
  
</Menu>

</div>
)
}