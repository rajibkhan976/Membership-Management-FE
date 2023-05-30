export type StaticCardProps = {
  position: 'upperCard' | 'lowerCard'
  digit: number
}

function StaticCard({ position, digit }: StaticCardProps) {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  )
}

export default StaticCard
