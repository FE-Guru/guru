import { Link } from "react-router-dom";

const SignupOk = () => {
  return (
    <main className="login fullLayout">
      <h2>
        회원가입 완료
        <span> GURU 회원가입을 진심으로 환영합니다.</span>
      </h2>
      <section className="boxCon">
        <div className="textList">
          <p>
            <span>이메일</span>
            <strong>abc@abc.com</strong>
          </p>
          <p>
            <span>이름</span>
            <strong>홍길동</strong>
          </p>
          <p>
            <span>닉네임</span>
            <strong>자유로운 도비</strong>
          </p>
          <p>
            <span>연락처</span>
            <strong>010-1234-1234</strong>
          </p>
          <p>
            <span>계좌번호</span>
            <strong>국민 12345-12-1234567</strong>
          </p>
        </div>
      </section>

      <div className="btnWrap">
        <Link to="/login" className="btn primary yellow">
          로그인 하기
        </Link>
      </div>
    </main>
  );
};

export default SignupOk;
