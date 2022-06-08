import { FC } from 'react';
import style from '../styles/NavBar.module.scss'

const NavBar: FC = () => {
    return (
        <div className={style.navbar}>
            <div className={style.navbar__item}>°C</div>
            <div className={style.navbar__item}>°F</div>
        </div>
    );
};

export default NavBar;