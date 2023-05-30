import { IsBlended } from '@jg/_core/Authorization'
const system = {
  getCurrency: () => {
    if (IsBlended()) {
      return {
        Currency: window.parent.px.uiSettings.Currency,
        CurrencySymbol: window.parent.px.uiSettings.CurrencySymbol,
      }
    } else {
      return {
        Currency: 'GBP',
        CurrencySymbol: '£',
      }
    }
  },
}
const automation = {
  getEventBookingAutomationItems: function (
    ownerId,
    triggerPoint,
    eventId,
    purchaseItems,
    isIndividualBooking,
    callback
  ) {
    if (!IsBlended()) {
      callback([])
    } else {
      window.parent.az.widgetUtil.automation.getEventBookingAutomationItems(
        ownerId,
        triggerPoint,
        eventId,
        purchaseItems,
        isIndividualBooking,
        callback
      )
    }
  },
}
const report = {
  download: (reportUrl) => {
    if (!IsBlended()) {
      console.log('works on blended mode')
    } else {
      window.parent.az.ReportUtil.get().download(reportUrl)
    }
  },
}

export { automation, report, system }
