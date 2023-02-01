import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
// import { api } from "../../../lib/axios"
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

export default function TimeIntervals() {
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

      <IntervalBox>
        <IntervalsContainer as="form">
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size={'sm'} type="time" step={60} />
              <TextInput size={'sm'} type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>terça-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size={'sm'} type="time" step={60} />
              <TextInput size={'sm'} type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>
        <Button>
          proximo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
