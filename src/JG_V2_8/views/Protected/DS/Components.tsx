import React from 'react'
import Avatars from '../DS/ListofComps/Avatars'
import { InputTextFields } from '../DS/ListofComps/InputTextFields'
import Buttons from '../DS/ListofComps/Buttons'
import Badges from './ListofComps/Badges'
import { TextAreas } from './ListofComps/TextAreas'
function Components() {
  return (
    <div className="components-wrapper p-4">
      <Buttons />
      <Avatars />
      <Badges />
      <div>
        <InputTextFields />
      </div>
      <TextAreas />
    </div>
  )
}

export default Components
