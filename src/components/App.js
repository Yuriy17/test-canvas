import { FIGURES } from '../utils/constants';
import Figure from './Figure';

export default class App {
  init() {
    window.addEventListener('DOMContentLoaded', () => {
      const squareElement = document.querySelector('#square');
      const circleElement = document.querySelector('#circle');
      const tableElement = document.querySelector('.table');
      const mainRowElement = document.querySelector('#mainRow');
      const canvasElement = document.querySelector('#canvas');
      const ctx = canvasElement.getContext('2d');
      
      this.circle = new Figure();
      this.circle.init({
        element: circleElement,
        constant: FIGURES.circle,
        tableElement,
        mainRowElement,
        canvasElement,
        ctx,
      });
      
      this.square = new Figure();
      this.square.init({
        element: squareElement,
        constant: FIGURES.square,
        tableElement,
        mainRowElement,
        canvasElement,
        ctx,
      });
    });
  }
}
