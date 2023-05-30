/* This example requires Tailwind CSS v2.0+ */
import { CompBaseProps } from '../../../../comps/uiComps/_base/types/CompBaseProps'
// import { Switch } from '@headlessui/react'
type SelectItemProps = CompBaseProps & {
  name?: string
  // content?: JSX.Element
}
export type DateFilterProps = CompBaseProps & {
  // className?: string,
  // isTrue?: boolean,
  activeItem?: number
  onSelect?: (value: string) => void
  items?: SelectItemProps[]
}

export default function DateFilter({ items = [], onSelect = (activeItem) => {} }: DateFilterProps) {
  // handleChange = (event) => {
  //     this.setState({ value: event.target.value });
  //   };
  //   const { options, value } = this.state;
  // const [selectItem,setselectItem] = useState("");
  return (
    <div className="w-56">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 hidden">
        Location
      </label>
      <select
        id="simpleSelect"
        name="select"
        className="inline-flex justify-between w-full w-56 border-l-gray-700
        border-r-gray-700 px-4 py-2 bg-white text-sm font-medium text-gray-400 leading-4"
        defaultValue="All Dates"
        // onChange={(index)=>{ console.log(index.id)}}
        // onChange={(index) => {
        //     console.log('selected:', index);
        //     //onSelect(index);

        //   }}
        onChange={(e) => {
          //   setselectItem(e.target.value)
          //   console.log(e.target.value)
          onSelect(e.target.value)
        }}
      >
        {items.map((select, index) => (
          <option key={index} id={select.id} value={select.name}>
            {select.name}
          </option>
        ))}
        {/* <MenuDown className="mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
      </select>
    </div>
  )
}
