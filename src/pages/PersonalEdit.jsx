import { useState } from "react";

import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";

const PersonalEdit = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassWord] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [userName, setuserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");

  return (
    <main className='findjob'>
      <div className='mw'>
        <h2>회원정보 수정</h2>
        <form className={` ${form.formStyle} signupForm`}>
          <div className={form.formContainer}>
            <div className={`${form.formGrup} `}>
              <span>이메일(아이디)</span>
              <div className={`${form.formCon} `} value={emailID}></div>
            </div>
            <div className={form.formGrup} value={userName}>
              <span>이름</span>
            </div>
            <div className={`${form.formGrup} `}>
              <span>비밀번호</span>
              <div className={form.formCon}>
                <input
                  type='password'
                  placeholder=' '
                  value={password}
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={`${form.formGrup} `}>
              <span>비밀번호 확인</span>
              <div className={form.formCon}>
                <input
                  type='password'
                  placeholder=' '
                  value={pwConfirm}
                  onChange={(e) => {
                    setPwConfirm(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={form.formGrup}>
              <span>닉네임</span>
              <input
                type='text'
                placeholder=' '
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                }}
              />
            </div>
            <div className={`${form.formGrup} ${mem.phoneGrup}`}>
              <span>연락처</span>
              <div className={mem.phoneInner}>
                <div className={mem.phoneAuth}>
                  <input
                    type='text'
                    placeholder=' '
                    value={phone}
                    maxLength='11'
                  />
                  <p className={mem.time}></p>
                  <button className={`btn primary green ${mem.greenBtn}`}>
                    연락처 변경
                  </button>
                </div>
              </div>
            </div>
            <div className={form.formGrup}>
              <span>계좌번호</span>
              <input
                type='text'
                placeholder=' '
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='accountDel'>
            <span>회원탈퇴</span>
          </div>
          <div className={`${mem.btnWrap} btnWrap`}>
            <button type='submit' className='btn primary yellow'>
              정보수정
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PersonalEdit;
