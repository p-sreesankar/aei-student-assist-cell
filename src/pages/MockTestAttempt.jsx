import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock3, ListChecks, ShieldCheck } from 'lucide-react';
import SEO from '@components/SEO';
import { Button } from '@components/ui';
import { evaluateMockTest } from '@utils/mock-tests';
import { getMockTestById } from '@lib/repositories/contentRepository';

function getAttemptKey(testId) {
  return `aei:mocktest:attempt:${testId}`;
}

function getLastResultKey(testId) {
  return `aei:mocktest:last:${testId}`;
}

function getHistoryKey(testId) {
  return `aei:mocktest:history:${testId}`;
}

export default function MockTestAttempt() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [remainingSec, setRemainingSec] = useState(0);
  const [started, setStarted] = useState(false);
  const answeredCount = Object.keys(answers).length;

  const normalizedQuestions = useMemo(() => {
    if (!Array.isArray(test?.questions)) return [];

    return test.questions
      .filter((q) => q && typeof q.question === 'string' && Array.isArray(q.options))
      .map((q) => ({
        ...q,
        options: q.options.filter((opt) => typeof opt === 'string' && opt.trim().length > 0),
      }))
      .filter((q) => q.options.length > 0);
  }, [test]);

  useEffect(() => {
    let mounted = true;

    async function loadTest() {
      try {
        const item = await getMockTestById(testId);
        if (!mounted) return;
        setTest(item);
        setRemainingSec(item ? item.durationMinutes * 60 : 0);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTest();
    return () => {
      mounted = false;
    };
  }, [testId]);

  useEffect(() => {
    if (!test) return;
    const raw = localStorage.getItem(getAttemptKey(test.id));
    if (!raw) return;

    try {
      const state = JSON.parse(raw);
      setAnswers(state.answers || {});
      setRemainingSec(Number(state.remainingSec || test.durationMinutes * 60));
      setStarted(Boolean(state.started));
    } catch {
      localStorage.removeItem(getAttemptKey(test.id));
    }
  }, [test]);

  useEffect(() => {
    if (!test) return;
    localStorage.setItem(
      getAttemptKey(test.id),
      JSON.stringify({ answers, remainingSec, started }),
    );
  }, [answers, remainingSec, started, test]);

  useEffect(() => {
    if (!started || !test) return;
    if (remainingSec <= 0) {
      handleSubmit();
      return;
    }

    const id = setInterval(() => setRemainingSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [started, remainingSec, test]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6 text-sm text-[#667085]">Loading mock test...</div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6 text-[#101828]">Mock test not found.</div>
    );
  }

  if (normalizedQuestions.length === 0) {
    return (
      <div className="min-h-screen px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#E4E7EC] bg-white p-6 text-[#101828] shadow-sm">
          <p className="font-semibold">This mock test has no valid questions yet.</p>
          <p className="mt-2 text-sm text-[#475467]">Ask admin to add questions in the dashboard and try again.</p>
        </div>
      </div>
    );
  }

  function selectAnswer(qid, optionIndex) {
    setAnswers((prev) => ({ ...prev, [qid]: optionIndex }));
  }

  function handleSubmit() {
    const result = evaluateMockTest({ ...test, questions: normalizedQuestions }, answers);
    const payload = {
      ...result,
      testId: test.id,
      testTitle: test.title,
      attemptedAt: new Date().toISOString(),
      answers,
    };

    const history = JSON.parse(localStorage.getItem(getHistoryKey(test.id)) || '[]');
    history.push(payload);

    localStorage.setItem(getHistoryKey(test.id), JSON.stringify(history));
    localStorage.setItem(getLastResultKey(test.id), JSON.stringify(payload));
    localStorage.removeItem(getAttemptKey(test.id));

    navigate(`/test-center/${test.id}/result`, { state: payload, replace: true });
  }

  const mm = String(Math.floor(remainingSec / 60)).padStart(2, '0');
  const ss = String(remainingSec % 60).padStart(2, '0');

  return (
    <>
      <SEO title={`${test.title} Attempt`} description="Attempt timed mock test" />

      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 w-full max-w-5xl">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">Test Center</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#101828]">{test.title}</h1>
          <p className="mt-1 text-sm text-[#475467]">Complete all questions in one sitting.</p>
        </div>

        <div className="mx-auto mb-5 w-full max-w-5xl rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#475467]">
              <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1">Time Left: {mm}:{ss}</span>
              <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1">{answeredCount}/{normalizedQuestions.length} answered</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#475467]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1">
                <Clock3 size={12} /> Timed
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1">
                <ListChecks size={12} /> MCQ
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1">
                <ShieldCheck size={12} /> Session
              </span>
            </div>

            {!started ? (
              <Button onClick={() => setStarted(true)} variant="outline" className="!border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]">Start Test</Button>
            ) : (
              <Button onClick={handleSubmit} variant="outline" className="!border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]">Submit Test</Button>
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl space-y-4">
          {normalizedQuestions.map((q, index) => (
            <article key={q.id} className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-base font-semibold text-[#101828]">Question {index + 1}</p>
                {answers[q.id] !== undefined && <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#344054]">Answered</span>}
              </div>
              <p className="mb-3 text-[#101828]">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, optionIndex) => {
                  const active = answers[q.id] === optionIndex;
                  return (
                    <button
                      key={`${q.id}-${optionIndex}`}
                      type="button"
                      disabled={!started}
                      onClick={() => selectAnswer(q.id, optionIndex)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                        active
                          ? 'border-[#98A2B3] bg-[#F2F4F7] font-semibold text-[#101828]'
                          : 'border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB]'
                      } ${!started ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      <span className="mr-2 inline-flex min-w-7 items-center justify-center rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2 py-0.5 text-xs text-[#475467]">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
