import './index.less'

class Animal {
  constructor(name) {
      this.name = name;
  }
  getName() {
      return this.name;
  }
}

const dog = new Animal('dog');
console.log(dog.getName());
console.log(_map.chunk);
// document.getElementById('btn').onclick = function() {
//   import('./handle').then(fn => fn.default());
// }

// 热更新
if(module && module.hot) {
  module.hot.accept()
}