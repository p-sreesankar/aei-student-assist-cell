import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, PlayCircle } from 'lucide-react';
import SEO from '@components/SEO';
import { formatDate } from '@utils/date';
import { getMockTestStatus } from '@utils/mock-tests';
import { getMockTests, subscribeContentUpdates } from '@lib/repositories/contentRepository';

const statusText = {
  upcoming: 'Upcoming',
  live: 'Live',
  previous: 'Closed',
};

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTests() {
      try {
        const items = await getMockTests();
        if (mounted) setTests(items);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTests();
    const unsubscribe = subscribeContentUpdates(() => {
      loadTests();
    }, ['mockTests']);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const sorted = useMemo(
    () => [...tests].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    [tests],
  );

  const counts = useMemo(
    () =>
      sorted.reduce(
        (acc, test) => {
          const status = getMockTestStatus(test);
          if (status === 'upcoming') acc.upcoming += 1;
          else if (status === 'live') acc.live += 1;
          else acc.closed += 1;
          return acc;
        },
        { upcoming: 0, live: 0, closed: 0 },
      ),
    [sorted],
  );

  function statusClass(status) {
    if (status === 'live') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    if (status === 'upcoming') return 'border-sky-200 bg-sky-50 text-sky-700';
    return 'border-slate-200 bg-slate-50 text-slate-700';
  }

  return (
    <>
      <SEO title="Mock Tests" description="Attempt mock tests, track scores, and reattempt anytime." />

      <div className="min-h-screen bg-gradient-to-b from-[#F1F7FF] via-[#F7FAFF] to-[#FFFFFF] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 w-full max-w-5xl rounded-3xl border border-[#D9E2EC] bg-white/90 p-6 shadow-sm backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">Assessment Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#101828]">Mock Tests</h1>
          <p className="mt-2 text-sm text-[#475467]">Open a test to enter the isolated test center.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-medium text-sky-700">Upcoming: {counts.upcoming}</span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700">Live: {counts.live}</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-medium text-slate-700">Closed: {counts.closed}</span>
          </div>
        </div>

        {loading ? (
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm text-[#667085] shadow-sm">
            Loading mock tests...
          </div>
        ) : sorted.length === 0 ? (
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#E4E7EC] bg-white p-5 text-sm text-[#667085] shadow-sm">
            No mock tests available yet.
          </div>
        ) : (
          <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
            {sorted.map((test) => {
              const status = getMockTestStatus(test);
              return (
                <article key={test.id} className="rounded-2xl border border-[#DCE4EE] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass(status)}`}>
                          {statusText[status] || 'Unknown'}
                        </span>
                        <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1 text-xs font-medium text-[#344054]">
                          Semester {test.semester}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#101828]">{test.title}</h3>
                      <p className="mt-1 text-sm text-[#475467]">{test.subject}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-[#475467]">
                    <p className="flex items-center gap-2"><Clock3 size={14} /> {test.durationMinutes} minutes · {test.questions.length} questions</p>
                    <p>Starts: {formatDate(test.startDate)}</p>
                    <p>Ends: {formatDate(test.endDate)}</p>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/test-center/${test.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D0D5DD] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#101828] transition-colors hover:bg-[#EEF2F6]"
                    >
                      <PlayCircle size={15} />
                      Do Mock Test
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
