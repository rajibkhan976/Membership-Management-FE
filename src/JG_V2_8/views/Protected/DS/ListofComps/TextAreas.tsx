import React from 'react'
import TextArea from '@comps/uiComps/forms/TextArea/TextArea'

export const TextAreas = () => {
  const InputStatus = ['normal', 'success', 'error'] as const
  return (
    <div>
      <h1 className="pt-4 mb-2 text-center text-xl">Text Field Examples</h1>
      <div className="mb-8">
        <h2 className="mb-2 text-xl text-center">Example of Normal, Success, Error & Disable</h2>
        <div className="flex gap-x-1.5 flex-wrap justify-center">
          {InputStatus.map((status, i) => (
            <TextArea
              key={i}
              asterisk
              fieldsize="md"
              label="TextArea Basic"
              labelPosition="top"
              labelWidth={125}
              onValueChange={function noRefCheck() {}}
              placeholder="Enter text"
              rows={4}
              status={status}
            />
          ))}
          <div>
            <TextArea
              asterisk
              fieldsize="md"
              label="TextArea Basic"
              labelPosition="top"
              labelWidth={125}
              onValueChange={function noRefCheck() {}}
              placeholder="Enter text"
              rows={4}
              status="normal"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
