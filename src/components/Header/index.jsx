import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from "../../redux/slices/auth";
import ScrollDialog from '../Rules';
import LanguageFlags from './LanguageFlags';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.success(t('header.logout_notify'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  };

  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Reviews blog</div>
          </Link>
          <LanguageFlags/>
          <ScrollDialog />
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
