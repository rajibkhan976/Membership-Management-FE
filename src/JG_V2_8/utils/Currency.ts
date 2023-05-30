const Currency = {
  list: [
    {
      name: 'EUR',
      symbol: '€',
    },
    {
      name: 'GBP',
      symbol: '£',
    },
    {
      name: 'USD',
      symbol: '$',
    },
    {
      name: 'AUD',
      symbol: '$',
    },
    {
      name: 'CAD',
      symbol: '$',
    },
  ],
  getSymbol: (name: string) => {
    const res = Currency.list.find((e) => {
      return e.name === name
    })
    if (res) return res.symbol
    else return '£'
  },
}
export default Currency
