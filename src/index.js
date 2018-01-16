//this file contains a function that parses the cards out of the file for you//
const cardsFromSet = require('./cards_from_set')

const HAND_SPLIT_PATTERN = '\n\n\n\n'

class Table {
  constructor(fileContents) {
    // get contents of file
    this.fileContents = fileContents
    //splitting file everytime there is 4 blank lines
    const rawDataLines = this.fileContents.split(HAND_SPLIT_PATTERN)
    //splitting each hand into an array of strings for each line
    this.parsedHands = rawDataLines
      .slice(0, rawDataLines.length - 1)
      .map(hand => hand.split('\n').map(line => line.trim()))
  }

  handCount() {
    return this.parsedHands.length
  }

  heroHand(handNumber) {
    return this.startingCards(handNumber)
  }

  heroName() {
    // return
  }

  tournamentChecker(handnumber) {
    return this.parsedHands[handnumber]
  }
  /////PRIVATE METHODS (only used within other functions in this file) /////

  startingCards(handNumber) {
    const lineData = this.heroHandDealt(handNumber)
    const hand = cardsFromSet(
      lineData.substr(lineData.lastIndexOf('['), lineData.length)
    )
    return hand
  }

  heroHandDealt(handNumber) {
    return this.parsedHands[handNumber]
      .find(line => line.startsWith('Dealt to '))
      .split('Dealt to ')[1]
  }
}

module.exports = Table
