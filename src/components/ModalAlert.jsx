import style from "../css/Modal.module.css";

const ModalAlert = ({ close, title, desc, error, confirm }) => {
  return (
    <div className={`${style.terms} ${error ? style["error"] : ""} `}>
      <h3 className={style.termsTitle}>{title}</h3>
      <p>{desc}</p>
      {error ? (
        <div className={style.modalBtn}>
          <button className={style.alertBtn} onClick={close}>
            확인
          </button>
          <button className={`${style.alertBtn} ${style.primary}`} onClick={close}>
            취소
          </button>
        </div>
      ) : (
        <div className={style.modalBtn}>
          {confirm ? (
            <>
              <button className={style.alertBtn} onClick={close}>
                취소
              </button>
              <button className={`${style.alertBtn} ${style.primary}`} onClick={close}>
                확인
              </button>
            </>
          ) : (
            <button className={`${style.alertBtn} ${style.primary}`} onClick={close}>
              확인
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModalAlert;
