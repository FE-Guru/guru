import { useState } from "react";
import Modal from "../components/Modal";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";

const FindAcct = () => {
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("findId");

  const closePopup = () => {
    setModal(null);
  };

  const switchTab = (tab) => {
    setTab(tab);
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
            <form className={`${mem.form}`}>
              <div className={`full ${mem.findForm}`}>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='text'
                    placeholder=' '
                  />
                  <label htmlFor='userName' className={mem.placeholder}>
                    이름
                  </label>
                </div>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='text'
                    placeholder=' '
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
            <form className={`${mem.form}`}>
              <div className={`full ${mem.findForm}`}>
                <div className={`${mem.loginLabel} ${mem.findLabel}`}>
                  <input
                    className={`${mem.memInput} ${form.row}`}
                    type='email'
                    placeholder=' '
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
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "idfindfail" && (
          <div className='alert'>
            <h3>GURU</h3>
            <p>아이디나 비밀번호를 다시 확인해주세요.</p>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default FindAcct;
