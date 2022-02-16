import React, { useEffect } from 'react';
const App = () => {
  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        console.log('Close')
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  return(<p><input /></p>);
}

export default App;