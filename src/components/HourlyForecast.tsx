import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks';
import style from './styles/HourlyForecast.module.scss'

const HourlyForecast: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const {forecast} = useAppSelector(state => state.weather.displayedWeather)
    const tempArr = forecast?.forecastdays?.map(el => el.hours?.map(el => el.temp)).flat()
    const minTemp = tempArr?.reduce((a, b) => a! >= b! ?b :a)
    const maxTemp = tempArr?.reduce((a, b) => a! <= b! ?b :a)
    useEffect(() => {
        const canvas = canvasRef.current
        const width = canvas!.width = 3927
        const height = canvas!.height = 200
        const ctx = canvas?.getContext('2d')
        const topLimit = height/100 * 20
        const bottomLimit = height/100 * 80
        const tempChartRange = bottomLimit-topLimit
        const tempRange = maxTemp!-minTemp!
        ctx!.lineCap = 'round'
        ctx!.fillStyle = '#9FB3BF'
        ctx!.lineWidth = 2
        ctx?.beginPath()
        let x = 0
        const y = height/2
        ctx?.moveTo(x, y)
        const xStep = width/tempArr!.length
        for (let i = 0; i < tempArr!.length; i++) {
            let currentTemp = tempArr![i]!
            const yStep = topLimit + ((maxTemp!-currentTemp) * (tempChartRange/tempRange))
            ctx?.lineTo(x += xStep, yStep)
        }
        ctx?.lineTo(x, height)
        ctx?.lineTo(0, height)
        ctx?.lineTo(0, y)
        ctx?.fill() 
    }, [])
    const currentTempChart = () => {
        if (forecast!.dayOfForecast === forecast!.forecastdays![0].date) {
            return style.hourlyForecast__canvas_firstDay
        } else if (forecast!.dayOfForecast === forecast!.forecastdays![1].date) {
            return style.hourlyForecast__canvas_secondDay
        } else if (forecast!.dayOfForecast === forecast!.forecastdays![2].date) {
            return style.hourlyForecast__canvas_thirdDay
        }
    }
    return (
        <div className={style.hourlyForecast}>
            <div className={style.hourlyForecast__nav}>
                Weather Chart
            </div>
            <div className={style.hourlyForecast__canvasContainer}>
                <canvas 
                    className={currentTempChart()}
                    ref={canvasRef}
                >
                </canvas>
            </div>
            <div className={style.hourlyForecast__footer}>
                Weather Chart
            </div>
        </div>
    );
};

export default HourlyForecast;