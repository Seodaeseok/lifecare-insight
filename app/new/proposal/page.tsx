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

const RISK_COLORS = ['#dc2626', '#ea580c', '#ea580c', '#2563eb', '#16a34a'];

const REASONS = [
  '자녀 2명으로 소득 공백 시 가족의 경제적 부담이 큼',
  '가족력으로 인해 암 발생 위험이 상대적으로 높음',
  '뇌혈관·심장질환은 40대 이후 발병률이 크게 증가',
  '현재 진단자금이 부족하여 치료비와 생활비 대비 필요',
  '월 15만원 예산으로 우선순위 중심 설계가 적합',
];

export default function ProposalPage() {
  const router = useRouter();

  const radarData = {
    labels: ['암', '뇌혈관', '심장질환', '수술비', '간병·치매'],
    datasets: [
      {
        label: '위험도',
        data: [90, 72, 78, 55, 35],
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: '#2563eb',
        borderWidth: 3,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
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
        max: 100,
        ticks: {
          display: false,
          stepSize: 20,
        },
        grid: {
          color: '#EEF2F6',
        },
        angleLines: {
          color: '#EEF2F6',
        },
        pointLabels: {
          color: (ctx: any) => RISK_COLORS[ctx.index] || '#334155',
          font: {
            size: 13,
            weight: 'bold' as const,
          },
        },
      },
    },
  };

  return (
    <main style={mainStyle}>
      {/* 상단 버튼 */}
      <div style={topBarStyle}>
        <button onClick={() => router.push('/new/coverage')} style={navButtonStyle}>
          ← 보장분석
        </button>
        <button onClick={() => router.push('/')} style={navButtonStyle}>
          ⌂ 메인
        </button>
      </div>

      {/* 메인 카드 */}
      <div style={cardStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <div style={logoWrapStyle}>
            <div style={logoCircleStyle}>🛡️</div>
            <div>
              <div style={kickerStyle}>고객님을 위한 맞춤형</div>
              <h1 style={titleStyle}>종합보험 제안서</h1>
              <p style={subtitleStyle}>지금의 준비가 가족의 내일을 더 든든하게 만듭니다.</p>
            </div>
          </div>

          <div style={profileStyle}>
            <div style={profileIconStyle}>👤</div>
            <div>
              <div style={profileNameStyle}>김민수님 (가명)</div>
              <div style={profileMetaStyle}>1987년 5월 14일 · 39세 · 남성</div>
            </div>
          </div>
        </div>

        {/* 인적사항 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>👥 고객 인적사항 및 가족 현황</h2>
          <div style={infoGridStyle}>
            <InfoBox icon="📅" label="연령" value="39세" />
            <InfoBox icon="💼" label="직업" value="사무직" />
            <InfoBox icon="💰" label="월소득" value="500만원" />
            <InfoBox icon="👨‍👩‍👧‍👦" label="가족사항" value="배우자, 자녀 2명" />
            <InfoBox icon="🧬" label="가족력" value="위암(모), 고혈압(부)" />
            <InfoBox icon="🚗" label="운전" value="자가용 운전" />
          </div>
        </div>

        {/* 위험도 분석 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>📊 주요 보장 위험도 분석</h2>

          <div style={analysisGridStyle}>
            {/* 차트 */}
            <div style={chartCardStyle}>
              <div style={chartWrapStyle}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>

            {/* AI 판단 */}
            <div style={reasonCardStyle}>
              <h3 style={reasonTitleStyle}>💡 왜 이렇게 판단했을까요?</h3>
              <div style={reasonListStyle}>
                {REASONS.map((reason, i) => (
                  <div key={i} style={reasonItemStyle}>
                    <span style={reasonCheckStyle}>✓</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 우선순위 */}
        <div style={priorityBoxStyle}>
          <div style={priorityIconStyle}>🎯</div>
          <div>
            <div style={priorityQuoteStyle}>
              고객님에게는 &lsquo;모든 것을 다 넣는 것&rsquo;보다
            </div>
            <div style={priorityMainStyle}>
              &lsquo;가장 중요한 위험부터 순서대로 준비하는 것&rsquo;이 더 현명합니다.
            </div>
          </div>
        </div>

        {/* AI 요약 */}
        <div style={summaryStyle}>
          <h2 style={sectionTitleStyle}>🧠 AI 한 줄 요약</h2>
          <p style={summaryTextStyle}>
            고객님은 39세 가장으로서 치료비 자체보다 치료 이후의 생활비와 소득 공백에 대한 대비가
            중요한 단계입니다. 현재 기본 진단비는 일부 준비되어 있으나, 최근 활용도가 높은
            암통합치료비와 순환계치료비를 우선 보완하는 방향이 가장 효율적입니다.
          </p>
        </div>

        {/* 하단 */}
        <div style={footerStyle}>
          <span>1 / 4</span>
          <span>LifeCare Insight · 상담용 제안서</span>
        </div>
      </div>
    </main>
  );
}

/* 작은 컴포넌트 */

function InfoBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={infoBoxStyle}>
      <div style={infoIconStyle}>{icon}</div>
      <div style={infoLabelStyle}>{label}</div>
      <div style={infoValueStyle}>{value}</div>
    </div>
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
  maxWidth: 980,
  margin: '0 auto 16px',
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap' as const,
};

const navButtonStyle = {
  background: 'white',
  border: '1px solid #dbe3f0',
  borderRadius: 12,
  padding: '10px 14px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};

const cardStyle = {
  maxWidth: 980,
  margin: '0 auto',
  background: 'white',
  borderRadius: 28,
  padding: 28,
  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 20,
  flexWrap: 'wrap' as const,
};

const logoWrapStyle = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
};

const logoCircleStyle = {
  width: 64,
  height: 64,
  borderRadius: 20,
  background: '#2563eb',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 30,
};

const kickerStyle = {
  color: '#2563eb',
  fontWeight: 700,
  fontSize: 14,
};

const titleStyle = {
  margin: '4px 0',
  fontSize: 42,
  lineHeight: 1.1,
  color: '#0f172a',
};

const subtitleStyle = {
  margin: 0,
  color: '#64748b',
  fontSize: 16,
};

const profileStyle = {
  background: '#f8fafc',
  border: '1px solid #dbeafe',
  borderRadius: 22,
  padding: 16,
  display: 'flex',
  gap: 14,
  alignItems: 'center',
  minWidth: 230,
};

const profileIconStyle = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: '#dbeafe',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
};

const profileNameStyle = {
  fontWeight: 800,
  color: '#0f172a',
};

const profileMetaStyle = {
  color: '#64748b',
  fontSize: 13,
  marginTop: 4,
};

const sectionStyle = {
  marginTop: 28,
};

const sectionTitleStyle = {
  fontSize: 24,
  margin: '0 0 16px',
  color: '#0f172a',
};

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: 14,
};

const infoBoxStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 18,
  padding: 18,
};

const infoIconStyle = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: '#eff6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 17,
  marginBottom: 10,
};

const infoLabelStyle = {
  color: '#64748b',
  fontSize: 13,
  marginBottom: 6,
};

const infoValueStyle = {
  color: '#2563eb',
  fontWeight: 800,
  fontSize: 18,
};

const analysisGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.05fr 1fr',
  gap: 18,
};

const chartCardStyle = {
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 24,
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chartWrapStyle = {
  height: 340,
  width: '100%',
};

const reasonCardStyle = {
  background: '#faf5ff',
  border: '1px solid #ede9fe',
  borderRadius: 24,
  padding: 22,
};

const reasonTitleStyle = {
  margin: '0 0 14px',
  color: '#6d28d9',
  fontSize: 22,
};

const reasonListStyle = {
  display: 'grid',
  gap: 12,
};

const reasonItemStyle = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  color: '#334155',
  lineHeight: 1.6,
};

const reasonCheckStyle = {
  color: '#7c3aed',
  fontWeight: 800,
  flexShrink: 0,
};

const priorityBoxStyle = {
  marginTop: 24,
  background: '#fff7ed',
  border: '1px solid #fed7aa',
  borderRadius: 22,
  padding: 20,
  display: 'flex',
  gap: 16,
  alignItems: 'center',
};

const priorityIconStyle = {
  fontSize: 34,
};

const priorityQuoteStyle = {
  color: '#9a5b2e',
  fontSize: 14,
  marginBottom: 4,
};

const priorityMainStyle = {
  color: '#7c2d12',
  fontWeight: 800,
  fontSize: 17,
};

const summaryStyle = {
  marginTop: 24,
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 24,
  padding: 22,
};

const summaryTextStyle = {
  margin: 0,
  color: '#334155',
  lineHeight: 1.8,
  fontSize: 16,
};

const footerStyle = {
  marginTop: 28,
  paddingTop: 18,
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#64748b',
  fontSize: 14,
  flexWrap: 'wrap' as const,
  gap: 8,
};
