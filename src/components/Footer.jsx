import React from "react";
import { useState } from "react";
import footer from "../css/Footer.module.css";
import Modal from "../components/Modal";
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
    <div className={footer.footerCon}>
      <div className={footer.inner}>
        <img
          src={`${process.env.PUBLIC_URL}/img/common/footerLogo.png`}
          alt='footerLogo'
        ></img>
        <span onClick={() => showPopup("content1")}>개인정보취급방침</span>
        <span onClick={() => showPopup("content2")}>서비스이용약관</span>
      </div>
      <div className={footer.copyright}>
        Copyright© Guru. All Rights Reserved.
      </div>
      <Modal show={modal !== null} onClose={closePopup}>
        {modal === "content1" && (
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
              • 이름: [김구루] <br />
              • 직위: [CPO] <br />
              • 연락처: [1577-0000] <br />
              • 이메일: [privacy@guru.com] <br />
            </pre>
          </div>
        )}
        {modal === "content2" && (
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
              <br />
              1) 정보 제공 서비스
              <br />
              2) 회원 간의 커뮤니케이션 서비스
              <br />
              3) 기타 회사가 정하는 서비스
              <br />
              2. 회사는 서비스의 품질 향상 등을 위하여 필요한 경우 서비스의
              내용을 변경할 수 있으며, 변경된 서비스의 내용 및 제공일자를
              명시하여 제공일자 7일 전에 공지합니다.
              <br />
              제5조 (서비스의 중단) <br />
              1. 회사는 천재지변, 비상사태, 설비의 장애 또는 유지보수 등의
              사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있습니다.
              <br />
              2. 회사는 서비스 제공의 중단이 발생할 경우, 이용자에게 사전 통지를
              원칙으로 합니다. 단, 사전에 통지할 수 없는 불가피한 사유가 있는
              경우에는 사후에 통지할 수 있습니다.
              <br />
              제6조 (이용자의 의무) <br />
              1. 이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 안
              됩니다:
              <br />
              1) 신청 또는 변경 시 허위 내용의 등록
              <br />
              2) 타인의 정보 도용
              <br />
              3) 회사의 지적재산권 등의 권리를 침해하는 행위
              <br />
              4) 공공질서 및 미풍양속에 반하는 행위
              <br />
              5) 기타 불법적이거나 부당한 행위
              <br />
              제7조 (회원의 계정 및 비밀번호에 대한 의무) <br />
              1. 회원은 자신의 계정과 비밀번호에 관한 관리 책임이 있으며, 이를
              타인에게 양도하거나 대여할 수 없습니다.
              <br />
              2. 회사는 회원이 자신의 계정과 비밀번호를 타인에게 양도하거나
              대여함으로써 발생한 손해에 대해 책임을 지지 않습니다.
              <br />
              3. 회원은 자신의 계정이 부정하게 사용된 경우 이를 즉시 회사에
              통지하고, 회사의 안내에 따를 의무가 있습니다.
              <br />
              제8조 (개인정보 보호) <br />
              1. 회사는 이용자의 개인정보를 보호하기 위해 관련 법령을 준수하며,
              개인정보 처리방침을 통해 이용자의 개인정보 보호 및 관리에 대한
              내용을 공개합니다.
              <br />
              2. 회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지
              않습니다. 다만, 법령에 의하여 허용된 경우는 예외로 합니다.
              <br />
              제9조 (이용자의 게시물) <br />
              1. 이용자가 게시한 게시물에 대한 저작권은 해당 게시물의 작성자에게
              있습니다.
              <br />
              2. 이용자는 회사가 게시물의 저작권을 사용하여 서비스를 운영, 홍보,
              개선하기 위해 필요한 범위 내에서 이용자의 게시물을 사용할 수
              있도록 허락합니다.
              <br />
              3. 회사는 이용자의 게시물이 법령 또는 본 약관에 위반되는 경우 사전
              통지 없이 삭제할 수 있습니다.
              <br />
              제10조 (면책 조항) <br />
              1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
              제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              <br />
              2. 회사는 이용자의 귀책 사유로 인한 서비스 이용의 장애에 대하여
              책임을 지지 않습니다.
              <br />
              3. 회사는 이용자가 서비스와 관련하여 게재한 정보, 자료, 사실의
              신뢰도, 정확성 등의 내용에 대해서는 책임을 지지 않습니다.
              <br />
              제11조 (분쟁의 해결) <br />
              1. 회사와 이용자 간에 발생한 분쟁에 대하여는 대한민국 법을
              적용하며, 본 약관 또는 서비스 이용과 관련하여 분쟁이 발생한 경우,
              회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
              <br />
              부칙 <br />이 약관은 2024년 1월 1일부터 적용됩니다.
            </pre>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Footer;
