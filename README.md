TicTacToe-NodeJS
================

A simple implementation of network multiplayer Tic Tac Toe made in Node JS using the Socket IO

Features
--------
* Remote play through socket transactions - no databases
* Player auto-assignment to X/O
* Turn based play
* Win conditions
 

Limitations
-----------
This is a tech demo/experiment so clearly isn't suitable for production purposes for several reasons:
* Tic Tac Toe has been done before. Lots.
* Only one game handled per node execution.
* Logic is largely handled client side - could be manipulated.
* Boxes are HTML elements (table cells) - inconsistent style across browsers/systems.
* If you can handle installing a node server then you're probably not an avid Tic Tac Toe player.

