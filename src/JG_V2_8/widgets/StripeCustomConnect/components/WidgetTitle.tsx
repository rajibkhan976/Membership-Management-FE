import useStripeCustomConnectStore, { StripeCustomConnectStore } from '../store/useStripeCustomConnectStore'
import { ReactComponent as ActiveIcon } from '@jg/assets/images/ActiveIcon.svg'
import { ReactComponent as RestrictedIcon } from '@jg/assets/images/RestrictedIcon.svg'
import classNames from 'classnames'

const WidgetTitle = () => {
  const { stripeAccountInfo } = useStripeCustomConnectStore((state: StripeCustomConnectStore) => state)
  const { id, charges_enabled, payouts_enabled, requirements } = stripeAccountInfo

  return (
    <>
      <div className="inline-block text-jg-grey-800 font-bold text-base mt-2.5 ml-2 md:ml-2 lg:ml-2 xl:ml-0 mb-2 md:mb-2 lg:mb-0">
        Finance Summary
      </div>
      {id && (
        <div className="flex justify-center md:inline-block md:ml-2 lg:ml-6 mt-4 md:mt-4 lg:mt-0">
          {requirements && Array.isArray(requirements?.currently_due) && requirements?.currently_due?.length === 0 ? (
            <div className="inline-flex justify-center items-center md:inline-block bg-jg-green-50 w-40 md:w-28 px-2 py-1 text-sm">
              <ActiveIcon className="inline-block" />
              <span className="inline-block ml-2 text-jg-green-500">{'Active'}</span>
            </div>
          ) : (
            <div className="custom-popover-container inline-flex justify-center items-center md:inline-block bg-jg-red-50 w-40 md:w-28 px-2 py-1 text-sm relative">
              <RestrictedIcon className="inline-block" />
              <span className="inline-block ml-2 text-jg-red-500">{'Restricted'}</span>
              <div className="custom-popover absolute top-8 w-80 h-auto bg-jg-grey-50 z-50 rounded-sm p-4 flex-col">
                <p className="text-sm text-jg-metal-500">
                  The account owner needs to provide more information to stripe to enable payments and payouts in this
                  account
                </p>
                <p className="text-sm text-jg-metal-500 font-semibold mt-4">Information Needed - Due Now</p>
                {requirements?.currently_due?.map((item: string, index: number) => (
                  <p key={index} className={classNames('capitalize text-jg-metal-500', index > 0 ? 'mt-1' : 'mt-6')}>
                    {item.includes('person_') && item.includes('.')
                      ? item.substring(0, item.indexOf('_')) + ' ' + item.substring(item.indexOf('.') + 1, item.length)
                      : item.replaceAll(/[._]/g, ' ')}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="inline-block w-40 px-2 py-1 text-sm">
            <span
              className={classNames(
                'inline-block ml-2 font-semibold',
                charges_enabled ? 'text-jg-grey-400' : 'text-jg-grey-700'
              )}
            >
              {'Payments'}
            </span>
            <span
              className={classNames(
                'inline-block ml-2 font-semibold',
                charges_enabled ? 'text-jg-grey-700' : 'text-jg-grey-400'
              )}
            >
              {charges_enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="inline-block w-40 px-2 py-1 text-sm">
            <span
              className={classNames(
                'inline-block ml-2 font-semibold',
                charges_enabled && payouts_enabled ? 'text-jg-grey-400' : 'text-jg-grey-700'
              )}
            >
              {'Payouts'}
            </span>
            <span
              className={classNames(
                'inline-block ml-2 font-semibold',
                charges_enabled && payouts_enabled ? 'text-jg-grey-700' : 'text-jg-grey-400'
              )}
            >
              {charges_enabled && payouts_enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default WidgetTitle
