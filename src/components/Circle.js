export default class Circle {
  constructor(circles) {
    this.circles = circles;
  }

  init(props) {
    const { element, canvasElement, ctx } = props;
    this.element = element;
    this.startLeft = 50;
    this.startTop = 150;
    this.color = '#990011';
    this.ctx = ctx;
    this.canvasElement = canvasElement;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    canvasElement.addEventListener('mousedown', this.onMouseDown);
  }

  draw(left, top) {
    const x = left;
    const y = top;
    const radiusWithoutBorder = this.element.offsetWidth / 2 - 2;
    this.ctx.beginPath();
    this.ctx.lineWidth = '4';
    this.ctx.arc(
      x + radiusWithoutBorder + 2,
      y + radiusWithoutBorder + 2,
      radiusWithoutBorder,
      0,
      2 * Math.PI
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    this.ctx.fillStyle = this.color;
    this.ctx.fill();

    this.circles.push({
      x: x + radiusWithoutBorder,
      y: y + radiusWithoutBorder,
    });
  }

  drawFromCenter(x, y, fillStyle, strokeStyle) {
    let radiusWithoutBorder = this.element.offsetWidth / 2 - 2;
    if (
      x > this.canvasElement.offsetWidth - radiusWithoutBorder ||
      x < radiusWithoutBorder ||
      y > this.canvasElement.offsetHeight - radiusWithoutBorder ||
      y < radiusWithoutBorder
    ) {
      this.delete(x, y);
    } else {
      this.ctx.beginPath();
      this.ctx.lineWidth = '4';
      if (strokeStyle) {
        this.ctx.strokeStyle = strokeStyle;
      } else {
        this.ctx.strokeStyle = 'white';
        radiusWithoutBorder += 1;
      }
      this.ctx.arc(x, y, radiusWithoutBorder, 0, 2 * Math.PI);
      this.ctx.stroke();

      this.ctx.fillStyle = fillStyle;
      this.ctx.fill();
    }
  }

  delete(x, y) {
    const radiusWithoutBorder = this.element.offsetWidth / 2 - 1;
    this.ctx.beginPath();
    this.ctx.lineWidth = '4';
    this.ctx.strokeStyle = 'white';
    this.ctx.arc(x, y, radiusWithoutBorder, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.fillStyle = 'white';
    this.ctx.fill();

    this.circles.splice(this.indexOfCircle, 1);
    this.canvasElement.removeEventListener('mousemove', this.onMouseMove);
    this.canvasElement.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(event) {
    const radius = this.element.offsetWidth / 2;

    this.circles.forEach((element, index) => {
      if ((element.x - event.offsetX) ** 2 + (element.y - event.offsetY) ** 2 < radius ** 2) {
        this.indexOfCircle = index;
        this.drawFromCenter(element.x, element.y, this.color, 'black');
        this.canvasElement.addEventListener('mousemove', this.onMouseMove);
        this.canvasElement.addEventListener('mouseup', this.onMouseUp);
      }
    });
  }

  onMouseUp() {
    this.canvasElement.removeEventListener('mousemove', this.onMouseMove);
    this.canvasElement.removeEventListener('mouseup', this.onMouseUp);
    this.drawFromCenter(
      this.circles[this.indexOfCircle].x,
      this.circles[this.indexOfCircle].y,
      this.color,
      'black'
    );
  }

  onMouseMove(event) {
    const radius = this.element.offsetWidth / 2;

    this.circles.forEach((element, index) => {
      if ((element.x - event.offsetX) ** 2 + (element.y - event.offsetY) ** 2 < radius ** 2) {
        this.drawFromCenter(element.x, element.y, 'white');
        this.indexOfCircle = index;
      }
    });

    if (this.circles.length - 1 === this.indexOfCircle) {
      this.circles.pop();
    } else if (this.indexOfCircle >= 0) {
      this.circles.splice(this.indexOfCircle, 1);
    }
    this.drawFromCenter(event.offsetX, event.offsetY, this.color);
    this.circles.push({
      x: event.offsetX,
      y: event.offsetY,
    });
    this.indexOfCircle = this.circles.length - 1;
  }
}
