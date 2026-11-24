'use client';

import { useEffect, useRef, useState } from 'react';

const videoUrl = 'https://player.vimeo.com/video/792636086?h=8b52e43c3e&autoplay=1&loop=1&autopause=0&muted=1&title=0&byline=0&portrait=0&controls=0';

export default function HeroVideo() {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const desktopMotion = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    if (desktopMotion.matches && !navigator.connection?.saveData) setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return undefined;
    let cancelled = false;
    const initialise = () => {
      if (cancelled || !iframeRef.current || !window.Vimeo?.Player) return;
      const player = new window.Vimeo.Player(iframeRef.current);
      playerRef.current = player;
      player.ready().then(async () => {
        if (cancelled) return;
        setReady(true);
        await player.setMuted(true);
        setMuted(true);
        try {
          await player.play();
        } catch {
          setPlaying(false);
        }
      }).catch(() => {
        if (!cancelled) setError('The showreel could not load. The poster is still available.');
      });
      player.on('play', () => setPlaying(true));
      player.on('pause', () => setPlaying(false));
      player.on('error', () => setError('The showreel could not play. The poster is still available.'));
    };
    if (window.Vimeo?.Player) {
      initialise();
    } else {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = initialise;
      script.onerror = () => setError('The showreel could not load. The poster is still available.');
      document.body.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (playerRef.current) {
        const result = playerRef.current.destroy();
        if (result?.catch) result.catch(() => {});
        playerRef.current = null;
      }
    };
  }, [shouldLoad]);

  const togglePlayback = async () => {
    if (error) {
      setError('');
      setReady(false);
      setShouldLoad(false);
      window.requestAnimationFrame(() => setShouldLoad(true));
      return;
    }
    if (!shouldLoad) {
      setShouldLoad(true);
      return;
    }
    const player = playerRef.current;
    if (!player || !ready) return;
    const paused = await player.getPaused();
    if (paused) await player.play().catch(() => setError('Playback needs the Vimeo player controls.'));
    else await player.pause();
  };

  const toggleMute = async () => {
    const player = playerRef.current;
    if (!player || !ready) return;
    const next = !muted;
    await player.setMuted(next);
    setMuted(next);
  };

  return (
    <div className="hero-media" aria-label="evam showreel">
      <img className="hero-poster" src="/assets/home-vimeo-poster-opt.webp" alt="Performers in a scene from the evam showreel" width="1280" height="720" fetchPriority="high" />
      {shouldLoad && !error && (
        <iframe ref={iframeRef} className={`hero-iframe ${ready ? 'is-ready' : ''}`} src={videoUrl} title="evam showreel on Vimeo" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
      )}
      <div className="hero-controls" aria-label="Showreel controls">
        <button type="button" onClick={togglePlayback} disabled={shouldLoad && !ready && !error} aria-label={playing ? 'Pause showreel' : 'Play showreel'}>
          {playing ? 'Pause video' : shouldLoad && !ready && !error ? 'Loading video…' : 'Play showreel'}
        </button>
        <button type="button" onClick={toggleMute} disabled={!ready || !!error} aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}>{muted ? 'Sound on' : 'Mute'}</button>
      </div>
      <span className="sr-only" role="status" aria-live="polite">{error || (ready ? `Showreel ${playing ? 'playing' : 'paused'}, ${muted ? 'muted' : 'sound on'}` : '')}</span>
      {error && <p className="hero-error" role="status">{error}</p>}
    </div>
  );
}
