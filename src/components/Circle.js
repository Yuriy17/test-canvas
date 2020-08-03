/* eslint-disable no-unused-vars */
export default class Circle {
  init(props) {
    const { element, tableElement, mainRowElement, canvasElement, ctx } = props;
    this.element = element;
    this.startLeft = 50;
    this.startTop = 150;
    this.color = '#990011';
    this.ctx = ctx;
  }

  draw(left, top) {
    const x = left;
    const y = top;
    const radiusWithoutBorder = this.element.offsetWidth / 2 - 2;
    this.ctx.beginPath();
    this.ctx.lineWidth = '4';
    this.ctx.arc(x + radiusWithoutBorder, y + radiusWithoutBorder, radiusWithoutBorder, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}
