import { ILog } from '../interfaces'

const logTypes: string[] = ['success', 'dependencyError', 'faultError', 'throttlingError', 'invalidInputError']

const calculatePieSeries = (data: ILog[]) => {
  const newPieSeries = [0, 0, 0, 0, 0]
  data.forEach((item: ILog) => {
    newPieSeries[logTypes.indexOf(item.status)]++
  })
  return newPieSeries
}

const calculateLineSeries = (data: ILog[], duration: number) => {
  const newLineSeries: {
    success: number
    dependencyError: number
    faultError: number
    throttlingError: number
    invalidInputError: number
  }[] = []
  const timeStamps: string[] = []
  const types = ['success', 'dependencyError', 'faultError', 'throttlingError', 'invalidInputError']
  let currentTime = new Date(data[0].time)

  timeStamps.push(currentTime.toISOString())

  const listOfListsOfLogs = data.reduce((acc: any[], item: ILog) => {
    console.log('acc', acc)
    if (types.includes(item.status)) {
      const index = Math.floor((new Date(item.time).getTime() - currentTime.getTime()) / duration)
      acc[index] = acc[index] || []
      acc[index].push(item)
    }
    return acc
  }, [])

  Object.keys(listOfListsOfLogs).forEach((id: any) => {
    const list = listOfListsOfLogs[id] || []
    let success = 0,
      dependencyError = 0,
      faultError = 0,
      throttlingError = 0,
      invalidInputError = 0
    if (Array.isArray(list)) {
      list.forEach((item: any) => {
        success += item.status === 'success' ? 1 : 0
        dependencyError += item.status === 'dependencyError' ? 1 : 0
        faultError += item.status === 'faultError' ? 1 : 0
        throttlingError += item.status === 'throttlingError' ? 1 : 0
        invalidInputError += item.status === 'invalidInputError' ? 1 : 0
      })
    }
    newLineSeries.push({ success, dependencyError, faultError, throttlingError, invalidInputError })
    currentTime = new Date(currentTime.getTime() + duration)
    timeStamps.push(currentTime.toISOString())
  })

  console.log('newLineSeries', newLineSeries)
  console.log('timeStamps', timeStamps)

  return [newLineSeries, timeStamps]
}

const calculateAvailabilityLineSeries = (data: ILog[], duration: number) => {
  const newAvailabilityLineSeries: number[] = []
  const timeStamps: string[] = []
  const types = ['success', 'throttlingError', 'invalidInputError']
  let currentTime = new Date(data[0].time)

  timeStamps.push(currentTime.toISOString())

  const listOfListsOfLogs = data.reduce((acc: any[], item: any) => {
    if (types.includes(item.status)) {
      const index = Math.floor((new Date(item.time).getTime() - currentTime.getTime()) / duration)
      acc[index] = acc[index] || []
      acc[index].push(item)
    }
    return acc
  }, [])

  for (const id of Object.keys(listOfListsOfLogs)) {
    const list = listOfListsOfLogs[id as any] || []
    let success = 0,
      throttlingError = 0,
      invalidInputError = 0
    if (Array.isArray(list)) {
      list.forEach((item: any) => {
        success += item.status === 'success' ? 1 : 0
        throttlingError += item.status === 'throttlingError' ? 1 : 0
        invalidInputError += item.status === 'invalidInputError' ? 1 : 0
      })
    }
    const availability = (success / (success + throttlingError + invalidInputError)) * 100
    newAvailabilityLineSeries.push(availability)
    currentTime = new Date(currentTime.getTime() + duration)
    timeStamps.push(currentTime.toISOString())
  }
  return [newAvailabilityLineSeries, timeStamps]
}

export { logTypes, calculatePieSeries, calculateLineSeries, calculateAvailabilityLineSeries }
