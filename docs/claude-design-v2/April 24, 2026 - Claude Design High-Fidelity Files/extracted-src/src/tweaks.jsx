/* Tweaks panel: hero mode + H1 default */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMode": "console",
  "h1Default": "A"
}/*EDITMODE-END*/;

function TweaksPanel({ state, setState }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode')   setOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (edits) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
  };

  const set = (k, v) => {
    setState(s => ({ ...s, [k]: v }));
    persist({ [k]: v });
  };

  return (
    <div className={`tweaks ${open ? 'open' : ''}`} role="dialog" aria-label="Tweaks">
      <h5>
        <span>Tweaks</span>
        <span className="close" onClick={() => setOpen(false)} role="button" aria-label="Close tweaks">×</span>
      </h5>
      <div className="grp">
        <div className="lbl">Hero mode</div>
        <div className="seg">
          <button className={state.heroMode === 'console' ? 'active' : ''}
                  onClick={() => set('heroMode', 'console')}>console</button>
          <button className={state.heroMode === 'fallback' ? 'active' : ''}
                  onClick={() => set('heroMode', 'fallback')}>fallback</button>
        </div>
      </div>
      <div className="grp">
        <div className="lbl">H1 default variant</div>
        <div className="seg" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
          <button className={state.h1Default === 'A' ? 'active' : ''}
                  onClick={() => set('h1Default', 'A')}>A</button>
          <button className={state.h1Default === 'B' ? 'active' : ''}
                  onClick={() => set('h1Default', 'B')}>B</button>
          <button className={state.h1Default === 'C' ? 'active' : ''}
                  onClick={() => set('h1Default', 'C')}>C</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel, TWEAK_DEFAULTS });
