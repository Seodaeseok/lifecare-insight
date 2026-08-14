'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={mainStyle}>
      <div style={headerStyle}>
        <div style={logoCircle}>L</div>

        <h1 style={{ margin: 0, fontSize: 40 }}>LifeCare Insight</h1>

        <p style={subTitleStyle}>
          설계사 전용 AI 재무·보장 상담 시스템
        </p>
      </div>

      <div style={buttonWrapStyle}>
        <button
          onClick={() => router.push('/new')}
          style={menuButtonStyle}
        >
          <div style={iconStyle}>👤</div>

          <div>
            <h2 style={menuTitleStyle}>신규고객</h2>
            <p style={menuDescStyle}>
              새로운 고객 상담 시작
            </p>
          </div>
        </button>

        <button
          onClick={() => router.push('/customers')}
          style={menuButtonStyle}
        >
          <div style={iconStyle}>📋</div>

          <div>
            <h2 style={menuTitleStyle}>보유고객</h2>
            <p style={menuDescStyle}>
              고객 목록 및 제안서 조회
            </p>
          </div>
        </button>
      </div>
    </main>
  );
}

const mainStyle = {
  minHeight: '100vh',
  background: '#f8fafc',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
  fontFamily: 'sans-serif',
};

const headerStyle = {
  textAlign: 'center' as const,
  marginBottom: 48,
};

const logoCircle = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  background: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 32,
  fontWeight: 700,
  margin: '0 auto 20px',
};

const subTitleStyle = {
  color: '#475569',
  marginTop: 12,
  fontSize: 18,
};

const buttonWrapStyle = {
  width: '100%',
  maxWidth: 520,
  display: 'grid',
  gap: 20,
};

const menuButtonStyle = {
  background: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: 28,
  padding: 28,
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
  textAlign: 'left' as const,
};

const iconStyle = {
  fontSize: 42,
};

const menuTitleStyle = {
  margin: 0,
  fontSize: 26,
  color: '#0f172a',
};

const menuDescStyle = {
  margin: '8px 0 0',
  color: '#64748b',
  fontSize: 16,
};
