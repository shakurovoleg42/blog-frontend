import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";
import LanguageFlags from './LanguageFlags';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from '../Search';

const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  cursor: pointer;
  ${'' /* font_weight: var(var(--fw-bold)); */}
  text-transform: capitalize
`;

export const Header = ({ searchValue, setSearchValue }) => {
  const { t } = useTranslation();

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.success(t('header.logout_notify'), {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  };

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme]);

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
      <div className={styles.inner}>
  <Link className={styles.logo} to="/">
    <div>Reviews blog</div>
  </Link>
  <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
  <ModeSwitcher onClick={toggleTheme} style={{marginTop: '5px'}}>
    {theme === 'light' ? (
      <Brightness4Icon sx={{ fontSize: 30 }} />
    ) : (
      <Brightness7Icon sx={{ fontSize: 30 }} />
    )}
  </ModeSwitcher>
          <LanguageFlags sx={{ml: '2rem'}}/>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">{t("header.create_review")}</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  {t('header.logout')}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">{t('header.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">{t('header.register')}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
      <ToastContainer/>
    </div>
  );
};
