import {createRoot} from 'react-dom/client';
import { Agendar } from './components/Agendar';
import './index.css';
import { initAnalytics } from './analytics';

initAnalytics();

createRoot(document.getElementById('root')!).render(<Agendar />);
