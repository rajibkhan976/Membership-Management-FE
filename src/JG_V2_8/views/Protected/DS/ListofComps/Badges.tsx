import React from 'react'
import { Badge } from '@comps/uiComps'
const Badges = () => {
  const Sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
  const Variants = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'complementary', 'grey'] as const
  return (
    <div>
      <h1 className="mb-2 text-center text-xl">Badge Examples</h1>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Badge Solid Colors</h1>
        <div className="flex gap-x-1.5 justify-center">
          {Variants.map((variant, i) => (
            <Badge key={i} fillType="solid" label="Badge" size="md" variant={variant} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Badge Faded</h1>
        <div className="flex gap-x-1.5 justify-center">
          {Variants.map((variant, i) => (
            <Badge key={i} fillType="faded" label="Badge" size="md" variant={variant} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Badge plain</h1>
        <div className="flex gap-x-1.5 justify-center">
          {Variants.map((variant, i) => (
            <Badge key={i} fillType="plain" label="Badge" size="md" variant={variant} />
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Size</h1>
        <div className="flex gap-x-1.5 justify-center">
          {Sizes.map((size, i) => (
            <div key={i} className="flex items-center flex-col justify-center">
              <Badge label="Badge" size={size} variant="primary" />
              <div>{size}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="mb-2 text-xl text-center">Shape</h1>
        <div className="flex gap-x-4 justify-center inter">
          <div className="flex items-center flex-col justify-center">
            <Badge variant="primary" className="" label="Badge" size="md" />
            <div>Rectangle</div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <Badge variant="primary" className=" " label="Badge" size="md" rounded />
            <div>Rounded</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Badges
