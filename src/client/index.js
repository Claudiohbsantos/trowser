import React, { Component } from 'react';
import { render } from 'react-dom';
// import './main.scss'
import App from './components/App.jsx'

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root);
