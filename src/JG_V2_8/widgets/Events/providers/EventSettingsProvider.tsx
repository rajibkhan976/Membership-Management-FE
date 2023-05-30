import { CompBaseProps } from '@comps/uiComps'
import { SystemSettigsProvider, createSystemSettigsContext } from '@jg/providers/SystemSettingsProvider'
import { useContext } from 'react'
import { useEventConfig } from '../EventWidget'

export const EventSettingsContext = createSystemSettigsContext()

export const EventSettingsProvider = ({ children }: CompBaseProps) => {
  return (
    <SystemSettigsProvider context={EventSettingsContext} keys={generateKeysformat}>
      {children}
    </SystemSettigsProvider>
  )
}

export const useEventSettingsContext = () => {
  const { systemSettings } = useContext(EventSettingsContext)
  const { isEvent } = useEventConfig()
  const mode = isEvent ? 'EVENT' : 'SHOP'
  const sysDistanceUnit = systemSettings['CLUB.CLUBFINDERDEFAULTDISTANCEUNIT'] || 'Mile'
  const sysRadiasLength = systemSettings['DEFAULT_RADIUS_LENGTH']
  const labelSettings = JSON.parse(systemSettings[`${mode}.LABEL_SETTING`] || '{}')

  return { systemSettings, sysDistanceUnit, sysRadiasLength, labelSettings }
}

const generateKeysformat = [
  `EVENT.TIME_FORMAT`,
  `EVENT.HERO_IMAGE`,
  `SHOP.HERO_IMAGE`,
  `EVENT.LABEL_SETTING`,
  `SHOP.LABEL_SETTING`,
  `EVENT.DEFAULT_IMAGE`,
  `SHOP.DEFAULT_IMAGE`,
  `EVENT.DEFAULT_RADIUS_LENGTH`,
  'CLUB.CLUBFINDERDEFAULTDISTANCEUNIT',
  'ORGANISATION.PAYMENTOUTPUTVERSION',
  'ORGANISATION.REGIONAL_ENTITY_IDENTITY',
  'ORGANISATION.SUB_REGIONAL_ENTITY_IDENTITY',
  'ENTITY.NGB_BRAND_COLOR',
  'ENTITY.REGION_BRAND_COLOR',
  'ENTITY.SUBREGION_BRAND_COLOR',
  'ENTITY.CLUB_BRAND_COLOR',
]
