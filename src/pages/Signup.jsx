import { Link } from "react-router-dom";
import { useState } from "react";
import { url } from "../store/ref";

const Signup = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassWord] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ emailID, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response---", response);
    if (response.status === 200) {
      window.location.href = "/login";
    } else {
      alert("이미 존재하는 회원정보입니다");
    }
  };

  return (
    <main className='signup mw'>
      <h2>회원가입</h2>
      <form className='signupCon' onSubmit={signup}>
        {/*회원가입 먼저 테스트하게 약관동의 쪽은 일단 주석처리
         <h3>약관동의</h3>
        <label htmlFor='all'>
          <input type='checkbox' id='all'  />
          모든 약관을 확인하고 전체동의에 체크합니다.
        </label>
        <label htmlFor='service'>
          <input type='checkbox' id='service' required />
          서비스이용약관에 동의합니다.
          <span>(필수)</span>
          <span>[전문보기]</span>
        </label>
        <label htmlFor='privacy'>
          <input type='checkbox' id='privacy' required />
          개인정보취급방침에 동의합니다.
          <span>(필수)</span>
          <span>[전문보기]</span>
        </label> 
        <label htmlFor='marketing'>
          <input
            type='checkbox'
            id='marketing'
          />
          마케팅 활용에 동의합니다.
          <span>(선택)</span>
          <span>[전문보기]</span>
        </label>
        */}
        <label>
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
        <p>이메일 양식에 맞춰 작성해주세요</p>
        <label>
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
        <p>영문,숫자,특수문자 조합 8자리 이상 작성해주세요.</p>
        <label>
          비밀번호 확인
          <input
            type='password'
            id='pwConfirm'
            value={pwConfirm}
            onChange={(e) => {
              setPwConfirm(e.target.value);
            }}
          />
        </label>
        <p>비밀번호와 입력한 값이 다릅니다.</p>
        <label>
          이름
          <input type='text' id='name' />
        </label>
        <label>
          닉네임
          <input type='text' id='nickname' />
        </label>
        <label>
          연락처
          <input type='text' id='phone' />
          <button className='certiBtn'>인증하기</button>
        </label>
        <label>
          <input type='text' id='certiNum' />
          <button className='confirmBtn'>확인</button>
        </label>
        <label>
          계좌번호
          <input type='text' id='account' />
        </label>
        <div className='submitBtn'>
          <button type='button' className='cancelBtn'>
            취소
          </button>
          <button type='submit' className='loginBtn'>
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
