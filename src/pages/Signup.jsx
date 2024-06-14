import { useState, useEffect } from "react";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import style from "../css/Modal.module.css";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";

const Signup = () => {
  const [modal, setModal] = useState(null);

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

  const signup = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z0-9]+@[A-Za-z0-9]+$/.test(emailID)) {
      setIdMsg("공백없는 이메일 형태로 만들어주세요.");
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

    if (response.status === 200) {
      window.location.href = "/login";
    } else {
      setModal("userrequired");
    }
  };

  //agreement func
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

  const cancelBtn = () => {
    window.location.href = "/";
  };

  const chkRequired = () => {
    return svcAgree && priAgree;
  };
  // console.log("chkRequired", chkRequired());

  const chkSubmit = (e) => {
    e.preventDefault();
    if (!chkRequired()) {
      setModal("required");
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
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "content1" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>이용약관</h3>
            <pre>
              [GURU] 이용약관 <br />
              제1조 (목적) <br />본 약관은 [GURU] (이하 "회사")가 제공하는
              [사이트명] (이하 "사이트")의 이용과 관련하여 회사와 이용자의 권리,
              의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.{" "}
              <br />
              제2조 (용어의 정의) <br />
              1. "사이트"란 회사가 컴퓨터 등 정보통신설비를 이용하여 서비스를
              이용자에게 제공하기 위하여 설정한 가상의 공간을 의미합니다. <br />
              2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및
              비회원을 말합니다.
              <br />
              3. "회원"이란 사이트에 개인정보를 제공하여 회원등록을 한 자로서,
              사이트의 정보를 지속적으로 제공받으며, 사이트가 제공하는 서비스를
              계속적으로 이용할 수 있는 자를 말합니다.
              <br />
              4. "비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를
              이용하는 자를 말합니다.
              <br /> 제3조 (약관의 게시와 개정) <br />
              1. 회사는 본 약관의 내용과 상호, 영업소 소재지, 대표자의 성명,
              사업자등록번호 등을 이용자가 알 수 있도록 사이트 초기화면에
              게시합니다.
              <br />
              2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수
              있으며, 개정된 약관은 적용일자 및 개정사유를 명시하여 현행 약관과
              함께 사이트 초기화면에 그 적용일자 7일 전부터 공지합니다. <br />
              3. 이용자는 변경된 약관에 대해 거부할 권리가 있으며, 변경된 약관이
              공지된 후에도 사이트를 계속 사용할 경우 변경된 약관에 동의한
              것으로 간주됩니다.
              <br /> 제4조 (서비스의 제공 및 변경) <br />
              1. 회사는 다음과 같은 서비스를 제공합니다:
            </pre>
          </div>
        )}
        {modal === "content2" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>개인정보 약관</h3>
            <pre>
              개인정보 수집 및 이용에 대한 안내
              <br />
              [GURU] (이하 "회사")는 이용자의 개인정보를 중요시하며, '개인정보
              보호법'을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여
              이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고
              있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지
              알려드립니다.
              <br />
              1. 수집하는 개인정보의 항목
              <br />• 필수항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호,
              휴대전화번호, 이메일
              <br />• 선택항목: 주소, 직업, 관심분야
              <br />
              2. 개인정보의 수집 및 이용목적
              <br />
              • 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
              <br />• 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별,
              불만처리 등<br />• 마케팅 및 광고에의 활용: 신규 서비스 개발 및
              맞춤 서비스 제공, 이벤트 등 광고성 정보 제공 및 참여기회 제공
              <br />
              3. 개인정보의 보유 및 이용기간
              <br /> • 회원 탈퇴 시까지 보유하며, 탈퇴 후 지체 없이 파기합니다.
              다만, 관계법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서
              정한 기간 동안 보관합니다.
              <br />
              4. 개인정보의 제3자 제공
              <br />• 회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지
              않습니다. 다만, 아래의 경우에는 예외로 합니다:
              <br />
              &nbsp;&nbsp;• 이용자가 사전에 동의한 경우
              <br />
              &nbsp;&nbsp;• 법령의 규정에 의거하거나, 수사 목적으로 법령에
              정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우 <br />
              5. 개인정보의 처리 위탁
              <br />
              • 회사는 서비스 향상을 위해서 이용자의 개인정보를 외부 전문 업체에
              위탁하여 처리할 수 있으며, 이 경우 위탁업체와 위탁업무 내용에 대해
              홈페이지에 공지합니다.
              <br />
              6. 이용자의 권리와 그 행사방법
              <br />
              • 이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나
              수정할 수 있으며, 가입 해지를 요청할 수도 있습니다. 개인정보 조회,
              수정 또는 탈퇴를 위해서는 '개인정보변경' 또는 '회원탈퇴'를
              클릭하여 직접 열람, 정정 또는 탈퇴가 가능합니다.
              <br />
              7. 개인정보 보호를 위한 기술적/관리적 대책
              <br />• 회사는 이용자의 개인정보를 안전하게 관리하기 위하여 다양한
              기술적 및 관리적 조치를 취하고 있습니다. 개인정보는 비밀번호에
              의해 보호되며, 중요한 데이터는 별도의 보안 기능을 통해 보호되고
              있습니다.
              <br />
              8. 개인정보 보호책임자 <br />
              • 이름: [이름] <br />
              • 직위: [직위] <br />
              • 연락처: [연락처] <br />
              • 이메일: [이메일] <br />
            </pre>
          </div>
        )}
        {modal === "content3" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>마케팅 활용 동의</h3>
            <pre>
              마케팅 활용 동의에 대한 안내
              <br />
              1. 개인정보의 수집 및 이용 목적 <br />
              회사는 다음과 같은 목적으로 고객의 개인정보를 수집하고 이용합니다:{" "}
              <br />• 신제품 및 서비스에 대한 정보 제공 <br />• 프로모션 및
              이벤트 안내 <br />• 고객 맞춤형 마케팅 및 광고 <br />• 서비스 이용
              통계 분석 및 서비스 개선 <br />
              2. 수집하는 개인정보의 항목
              <br />
              회사는 마케팅 활용을 위해 다음과 같은 개인정보를 수집할 수
              있습니다:
              <br />• 이름, 이메일 주소, 전화번호 <br />• 서비스 이용 기록 및
              접속 로그 <br />• 관심 상품 및 서비스 정보 <br />
              3. 개인정보의 보유 및 이용 기간
              <br />
              회사는 고객의 개인정보를 수집한 날로부터 서비스를 제공하는 기간
              동안 개인정보를 보유하며, 고객이 동의를 철회하거나 수집 및 이용
              목적이 달성된 경우 해당 정보를 지체 없이 파기합니다. <br />
              4. 동의 거부 권리 및 거부에 따른 불이익 고객은 마케팅 활용 동의를
              거부할 권리가 있습니다. 다만, 동의를 거부할 경우 신제품 정보 제공,
              프로모션 안내 등의 혜택을 받지 못할 수 있습니다.
              <br />
              5. 동의 철회 방법 고객은 언제든지 개인정보 관리 책임자에게
              연락하거나 회사의 홈페이지를 통해 마케팅 활용 동의를 철회할 수
              있습니다. <br />
              6. 개인정보 관리 책임자 회사는 고객의 개인정보를 안전하게 관리하기
              위해 개인정보 관리 책임자를 지정하고 있습니다. 개인정보 관리
              책임자에 대한 자세한 사항은 회사의 개인정보처리방침을 참조하시기
              바랍니다.
            </pre>
          </div>
        )}
        {modal === "required" && (
          <div className={style.alert}>
            <h3>GURU</h3>
            <p>필수사항을 모두 선택해주세요!</p>
          </div>
        )}
        {modal === "userrequired" && (
          <div className={style.alert}>
            <h3>GURU</h3>
            <p>입력하신 정보를 확인해주세요!</p>
          </div>
        )}
      </Modal>
      <form className={mem.signupForm} onSubmit={chkSubmit}>
        <section className='boxCon'>
          <div className={mem.formDiv}>
            <span>이메일(아이디)</span>
            <input
              type='email'
              placeholder=' '
              value={emailID}
              onChange={(e) => {
                setEmailID(e.target.value);
              }}
            />
          </div>
          <p className={mem.error}>{idMsg}</p>
          <div className={mem.formDiv}>
            <span>비밀번호</span>
            <input
              type='password'
              placeholder=' '
              value={password}
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
          </div>
          <p className={mem.error}>{pwMsg}</p>
          <div className={mem.formDiv}>
            <span>비밀번호 확인</span>
            <input
              type='password'
              placeholder=' '
              value={pwConfirm}
              onChange={(e) => {
                setPwConfirm(e.target.value);
              }}
            />
          </div>
          <p className={mem.error}>{pwConMsg}</p>
          <div className={mem.formDiv}>
            <span>이름</span>
            <input
              type='text'
              placeholder=' '
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
          </div>
          <div className={mem.formDiv}>
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
          <div className={`${mem.formDiv} ${mem.phoneCon}`}>
            <div className={mem.phone}>
              <span>연락처</span>
              <div className={mem.right}>
                <input
                  type='text'
                  className={mem.phone}
                  placeholder=' '
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  maxLength='11'
                />
                <button className={`btn primary green ${mem.greenBtn}`}>
                  인증하기
                </button>
              </div>
            </div>
            <div className={mem.auth}>
              <div className={mem.rightAuth}>
                <input type='text' placeholder='인증번호 입력' />
                <p className={mem.time}>00:00</p>
                <button className={`btn primary yellow ${mem.yellowBtn}`}>
                  확인
                </button>
              </div>
            </div>
          </div>
          <div className={mem.formDiv}>
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
        </section>
        <div className={`${mem.btnWrap} btnWrap`}>
          <button type='button' className='btn tertiary' onClick={cancelBtn}>
            취소
          </button>
          <button type='submit' className='btn primary yellow'>
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
