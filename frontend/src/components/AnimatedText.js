import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const words = ["Students", "Everyone", "Meetings"];
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [delta, setDelta] = useState(200);

  useEffect(() => {
    let timer;
    
    const tick = () => {
      const currentIndex = wordIndex % words.length;
      const fullWord = words[currentIndex];

      if (isDeleting) {
        // Removing characters
        setCurrentWord(prev => prev.slice(0, -1));
        setDelta(100); // Faster deletion
      } else {
        // Adding characters
        setCurrentWord(prev => fullWord.slice(0, prev.length + 1));
        setDelta(200); // Slower typing
      }

      if (!isDeleting && currentWord === fullWord) {
        // Start deleting after a pause
        setTimeout(() => setIsDeleting(true), 2000);
        setDelta(100);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setWordIndex(prev => prev + 1);
        setDelta(500); // Pause before typing next word
      }
    };

    timer = setTimeout(tick, delta);
    return () => clearTimeout(timer);
  }, [currentWord, delta, isDeleting, wordIndex]);

  return (
    <span className="text-blue-500">
      {currentWord || "\u00A0"}
    </span>
  );
};

export default AnimatedText;
