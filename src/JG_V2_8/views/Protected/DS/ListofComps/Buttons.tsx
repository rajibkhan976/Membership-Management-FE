import React from 'react'
import { Button } from '@comps/uiComps'
import { UserIcon } from '@heroicons/react/solid'
const Buttons = () => {
  const Sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
  const BtnColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'complementary'] as const

  return (
    <div>
      <h1 className="mb-2 text-center text-xl">Button Examples</h1>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Colors</h1>
        <div className="flex gap-x-1.5 justify-center">
          {BtnColors.map((color) => (
            <Button
              btnColor={color}
              btnSize="md"
              fillType="solid"
              iconPosition="right"
              onClick={() => {}}
              text="Button Primary"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Outline</h1>
        <div className="flex gap-x-1.5 justify-center">
          {BtnColors.map((color) => (
            <Button
              btnColor={color}
              btnSize="md"
              fillType="outline"
              iconPosition="right"
              onClick={() => {}}
              text="Button Primary"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Plain button</h1>
        <div className="flex gap-x-1.5 justify-center">
          {BtnColors.map((color) => (
            <Button
              btnColor={color}
              btnSize="md"
              fillType="plain"
              iconPosition="right"
              onClick={() => {}}
              text="Button Primary"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Rounded button</h1>
        <div className="flex gap-x-1.5 justify-center">
          {BtnColors.map((color) => (
            <Button
              btnColor={color}
              btnSize="md"
              fillType="solid"
              iconPosition="right"
              onClick={() => {}}
              rounded
              text="Button Primary"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Rounded outline</h1>
        <div className="flex gap-x-1.5 justify-center">
          {BtnColors.map((color) => (
            <Button
              btnColor={color}
              btnSize="md"
              fillType="outline"
              iconPosition="right"
              onClick={() => {}}
              rounded
              text="Button Primary"
            />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Size</h1>
        <div className="flex gap-x-1.5 justify-center">
          {Sizes.map((size) => (
            <div>
              <Button
                btnColor="primary"
                btnSize={size}
                fillType="solid"
                iconPosition="right"
                onClick={() => {}}
                text={'Button' + ' ' + size}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Disabled</h1>
        <div className="flex gap-x-1.5 justify-center">
          <Button
            btnColor="primary"
            btnSize="lg"
            disabled
            fillType="solid"
            iconPosition="right"
            onClick={() => {}}
            text="Button Primary"
          />
          <Button
            btnColor="secondary"
            btnSize="lg"
            disabled
            fillType="outline"
            iconPosition="right"
            onClick={() => {}}
            rounded
            text="Button secondary"
          />
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">With icon</h1>
        <div className="flex gap-x-1.5 justify-center">
          <Button
            btnColor="primary"
            btnSize="lg"
            fillType="solid"
            icon={<UserIcon />}
            iconPosition="left"
            onClick={() => {}}
            text="Button with icon"
          />
          <Button
            btnColor="success"
            btnSize="lg"
            fillType="solid"
            icon={<UserIcon />}
            iconPosition="right"
            onClick={() => {}}
            text="Button with icon"
          />
        </div>
      </div>
    </div>
  )
}

export default Buttons
