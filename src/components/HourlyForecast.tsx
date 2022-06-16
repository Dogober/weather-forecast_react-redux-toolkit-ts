import { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectedForecastDetails } from '../store/reducers/WeatherSlice/ActionCreators';
import { convertDate } from '../utils/constans/convertDate';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {isCel, forecastDetails} = useAppSelector(state => state.weather)
    const dispatch = useAppDispatch()
    const currentDay = forecast?.forecastdays?.find(el => el.date === forecast.dayOfForecast)
    const currentDayIndex = forecast?.forecastdays?.indexOf(currentDay!)
    const tempArr = forecast?.forecastdays?.map(el => 
        el.hours?.filter((el, i) => i % 2 === 0))
        .flat()
        .map(el => el?.temp)
    const regExp = /(\w+\s\w+)/g
    const timeArr = forecast?.forecastdays?.map(el => 
        el.hours?.filter((el, i) => i % 2 === 0))
        .flat()
        .map(el => new Date(el?.time!).toLocaleDateString('en-us', { hour: '2-digit' }).match(regExp)![0])
        .reverse()
    const minTemp = tempArr?.reduce((a, b) => a! >= b! ?b :a)
    const maxTemp = tempArr?.reduce((a, b) => a! <= b! ?b :a)
    const deg = '°'
    const canvasWidth = 3927
    useEffect(() => {
        if (forecastDetails === 'summary') {
            const canvas = canvasRef.current
            const width = canvas!.width = 3927
            const height = canvas!.height = 200
            const ctx = canvas?.getContext('2d')
            const topLimit = height/100 * 20
            const bottomLimit = height/100 * 80
            const tempChartRange = bottomLimit-topLimit
            const tempRange = maxTemp!-minTemp!
            const lingrad = ctx?.createLinearGradient(0,50,0,200)
            lingrad?.addColorStop(0.6, '#9FB3BF')
            lingrad?.addColorStop(1, '#DCEAF2')
            ctx!.fillStyle = lingrad!;
            ctx!.lineWidth = 2
            ctx!.font = (' normal 14px Segoe UI, Tahoma, Verdana, sans-serif')
            ctx?.beginPath()
            let x = 0
            const y = height/2
            let xStep = width/tempArr!.length - 1
            ctx?.moveTo(x, y)
            for (let i = 0; i < tempArr!.length; i++) {
                let currentTemp = tempArr![i]!
                const yStep = topLimit + ((maxTemp!-currentTemp) * (tempChartRange/tempRange))
                i === 0 ?xStep = xStep/2 :xStep = width/tempArr!.length - 1
                ctx?.lineTo(x += xStep, yStep)
            }
            ctx?.lineTo(x += xStep, y)
            ctx?.lineTo(x += xStep, height)
            ctx?.lineTo(0, height)
            ctx?.lineTo(0, y)
            ctx?.fill()
            ctx?.beginPath()
            ctx!.fillStyle = '#6D808C';
            ctx?.translate(0, 10)
            const yShiftUp = height/100 * 10
            for (let i = 0; i < tempArr!.length; i++) {
                let currentTemp = tempArr![i]!
                const yStepWithShiftUp = topLimit + ((maxTemp!-currentTemp) * 
                (tempChartRange/tempRange)) - yShiftUp
                i === 0 ?xStep = xStep/2 :xStep = width/tempArr!.length - 1
                ctx?.translate(xStep, 0)
                ctx?.fillText(currentTemp.toString() + deg, 0, yStepWithShiftUp)
            }
            for (let i = 0; i < timeArr!.length; i++) {
                let currentTime = timeArr![i]!
                const yShiftDawn = height/100 * 90
                ctx?.translate(- xStep, 0)
                ctx?.fillText(currentTime, xStep, yShiftDawn)
            }
            for (let i = 0; i < forecast?.forecastdays?.length!; i++) {
                ctx!.font = (' 600 14px Segoe UI, Tahoma, Verdana, sans-serif')
                i === 0 ?ctx?.translate(xStep, 0) :ctx?.translate(xStep*12, 0)
                ctx?.fillText(convertDate(forecast?.forecastdays![i]!.date!), 0, yShiftUp)
            }
            ctx?.fill()
            ctx?.closePath()    
        } else {
            return
        }
    }, [isCel, forecastDetails])
    const currentTempChart = () => {  
        let stepOffset = 0
        let offset = canvasWidth/forecast?.forecastdays?.length!
        stepOffset = offset * currentDayIndex!
        return stepOffset
    }
    return (
        <div className={style.hourlyForecast}>
            <div className={style.hourlyForecast__nav}>
                <button 
                    className={forecastDetails === 'summary'
                        ?style.hourlyForecast__linkActive 
                        :style.hourlyForecast__link
                    }
                    onClick={() => dispatch(selectedForecastDetails('summary'))}
                >
                    Summary
                </button>
                <button
                    className={forecastDetails === 'hourly'
                        ?style.hourlyForecast__linkActive 
                        :style.hourlyForecast__link
                    }
                    onClick={() => dispatch(selectedForecastDetails('hourly'))}
                >
                    Hourly
                </button>
            </div>
                { forecastDetails === 'summary'
                ?<div className={style.hourlyForecast__canvasContainer}>
                    <canvas 
                        style={{
                            transform: `translateX(-${currentTempChart()}px)`,
                            transition: '1s'
                        }}
                        ref={canvasRef}
                    >
                    </canvas>
                </div>
                :<div className={style.hourlyForecast__hourly}>
                    Hourly forecast
                </div>}
        </div>
    );
};

export default HourlyForecast;