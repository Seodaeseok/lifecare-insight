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

/* =========================================================
   기본 고객 정보
   ---------------------------------------------------------
   추후 Supabase 고객정보와 연결하면 이 부분을
   고객 데이터로 교체하면 됩니다.
========================================================= */

const customer = {
  name: '김민수',
  age: 38,
  gender: '남성',
  job: '사무직',
  family: '배우자, 자녀 2명',
  familyHistory: '부친 고혈압 / 모친 당뇨',
  driving: '자가용 운전',
};

/* =========================================================
   보장 데이터
   ---------------------------------------------------------
   current  : 현재 가입금액
   ai       : AI 권장금액
   advisor  : 설계사 권장금액
========================================================= */

const coverageData = [
  {
    key: 'cancer',
    label: '암',
    current: 3000,
    ai: 5000,
    advisor: 5000,
    risk: 88,
    level: '매우 높음',
    color: '#ef4444',
  },
  {
    key: 'brain',
    label: '뇌혈관',
    current: 1000,
    ai: 3000,
    advisor: 3000,
    risk: 72,
    level: '높음',
    color: '#f97316',
  },
  {
    key: 'heart',
    label: '심혈관',
    current: 1000,
    ai: 3000,
    advisor: 3000,
    risk: 68,
    level: '높음',
    color: '#f97316',
  },
  {
    key: 'surgery',
    label: '수술비',
    current: 300,
    ai: 500,
    advisor: 500,
    risk: 45,
    level: '중간',
    color: '#2563eb',
  },
  {
    key: 'injury',
    label: '상해·후유장해',
    current: 2000,
    ai: 3000,
    advisor: 3000,
    risk: 35,
    level: '낮음',
    color: '#16a34a',
  },
];

/* =========================================================
   위험도 분석 이유
========================================================= */

const riskReasons = [
  {
    title: '암',
    level: '매우 높음',
    text: '38세는 경제활동과 가족에 대한 책임이 큰 시기이며, 암 발생 시 치료비뿐 아니라 장기간의 소득 공백까지 고려할 필요가 있습니다.',
  },
  {
    title: '뇌혈관',
    level: '높음',
    text: '가족력과 연령을 함께 고려할 경우 향후 뇌혈관질환에 대한 대비 필요성이 커집니다. 현재 가입금액도 추가적인 보완 여지가 있습니다.',
  },
  {
    title: '심혈관',
    level: '높음',
    text: '심혈관질환은 진단 이후 치료기간과 회복기간 동안 발생할 수 있는 경제적 부담을 함께 고려해야 합니다.',
  },
  {
    title: '수술비',
    level: '중간',
    text: '현재 기본적인 수술비 보장은 있으나 반복적인 수술이나 다양한 질병·상해 상황까지 고려하면 일정 수준의 추가 보완이 필요합니다.',
  },
  {
    title: '상해·후유장해',
    level: '낮음',
    text: '현재 가입금액이 기본적인 위험에 대응할 수 있는 수준으로 판단되어 상대적으로 우선순위는 낮게 평가했습니다.',
  },
];

/* =========================================================
   AI 종합 분석
========================================================= */

const aiComment =
  '현재 보장은 암·뇌혈관·심혈관 등 주요 질병에 대한 기본적인 준비가 되어 있지만, 가족의 경제적 책임과 향후 치료비 및 소득공백까지 고려하면 핵심 진단비를 중심으로 보완할 필요가 있습니다. 특히 암 보장은 현재 가입금액이 일부 확보되어 있으나 경제적 영향이 큰 위험인 만큼 우선적으로 점검하는 것이 좋습니다. 뇌혈관·심혈관 보장은 현재 가입금액과 권장금액의 차이를 확인하여 예산 범위 안에서 단계적으로 보완하는 방향을 권장합니다.';

/* =========================================================
   Radar Chart
   ========================================================= */

const radarData = {
  labels: ['암', '뇌혈관', '심혈관', '수술비', '상해·후유장해'],
  datasets: [
    {
      label: '현재 위험도',
      data: coverageData.map((item) => item.risk),
      backgroundColor: 'rgba(37, 99, 235, 0.16)',
      borderColor: '#2563eb',
      borderWidth: 3,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
    },
  ],
};

/*
  Chart.js 버전별 타입 충돌을 피하기 위해 any 사용
*/

const radarOptions: any = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    r: {
      min: 0,
      max: 100,

      ticks: {
        display: false,
      },

      grid: {
        color: '#dbeafe',
      },

      angleLines: {
        color: '#dbeafe',
      },

      pointLabels: {
        color: '#0f172a',

        font: {
          size: 15,
          weight: 600,
        },

        padding: 12,
      },
    },
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      callbacks: {
        label: function (context: any) {
          return ` 위험도 ${context.raw}%`;
        },
      },
    },
  },
};

/* =========================================================
   공통 버튼
========================================================= */

function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="no-print" style={topBarStyle}>
      <div style={leftButtonsStyle}>
        <button
          onClick={() => router.push('/new/coverage')}
          style={navButtonStyle}
        >
          🛡️ 보장분석
        </button>
      </div>

      <div style={centerButtonStyle}>
        <button onClick={() => router.push('/')} style={navButtonStyle}>
          🏠 메인
        </button>
      </div>

      <div style={rightButtonsStyle}>
        <button
          onClick={() => window.print()}
          style={navButtonStyle}
        >
          🖨️ 인쇄
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   페이지 이동
========================================================= */

function PageNavigation() {
  const router = useRouter();

  return (
    <div className="no-print" style={pageNavigationStyle}>
      <button
        onClick={() => router.push('/new/proposal')}
        style={{
          ...pageNumberButtonStyle,
          background: '#2563eb',
          color: '#ffffff',
        }}
      >
        1
      </button>

      <button
        onClick={() => router.push('/new/priority')}
        style={pageNumberButtonStyle}
      >
        2
      </button>

      <button
        onClick={() => router.push('/new/plan')}
        style={pageNumberButtonStyle}
      >
        3
      </button>

      <button
        onClick={() => router.push('/new/trend')}
        style={pageNumberButtonStyle}
      >
        4
      </button>
    </div>
  );
}

/* =========================================================
   메인 페이지
========================================================= */

export default function ProposalPage() {
  return (
    <>
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #eef3f9;
        }

        * {
          box-sizing: border-box;
        }

        @media print {
          html,
          body {
            width: 210mm;
            height: 297mm;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .proposal-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 10mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      <main style={mainStyle}>
        <NavigationButtons />

        <div className="proposal-page" style={proposalPageStyle}>

          {/* =================================================
              HEADER
          ================================================= */}

          <section style={headerStyle}>
            <div style={headerLeftStyle}>
              <div style={logoStyle}>🛡️</div>

              <div>
                <div style={smallTitleStyle}>
                  고객님을 위한 맞춤형
                </div>

                <h1 style={mainTitleStyle}>
                  종합보험 제안서
                </h1>

                <p style={headerDescriptionStyle}>
                  지금의 준비가 가족의 내일을 더 든든하게 만듭니다.
                </p>
              </div>
            </div>

            <div style={customerBadgeStyle}>
              <div style={customerNameStyle}>
                {customer.name} ({customer.age}세)
              </div>

              <div style={customerInfoStyle}>
                {customer.gender} · {customer.job}
              </div>
            </div>
          </section>

          {/* =================================================
              고객 인적사항
          ================================================= */}

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              👤 고객 인적사항 및 가족 현황
            </h2>

            <div style={customerInfoGridStyle}>
              <InfoBox
                icon="🎂"
                label="연령"
                value={`${customer.age}세`}
              />

              <InfoBox
                icon="💼"
                label="직업"
                value={customer.job}
              />

              <InfoBox
                icon="👨‍👩‍👧"
                label="가족사항"
                value={customer.family}
              />

              <InfoBox
                icon="❤️"
                label="가족력"
                value={customer.familyHistory}
              />
            </div>
          </section>

          {/* =================================================
              위험도 분석 + 현재 보장
          ================================================= */}

          <section style={sectionStyle}>
            <h2 style={sectionTitleStyle}>
              📊 주요 보장 위험도 분석
            </h2>

            <div style={analysisLayoutStyle}>

              {/* Radar */}
              <div style={radarCardStyle}>
                <div style={radarTitleStyle}>
                  고객 위험도
                </div>

                <div style={radarWrapStyle}>
                  <Radar
                    data={radarData}
                    options={radarOptions}
                  />
                </div>

                <div style={riskScaleStyle}>
                  <span style={{ color: '#16a34a' }}>
                    낮음
                  </span>

                  <span style={{ color: '#2563eb' }}>
                    보통
                  </span>

                  <span style={{ color: '#f97316' }}>
                    높음
                  </span>

                  <span style={{ color: '#ef4444' }}>
                    매우 높음
                  </span>
                </div>
              </div>

              {/* 현재 가입 보장 표 */}
              <div style={coverageTableCardStyle}>
                <div style={tableTitleStyle}>
                  현재 가입 보장 현황
                </div>

                <div style={tableDescriptionStyle}>
                  현재 가입금액과 권장금액을 비교하여 부족한 보장을 확인합니다.
                </div>

                <table style={coverageTableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>보장</th>
                      <th style={thStyle}>현재</th>
                      <th style={thStyle}>AI 권장</th>
                      <th style={thStyle}>설계사 권장</th>
                    </tr>
                  </thead>

                  <tbody>
                    {coverageData.map((item) => {
                      const shortage = item.ai - item.current;

                      return (
                        <tr key={item.key}>
                          <td style={tdTitleStyle}>
                            {item.label}
                          </td>

                          <td style={tdStyle}>
                            {item.current.toLocaleString()}만원
                          </td>

                          <td style={tdStyle}>
                            {item.ai.toLocaleString()}만원
                          </td>

                          <td style={tdAdvisorStyle}>
                            {item.advisor.toLocaleString()}만원
                          </td>

                          <td
                            style={{
                              ...statusTdStyle,
                              color:
                                shortage > 0
                                  ? '#ef4444'
                                  : '#16a34a',
                            }}
                          >
                            {shortage > 0
                              ? `+${shortage.toLocaleString()}`
                              : '충분'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={tableNoteStyle}>
                  ※ AI 권장금액은 고객의 연령·직업·가족구성·가족력 및
                  현재 보장현황을 종합하여 산출하는 참고 기준입니다.
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              왜 이렇게 판단했을까요?
          ================================================= */}

          <section style={reasonSectionStyle}>
            <h2 style={sectionTitleStyle}>
              💡 왜 이렇게 판단했을까요?
            </h2>

            <div style={reasonGridStyle}>
              {riskReasons.map((reason) => (
                <div
                  key={reason.title}
                  style={reasonCardStyle}
                >
                  <div style={reasonHeaderStyle}>
                    <strong>{reason.title}</strong>

                    <span
                      style={{
                        ...reasonLevelStyle,
                        color: getRiskColor(reason.level),
                        background:
                          getRiskBackground(reason.level),
                      }}
                    >
                      {reason.level}
                    </span>
                  </div>

                  <p style={bodyTextStyle}>
                    {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              AI 종합 분석
          ================================================= */}

          <section style={aiSectionStyle}>
            <div style={aiHeaderStyle}>
              <div style={aiIconStyle}>✨</div>

              <div>
                <h2 style={aiTitleStyle}>
                  AI 종합 분석 코멘트
                </h2>

                <div style={aiSubtitleStyle}>
                  고객님의 현재 보장과 위험요인을 종합적으로 분석했습니다.
                </div>
              </div>
            </div>

            <p style={aiTextStyle}>
              {aiComment}
            </p>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer style={footerStyle}>
            <span>1 / 4</span>

            <span>
              LifeCare Insight · 상담용 제안서
            </span>
          </footer>
        </div>

        <PageNavigation />
      </main>
    </>
  );
}

/* =========================================================
   작은 컴포넌트
========================================================= */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div style={infoBoxStyle}>
      <div style={infoIconStyle}>{icon}</div>

      <div>
        <div style={infoLabelStyle}>{label}</div>
        <div style={infoValueStyle}>{value}</div>
      </div>
    </div>
  );
}

/* =========================================================
   위험도 색상
========================================================= */

function getRiskColor(level: string) {
  if (level === '매우 높음') return '#ef4444';
  if (level === '높음') return '#f97316';
  if (level === '중간') return '#2563eb';
  return '#16a34a';
}

function getRiskBackground(level: string) {
  if (level === '매우 높음') return '#fee2e2';
  if (level === '높음') return '#ffedd5';
  if (level === '중간') return '#dbeafe';
  return '#dcfce7';
}

/* =========================================================
   STYLE
========================================================= */

const mainStyle = {
  minHeight: '100vh',
  background: '#eef3f9',
  padding: '16px',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const proposalPageStyle = {
  width: '210mm',
  minHeight: '297mm',
  maxWidth: '100%',
  margin: '0 auto',
  background: '#ffffff',
  padding: '16px',
  borderRadius: 18,
  boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
  overflow: 'hidden',
};

const topBarStyle = {
  maxWidth: '210mm',
  margin: '0 auto 14px',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
};

const leftButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const centerButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const rightButtonsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const navButtonStyle = {
  background: '#ffffff',
  border: '1px solid #dbe3f0',
  borderRadius: 10,
  padding: '9px 14px',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: 700,
  color: '#334155',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 16,
  paddingBottom: 12,
  borderBottom: '1px solid #e2e8f0',
};

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

const logoStyle = {
  width: 48,
  height: 48,
  borderRadius: 15,
  background: '#2563eb',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 25,
  flexShrink: 0,
};

const smallTitleStyle = {
  color: '#475569',
  fontSize: 11,
  fontWeight: 700,
};

const mainTitleStyle = {
  margin: '2px 0 0',
  fontSize: 25,
  lineHeight: 1.1,
  color: '#0f172a',
};

const headerDescriptionStyle = {
  margin: '5px 0 0',
  fontSize: 11,
  color: '#64748b',
};

const customerBadgeStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '10px 14px',
  minWidth: 150,
};

const customerNameStyle = {
  fontSize: 14,
  fontWeight: 800,
  color: '#0f172a',
};

const customerInfoStyle = {
  marginTop: 3,
  fontSize: 10,
  color: '#64748b',
};

const sectionStyle = {
  marginTop: 13,
};

const sectionTitleStyle = {
  margin: '0 0 8px',
  fontSize: 15,
  fontWeight: 800,
  color: '#0f172a',
};

const customerInfoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  border: '1px solid #dbeafe',
  borderRadius: 12,
  overflow: 'hidden',
};

const infoBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 9px',
  borderRight: '1px solid #e2e8f0',
  minWidth: 0,
};

const infoIconStyle = {
  fontSize: 18,
  flexShrink: 0,
};

const infoLabelStyle = {
  fontSize: 9,
  color: '#64748b',
};

const infoValueStyle = {
  marginTop: 2,
  fontSize: 11,
  fontWeight: 800,
  color: '#0f172a',
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const analysisLayoutStyle = {
  display: 'grid',
  gridTemplateColumns: '0.95fr 1.25fr',
  gap: 12,
  alignItems: 'stretch',
};

const radarCardStyle = {
  border: '1px solid #dbeafe',
  borderRadius: 14,
  padding: 10,
  background: '#fbfdff',
};

const radarTitleStyle = {
  fontSize: 13,
  fontWeight: 800,
  color: '#0f172a',
  textAlign: 'center' as const,
};

const radarWrapStyle = {
  height: 235,
  marginTop: 2,
};

const riskScaleStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  fontSize: 9,
  fontWeight: 700,
};

const coverageTableCardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 14,
  padding: 12,
  background: '#ffffff',
};

const tableTitleStyle = {
  fontSize: 13,
  fontWeight: 800,
  color: '#0f172a',
};

const tableDescriptionStyle = {
  marginTop: 3,
  marginBottom: 8,
  fontSize: 9,
  color: '#64748b',
};

const coverageTableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: 9,
};

const thStyle = {
  background: '#f8fafc',
  borderBottom: '1px solid #cbd5e1',
  padding: '7px 4px',
  textAlign: 'center' as const,
  fontWeight: 800,
  color: '#475569',
};

const tdStyle = {
  borderBottom: '1px solid #e2e8f0',
  padding: '7px 3px',
  textAlign: 'center' as const,
  color: '#334155',
};

const tdTitleStyle = {
  ...tdStyle,
  textAlign: 'left' as const,
  fontWeight: 800,
  color: '#0f172a',
};

const tdAdvisorStyle = {
  ...tdStyle,
  fontWeight: 800,
  color: '#2563eb',
};

const statusTdStyle = {
  ...tdStyle,
  fontWeight: 800,
};

const tableNoteStyle = {
  marginTop: 7,
  fontSize: 8,
  lineHeight: 1.4,
  color: '#94a3b8',
};

const reasonSectionStyle = {
  marginTop: 12,
};

const reasonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 7,
};

const reasonCardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 10,
  padding: 9,
  background: '#ffffff',
};

const reasonHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontSize: 11,
  color: '#0f172a',
};

const reasonLevelStyle = {
  padding: '3px 7px',
  borderRadius: 999,
  fontSize: 8,
  fontWeight: 800,
};

const bodyTextStyle = {
  fontSize: 10,
  lineHeight: 1.45,
  color: '#334155',
  margin: '6px 0 0',
};

const aiSectionStyle = {
  marginTop: 10,
  borderRadius: 13,
  border: '1px solid #ddd6fe',
  background: '#faf5ff',
  padding: 12,
};

const aiHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const aiIconStyle = {
  width: 30,
  height: 30,
  borderRadius: 9,
  background: '#7c3aed',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
};

const aiTitleStyle = {
  margin: 0,
  fontSize: 13,
  color: '#6d28d9',
};

const aiSubtitleStyle = {
  marginTop: 2,
  fontSize: 9,
  color: '#7c3aed',
};

const aiTextStyle = {
  margin: '8px 0 0',
  fontSize: 10,
  lineHeight: 1.55,
  color: '#334155',
};

const footerStyle = {
  marginTop: 10,
  paddingTop: 8,
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#94a3b8',
  fontSize: 9,
};

const pageNavigationStyle = {
  maxWidth: '210mm',
  margin: '14px auto 0',
  display: 'flex',
  justifyContent: 'center',
  gap: 7,
};

const pageNumberButtonStyle = {
  width: 34,
  height: 34,
  borderRadius: 9,
  border: '1px solid #dbe3f0',
  background: '#ffffff',
  color: '#475569',
  fontWeight: 800,
  cursor: 'pointer',
};
