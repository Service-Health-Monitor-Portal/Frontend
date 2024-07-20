import { describe, it, expect } from 'vitest'
import { ILog } from '../../src/interfaces'
import { calculateAvailabilityLineSeries, calculateLineSeries, calculatePieSeries } from '../../src/functions'

const sampleLogs: ILog[] = [
  { time: '2024-07-19T10:00:00Z', status: 'success' },
  { time: '2024-07-19T10:05:00Z', status: 'dependencyError' },
  { time: '2024-07-19T10:10:00Z', status: 'faultError' },
  { time: '2024-07-19T10:15:00Z', status: 'success' },
  { time: '2024-07-19T10:20:00Z', status: 'throttlingError' },
  { time: '2024-07-19T10:25:00Z', status: 'invalidInputError' },
]

describe('Utility Functions', () => {
  describe('calculatePieSeries', () => {
    it('should correctly calculate the pie series', () => {
      const result = calculatePieSeries(sampleLogs)
      expect(result).toEqual([2, 1, 1, 1, 1])
    })
  })

  describe('calculateLineSeries', () => {
    it('should correctly calculate the line series', () => {
      const duration = 15 * 60 * 1000 // 15 minutes in milliseconds
      const [lineSeries, timeStamps] = calculateLineSeries(sampleLogs, duration)
      expect(lineSeries).toHaveLength(2)
      expect(timeStamps).toHaveLength(3)
    })
  })

  describe('calculateAvailabilityLineSeries', () => {
    it('should correctly calculate the availability line series', () => {
      const duration = 15 * 60 * 1000 // 15 minutes in milliseconds
      const [availabilityLineSeries, timeStamps] = calculateAvailabilityLineSeries(sampleLogs, duration)
      expect(availabilityLineSeries).toHaveLength(2)
      expect(timeStamps).toHaveLength(3)
    })
  })
})
