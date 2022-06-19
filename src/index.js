import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const theme = extendTheme({
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
  fonts: {
    heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
});

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
