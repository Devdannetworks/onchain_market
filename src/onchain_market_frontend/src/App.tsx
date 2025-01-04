import { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/footer";

function App() {
  const [greeting, setGreeting] = useState("");

  return (
    <main>
      <Header />
      <Footer />
    </main>
  );
}

export default App;
