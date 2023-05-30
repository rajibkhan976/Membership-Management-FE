const bgClass: any = {
  gray: ' bg-gray-300',
  red: ' bg-red-300',
  orange: ' bg-orange-300',
  yellow: ' bg-yellow-300',
  green: ' bg-green-300',
  teal: ' bg-teal-300',
  blue: ' bg-blue-300',
  indigo: ' bg-indigo-300',
  purple: ' bg-purple-300',
  pink: ' bg-pink-300	',
}

const addBackground = (label: string, baseClass: string | undefined): string | undefined => {
  let className: string | undefined = baseClass
  if (label) {
    className += bgClass[label]
  }
  return className
}

export default addBackground
