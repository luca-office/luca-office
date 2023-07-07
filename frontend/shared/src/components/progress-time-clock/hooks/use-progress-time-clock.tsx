import React from "react"
import {convertSecondsToTimeString, now} from "../../../utils/date"

export interface UseProgressTimeClock {
  readonly timeVisible: boolean
  readonly dateValue: Date
  readonly percentWidth: number
  readonly remainingTimeString: string
  readonly handleTimeClick: () => void
  readonly isTimeElapsed: boolean
}

export const useProgressTimeClock = (
  fictiveDate: Date | undefined,
  scenarioTimeInSeconds?: number
): UseProgressTimeClock => {
  const [timeVisible, setTimeVisible] = React.useState(true)
  const [dateValue, setDateValue] = React.useState(fictiveDate ?? now())
  const [remainingTime, setRemainingTime] = React.useState(scenarioTimeInSeconds ?? 0)
  const [startTime, setStartTime] = React.useState(Date.now())
  const isMounted = React.useRef<boolean>(false)

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    setStartTime(Date.now())
  }, [scenarioTimeInSeconds])

  React.useEffect(() => {
    const interval = setTimeout(() => {
      setDateValue(fictiveDate ?? now())
      setRemainingTime((scenarioTimeInSeconds ?? 0) - Math.round((Date.now() - startTime) / 1000))
    }, 1000)

    return () => {
      clearTimeout(interval)
    }
  }, [remainingTime])

  const percentWidth = remainingTime > 0 ? Math.floor((remainingTime * 100) / (scenarioTimeInSeconds ?? 0)) : 0
  const remainingTimeString = convertSecondsToTimeString(remainingTime)

  const handleTimeClick = () => {
    if (timeVisible && scenarioTimeInSeconds !== undefined) {
      setTimeVisible(false)
      setTimeout(() => {
        if (isMounted.current) {
          setTimeVisible(true)
        }
      }, 5000)
    }
  }

  return {
    timeVisible,
    dateValue,
    percentWidth,
    remainingTimeString,
    handleTimeClick,
    isTimeElapsed: remainingTime < 0
  }
}
