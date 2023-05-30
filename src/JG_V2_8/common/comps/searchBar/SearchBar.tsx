import ZipcodeCountrycode from './PostcodeField'
import DateFilter from '../searchBar/DateFilter'
import SearchField from './SearchField'

export type SearchBarProps = {
  className?: string
  isTrue?: boolean
  // onClick?: (item: SearchBarProps)=> void;
  // datesOrder?: 'order-1' | 'order-2' | 'order-3'
  // zipcodeOrder?: 'order-1' | 'order-2' | 'order-3'
  // searchOrder?: 'order-1' | 'order-2' | 'order-3'
}

export default function SearchBar({ ...props }: SearchBarProps) {
  return (
    <div className="relative flex w-[61rem] border rounded-2 text-[#008345]">
      <div className="w-full">
        <div className="w-full flex flex-row">
          <ZipcodeCountrycode />
          <div className="align-middle flex items-center border-r border-l">
            <DateFilter />
          </div>
          <SearchField type="button" />
        </div>
      </div>
    </div>
  )
}
