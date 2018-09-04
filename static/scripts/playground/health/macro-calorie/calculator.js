// calculator.js
((window) => {

  const Calculator = function() {
    const GENDER = Symbol();
    const HEIGHT = Symbol();
    const WEIGHT = Symbol();
    const AGE = Symbol();
    const ACTIVITY = Symbol();
    const PURPOSE = Symbol();
    const activity = {low: 1.2, normal: 1.55, high: 1.725};
    const purpose = {bulkup: 1.2, stay: 1, reduce: 0.8};
    
    class Calculator {
      constructor(gender, age, height, weight, activity, purpose) {
        this[GENDER] = gender;
        this[HEIGHT] = height;
        this[WEIGHT] = weight;
        this[AGE] = age;
        this[ACTIVITY] = activity;
        this[PURPOSE] = purpose;
        console.debug(`Calculator instance is just created!`);
      }
      
      // getter, setter
      get gender() {
        const val = this[GENDER];
        console.debug(`value:gender of Calculator is just called! ${val}` );
        return val;
      }
      set gender(val) {
        console.debug(`value:gender of Calculator is just changed! ${val}` );
        this[GENDER] = val;
        _.set(_.getElement('gender'), 'value', val);
        this.refresh();
      }
      get height() {
        const val = this[HEIGHT];
        console.debug(`value:HEIGHT of Calculator is just called! ${val}` );
        return val;
      }
      set height(val) {
        console.debug(`value:HEIGHT of Calculator is just changed! ${val}` );
        this[HEIGHT] = val;
        _.set(_.getElement('height'), 'value', val);
        this.refresh();
      }
      get weight() {
        const val = this[WEIGHT];
        console.debug(`value:WEIGHT of Calculator is just called! ${val}` );
        return val;
      }
      set weight(val) {
        console.debug(`value:WEIGHT of Calculator is just changed! ${val}` );
        this[WEIGHT] = val;
        _.set(_.getElement('weight'), 'value', val);
        this.refresh();
      }
      get age() {
        const val = this[AGE];
        console.debug(`value:AGE of Calculator is just called! ${val}` );
        return val;
      }
      set age(val) {
        console.debug(`value:AGE of Calculator is just changed! ${val}` );
        this[AGE] = val;
        _.set(_.getElement('age'), 'value', val);
        this.refresh();
      }
      get activity() {
        const val = this[ACTIVITY];
        console.debug(`value:ACTIVITY of Calculator is just called! ${val}` );
        return val;
      }
      set activity(val) {
        console.debug(`value:ACTIVITY of Calculator is just changed! ${val}` );
        this[ACTIVITY] = activity[val];
        _.set(_.getElement('activity'), 'value', val);
        this.refresh();
      }
      get purpose() {
        const val = this[PURPOSE];
        console.debug(`value:PURPOSE of Calculator is just called! ${val}` );
        return val;
      }
      set purpose(val) {
        console.debug(`value:PURPOSE of Calculator is just changed! ${val}` );
        this[PURPOSE] = purpose[val];
        _.set(_.getElement('purpose'), 'value', val);
        this.refresh();
      }
      
      // other methods
      isEmpty(keys) {
        return keys.map(key => !this[key]).reduce((a, b) => a || b, false);
      }
      isNotEmpty(keys) {
        return !(this.isEmpty(keys));
      }
      refreshBMR () {
        if( this.isEmpty([GENDER, AGE, HEIGHT, WEIGHT]) ) return;
        _.set(_.getElement('bmr'), 'innerText', `${this.bmr.toFixed(0)} kcal`);
      }
      
      refreshAMR() {
        if( this.isEmpty([GENDER, AGE, HEIGHT, WEIGHT, ACTIVITY]) ) return;
        _.set(_.getElement('amr'), 'innerText', `${this.amr.toFixed(0)} kcal`);
      }
      refresh() {
        this.refreshBMR();
        this.refreshAMR();
        
        if( this.isEmpty([GENDER, AGE, HEIGHT, WEIGHT, ACTIVITY, PURPOSE]) ) return;
        _.set(_.getElement('calories'), 'innerText', `${this.calories.toFixed(0)} kcal`);
        _.set(_.getElement('protein'), 'innerText', `${(this.protein/4).toFixed(0)} g (${(this.protein).toFixed(0)} kcal)`);
        _.set(_.getElement('carbo'), 'innerText', `${(this.carbo/4).toFixed(0)} g (${(this.carbo).toFixed(0)} kcal)`);
        _.set(_.getElement('fat'), 'innerText', `${(this.fat/9).toFixed(0)} g (${(this.fat).toFixed(0)} kcal)`);
      }
      
      // computed
      get bmr() {
        return 10 * this[WEIGHT] + 6.25 * this[HEIGHT] - 5 * this[AGE] + ((this[GENDER] == 'male') ? 5 : -161);
      }
      get amr () {
        return this[ACTIVITY] * this.bmr;
      }
      get calories() {
        return this.amr * this[PURPOSE];
      }
      get protein () {
        return this[WEIGHT] * 2 * 4;
      }
      get carbo() {
        return this.calories - (this.protein + this.fat);
      }
      get fat() {
        return this.calories * 0.25;
      }
    }
    
    const calculator = new Calculator();
    
    { // BIND
      Object.defineProperty(_.getElement('gender'), 'v-value', {
        get: function() {
          var val = calculator.gender;
          console.debug(`element[gender] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[gender] is changed! ${val}`)
          calculator.gender = val;
        }
      });
      _.getElement('gender').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
      
      Object.defineProperty(_.getElement('weight'), 'v-value', {
        get: function() {
          var val = calculator.weight;
          console.debug(`element[weight] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[weight] is changed! ${val}`)
          calculator.weight = val;
        }
      });
      _.getElement('weight').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
      
      Object.defineProperty(_.getElement('height'), 'v-value', {
        get: function() {
          var val = calculator.height;
          console.debug(`element[height] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[height] is changed! ${val}`)
          calculator.height = val;
        }
      });
      _.getElement('height').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
      
      Object.defineProperty(_.getElement('age'), 'v-value', {
        get: function() {
          var val = calculator.age;
          console.debug(`element[age] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[age] is changed! ${val}`)
          calculator.age = val;
        }
      });
      _.getElement('age').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
      
      Object.defineProperty(_.getElement('activity'), 'v-value', {
        get: function() {
          var val = calculator.activity;
          console.debug(`element[activity] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[activity] is changed! ${val}`)
          calculator.activity = val;
        }
      });
      _.getElement('activity').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
      
      Object.defineProperty(_.getElement('purpose'), 'v-value', {
        get: function() {
          var val = calculator.purpose;
          console.debug(`element[purpose] is called! ${val}`)
          return val;
        },
        set: function(val) {
          console.debug(`element[purpose] is changed! ${val}`)
          calculator.purpose = val;
        }
      });
      _.getElement('purpose').onchange = function() { 
        this['v-value'] = this.value;
        console.debug(`elem is changed! ${this['v-value']}`);
      }; 
    }
    
    return calculator;
  };

  window.Calculator = Calculator;
})(window);