import React from "react";
import { Input, Button } from "antd";

const Registration = ({setIsAuth}) => {
    const registration = () => {
        setIsAuth(true)
      };
  return (
          <>
            <h2>Авторизация</h2>
            <div className="form-group">
              <label htmlFor="login">Почта:</label>
              <Input placeholder="Login" id="login" />
            </div>
            <div className="form-group">
              <label htmlFor="login">Логин:</label>
              <Input placeholder="Login" id="login" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <Input placeholder="Password" type="password" id="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Повторите пароль:</label>
              <Input placeholder="Password" type="password" id="password" />
            </div>

            <Button type="primary" className="registration-button" onClick={()=>{registration()}}>
              Войти
            </Button>
            <Button type="primary" className="submit-button">
              Зарегистрироваться
            </Button>
          </>
  );
};

export default Registration;
