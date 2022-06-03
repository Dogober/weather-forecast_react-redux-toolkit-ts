import { FC } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/Location.module.scss'

const Location: FC = () => {
    const {current_weather, loading} = useAppSelector(state => state.currentWeatherReducer)
    const {location} = current_weather
    const item = style.location__item
    return (
        <div className={style.location}>
            {loading && <h1>Is loading...</h1>}
            {Object.keys(current_weather).length !== 0 
            ?<>
            <div className={item}>{location?.country} {location?.region} {location?.name}</div>
            <div className={item}>IMG</div>
            <div className={item}>{location?.localtime}</div>
            </> :null}
        </div>
    );
};

export default Location;