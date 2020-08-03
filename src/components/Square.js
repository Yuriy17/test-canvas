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

    canvasElement.addEventListener('mousedown', this.onMouseDown, {once: true});
  }

  draw(x, y) {
    const sideWithoutBorder = this.element.offsetWidth - 4;
    this.ctx.beginPath();
    this.ctx.lineWidth = '4';
    this.ctx.rect(x + 1, y + 1, sideWithoutBorder, sideWithoutBorder);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x + 1, y + 1, sideWithoutBorder, sideWithoutBorder);

    this.squares.push({ x, y });
  }

  drawSquare(x, y, fillStyle, strokeStyle) {
    if (
      x > this.canvasElement.offsetWidth - this.element.offsetWidth / 2 ||
      x < this.element.offsetWidth / 2 ||
      y > this.canvasElement.offsetHeight - this.element.offsetWidth / 2 ||
      y < this.element.offsetWidth / 2
    ) {
      this.delete(x, y);
    } else {
      const sideWithoutBorder = this.element.offsetWidth - 4;
      this.ctx.beginPath();
      this.ctx.lineWidth = '4';
      this.ctx.rect(
        x + 1 - this.element.offsetWidth / 2,
        y + 1 - this.element.offsetWidth / 2,
        sideWithoutBorder,
        sideWithoutBorder
      );
      this.ctx.strokeStyle = strokeStyle;
      this.ctx.stroke();
      this.ctx.fillStyle = fillStyle;
      this.ctx.fillRect(
        x + 1 - this.element.offsetWidth / 2,
        y + 1 - this.element.offsetWidth / 2,
        sideWithoutBorder,
        sideWithoutBorder
      );
      this.squares.push({ x, y });
    }
  }

  delete(x, y) {
    const sideWithoutBorder = this.element.offsetWidth - 4;
      this.ctx.beginPath();
      this.ctx.lineWidth = '4';
      this.ctx.rect(
        x + 1 ,
        y + 1 ,
        sideWithoutBorder,
        sideWithoutBorder
      );
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(
        x + 1 ,
        y + 1 ,
        sideWithoutBorder,
        sideWithoutBorder
      );

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
    this.drawSquare(
      this.squares[this.indexOfSquare].x,
      this.squares[this.indexOfSquare].y,
      this.color,
      'black'
    );
  }

  onMouseMove(event) {
    this.squares.forEach((element, index) => {
      if (
        element.x < event.offsetX &&
        event.offsetX < element.x + 101 &&
        element.y < event.offsetY &&
        element.x + 101 > event.offsetY
      ) {
        this.drawSquare(element.x, element.y, 'white', 'white');
        this.indexOfSquare = index;
      }
    });

    if (this.squares.length - 1 === this.indexOfSquare) {
      this.squares.pop();
    } else if (this.indexOfSquare >= 0) {
      this.squares.splice(this.indexOfSquare, 1);
    }
    this.drawSquare(event.offsetX, event.offsetY, this.color);
    this.squares.push({
      x: event.offsetX,
      y: event.offsetY,
    });
    this.indexOfSquare = this.squares.length - 1;
  }
}
