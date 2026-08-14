'use client';

import { useRouter } from 'next/navigation';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

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

  const handlePrint = () => window.print();
  const handlePdf = () => window.print();

  const radarData = {
    labels: ['암', '암통합', '뇌혈관', '심장', '수술', '실손'],
    datasets: [
      {
        label: '현재 보장',
        data: [55, 35, 65, 50, 75, 90],
        backgroundColor: 'rgba(37,99,235,0.2)',
        borderColor: '#2563eb',
        borderWidth: 2,
      },
      {
        label: '권장 수준',
        data: [90, 85, 85, 85, 75, 90],
        backgroundColor: 'rgba(239,68,68,0.12)',
        borderColor: '#ef4444',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false },
        grid: { color: '#e5e7eb' },
        angleLines: { color: '#e5e7eb' },
        pointLabels: {
          color: '#334155',
          font: { size: 11, weight: '600' as const },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { usePointStyle: true, boxWidth: 8 },
      },
    },
  };

  return (
    <main style={mainStyle}>
      {/* 상단 버튼 */}
      <div className="no-print" style={topBarStyle}>
        <div style={leftWrapStyle}>
          <button
            onClick={() => router.push('/new/coverage')}
            style={navButtonStyle}
          >
            🛡️ 보장분석
          </button>
        </div>

        <div style={centerWrapStyle}>
          <button
            onClick={() => router.push('/')}
            style={navButtonStyle}
          >
            ⌂ 메인
          </button>
        </div>

        <div style={rightWrapStyle}>
          <button onClick={handlePdf} style={navButtonStyle}>
            📄 PDF 저장
          </button>

          <button onClick={handlePrint} style={navButtonStyle}>
            🖨️ 인쇄
          </button>
        </div>
      </div>

      {/* A4 카드 */}
      <div style={cardStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <div style={logoStyle}>🛡️</div>

          <div>
            <div style={brandStyle}>LifeCare Insight</div>

            <h1 style={titleStyle}>고객 맞춤 보장 분석 제안서</h1>

            <p style={subtitleStyle}>
              현재 보장 상태와 권장 수준을 비교하여 핵심 보완 방향을 안내드립니다.
            </p>
          </div>
        </div>

        {/* 고객 정보 + 차트 */}
        <div style={topGridStyle}>
          <div style={infoCardStyle}>
            <h3 style={sectionTitleStyle}>고객 정보</h3>

            <div style={infoRowStyle}>
              <span style={infoLabelStyle}>고객명</span>
              <strong>홍길동</strong>
            </div>

            <div style={infoRowStyle}>
              <span style={infoLabelStyle}>보험나이</span>
              <strong>39세</strong>
            </div>

            <div style={infoRowStyle}>
              <span style={infoLabelStyle}>가족구성</span>
              <strong>배우자 · 자녀 2명</strong>
            </div>

            <div style={infoRowStyle}>
              <span style={infoLabelStyle}>실손</span>
              <strong>4세대 가입</strong>
            </div>
          </div>

          <div style={chartCardStyle}>
            <div style={chartTitleStyle}>보장 균형 분석</div>

            <div style={{ height: 260 }}>
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </div>

        {/* 현재 보장 수준 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>현재 보장 수준</h3>

          <div style={levelGridStyle}>
            <LevelCard title="암 진단비" level="부족" color="#ef4444" />
            <LevelCard title="암통합치료비" level="매우 부족" color="#be123c" />
            <LevelCard title="뇌혈관" level="보통" color="#f59e0b" />
            <LevelCard title="허혈성 심장질환" level="부족" color="#ef4444" />
            <LevelCard title="질병수술비" level="양호" color="#16a34a" />
            <LevelCard title="실손의료비" level="양호" color="#16a34a" />
          </div>
        </div>

        {/* AI 분석 */}
        <div style={analysisBoxStyle}>
          <div style={analysisTitleStyle}>🤖 AI 분석 코멘트</div>

          <p style={analysisTextStyle}>
            현재 실손은 준비되어 있으나, <strong>암통합치료비와 순환계 치료비의 공백이 가장 큽니다.</strong>
            특히 비급여 표적·면역치료와 부정맥·시술 이후 치료비 영역은 최근 실제 체감 지출이 커지는 추세입니다.
          </p>
        </div>

        {/* 우선순위 */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>우선 보완 권장 순서</h3>

          <div style={priorityWrapStyle}>
            <PriorityPill label="1 암통합치료비" bg="#fee2e2" color="#b91c1c" />
            <PriorityPill label="2 순환계 치료비" bg="#fef3c7" color="#92400e" />
            <PriorityPill label="3 뇌혈관" bg="#dbeafe" color="#1d4ed8" />
            <PriorityPill label="4 질병수술비" bg="#dcfce7" color="#166534" />
          </div>
        </div>

        {/* 페이지 이동 */}
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

          <button
            style={pageButtonStyle}
            onClick={() => router.push('/new/trend')}
          >
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

/* 컴포넌트 */

function LevelCard({
  title,
  level,
  color,
}: {
  title: string;
  level: string;
  color: string;
}) {
  return (
    <div style={levelCardStyle}>
      <div style={levelTitleStyle}>{title}</div>

      <div
        style={{
          ...levelBadgeStyle,
          background: color,
        }}
      >
        {level}
      </div>
    </div>
  );
}

function PriorityPill({
  label,
  bg,
  color,
}: {
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: bg,
        color,
        borderRadius: 999,
        padding: '10px 16px',
        fontWeight: 700,
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

/* 공통 */

const bodyTextStyle = {
  fontSize: 13,
  lineHeight: 1.55,
  color: '#334155',
};

/* 레이아웃 */

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

const leftWrapStyle = { display: 'flex', justifyContent: 'flex-start' };
const centerWrapStyle = { display: 'flex', justifyContent: 'center' };
const rightWrapStyle = { display: 'flex', justifyContent: 'flex-end', gap: 8 };

const navButtonStyle = {
  background: 'white',
  border: '1px solid #dbe3f0',
  borderRadius: 14,
  padding: '10px 14px',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 700,
  color: '#0f172a',
  whiteSpace: 'nowrap' as const,
};

const cardStyle = {
  width: '794px',
  height: '1123px',
  margin: '0 auto',
  background: 'white',
  borderRadius: 28,
  padding: 28,
  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden' as const,
  boxSizing: 'border-box' as const,
};

/* 헤더 */

const headerStyle = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
};

const logoStyle = {
  width: 56,
  height: 56,
  borderRadius: 18,
  background: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 26,
};

const brandStyle = {
  color: '#2563eb',
  fontWeight: 800,
  fontSize: 13,
  marginBottom: 4,
};

const titleStyle = {
  margin: 0,
  fontSize: 28,
  color: '#0f172a',
};

const subtitleStyle = {
  margin: '8px 0 0',
  color: '#64748b',
  fontSize: 14,
  lineHeight: 1.6,
};

/* 상단 그리드 */

const topGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.2fr',
  gap: 16,
  marginTop: 24,
};

const infoCardStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 22,
  padding: 16,
};

const chartCardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 22,
  padding: 16,
};

const chartTitleStyle = {
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: 12,
};

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid #e5e7eb',
};

const infoLabelStyle = {
  color: '#64748b',
  fontSize: 13,
};

/* 섹션 */

const sectionStyle = {
  marginTop: 22,
};

const sectionTitleStyle = {
  fontSize: 18,
  margin: '0 0 12px',
  color: '#0f172a',
};

/* 보장 수준 */

const levelGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 12,
};

const levelCardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 18,
  padding: 16,
  textAlign: 'center' as const,
};

const levelTitleStyle = {
  fontWeight: 700,
  color: '#0f172a',
  fontSize: 14,
  marginBottom: 10,
};

const levelBadgeStyle = {
  color: 'white',
  borderRadius: 999,
  padding: '6px 12px',
  fontWeight: 700,
  fontSize: 12,
  display: 'inline-block',
};

/* 분석 */

const analysisBoxStyle = {
  marginTop: 22,
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  borderRadius: 22,
  padding: 16,
};

const analysisTitleStyle = {
  fontWeight: 800,
  color: '#1d4ed8',
  marginBottom: 10,
};

const analysisTextStyle = {
  ...bodyTextStyle,
  margin: 0,
};

/* 우선순위 */

const priorityWrapStyle = {
  display: 'flex',
  gap: 10,
  flexWrap: 'wrap' as const,
};

/* 페이지 이동 */

const pageNavStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  marginTop: 'auto',
  paddingTop: 16,
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
};

/* 푸터 */

const footerStyle = {
  marginTop: 14,
  paddingTop: 14,
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#64748b',
  fontSize: 13,
};

/* 출력 */

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

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;

  document.head.appendChild(style);
}
