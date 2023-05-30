import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { FieldErrorsImpl } from 'react-hook-form'
import { isRequired, isValidEmail, isValidPassword } from '../form-validation'
import GenericField from '../GenericField/GenericField'
import { FIELD_TYPE } from '../types'
import JGForm from './JGForm'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/JGForm',
  component: JGForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof JGForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JGForm> = (args) => {
  const [error, setError] = useState<FieldErrorsImpl>({})
  const onError = (err: FieldErrorsImpl) => {
    if (shallowCompare(err, error)) return
    setError({ ...err })
  }
  return (
    <JGForm {...{ ...args, onError: onError }}>
      <GenericField
        validation={{
          isRequired: isRequired('Ohh no!'),
        }}
        type={FIELD_TYPE.TextField}
        props={{
          name: 'name',
          label: 'Your name please?',
          labelWidth: '100%',
        }}
      />
      <GenericField
        type={FIELD_TYPE.TextField}
        props={{
          type: 'password',
          name: 'password',
          label: 'Your Password, please!',
          placeholder: '********',
          labelWidth: '100%',
        }}
        validation={{
          isRequired: isRequired('Sorry, put a password'),
          password: isValidPassword(
            'sorry, password should be at least 8 char, should contain 1 special char and 1 number'
          ),
        }}
      />
      <GenericField
        type={FIELD_TYPE.TextArea}
        props={{
          name: 'description',
          label: 'More about yourself:',
          labelWidth: '100%',
        }}
        validation={{ email: isValidEmail('Please, put your email address') }}
      />
      <GenericField
        type={FIELD_TYPE.Checkbox}
        props={{
          name: 'isMarried',
          label: 'I am married',
          value: true,
        }}
      />
      <GenericField
        type={FIELD_TYPE.CheckboxGroup}
        props={{
          name: 'food',
          label: 'Your Favourite Food:',
          items: [
            { name: 'Pizza', value: 'pizza', cap: 'Pizza' },
            { name: 'Pasta', value: 'pasta', cap: 'Pasta' },
            { name: 'Burger', value: 'burger', cap: 'Burger' },
          ],
          value: 'pizza',
        }}
      />
      <GenericField
        type={FIELD_TYPE.CheckboxGroup}
        props={{
          type: 'radio',
          name: 'gender',
          label: 'I am a',
          items: [
            { name: 1, value: 'male', cap: 'Male' },
            { name: 2, value: 'female', cap: 'Female' },
            { name: 3, value: 'unknown', cap: 'Others' },
          ],
          value: 'male',
        }}
      />

      <input className="px-4 py-2 bg-black text-white mx-auto rounded cursor-pointer shadow-md" type="submit" />
    </JGForm>
  )
}

export const Primary = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  // onSubmit: (value) => console.log(value),
  className: 'space-y-4 p-4 border rounded max-w-md mx-auto',
  onError: (error) => console.log('form story', error),
}

const shallowCompare = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) =>
  Object.keys(obj1).length === Object.keys(obj2).length && Object.keys(obj1).every((key) => obj1[key] === obj2[key])
