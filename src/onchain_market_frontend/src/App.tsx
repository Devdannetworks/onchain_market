import { useState } from "react";
import { Button } from "@/components/ui/button";
import Nav from "./Header/Navigation/nav";

function App() {
  const [greeting, setGreeting] = useState("");

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#">
        <input id="name" alt="Name" type="text" />
        {/* <Button>Click Me!</Button> */}
        <Nav />
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
