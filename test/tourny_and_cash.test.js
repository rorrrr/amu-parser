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
    expect(table1.stackSize(0, 'rorrrr')).toBe('535')
  })

  test('can determine handID', () => {
    expect(table1.getHandId(0)).toBe('#179581295772')
  })

  test('can return the pot size', () => {
    expect(table1.getPotSize(0)).toBe('1070')
  })

  test('can determine date and time of tourny or cash hand', () => {
    expect(table1.getTimeAndDate(0)).toBe(
      '2017/12/15 16:22:27 WET [2017/12/15 11:22:27 ET]'
    )
    expect(table2.getTimeAndDate(0)).toBe(
      '2017/12/20 21:41:08 WET [2017/12/20 16:41:08 ET]'
    )
  })

  test('can determine if seat is occupied who is in it', () => {
    expect(table1.isSeatOccupied(0, 1)).toBe('rorrrr')
  })

  test('can determine seat number of button', () => {
    expect(table1.getSeatNumberOfButton(0)).toBe('#1')
  })

  test('can determine seat number of small blind', () => {
    expect(table1.getSmallBlindSeatNumber(0)).toBe('1')
  })

  test('can determine seat number of big blind', () => {
    expect(table1.getBigBlindSeatNumber(0)).toBe('2')
  })
})
