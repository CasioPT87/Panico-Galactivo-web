import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

export default ({ cursor, staticText, speed, eraseSpeed, eraseDelay, text, typingDelay }) => {
  return (
    <ReactTypingEffect
      text={text}
      staticText={staticText}
      cursor={cursor || '>'}
      cursorRenderer={cursor => cursor}
      speed={speed || 10}
      eraseSpeed={eraseSpeed || 0}
      eraseDelay={eraseDelay || 5000}
      typingDelay={typingDelay || 0}
      displayTextRenderer={(text) => {
        return text;
      }}        
    />
  );
};