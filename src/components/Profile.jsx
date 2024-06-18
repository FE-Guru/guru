import { useForm, Controller } from "react-hook-form";
import style from "../css/Form.module.css";
import { useEffect, useState } from "react";
import { url } from "../store/ref";
import { set } from "date-fns";
import { tr } from "date-fns/locale";

const Profile = ({}) => {
  const { register, handleSubmit, setValue } = useForm();
  const [files, setFiles] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(e.target.files);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  //프로필 등록 함수
  const profileWrite = async (val) => {
    const { career, certi, skill, time, introduce } = val;

    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
    }

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
        console.log(result);
      } else {
        console.error("Failed to submit profile:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.modalprofile}>
      <h3>프로필 등록</h3>
      <form
        className={`${style.formStyle} ${style.formProfile}`}
        onSubmit={handleSubmit(profileWrite)}
      >
        <div className={style.formContainer}>
          <div className={style.formThumb}>
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" />
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
          <span>님</span>
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
    </div>
  );
};

export default Profile;
