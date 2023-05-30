export type AnimatedCardProps = {
  animation: 'fold' | 'unfold'
  digit: number
}

function AnimatedCard({ animation, digit }: AnimatedCardProps) {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  )
}

export default AnimatedCard
