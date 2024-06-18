import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageInfo } from "../store/pageInfo";
import { useForm, Controller } from "react-hook-form";
import style from "../css/Form.module.css";
const ProfileEdit = () => {
  const dispatch = useDispatch();
  const pageInfo = useMemo(
    () => ({
      menuKR: "마이 페이지",
      menuEn: "My Page",
      currentPage: { pageName: "프로필 수정", path: "/mypage/profileEdit" },
    }),
    []
  );
  const currentPage = useSelector((state) => state.pageInfo.currentPage);
  useEffect(() => {
    dispatch(setPageInfo(pageInfo));
  }, [dispatch, pageInfo]);
  /*form*/
  const { register, handleSubmit, setValue } = useForm();
  return (
    <div className="contents">
      <h3>{currentPage.pageName}</h3>
      <div className="full">
        <form className={`${style.formStyle} ${style.formProfile}`}>
          <div className={style.formContainer}>
            <div className={style.formThumb}>
              <img
                src={`${process.env.PUBLIC_URL}/img/common/no_img.jpg`}
                alt="logo"
              />
              <i className="fa-solid fa-camera-retro">
                <p>이미지 변경</p>
              </i>
            </div>
            <span>닉네임</span>
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
                  <i classNAme="fa-solid fa-plus"></i>
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
            <button type="submit" className="btn primary yellow">
              프로필 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileEdit;
