import {createRoot} from 'react-dom/client';
import { Agendar } from './components/Agendar';
import './index.css';
import { initAnalytics, track } from './analytics';

initAnalytics();
track('page_view', { page_title: 'Mara Schmitman | agendar', page_location: location.href });

createRoot(document.getElementById('root')!).render(<Agendar />);
