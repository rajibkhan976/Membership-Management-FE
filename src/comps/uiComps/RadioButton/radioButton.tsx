import classNames from 'classnames'
import H1 from '../Heading/H1'
type RadioButtonProps = {
  fontSize: 'small' | 'large'
  orientation: 'horizontal' | 'vertical'
  radioButton: { id: string; title: string }[]
  spacing: number
  smallScreenSpacing: number
  heading: string
  helpText: string
  HeadingclassName: string
  HelpTextclassName: string
  disable: boolean
}

function RadioButton(props: RadioButtonProps) {
  const {
    radioButton,
    fontSize = 'small',
    orientation = 'horizontal',
    spacing,
    smallScreenSpacing,
    heading,
    helpText,
    HeadingclassName,
    HelpTextclassName,
    disable,
  } = props

  const iconSize = classNames(fontSize === 'small' ? 'h-4 w-4' : 'h-5 w-5')

  const textSize = classNames(fontSize === 'small' ? 'text-sm' : 'text-base')

  const allignment = classNames(
    orientation === 'vertical' ? `space-y-${spacing}` : `flex flex-col md:flex md:flex-row md:flex-wrap`
  )

  const horizontalSpacing = classNames(
    orientation === 'vertical' ? '' : `md:py-${spacing}  ml-5 py-${smallScreenSpacing}`
  )

  const textSpacing = classNames(orientation === 'vertical' ? '' : 'ml-5')

  const fontColor = classNames(disable === true ? 'text-jg-metal-300' : 'text-gray-700')

  return (
    <div>
      {/* <H1 className={`text-base font-medium text-gray-900  ${b} ${className}`}>{heading}</H1> */}
      <H1 className={`${HeadingclassName} ${textSpacing}`} text={heading} />
      <p className={`${textSpacing} ${HelpTextclassName}`}>{helpText}</p>
      <fieldset className="mt-4">
        <div className={`${allignment}`}>
          {radioButton.map((notificationMethod) => (
            <div key={notificationMethod.id} className={`flex items-center ${horizontalSpacing}`}>
              <input
                id={notificationMethod.id}
                name="radio-button"
                type="radio"
                disabled={disable === true ? true : false}
                defaultChecked={notificationMethod.id === 'email'}
                className={`${iconSize} border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer`}
              />
              <label htmlFor={notificationMethod.id} className={`${textSize} ml-3 block  font-medium ${fontColor}`}>
                {notificationMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export default RadioButton
