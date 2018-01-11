# Amu-Is-Parsing

## Setup

`git clone` the SSH in top right of the repo

`npm i`

## Explanation

This app takes is able to take in a .txt filled witha number of poker hands. We indicate which hand we want and then are able to extrapolate the information we want from the text. For instance, given:

```PokerStars Hand #179581295772: Tournament #2154443950, $3.32+$0.18 USD Hold'em No Limit - Match Round I, Level V (30/60) - 2017/12/15 16:22:27 WET [2017/12/15 11:22:27 ET]
Table '2154443950 1' 2-max Seat #1 is the button
Seat 1: rorrrr (535 in chips)
Seat 2: TIGERPAPA (2465 in chips)
rorrrr: posts small blind 30
TIGERPAPA: posts big blind 60
*** HOLE CARDS ***
Dealt to rorrrr [Tc Kc]
rorrrr: raises 475 to 535 and is all-in
TIGERPAPA: calls 475
*** FLOP *** [2c 4s 4c]
*** TURN *** [2c 4s 4c] [2s]
*** RIVER *** [2c 4s 4c 2s] [Ah]
*** SHOW DOWN ***
TIGERPAPA: shows [8s As] (two pair, Aces and Fours)
rorrrr: shows [9c Kc] (two pair, Fours and Deuces)
TIGERPAPA collected 1070 from pot
rorrrr finished the tournament in 2nd place
TIGERPAPA wins the tournament and receives $6.64 - congratulations!
*** SUMMARY ***
Total pot 1070 | Rake 0
Board [2c 4s 4c 2s Ah]
Seat 1: rorrrr (button) (small blind) showed [9c Kc] and lost with two pair, Fours and Deuces
Seat 2: TIGERPAPA (big blind) showed [8s As] and won (1070) with two pair, Aces and Fours'
```

We would get:

```
{id: 179581295772,
  heroName: "rorrrr",
  heroHand: "Tc Kc",
  xxxxxx: "yyyyy"
}
```

and a lot of other things.

# Tasks

## Goal 1

Run `npm test` to see that we have 1 passing test and 2 failing. Open tourny_and_cash.test.js and figure out how one is passing. Then complete these partially done tests.

## Goal 2

Write tests for the following and then create methods in src/index.js to make them pass (test on both files if possible):

Markup : \* 'correctly determines if the game is a tournament game' (says Tourmanent in first line if it is)

* 'can determine tournament buyin if table is tournament' (says an amount in first line, if it is not a tournament return null)

* 'can determine tournament id if table is tournament'

\*'can return the correct player of the game' (hero refers to the person whose cards we see aka "Dealt to")

\*'can fetch our own stacksize before the first hand' ('Seat 1: rorrrr ($1.60 in chips') normally line 3 onwards shows everyones stacksize (the amount of money they have to wager) so in this case heroStackSize = $1.60)

\*'can determine handID' (u know this one)

\*'can fetch the pot size' (include $ if its there)

\*'can determine date and time of tourny or cash hand'

\*'can determine if seat is occupied who is in it' (tell it a hand number and seat number and receive a name)

\*'can determine seat number of button' (hand tells you where)

\*'can determine seat number of small blind' (bit more difficult)

\*'can determine seat number of big blind'
