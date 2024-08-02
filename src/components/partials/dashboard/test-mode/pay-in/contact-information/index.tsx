import { IStepperNextProps } from '@/data/pay-in/contact-information.schema'
import ContactInformationForm from './contact-information-form'

const ContactInformation = (props: IStepperNextProps) => {
  return <ContactInformationForm onNextStep={props.onNextStep} />
}

export default ContactInformation
