/* eslint-disable no-unused-vars */
export default class Square {
  init(props){
    const {
      element,
      tableElement,
      mainRowElement,
      canvasElement,
      ctx,
    } = props;
    this.element = element;
    this.ctx = ctx;
    this.startLeft = 50;
    this.startTop = 300;
    this.color = '#278040';
  }

  draw(left,top){
    const x = left;
    const y = top;
    const sideWithoutBorder = this.element.offsetWidth - 4;
    this.ctx.beginPath();
    this.ctx.lineWidth = "4";
    this.ctx.rect(x+1, y+1, sideWithoutBorder, sideWithoutBorder);
    this.ctx.stroke();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x+1, y+1, sideWithoutBorder, sideWithoutBorder);
  }
};
