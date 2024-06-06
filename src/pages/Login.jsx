import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className='login'>
      <h2>로그인</h2>
      <form className='loginCon'>
        <label htmlFor='email'>
          이메일
          <input type='email' id='email' />
        </label>
        <label htmlFor='password'>
          비밀번호
          <input type='password' id='password' />
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
