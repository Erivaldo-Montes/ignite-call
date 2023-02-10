import { Button, Text, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormHeader, FormActions } from './styles'

export function ConfirmStep() {
  function handleConfirmScheduling() {}
  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro de 2021
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size={'sm'}>Seu nome completo</Text>
        <TextInput placeholder="seu nome" />
      </label>

      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput type={'email'} placeholder="jhondoe@example.com" />
      </label>
      <label>
        <Text size={'sm'}>Observações</Text>
        <TextInput />
      </label>

      <FormActions>
        <Button type={'button'} variant={'tertiary'}>
          cancelar
        </Button>
        <Button type={'submit'}>confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
