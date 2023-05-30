import call from '@jg/_core/services/data/LegacyDataService'
import { RadioSwitch } from '@jg/common/comps'
import { useRouter } from '@jg/hooks'
import { useWidgetContext } from 'jg-widget'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const ActiveButtonBgClass = {
  '/': 'bg-jg-green-800',
  '/lite': 'bg-jg-blue-500',
  '/essential': 'bg-jg-green-800',
  '/pro': 'bg-jg-violet-700',
}
const MembeshipManagement = () => {
  const location = useLocation()
  const { navigate } = useRouter()
  const { basePath } = useWidgetContext()
  const [Array2, setDataArray] = useState<string[]>([])

  const currentTab = location.pathname.split(`${basePath}learn-more`).pop() || '/'

  function unMatching(left: { name: string; value: string }[], right: string[]) {
    const right_indices = right.map((rightData: string) => rightData.toLowerCase())
    return left.filter((leftData) => !right_indices.includes(leftData.name.toLowerCase()))
  }

  const Array1 = [
    { name: 'General', value: '/' },
    { name: 'Lite', value: '/lite' },
    { name: 'Essential', value: '/essential' },
    { name: 'Pro', value: '/pro' },
  ]

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

  const Array3 = unMatching(Array1, Array2)

  return (
    <section className="text-gray-600 body-font">
      <div className="container py-4 mx-auto ">
        <div className="flex justify-center">
          <RadioSwitch
            buttonClass="capitalize border-r last:border-none"
            options={Array3}
            curSelection={currentTab || '/'}
            onSwitch={(value: string) => {
              if (currentTab !== value) {
                navigate(`${basePath}learn-more${value}`)
              }
            }}
            activeButtonBgClass={ActiveButtonBgClass[currentTab as keyof typeof ActiveButtonBgClass]}
          />
        </div>
      </div>
      <div className="container mx-auto ">
        <Outlet />
      </div>
    </section>
  )
}
export default MembeshipManagement
