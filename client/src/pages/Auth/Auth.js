import React, { useState } from "react";
import "./Auth.css";
import SignIn from "./components/SignIn";
import Registration from "./components/Registration";

const Auth = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="app">
      <form className="auth-form">
        {isAuth && 
         <SignIn setIsAuth={setIsAuth}/>
        }
        {!isAuth &&
        <Registration setIsAuth={setIsAuth}/>}
      </form>
    </div>
  );
};

export default Auth;
