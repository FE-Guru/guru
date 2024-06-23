import { useState } from "react";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";

const FindAcct = () => {
  const [modalAlert, setModalAlert] = useState(null);
  const [tab, setTab] = useState("findId");
  const [findEmail, setFindEmail] = useState("");

  const closeAlert = () => {
    setModalAlert(null);
  };

  const switchTab = (tab) => {
    setTab(tab);
  };
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const idFindSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/findacct/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          phone: formData.phone,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setFindEmail(data.emailID);
        setModalAlert("idfindsuccess");
      } else {
        setModalAlert("findfailed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fwFindSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/findacct/pw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailID: formData.emailID }),
      });
      if (response.ok) {
        const data = await response.json();

        setModalAlert("pwfindsuccess");
      } else {
        setModalAlert("findfailed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={`login fullLayout`}>
      <section className={`boxCon ${mem.boxCon} ${mem.findCon}`}>
        <div className={mem.loginCon}>
          <div className={mem.tab}>
            <button
              className={tab === "findId" ? mem.active : ""}
              onClick={() => switchTab("findId")}
            >
              아이디
            </button>
            <button
              className={tab === "findPw" ? mem.active : ""}
              onClick={() => switchTab("findPw")}
            >
              비밀번호
            </button>
          </div>
          {tab === "findId" && (
            <form className={`${mem.form}`} onSubmit={idFindSubmit}>
              <div className={`full ${mem.findForm}`}>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='text'
                    name='userName'
                    placeholder=' '
                    onChange={handleChange}
                  />
                  <label htmlFor='userName' className={mem.placeholder}>
                    이름
                  </label>
                </div>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='text'
                    name='phone'
                    placeholder=' '
                    onChange={handleChange}
                  />
                  <label htmlFor='phone' className={mem.placeholder}>
                    연락처
                  </label>
                </div>
              </div>
              <div className={`${mem.btnWrap} ${mem.findBtn}`}>
                <button
                  type='submit'
                  className={`btn primary yellow ${mem.innerBtn}`}
                >
                  아이디 찾기
                </button>
              </div>
            </form>
          )}
          {tab === "findPw" && (
            <form className={`${mem.form}`} onSubmit={fwFindSubmit}>
              <div className={`full ${mem.findForm}`}>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='email'
                    name='emailID'
                    placeholder=' '
                    onChange={handleChange}
                  />
                  <label htmlFor='emailID' className={mem.placeholder}>
                    이메일
                  </label>
                </div>
              </div>
              <div className={`${mem.btnWrap} ${mem.findBtn}`}>
                <button
                  type='submit'
                  className={`btn primary yellow ${mem.innerBtn}`}
                >
                  비밀번호 찾기
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type='alert'>
          {modalAlert === "idfindsuccess" && (
            <ModalAlert
              close={closeAlert}
              desc={`회원님의 아이디는 ${findEmail} 입니다.`}
              error={false}
              confirm={true}
            />
          )}
          {modalAlert === "pwfindsuccess" && (
            <ModalAlert
              close={closeAlert}
              desc={`회원님의 비밀번호가 이메일로 전송되었습니다.`}
              error={false}
              confirm={true}
            />
          )}
          {modalAlert === "findfailed" && (
            <ModalAlert
              close={closeAlert}
              desc={"입력하신 정보를 다시 확인해주세요."}
              error={true}
              confirm={false}
            />
          )}
        </Modal>
      )}
    </main>
  );
};

export default FindAcct;
