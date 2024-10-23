import { BrowserRouter as Router, Link } from "react-router-dom";
function Button(props) {
  return (
    props?.buttonType == "link" && (
      <Link to="" className={props?.className}>
      {props?.children}
      </Link>
    )
  );
}

export default Button;
