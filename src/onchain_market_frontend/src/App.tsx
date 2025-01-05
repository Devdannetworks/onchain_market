import { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import Main from "./Main/Main";

function App() {
  const [greeting, setGreeting] = useState("");

  return (
    <main>
      <Header />
      <Main />
      <Footer />
    </main>
  );
}

export default App;
