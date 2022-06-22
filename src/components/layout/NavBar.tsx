import { ChangeEvent, FC, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocation, setSearchIsOpen, setSearchValue } from '../../store/reducers/SearchLocationSlice/ActionCreators';
import style from '../styles/NavBar.module.scss'
import LocationItem from '../ui/LocationItem';
import NavbarItem from '../ui/NavbarItem';

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
                            <LocationItem location={location}/>
                        ) :null}
                    </ul>
                </div>
                <div className={style.navbar__itemContainer}>
                    <NavbarItem isCelUnit={true} unit={'°C'}/>
                    <NavbarItem isCelUnit={false} unit={'°F'}/>
                </div>
            </div>
        </div>
    );
};

export default NavBar;