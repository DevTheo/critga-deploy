//<reference path="../typings/tsd.ts" />
var IndividualStatsVM = function(parentVM) {
    let self = this;
    this.parent = parentVM;
    
    let _initialHP = null;
    let _initialPlayerName = "blank player";
    let _initialATK = null;
    let _initialDEF = null;
    let _initialACC = null;
    let _initialEVA = null;
    this.HP1 = ko.observable(null);
    this.playername1 = ko.observable(_initialPlayerName);
    this.ATK1 = ko.observable(null);
    this.DEF1 = ko.observable(null);
    this.ACC1 = ko.observable(null);
    this.EVA1 = ko.observable(null); // this will end up being bound to whatever is in the control on screen
    this.SPD1 = ko.observable(null); 
    this.TurnOrder = ko.observable(null);
    
    this.SPD1.subscribe(function (newVal) {
       self.parent.calcTurnOrder(); 
    });
    
    //this.Attack = ko.observable(10);
    //this.Defend = ko.observable(10);
    
    //this.AD = ko.computed(() => {
    //   return this.Attack()/(this.Defend() + 1);  
    //});
    
    this.resetData = () => {
        self.HP1(_initialHP)
        self.playername1(_initialPlayerName)
        self.ATK1(_initialATK)
        self.DEF1(_initialDEF)
        self.ACC1(_initialACC)
        self.EVA1(_initialEVA)
    };
    
    this.add = () => {
        self.parent.add();        
    };
    
    this.removeItem = () => {   
       self.parent.removeItem(self); 
    };
}

var StatsVM = function () {
    let self = this;
    this.childData= ko.observableArray([new IndividualStatsVM(self)]);
    
    this.add = () => {
        self.childData.push(new IndividualStatsVM(self));
    };
    
    this.removeItem = (vm) => {
        if (self.childData().length > 1) {                    
            self.childData.remove(vm );
        }
    };    
    
    this.calcTurnOrder = () => {
        var items = self.childData();
        items.sort(function (a, b) {
           let spd1 = a.SPD1() || -1;
           let spd2 = b.SPD1() || -1; 
           return spd2 - spd1;
        });
        
        var newOrder = 1;
        $.each(items, function(idx, item) {
           var actualIdx = self.childData().indexOf(item);
           if(actualIdx !== -1) {
               self.childData()[actualIdx].SPD1(newOrder++)
           } 
        });
    };
}