import "../styles/globalStyle.css";
import { CartProvider } from "../src/contexts/CartContext";
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />;
    </CartProvider>
  );
}

export default MyApp;
