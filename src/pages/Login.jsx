import { Link, Navigate } from "react-router-dom";
import { url } from "../store/ref";
import { useState } from "react";
import mem from "../css/Memb.module.css";

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
    <main className='login fullLayout'>
      <h2>로그인</h2>
      <section className={`boxCon ${mem.boxCon}`}>
        <div className={mem.loginCon}>
          <form className={`${mem.form}`} onSubmit={login}>
            <div className='full'>
              <div className={`${mem.loginLabel} ${mem.emailLabel}`}>
                <input
                  className={`${mem.memInput}`}
                  type='email'
                  value={emailID}
                  placeholder=' '
                  onChange={(e) => {
                    setEmailID(e.target.value);
                  }}
                />
                <label htmlFor='email' className={mem.placeholder}>
                  이메일
                </label>
              </div>
              <div className={`${mem.loginLabel} ${mem.pwLabel}`}>
                <input
                  className={`${mem.memInput}`}
                  type='password'
                  value={password}
                  placeholder=' '
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                />
                <label htmlFor='password' className={mem.placeholder}>
                  비밀번호
                </label>
              </div>
            </div>
            <div className={mem.btnWrap}>
              <button
                type='submit'
                className={`btn primary yellow ${mem.innerBtn}`}
              >
                로그인
              </button>
            </div>
          </form>
          <p className={mem.links}>
            <Link to='/findAccount'>아이디/비밀번호 찾기</Link>
            <Link to='/signup'>회원가입</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
