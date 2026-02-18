import SplitText from "./SplitText";

function App() {
  // 1. This is your exact 'handle' code from the site
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    // 2. I added this <div> so the text is centered and visible on your screen
    <div style={{width: '200vh', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', fontSize: '42px' }}>
      
      {/* 3. This is your EXACT SplitText code from the site */}
      <SplitText
        text="Hello, you!"
        className="text-2xl font-semibold text-center"
        delay={50}
        duration={3}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
        showCallback
      />

    </div>
  );
}

export default App;