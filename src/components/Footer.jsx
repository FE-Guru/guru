import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import service from "../assets/termsOfService";
import privacy from "../assets/privacyPolicy";
import footer from "../css/Footer.module.css";
import style from "../css/Modal.module.css";

const Footer = () => {
  const [modal, setModal] = useState(null);

  const showPopup = (content) => {
    setModal(content);
  };

  const closePopup = () => {
    setModal(null);
  };

  return (
    <footer className={footer.footerCon}>
      <img src={`${process.env.PUBLIC_URL}/img/common/footerLogo.png`} alt="footerLogo"></img>
      <span onClick={() => showPopup("content1")}>개인정보취급방침</span>
      <span onClick={() => showPopup("content2")}>서비스이용약관</span>
      <p>Copyright© Guru. All Rights Reserved.</p>
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "content1" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>개인정보 약관</h3>
            <pre>{privacy}</pre>
          </div>
        )}
        {modal === "content2" && (
          <div className={style.terms}>
            <h3 className={style.termsTitle}>이용약관</h3>
            <pre>{service}</pre>
          </div>
        )}
      </Modal>
    </footer>
  );
};

export default Footer;
