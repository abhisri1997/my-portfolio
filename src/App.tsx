import React from "react";
import Achievements from "./components/Achievements";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Intro />
        <Projects />
        <Achievements />
        <Footer />
      </main>
    </>
  );
}

export default App;
