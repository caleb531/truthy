import '@fontsource/oxygen-mono';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import m from 'mithril';
import '../styles/index.scss';
import AppComponent from './components/app.jsx';

m.mount(document.querySelector('main'), AppComponent);
