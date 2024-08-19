import m from 'mithril';
import AppComponent from './components/app.jsx';
import '../styles/index.scss';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/oxygen-mono';

m.mount(document.querySelector('main'), AppComponent);
