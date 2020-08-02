import { FIGURES } from '../utils/constants';
import Circle from './Circle';
import Square from './Square';

export default class Figure {

  init(props){
    const {
      element,
      constant,
      tableElement,
      mainRowElement,
      canvasElement,
      ctx,
    } = props;

    this.tableElement = tableElement;
    this.mainRowElement = mainRowElement;

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

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.isDrag = false;

    document.addEventListener('mouseup', () => {
      this.isDrag = false;
    });
    
    element.addEventListener('mousedown',this.onMouseDown);
  }

  moveAt(pageX, pageY) {
    const { element } = this.figure;
    let left = pageX - element.offsetWidth - this.tableElement.offsetLeft / 2;
    let top = pageY - ( element.offsetHeight + this.tableElement.offsetTop) / 2;
    const maxLeft = this.tableElement.offsetWidth - element.offsetWidth;
    const maxTop = this.tableElement.offsetHeight - element.offsetHeight;

    if(left < 0){
      left = 0;
    } else if( left > maxLeft){
      left = maxLeft;
    }

    if(top < this.mainRowElement.offsetTop){
      top = this.mainRowElement.offsetTop;
    } else if( top > maxTop){
      top = maxTop;
    }
    element.style.left = `${ left  }px`;
    element.style.top = `${ top  }px`;

  }

  onMouseMove(event) { 
    if(this.isDrag){
     this.moveAt(event.pageX, event.pageY);
    } 
  }

  onMouseDown(event){
    const { element } = this.figure;
    this.isDrag = true;
    element.classList.toggle('figure__item_selected');
    this.tableElement.addEventListener('mousemove', this.onMouseMove, true);
    this.moveAt(event.pageX, event.pageY);
    element.onmouseup = () => {
      element.classList.toggle('figure__item_selected');
      this.tableElement.removeEventListener('mousemove', this.onMouseMove, true);
      element.onmouseup = null;
    };
  }
};
