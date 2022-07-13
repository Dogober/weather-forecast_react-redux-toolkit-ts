import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDetailsWidth, setHourlyOffsetLeft, setHourlyOffsetRight } from '../store/reducers/WeatherSlice/ActionCreators';
import { currentTempChart } from '../utils/constans/currentTempChart';
import { drawTempChart } from '../utils/constans/drawTempChart';
import HourlyForecast from './HourlyForecast';
import style from './styles/ForecastDetails.module.scss'
import ForecastDetailsLink from './ui/ForecastDetailsLink';

const ForecastDetails: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const tempChartContainerRef = useRef<HTMLDivElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {
        isCel, 
        forecastDetails, 
        hourlyOffset, 
        hourlyWidthItem, 
        detailsWidth,
        selectedHour } = useAppSelector(state => state.weather)
    const {forecastDay} = useAppSelector(state => state.weather.displayedHourlyWeather)
    const dispatch = useAppDispatch()
    const rightOffset = forecastDay?.hours?.length! * hourlyWidthItem! - detailsWidth!
    useEffect(() => {
        const resizeHandler = () => {
            dispatch(setDetailsWidth(tempChartContainerRef.current?.offsetWidth))
        }
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])
    useEffect(() => {
        drawTempChart(forecastDetails, forecast, canvasRef, detailsWidth)
    }, [isCel, forecastDetails, detailsWidth])

    return (
        <div className={style.forecastDetails}
        >
            <div className={style.forecastDetails__nav}>
                <ForecastDetailsLink currentDetails={'summary'} detailName={'Summary'}/>
                <ForecastDetailsLink currentDetails={'hourly'} detailName={'Hourly'}/>
            </div>
            { forecastDetails === 'summary'
            ?<div 
                ref={tempChartContainerRef}
                className={style.forecastDetails__canvasContainer}>
                <canvas
                    style={{
                        transform: `translateX(-${currentTempChart(forecast, detailsWidth)}px)`,
                        transition: '1s'
                    }}
                    ref={canvasRef}
                >
                </canvas>
            </div>
            :<>
                <button 
                    onClick={() => dispatch(setHourlyOffsetLeft())}
                    className={style.forecastDetails__sliderButtonLeft}
                    disabled={hourlyOffset <= 0 ?true :false}
                >
                    {'<'}
                </button>
                    <HourlyForecast/>
                <button
                    onClick={() => dispatch(setHourlyOffsetRight())}
                    className={style.forecastDetails__sliderButtonRight}
                    disabled={selectedHour === null 
                        ?hourlyOffset >= rightOffset ?true :false
                        :hourlyOffset >= rightOffset +200 ?true :false
                    }
                >
                    {'>'}
                </button>
            </>}
        </div>
    );
};

export default ForecastDetails;