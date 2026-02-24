import { useEffect, useMemo, useState } from "react";
import { LuPlay, LuVolume2, LuVolumeX } from "react-icons/lu";
import "../../styles/Video.css";

const videos = [
  {
    id: 1,
    youtubeId: "jNQXAC9IVRw",
    title: "Short Test 1",
    description: "Exemplo de YouTube Shorts",
    duration: 20000
  },
  {
    id: 2,
    youtubeId: "9bZkp7q19f0",
    title: "Short Test 2",
    description: "Vídeo vertical popular",
    duration: 20000
  },
  {
    id: 3,
    youtubeId: "kxopViU98Xo",
    title: "Short Test 3",
    description: "Formato vertical",
    duration: 20000
  },
  {
    id: 4,
    youtubeId: "fLexgOxsZu0",
    title: "Short Test 4",
    description: "Embed vertical",
    duration: 20000
  },
  {
    id: 5,
    youtubeId: "l482T0yNkeo",
    title: "Short Test 5",
    description: "Teste de funcionamento",
    duration: 20000
  }
];

function ytThumb(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function ytEmbedUrl({ youtubeId, autoplay, muted }) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export default function Videos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let slideTimer = null;
    let progressTimer = null;

    if (isPlaying) {
      const duration = videos[currentIndex].duration;
      const tick = 50;
      const step = 100 / (duration / tick);

      progressTimer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + step));
      }, tick);

      slideTimer = setInterval(() => {
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, duration);
    }

    return () => {
      if (slideTimer) clearInterval(slideTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [isPlaying, currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
    setIsPlaying(false);
  };

  const visibleVideos = useMemo(() => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + videos.length) % videos.length;
      visible.push({ ...videos[index], offset: i, index });
    }
    return visible;
  }, [currentIndex]);

  return (
    <section className="videos-section" aria-label="Seção de vídeos">
      <div className="videos-bg-dots" aria-hidden="true" />

      <div className="videos-container">
        <div className="videos-stage">
          <div className="videos-rail">
            {visibleVideos.map((video) => {
              const isCenter = video.offset === 0;

              return (
                <div
                  key={`${video.id}-${video.offset}`}
                  className={[
                    "video-item",
                    isCenter ? "is-center" : "is-side",
                    `offset-${video.offset}`,
                  ].join(" ")}
                  onClick={() => (!isCenter ? goToSlide(video.index) : null)}
                  role={!isCenter ? "button" : undefined}
                  tabIndex={!isCenter ? 0 : -1}
                  onKeyDown={(e) => {
                    if (!isCenter && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      goToSlide(video.index);
                    }
                  }}
                >
                  <div className="video-card">
                    {isCenter && isPlaying ? (
                      <div className="video-iframe-wrap">
                        <iframe
                          key={`${video.youtubeId}-${isMuted}-${currentIndex}-${isPlaying}`}
                          className="video-iframe"
                          src={ytEmbedUrl({
                            youtubeId: video.youtubeId,
                            autoplay: true,
                            muted: isMuted,
                          })}
                          title={video.title}
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <img
                        src={ytThumb(video.youtubeId)}
                        alt={video.title}
                        className="video-thumb"
                        loading="lazy"
                      />
                    )}
                    <div className="video-overlay" aria-hidden="true" />

                    <div className="video-info">
                      <h3 className="video-name">{video.title}</h3>
                      <p className="video-desc">{video.description}</p>
                    </div>

                    <div className="video-badge">Escuta MKT</div>

                    {isCenter && !isPlaying && (
                      <button
                        type="button"
                        className="video-play"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(true);
                          setProgress(0);
                        }}
                        aria-label="Reproduzir"
                      >
                        <LuPlay className="video-play-icon" />
                      </button>
                    )}

                    {isCenter && isPlaying && (
                      <>
                        <div className="video-progress">
                          <div
                            className="video-progress-bar"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <button
                          type="button"
                          className="video-mute"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted((v) => !v);
                          }}
                          aria-label={isMuted ? "Ativar som" : "Mutar"}
                        >
                          {isMuted ? (
                            <LuVolumeX className="video-mute-icon" />
                          ) : (
                            <LuVolume2 className="video-mute-icon" />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="videos-dots" aria-label="Navegação de vídeos">
          {videos.map((v, index) => (
            <button
              key={v.id}
              type="button"
              className={index === currentIndex ? "dot is-active" : "dot"}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para ${v.title}`}
            />
          ))}
        </div>

        <div className="videos-cta">
          <button
            type="button"
            className="videos-toggle"
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? (
              <>
                <span className="pause-icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
                Pausar
              </>
            ) : (
              <>
                <LuPlay className="toggle-play-icon" />
                Reproduzir
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}