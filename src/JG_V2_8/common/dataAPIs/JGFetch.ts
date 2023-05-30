import call from '@jg/_core/services/data/LegacyDataService'

const JGFetch = (method: string[], args: Record<string, unknown>[]) => {
  return new Promise((resolve, reject) => {
    call(method, args, (res: any) => resolve(res)), (err: Record<string, unknown>) => reject(err)
  })
}

export default JGFetch
