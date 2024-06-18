import { useState } from "react";
import { useSelector } from "react-redux";
import { url } from "../store/ref";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";

const PersonalEdit = () => {
  const [formData, setFormData] = useState({
    password: "",
    nickName: "",
    phone: "",
    account: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const editSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/mypage/personalEdit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("회원 정보가 성공적으로 수정되었습니다.");
      } else {
        // 오류 처리
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const user = useSelector((state) => state.user.user);
  const emailID = user ? user.emailID : null;
  const userName = user ? user.nickName : null;

  return (
    <div className='contents'>
      <h3>회원정보 수정</h3>
      <div className='full'>
        <form
          className={` ${form.formStyle} ${mem.editForm}`}
          onSubmit={editSubmit}
        >
          <div className={form.formContainer}>
            <div className={`${form.formGrup} `}>
              <span>이메일(아이디)</span>
              <span>{emailID}</span>
            </div>
            <div className={form.formGrup}>
              <span>이름</span>
              <span>{userName}</span>
            </div>
            <div className={`${form.formGrup} `}>
              <span>비밀번호</span>
              <div className={form.formCon}>
                <input
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={`${form.formGrup} `}>
              <span>비밀번호 확인</span>
              <div className={form.formCon}>
                <input
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={form.formGrup}>
              <span>닉네임</span>
              <input
                type='text'
                value={formData.nickName}
                onChange={handleChange}
              ></input>
            </div>
            <div className={`${form.formGrup} ${mem.phoneGrup}`}>
              <span>연락처</span>
              <div className={mem.phoneInner}>
                <div className={mem.phoneAuth}>
                  <input type='text' value={formData.phone} maxLength='11' />
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
                value={formData.account}
                onChange={handleChange}
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
    </div>
  );
};

export default PersonalEdit;
