import React, { useState } from "react";
import { url } from "../store/ref";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import accountDel from "../assets/accountDelete";

const AcctDelete = () => {
  const [modalAlert, setModalAlert] = useState(null);

  const closeAlert = () => {
    setModalAlert(null);
  };

  const cancelBtn = () => {
    window.location.href = "/mypage/personaledit";
  };

  const acctDelBtn = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch(`${url}/mypage/acctdelete`, {
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
      setModalAlert("notoken");
    }
  };

  return (
    <div className='contents'>
      <h3>회원탈퇴</h3>
      <div className='full'>
        <form className={` ${form.formStyle} ${mem.editForm}`}>
          <div className={form.formContainer}>
            <div className={`${form.formGrup} `}>
              <pre className={mem.delDesc}>{accountDel}</pre>
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
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type='alert'>
          {modalAlert === "notoken" && (
            <ModalAlert
              close={closeAlert}
              desc={"로그인이 필요합니다."}
              error={true}
              confirm={false}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default AcctDelete;
