/* App root */

function App() {
  const [heroMode, setHeroMode] = React.useState(window.TWEAK_DEFAULTS.heroMode);
  const [h1Default, setH1Default] = React.useState(window.TWEAK_DEFAULTS.h1Default);
  const [variantKey, setVariantKey] = React.useState(window.TWEAK_DEFAULTS.h1Default);

  // When default variant changes via tweaks, reset the active variant.
  React.useEffect(() => { setVariantKey(h1Default); }, [h1Default]);

  // Scroll reveal
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [heroMode]);

  const tweakState = { heroMode, h1Default };
  const setTweakState = (updater) => {
    const next = typeof updater === 'function' ? updater(tweakState) : updater;
    if ('heroMode' in next) setHeroMode(next.heroMode);
    if ('h1Default' in next) setH1Default(next.h1Default);
  };

  return (
    <>
      <Nav/>
      <main>
        <Hero heroMode={heroMode}
              variantKey={variantKey}
              onVariantChange={setVariantKey}/>
        <TrustStrip/>
        <Belief/>
        <Practices/>
        <HowWeWork/>
        <Writing/>
        <BuyerQualifier/>
        <ClosingCTA/>
      </main>
      <Footer/>
      <TweaksPanel state={tweakState} setState={setTweakState}/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
