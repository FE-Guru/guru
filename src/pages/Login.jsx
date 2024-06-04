import React from "react";

const Login = () => {
  return (
    <div className="login">
      <h2>로그인</h2>
      <div class="login-container">
        <div class="input-item">
          <label for="email">이메일</label>
          <input type="text" id="email" />
        </div>
        <div class="input-item">
          <label for="password">비밀번호</label>
          <input type="password" id="password" />
        </div>
        <button class="login-btn">로그인</button>
        <div class="btn-group">
          <span class="find-id-pw">아이디/비밀번호 찾기</span>
          <span class="sign-up">회원가입</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
