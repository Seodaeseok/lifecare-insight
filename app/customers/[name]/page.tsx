'use client';

import { useRouter, useParams } from 'next/navigation';

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();

  const name = decodeURIComponent(params.name as string);

  return (
    <main style={mainStyle}>
      {/* 상단 네비게이션 */}
      <div style={topBarStyle}>
        <button
          onClick={() => router.push('/customers')}
          style={backButtonStyle}
        >
          ← 보유고객
        </button>

        <button
          onClick={() => router.push('/')}
          style={backButtonStyle}
        >
          ⌂ 메인
        </button>
      </div>

      {/* 고객 요약 */}
      <div style={summaryCardStyle}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{name}</h1>

        <p style={summaryTextStyle}>
          보험나이 39세 · 기혼 · 자녀 2명 · 자가용 운전
        </p>
      </div>

      {/* 메뉴 카드 */}
      <div style={ 
      typeof window !== 'undefined' && window.innerWidth < 768 
      ? mobileGridStyle 
      : gridStyle } 
        >
        <button
          style={menuCardStyle} 
          onClick={() => router.push('/customers/' + encodeURIComponent(name) + '/coverage') }
        >
          <div style={iconStyle}>🛡️</div>
          <h3 style={menuTitleStyle}>보장분석</h3>
          <p style={menuDescStyle}>현재 가입 현황 확인</p>
        </button>

        <button
          style={menuCardStyle}
          onClick={() => alert('다음 단계에서 AI 제안서를 연결합니다!')}
        >
          <div style={iconStyle}>✨</div>
          <h3 style={menuTitleStyle}>AI 제안서</h3>
          <p style={menuDescStyle}>맞춤 리포트 보기</p>
        </button>

        <button
          style={menuCardStyle}
          onClick={() => alert('상담기록 기능 준비 중')}
        >
          <div style={iconStyle}>📝</div>
          <h3 style={menuTitleStyle}>상담기록</h3>
          <p style={menuDescStyle}>상담 메모 확인</p>
        </button>

        <button
          style={menuCardStyle}
          onClick={() => alert('PDF 다운로드 기능 준비 중')}
        >
          <div style={iconStyle}>📄</div>
          <h3 style={menuTitleStyle}>PDF 다운로드</h3>
          <p style={menuDescStyle}>제안서 저장 및 공유</p>
        </button>
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
  display: 'flex',
  gap: 12,
  marginBottom: 20,
  flexWrap: 'wrap' as const,
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

const summaryCardStyle = {
  background: 'white',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  marginBottom: 20,
};

const summaryTextStyle = {
  color: '#64748b',
  marginTop: 8,
  fontSize: 15,
};

const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
  gap: 16, 
};

const mobileGridStyle = { 
  display: 'grid', 
  gridTemplateColumns: '1fr', 
  gap: 16, 
};

const menuCardStyle = { 
  background: 'white', 
  border: '1px solid #e2e8f0', 
  borderRadius: 20, 
  padding: 24, 
  cursor: 'pointer', 
  textAlign: 'center' as const, 
  boxShadow: '0 4px 12px rgba(15,23,42,0.04)', 
  minHeight: 170, 
  display: 'flex', 
  flexDirection: 'column' as const, 
  justifyContent: 'center', 
  alignItems: 'center', 
};

const iconStyle = {
  fontSize: 36,
  marginBottom: 12,
};

const menuTitleStyle = {
  margin: 0,
  fontSize: 20,
  color: '#0f172a',
};

const menuDescStyle = {
  marginTop: 8,
  color: '#64748b',
  fontSize: 14,
};
