import { Link, useParams } from 'react-router-dom';
import {
    NavBtn,
    NavBtnLink
} from './nav_components'

import './Header.css';

const HeaderLink = ({ page, selected }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);
  let className = selected ? 'headerlink-no-link ' : '';
  className += 'headerlink-title';

  return (
    <Link to={`/${page}`} className={selected ? 'active' : className}>
      {title}
    </Link>
  );
};

const Header = () => {
  const page = useParams().page || 'home';

  return (
    <div className='header'>
      <HeaderLink page='home/' selected={page === 'home'} />
      <HeaderLink page='code/' selected={page === 'code'} />
      <HeaderLink page='standings/' selected={page === 'standings'} />
      <HeaderLink page='contact/' selected={page === 'contact'} />
      <NavBtn>
          <NavBtnLink to='/signup'>Sign In</NavBtnLink>
        </NavBtn>
    </div>
  );
};

export default Header;