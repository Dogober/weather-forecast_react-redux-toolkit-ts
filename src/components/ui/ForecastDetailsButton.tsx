import { Children, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectedForecastDetails } from '../../store/reducers/WeatherSlice/ActionCreators';
import style from './styles/ForecastDetails.module.scss'

interface ForecastDetailsButtonProps {
    currentDetails: string;
    detailName: string
}
const ForecastDetailsButton: FC<ForecastDetailsButtonProps> = ({currentDetails, detailName}) => {
    const dispatch = useAppDispatch()
    const {forecastDetails} = useAppSelector(state => state.weather)
    return (
        <button
            className={forecastDetails === currentDetails
            ?style.hourlyForecast__linkActive 
            :style.hourlyForecast__link
        }
            onClick={() => dispatch(selectedForecastDetails(currentDetails))}
        >
            {detailName}
        </button>
    );
};

export default ForecastDetailsButton;