import ReactTypingEffect from 'react-typing-effect';

export default ({ text }: { text: string }) => {
  return (
    <ReactTypingEffect
      text={text}
      cursor={'>'}
      cursorRenderer={(cursor: string): string => cursor}
      speed={10}
      eraseSpeed={0}
      eraseDelay={5000}
      typingDelay={0}
      displayTextRenderer={(text: string): string => {
        return text;
      }}        
    />
  );
};