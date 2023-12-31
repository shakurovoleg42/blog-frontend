import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./Login.module.scss";

export const Login = () => {
  const { t } = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  
  const notify = () => toast();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return toast.error(t('Login.error'), {
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
        {t('Login.sign_up')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: t('Login.enter_email') })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label={t('Login.label_p')}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: t('Login.enter_pass') })}
          fullWidth
        />
        <Button onClick={notify} disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          {t('Login.login')}
        </Button>
        <ToastContainer/>
      </form>
    </Paper>
  );
};