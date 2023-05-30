import { useEffect, useState } from 'react'
import Modal from '@jg/common/comps/Modal'
import BodySection from './BodySection'
import TitleSection from './TitleSection'
import ButtonSection from './ButtonSection'
import { useGetProductBalance } from '../../store/useProductStore'
import { useParams } from 'react-router-dom'
import SpinerLoader from '../spinerLoader'
import ShoppingCartProvider from '@jg/providers/ShoppingCartProvider'

const UpgradeSection = () => {
  const { clubDocId } = useParams()
  const [open, setOpen] = useState(false)
  const isLoading = useGetProductBalance(({ isLoading }) => isLoading)
  const balance = useGetProductBalance(({ balance }) => balance)
  const GetProductBalance = useGetProductBalance(({ GetProductBalance }) => GetProductBalance)

  useEffect(() => {
    clubDocId && GetProductBalance(clubDocId)
  }, [clubDocId])
  return (
    <div className="flex justify-between items-center">
      <div className="mt-3 mb-3">
        <p className="text-[16px] font-bold">
          Email
          <span className="ml-1 mr-2 text-jg-metal-100">|</span>
          <span className="text-[13px] text-jg-grey-600">Email tier allocation, {isLoading ? <SpinerLoader /> : balance?.MonthlyQuota} emails per month | </span>
          {balance && <span className="text-[13px] text-jg-grey-900">{isLoading ? <SpinerLoader /> : balance?.RemainingMonthlyQuota + balance?.AdditionalBundleTotal} remaining </span>}
          <span className="text-[13px] text-jg-grey-600"> | </span>
          {isLoading ? <SpinerLoader /> :
            <button onClick={() => setOpen(true)} className="text-jg-green-500 ml-1">
              Upgrade
            </button>
          }
        </p>

        <Modal
          open={open}
          setOpen={setOpen}
          titleSection={<TitleSection />}
          bodySection={<ShoppingCartProvider>
            <BodySection />
          </ShoppingCartProvider>}
          actionButtons={<ButtonSection />}
          showActionBtn={true}
        />
      </div>
    </div>
  )
}
export default UpgradeSection
