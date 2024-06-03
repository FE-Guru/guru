import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/img/common/logo.svg`} alt="logo" />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
