import { Calendar } from 'src/components/Calendar'
import { Container, TimerPicker } from './styles'

export function CalendarStep() {
  const isDateSelected = true
  return (
    <Container>
      <Calendar />

      {isDateSelected && <TimerPicker />}
    </Container>
  )
}
