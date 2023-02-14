import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getWeekDays } from 'src/utils/get-week-day'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previuosMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previuosMonthDate)
  }

  function handleNextMonth() {
    const nextMonthdate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthdate)
  }
  const weekDaysShort = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previuosMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    return [...previuosMonthFillArray, ...daysInMonthArray]
  }, [currentDate])

  console.log(calendarWeeks)

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="previous month">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekDaysShort.map((weekday) => {
              return <th key={weekday}>{weekday}.</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              {' '}
              <CalendarDay>3</CalendarDay>
            </td>
            <td>
              <CalendarDay>4</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              {' '}
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              {' '}
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              {' '}
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              {' '}
              <CalendarDay>3</CalendarDay>
            </td>
            <td>
              <CalendarDay>4</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
