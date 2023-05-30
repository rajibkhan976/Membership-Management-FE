import StaticCard from './StaticCard'
import AnimatedCard from './AnimatedCard'

export type FlipUnitContainerProps = {
  digit: any
  shuffle: boolean
  unit: 'days' | 'hours' | 'minutes' | 'seconds'
}

function FlipUnitContainer({ digit, shuffle, unit }: FlipUnitContainerProps) {
  // assign digit values
  let currentDigit = digit
  let previousDigit: any = digit + 1

  if (['minutes', 'seconds'].includes(unit)) {
    previousDigit = previousDigit === 60 ? 0 : previousDigit
    // for hours
  } else if (unit === 'hours') {
    previousDigit = previousDigit === 24 ? 0 : previousDigit
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit
  const digit2 = !shuffle ? previousDigit : currentDigit

  // shuffle animations
  const animation1 = shuffle ? 'fold' : 'unfold'
  const animation2 = !shuffle ? 'fold' : 'unfold'

  return (
    <div className="flipUnitContainer">
      <StaticCard position="upperCard" digit={currentDigit} />
      <StaticCard position="lowerCard" digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
      <h2 className="clock-title">{unit}</h2>
    </div>
  )
}

export default FlipUnitContainer
