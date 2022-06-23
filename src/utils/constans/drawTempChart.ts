import { MutableRefObject } from "react";
import { IDisplayedForecast } from "../../models/IDisplayedWeather";
import { convertDate } from "./convertDate"

export const drawTempChart = (
    forecastDetails: string, 
    forecast?: IDisplayedForecast, 
    canvasRef?: MutableRefObject<HTMLCanvasElement | null>
    ) => {
    let tempArr = forecast?.forecastdays?.map(el => el.hours?.temp).flat()
        .filter((el, i) => i % 2 === 0)
    let timeArr = forecast?.forecastdays?.map(el => el.hours?.time).flat()
        .filter((el, i) => i % 2 === 0)
        .reverse()
    if (forecastDetails === 'summary') {
        const deg = '°'
        const canvas = canvasRef?.current
        const width = canvas!.clientWidth >= 3948 ?3948 :canvas!.clientWidth
        if (width <= 2700) {
            tempArr = tempArr?.filter((el, i) => i % 2 === 0)
            timeArr = timeArr?.filter((el, i) => i % 2 === 0)
        }
        const minTemp = tempArr?.reduce((a, b) => a! >= b! ?b :a)
        const maxTemp = tempArr?.reduce((a, b) => a! <= b! ?b :a)    
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
        ctx?.lineTo(x, height)
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
            let numberHours = width <= 2700 ?6 :12
            ctx!.font = (' 600 14px Segoe UI, Tahoma, Verdana, sans-serif')
            i === 0 ?ctx?.translate(xStep, 0) :ctx?.translate(xStep*numberHours, 0)
            ctx?.fillText(convertDate(forecast?.forecastdays![i]!.date!), 0, yShiftUp)
        }
        ctx?.fill()
        ctx?.closePath()
    } else {
        return
    }
}