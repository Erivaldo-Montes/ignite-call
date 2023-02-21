import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { api } from 'src/lib/axios'
import { z } from 'zod'
import { ConfirmForm, FormHeader, FormActions, FormError } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa de no mínimo três caracteres' }),
  email: z.string().email({ message: 'digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type confirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: confirmFormData) {
    const { email, name, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>
      <label>
        <Text size={'sm'}>Seu nome completo</Text>
        <TextInput placeholder="seu nome" {...register('name')} />
        {errors.name && (
          <FormError size={'sm'}>{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput
          type={'email'}
          placeholder="jhondoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size={'sm'}>Observações</Text>
        <TextInput {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type={'button'}
          variant={'tertiary'}
          onClick={onCancelConfirmation}
        >
          cancelar
        </Button>
        <Button type={'submit'} disabled={isSubmitting}>
          confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
