import { Link, Navigate } from "react-router-dom";
import { url } from "../store/ref";
import { useState } from "react";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassWord] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ emailID, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.emailID) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to='/' />;
  }
  return (
    <main className='login'>
      <h2>로그인</h2>
      <form className='loginCon' onSubmit={login}>
        <label htmlFor='email'>
          이메일
          <input
            type='email'
            id='email'
            value={emailID}
            onChange={(e) => {
              setEmailID(e.target.value);
            }}
          />
        </label>
        <label htmlFor='password'>
          비밀번호
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => {
              setPassWord(e.target.value);
            }}
          />
        </label>
        <button type='submit' className='loginBtn'>
          로그인
        </button>
      </form>
      <p>
        <Link to='/findAccount'>아이디/비밀번호 찾기</Link>
        <Link to='/signup'>회원가입</Link>
      </p>
    </main>
  );
};

export default Login;
