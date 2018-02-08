const Table = require('../')
const fs = require('fs')
const tournyExample = fs.readFileSync(
  __dirname + '/fixtures/tournament_chips.txt',
  'utf8'
)
const cashExample = fs.readFileSync(
  __dirname + '/fixtures/standard_dollars.txt',
  'utf8'
)

let table
describe('standard tourny or cash game', () => {
  beforeEach(() => (table1 = new Table(tournyExample)))
  beforeEach(() => (table2 = new Table(cashExample)))

  test('can count the number of hands in a file', () => {
    expect(table1.handCount()).toBe(1)
    expect(table2.handCount()).toBe(7)
  })

  test('can fetch the hero hand for the first hand', () => {
    expect(table2.heroHand(0)).toEqual([
      { number: 'J', suit: 'c' },
      { number: '7', suit: 's' }
    ])

    expect(table1.heroHand(0)).toEqual([
      { number: 'T', suit: 'c' },
      { number: 'K', suit: 'c' }
    ])
  })

  test('can fetch the hero hand for the fourth hand', () => {
    expect(table2.heroHand(3)).toEqual([
      { number: '2', suit: 's' },
      { number: '7', suit: 'd' }
    ])
  })

  test('can determine if game is a tournament game', () => {
    expect(table1.tournamentChecker(0)).toEqual(true)
    expect(table2.tournamentChecker(0)).toEqual(false)
  })

  test('can determine tournament id if table is tournament', () => {
    expect(table1.getTournamentId(0)).toBe('#2154443950')
    // expect(table2.getTournamentId(0)).toBe(null)
  })

  test('can return the correct player of the game', () => {
    expect(table1.heroName(0)).toBe('rorrrr')
  })

  test('can return own stacksize before own hand', () => {
    expect(table1.stackSize('rorrrr')).toBe(535)
  })
})
