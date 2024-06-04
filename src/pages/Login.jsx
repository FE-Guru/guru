import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="login">
      <h2>로그인</h2>
      <secion>
        <div className="formGrup">
          <label for="email">이메일</label>
          <input type="email" id="email" />
        </div>
        <div className="formGrup">
          <label for="password">비밀번호</label>
          <input type="password" id="password" />
        </div>
        <button className="">로그인</button>
        <div>
          <Link to="/">아이디/비밀번호 찾기</Link>
          <Link to="/">회원가입</Link>
        </div>
      </secion>
    </main>
  );
};

export default Login;
