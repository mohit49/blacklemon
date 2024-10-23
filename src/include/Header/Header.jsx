import { BrowserRouter as Router,  Link } from "react-router-dom";
import { getImgURL } from "../../util/image-util";

function Header() {


  return (
    <Router>
    <header>
           <nav>
            <Link to="/" className="blacklemon-app-logo"><img src={getImgURL("logo.png")}/></Link>
            <ul className="end-menu">
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
            </ul>
           </nav>
    </header>
    </Router>
  );
}

export default Header;
