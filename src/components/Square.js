import { FLAGS } from '../utils/constants';

export default class Square {
  constructor(squares) {
    this.squares = squares;
  }

  init(props) {
    const { element, canvasElement, ctx } = props;
    this.element = element;
    this.ctx = ctx;
    this.startLeft = 50;
    this.startTop = 300;
    this.color = '#278040';
    this.canvasElement = canvasElement;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    canvasElement.addEventListener('mousedown', this.onMouseDown);
  }

  draw(x, y, flag) {
    let strokeStyle;
    let fillStyle;
    switch (flag) {
      case FLAGS.white:
        strokeStyle = 'white';
        fillStyle = 'white';
        break;
      case FLAGS.select:
        strokeStyle = 'black';
        fillStyle = this.color;
        this.squares.push({ x, y });
        this.indexOfSquare = this.squares.length - 1;
        break;
      default:
        strokeStyle = 'white';
        fillStyle = this.color;
        this.squares.push({ x, y });
        this.indexOfSquare = this.squares.length - 1;
        break;
    }
    const side = this.element.offsetWidth;
    this.ctx.beginPath();
    this.ctx.lineWidth = '2';
    this.ctx.rect(x + 1, y + 1, side - 2, side - 2);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
    this.ctx.fillStyle = fillStyle;
    this.ctx.fillRect(x + 2, y + 2, side - 4, side - 4);
  }

  delete(x, y) {
    const sideWithoutBorder = this.element.offsetWidth - 4;
    this.ctx.beginPath();
    this.ctx.lineWidth = '4';
    this.ctx.rect(x + 1, y + 1, sideWithoutBorder, sideWithoutBorder);
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x + 1, y + 1, sideWithoutBorder, sideWithoutBorder);

    this.squares.splice(this.indexOfSquare, 1);
    this.canvasElement.removeEventListener('mousemove', this.onMouseMove);
    this.canvasElement.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(event) {
    this.squares.forEach((element, index) => {
      if (
        element.x < event.offsetX &&
        event.offsetX < element.x + 101 &&
        element.y < event.offsetY &&
        element.x + 101 > event.offsetY
      ) {
        this.indexOfSquare = index;
        this.canvasElement.addEventListener('mousemove', this.onMouseMove);
        this.canvasElement.addEventListener('mouseup', this.onMouseUp);
      }
    });
  }

  onMouseUp() {
    this.canvasElement.removeEventListener('mousemove', this.onMouseMove);
    this.canvasElement.removeEventListener('mouseup', this.onMouseUp);
    this.draw(this.squares[this.indexOfSquare].x, this.squares[this.indexOfSquare].y,FLAGS.select);
  }

  onMouseMove(event) {
    this.squares.forEach((element, index) => {
      if (
        element.x < event.offsetX &&
        event.offsetX < element.x + 101 &&
        element.y < event.offsetY &&
        element.x + 101 > event.offsetY
      ) {
        this.ctx.beginPath();
        this.ctx.moveTo(element.x, element.y);
        this.ctx.lineWidth = '50';
        this.ctx.strokeStyle = 'white';
        this.ctx.lineTo(event.offsetX, event.offsetY);
        this.ctx.stroke();
        this.indexOfSquare = index;
        this.draw(element.x, element.y, FLAGS.white);
      }
    });
    this.squares.splice(this.indexOfSquare, 1);

    this.draw(event.offsetX - this.element.offsetWidth / 2, event.offsetY - this.element.offsetWidth / 2);
  }
}
