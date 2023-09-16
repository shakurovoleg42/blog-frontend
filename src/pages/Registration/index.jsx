import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Login.module.scss';

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const { t } = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const notify = () => toast();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return toast.error(t('registration.error'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        {t('registration.create_account')}
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: t('registration.fullname') })}
          className={styles.field}
          label={t('registration.label_fullname')}
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: t('registration.email') })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: t('registration.password') })}
          className={styles.field}
          label={t('registration.label_password')}
          fullWidth
        />
        <Button onClick={notify} disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          {t('registration.sign_in')}
        </Button>
        <ToastContainer/>
      </form>
    </Paper>
  );
};