import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/Location.module.scss'
import City from '../assets/city5.png'

const Location: FC = () => {
    const { weather } = useAppSelector(state => state.weather)
    const {location} = weather
    return (
        <div className={style.location}>
            <div className={style.location__region}>{location?.country}, {location?.name}</div>
            <div className={style.location__date}>{location?.localtime}</div>
            <img className={style.location__img} src={City} alt='City'/>
        </div>
    );
};

export default Location;