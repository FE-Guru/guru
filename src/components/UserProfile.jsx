import { url } from "../store/ref";

const UserProfile = ({ show, onClose, user, itemId }) => {
  if (!show) {
    return null;
  }
  const hiring = async () => {
    const response = await fetch(`${url}/job/hiring`, {
      method: "PUT",
      body: JSON.stringify({
        jobPostID: itemId,
        AppliUser: user.emailID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      console.log(response);
    } else {
      console.log(data.message);
    }
  };
  return (
    <div>
      <p>아이디 : {user.emailID}</p>
      <p>닉네임 : {user.nickName}</p>
      <p>연락처 : {user.phone}</p>
      <p>계좌 : {user.account}</p>
      <div className="btnWrap">
        <button className="btn primary" onClick={onClose}>
          확인
        </button>
        <button className="btn primary yellow" onClick={hiring}>
          채용하기
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
