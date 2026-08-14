'use client';

import { useRouter } from 'next/navigation';

export default function PlanPage() {
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

      {/* A4 카드 */}
      <div style={cardStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <div style={logoCircleStyle}>📋</div>

          <div>
            <div style={brandStyle}>LifeCare Insight</div>

            <h1 style={titleStyle}>권장 보장 구성안</h1>

            <p style={subtitleStyle}>
              현재 상황을 기준으로 가장 효율적인 보장 구조를 제안드립니다.
            </p>
          </div>
        </div>

        {/* 핵심 방향 */}
        <div style={heroBoxStyle}>
          <div style={heroBadgeStyle}>권장 전략</div>

          <h2 style={heroTitleStyle}>
            핵심 위험은 진단자금으로, 반복 지출은 치료비로 준비합니다
          </h2>

          <p style={heroTextStyle}>
            암·뇌·심장 영역은 한 번의 큰 위험에 대비하고, 수술·치료 영역은
            반복적으로 발생할 수 있는 의료비 부담을 줄이는 방향으로 설계합니다.
          </p>
        </div>

        {/* 보장 구조 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>권장 보장 구조</h3>

          <div style={gridStyle}>
            <div style={cardItemStyle}>
              <div style={iconStyle}>🎗️</div>
              <div style={itemTitleStyle}>일반암 진단</div>
              <div style={itemValueStyle}>5,000만원</div>
              <div style={itemDescStyle}>치료비 + 생활비 대비</div>
            </div>

            <div style={cardItemStyle}>
              <div style={iconStyle}>💉</div>
              <div style={itemTitleStyle}>암통합치료비</div>
              <div style={itemValueStyle}>2,000만원</div>
              <div style={itemDescStyle}>비급여·표적·면역치료</div>
            </div>

            <div style={cardItemStyle}>
              <div style={iconStyle}>🧠</div>
              <div style={itemTitleStyle}>뇌혈관 진단</div>
              <div style={itemValueStyle}>3,000만원</div>
              <div style={itemDescStyle}>뇌졸중·뇌출혈 포함</div>
            </div>

            <div style={cardItemStyle}>
              <div style={iconStyle}>❤️</div>
              <div style={itemTitleStyle}>허혈성 심장</div>
              <div style={itemValueStyle}>3,000만원</div>
              <div style={itemDescStyle}>협심증·심근경색 포함</div>
            </div>
          </div>
        </div>

        {/* 보험료 배분 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>월 보험료 배분 예시</h3>

          <div style={budgetBoxStyle}>
            <div style={budgetRowStyle}>
              <span>암 진단 + 암통합치료비</span>
              <strong>48%</strong>
            </div>

            <div style={barWrapStyle}>
              <div style={{ ...barStyle, width: '48%', background: '#ec4899' }} />
            </div>

            <div style={budgetRowStyle}>
              <span>뇌혈관 보장</span>
              <strong>22%</strong>
            </div>

            <div style={barWrapStyle}>
              <div style={{ ...barStyle, width: '22%', background: '#8b5cf6' }} />
            </div>

            <div style={budgetRowStyle}>
              <span>허혈성 심장 보장</span>
              <strong>20%</strong>
            </div>

            <div style={barWrapStyle}>
              <div style={{ ...barStyle, width: '20%', background: '#2563eb' }} />
            </div>

            <div style={budgetRowStyle}>
              <span>수술·치료비 보장</span>
              <strong>10%</strong>
            </div>

            <div style={barWrapStyle}>
              <div style={{ ...barStyle, width: '10%', background: '#16a34a' }} />
            </div>
          </div>
        </div>

        {/* 단계별 가입 전략 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>단계별 가입 전략</h3>

          <div style={stepWrapStyle}>
            <div style={stepCardStyle}>
              <div style={stepBadgeStyle}>1단계</div>
              <div style={stepTitleStyle}>핵심 위험 확보</div>
              <div style={stepDescStyle}>
                암·뇌·심장 진단자금을 우선 구성
              </div>
            </div>

            <div style={stepArrowStyle}>→</div>

            <div style={stepCardStyle}>
              <div style={stepBadgeStyle}>2단계</div>
              <div style={stepTitleStyle}>치료 과정 보완</div>
              <div style={stepDescStyle}>
                암통합치료비와 수술비 추가
              </div>
            </div>

            <div style={stepArrowStyle}>→</div>

            <div style={stepCardStyle}>
              <div style={stepBadgeStyle}>3단계</div>
              <div style={stepTitleStyle}>장기 관리 확대</div>
              <div style={stepDescStyle}>
                간병·생활보장 등 추가 검토
              </div>
            </div>
          </div>
        </div>

        {/* 한 줄 요약 */}
        <div style={summaryBoxStyle}>
          <div style={summaryIconStyle}>💡</div>

          <div>
            <div style={summaryTitleStyle}>설계 한 줄 요약</div>

            <div style={summaryTextStyle}>
              현재는 모든 특약을 넓게 넣기보다, <strong>암·뇌·심장 중심으로
              보장의 깊이를 먼저 확보하는 전략</strong>이 가장 효율적입니다.
            </div>
          </div>
        </div>

        {/* 페이지 이동 */}
        <div className="no-print" style={pageNavStyle}>
          <button
            style={pageButtonStyle}
            onClick={() => router.push('/new/proposal')}
          >
            1
          </button>

          <button
            style={pageButtonStyle}
            onClick={() => router.push('/new/priority')}
          >
            2
          </button>

          <button style={activePageButtonStyle}>3</button>

          <button style={disabledPageButtonStyle} disabled>
            4
          </button>
        </div>

        {/* 푸터 */}
        <div style={footerStyle}>
          <span>3 / 4</span>
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

const brandStyle = {
  color: '#2563eb',
  fontWeight: 800,
  fontSize: 14,
  marginBottom: 6,
};

const titleStyle = {
  margin: 0,
  fontSize: 30,
  lineHeight: 1.2,
  color: '#0f172a',
};

const subtitleStyle = {
  margin: '10px 0 0',
  color: '#64748b',
  fontSize: 15,
  lineHeight: 1.6,
};

const heroBoxStyle = {
  marginTop: 24,
  background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
  border: '1px solid #dbeafe',
  borderRadius: 24,
  padding: 24,
};

const heroBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  background: '#2563eb',
  color: 'white',
  borderRadius: 999,
  padding: '6px 12px',
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 14,
};

const heroTitleStyle = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.35,
  color: '#0f172a',
};

const heroTextStyle = {
  margin: '14px 0 0',
  color: '#334155',
  lineHeight: 1.7,
  fontSize: 15,
};

const sectionStyle = {
  marginTop: 28,
};

const sectionTitleStyle = {
  fontSize: 22,
  margin: '0 0 16px',
  color: '#0f172a',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
  gap: 14,
};

const cardItemStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 20,
  padding: 20,
};

const iconStyle = {
  fontSize: 28,
  marginBottom: 12,
};

const itemTitleStyle = {
  fontWeight: 800,
  color: '#0f172a',
  fontSize: 16,
};

const itemValueStyle = {
  fontSize: 28,
  fontWeight: 800,
  color: '#2563eb',
  margin: '10px 0 6px',
};

const itemDescStyle = {
  color: '#64748b',
  fontSize: 13,
  lineHeight: 1.5,
};

const budgetBoxStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 24,
  padding: 20,
};

const budgetRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 14,
  fontSize: 14,
  color: '#334155',
};

const barWrapStyle = {
  height: 10,
  background: '#e5e7eb',
  borderRadius: 999,
  overflow: 'hidden' as const,
  marginTop: 8,
};

const barStyle = {
  height: '100%',
  borderRadius: 999,
};

const stepWrapStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr auto 1fr',
  alignItems: 'center',
  gap: 12,
};

const stepCardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 20,
  padding: 18,
  textAlign: 'center' as const,
};

const stepBadgeStyle = {
  display: 'inline-block',
  background: '#2563eb',
  color: 'white',
  borderRadius: 999,
  padding: '4px 10px',
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 10,
};

const stepTitleStyle = {
  fontWeight: 800,
  color: '#0f172a',
  marginBottom: 8,
};

const stepDescStyle = {
  color: '#64748b',
  fontSize: 13,
  lineHeight: 1.5,
};

const stepArrowStyle = {
  color: '#94a3b8',
  fontWeight: 700,
  fontSize: 22,
};

const summaryBoxStyle = {
  marginTop: 28,
  background: '#faf5ff',
  border: '1px solid #ede9fe',
  borderRadius: 24,
  padding: 22,
  display: 'flex',
  gap: 16,
  alignItems: 'flex-start',
};

const summaryIconStyle = {
  fontSize: 28,
};

const summaryTitleStyle = {
  fontWeight: 800,
  color: '#6d28d9',
  marginBottom: 8,
};

const summaryTextStyle = {
  color: '#334155',
  lineHeight: 1.7,
  fontSize: 14,
};

const pageNavStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  marginTop: 28,
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

  style.innerHTML = \`
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
  \`;

  document.head.appendChild(style);
}
