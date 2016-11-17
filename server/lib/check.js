// import {Users} from '/models';
// import {Match, check} from 'meteor/check';

// class Pattern {
//   constructor() {
//     this.messages = [];
//     this.patterns = [];
//     this.optional = false;

//     this.addMessage = (message) => {
//       if (message) {
//         this.messages.push(message);
//       }
//     };
//   }

//   pattern(fx) {
//     this.patterns.push(fx);
//     return this;
//   }

//   string(min, max) {
//     return this.pattern((value) => {
//       if (!Match.test(value, String)) {
//         return false;
//       }

//       if (min && value.trim().length < min) {
//         return false;
//       }

//       if (max && value.trim().length > max) {
//         return false;
//       }

//       return true;
//     });
//   }

//   text(max) {
//     return this.string(1, max);
//   }

//   number(min, max) {
//     return this.pattern((value) => {
//       if (!Match.test(value, Number)) {
//         return false;
//       }

//       if (min && value < min) {
//         return false;
//       }

//       if (max && value > max) {
//         return false;
//       }

//       return true;
//     });
//   }

//   count(max) {
//     return this.number(1, max);
//   }

//   date(min, max) {
//     return this.pattern((value) => {
//       if (!Match.test(value, Date)) {
//         return false;
//       }

//       if (min && value < min) {
//         return false;
//       }

//       if (max && value > max) {
//         return false;
//       }

//       return true;
//     });
//   }

//   future(max) {
//     return this.date(new Date(), max);
//   }

//   past(min) {
//     return this.date(min, new Date());
//   }

//   bool(arg) {
//     return this.pattern((value) => {
//       if (!Match.test(value, Boolean)) {
//         return false;
//       }

//       if (arg === true || arg === false) {
//         return value === arg;
//       }

//       return true;
//     });
//   }

//   oneOf(...args) {
//     return this.pattern(Match.oneOf(...args));
//   }

//   where(fn) {
//     return this.pattern(Match.Where((value) => fn(value, this.addMessage)));
//   }

//   regex(expr) {
//     return this.pattern(Match.Where((value) => expr.test(value)));
//   }

//   msg(message) {
//     if (message) {
//       this.message = message;
//     }
//   }

//   value(value) {
//     this.defaultValue = value;
//   }


// }

// const Schema = {
//   string(min, max) {
//     return Match.Where((value) => {



//     });
//   },



//   oneOf(...args) {
//     return Match.OneOf(...args);
//   },

//   any() {
//     return Match.Any;
//   },

//   optional(pattern) {
//     return Match()
//   }
//   Roles(...roles)
// }
