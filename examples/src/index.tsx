import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Simple } from './Simple';
import { TwoPage } from './TwoPage';

createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <StrictMode>
    {/* <Simple /> */}
    <TwoPage />
  </StrictMode>
);
