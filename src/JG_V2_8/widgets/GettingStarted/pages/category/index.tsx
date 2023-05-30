import { Button } from '@comps/uiComps'
import { SearchField } from '@jg/common/comps'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MobileSecondaryNav from '../../components/MobileSecondaryNav'
import RightSideBar from '../../components/RightSideBar/index'
import SecondaryNav from '../../components/SecondaryNav'
import type { CategoryType } from '../../store/Interface'
import useGettingStartedStore from '../../store/useGettingStarted'
import PopoverSearchResult from '../home/components/HeroSection/PopoverSearchResult'
import CatagoryCards from './components/CatagoryCards'

const Category = () => {
  const { category } = useParams()
  const [first, setfirst] = useState<string>('All')
  const [categoryItem, setCategoryItem] = useState<CategoryType | null>(null)
  const [filterData, setFilterData] = useState<any[]>([])
  const { categories, getContentsByIdsCategoryType, contentByIds, tabsItems } = useGettingStartedStore((state) => state)

  const [query, setQuery] = useState('')
  const [queryData, setQueryData] = useState('')

  const contents = useGettingStartedStore((state) => state.contents)

  const filteredItems = contents.filter(
    (item: any) =>
      item.title.toLowerCase().includes(query && query.length > 2 && queryData) ||
      item.relatedword?.toLowerCase().includes(query && query.length > 2 && queryData) ||
      item.description.toLowerCase().includes(query && query.length > 2 && queryData)
  )

  const fruits = filteredItems
  const citrus2 = fruits.slice(0, 5)

  const cData = () => {
    const categoryItemTemp = categories.find((e) => e.name == category)
    getContentsByIdsCategoryType(categoryItemTemp?.articles || [])
    setFilterData([])
    setfirst('All')
    categoryItemTemp && setCategoryItem(categoryItemTemp)
  }

  useEffect(() => {
    cData()
  }, [category])

  const dataArray = () => {
    query
      .toLowerCase()
      .split(' ')
      .forEach((item) => {
        setQueryData(item)
      })
  }

  useEffect(() => {
    dataArray()
  }, [query])

  const OnBtnFilterHandle = (text: string) => {
    if (text !== 'All' && contentByIds && contentByIds.length > 0) {
      const filterResult = contentByIds.filter((e) => e.type === text)
      setfirst(text)
      setFilterData(filterResult)
    } else {
      setfirst(text)
      setFilterData(contentByIds)
    }
  }

  return (
    <>
      <div className='"w-full bg-[#fafafa] flex'>
        <div className="w-full flex justify-center flex-col">
          <div className="w-full max-w-[1170px] justify-center mx-auto my-0">
            <img
              className="w-full h-[300px] object-cover jg-hidden md:flex"
              src={categoryItem?.CategoryleadImage}
              alt="banner"
            />
            <SecondaryNav
              className="jg-hidden capitalize md:flex"
              title={category?.replace('-', ' ')}
              navigateValue={-1} // need to check , it was ../ which is wrong
            />
            <MobileSecondaryNav className="flex md:hidden" />
            <div className="flex md:justify-end justify-center  md:flex-wrap flex-wrap">
              <div className="w-full">
                <div className="pt-4 text-right">
                  <Button
                    btnColor="primary"
                    btnSize="lg"
                    fillType={first === 'All' ? 'solid' : 'plain'}
                    iconPosition="left"
                    onClick={() => OnBtnFilterHandle('All')}
                    rounded={false}
                    state="default"
                    text={'All'}
                    textAllign="center"
                  />
                  {tabsItems.length > 0 &&
                    tabsItems.map((item, index) => (
                      <Button
                        key={index}
                        btnColor="primary"
                        btnSize="lg"
                        fillType={first === item ? 'solid' : 'plain'}
                        iconPosition="left"
                        onClick={() => OnBtnFilterHandle(item)}
                        rounded={false}
                        state="default"
                        text={item}
                        textAllign="center"
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="px-4">
              <div className="bg-white rounded-sm w-full md:w-auto divide-y mt-4 md:mt-6 md:flex items-center md:divide-x divide-jg-metal-50 relative px-4 md:jg-hidden">
                <div className="relative md:min-w-[448px]">
                  <SearchField
                    placeholder="Search for topics..."
                    className="h-10"
                    onChange={(value) => setQuery(value.trim())}
                  />
                  <PopoverSearchResult
                    open={Boolean(query)}
                    query={queryData}
                    SearchResult={citrus2}
                    path={`../search?q=${query}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-x-8 relative mt-4">
              <div className="lg:max-w-[770px] w-full">
                <CatagoryCards CatagoryCardsItems={filterData.length > 0 ? filterData : contentByIds} />
              </div>
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Category
