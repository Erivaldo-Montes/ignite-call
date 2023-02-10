import { Calendar } from 'src/components/Calendar'
import {
  Container,
  TimerPicker,
  TimerPickerHeader,
  TimerPickerItem,
  TimerPickerList,
} from './styles'

export function CalendarStep() {
  const isDateSelected = true
  return (
    <Container isTimePicker={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimerPicker>
          <TimerPickerHeader>
            Terça-feira <span>20 de setembro</span>
          </TimerPickerHeader>
          <TimerPickerList>
            <TimerPickerItem>08:00h</TimerPickerItem>
            <TimerPickerItem>09:00h</TimerPickerItem>
            <TimerPickerItem>10:00h</TimerPickerItem>
            <TimerPickerItem>11:00h</TimerPickerItem>
            <TimerPickerItem>12:00h</TimerPickerItem>
            <TimerPickerItem>13:00h</TimerPickerItem>
            <TimerPickerItem>14:00h</TimerPickerItem>
            <TimerPickerItem>15:00h</TimerPickerItem>
            <TimerPickerItem>16:00h</TimerPickerItem>
            <TimerPickerItem>17:00h</TimerPickerItem>
            <TimerPickerItem>18:00h</TimerPickerItem>
          </TimerPickerList>
        </TimerPicker>
      )}
    </Container>
  )
}
