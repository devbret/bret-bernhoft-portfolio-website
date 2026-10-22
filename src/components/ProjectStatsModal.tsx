import { useEffect, useId, useRef } from "react";
import { X, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectStat } from "@/data/projectStats";

interface ProjectStatsModalProps {
  title: string;
  summary: string;
  stats: ProjectStat[];
  githubUrl?: string;
  liveUrl?: string;
  onClose: () => void;
}

const ProjectStatsModal = ({
  title,
  summary,
  stats,
  githubUrl,
  liveUrl,
  onClose,
}: ProjectStatsModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);
  const titleId = useId();
  const paragraphs = summary
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onPointerDown={(e) => {
        pressStartedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressStartedOnBackdrop.current && e.target === e.currentTarget) {
          close();
        }
      }}
      className="
        w-[calc(100%-2rem)] max-w-2xl max-h-[85vh] p-0
        bg-transparent text-white overflow-y-auto
        backdrop:bg-cyber-black/80 backdrop:backdrop-blur-sm
      "
    >
      <div
        className="
          relative cyber-border bg-cyber-black/95 p-6 md:p-8
          animate-in fade-in-0 zoom-in-95 duration-200
          motion-reduce:animate-none
        "
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 id={titleId} className="text-xl md:text-2xl font-bold">
            {title}
          </h2>
          <button
            onClick={close}
            className="relative z-20 shrink-0 mt-1 md:mt-1.5 text-white/70 hover:text-cyber-neon transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-neon/50"
            aria-label="Close Project Stats"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="divide-y divide-cyber-neon/20">
          {paragraphs.length > 0 && (
            <div className="space-y-4 text-white/80 leading-relaxed py-6 first:pt-0 last:pb-0">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-6 first:pt-0 last:pb-0">
              {stats.map((stat, i) => (
                <div
                  key={`${stat.label}-${i}`}
                  className="rounded-md border border-cyber-neon/20 bg-white/5 px-4 py-3"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-white/60">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-lg text-white break-words">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {(githubUrl || liveUrl) && (
            <div className="flex flex-wrap gap-3 py-6 first:pt-0 last:pb-0">
              {githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github />
                    GitHub Repo
                  </a>
                </Button>
              )}
              {liveUrl && (
                <Button asChild variant="cyber" size="sm">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ProjectStatsModal;
