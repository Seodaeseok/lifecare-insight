'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const customers = [
  '김민수',
  '김채하',
  '박지은',
  '서대석',
  '이수현',
  '정현우',
  '최유리',
];

export default function CustomersPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(() => {
    return customers
      .filter((name) => name.includes(keyword))
      .sort((a, b) => a.localeCompare(b, 'ko'));
  }, [keyword]);

  return (
    <main style={mainStyle}>
      <div style={topBarStyle}>
        <button
          onClick={() => router.push('/')}
          style={backButtonStyle}
        >
          ← 메인으로
        </button>
      </div>

      <div style={headerCardStyle}>
        <h1 style={{ margin: 0 }}>보유고객</h1>

        <p style={{ color: '#64748b', marginTop: 8 }}>
          고객 검색 및 상담 제안서 조회
        </p>

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='고객명 검색'
          style={searchInputStyle}
        />
      </div>

      <div style={listCardStyle}>
        {filtered.map((name) => (
          <button
            key={name}
            onClick={() => router.push('/customers/' + encodeURIComponent(name))}
            style={customerButtonStyle}
          >
            <div>
              <div style={customerNameStyle}>{name}</div>
              <div style={customerSubStyle}>
                보장분석 · AI 제안서
              </div>
            </div>

            <div style={{ color: '#94a3b8', fontSize: 18 }}>›</div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div style={emptyStyle}>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
}

const mainStyle = {
  maxWidth: 900,
  margin: '0 auto',
  padding: 16,
  fontFamily: 'sans-serif',
  background: '#f8fafc',
  minHeight: '100vh',
};

const topBarStyle = {
  marginBottom: 16,
};

const backButtonStyle = {
  background: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '10px 14px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};

const headerCardStyle = {
  background: 'white',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  marginBottom: 20,
};

const searchInputStyle = {
  width: '100%',
  marginTop: 16,
  padding: '14px 16px',
  borderRadius: 14,
  border: '1px solid #cbd5e1',
  fontSize: 15,
  boxSizing: 'border-box' as const,
};

const listCardStyle = {
  background: 'white',
  borderRadius: 20,
  padding: 8,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const customerButtonStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #f1f5f9',
  padding: '18px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  textAlign: 'left' as const,
};

const customerNameStyle = {
  fontSize: 17,
  fontWeight: 700,
  color: '#0f172a',
};

const customerSubStyle = {
  marginTop: 4,
  fontSize: 13,
  color: '#64748b',
};

const emptyStyle = {
  padding: 32,
  textAlign: 'center' as const,
  color: '#64748b',
};
