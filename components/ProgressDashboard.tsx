"use client";

import { ProgressState } from "@/types";
import { ProgressBar } from "./ui/ProgressBar";

interface ProgressDashboardProps {
  progress: ProgressState;
}

export function ProgressDashboard({ progress }: ProgressDashboardProps) {
  const { totals, sessions } = progress;
  const recentSessions = sessions.slice(0, 5);

  const cardMastery =
    totals.studiedCards === 0
      ? 0
      : Math.round((totals.masteredCards / totals.studiedCards) * 100);
  const verbMastery =
    totals.studiedVerbs === 0
      ? 0
      : Math.round((totals.masteredVerbs / totals.studiedVerbs) * 100);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Study streak"
          value={`${totals.streak} days`}
          helper={
            totals.lastStudyDate
              ? `Last study: ${new Date(
                  totals.lastStudyDate
                ).toLocaleDateString()}`
              : "Start studying to begin your streak"
          }
        />
        <MetricCard
          title="Vocabulary studied"
          value={totals.studiedCards}
          helper={`${totals.masteredCards} mastered`}
        />
        <MetricCard
          title="Verbs practiced"
          value={totals.studiedVerbs}
          helper={`${totals.masteredVerbs} mastered`}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white/90 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">
            Vocabulary mastery
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Keep flipping cards until you reach 100%.
          </p>
          <ProgressBar className="mt-6" value={cardMastery} />
        </div>
        <div className="rounded-3xl bg-white/90 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Verb mastery</h3>
          <p className="mt-1 text-sm text-slate-500">
            Practice conjugations across tenses.
          </p>
          <ProgressBar className="mt-6" value={verbMastery} />
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent sessions
          </h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Last 5
          </span>
        </div>
        {recentSessions.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            Study a deck or play the verb game to see your history here.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {recentSessions.map((session) => (
              <li
                key={session.id}
                className="flex items-center justify-between rounded-2xl bg-primary-50/70 px-4 py-3 text-sm text-primary-700"
              >
                <div>
                  <p className="font-semibold">
                    {session.category === "verbs"
                      ? "Verb practice"
                      : session.category}
                  </p>
                  <p className="text-xs text-primary-500">
                    {new Date(session.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {session.correct} / {session.total}
                  </p>
                  <p className="text-xs text-primary-500">
                    {Math.round((session.correct / session.total) * 100)}%
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  title,
  value,
  helper
}: {
  title: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-card">
      <p className="text-xs uppercase tracking-wide text-primary-500">
        {title}
      </p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{helper}</p>
    </div>
  );
}
