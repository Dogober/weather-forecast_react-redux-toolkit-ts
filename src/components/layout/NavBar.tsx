import { ChangeEvent, FC, MouseEvent, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocation, setSearchIsOpen, setSearchValue } from '../../store/reducers/SearchLocationSlice/ActionCreators';
import { selectedCity, selectedTempUnit } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from '../styles/NavBar.module.scss'

const NavBar: FC = () => {
    const dispatch = useAppDispatch()
    const {searchLocation, searchIsOpen, searchValue} = useAppSelector(state => state.searchLocation)
    const searchCityContainerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        document.addEventListener('mousedown', handlClickOutside)
        return () => {
            document.removeEventListener('mousedown', handlClickOutside)
        }
    }, [])
    const handlClickOutside = (event: Event) => {
        const {current: searchCityContainer} = searchCityContainerRef
        if (searchCityContainer && !searchCityContainer.contains(event.target as HTMLDivElement)) {
            dispatch(setSearchIsOpen(false))
        }
    }
    const itemClickHandler = (event: MouseEvent<HTMLLIElement>) => {
        dispatch(setSearchValue(event.currentTarget.textContent!))
        dispatch(selectedCity(event.currentTarget.textContent!))
        dispatch(setSearchIsOpen(false))
    }
    const clickHendler = () => {
        dispatch(setSearchIsOpen(true))
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value))
        if (event.target.value) {
            dispatch(fetchLocation(event.target.value))
        }
    }
    return (
        <div className={style.navbar}>
            <div className={style.navbar__container}>
                <div
                    ref={searchCityContainerRef}
                    className={style.navbar__searchCityContainer}>
                    <input
                        className={style.navbar__searchCity}
                        style={searchValue && searchIsOpen && searchLocation.length > 0
                            ?{
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px'
                            } 
                            :{
                                borderBottomLeftRadius: '15px',
                                borderBottomRightRadius: '15px'
                            }
                        }
                        type='text'
                        placeholder='Search for location'
                        value={searchValue}
                        onChange={onChangeHandler}
                        onClick={clickHendler}
                        
                    />
                    <ul className={style.navbar__autocomplete}>
                        {searchValue && searchIsOpen
                        ?searchLocation.map(location =>
                            <li 
                                className={style.navbar__autocomplete__item}
                                key={location.id}
                                onClick={itemClickHandler}
                            >
                                {location.country}, {location.name}
                            </li>
                        ) :null}
                    </ul>
                </div>
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