interface getWeekDaysProps {
  short?: boolean
}

export function getWeekDays({ short = false }: getWeekDaysProps = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2022, 1, day))))
    .map((weekday) => {
      if (short) {
        return weekday.substring(0, 3).toUpperCase()
      }

      // capitaliza o texto
      return weekday.substring(0, 1).toUpperCase().concat(weekday.substring(1))
    })
}
