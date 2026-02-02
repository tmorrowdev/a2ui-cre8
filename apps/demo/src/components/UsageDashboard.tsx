import { useEffect, useState } from 'react';

interface DownloadStats {
  package: string;
  downloads: number;
  start: string;
  end: string;
}

interface DailyDownload {
  downloads: number;
  day: string;
}

interface RangeStats {
  package: string;
  downloads: DailyDownload[];
  start: string;
  end: string;
}

const PACKAGES = ['@tmorrow/cre8-react', '@tmorrow/cre8-wc'];

async function fetchWeeklyStats(pkg: string): Promise<DownloadStats> {
  const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
  return res.json();
}

async function fetchMonthlyRange(pkg: string): Promise<RangeStats> {
  const res = await fetch(`https://api.npmjs.org/downloads/range/last-month/${pkg}`);
  return res.json();
}

function StatCard({ title, value, trend, variant }: {
  title: string;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}) {
  const variantColors: Record<string, string> = {
    default: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
    }}>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>{title}</p>
      <h2 style={{ fontSize: '2rem', fontWeight: 600, margin: '0.5rem 0' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h2>
      {trend && (
        <span style={{
          display: 'inline-block',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 500,
          background: `${variantColors[variant || 'default']}20`,
          color: variantColors[variant || 'default'],
        }}>
          {trend}
        </span>
      )}
    </div>
  );
}

function MiniChart({ data, label }: { data: DailyDownload[]; label: string }) {
  const max = Math.max(...data.map(d => d.downloads), 1);
  const total = data.reduce((sum, d) => sum + d.downloads, 0);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.5rem',
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{label}</h3>
      <p style={{ color: '#6b7280', margin: '0 0 1rem 0' }}>
        Total: {total.toLocaleString()} downloads
      </p>
      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '80px' }}>
        {data.slice(-14).map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#3b82f6',
              height: `${Math.max((d.downloads / max) * 100, 2)}%`,
              borderRadius: '2px 2px 0 0',
              transition: 'height 0.2s',
            }}
            title={`${d.day}: ${d.downloads}`}
          />
        ))}
      </div>
      <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>
        Last 14 days
      </p>
    </div>
  );
}

function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.75rem' }}>
      <span style={{ minWidth: '80px', fontSize: '0.875rem' }}>{label}</span>
      <div style={{
        flex: 1,
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: '#3b82f6',
          transition: 'width 0.3s',
        }} />
      </div>
      <span style={{ minWidth: '40px', fontSize: '0.875rem', textAlign: 'right' }}>{percent}%</span>
    </div>
  );
}

export function UsageDashboard() {
  const [weeklyStats, setWeeklyStats] = useState<Record<string, DownloadStats>>({});
  const [rangeStats, setRangeStats] = useState<Record<string, RangeStats>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    async function loadStats() {
      try {
        const [reactWeekly, wcWeekly, reactRange, wcRange] = await Promise.all([
          fetchWeeklyStats(PACKAGES[0]),
          fetchWeeklyStats(PACKAGES[1]),
          fetchMonthlyRange(PACKAGES[0]),
          fetchMonthlyRange(PACKAGES[1]),
        ]);

        setWeeklyStats({
          [PACKAGES[0]]: reactWeekly,
          [PACKAGES[1]]: wcWeekly,
        });
        setRangeStats({
          [PACKAGES[0]]: reactRange,
          [PACKAGES[1]]: wcRange,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1.5rem',
        }}>
          <h2 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>Error Loading Stats</h2>
          <p style={{ color: '#7f1d1d', margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  const reactStats = weeklyStats[PACKAGES[0]];
  const wcStats = weeklyStats[PACKAGES[1]];
  const totalWeekly = (reactStats?.downloads || 0) + (wcStats?.downloads || 0);
  const reactShare = totalWeekly > 0 ? (reactStats?.downloads || 0) : 0;
  const wcShare = totalWeekly > 0 ? (wcStats?.downloads || 0) : 0;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
        Cre8 Design System Usage
      </h1>
      <p style={{ color: '#6b7280', margin: '0 0 2rem 0' }}>
        npm download statistics for @tmorrow/cre8-react and @tmorrow/cre8-wc
      </p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <StatCard
          title="Total Weekly Downloads"
          value={totalWeekly}
          trend={totalWeekly > 100 ? '↑ Growing' : 'New'}
          variant={totalWeekly > 100 ? 'success' : 'default'}
        />
        <StatCard
          title="React Package"
          value={reactStats?.downloads || 0}
        />
        <StatCard
          title="Web Components"
          value={wcStats?.downloads || 0}
        />
      </div>

      {/* Adoption Comparison */}
      <div style={{
        marginTop: '2rem',
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '1.5rem',
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>React vs Web Components Adoption</h3>
        <ProgressBar value={reactShare} max={totalWeekly || 1} label="React" />
        <ProgressBar value={wcShare} max={totalWeekly || 1} label="Web" />
      </div>

      {/* Tabs */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
          {['React', 'Web Components'].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: activeTab === i ? '#3b82f6' : '#6b7280',
                borderBottom: activeTab === i ? '2px solid #3b82f6' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
          {activeTab === 0 && rangeStats[PACKAGES[0]] && (
            <MiniChart
              data={rangeStats[PACKAGES[0]].downloads}
              label="@tmorrow/cre8-react"
            />
          )}
          {activeTab === 1 && rangeStats[PACKAGES[1]] && (
            <MiniChart
              data={rangeStats[PACKAGES[1]].downloads}
              label="@tmorrow/cre8-wc"
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <p style={{ marginTop: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
        Data from npm public API • Updated {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}

export default UsageDashboard;
