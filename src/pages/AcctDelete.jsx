import React, { useState } from "react";
import { url } from "../store/ref";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";
import Modal from "../components/Modal";

const AcctDelete = () => {
  const [modal, setModal] = useState(null);

  const closePopup = () => {
    setModal(null);
  };

  const cancelBtn = () => {
    window.location.href = "/mypage/personalEdit";
  };

  const acctDelBtn = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch(`${url}/mypage/acctDelete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/acctbye";
      }
    } else {
      setModal("notoken");
    }
  };

  return (
    <div className='contents'>
      <h3>회원탈퇴</h3>
      <div className='full'>
        <form className={` ${form.formStyle} ${mem.editForm}`}>
          <div className={form.formContainer}>
            <div className={`${form.formGrup} `}>
              <pre className={mem.delDesc}>
                회원탈퇴 신청 전 안내 사항을 확인해주세요. <br /> 회원탈퇴를
                신청하시면 현재 로그인 된 아이디는 사용하실 수 없습니다.
                <br />
                회원탈퇴를 하더라도, 서비스 약관 및 개인정보 취급방침 동의하에
                따라 일정 기간동안 회원 개인정보를 보관합니다. <br />- 회원 정보{" "}
                <br />- 상품 구입 및 대금 결제에 관한 기록 <br />- 상품 배송에
                관한 기록 <br />- 소비자 불만 또는 처리 과정에 관한 기록 <br />-
                게시판 작성 및 사용문의에 관한 기록 <br />
                <p>
                  ※ 상세한 내용은 사이트 내 개인정보 취급방침을 참고해주세요.
                </p>
              </pre>
            </div>
          </div>
        </form>
      </div>
      <div className={`${mem.btnWrap} btnWrap`}>
        <button type='button' className='btn tertiary' onClick={cancelBtn}>
          취소
        </button>
        <button
          type='submit'
          className='btn primary yellow'
          onClick={acctDelBtn}
        >
          회원탈퇴
        </button>
      </div>
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "notoken" && (
          <div className='alert'>
            <h3>GURU</h3>
            <p>로그인이 필요합니다.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AcctDelete;
