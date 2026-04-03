import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import SEO from '@components/SEO';
import { Button } from '@components/ui';
import { getMockTestById } from '@lib/repositories/contentRepository';

function getLastResultKey(testId) {
  return `aei:mocktest:last:${testId}`;
}

function getHistoryKey(testId) {
  return `aei:mocktest:history:${testId}`;
}

export default function MockTestResult() {
  const { testId } = useParams();
  const location = useLocation();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTest() {
      try {
        const item = await getMockTestById(testId);
        if (mounted) setTest(item);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTest();
    return () => {
      mounted = false;
    };
  }, [testId]);

  const result = useMemo(() => {
    if (location.state) return location.state;
    const raw = localStorage.getItem(getLastResultKey(testId));
    return raw ? JSON.parse(raw) : null;
  }, [location.state, testId]);

  const history = useMemo(() => {
    const raw = localStorage.getItem(getHistoryKey(testId));
    return raw ? JSON.parse(raw) : [];
  }, [testId]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6 text-sm text-[#667085]">Loading result...</div>
    );
  }

  if (!test || !result) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#E4E7EC] bg-white p-6 text-[#101828] shadow-sm">
          <p className="font-semibold">No test result found. Attempt a mock test first.</p>
          <Link to="/mock-tests" className="mt-2 inline-block text-sm font-medium text-[#344054] underline">Back to Mock Tests</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title={`${test.title} Result`} description="Mock test score and review" />

      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 w-full max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">Test Center</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#101828]">Result Summary</h1>
          <p className="mt-1 text-sm text-[#344054]">{test.title}</p>
        </div>

        <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-3xl font-semibold text-[#101828]">{result.score}%</h3>
            <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#344054]">
              {result.score >= 50 ? 'Passed' : 'Needs Improvement'}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#344054]">
            Correct: {result.correct} / {result.total} · Wrong: {result.wrong}
          </p>
        </div>

        <div className="mx-auto mb-4 w-full max-w-5xl rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
          <h4 className="mb-2 text-lg font-semibold text-[#101828]">Attempt History</h4>
          <div className="space-y-2">
            {history.slice().reverse().map((item, idx) => (
              <div key={`${item.attemptedAt}-${idx}`} className="flex items-center justify-between rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] px-3 py-2">
                <span className="text-sm text-[#344054]">Attempt {history.length - idx}</span>
                <span className="text-sm font-semibold text-[#101828]">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-3">
          <Link to={`/test-center/${test.id}`}><Button variant="outline" className="!border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]">Reattempt</Button></Link>
          <Link to="/mock-tests"><Button variant="outline" className="!border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]">Back to Tests</Button></Link>
        </div>
      </div>
    </>
  );
}
