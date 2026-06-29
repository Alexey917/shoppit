import { Button, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './LoginForm.module.css';

export const LoginForm = () => {
  return (
    <form className={classes.form}>
      <legend className={classes.legend}>С возвращением</legend>
      <span className={classes.please}>Пожалуйста войдите в аккаунт</span>
      <fieldset className={classes.inputGroup}>
        <label className={classes.label} htmlFor="">
          Имя
        </label>
        <Input className={classes.input} placeholder="Введите свое имя" />
      </fieldset>
      <fieldset className={classes.inputGroup}>
        <label className={classes.label} htmlFor="">
          Пароль
        </label>
        <Input className={classes.input} placeholder="Введите пароль" />
      </fieldset>
      <Button color="primary" variant="solid" className={classes.btn}>
        Войти
      </Button>
      <Link to="#" className={classes.forget}>
        Забыли пароль?
      </Link>
      <span className={classes.noHave}>
        Нет аккаунта?{' '}
        <Link to="#" className={classes.reg}>
          Зарегистрироваться
        </Link>
      </span>
    </form>
  );
};
