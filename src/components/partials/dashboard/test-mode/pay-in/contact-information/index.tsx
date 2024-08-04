import * as z from 'zod'

import {
  contactInformationSchema,
  IStepperNextProps,
} from '@/data/pay-in/contact-information.schema'
import ContactInformationForm from './contact-information-form'

const ContactInformation = (
  props: IStepperNextProps<z.infer<typeof contactInformationSchema>>
) => {
  return <ContactInformationForm onNextStep={props.onNextStep} />
}

export default ContactInformation
