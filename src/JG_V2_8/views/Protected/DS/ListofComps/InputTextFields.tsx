import TextField from '@comps/uiComps/forms/TextField/TextField'
import { CheckIcon, UserAddIcon } from '@heroicons/react/solid'

export const InputTextFields = () => {
  const InputStatus = ['normal', 'success', 'error'] as const
  const InputSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  return (
    <div>
      <h1 className="pt-4 mb-2 text-center text-xl">Text Field Examples</h1>
      <div className="mb-8">
        <h2 className="mb-2 text-xl text-center">Example of Normal, Success, Error & Disable</h2>
        <div className="flex gap-x-1.5 flex-wrap justify-center">
          {InputStatus.map((status, i) => (
            <TextField
              key={i}
              fieldsize="md"
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              labelWidth={120}
              onValueChange={function noRefCheck() {}}
              placeholder="Placeholder text"
              required
              status={status}
              type="text"
            />
          ))}
          <div>
            <TextField
              fieldsize="md"
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              labelWidth={120}
              onValueChange={function noRefCheck() {}}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl text-center">Example of TextField sizes</h2>
        <div className="flex gap-x-1.5 justify-center flex-wrap">
          {InputSizes.map((size, i) => (
            <TextField
              key={i}
              fieldsize={size}
              helpText={'Helper text ' + size}
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              labelWidth={120}
              onValueChange={function noRefCheck() {}}
              placeholder="Placeholder text "
              required
              status="normal"
              type="text"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-2 text-xl text-center">Example of TextField with icons</h2>
        <div className="flex gap-x-1.5 justify-center flex-wrap">
          <div>
            <TextField
              fieldsize="md"
              helpText="Helper text (with left icon)"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              leftIcon={<UserAddIcon />}
              onValueChange={function noRefCheck() {}}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
          <div>
            <TextField
              fieldsize="md"
              helpText="Helper text (with right icon)"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              rightIcon={<CheckIcon />}
              onValueChange={function noRefCheck() {}}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
          <div>
            <TextField
              fieldsize="md"
              helpText="Helper text (with both icon)"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="top"
              leftIcon={<UserAddIcon />}
              rightIcon={<CheckIcon />}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl text-center">Example of TextField with Different Label Position</h2>
        <div className="flex gap-x-4 flex-wrap justify-center">
          <div>
            <div className="pb-4">With inline label & no width</div>
            <TextField
              fieldsize="md"
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="left"
              labelWidth={0}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
          <div>
            <div className="pb-4">With inline label & fixed label width</div>
            <TextField
              fieldsize="md"
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelPosition="left"
              labelWidth={120}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
          <div>
            <div className="pb-4">No label Or hide label</div>
            <TextField
              fieldsize="md"
              hideLabel
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelWidth={120}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-x-4 flex-wrap justify-center bg-gray-100 p-4">
          <div>
            <div className="mb-4">Example of TextField with no border</div>
            <TextField
              fieldsize="md"
              hideBorder
              helpText="Helper text"
              id="someid"
              initialValue=""
              label="Your Name:"
              labelWidth={120}
              placeholder="Placeholder text"
              required
              status="normal"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
