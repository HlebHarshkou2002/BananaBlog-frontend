import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from "react-hook-form";


import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid } //Хук useForm вернет нам formState и из него мы вытащим объект 
  } = useForm({
    defaultValues: {
      fullName: "Глеб Горшков",
      email: "erichkrause2017@tut.by",
      password: "654321"
    },
    mode: 'onChange' //Валидация будет происходить только если поля поменялись
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегестрироваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      {/* не забыть обернуть в форму */}
      <form onSubmit={handleSubmit(onSubmit)}> 
        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message} //Вытаскиваем сообщение об ошибке ?.message означает проверку на то, есть ли email
          type="text"
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field} label="Полное имя" fullWidth
        />

        <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message} //Вытаскиваем сообщение об ошибке ?.message означает проверку на то, есть ли email
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field} label="E-Mail" fullWidth
        />

        <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message} //Вытаскиваем сообщение об ошибке ?.message означает проверку на то, есть ли email
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field} label="Пароль" fullWidth
        />

        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
