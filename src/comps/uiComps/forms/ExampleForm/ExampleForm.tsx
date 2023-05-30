import { useState } from 'react'
import { UserIcon, MailIcon } from '@heroicons/react/solid'
import { TextAreaInput, TextInput, Checkbox, CheckBoxGroup } from '..'

function ExampleForm({ onChange }: { onChange: (state: any) => void }) {
  const [info, setInfo] = useState(STATE_F)

  const { fname, lname, email, dob, gender, isMarried, description } = info

  const handleChange = (field: keyof typeof info, value: any) => {
    const updatedField = { ...info[field], value }
    setInfo({ ...info, [field]: updatedField })
    // setInfo({ ...info, [field]: { ...[field], value: value } });
  }

  console.log('New State: ', info)
  onChange && onChange(info)

  return (
    <form className="space-y-4 p-4 border rounded max-w-md mx-auto">
      {/* First Name */}
      <TextInput
        label={fname.label}
        initialValue={fname.value}
        leftIcon={fname.leftIcon}
        onValueChange={(value) => handleChange('fname', value)}
      />
      {/* Last Name */}
      <TextInput
        label={lname.label}
        initialValue={lname.value}
        onValueChange={(value) => handleChange('lname', value)}
      />
      {/* Email */}
      <TextInput
        label={email.label}
        initialValue={email.value}
        onValueChange={(value) => handleChange('email', value)}
      />
      Value
      {/* Date of Birth */}
      <TextInput
        type="date"
        label={dob.label}
        initialValue={dob.value}
        onValueChange={(value) => handleChange('dob', value)}
      />
      {/* gender */}
      <CheckBoxGroup
        type="radio"
        label={gender.label}
        items={gender.options}
        value={gender.value}
        onValueChange={(value) => handleChange('gender', value)}
      />
      {/* isMarried */}
      <Checkbox
        label={isMarried.label}
        value={isMarried.value}
        onValueChange={(value) => handleChange('isMarried', value)}
      />
      {/* description */}
      <TextAreaInput
        rows={3}
        label={description.label}
        initialValue={description.value}
        onValueChange={(value) => handleChange('description', value)}
      />
    </form>
  )
}

export default ExampleForm

const STATE_F = {
  fname: {
    label: 'First Name',
    value: 'Mehedi',
    leftIcon: <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
  lname: {
    label: 'Last Name',
    value: 'Hasan',
  },
  email: {
    label: 'Email',
    value: 'mehedi@justgo.com',
    leftIcon: <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
  },
  dob: {
    label: 'Date of Birth',
    value: '06/02/1980',
  },
  gender: {
    label: 'Gender',
    options: [
      { name: 1, value: 'male', cap: 'Male' },
      { name: 2, value: 'female', cap: 'Female' },
      { name: 3, value: 'unknown', cap: 'Others' },
    ],
    value: 'male',
  },
  isMarried: {
    label: "I'm married",
    value: true,
  },
  description: {
    label: 'Description',
    value: "Hi, I'm Mehedi hasan, a senior frontend developer at justgo.",
  },
}
