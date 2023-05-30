import { FixturesInfo } from '@jg/common/types/eventsAnsSchedules/EventInfo'

export default ({ DocId, FixtureCategory, FixtureName, Description, FixtureId, FixtureDate }: any): FixturesInfo => ({
  docId: DocId,
  fixtureCategory: FixtureCategory,
  fixtureName: FixtureName,
  description: Description,
  fixtureId: FixtureId,
  fixtureDate: { date: FixtureDate.Date, time: FixtureDate.Time, timezone: FixtureDate.TimeZone },
})
