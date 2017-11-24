import React, { Component } from 'react';
import { render } from 'react-dom';
import Mapfit from './components/Mapfit';
import { requests } from '../../requests';
import '../../assets/css/styles.css';

render(<Mapfit requests={requests} />, document.getElementById('mapContainer'));