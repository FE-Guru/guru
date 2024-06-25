import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import style from "../css/Form.module.css";
import { useState } from "react";
import { url } from "../store/ref";
import Modal from "../components/Modal";
import ModalAlert from "../components/ModalAlert";

const Profile = ({ show, onclose }) => {
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const user = useSelector((state) => state.user.user);
  const nickName = user ? user?.nickName : null;
  const [modalAlert, setModalAlert] = useState(null);

  // 데이터 저장
  const onSubmit = async (data) => {
    saveFormDataToLocalStorage(data);
    await profileWrite(data);
    onclose();
    setTimeout(() => setModalAlert("content")); 
  };

  const closeAlert = () => {
    setModalAlert(null);
  };

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

  // 프로필 등록 함수
  const profileWrite = async (val) => {
    const { career, certi, skill, time, introduce } = val;

    const data = new FormData();
    data.append("files", files[0]);
    data.append("career", career);
    data.append("certi", certi);
    data.append("skill", skill);
    data.append("time", time);
    data.append("introduce", introduce);

    // FormData 내용 출력
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
        console.log("등록");
      } else {
        console.error("Failed to submit profile:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!show) {
    return null;
  }

  const saveFormDataToLocalStorage = (data) => {
    localStorage.setItem("profileData", JSON.stringify(data));
    if (imageSrc) {
      localStorage.setItem("profileImageSrc", imageSrc);
    }
  };

  return (
    <div className={style.modalprofile}>
      <h3>프로필 등록</h3>
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
              <p>이미지 등록</p>
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
            <span>시간</span>
            <div className={`${style.formCon} ${style.addItem}`}>
              <input {...register("time")} placeholder="시간을 입력해주세요." />
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
          <button type="submit" className="btn primary yellow">
            프로필 등록
          </button>
        </div>
      </form>
      {modalAlert && (
        <Modal show={modalAlert !== null} onClose={closeAlert} type="alert">
          {modalAlert === "content" && (
            <ModalAlert
              close={closeAlert}
              title={"GURU"}
              desc={"등록 완료"}
              confirm={false}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Profile;
