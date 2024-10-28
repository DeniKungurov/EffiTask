import React from "react";
import { Input, Button } from "antd";

const SignIn = ({setIsAuth}) => {
    const registration = () => {
        setIsAuth(false)
      };
  return (
          <>
            <h2>Авторизация</h2>
            <div className="form-group">
              <label htmlFor="login">Почта:</label>
              <Input placeholder="Login" id="login" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <Input placeholder="Password" type="password" id="password" />
            </div>
            <Button type="primary" className="registration-button" onClick={()=>{registration()}}>
              Регистрация
            </Button>
            <Button type="primary" className="submit-button">
              Войти
            </Button>
          </>
  );
};

export default SignIn;
