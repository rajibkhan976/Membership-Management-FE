import Input from '../Figma/input'
import MultiSelect from '../formControls/multiSelect'
import H1 from '../Heading/H1'
import H2 from '../Heading/H2'
import InputAll from './inputAll'
import InputDatePicker from './inputDatePicker'
import InputDatePickerRange from './inputDatePickerRange'

const TestFile = () => {
  const dataA = [
    {
      id: '1',
      title: 'Test File',
      content: 'lorem ipsum dolor sit am lorem ipsum dolor',
      isOpen: false,
    },
    {
      id: '2',
      title: 'Test File',
      content: 'lorem ipsum dolor sit am lorem ipsum dolor',
      isOpen: false,
    },
    {
      id: '3',
      title: 'Test File',
      content: 'lorem ipsum dolor sit am lorem ipsum dolor',
      isOpen: false,
    },
    {
      id: '4',
      title: 'Test File',
      content: 'lorem ipsum dolor sit am lorem ipsum dolor',
      isOpen: true,
    },
    {
      id: '5',
      title: 'Test File',
      content: 'lorem ipsum dolor sit am lorem ipsum dolor',
      isOpen: false,
    },
  ]
  return (
    <div className="">
      <div className="container mx-auto">
        <Input
          label={'Label'}
          id={''}
          value={''}
          name={''}
          type={'email'}
          handleChange={undefined}
          placeholder={'placeholder'}
          required
        />
        <div className="mb-4">
          <InputDatePicker
            label={'Date'}
            id={''}
            value={''}
            name={''}
            handleChange={undefined}
            required
            placeholder={''}
          />
        </div>
        <div className="mb-4">
          <InputDatePickerRange
            label={['Start Date', 'End Date']}
            id={''}
            value={['', '']}
            name={''}
            handleChange={undefined}
            required={true}
            placeholder={''}
          />
        </div>
        <div className="mb-4">
          <input type="range" id="vol" name="vol" min="0" max="50" multiple />
        </div>

        <div className="mb-4">
          <H1 text="Hello, I'm  Heading 1" />
          <H2 text="Hello, I'm  Heading 2" />
          {[1, 2, 3, 4, 5, 6].map((item, i: number) => (
            <H1 text="I'm  Heading 3" />
          ))}
        </div>
        <div className="mb-4">
          <InputAll />
        </div>
        <div className="mb-4">
          <MultiSelect
            id={''}
            options={[]}
            disabled={false}
            name={''}
            onChange={function (value: string): void {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TestFile
