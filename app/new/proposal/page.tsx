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
   기본 데이터
========================================================= */

const CUSTOMER = {
  name: '김민수',
  age: 38,
  job: '사무직',
  family: '배우자, 자녀 2명',
  familyHistory: '위암(父), 고혈압(母)',
};

const COVERAGE = [
  {
    name: '암',
    risk: 90,
    current: 3000,
    average: 3800,
    recommended: 5000,
    reason:
      '가족력과 연령을 고려할 때 경제적 위험이 큰 영역입니다. 현재 가입금액은 권장 수준보다 부족할 수 있어 우선적인 검토가 필요합니다.',
  },
  {
    name: '뇌혈관',
    risk: 78,
    current: 1000,
    average: 2100,
    recommended: 3000,
    reason:
      '30대 후반부터 뇌혈관 질환 위험을 장기적으로 고려할 필요가 있습니다. 현재 보장 수준이 연령대 평균보다 낮습니다.',
  },
  {
    name: '심혈관',
    risk: 68,
    current: 1200,
    average: 2000,
    recommended: 3000,
    reason:
      '고혈압 가족력을 고려하면 심혈관 질환에 대한 대비가 필요합니다. 현재 보장금액은 추가 검토가 필요한 수준입니다.',
  },
  {
    name: '수술비',
    risk: 52,
    current: 500,
    average: 700,
    recommended: 1000,
    reason:
      '질병이나 상해로 인한 반복적인 수술 가능성을 고려하여 기본적인 수술비 보장을 확보하는 것이 좋습니다.',
  },
  {
    name: '상해·후유장해',
    risk: 32,
    current: 2000,
    average: 2500,
    recommended: 3000,
    reason:
      '현재 직업과 생활환경을 고려하면 상대적인 위험도는 낮지만, 예상하지 못한 사고에 대비한 기본적인 보장은 필요합니다.',
  },
];

/* =========================================================
   레이더 차트
========================================================= */

const radarData = {
  labels: COVERAGE.map((item) => item.name),

  datasets: [
    {
      label: '예상 위험도',
      data: COVERAGE.map((item) => item.risk),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.16)',
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      borderWidth: 3,
    },
    {
      label: '현재 가입 수준',
      data: COVERAGE.map((item) =>
        Math.min((item.current / item.recommended) * 100, 100)
      ),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      borderWidth: 3,
    },
    {
      label: '동일 연령대 평균',
      data: COVERAGE.map((item) =>
        Math.min((item.average / item.recommended) * 100, 100)
      ),
      borderColor: '#94a3b8',
      backgroundColor: 'rgba(148, 163, 184, 0.04)',
      pointBackgroundColor: '#94a3b8',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      borderWidth: 2,
      borderDash: [6, 5],
    },
  ],
};

const radarOptions = {
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
        color: '#dbe5f1',
      },

      angleLines: {
        color: '#dbe5f1',
      },

      pointLabels: {
        color: '#0f172a',

        font: {
          size: 15,
          weight: 'bold' as const,
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
      enabled: true,
    },
  },
};

/* =========================================================
   메인 컴포넌트
========================================================= */

export default function ProposalPage() {
  const router = useRouter();

  const today = new Date();

  const todayText = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const overallRisk =
    Math.round(
      COVERAGE.reduce((sum, item) => sum + item.risk, 0) / COVERAGE.length
    );

  const overallRiskText =
    overallRisk >= 80
      ? '매우 높음'
      : overallRisk >= 65
      ? '높음'
      : overallRisk >= 45
      ? '보통'
      : '낮음';

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* =====================================================
          화면용 상단 버튼
      ===================================================== */}

      <div className="no-print" style={toolbarStyle}>
        <button
          onClick={() => router.push('/new/coverage')}
          style={leftButtonStyle}
        >
          🛡️ 보장분석
        </button>

        <button
          onClick={() => router.push('/')}
          style={centerButtonStyle}
        >
          🏠 메인
        </button>

        <div style={rightButtonGroupStyle}>
          <button
            onClick={handlePrint}
            style={normalButtonStyle}
          >
            📄 PDF 저장
          </button>

          <button
            onClick={handlePrint}
            style={normalButtonStyle}
          >
            🖨️ 인쇄
          </button>
        </div>
      </div>

      {/* =====================================================
          A4 가로 페이지
      ===================================================== */}

      <main style={screenBackgroundStyle}>
        <div className="proposal-page" style={proposalPageStyle}>

          {/* =================================================
              제목 영역
          ================================================= */}

          <header style={headerStyle}>
            <div style={headerLeftStyle}>
              <div style={logoStyle}>🛡️</div>

              <div>
                <div style={smallTitleStyle}>
                  고객님을 위한 맞춤형
                </div>

                <h1 style={mainTitleStyle}>
                  종합보험 제안서
                </h1>

                <p style={headerSubStyle}>
                  지금의 준비가 가족의 내일을 더 든든하게 만듭니다.
                </p>
              </div>
            </div>

            <div style={dateStyle}>
              📅 {todayText}
            </div>
          </header>

          {/* =================================================
              본문 3단 구성
          ================================================= */}

          <section style={contentGridStyle}>

            {/* =================================================
                LEFT
            ================================================= */}

            <div style={leftColumnStyle}>

              {/* 고객 인적사항 */}

              <section style={cardStyle}>
                <h2 style={cardTitleStyle}>
                  👤 고객 인적사항 및 가족 현황
                </h2>

                <div style={infoListStyle}>

                  <InfoRow
                    label="연령"
                    value={`${CUSTOMER.age}세`}
                  />

                  <InfoRow
                    label="직업"
                    value={CUSTOMER.job}
                  />

                  <InfoRow
                    label="가족사항"
                    value={CUSTOMER.family}
                  />

                  <InfoRow
                    label="가족력"
                    value={CUSTOMER.familyHistory}
                  />

                </div>
              </section>

              {/* 종합 위험도 */}

              <section
                style={{
                  ...cardStyle,
                  flex: 1,
                }}
              >
                <h2 style={cardTitleStyle}>
                  📊 종합 위험도 평가
                </h2>

                <div style={riskBoxStyle}>
                  <div style={riskLabelStyle}>
                    종합 위험도
                  </div>

                  <div style={riskValueStyle}>
                    {overallRiskText}
                  </div>

                  <div style={riskScoreStyle}>
                    위험도 {overallRisk} / 100
                  </div>
                </div>

                <p style={bodyTextStyle}>
                  고객님의 연령, 직업, 가족력 및 현재 보장상태를
                  종합적으로 고려한 결과입니다.
                </p>

                <div style={riskBarStyle}>
                  <div
                    style={{
                      ...riskBarFillStyle,
                      width: `${overallRisk}%`,
                    }}
                  />
                </div>
              </section>
            </div>

            {/* =================================================
                CENTER
            ================================================= */}

            <section style={centerCardStyle}>

              <h2 style={cardTitleStyle}>
                📊 주요 보장 위험도 및 가입금액 비교
              </h2>

              <p style={descriptionStyle}>
                고객님의 위험도와 현재 가입 수준을 한눈에 비교합니다.
              </p>

              {/* 차트 범례 */}

              <div style={legendStyle}>

                <LegendItem
                  color="#2563eb"
                  label="예상 위험도"
                />

                <LegendItem
                  color="#ef4444"
                  label="현재 가입 수준"
                />

                <LegendItem
                  color="#94a3b8"
                  label="동일 연령대 평균"
                />

              </div>

              {/* 레이더 차트 */}

              <div style={chartContainerStyle}>
                <Radar
                  data={radarData}
                  options={radarOptions}
                />
              </div>

              {/* 차트 설명 */}

              <div style={chartDescriptionGridStyle}>

                <div style={chartDescriptionBoxStyle}>
                  <strong style={{ color: '#2563eb' }}>
                    🔵 예상 위험도
                  </strong>

                  <span>
                    연령·직업·가족력 등을 고려한 상대적 위험 수준
                  </span>
                </div>

                <div style={chartDescriptionBoxStyle}>
                  <strong style={{ color: '#ef4444' }}>
                    🔴 현재 가입 수준
                  </strong>

                  <span>
                    현재 가입한 보장금액을 권장금액과 비교한 수준
                  </span>
                </div>

                <div style={chartDescriptionBoxStyle}>
                  <strong style={{ color: '#64748b' }}>
                    ⚪ 동일 연령대 평균
                  </strong>

                  <span>
                    비슷한 연령대에서 일반적으로 준비하는 보장 수준
                  </span>
                </div>

              </div>

            </section>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div style={rightColumnStyle}>

              {/* 보장금액 비교표 */}

              <section style={cardStyle}>

                <div style={tableHeaderStyle}>
                  <h2 style={cardTitleStyle}>
                    🛡️ 보장금액 비교
                  </h2>

                  <span style={unitStyle}>
                    단위: 만원
                  </span>
                </div>

                <div style={tableWrapperStyle}>
                  <table style={tableStyle}>

                    <thead>
                      <tr>
                        <th style={thStyle}>보장</th>
                        <th style={thStyle}>위험도</th>
                        <th style={thStyle}>현재</th>
                        <th style={thStyle}>연령대</th>
                        <th style={thStyle}>권장</th>
                      </tr>
                    </thead>

                    <tbody>
                      {COVERAGE.map((item) => (
                        <tr key={item.name}>

                          <td style={tdStrongStyle}>
                            {item.name}
                          </td>

                          <td
                            style={{
                              ...tdStyle,
                              color:
                                item.risk >= 80
                                  ? '#ef4444'
                                  : item.risk >= 60
                                  ? '#f97316'
                                  : '#2563eb',
                              fontWeight: 800,
                            }}
                          >
                            {item.risk}
                          </td>

                          <td style={tdStyle}>
                            {item.current.toLocaleString()}
                          </td>

                          <td style={tdStyle}>
                            {item.average.toLocaleString()}
                          </td>

                          <td
                            style={{
                              ...tdStyle,
                              fontWeight: 800,
                              color: '#2563eb',
                            }}
                          >
                            {item.recommended.toLocaleString()}
                          </td>

                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                <p style={tableNoteStyle}>
                  ※ 현재 가입금액과 권장금액을 비교하여 부족한 보장을 확인할 수 있습니다.
                </p>

              </section>

              {/* 왜 이렇게 판단했을까요? */}

              <section style={cardStyle}>

                <h2 style={cardTitleStyle}>
                  💡 왜 이렇게 판단했을까요?
                </h2>

                <div style={reasonListStyle}>

                  {COVERAGE.map((item) => (
                    <div
                      key={item.name}
                      style={reasonItemStyle}
                    >
                      <span style={checkStyle}>✓</span>

                      <div>
                        <strong style={reasonTitleStyle}>
                          {item.name}
                        </strong>

                        <span style={reasonTextStyle}>
                          {item.reason}
                        </span>
                      </div>
                    </div>
                  ))}

                </div>

              </section>

              {/* AI 분석 */}

              <section style={aiCardStyle}>

                <h2 style={aiTitleStyle}>
                  🤖 AI 종합 분석 코멘트
                </h2>

                <p style={aiTextStyle}>
                  고객님의 현재 보장 수준을 종합적으로 분석한 결과,
                  암·뇌혈관·심혈관 영역에서 상대적으로 높은 위험도가
                  확인됩니다.
                </p>

                <p style={aiTextStyle}>
                  특히 가족력과 연령을 함께 고려하면 현재 가입금액만으로는
                  향후 치료비와 소득공백에 충분히 대응하기 어려울 수 있습니다.
                </p>

                <p style={aiTextStyle}>
                  모든 특약을 한꺼번에 추가하기보다는 위험도가 높은
                  보장부터 우선적으로 보완하는 방향을 권장합니다.
                </p>

              </section>

            </div>

          </section>

          {/* =================================================
              하단 메시지
          ================================================= */}

          <div style={bottomMessageStyle}>
            🎯 고객님에게는 모든 것을 다 넣는 것보다,
            <strong>
              가장 중요한 위험부터 순서대로 준비하는 것
            </strong>
            이 더 현명합니다.
          </div>

          {/* =================================================
              페이지 이동
          ================================================= */}

          <div
            className="no-print"
            style={paginationStyle}
          >
            <button
              onClick={() => router.push('/new/proposal')}
              style={activePageButtonStyle}
            >
              1
            </button>

            <button
              onClick={() => router.push('/new/priority')}
              style={pageButtonStyle}
            >
              2
            </button>

            <button
              onClick={() => router.push('/new/plan')}
              style={pageButtonStyle}
            >
              3
            </button>

            <button
              onClick={() => router.push('/new/trend')}
              style={pageButtonStyle}
            >
              4
            </button>
          </div>

        </div>
      </main>

      {/* =====================================================
          A4 인쇄 CSS
      ===================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        @page {
          size: A4 landscape;
          margin: 0;
        }

        @media print {

          html,
          body {
            width: 297mm;
            height: 210mm;
            background: white !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
          }

          .no-print {
            display: none !important;
          }

          .proposal-page {
            width: 297mm !important;
            height: 210mm !important;
            min-height: 210mm !important;
            max-height: 210mm !important;

            margin: 0 !important;
            padding: 8mm !important;

            border-radius: 0 !important;
            box-shadow: none !important;
            border: none !important;

            overflow: hidden !important;
          }

          .proposal-page * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

        @media screen and (max-width: 1100px) {

          .proposal-page {
            transform-origin: top center;
          }

        }

      `}</style>
    </>
  );
}

/* =========================================================
   작은 컴포넌트
========================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div style={infoRowStyle}>
      <span style={infoLabelStyle}>
        {label}
      </span>

      <strong style={infoValueStyle}>
        {value}
      </strong>
    </div>
  );
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div style={legendItemStyle}>
      <span
        style={{
          ...legendDotStyle,
          background: color,
        }}
      />

      <span>{label}</span>
    </div>
  );
}

/* =========================================================
   스타일
========================================================= */

const toolbarStyle = {
  width: 'min(1470px, calc(100% - 32px))',
  margin: '10px auto',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: 12,
};

const leftButtonStyle = {
  justifySelf: 'start',
  background: 'white',
  border: '1px solid #dbe5f1',
  borderRadius: 12,
  padding: '10px 18px',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};

const centerButtonStyle = {
  justifySelf: 'center',
  background: 'white',
  border: '1px solid #dbe5f1',
  borderRadius: 12,
  padding: '10px 18px',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};

const rightButtonGroupStyle = {
  justifySelf: 'end',
  display: 'flex',
  gap: 8,
};

const normalButtonStyle = {
  background: 'white',
  border: '1px solid #dbe5f1',
  borderRadius: 12,
  padding: '10px 16px',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
};

const screenBackgroundStyle = {
  minHeight: 'calc(100vh - 70px)',
  background: '#f4f7fb',
  padding: '8px 16px 20px',
};

const proposalPageStyle = {
  width: 'min(1470px, calc(100vw - 32px))',
  aspectRatio: '297 / 210',
  minHeight: 700,
  margin: '0 auto',
  background: 'white',
  border: '1px solid #dbe5f1',
  borderRadius: 18,
  padding: 22,
  boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
};

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
};

const logoStyle = {
  width: 52,
  height: 52,
  borderRadius: 16,
  background: '#eff6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
};

const smallTitleStyle = {
  fontSize: 12,
  color: '#475569',
  fontWeight: 700,
};

const mainTitleStyle = {
  margin: '1px 0',
  fontSize: 25,
  lineHeight: 1.15,
  color: '#0f172a',
  fontWeight: 900,
};

const headerSubStyle = {
  margin: 0,
  fontSize: 11,
  color: '#64748b',
};

const dateStyle = {
  fontSize: 13,
  fontWeight: 700,
  color: '#1e3a8a',
  whiteSpace: 'nowrap' as const,
};

const contentGridStyle = {
  flex: 1,
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: '0.78fr 1.38fr 1fr',
  gap: 10,
};

const leftColumnStyle = {
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 10,
};

const rightColumnStyle = {
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 10,
};

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #dbe5f1',
  borderRadius: 14,
  padding: 16,
  minHeight: 0,
};

const centerCardStyle = {
  ...cardStyle,
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden',
};

const cardTitleStyle = {
  margin: 0,
  fontSize: 15,
  fontWeight: 900,
  color: '#0f3b8f',
};

const infoListStyle = {
  marginTop: 10,
  borderTop: '1px solid #eef2f7',
};

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 10,
  padding: '9px 2px',
  borderBottom: '1px solid #eef2f7',
};

const infoLabelStyle = {
  fontSize: 11,
  color: '#64748b',
};

const infoValueStyle = {
  fontSize: 12,
  color: '#0f172a',
  textAlign: 'right' as const,
};

const riskBoxStyle = {
  marginTop: 12,
  borderRadius: 12,
  background: 'linear-gradient(135deg,#fffaf0,#fff7ed)',
  padding: '18px 10px',
  textAlign: 'center' as const,
};

const riskLabelStyle = {
  fontSize: 11,
  color: '#64748b',
  fontWeight: 700,
};

const riskValueStyle = {
  marginTop: 4,
  fontSize: 28,
  fontWeight: 900,
  color: '#ef4444',
};

const riskScoreStyle = {
  marginTop: 4,
  fontSize: 11,
  color: '#64748b',
};

const bodyTextStyle = {
  fontSize: 13,
  lineHeight: 1.55,
  color: '#334155',
};

const riskBarStyle = {
  height: 9,
  borderRadius: 999,
  overflow: 'hidden',
  background:
    'linear-gradient(90deg,#86efac,#fde68a,#fb923c,#fecaca)',
  marginTop: 12,
};

const riskBarFillStyle = {
  height: '100%',
  background: 'rgba(239,68,68,0.72)',
  borderRadius: 999,
};

const descriptionStyle = {
  margin: '5px 0 6px',
  fontSize: 10,
  color: '#64748b',
};

const legendStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap' as const,
  gap: 18,
  marginBottom: 2,
};

const legendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 10,
  color: '#475569',
  fontWeight: 700,
};

const legendDotStyle = {
  width: 9,
  height: 9,
  borderRadius: '50%',
};

const chartContainerStyle = {
  flex: 1,
  minHeight: 0,
  position: 'relative' as const,
  marginTop: 2,
};

const chartDescriptionGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 6,
  marginTop: 5,
};

const chartDescriptionBoxStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 3,
  padding: '7px 8px',
  background: '#f8fafc',
  borderRadius: 8,
  fontSize: 9,
  lineHeight: 1.35,
  color: '#64748b',
};

const tableHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const unitStyle = {
  fontSize: 9,
  color: '#94a3b8',
};

const tableWrapperStyle = {
  marginTop: 8,
  overflow: 'hidden',
  borderRadius: 8,
  border: '1px solid #dbe5f1',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  tableLayout: 'fixed' as const,
};

const thStyle = {
  background: '#eff6ff',
  color: '#1e3a8a',
  fontSize: 9,
  fontWeight: 800,
  padding: '7px 3px',
  borderRight: '1px solid #dbe5f1',
  borderBottom: '1px solid #dbe5f1',
};

const tdStyle = {
  textAlign: 'center' as const,
  fontSize: 9,
  color: '#334155',
  padding: '6px 3px',
  borderRight: '1px solid #e2e8f0',
  borderBottom: '1px solid #e2e8f0',
};

const tdStrongStyle = {
  ...tdStyle,
  fontWeight: 800,
  color: '#0f172a',
};

const tableNoteStyle = {
  margin: '6px 0 0',
  padding: '5px 7px',
  background: '#f8fafc',
  borderRadius: 7,
  fontSize: 8,
  color: '#64748b',
};

const reasonListStyle = {
  marginTop: 8,
  display: 'grid',
  gap: 6,
};

const reasonItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 7,
  fontSize: 9,
  lineHeight: 1.4,
  color: '#475569',
};

const checkStyle = {
  width: 17,
  height: 17,
  borderRadius: '50%',
  background: '#dbeafe',
  color: '#2563eb',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 900,
  flexShrink: 0,
};

const reasonTitleStyle = {
  display: 'block',
  color: '#0f172a',
  fontSize: 10,
  marginBottom: 1,
};

const reasonTextStyle = {
  display: 'block',
};

const aiCardStyle = {
  ...cardStyle,
  background: '#faf5ff',
  borderColor: '#ddd6fe',
  flex: 1,
};

const aiTitleStyle = {
  margin: 0,
  fontSize: 14,
  color: '#5b21b6',
  fontWeight: 900,
};

const aiTextStyle = {
  margin: '7px 0 0',
  fontSize: 9,
  lineHeight: 1.5,
  color: '#475569',
};

const bottomMessageStyle = {
  marginTop: 10,
  padding: '8px 14px',
  background: '#fff9e8',
  border: '1px solid #f6d365',
  borderRadius: 10,
  textAlign: 'center' as const,
  color: '#334155',
  fontSize: 11,
  lineHeight: 1.4,
};

const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 7,
  marginTop: 8,
};

const pageButtonStyle = {
  width: 26,
  height: 26,
  borderRadius: 7,
  border: '1px solid #dbe5f1',
  background: 'white',
  color: '#475569',
  fontSize: 11,
  fontWeight: 800,
  cursor: 'pointer',
};

const activePageButtonStyle = {
  ...pageButtonStyle,
  background: '#2563eb',
  color: 'white',
  borderColor: '#2563eb',
};
