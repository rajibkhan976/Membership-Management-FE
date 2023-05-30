import { Button } from '@comps/uiComps'
import BottomSection from '@comps/uiComps/HelpHomeDesign/BottomSection'
import { ContentSection } from '@jg/common/comps'
import React from 'react'

const CallToActionSection = () => {
  return (
    <div>
      <ContentSection
        className="bg-white"
        heading="Can't Find What you're Looking for?"
        caption="Feel free to contact us by clicking on the button below"
      >
        <div className="flex justify-center items-center">
          {/* @ts-ignore */}
          <Button text="Talk to us" className="mx-auto" as="a" href="mailto:support@justgo.com" />
        </div>
      </ContentSection>
    </div>
  )
}

export default CallToActionSection
