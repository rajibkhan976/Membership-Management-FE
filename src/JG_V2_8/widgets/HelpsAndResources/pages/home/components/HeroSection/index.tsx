import { Button } from '@comps/uiComps'
import { SearchField } from '@jg/common/comps'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryList from './CategoryList'
import PopoverSearchResult from './PopoverSearchResult'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const navigate = useNavigate()

  return (
    <div className="relative">
      <div className="h-[242px] lg:h-[216px] bg-helpsAndResourcesBG bg-no-repeat bg-cover brightness-[0.3]"></div>

      <div className="absolute inset-4 md:inset-9 flex flex-col items-center text-center">
        <h1 className="text-white text-base leading-5 font-semibold md:text-xl md:leading-6">
          JustGo Help & Resources Center
        </h1>
        <h5 className="text-globalTextSizeSm leading-[18px] font-normal text-jg-metal-50 mt-2 md:text-base md:leading-5">
          Central hub for knowledge base and information. Anyone can find articles, tutorials & support from us.
        </h5>

        <div className="bg-white rounded-sm w-full md:w-auto divide-y mt-4 md:mt-6 md:flex items-center md:divide-x divide-jg-metal-50 relative">
          <CategoryList categories={CATEGORIES} onChange={(v) => setCategory(v.value + '')} />
          <div className="relative md:min-w-[448px]">
            <SearchField placeholder="Search for topics..." className="h-10" onChange={(value) => setQuery(value)} />
            <PopoverSearchResult open={Boolean(query)} query={query} />
          </div>
          <div className="p-1 md:!border-0">
            <Button
              text="Search"
              block
              textAllign="center"
              onClick={() => navigate(`search?q=${query}&category=${category}`)}
            />
          </div>
        </div>

        <div className="text-[13px] font-semibold leading-4 text-jg-metal-200 mt-3 hidden visible md:block">
          Recent searches:{' '}
          {RECENT_SEARCHES.map((query, i) => (
            <a key={i} href="#" className="font-medium text-jg-green-500">
              {query}
              {i !== RECENT_SEARCHES.length - 1 && ', '}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection

const CATEGORIES = [
  {
    name: 'One',
    value: 'one',
  },
  {
    name: 'Two',
    value: 'two',
  },
  {
    name: 'Three',
    value: 'three',
  },
  {
    name: 'Four',
    value: 'four',
  },
]

const RECENT_SEARCHES = ['Get Started', 'Manage Service', 'Payment Setup']
