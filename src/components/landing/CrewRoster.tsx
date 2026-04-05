import { CREW } from "@/lib/crew";

export function CrewRoster() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {CREW.map((agent) => {
        const Icon = agent.icon;
        return (
          <div
            key={agent.id}
            className="group rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <Icon
                className={agent.color}
                size={18}
                strokeWidth={2}
                aria-hidden
              />
              <h3 className={`font-mono text-sm ${agent.color}`}>
                {agent.name}
              </h3>
            </div>
            <p className="font-mono text-[11px] text-white/40 mb-3">
              {agent.role}
            </p>
            <p className="font-mono text-[12px] leading-relaxed text-white/70 italic">
              &ldquo;{agent.voice}&rdquo;
            </p>
          </div>
        );
      })}
    </div>
  );
}
