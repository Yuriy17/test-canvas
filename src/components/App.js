export default class App {

  init(){
    this.canvasNode = document.querySelector('#canvas');
    this.ctx = this.canvasNode.getContext('2d');
  }
};
