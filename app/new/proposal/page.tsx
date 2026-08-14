'use client';

import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ProposalPage() {
  const router = useRouter();

  const radarData = {
    labels: ['암', '뇌혈관', '심장', '수술비', '실손', '생활보장'],
    datasets: [
      {
        label: '현재 보장',
        data: [2, 2, 2, 1, 4, 2],
        backgroundColor: 'rgba(37,99,235,0.18)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
      },
      {
        label: '권장 수준',
        data: [5, 5, 5, 4, 4, 4],
        backgroundColor: 'rgba(16,185,129,0.12)',
        borderColor: '#10b981',
        borderWidth: 2,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const radarOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          display: false,
          stepSize: 1,
        },
        grid: {
          color: '#E5E7EB',
        },
        angleLines: {
          color: '#E5E7EB',
        },
        pointLabels: {
          color: '#334155',
          font: {
            size: 13,
          },
        },
      },
    },
  };

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
          <div style={logoCircleStyle}>🛡️</div>

          <div>
            <div style={brandStyle}>LifeCare Insight</div>

            <h1 style={titleStyle}>고객 맞춤 보장 분석 제안서</h1>

            <p style={subtitleStyle}>
              현재 보장 상태와 권장 수준을 비교하여 핵심 보완 방향을 안내드립니다.
            </p>
          </div>
        </div>

        {/* 고객 요약 */}
        <div style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>고객</div>
            <div style={summaryValueStyle}>홍길동</div>
          </div>

          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>보험나이</div>
            <div style={summaryValueStyle}>39세</div>
          </div>

          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>가족구성</div>
            <div style={summaryValueStyle}>배우자 · 자녀 2명</div>
          </div>

          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>실손</div>
            <div style={summaryValueStyle}>4세대 가입</div>
          </div>
        </div>

        {/* 핵심 진단 */}
        <div style={heroBoxStyle}>
          <div style={heroBadgeStyle}>핵심 진단</div>

          <h2 style={heroTitleStyle}>
            치료 이후의 생활비 공백과 가족 보호 자금이 가장 중요한 단계입니다
          </h2>

          <p style={heroTextStyle}>
            현재 실손은 준비되어 있으나, 암·뇌·심장 영역의 진단 및 치료 과정 보장이
            권장 수준 대비 부족하여 우선 보완이 필요한 상태로 분석됩니다.
          </p>
        </div>

        {/* 레이더 차트 */}
        <div style={chartCardStyle}>
          <div style={chartHeaderStyle}>
            <div>
              <div style={chartTitleStyle}>보장 균형 분석</div>
              <div style={chartSubtitleStyle}>
                현재 보장과 권장 수준을 한눈에 비교합니다
              </div>
            </div>

            <div style={legendWrapStyle}>
              <div style={legendItemStyle}>
                <span style={{ ...legendDotStyle, background: '#2563eb' }} />
                현재
              </div>

              <div style={legendItemStyle}>
                <span style={{ ...legendDotStyle, background: '#10b981' }} />
                권장
              </div>
            </div>
          </div>

          <div style={chartWrapStyle}>
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* 우선 보완 영역 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>우선 보완이 필요한 영역</h3>

          <div style={gapStyle}>
            <div style={priorityCardStyle}>
              <div style={priorityLeftStyle}>
                <div style={priorityIconStyle}>🎗️</div>

                <div>
                  <div style={priorityTitleStyle}>암통합치료비</div>
                  <div style={priorityDescStyle}>
                    비급여·표적·면역치료 등 실제 치료비 부담 대비
                  </div>
                </div>
              </div>

              <div style={priorityBadgePinkStyle}>우선</div>
            </div>

            <div style={priorityCardStyle}>
              <div style={priorityLeftStyle}>
                <div style={priorityIconStyle}>🫀</div>

                <div>
                  <div style={priorityTitleStyle}>순환계 치료비</div>
                  <div style={priorityDescStyle}>
                    허혈성·부정맥 포함 장기 관리 가능성 대비
                  </div>
                </div>
              </div>

              <div style={priorityBadgeBlueStyle}>중요</div>
            </div>

            <div style={priorityCardStyle}>
              <div style={priorityLeftStyle}>
                <div style={priorityIconStyle}>🏥</div>

                <div>
                  <div style={priorityTitleStyle}>질병수술비</div>
                  <div style={priorityDescStyle}>
                    반복 수술과 회복 과정의 자기부담금 보완
                  </div>
                </div>
              </div>

              <div style={priorityBadgeGrayStyle}>보완</div>
            </div>
          </div>
        </div>

        {/* 설계 방향 */}
        <div style={guideBoxStyle}>
          <h3 style={guideTitleStyle}>권장 설계 방향</h3>

          <div style={guideListStyle}>
            <div style={guideItemStyle}>
              <span style={guideCheckStyle}>✓</span>
              진단자금 중심으로 핵심 위험을 먼저 확보
            </div>

            <div style={guideItemStyle}>
              <span style={guideCheckStyle}>✓</span>
              치료 과정에서 실제 지출이 큰 영역 우선 보완
            </div>

            <div style={guideItemStyle}>
              <span style={guideCheckStyle}>✓</span>
              예산 범위 내에서 단계적으로 확대하는 전략 권장
            </div>
          </div>
        </div>

        {/* 하단 페이지 이동 */}
        <div className="no-print" style={pageNavStyle}>
          <button style={activePageButtonStyle}>1</button>

          <button
            style={pageButtonStyle}
            onClick={() => router.push('/new/priority')}
          >
            2
          </button>

          <button 
            style={pageButtonStyle}
            onClick={() => router.push('/new/plan')} 
            >
            3
          </button>

          <button style={disabledPageButtonStyle} disabled>
            4
          </button>
        </div>

        {/* 푸터 */}
        <div style={footerStyle}>
          <span>1 / 4</span>
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
  width: '794px', 
  height: '1123px', // minHeight 말고 height 고정! 
  margin: '0 auto', 
  background: 'white', 
  borderRadius: 28, 
  padding: 28, 
  boxShadow: '0 10px 30px rgba(15,23,42,0.08)', 
  display: 'flex', 
  flexDirection: 'column' as const, 
  overflow: 'hidden' as const, // 넘치면 잘라냄 
  boxSizing: 'border-box' as const, 
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

const summaryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
  gap: 12,
  marginTop: 24,
};

const summaryCardStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 18,
  padding: 16,
};

const summaryLabelStyle = {
  color: '#64748b',
  fontSize: 13,
  marginBottom: 6,
};

const summaryValueStyle = {
  color: '#0f172a',
  fontWeight: 700,
  fontSize: 16,
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

const chartCardStyle = {
  marginTop: 24,
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 24,
  padding: 22,
};

const chartHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap' as const,
};

const chartTitleStyle = {
  fontWeight: 800,
  color: '#0f172a',
  fontSize: 18,
};

const chartSubtitleStyle = {
  color: '#64748b',
  fontSize: 13,
  marginTop: 4,
};

const legendWrapStyle = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
};

const legendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  color: '#475569',
  fontSize: 13,
  fontWeight: 600,
};

const legendDotStyle = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  display: 'inline-block',
};

const chartWrapStyle = {
  height: 320,
  marginTop: 18,
};

const sectionStyle = {
  marginTop: 26,
};

const sectionTitleStyle = {
  fontSize: 20,
  margin: '0 0 12px',
  color: '#0f172a',
};

const gapStyle = {
  display: 'grid',
  gap: 14,
};

const priorityCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 20,
  padding: 18,
  gap: 14,
  flexWrap: 'wrap' as const,
};

const priorityLeftStyle = {
  display: 'flex',
  gap: 14,
  alignItems: 'center',
  flex: 1,
  minWidth: 220,
};

const priorityIconStyle = {
  width: 44,
  height: 44,
  borderRadius: 14,
  background: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 22,
};

const priorityTitleStyle = {
  fontWeight: 800,
  color: '#0f172a',
  fontSize: 16,
};

const priorityDescStyle = {
  color: '#64748b',
  fontSize: 13,
  marginTop: 4,
};

const priorityBadgePinkStyle = {
  background: '#fce7f3',
  color: '#be185d',
  borderRadius: 999,
  padding: '8px 14px',
  fontWeight: 700,
  fontSize: 13,
};

const priorityBadgeBlueStyle = {
  background: '#dbeafe',
  color: '#1d4ed8',
  borderRadius: 999,
  padding: '8px 14px',
  fontWeight: 700,
  fontSize: 13,
};

const priorityBadgeGrayStyle = {
  background: '#f1f5f9',
  color: '#475569',
  borderRadius: 999,
  padding: '8px 14px',
  fontWeight: 700,
  fontSize: 13,
};

const guideBoxStyle = {
  marginTop: 24,
  background: '#faf5ff',
  border: '1px solid #ede9fe',
  borderRadius: 24,
  padding: 22,
};

const guideTitleStyle = {
  margin: '0 0 14px',
  color: '#6d28d9',
  fontSize: 18,
};

const guideListStyle = {
  display: 'grid',
  gap: 12,
};

const guideItemStyle = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  color: '#334155',
  lineHeight: 1.7,
  fontSize: 14,
};

const guideCheckStyle = {
  color: '#7c3aed',
  fontWeight: 800,
  flexShrink: 0,
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
