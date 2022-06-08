import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { weatherSlice } from '../../store/reducers/WeatherSlice/WeatherSlice';
import style from '../styles/NavBar.module.scss'

const NavBar: FC = () => {
    const dispatch = useAppDispatch()
    const {selectedTempUnit} = weatherSlice.actions
    return (
        <div className={style.navbar}>
            <div 
                className={style.navbar__item}
                onClick={() => dispatch(selectedTempUnit('°C'))}
            >
                °C
            </div>
            <div 
                className={style.navbar__item}
                onClick={() => dispatch(selectedTempUnit('°F'))}
            >
                °F
            </div>
        </div>
    );
};

export default NavBar;