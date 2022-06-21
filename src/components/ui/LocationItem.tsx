import { FC, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { ISearchLocation } from '../../models/ISearchLocation';
import { setSearchIsOpen, setSearchValue } from '../../store/reducers/SearchLocationSlice/ActionCreators';
import { selectedCity } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/LocationItem.module.scss'

interface LocationItemProps {
    location: ISearchLocation
}
const LocationItem: FC<LocationItemProps> = ({location}) => {
    const dispatch = useAppDispatch()
    const itemClickHandler = (event: MouseEvent<HTMLLIElement>) => {
        dispatch(setSearchValue(event.currentTarget.textContent!))
        dispatch(selectedCity(event.currentTarget.textContent!))
        dispatch(setSearchIsOpen(false))
    }
    return (
        <li 
            className={style.navbar__autocomplete__item}
            key={location.id}
            onClick={itemClickHandler}
        >
            {location.country}, {location.name}
        </li>
    );
};

export default LocationItem;