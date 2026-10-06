"use client";

import { IconPlayerPlayFilled, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface Video {
  title?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
}

function getYoutubeId(url?: string) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

function VideoLightbox({
  id,
  title,
  onClose,
}: {
  id: string;
  title: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="backdrop:bg-ink-950/90 m-auto w-full max-w-5xl bg-transparent p-4 backdrop:backdrop-blur-md sm:p-8"
    >
      <div className="animate-fade-in">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-display text-bone truncate text-xl font-bold uppercase">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar vídeo"
            className="bg-ink-800 text-bone hover:bg-brass hover:text-ink-950 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
          >
            <IconX size={20} />
          </button>
        </div>
        <div className="bg-ink-900 relative aspect-video overflow-hidden rounded-sm">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </dialog>
  );
}

export default function VideoGallery({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<{ id: string; title: string } | null>(
    null,
  );
  const featureFirst = videos.length % 2 === 1;

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {videos.map((video, index) => {
          const id = getYoutubeId(video.youtubeUrl);
          const title = video.title || "Vídeo Rosa dos Ventos";
          const thumb =
            video.thumbnailUrl ||
            (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "");
          const featured = featureFirst && index === 0 && videos.length > 1;

          const content = (
            <>
              {thumb && (
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes={featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover opacity-80 transition-[opacity,transform] duration-700 ease-(--ease-out-expo) group-hover:scale-105 group-hover:opacity-100"
                />
              )}
              <span
                aria-hidden="true"
                className="from-ink-950 via-ink-950/30 absolute inset-0 bg-linear-to-t to-transparent"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="bg-brass text-ink-950 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_0_10px_rgb(220_168_92/0.15)] transition-all duration-500 ease-(--ease-out-expo) group-hover:scale-110 group-hover:shadow-[0_0_0_16px_rgb(220_168_92/0.2)] sm:h-20 sm:w-20">
                  <IconPlayerPlayFilled
                    size={28}
                    aria-hidden="true"
                    className="ml-1"
                  />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6">
                <span className="text-brass block font-mono text-[10px] tracking-[0.25em] uppercase">
                  Vídeo {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-bone mt-1 block text-2xl leading-tight font-extrabold uppercase sm:text-3xl">
                  {title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="border-bone/10 group-hover:border-brass/50 pointer-events-none absolute inset-0 rounded-sm border transition-colors duration-500"
              />
            </>
          );

          const classes =
            "group bg-ink-850 relative block aspect-video w-full overflow-hidden rounded-sm";

          return (
            <li key={index} className={featured ? "md:col-span-2" : ""}>
              {id ? (
                <button
                  type="button"
                  onClick={() => setPlaying({ id, title })}
                  aria-label={`Assistir: ${title}`}
                  className={classes}
                >
                  {content}
                </button>
              ) : (
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Assistir: ${title} (abre em nova aba)`}
                  className={classes}
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {playing && (
        <VideoLightbox
          id={playing.id}
          title={playing.title}
          onClose={() => setPlaying(null)}
        />
      )}
    </>
  );
}
