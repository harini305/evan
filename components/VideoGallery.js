'use client';

import { useEffect, useRef, useState } from 'react';
import { videos } from '@/lib/content';

export default function VideoGallery() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) {
      triggerRef.current = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!selected && dialog.open) dialog.close();
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const closeDialog = () => {
    setSelected(null);
    document.body.style.overflow = '';
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading split-heading light-heading" data-reveal>
          <h2 id="work-title">Work that plays well with audiences.</h2>
          <p>Select any production to watch it here. Only the chosen video loads, keeping the rest of the gallery light.</p>
        </div>
        <div className="video-grid" data-reveal>
          {videos.map((video) => (
            <button className="video-tile" type="button" key={video.id} onClick={() => setSelected(video)} aria-label={`Play ${video.title}`}>
              <span className="video-thumbnail">
                <img src={video.thumbnail} alt="" width="640" height="360" loading="lazy" />
                <span className="play-mark" aria-hidden="true">Play</span>
              </span>
              <span className="video-tile-title">{video.title}</span>
            </button>
          ))}
        </div>
      </div>
      <dialog ref={dialogRef} className="video-dialog" aria-labelledby="video-dialog-title" onClose={closeDialog} onCancel={(event) => { event.preventDefault(); closeDialog(); }} onClick={(event) => { if (event.target === dialogRef.current) closeDialog(); }}>
        {selected && (
          <div className="video-dialog-inner">
            <div className="video-dialog-top">
              <div>
                <h3 id="video-dialog-title">{selected.title}</h3>
                <p>{selected.description}</p>
              </div>
              <button className="close-button" type="button" aria-label="Close video and return to gallery" onClick={closeDialog}>×</button>
            </div>
            <div className="video-player-frame">
              <iframe key={selected.id} src={`https://www.youtube.com/embed/${selected.id}?rel=0&autoplay=1&start=${selected.start}`} title={`${selected.title} on YouTube`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <button className="button button-ghost-light" type="button" onClick={closeDialog}>Return to gallery</button>
          </div>
        )}
      </dialog>
    </section>
  );
}
