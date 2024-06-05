import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/img/common/logo.svg`} alt="logo" />
        </Link>
      </h1>
      <nav>
        <Link to="/job-list">잡리스트</Link>
        <Link to="/recruitment-management">구인관리</Link>
        <Link to="/job-seeker-management">구직관리</Link>
      </nav>
      <div>
        <Link to="/">아이콘</Link>
        <Link to="/">
          <button>회원가입</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
