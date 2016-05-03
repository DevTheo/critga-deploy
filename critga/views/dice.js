/// <reference path="../typings/tsd.d.ts"/>

// This is a class definition which is used in dice.html 
// see the line that says:
//      var vm = new diceContent();
//
// Also "vm" stands for view model (we are creating a 
//   class that will provide data to the view which in
//   this case is the file "dice.html")

var DiceVM = function() { // if you need to pass data into the viewmodel for use then you can add parameters here 

    // "this" means expose this value to the outside world
    this.diceResult = ko.observable(""); // this is referenced in the dice page, see line: <span data-bind="text: diceResult"=></span>
    // BTW, ko.observable returns a function that is used to assign as well as get the underlying value 
    
    // The following is shorthand for creating a function
    //      this line is called when the user clicks the button. Referenced in the html. See line : <button data-bind="click: rollDice">Roll</button>
    this.rollDice = () => {

       var result = Math.floor(Math.random()*10+1); // you figure this out
       console.log(result);
        // Note: we can still use "this" to reference the exposed values 
        this.diceResult(result); // this simply puts a 1 as the dice result
        // You will probably want to do something like this:
            //this.diceResult(result);
    };
        
};