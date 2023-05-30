import { BookedMembersInfo, GDEResponse, GenericErrorResponse } from '@jg/common/types'
import { BookedMembersResponse } from '@jg/common/types/eventsAnsSchedules/BookedMembersResponse'
import call from '@jg/_core/services/data/LegacyDataService'
import populateBookedMembersInfo from '../_helpers/populateBookedMembersInfo'

type ResultType = {
  bookedMembersList: BookedMembersInfo[]
}

const GetBookedMembersRequest = () => {
  return new Promise<BookedMembersResponse>(function (resolve, reject) {
    const response: BookedMembersResponse = {
      bookedMembersList: [],
    }
    const getBookedMembersArg = {
      Method: 'GetBookedMembers',
    }
    const bookedMembersArg = { provider: 'Event', args: getBookedMembersArg }

    call(
      ['GDE/FetchObjects'],
      [bookedMembersArg],
      (res: GDEResponse) => {
        response.success = true
        if (res.StatusCode === 200) {
          try {
            const result = res?.Result as ResultType[]
            response.bookedMembersList = result?.map((item) => populateBookedMembersInfo(item)) as BookedMembersInfo[]
          } catch (ex) {
            console.log(ex)
          }
        }
        resolve(response)
      },
      (error: any) => {
        const errorObj: GenericErrorResponse = {
          message: 'Error occured while fetching event summary!',
        }
        reject(errorObj)
      }
    )
  })
}

export default GetBookedMembersRequest
