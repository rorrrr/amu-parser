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

    this.parsedToArray = rawDataLines
      .slice(0, rawDataLines.length - 1)
      .map(hand => hand.split(' '))
  }

  handCount() {
    return this.parsedHands.length
  }

  heroHand(handNumber) {
    return this.startingCards(handNumber)
  }

  heroName(handnumber) {
    var heroHandDealtData = this.heroHandDealt(handnumber)
    for (var i = 0; i < heroHandDealtData.length; i++) {
      var name = heroHandDealtData.split(' ')[0]
      var firstWord = name
      // console.log('xxxxxx', firstWord)
      return firstWord
    }
  }

  tournamentChecker(handnumber) {
    var data = this.parsedHands[handnumber][0]
    var newData = data.includes('Tournament')
    return newData
  }

  getTimeAndDate(handnumber) {
    if (this.tournamentChecker(handnumber)) {
      var data = this.parsedHands[handnumber][0]
      var splitData = data.split('- ')[2]
      return splitData
      console.log('xxxxxxx', splitData)
    } else {
      var gameData = this.parsedHands[handnumber][0]
      var gameSplitData = gameData.split('- ')[1]
      return gameSplitData
    }
  }

  isSeatOccupied(handNumber, seatnumber){
    var data = this.parsedHands[handNumber]
    var searchedForSeat = "Seat " + seatnumber + ": "
    var newData = data.find(line => line.startsWith(searchedForSeat))
    var test = newData.split(searchedForSeat)[1].split(' ')[0]

    return test
  }

  getSeatNumberOfButton(handnumber){
    var data = this.parsedHands[handnumber]
    var newData = data.find(line => line.startsWith('Table'))
      var test = newData.split('Seat ')[1]
      var buttonNumber = test.split(" ")[0]
      return buttonNumber
  }

  getPotSize(handnumber){
    var data = this.parsedHands[handnumber]
    var newData = data.find(line => line.startsWith('Total'))
    var potSize =  newData.split(" ")[2]
    return potSize

  }

  getTournamentId(handnumber) {
    var dataTest = this.parsedHands[handnumber][0]
    var tournamentCheckerData = function(handnumber) {
      var data = this.parsedHands[handnumber][0]
      var newData = data.includes('Tournament')
      return newData
    }

    if (tournamentCheckerData) {
      var tournamentId = dataTest.split(' ', 5)[4]
      var idWithoutComma = tournamentId.replace(/,\s*$/, '')

      return idWithoutComma
    } else {
      return null
    }
  }

  stackSize(handnumber, name) {
    var data = this.parsedToArray
    var index = data[0].indexOf('(535')
    var stackSize = data[0][34]

    while (stackSize.charAt(0) === '(') {
      stackSize = stackSize.substr(1)
    }
    return stackSize
    // console.log('xxxxx', index)
    // console.log('dddddd', stackSize)
  }

  getHandId(handNumber) {
    var data = this.parsedHands[handNumber]
    var getId = data[0].split(' ')[2]
    // console.log('getId', getId)
    var idLength = getId.length - 1
    // console.log('id length', idLength)
    while (getId.charAt(idLength) === ':') {
      getId = getId.substr(0, idLength)
    }
    // console.log('getId', getId)
    return getId
  }

  getSmallBlindSeatNumber(handnumber){
    var data = this.parsedHands[handnumber]
    console.log('test', data.length)
   for (var i = 0; i < data.length; i++){
    var nested = data[i]
    var test = nested.includes('(small blind)')
    if (test) {
      console.log([i])
      var index = data[i].split(" ")[1]
      var seatNumberWithoutColon = index.slice(0, -1)
      return seatNumberWithoutColon


      console.log(seatNumberWithoutColon)

    }

   }
  }

  getBigBlindSeatNumber(handnumber){
     var data = this.parsedHands[handnumber]
     console.log('test', data.length)
    for (var i = 0; i < data.length; i++){
     var nested = data[i]
     var test = nested.includes('(big blind)')
     if (test) {
       console.log([i])
       var index = data[i].split(" ")[1]
       var seatNumberWithoutColon = index.slice(0, -1)
       return seatNumberWithoutColon


       console.log(seatNumberWithoutColon)

     }

    }
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
