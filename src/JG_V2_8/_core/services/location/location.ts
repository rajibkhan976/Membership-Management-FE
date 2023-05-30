const subscriptionKey = 'vSb1xPs21ido5CDnsfs3khbm7JbXu54wvFJnhmMCPgE'
const findAddres = ({
  query = '',
  typeahead = true,
  language = 'GB',
  limit = 5,
}: {
  query: string
  typeahead?: boolean
  language?: string
  limit?: number
}) => {
  return fetch(
    `https://atlas.microsoft.com/search/address/json?subscription-key=${subscriptionKey}&api-version=1&typeahead=${typeahead}&query=${query}&language=${language}&limit=${limit}`
  )
}

async function getLocationNameByLatLng(query: string) {
  const result = await fetch(
    `https://atlas.microsoft.com/search/address/reverse/json?subscription-key=${subscriptionKey}&api-version=1&query=${query}`
  )
  return await result.json()
}

const getDeviceLocation = (callback: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (res) => {
        const resObj = {
          lat: res?.coords.latitude,
          lng: res?.coords.longitude,
          locationName: '',
        }
        getLocationNameByLatLng(`${res?.coords.latitude},${res?.coords.longitude}`).then((res) => {
          if (res.addresses && res.addresses.length > 0) resObj.locationName = res.addresses[0].address.freeformAddress
          callback(resObj)
        })
      },
      (res: any) => {
        console.log(res)
      }
    )
  } else {
    callback(null)
  }
}
const getLocationName = (latlng: string, callback: any) => {
  getLocationNameByLatLng(`${latlng}`).then((res) => {
    callback(res.addresses[0].address.freeformAddress)
  })
}

export { findAddres, getDeviceLocation, getLocationName }
