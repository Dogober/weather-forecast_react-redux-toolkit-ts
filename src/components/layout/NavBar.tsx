import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { weatherSlice } from '../../store/reducers/WeatherSlice/WeatherSlice';
import style from '../styles/NavBar.module.scss'

const NavBar: FC = () => {
    const dispatch = useAppDispatch()
    const {selectedTempUnit} = weatherSlice.actions
    return (
        <div className={style.navbar}>
            <div className={style.navbar__container}>
                <div 
                    className={style.navbar__item}
                    onClick={() => dispatch(selectedTempUnit(true))}
                >
                    °C
                </div>
                <div 
                    className={style.navbar__item}
                    onClick={() => dispatch(selectedTempUnit(false))}
                >
                    °F
                </div>
            </div>
        </div>
    );
};

export default NavBar;