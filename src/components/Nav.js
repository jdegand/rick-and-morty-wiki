import { Link } from "react-router-dom";

const Nav = () => {
    return(
        <nav>
          <h1>Rick and Morty Wiki</h1>
        <ul>
          <li>
            <Link to='/'>Characters</Link>
          </li>
          <li>
            <Link to='/episodes'>Episodes</Link>
          </li>
          <li>
            <Link to='/locations'>Locations</Link>
          </li>
        </ul>
      </nav>
    )
}

export default Nav;