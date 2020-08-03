import { FIGURES } from '../utils/constants';
import Circle from './Circle';
import Square from './Square';

export default class Figure {
  init(props) {
    const { element, constant, tableElement, mainRowElement, canvasElement, ctx } = props;

    this.tableElement = tableElement;
    this.mainRowElement = mainRowElement;
    this.canvasElement = canvasElement;

    switch (constant) {
      case FIGURES.circle:
        this.figure = new Circle();
        break;
      case FIGURES.square:
        this.figure = new Square();
        break;

      default:
        break;
    }

    this.figure.init({
      element,
      tableElement,
      mainRowElement,
      canvasElement,
      ctx,
    });

    // initializing handler to it's binded version, this is required for properly work of removeEventListener
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.isDrag = false;
    element.addEventListener('mousedown', this.onMouseDown);
  }

  moveAt(pageX, pageY) {
    const { element } = this.figure;
    const limits = {
      top: this.tableElement.offsetTop + this.mainRowElement.offsetTop + element.offsetHeight / 2,
      left: this.tableElement.offsetLeft + element.offsetWidth / 2,
      right: this.tableElement.offsetWidth + this.tableElement.offsetLeft - element.offsetWidth / 2,
      bottom: this.tableElement.offsetHeight + this.tableElement.offsetTop - element.offsetHeight / 2,
    };
    this.newLocation = {
      x: 0,
      y: this.mainRowElement.offsetTop,
    };

    if (pageX > limits.right) {
      this.newLocation.x = limits.right - this.tableElement.offsetLeft - element.offsetWidth / 2;
    } else if (pageX > limits.left) {
      this.newLocation.x = pageX - this.tableElement.offsetLeft - element.offsetWidth / 2;
    }
    if (pageY > limits.bottom) {
      this.newLocation.y = limits.bottom - this.tableElement.offsetTop - element.offsetHeight / 2;
    } else if (pageY > limits.top) {
      this.newLocation.y = pageY - this.tableElement.offsetTop - element.offsetHeight / 2;
    }

    element.style.left = `${this.newLocation.x}px`;
    element.style.top = `${this.newLocation.y}px`;
  }


  drawIfCanvas(x, y) {
    if (x > this.tableElement.offsetWidth - this.canvasElement.offsetWidth) {
      this.figure.draw(
        x  - (this.tableElement.offsetWidth - this.canvasElement.offsetWidth),
        y - this.mainRowElement.offsetTop
      );
    }
  }

  onMouseMove(event) {
    if (this.isDrag) {
      this.moveAt(event.pageX, event.pageY);
    }
  }

  onMouseDown(event) {
    const { element } = this.figure;
    this.isDrag = true;
    element.classList.toggle('figure__item_selected');
    this.tableElement.addEventListener('mousemove', this.onMouseMove);

    this.moveAt(event.pageX, event.pageY);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp() {
    const { element, startLeft, startTop } = this.figure;

    this.isDrag = false;
    this.drawIfCanvas(this.newLocation.x, this.newLocation.y);
    element.classList.remove('figure__item_selected');
    this.tableElement.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    element.style.left = `${startLeft}px`;
    element.style.top = `${startTop}px`;
  }
}
