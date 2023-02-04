import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { convertTimeStringToMinutes } from 'src/utils/convert-time-string-to-minutes'
import { getWeekDays } from 'src/utils/get-week-day'
import { z } from 'zod'
// import { api } from "../../../lib/axios"
import { Container, Header } from '../styles'
import {
  FormErrors,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

const timeIntervalFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        startTime: z.string(),
        endTime: z.string(),
        enabled: z.boolean(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true),
    )
    .refine((intervals) => intervals.length > 0, {
      // após a transformação dos dados tem que usar o refine para validações
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de termino deve ser pelo menos 1h distante do início',
      },
    ),
})

// tipo antes da tranformação
type timeIntervalFormInput = z.input<typeof timeIntervalFormSchema>

// tipo depois de tranformação
type timeIntervalFormOutput = z.output<typeof timeIntervalFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<timeIntervalFormInput>({
    resolver: zodResolver(timeIntervalFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  // cria um array interavél com os valores de um campo do hook-form
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const formData = data as timeIntervalFormOutput
    console.log(formData)
  }
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  {/* permite que elementos não nativos do html altere campos do formulário */}
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalsContainer>

        {errors.intervals && (
          <FormErrors size={'sm'}>{errors.intervals.message}</FormErrors>
        )}
        <Button type="submit" disabled={isSubmitting}>
          proximo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
