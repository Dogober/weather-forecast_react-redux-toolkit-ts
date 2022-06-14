import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const {isCel} = useAppSelector(state => state.weather)
    const currentDay = forecast?.forecastdays?.find(el => el.date === forecast.dayOfForecast)
    const currentDayIndex = forecast?.forecastdays?.indexOf(currentDay!)
    const tempArr = forecast?.forecastdays?.map(el => 
        el.hours?.filter((el, i) => i % 2 !== 0))
        .flat()
        .map(el => el?.temp)
    const regExp = /(\w+\s\w+)/g
    const timeArr = forecast?.forecastdays?.map(el => 
        el.hours?.filter((el, i) => i % 2 !== 0))
        .flat()
        .map(el => new Date(el?.time!).toLocaleDateString('en-us', { hour: '2-digit' }).match(regExp)![0])
        .reverse()
    const minTemp = tempArr?.reduce((a, b) => a! >= b! ?b :a)
    const maxTemp = tempArr?.reduce((a, b) => a! <= b! ?b :a)
    const deg = '°'
    const canvasWidth = 3927
    useEffect(() => {
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
        const xStep = width/tempArr!.length - 1
        ctx?.moveTo(x, y)
        for (let i = 0; i < tempArr!.length; i++) {
            let currentTemp = tempArr![i]!
            const yStep = topLimit + ((maxTemp!-currentTemp) * (tempChartRange/tempRange))
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
        for (let i = 0; i < tempArr!.length; i++) {
            let currentTemp = tempArr![i]!
            const yStepWithShiftUp = topLimit + ((maxTemp!-currentTemp) * (tempChartRange/tempRange)) - 25
            const xShiftLeft = -10
            ctx?.translate(xStep, 0)
            ctx?.fillText(currentTemp.toString() + deg, xShiftLeft, yStepWithShiftUp)
        }
        for (let i = 0; i < timeArr!.length; i++) {
            let currentTime = timeArr![i]!
            const xShiftRight = 90
            const yShiftDawn = height/100 * 90
            ctx?.translate(- xStep, 0)
            ctx?.fillText(currentTime, xShiftRight, yShiftDawn)
        }
        ctx?.fill()
        ctx?.closePath()
    }, [isCel])
    const currentTempChart = () => {  
        let stepOffset = 0
        let offset = canvasWidth/forecast?.forecastdays?.length!
        stepOffset = offset * currentDayIndex!
        return stepOffset
    }
    return (
        <div className={style.hourlyForecast}>
            <div className={style.hourlyForecast__nav}>
                Weather Chart
            </div>
            <div className={style.hourlyForecast__canvasContainer}>
                <canvas 
                    style={{
                        transform: `translateX(-${currentTempChart()}px)`,
                        transition: '1s'
                    }}
                    ref={canvasRef}
                >
                </canvas>
            </div>
        </div>
    );
};

export default HourlyForecast;