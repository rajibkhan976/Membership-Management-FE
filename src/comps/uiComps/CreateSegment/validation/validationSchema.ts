import * as Yup from 'yup'
import { segmentFourFieldsNotRequired } from '../../../../constant'

const validationSchema = Yup.object({
  Title: Yup.string().required('Segment name is required'),
  SegmentExpression: Yup.array(
    Yup.object({
      RuleType: Yup.string().required('This field is required'),
      Field: Yup.string().required('This field is required'),
      Value: Yup.string().when('Operator', {
        is: (Operator: string) => segmentFourFieldsNotRequired.includes(Operator),
        then: Yup.string(),
        otherwise: Yup.string().required('Field is required'),
      }),
      Operator: Yup.string().required('This Operator is required'),
    })
  ).min(1),
})

const AdvanchSearchvalidationSchema = Yup.object({
  SegmentExpression: Yup.array(
    Yup.object({
      RuleType: Yup.string().required('This field is required'),
      Field: Yup.string().required('This field is required'),
      Value: Yup.string().when('Operator', {
        is: (Operator: string) => segmentFourFieldsNotRequired.includes(Operator),
        then: Yup.string(),
        otherwise: Yup.string().required('Field is required'),
      }),
      Operator: Yup.string().required('This Operator is required'),
    })
  ).min(1),
})

const BasicSearchvalidationSchema = Yup.object({
  email: Yup.string().email(),
  dateRange: Yup.string()
})

export { validationSchema, AdvanchSearchvalidationSchema, BasicSearchvalidationSchema }
