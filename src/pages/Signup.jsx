import { useState, useEffect } from "react";
import { userState } from "../store/userStore";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";
import service from "../assets/termsOfService";
import privacy from "../assets/privacyPolicy";
import marketing from "../assets/marketingConsent";
import style from "../css/Modal.module.css";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [modal, setModal] = useState(null);
  const [modalAlert, setModalAlert] = useState(null);

  const [allAgree, setAllAgree] = useState(false);
  const [svcAgree, setSvcAgree] = useState(false);
  const [priAgree, setPriAgree] = useState(false);
  const [mktAgree, setMktAgree] = useState(false);

  const [emailID, setEmailID] = useState("");
  const [password, setPassWord] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [userName, setuserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [account, setAccount] = useState("");

  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwConMsg, setPwConMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [acctMsg, setAcctMsg] = useState("");
  const [authNum, setAuthNum] = useState(null);
  const [veriCode, setVeriCode] = useState("");

  const dispatch = useDispatch();

  const signup = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]*$/.test(emailID)) {
      setIdMsg("영문, 숫자로 이루어진 이메일 형태로 만들어주세요.");
      return;
    } else {
      setIdMsg("");
    }

    if (password.length < 4) {
      setPwMsg("최소 4자 이상으로 만들어주세요.");
      return;
    } else {
      setPwMsg("");
    }

    if (password !== pwConfirm) {
      setPwConMsg("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setPwConMsg("");
    }

    if (userName.length === 0) {
      setNameMsg("이름을 입력해주세요.");
    } else {
      setNameMsg("");
    }

    if (phone.length === 0) {
      setPhoneMsg("전화번호를 입력해주세요.");
    } else {
      setPhoneMsg("");
    }

    // if (account.length === 0) {
    //   setAcctMsg("계좌를 입력해주세요.");
    // } else {
    //   setAcctMsg("");
    // }

    const response = await fetch(`${url}/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        emailID,
        password,
        userName,
        nickName,
        phone,
        account,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //signupok 페이지에 데이터 url 로 보내기
    if (response.status === 200) {
      const signupData = await response.json();
      dispatch(userState(signupData));
      window.location.href = `/signupok?emailID=${signupData.emailID}
        &userName=${signupData.userName}
        &nickName=${signupData.nickName}
        &phone=${signupData.phone}`;
      // &account=${signupData.account}
    } else if (response.status === 409) {
      setModalAlert("alreadyexist");
    } else {
      setModalAlert("userrequired");
    }
  };

  const phoneChange = (e) => {
    const input = e.target.value;
    const phoneValue = input.replace(/[^0-9]/g, "");
    setPhone(phoneValue);
  };

  const sendSms = () => {
    fetch(`${url}/sendsms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("sendsms not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setAuthNum(data.auth);
          setModalAlert("authsend");
        } else {
          setModalAlert("authsendfailed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setModalAlert("authsendfailed");
      });
  };

  const verifyCode = () => {
    fetch(`${url}/verifycode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, code: veriCode }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("verifycode not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setModalAlert("authsuccess");
        } else {
          setModalAlert("authfailed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setModalAlert("authfailed");
      });
  };

  //약관 관련 함수
  const handleAllChange = () => {
    if (allAgree === false) {
      setAllAgree(true);
      setSvcAgree(true);
      setPriAgree(true);
      setMktAgree(true);
    } else {
      setAllAgree(false);
      setSvcAgree(false);
      setPriAgree(false);
      setMktAgree(false);
    }
  };

  const handleSvcChange = () => {
    if (svcAgree === false) {
      setSvcAgree(true);
    } else {
      setSvcAgree(false);
    }
  };

  const handlePriChange = () => {
    if (priAgree === false) {
      setPriAgree(true);
    } else {
      setPriAgree(false);
    }
  };

  const handleMktChange = () => {
    if (mktAgree === false) {
      setMktAgree(true);
    } else {
      setMktAgree(false);
    }
  };

  useEffect(() => {
    if (svcAgree === true && priAgree === true && mktAgree === true) {
      setAllAgree(true);
    } else {
      setAllAgree(false);
    }
  }, [svcAgree, priAgree, mktAgree]);

  const showPopup = (content) => {
    setModal(content);
  };

  const closePopup = () => {
    setModal(null);
  };

  const closeAlert = () => {
    setModalAlert(null);
  };

  const cancelBtn = () => {
    window.location.href = "/";
  };

  const chkRequired = () => {
    return svcAgree && priAgree;
  };

  const chkSubmit = (e) => {
    e.preventDefault();
    if (!chkRequired()) {
      setModalAlert("required");
    } else {
      signup(e);
    }
  };

  return (
    <main className='signup fullLayout'>
      <h2>회원가입</h2>
      <section className='boxCon'>
        <div className={mem.agreeStyle}>
          <h3>약관동의</h3>
          <label htmlFor='all' className={form.formGrup}>
            <input
              type='checkbox'
              id='all'
              checked={allAgree}
              onChange={handleAllChange}
            />
            모든 약관을 확인하고 전체 동의합니다.
          </label>
          <label htmlFor='service'>
            <input
              type='checkbox'
              id='service'
              checked={svcAgree}
              onChange={handleSvcChange}
              required
            />
            서비스이용약관에 동의합니다.
            <span className={mem.required}>(필수)</span>
            <span onClick={() => showPopup("content1")}>[전문보기]</span>
          </label>
          <label htmlFor='privacy'>
            <input
              type='checkbox'
              id='privacy'
              checked={priAgree}
              onChange={handlePriChange}
              required
            />
            개인정보취급방침에 동의합니다.
            <span className={mem.required}>(필수)</span>
            <span onClick={() => showPopup("content2")}>[전문보기]</span>
          </label>
          <label htmlFor='marketing'>
            <input
              type='checkbox'
              id='marketing'
              checked={mktAgree}
              onChange={handleMktChange}
            />
            마케팅 활용에 동의합니다.
            <span className={mem.optional}>(선택)</span>
            <span onClick={() => showPopup("content3")}>[전문보기]</span>
          </label>
        </div>
      </section>
      <form className={`${form.formStyle} signupForm`} onSubmit={chkSubmit}>
        <div className={form.formContainer}>
          <div className={`${form.formGrup} ${idMsg ? mem.errorForm : ""}`}>
            <span className={idMsg ? mem.errorTitle : ""}>이메일(아이디)</span>
            <div className={`${form.formCon} `}>
              <input
                type='email'
                placeholder=' '
                value={emailID}
                onChange={(e) => {
                  setEmailID(e.target.value);
                }}
              />
              <p className={mem.error}>{idMsg}</p>
            </div>
          </div>
          <div className={`${form.formGrup} ${pwMsg ? mem.errorForm : ""}`}>
            <span className={pwMsg ? mem.errorTitle : ""}>비밀번호</span>
            <div className={form.formCon}>
              <input
                type='password'
                placeholder=' '
                value={password}
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
              />
              <p className={mem.error}>{pwMsg}</p>
            </div>
          </div>
          <div className={`${form.formGrup} ${pwConMsg ? mem.errorForm : ""}`}>
            <span className={pwConMsg ? mem.errorTitle : ""}>
              비밀번호 확인
            </span>
            <div className={form.formCon}>
              <input
                type='password'
                placeholder=' '
                value={pwConfirm}
                onChange={(e) => {
                  setPwConfirm(e.target.value);
                }}
              />
              <p className={mem.error}>{pwConMsg}</p>
            </div>
          </div>
          <div className={`${form.formGrup} ${nameMsg ? mem.errorForm : ""}`}>
            <span className={nameMsg ? mem.errorTitle : ""}>이름</span>
            <div className={form.formCon}>
              <input
                type='text'
                placeholder=' '
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
              />
              <p className={mem.error}>{nameMsg}</p>
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
          <div className={`${form.formGrup} ${phoneMsg ? mem.errorForm : ""}`}>
            <span className={phoneMsg ? mem.errorTitle : ""}>연락처</span>
            <div className={mem.phoneInner}>
              <div className={`${mem.phoneAuth}`}>
                <div className={`${form.formCon} ${mem.formCon}`}>
                  <input
                    type='text'
                    className={`${mem.phoneInput} ${
                      phoneMsg ? mem.errorInput : ""
                    }`}
                    placeholder='하이픈(-) 제외 숫자만 입력'
                    value={phone}
                    maxLength='11'
                    onChange={phoneChange}
                  />
                </div>
                <button
                  type='button'
                  className={`btn primary green ${mem.greenBtn}`}
                  onClick={sendSms}
                >
                  인증하기
                </button>
              </div>
              <div className={`${mem.phoneAuth}`}>
                <div className={`${form.formCon} ${mem.formCon}`}>
                  <input
                    type='text'
                    className={`${mem.authInput} ${
                      phoneMsg ? mem.errorInput : ""
                    }`}
                    placeholder='인증번호'
                    value={veriCode}
                    onChange={(e) => setVeriCode(e.target.value)}
                  />
                  {/* <p className={mem.time}>00:00</p> */}
                  <p className={`${mem.error} ${mem.phoneMsg}`}>{phoneMsg}</p>
                </div>
                <button
                  type='button'
                  className={`btn primary yellow ${mem.yellowBtn}`}
                  onClick={verifyCode}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
          {/* <div className={`${form.formGrup} ${acctMsg ? mem.errorForm : ""}`}>
            <span className={acctMsg ? mem.errorTitle : ""}>계좌번호</span>
            <div className={`${form.formCon}`}>
              <input
                type='text'
                placeholder=' '
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
              />
              <p className={mem.error}>{acctMsg}</p>
            </div>
          </div> */}
        </div>
        <div className={`${mem.btnWrap} btnWrap`}>
          <button type='button' className='btn tertiary' onClick={cancelBtn}>
            취소
          </button>
          <button type='submit' className='btn primary yellow'>
            회원가입
          </button>
        </div>
      </form>
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "content1" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>이용약관</h3>
            <pre>{service}</pre>
          </div>
        )}
        {modal === "content2" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>개인정보 약관</h3>
            <pre>{privacy}</pre>
          </div>
        )}
        {modal === "content3" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>마케팅 활용 동의</h3>
            <pre>{marketing}</pre>
          </div>
        )}
      </Modal>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type='alert'>
          {modalAlert === "required" && (
            <ModalAlert
              close={closeAlert}
              desc={"필수사항을 모두 선택해주세요!"}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "userrequired" && (
            <ModalAlert
              close={closeAlert}
              desc={"입력하신 정보를 확인해주세요!"}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "alreadyexist" && (
            <ModalAlert
              close={closeAlert}
              desc={"이미 존재하는 이메일아이디 입니다."}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "authsend" && (
            <ModalAlert
              close={closeAlert}
              desc={"인증번호 전송이 완료되었습니다."}
              error={false}
              confirm={true}
            />
          )}
          {modalAlert === "authsendfailed" && (
            <ModalAlert
              close={closeAlert}
              desc={"입력하신 번호를 확인해주세요"}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "authsuccess" && (
            <ModalAlert
              close={closeAlert}
              desc={"인증이 완료되었습니다."}
              error={false}
              confirm={true}
            />
          )}
          {modalAlert === "authfailed" && (
            <ModalAlert
              close={closeAlert}
              desc={"인증번호를 다시 확인해주세요."}
              error={true}
              confirm={false}
            />
          )}
        </Modal>
      )}
    </main>
  );
};

export default Signup;
