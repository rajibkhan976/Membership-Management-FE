import { EventInfo } from '@jg/common/types'
import { EventCategory } from '../../../common/types/eventsAnsSchedules/EventCategory'
// import { EventInfo } from "../types/EventInfo";

const imagesEvents = [
  'https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&&w=600',
  'https://images.pexels.com/photos/2416476/pexels-photo-2416476.jpeg?auto=compress&&w=600',
  'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/159603/softball-girls-softball-action-high-school-159603.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
]

const imagesCategory = [
  'https://images.pexels.com/photos/1257245/pexels-photo-1257245.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/159607/basketball-player-girls-basketball-girl-159607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/220383/pexels-photo-220383.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2682543/pexels-photo-2682543.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
]

const nameEntity = [
  'British Rowing',
  'Harington Club',
  'Glasgow Club',
  'Citypark Club',
  'London Rowing Club',
  'British Rowing Club',
]
const imagesEntity = [
  'https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/176837/pexels-photo-176837.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/1337384/pexels-photo-1337384.jpeg?auto=compress&cs=tinysrgb&w=100',
  'https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=100',
]
export const getEventInfos = (count: number): EventInfo[] => {
  const events: EventInfo[] = []
  let imgSl = 0
  for (let i = 0; i < count; i++) {
    const sl = i + 1
    events.push({
      docId: sl,
      imgSrc: imagesEvents[imgSl],
      name: `Event name ${sl}`,
      category: `EventCategory${sl}`,
      tickets: [],
      starts: { date: '2022-06-28', time: '06.30', timezone: 'BST' },
      ends: { date: '2022-06-30', time: '06.30', timezone: 'BST' },
      address: {
        address1: 'Lomany road',
        address2: 'sdasdsa',
        postCode: 'Ef410',
        town: 'City',
        county: 'London',
      },
      ownerEntity: {
        id: 10,
        imgSrc: imagesEntity[imgSl],
        name: nameEntity[imgSl],
      },
    })
    if (imgSl == 5) imgSl = 0
    imgSl++
  }
  return events
}

export const getEventCategories = (count: number): EventCategory[] => {
  const ctgs: EventCategory[] = []
  let imgSl = 0
  for (let i = 0; i < count; i++) {
    const sl = i + 1
    ctgs.push({
      name: `EventCategory${i}`,
      displayName: `Event category ${i}`,
      imgSrc: imagesCategory[imgSl],
    })
    if (imgSl == 5) imgSl = 0
    imgSl++
  }

  return ctgs
}
