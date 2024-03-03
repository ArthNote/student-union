import { Link } from "react-router-dom";
import "../styles/Button.css"

function Button({to, children, click}: any) {
  return (
    <Link to={to} >
      <button onClick={click}>{children}</button>
    </Link>
  );
}

export default Button