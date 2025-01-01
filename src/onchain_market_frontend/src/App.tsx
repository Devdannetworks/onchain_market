import { useState } from "react";
import Header from "./Header/Header";

function App() {
  const [greeting, setGreeting] = useState("");

  return (
    <main>
      <Header />
    </main>
  );
}

export default App;
