import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  // checks if the user and date is correct
  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'year or month not specified.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'user does not exits.' })
  }

  const availableWeeksDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeeksDays.some((availableWeekDay) => {
      return availableWeekDay.week_day === weekDay
    })
  })

  const blockedDatesRaw: Array<{ date: string }> = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM S.date) AS date, 
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.date),
      (UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60

    HAVING amount >= size 
     
  `
  const blockedDate = blockedDatesRaw.map((items) => items.date)
  console.log(blockedDatesRaw)

  return res.json({ blockedWeekDays, blockedDate })
}
