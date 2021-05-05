import _ from 'lodash';
import './style.css';
import printMe from './print'

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button')
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack','あいうえお'], ' ');
    btn.innerHTML = 'click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }
  
  document.body.appendChild(component());