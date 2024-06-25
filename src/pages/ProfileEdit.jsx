import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { useForm } from "react-hook-form";
import style from "../css/Form.module.css";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const nickName = user ? user.nickName : null;
  const [files, setFiles] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [modalAlert, setModalAlert] = useState(null);
  const [modal, setModal] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  const closeAlert = () => {
    setModalAlert(null);
  };

  const showPopup = (content) => {
    setModal(content);
  };

  const pageInfo = useMemo(
    () => ({
      menuKR: "마이 페이지",
      menuEn: "My Page",
      currentPage: { pageName: "프로필 수정", path: "/mypage/profileEdit" },
    }),
    []
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setFiles(file);
    }
  };

  const currentPage = useSelector((state) => state.pageInfo.currentPage);

  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
    loadFormDataFromLocalStorage(); // Load data from local storage
  }, [dispatch, pageInfo]);

  const profileWrite = async (val) => {
    const { career, certi, skill, time, introduce } = val;

    const data = new FormData();
    data.append("files", files);
    data.append("career", career);
    data.append("certi", certi);
    data.append("skill", skill);
    data.append("time", time);
    data.append("introduce", introduce);

    data.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const res = await fetch(`${url}/profileWrite`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        setModalAlert("content");
        console.log("수정댓다");
      } else {
        console.error("Failed to submit profileEdit:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadFormDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setValue("career", data.career);
      setValue("certi", data.certi);
      setValue("skill", data.skill);
      setValue("time", data.time);
      setValue("introduce", data.introduce);
    }
    const savedImageSrc = localStorage.getItem("profileImageSrc");
    if (savedImageSrc) {
      setImageSrc(savedImageSrc);
    }
  };

  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem("profileData", JSON.stringify(data));
    if (imageSrc) {
      localStorage.setItem("profileImageSrc", imageSrc);
    }
  };

  const onSubmit = (data) => {
    profileWrite(data);
    saveFormDataToLocalStorage(data);
  };

  return (
    <div className="contents">
      <h3>{currentPage.pageName}</h3>
      <div className="full">
        <form
          className={`${style.formStyle} ${style.formProfile}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.formContainer}>
            <div className={style.formThumb}>
              {imageSrc ? (
                <img src={imageSrc} alt="Profile Preview" />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`}
                  alt="logo"
                />
              )}
              <input
                type="file"
                name="files"
                id="files"
                onChange={handleFileChange}
              />
              <i className="fa-solid fa-camera-retro">
                <p>이미지 변경</p>
              </i>
            </div>
            <span>
              {nickName}
              <span> 님</span>
            </span>
            <progress id="trust" max="100" value="25"></progress>
          </div>
          <div className={`${style.formContainer}`}>
            <div className={style.formGrup}>
              <span>경력</span>
              <div className={`${style.formCon} ${style.addItem}`}>
                <input
                  {...register("career")}
                  id="career"
                  placeholder="경력을 입력해주세요."
                />
                <button type="button" className={style.addBtn}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className={style.formGrup}>
              <span>면허 / 자격증</span>
              <div className={`${style.formCon} ${style.addItem}`}>
                <input
                  {...register("certi")}
                  placeholder="면허 / 자격증을 입력해주세요."
                />
                <button type="button" className={style.addBtn}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className={style.formGrup}>
              <span>재능 / 스킬</span>
              <div className={`${style.formCon} ${style.addItem}`}>
                <input
                  {...register("skill")}
                  placeholder="재능 / 스킬을 입력해주세요."
                />
                <button type="button" className={style.addBtn}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className={style.formGrup}>
              <span>요일 / 시간</span>
              <div className={`${style.formCon} ${style.addItem}`}>
                <input
                  {...register("time")}
                  placeholder="요일 / 시간을 입력해주세요."
                />
              </div>
            </div>
            <div className={style.formGrup}>
              <span>자기소개</span>
              <div className={`${style.formCon} ${style.addItem}`}>
                <textarea
                  id="introduce"
                  {...register("introduce")}
                  placeholder="자기소개를 입력해주세요."
                />
              </div>
            </div>
          </div>
          <div className="btnWrap">
            <button
              type="submit"
              className="btn primary yellow"
              onClick={() => showPopup("content")}
            >
              프로필 수정
            </button>
          </div>
        </form>
        {modalAlert && (
          <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
            {modalAlert === "content" && (
              <ModalAlert
                close={closeAlert}
                title={"GURU"}
                desc={"수정 완료"}
                confirm={false}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
