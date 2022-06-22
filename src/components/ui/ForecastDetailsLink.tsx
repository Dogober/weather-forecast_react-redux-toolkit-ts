import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectedForecastDetails } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/ForecastDetailsLink.module.scss'

interface ForecastDetailsLinkProps {
    currentDetails: string;
    detailName: string
}
const ForecastDetailsLink: FC<ForecastDetailsLinkProps> = ({currentDetails, detailName}) => {
    const dispatch = useAppDispatch()
    const {forecastDetails} = useAppSelector(state => state.weather)
    return (
        <button
            className={forecastDetails === currentDetails
            ?style.forecastDetails__linkActive 
            :style.forecastDetails__link
        }
            onClick={() => dispatch(selectedForecastDetails(currentDetails))}
        >
            {detailName}
        </button>
    );
};

export default ForecastDetailsLink;