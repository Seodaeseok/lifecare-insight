'use client';

import { useRouter } from 'next/navigation';

const PRIORITIES = [
  {
    rank: 1,
    icon: '🎖️',
    title: '암 진단자금',
    desc: '치료비 + 생활비 + 소득 공백 대비',
    riskPercent: 40,
    color: '#db2777',
    bg: '#fce7f3',
  },
  {
    rank: 2,
    icon: '🧠',
    title: '뇌혈관 진단자금',
    desc: '뇌졸중, 뇌출혈 등 실제 발생 빈도 중심',
    riskPercent: 25,
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  {
    rank: 3,
    icon: '❤️',
    title: '허혈성 심장질환 진단자금',
    desc: '협심증·심근경색 등 주요 심장질환 대비',
    riskPercent: 20,
    color: '#0284c7',
    bg: '#dbeafe',
  },
  {
    rank: 4,
    icon: '🏥',
    title: '질병·상해 수술비',
    desc: '반복적인 치료와 수술에 대한 보조 역할',
    riskPercent: 10,
    color: '#16a34a',
    bg: '#dcfce7',
  },
  {
    rank: 5,
    icon: '🛡️',
    title: '기타 특약',
    desc: '건강관리, 간병 등은 추후 자산 여건에 따라 검토',
    riskPercent: 5,
    color: '#64748b',
    bg: '#f1f5f9',
  },
];

const WHY_REASONS = [
  '가장 발생 가능성이 높고, 경제적 영향이 큰 위험부터 대비할 수 있습니다.',
  '불필요한 특약을 줄이고, 꼭 필요한 보장에 집중할 수 있습니다.',
  '월 예산 내에서 효율적으로 보장을 구성할 수 있습니다.',
];

export default function PriorityPage() {
  const router = useRouter();

  return (
    <main style={mainStyle}>
      {/* 상단 버튼 */}
      <div className="no-print" style={topBarStyle}>
        <div style={leftButtonWrapStyle}>
          <button
            onClick={() => router.push('/new/coverage')}
            style={navButtonStyle}
          >
            🛡️ 보장분석
          </button>
        </div>

        <div style={centerButtonWrapStyle}>
          <button
            onClick={() => router.push('/')}
            style={navButtonStyle}
          >
            ⌂ 메인
          </button>
        </div>

        <div style={rightSpacerStyle} />
      </div>

      {/* 메인 카드 */}
      <div style={cardStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <div style={logoCircleStyle}>🗂️</div>

          <div>
            <h1 style={titleStyle}>
              보험은 다 넣는 게 아니라, 순서를 정하는 것입니다
            </h1>

            <p style={subtitleStyle}>
              고객님의 상황에 맞춰 가장 중요한 보장부터 우선순위로 제안합니다.
            </p>
          </div>
        </div>

        {/* 고객 상황 한 줄 진단 */}
        <div style={oneLineBoxStyle}>
          <h3 style={oneLineTitleStyle}>💡 고객 상황 한 줄 진단</h3>

          <p style={oneLineTextStyle}>
            39세 가장 · 자녀 2명 기준, 현재는 암 치료 이후 생활비 공백과
            가족 보호 자금이 가장 먼저 보완되어야 하는 단계입니다.
          </p>
        </div>

        {/* 우선순위 리스트 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>🏆 당신에게 꼭 필요한 보장 우선순위</h2>

          <div style={priorityListStyle}>
            {PRIORITIES.map((p) => (
              <div key={p.rank} style={priorityRowStyle}>
                <div
                  style={{
                    ...rankBadgeStyle,
                    background: p.bg,
                    color: p.color,
                  }}
                >
                  {p.rank}순위
                </div>

                <div style={{ ...iconCircleStyle, background: p.bg }}>
                  {p.icon}
                </div>

                <div style={priorityTextWrapStyle}>
                  <div style={priorityItemTitleStyle}>{p.title}</div>
                  <div style={priorityItemDescStyle}>{p.desc}</div>
                </div>

                <div
                  style={{
                    ...riskPillStyle,
                    background: p.bg,
                    color: p.color,
                  }}
                >
                  위험도 {p.riskPercent}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 영향 박스 */}
        <div style={impactBoxStyle}>
          <h3 style={impactTitleStyle}>
            ⚠️ 우선순위를 뒤로 미루면 생길 수 있는 영향
          </h3>

          <div style={impactItemStyle}>
            <span>•</span>
            <span>
              암 치료 기간 중 소득 공백이 발생하면 생활비 부담이 커질 수 있습니다.
            </span>
          </div>

          <div style={impactItemStyle}>
            <span>•</span>
            <span>
              뇌·심장 질환은 치료 후에도 장기간 관리비가 이어질 가능성이 높습니다.
            </span>
          </div>

          <div style={impactItemStyle}>
            <span>•</span>
            <span>
              수술비가 부족하면 반복 치료 시 자기부담금 체감이 커질 수 있습니다.
            </span>
          </div>
        </div>

        {/* 왜 좋은가 */}
        <div style={whyBoxStyle}>
          <h3 style={whyTitleStyle}>✅ 이런 순서로 준비하는 것이 왜 좋을까요?</h3>

          <div style={whyListStyle}>
            {WHY_REASONS.map((reason, i) => (
              <div key={i} style={whyItemStyle}>
                <span style={whyCheckStyle}>✓</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 마무리 문구 */}
        <div style={closingStyle}>
          오늘 바로 결정하지 않으셔도 됩니다.
          <br />
          먼저 우선순위를 이해하시고, 필요한 보장부터 천천히 준비하셔도 충분합니다.
        </div>

        {/* 페이지 이동 */}
        <div className="no-print" style={pageNavStyle}>
          <button
            style={pageButtonStyle}
            onClick={() => router.push('/new/proposal')}
          >
            1
          </button>

          <button style={activePageButtonStyle}>2</button>

          <style={pageButtonStyle} 
          onClick={() => router.push('/new/plan')} >
            3
          </button>

          <button style={disabledPageButtonStyle} disabled>
            4
          </button>
        </div>

        {/* 하단 */}
        <div style={footerStyle}>
          <span>2 / 4</span>
          <span>LifeCare Insight · 상담용 제안서</span>
        </div>
      </div>
    </main>
  );
}

/* 스타일 */

const mainStyle = {
  background: '#f3f6fb',
  minHeight: '100vh',
  padding: 16,
  fontFamily: 'sans-serif',
};

const topBarStyle = {
  maxWidth: 794,
  margin: '0 auto 16px',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
};

const leftButtonWrapStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const centerButtonWrapStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const rightSpacerStyle = {
  display: 'block',
};

const navButtonStyle = {
  background: 'white',
  border: '1px solid #dbe3f0',
  borderRadius: 14,
  padding: '10px 16px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 700,
  color: '#0f172a',
  boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
};

const cardStyle = {
  width: '100%',
  maxWidth: 794,
  minHeight: 1123,
  margin: '0 auto',
  background: 'white',
  borderRadius: 28,
  padding: 32,
  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
  display: 'flex',
  flexDirection: 'column' as const,
  pageBreakAfter: 'always' as const,
};

const headerStyle = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
};

const logoCircleStyle = {
  width: 56,
  height: 56,
  borderRadius: 18,
  background: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 26,
  flexShrink: 0,
};

const titleStyle = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.3,
  color: '#0f172a',
};

const subtitleStyle = {
  margin: '6px 0 0',
  color: '#64748b',
  fontSize: 14,
};

const oneLineBoxStyle = {
  marginTop: 22,
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: 20,
  padding: 18,
};

const oneLineTitleStyle = {
  margin: '0 0 8px',
  color: '#1d4ed8',
  fontSize: 16,
};

const oneLineTextStyle = {
  margin: 0,
  color: '#1e3a8a',
  fontWeight: 700,
  lineHeight: 1.6,
};

const sectionStyle = {
  marginTop: 26,
};

const sectionTitleStyle = {
  fontSize: 22,
  margin: '0 0 16px',
  color: '#0f172a',
};

const priorityListStyle = {
  display: 'grid',
  gap: 12,
};

const priorityRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 18,
  padding: '16px 18px',
  flexWrap: 'wrap' as const,
};

const rankBadgeStyle = {
  fontWeight: 800,
  fontSize: 13,
  padding: '6px 12px',
  borderRadius: 999,
  flexShrink: 0,
};

const iconCircleStyle = {
  width: 42,
  height: 42,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  flexShrink: 0,
};

const priorityTextWrapStyle = {
  flex: 1,
  minWidth: 180,
};

const priorityItemTitleStyle = {
  fontWeight: 800,
  fontSize: 16,
  color: '#0f172a',
};

const priorityItemDescStyle = {
  color: '#64748b',
  fontSize: 13,
  marginTop: 3,
};

const riskPillStyle = {
  fontWeight: 800,
  fontSize: 13,
  padding: '8px 14px',
  borderRadius: 999,
  flexShrink: 0,
};

const impactBoxStyle = {
  marginTop: 22,
  background: '#fff7ed',
  border: '1px solid #fed7aa',
  borderRadius: 20,
  padding: 20,
};

const impactTitleStyle = {
  margin: '0 0 12px',
  color: '#c2410c',
  fontSize: 17,
};

const impactItemStyle = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  color: '#7c2d12',
  fontSize: 14,
  lineHeight: 1.6,
  marginBottom: 10,
};

const whyBoxStyle = {
  marginTop: 22,
  background: '#faf5ff',
  border: '1px solid #ede9fe',
  borderRadius: 24,
  padding: 22,
};

const whyTitleStyle = {
  margin: '0 0 14px',
  color: '#6d28d9',
  fontSize: 18,
};

const whyListStyle = {
  display: 'grid',
  gap: 12,
};

const whyItemStyle = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  color: '#334155',
  lineHeight: 1.6,
  fontSize: 14,
};

const whyCheckStyle = {
  color: '#7c3aed',
  fontWeight: 800,
  flexShrink: 0,
};

const closingStyle = {
  marginTop: 18,
  textAlign: 'center' as const,
  color: '#64748b',
  fontSize: 13,
  lineHeight: 1.7,
};

const pageNavStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  marginTop: 24,
};

const pageButtonStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid #dbe3f0',
  background: 'white',
  color: '#334155',
  fontWeight: 700,
  cursor: 'pointer',
};

const activePageButtonStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: 'none',
  background: '#2563eb',
  color: 'white',
  fontWeight: 700,
  cursor: 'default',
};

const disabledPageButtonStyle = {
  ...pageButtonStyle,
  opacity: 0.4,
  cursor: 'not-allowed',
};

const footerStyle = {
  marginTop: 'auto',
  paddingTop: 18,
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#64748b',
  fontSize: 14,
};

if (typeof window !== 'undefined') {
  const style = document.createElement('style');

  style.innerHTML = `
    @media print {
      body {
        background: white !important;
      }

      .no-print {
        display: none !important;
      }

      main {
        padding: 0 !important;
      }
    }
  `;

  document.head.appendChild(style);
}
