//wrap this in a react component so we can reuse it across pages
import logo from "../assets/westpac-logo.png";

const Navbar = () => {
  return (
    <nav>
      <a href="/">
        <img src={logo} alt="Westpac Logo" />
        <h3>Daron's Assessment</h3>
      </a>
    </nav>
  );
};

export default Navbar;
