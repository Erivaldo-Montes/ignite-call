import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>(null)

  function handleClearSelectesDateTime() {
    setSelectDateTime(null)
  }
  if (selectDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectDateTime}
        onCancelConfirmation={handleClearSelectesDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectDateTime} />
}
