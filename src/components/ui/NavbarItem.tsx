import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { selectedTempUnit } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/NavbarItem.module.scss'

interface NavbarItemProps {
    isCelUnit: boolean;
    unit: string;
}
const NavbarItem: FC<NavbarItemProps> = ({isCelUnit, unit}) => {
    const dispatch = useAppDispatch()
    return (
        <div 
        className={style.navbar__item}
        onClick={() => dispatch(selectedTempUnit(isCelUnit))}
        >
            {unit}
        </div>
    );
};

export default NavbarItem;