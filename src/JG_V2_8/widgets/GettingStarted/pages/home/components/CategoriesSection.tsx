import Badge from '@comps/uiComps/Badges/Badge'
import CardImage from '@comps/uiComps/Card/CardImage'
import call from '@jg/_core/services/data/LegacyDataService'
import { ContentSection } from '@jg/common/comps'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGettingStartedStore from '../../../store/useGettingStarted'

const CategoriesSection = () => {
  const categories = useGettingStartedStore((state) => state.categories)
  const { basePath } = useWidgetContext()
  const [Array2, setDataArray] = useState<string[]>([])

  function unMatching(left: string[], right: string[]) {
    const right_indices = right.map((rightData: string) => rightData.toLowerCase())
    return left.filter((leftData) => !right_indices.includes(leftData.toLowerCase()))
  }

  const getDataFromServiceCall = async () => {
    await call(
      ['Sys/GetSetting'],
      [{ entity: 'GoMembership', entityid: 1, key: 'CLUBPLUS.HIDECLUBPLUSPACKAGEFROMUPGRADEANDLEARNMORE' }],
      (response: string) => {
        response && setDataArray(response.toLowerCase().replaceAll('justgo ', '').split(','))
      }
    )
  }

  useEffect(() => {
    getDataFromServiceCall()
  }, [])

  return (
    <div>
      <ContentSection
        heading="Browse by Category"
        caption="Explore articles and find your solutions"
        className="bg-white"
      >
        <div className="px-4 flex flex-wrap gap-x-6 justify-center lg:justify-start  gap-y-6 max-w-[1200px] w-full mx-auto mt-5">
          {categories &&
            categories.length > 0 &&
            categories.map((data: any, i: number) => (
              <Link
                to={`${basePath}${data.name}`}
                key={i}
                className="max-w-[270px] w-full h-[370px] relative border rounded-xl pt-10 px-4 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-center absolute top-[-14px] left-0 w-full">
                  {unMatching(data.badge, Array2).map((badgeLabel: string, index: number) => (
                    <Badge
                      className="capitalize"
                      key={index}
                      fillType="faded"
                      label={badgeLabel}
                      size="md"
                      variant={badgeLabel === 'Essential' ? `primary` : badgeLabel === `Pro` ? 'complementary' : 'info'}
                    />
                  ))}
                </div>
                <CardImage
                  src={data.imgUrl}
                  haveGradient={false}
                  className="cover h-full w-full "
                  isCovered={true}
                  zoomIn={false}
                >
                  <div className="text-left gap-y-1 w-full h-full">
                    <div className="font-semibold leading-5 text-base text-black">{data.displayName}</div>
                    <div className="leading-4 text-sm text-black">
                      {data.articles.length} Article{data.articles.length > 1 && 's'}
                    </div>
                  </div>
                </CardImage>
              </Link>
            ))}
        </div>
      </ContentSection>
    </div>
  )
}

export default CategoriesSection
