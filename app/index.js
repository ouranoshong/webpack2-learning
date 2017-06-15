import 'react';

// import _ from 'lodash';
import styles from './index.css';

// import myComponent from './components/myComponent';

// import fontAwesome from 'font-awesome/css/font-awesome.css';


// import 'purecss';

// import {shake} from './shake';

// shake();

function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = ['Hello', 'Webpack'].join(' ');

    // element.innerHTML = _.join(['Hello', 'Webpack'], ' ');

    element.className = styles.redButton;

    // test purify css

    // element.className = 'pure-button';

    // console.log(myComponent);

    // use font awesome

    // element.className = [fontAwesome.fa, fontAwesome['fa-hand-spock-o'], styles.redButton].join(' ');


    return element;
}

document.body.appendChild(component());
