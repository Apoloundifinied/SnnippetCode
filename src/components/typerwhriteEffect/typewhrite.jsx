import React from "react";
import Typewriter from "typewriter-effect";

function Typewriterthis() {
  return (
    <Typewriter
      options={{
        loop: true,
        autoStart: true,
        delay: 75,  // velocidade de digitação
        deleteSpeed: 50,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Simple")
          .pauseFor(5000)
          .deleteAll()
          .typeString("Fast")
          .pauseFor(5000)
          .deleteAll()
          .typeString("Easy")
          .pauseFor(5000)
          .deleteAll()
          .start();
      }}
    />
  );
}

export default Typewriterthis;
