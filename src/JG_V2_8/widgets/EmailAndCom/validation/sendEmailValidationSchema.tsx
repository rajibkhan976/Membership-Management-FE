import * as Yup from 'yup'

const sendEmailValidationSchema = Yup.object({
  EmailId: Yup.number().required('Email Id is required'),
  OwningEntityIdSyncGuid: Yup.string().required(),
  Sender: Yup.string().email('Invalid email').required('Sender is required'),
  SegmentId: Yup.number().min(1, 'Segment is required').required('Segment is required'),
  Subject: Yup.string().min(1).max(300).required('Subject is required'),
  // Status: Yup.number().required(),
  // ScheduledTime: Yup.string().when('Status', {
  //   is: 1,
  //   then: Yup.string().required()
  // }),
  // Body: Yup.string().when('Status', {
  //   is: 1 || 0,
  //   then: Yup.string().required('Email body is required')
  // }),
  Body: Yup.string().required('Email body is required'),
  // Tags: Yup.array().of(Yup.string().min(1).max(10)),
  // IsTemplate: Yup.boolean().required(),
  // BodyInJson: Yup.string().when('IsTemplate', {
  //   is: true,
  //   then: Yup.string().required()
  // }),
  // TestSend: Yup.boolean().required(),
  // TestRecipient: Yup.string().when('TestSend', {
  //   is: true,
  //   then: Yup.string().email().required()
  // }),
  // SendToFamilyMember: Yup.boolean().required()
  // ScheduledTime: Yup.string().nullable().when('ScheduleTimeZoneId', {
  //   is: (i: number) => console.log(i > 0),
  //   then: Yup.string().required()
  // }),
})

export { sendEmailValidationSchema }
