import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert } from 'lucide-react';
import SEO from '@components/SEO';
import { Button } from '@components/ui';
import { getAdminLockState, isAdminAuthenticated, verifyAdminPin } from '@utils/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(true);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    if (authReady && isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [authReady, navigate]);

  useEffect(() => {
    const update = () => {
      const lock = getAdminLockState();
      setRemainingMs(lock.remainingMs);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!pin.trim()) {
      setError('Enter your PIN.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyAdminPin(pin.trim());
      if (result.ok) {
        navigate('/admin/dashboard', { replace: true });
        return;
      }

      if (result.reason === 'locked') {
        const lock = getAdminLockState();
        setRemainingMs(lock.remainingMs);
        setError('Too many attempts. Access is temporarily locked.');
      } else {
        setError(`Invalid PIN. Attempts left: ${result.attemptsLeft ?? 0}`);
      }
    } finally {
      setLoading(false);
      setPin('');
    }
  }

  const mins = Math.floor(remainingMs / 60000);
  const secs = Math.floor((remainingMs % 60000) / 1000);
  const isLocked = remainingMs > 0;

  return (
    <>
      <SEO title="Admin Access" description="Restricted admin access portal" />

      <div className="min-h-screen px-4 py-14 sm:px-6">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">Admin Workspace</p>
            <h1 className="mt-2 text-2xl font-semibold text-[#101828]">Sign in</h1>
            <p className="mt-1 text-sm text-[#475467]">Use your admin PIN to continue.</p>
          </div>

          {!authReady ? (
            <p className="text-sm text-[#667085]">Checking auth session...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#344054]">PIN</span>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
                  <input
                    type="password"
                    inputMode="numeric"
                    value={pin}
                    disabled={isLocked || loading}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter PIN"
                    className="w-full rounded-xl border border-[#D0D5DD] bg-white py-2.5 pl-9 pr-3 text-[#101828] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#98A2B3] focus:ring-2 focus:ring-[#EAECF0]"
                  />
                </div>
              </label>

              {isLocked && (
                <div className="flex items-center gap-2 text-sm text-[#B54708]">
                  <ShieldAlert size={16} />
                  Retry after {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                </div>
              )}

              {error && <p className="text-sm text-[#B42318]">{error}</p>}

              <Button type="submit" variant="outline" className="w-full !border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]" disabled={isLocked || loading} loading={loading}>
                Continue
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
