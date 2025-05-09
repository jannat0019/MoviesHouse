import { ThemeContext } from '@/src/context/ThemeContext';
import '../styles/globals.css'
import { ThemeProvider } from '@/src/context/ThemeContext';

function MyApp({ Component, pageProps }) {
    return (
      // <div className="bg-gray-100 min-h-screen"> {/* Global gray background */}
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
  
  export default MyApp;