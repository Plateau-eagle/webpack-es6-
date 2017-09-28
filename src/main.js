import Card from './js/card.js'
import './css/css-reset.css'
import './css/card.css'
import $ from 'jquery'
import './img/heart.png'
const card = new Card({
    container: 'card',
    resultText: 'i love you！',
    textBgColor: 'url(./img/heart.png) -55px',
    //defaultColor: '#fff',
    rubberSize: 50,
    //rubber:'url(./img/),auto;',
    width:400,
    height:400,
    color:'#fff'
});