import { Button, Input, Spin } from 'antd';
import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api/errorHandler';
import type { SyntheticEvent } from 'react';
import { ShoppitContext } from '@/components/Layout/Layout';

import classes from './LoginForm.module.css';

export const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(ShoppitContext);

  const user = { username, password };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await client.post('/token/', user);
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      context?.setIsAuth(true);
      const from = location?.state?.from?.pathname || '/';
      navigate(from);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <legend className={classes.legend}>Welcome Back</legend>
      <span className={classes.please}>Please login to your account</span>
      <fieldset className={classes.inputGroup}>
        <label className={classes.label} htmlFor="">
          Username
        </label>
        <Input
          className={classes.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </fieldset>
      <fieldset className={classes.inputGroup}>
        <label className={classes.label} htmlFor="">
          Password
        </label>
        <Input
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </fieldset>
      {error && <span>{error}</span>}
      {loading ? (
        <Spin />
      ) : (
        <Button
          htmlType="submit"
          color="primary"
          variant="solid"
          className={classes.btn}
        >
          Login
        </Button>
      )}
      <div className={classes.linkGroup}>
        <Link to="#" className={classes.forget}>
          Forgot Password?
        </Link>
        <span className={classes.noHave}>
          Don't have an account?&nbsp;
          <Link to="#" className={classes.reg}>
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
};
