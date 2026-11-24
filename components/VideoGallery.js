'use client';

import { useEffect, useRef, useState } from 'react';
import { videos } from '@/lib/content';

export default function VideoGallery() {
  const [activeId, setActiveId] = useState(videos[0].id);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const activeVideo = videos.find((video) => video.id === activeId) || videos[0];

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

  const openVideo = (video) => setSelected(video);

  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading split-heading light-heading" data-reveal>
          <h2 id="work-title">Work that plays well with audiences.</h2>
          <p>Choose a production from the playlist, then watch it here. Only the selected video loads.</p>
        </div>
        <div className="work-showcase" data-reveal>
          <div className="work-feature">
            <button className="work-feature-media" type="button" onClick={() => openVideo(activeVideo)} aria-label={`Play ${activeVideo.title}`}>
              <img src={activeVideo.thumbnail} alt={`Still from ${activeVideo.title}`} width="960" height="540" loading="lazy" />
              <span className="work-feature-play">Play video</span>
            </button>
            <div className="work-feature-caption">
              <h3>{activeVideo.title}</h3>
              <p>{activeVideo.description}</p>
            </div>
          </div>
          <div className="work-playlist" aria-label="Select a video">
            {videos.map((video) => (
              <button key={video.id} type="button" className={activeId === video.id ? 'active' : ''} aria-pressed={activeId === video.id} onClick={() => setActiveId(video.id)}>
                <img src={video.thumbnail} alt="" width="180" height="102" loading="lazy" />
                <span>{video.title}</span>
              </button>
            ))}
          </div>
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
