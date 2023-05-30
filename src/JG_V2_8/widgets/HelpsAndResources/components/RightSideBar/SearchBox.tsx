import { TextField } from '@comps/uiComps'
import { Search } from '@comps/uiComps/Icons'
import { JGListbox } from '@comps/uiComps'
import JGListboxItem from '@comps/uiComps/JGListbox/JGListboxItem'
import { catagoryData } from './Catagories'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const SearchBox = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  return (
    <>
      <div>
        <JGListbox
          size="md"
          className="text-jg-metal-700 mb-6 border rounded-sm border-jg-metal-100"
          type="input"
          onChange={(v) => setCategory(v.value + '')}
        >
          {catagoryData.map((item, index) => (
            <JGListboxItem key={index} name={item} value={item} className="text-jg-metal-700">
              {item}
            </JGListboxItem>
          ))}
        </JGListbox>
      </div>
      <div className="flex">
        <TextField
          hideLabel
          placeholder="What you're looking for!"
          className="flex-grow !mb-0"
          onValueChange={(v) => setQuery(v as string)}
        />
        <Link
          to={`../search?q=${query}&category=${category}`}
          className="px-2 bg-jg-green-500 inline-flex justify-center items-center  text-white w-10 cursor-pointer rounded-r-sm"
        >
          <Search className="w-4 h-4" />
        </Link>
      </div>
    </>
  )
}
export default SearchBox
