import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { url } from "../store/ref";
import form from "../css/Form.module.css";
import mem from "../css/Memb.module.css";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";

const PersonalEdit = () => {
  const [modalAlert, setModalAlert] = useState(null);

  const user = useSelector((state) => state.user.user);
  const emailID = user ? user.emailID : null;
  const nickName = user ? user.nickName : null;

  const closeAlert = () => {
    setModalAlert(null);
  };

  const navigate = useNavigate();
  const accountDel = () => {
    navigate("/mypage/acctdelete");
  };
  const dispatch = useDispatch();
  const pageInfo = useMemo(
    () => ({
      menuKR: "마이 페이지",
      menuEn: "My Page",
      currentPage: { pageName: "회원정보 수정", path: "/mypage/profileedit" },
    }),
    []
  );
  const currentPage = useSelector((state) => state.pageInfo.currentPage);

  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
  }, [dispatch, pageInfo]);

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

  //로그인 안하면 접근 못하게
  useEffect(() => {
    if (!user) {
      setModalAlert("notAuthorized");
    }
  }, [user]);

  const editSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setModalAlert("pwnotmatch");
      return;
    }

    try {
      const response = await fetch(`${url}/mypage/personaledit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalAlert("editsuccess");
      } else {
        setModalAlert("editfailed");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalAlert("editfailed");
    }
  };

  return (
    <div className='contents'>
      <h3>{currentPage.pageName}</h3>
      <div className='full'>
        <form
          className={` ${form.formStyle} ${mem.editForm}`}
          onSubmit={editSubmit}
        >
          <div className={form.formContainer}>
            <div className={`${form.formGrup} `}>
              <span>이메일(아이디)</span>
              <span className={mem.editSpan}>{emailID}</span>
            </div>
            <div className={form.formGrup}>
              <span>이름</span>
              <span className={mem.editSpan}>{nickName}</span>
            </div>
            <div className={`${form.formGrup} `}>
              <span>비밀번호</span>
              <div className={form.formCon}>
                <input
                  type='password'
                  name='password'
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
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={form.formGrup}>
              <span>닉네임</span>
              <input
                type='text'
                name='nickName'
                value={formData.nickName}
                onChange={handleChange}
              />
            </div>
            <div className={`${form.formGrup} ${mem.phoneGrup}`}>
              <span>연락처</span>
              <div className={mem.phoneInner}>
                <div className={mem.phoneAuth}>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    maxLength='11'
                    onChange={handleChange}
                  />
                  <p className={mem.time}></p>
                  <button
                    type='button'
                    className={`btn primary green ${mem.greenBtn}`}
                  >
                    연락처 변경
                  </button>
                </div>
              </div>
            </div>
            <div className={form.formGrup}>
              <span>계좌번호</span>
              <input
                type='text'
                name='account'
                placeholder=' '
                value={formData.account}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={mem.accountDel} onClick={accountDel}>
            <span>회원탈퇴</span>
          </div>
          <div className={`${mem.btnWrap} btnWrap`}>
            <button type='submit' className='btn primary yellow'>
              정보수정
            </button>
          </div>
        </form>
      </div>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type='alert'>
          {modalAlert === "editsuccess" && (
            <ModalAlert
              close={closeAlert}
              desc={"회원정보가 수정되었습니다."}
              error={false}
              confirm={true}
            />
          )}
          {modalAlert === "editfailed" && (
            <ModalAlert
              close={closeAlert}
              desc={"회원정보 수정에 실패했습니다."}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert === "pwnotmatch" && (
            <ModalAlert
              close={closeAlert}
              desc={"비밀번호가 일치하지 않습니다."}
              error={true}
              confirm={false}
            />
          )}
          {modalAlert && (
            <Modal show={modalAlert !== null} onClose={closeAlert} type='alert'>
              {modalAlert === "notAuthorized" && (
                <ModalAlert
                  close={closeAlert}
                  desc={"로그인이 필요한 페이지입니다."}
                  error={true}
                  confirm={false}
                  goPage={"/login"}
                />
              )}
            </Modal>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PersonalEdit;
