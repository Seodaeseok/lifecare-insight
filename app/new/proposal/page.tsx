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
   고객 기본 정보
   ※ 추후 Supabase 고객 데이터와 연결
========================================================= */

const CUSTOMER_DATA = {
  name: '김민수',
  age: 38,
  gender: '남성',
  job: '사무직',
  spouse: '배우자 있음',
  children: '자녀 2명',
  familyHistory: '부친 암 병력',
  driving: '자가용 운전',
};

/* =========================================================
   고객의 현재 가입 보장
   단위 : 만원
   ※ 추후 보장분석 페이지 입력값과 연결
========================================================= */

const CURRENT_COVERAGE = {
  cancer: 3000,
  cerebrovascular: 1000,
  ischemicHeart: 500,
  surgery: 200,
  accident: 300,
};

/* =========================================================
   위험도 분석
   ※ 추후 AI 분석 로직과 연결 가능
========================================================= */

const RISK_ANALYSIS = [
  {
    key: 'cancer',
    label: '암',
    risk: 82,
    level: '매우 높음',
    color: '#dc2626',
    reason:
      '현재 연령대에서 암 위험에 대한 대비가 중요하며, 가족력까지 고려하면 진단 이후 치료비뿐 아니라 소득 공백까지 대비할 필요가 있습니다.',
  },
  {
    key: 'cerebrovascular',
    label: '뇌혈관',
    risk: 68,
    level: '높음',
    color: '#ea580c',
    reason:
      '40대 이후 뇌혈관질환 발생 위험이 증가하기 때문에 현재부터 충분한 진단자금을 확보해두는 것이 유리합니다.',
  },
  {
    key: 'ischemicHeart',
    label: '심장질환',
    risk: 62,
    level: '높음',
    color: '#ea580c',
    reason:
      '심장질환은 치료기간과 회복기간 동안 경제활동에 영향을 줄 수 있어 진단자금 중심의 대비가 필요합니다.',
  },
  {
    key: 'surgery',
    label: '수술비',
    risk: 48,
    level: '중간',
    color: '#2563eb',
    reason:
      '수술은 특정 질환뿐 아니라 다양한 생활질환에서도 발생할 수 있어 반복적인 치료에 대비할 수 있는 보조 보장이 필요합니다.',
  },
  {
    key: 'accident',
    label: '간병·치매',
    risk: 32,
    level: '낮음',
    color: '#16a34a',
    reason:
      '현재 연령에서는 우선순위가 상대적으로 낮지만 장기적으로는 노후자산 및 간병비와 함께 준비할 필요가 있습니다.',
  },
];

/* =========================================================
   위험도 레이더
========================================================= */

const radarData = {
  labels: RISK_ANALYSIS.map((item) => item.label),

  datasets: [
    {
      label: '예상 위험도',
      data: RISK_ANALYSIS.map((item) => item.risk),
      backgroundColor: 'rgba(37, 99, 235, 0.18)',
      borderColor: '#2563eb',
      borderWidth: 2,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

/* =========================================================
   현재 가입금액
   ※ 레이더에 표현하기 위해 상대적인 보장 수준으로 환산
========================================================= */

const COVERAGE_LEVELS = {
  cancer: 60,
  cerebrovascular: 55,
  ischemicHeart: 40,
  surgery: 50,
  accident: 35,
};

const coverageRadarData = {
  labels: RISK_ANALYSIS.map((item) => item.label),

  datasets: [
    {
      label: '현재 보장 수준',
      data: [
        COVERAGE_LEVELS.cancer,
        COVERAGE_LEVELS.cerebrovascular,
        COVERAGE_LEVELS.ischemicHeart,
        COVERAGE_LEVELS.surgery,
        COVERAGE_LEVELS.accident,
      ],
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#10b981',
      borderWidth: 2,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

/* =========================================================
   Chart.js 옵션
   any를 사용해서 기존 TypeScript 오류 방지
========================================================= */

const radarOptions: any = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    r: {
      min: 0,
      max: 100,

      ticks: {
        display: false,
        stepSize: 20,
      },

      grid: {
        color: '#dbeafe',
      },

      angleLines: {
        color: '#dbeafe',
      },

      pointLabels: {
        color: '#334155',

        font: {
          size: 13,
          weight: 600,
        },
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
   AI 분석 코멘트
========================================================= */

const AI_COMMENT =
  '현재 고객님의 보장구성을 종합적으로 살펴보면 암과 뇌혈관·심장질환에 대한 대비를 우선적으로 점검할 필요가 있습니다. 특히 현재 가입금액이 위험도에 비해 충분한지 확인하고, 부족한 영역부터 순차적으로 보완하는 방식이 효율적입니다. 모든 특약을 한꺼번에 추가하기보다는 가족력과 현재 경제활동, 향후 가족의 생활비까지 고려해 우선순위를 정하는 것이 중요합니다.';

/* =========================================================
   현재 가입금액 표시
========================================================= */

const currentCoverageList = [
  {
    title: '암 진단자금',
    amount: CURRENT_COVERAGE.cancer,
    color: '#dc2626',
  },
  {
    title: '뇌혈관 진단자금',
    amount: CURRENT_COVERAGE.cerebrovascular,
    color: '#7c3aed',
  },
  {
    title: '허혈성 심장질환',
    amount: CURRENT_COVERAGE.ischemicHeart,
    color: '#0284c7',
  },
  {
    title: '질병·상해 수술비',
    amount: CURRENT_COVERAGE.surgery,
    color: '#16a34a',
  },
  {
    title: '간병·치매 관련',
    amount: CURRENT_COVERAGE.accident,
    color: '#64748b',
  },
];

/* =========================================================
   페이지
========================================================= */

export default function ProposalPage() {
  const router = useRouter();

  const goToPage = (page: number) => {
    if (page === 1) {
      router.push('/new/proposal');
    }

    if (page === 2) {
      router.push('/new/priority');
    }

    if (page === 3) {
      router.push('/new/plan');
    }

    if (page === 4) {
      router.push('/new/trend');
    }
  };

  const handlePdf = () => {
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* =====================================================
          인쇄용 CSS
      ===================================================== */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #f3f6fb;
        }

        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .a4-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 10mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: hidden !important;
          }
        }
      `}</style>

      {/* =====================================================
          화면 전체
      ===================================================== */}

      <main style={mainStyle}>

        {/* ===================================================
            상단 버튼
        =================================================== */}

        <div className="no-print" style={topBarStyle}>

          {/* 왼쪽 : 보장분석 */}

          <div style={topLeftStyle}>
            <button
              onClick={() => router.push('/new/coverage')}
              style={navButtonStyle}
            >
              🛡️ 보장분석
            </button>
          </div>

          {/* 가운데 : 메인 */}

          <div style={topCenterStyle}>
            <button
              onClick={() => router.push('/')}
              style={mainButtonStyle}
            >
              🏠 메인
            </button>
          </div>

          {/* 오른쪽 : PDF / 인쇄 */}

          <div style={topRightStyle}>
            <button
              onClick={handlePdf}
              style={navButtonStyle}
            >
              📄 PDF 저장
            </button>

            <button
              onClick={handlePrint}
              style={navButtonStyle}
            >
              🖨 인쇄
            </button>
          </div>
        </div>

        {/* ===================================================
            A4 본문
        =================================================== */}

        <div className="a4-page" style={pageStyle}>

          {/* =================================================
              헤더
          ================================================= */}

          <div style={headerStyle}>

            <div style={headerLeftStyle}>

              <div style={logoStyle}>
                🛡️
              </div>

              <div>
                <div style={smallHeaderStyle}>
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

            <div style={customerBadgeStyle}>

              <div style={customerIconStyle}>
                👤
              </div>

              <div>
                <div style={customerNameStyle}>
                  {CUSTOMER_DATA.name} 고객님
                </div>

                <div style={customerInfoStyle}>
                  {CUSTOMER_DATA.age}세 · {CUSTOMER_DATA.gender}
                </div>
              </div>

            </div>
          </div>

          {/* =================================================
              1. 고객 인적사항 및 가족 현황
          ================================================= */}

          <section style={sectionStyle}>

            <h2 style={sectionTitleStyle}>
              👤 고객 인적사항 및 가족 현황
            </h2>

            <div style={customerInfoGridStyle}>

              <InfoItem
                icon="📅"
                label="연령"
                value={`${CUSTOMER_DATA.age}세`}
              />

              <InfoItem
                icon="💼"
                label="직업"
                value={CUSTOMER_DATA.job}
              />

              <InfoItem
                icon="👨‍👩‍👧"
                label="가족사항"
                value={`${CUSTOMER_DATA.spouse}, ${CUSTOMER_DATA.children}`}
              />

              <InfoItem
                icon="❤️"
                label="가족력"
                value={CUSTOMER_DATA.familyHistory}
              />

            </div>
          </section>

          {/* =================================================
              2. 주요 보장 위험도 분석
          ================================================= */}

          <section style={sectionStyle}>

            <h2 style={sectionTitleStyle}>
              📊 주요 보장 위험도 분석
            </h2>

            <p style={bodyTextStyle}>
              고객님의 연령, 직업, 가족력 및 현재 가입된 보장내용을
              종합적으로 고려하여 주요 위험도를 분석했습니다.
            </p>

            <div style={analysisGridStyle}>

              {/* 위험도 레이더 */}

              <div style={chartCardStyle}>

                <div style={chartTitleStyle}>
                  현재 고객님의 예상 위험도
                </div>

                <div style={chartAreaStyle}>
                  <Radar
                    data={radarData}
                    options={radarOptions}
                  />
                </div>

                <div style={chartLegendStyle}>
                  <span style={legendDotBlueStyle}></span>
                  예상 위험도
                </div>

              </div>

              {/* 위험도 설명 */}

              <div style={riskReasonCardStyle}>

                <div style={riskReasonTitleStyle}>
                  💡 왜 이렇게 판단했을까요?
                </div>

                <div style={riskReasonListStyle}>

                  {RISK_ANALYSIS.map((item) => (
                    <div
                      key={item.key}
                      style={riskReasonItemStyle}
                    >

                      <div
                        style={{
                          ...riskLevelStyle,
                          color: item.color,
                        }}
                      >
                        {item.label}
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 12,
                          }}
                        >
                          {item.level}
                        </span>
                      </div>

                      <div style={riskReasonTextStyle}>
                        {item.reason}
                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>
          </section>

          {/* =================================================
              3. 현재 가입 보장
          ================================================= */}

          <section style={sectionStyle}>

            <h2 style={sectionTitleStyle}>
              🔎 현재 가입된 보장은 어느 정도일까요?
            </h2>

            <div style={coverageSectionStyle}>

              {/* 현재 보장 레이더 */}

              <div style={coverageChartCardStyle}>

                <div style={chartTitleStyle}>
                  현재 보장 수준
                </div>

                <div style={chartAreaSmallStyle}>
                  <Radar
                    data={coverageRadarData}
                    options={radarOptions}
                  />
                </div>

                <div style={chartLegendStyle}>
                  <span style={legendDotGreenStyle}></span>
                  현재 보장 수준
                </div>

              </div>

              {/* 실제 가입금액 */}

              <div style={coverageAmountCardStyle}>

                <div style={coverageAmountTitleStyle}>
                  현재 가입금액
                </div>

                <div style={coverageAmountListStyle}>

                  {currentCoverageList.map((item) => (
                    <div
                      key={item.title}
                      style={coverageAmountRowStyle}
                    >

                      <div
                        style={{
                          ...coverageAmountDotStyle,
                          background: item.color,
                        }}
                      />

                      <div style={coverageAmountNameStyle}>
                        {item.title}
                      </div>

                      <div style={coverageAmountValueStyle}>
                        {item.amount.toLocaleString()}만원
                      </div>

                    </div>
                  ))}

                </div>

                <div style={coverageNoteStyle}>
                  ※ 실제 가입금액은 보장분석에 입력된 현재 계약을 기준으로
                  표시됩니다.
                </div>

              </div>

            </div>
          </section>

          {/* =================================================
              4. AI 분석 코멘트
          ================================================= */}

          <section style={aiBoxStyle}>

            <div style={aiHeaderStyle}>
              <span style={aiIconStyle}>
                ✨
              </span>

              <div>
                <div style={aiTitleStyle}>
                  AI 보장분석 코멘트
                </div>

                <div style={aiSubTitleStyle}>
                  고객님의 현재 상황을 종합한 분석 결과입니다.
                </div>
              </div>
            </div>

            <p style={aiTextStyle}>
              {AI_COMMENT}
            </p>

          </section>

          {/* =================================================
              핵심 메시지
          ================================================= */}

          <div style={bottomMessageStyle}>

            <div style={bottomMessageIconStyle}>
              🎯
            </div>

            <div>
              <div style={bottomMessageTitleStyle}>
                고객님에게는 '모든 것을 다 넣는 것'보다
              </div>

              <div style={bottomMessageStrongStyle}>
                '가장 중요한 위험부터 순서대로 준비하는 것'이 더 현명합니다.
              </div>
            </div>

          </div>

          {/* =================================================
              페이지 이동
          ================================================= */}

          <div className="no-print" style={pageNavigationStyle}>

            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                style={{
                  ...pageButtonStyle,
                  ...(page === 1
                    ? activePageButtonStyle
                    : {}),
                }}
              >
                {page}
              </button>
            ))}

          </div>

          {/* =================================================
              하단
          ================================================= */}

          <div style={footerStyle}>

            <span>
              1 / 4
            </span>

            <span>
              LifeCare Insight · 상담용 제안서
            </span>

          </div>

        </div>
      </main>
    </>
  );
}

/* =========================================================
   작은 정보 컴포넌트
========================================================= */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div style={infoItemStyle}>

      <div style={infoIconStyle}>
        {icon}
      </div>

      <div>
        <div style={infoLabelStyle}>
          {label}
        </div>

        <div style={infoValueStyle}>
          {value}
        </div>
      </div>

    </div>
  );
}

/* =========================================================
   스타일
========================================================= */

const mainStyle = {
  minHeight: '100vh',
  background: '#f3f6fb',
  padding: '16px',
  fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

/* 상단 버튼 */

const topBarStyle = {
  width: '100%',
  maxWidth: '794px',
  margin: '0 auto 14px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  alignItems: 'center',
};

const topLeftStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const topCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const topRightStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
};

const navButtonStyle = {
  background: '#ffffff',
  border: '1px solid #dbe3f0',
  borderRadius: '10px',
  padding: '9px 13px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 700,
  color: '#334155',
};

const mainButtonStyle = {
  ...navButtonStyle,
  background: '#2563eb',
  color: '#ffffff',
  border: '1px solid #2563eb',
};

/* A4 페이지 */

const pageStyle = {
  width: '794px',
  height: '1123px',
  maxWidth: '100%',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '18px',
  padding: '16px',
  boxShadow: '0 12px 40px rgba(15, 23, 42, 0.10)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,
};

/* 헤더 */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
};

const headerLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const logoStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '15px',
  background: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '24px',
  flexShrink: 0,
};

const smallHeaderStyle = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#334155',
};

const mainTitleStyle = {
  margin: '1px 0 0',
  fontSize: '25px',
  lineHeight: 1.2,
  color: '#0f172a',
  fontWeight: 900,
};

const headerSubStyle = {
  margin: '4px 0 0',
  fontSize: '12px',
  color: '#64748b',
};

const customerBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '9px 12px',
  minWidth: '145px',
};

const customerIconStyle = {
  fontSize: '20px',
};

const customerNameStyle = {
  fontSize: '14px',
  fontWeight: 800,
  color: '#0f172a',
};

const customerInfoStyle = {
  marginTop: '2px',
  fontSize: '11px',
  color: '#64748b',
};

/* 공통 */

const sectionStyle = {
  marginTop: '12px',
};

const sectionTitleStyle = {
  margin: '0 0 7px',
  fontSize: '16px',
  color: '#0f172a',
  fontWeight: 900,
};

const bodyTextStyle = {
  fontSize: 13,
  lineHeight: 1.55,
  color: '#334155',
  margin: '0 0 8px',
};

/* 고객 정보 */

const customerInfoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '8px',
};

const infoItemStyle = {
  minHeight: '62px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px',
};

const infoIconStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '10px',
  background: '#eff6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
};

const infoLabelStyle = {
  fontSize: '11px',
  color: '#64748b',
};

const infoValueStyle = {
  marginTop: '3px',
  fontSize: '13px',
  color: '#0f172a',
  fontWeight: 800,
};

/* 위험도 분석 */

const analysisGridStyle = {
  display: 'grid',
  gridTemplateColumns: '0.95fr 1.05fr',
  gap: '12px',
};

const chartCardStyle = {
  border: '1px solid #dbeafe',
  background: '#f8fbff',
  borderRadius: '14px',
  padding: '12px',
};

const chartTitleStyle = {
  fontSize: '13px',
  fontWeight: 800,
  color: '#334155',
  marginBottom: '4px',
};

const chartAreaStyle = {
  height: '190px',
};

const chartLegendStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  marginTop: '3px',
  fontSize: '11px',
  color: '#64748b',
};

const legendDotBlueStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#2563eb',
};

const legendDotGreenStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: '#10b981',
};

/* 위험도 이유 */

const riskReasonCardStyle = {
  border: '1px solid #ede9fe',
  background: '#faf5ff',
  borderRadius: '14px',
  padding: '12px',
  overflow: 'hidden',
};

const riskReasonTitleStyle = {
  fontSize: '14px',
  fontWeight: 900,
  color: '#6d28d9',
  marginBottom: '7px',
};

const riskReasonListStyle = {
  display: 'grid',
  gap: '6px',
};

const riskReasonItemStyle = {
  paddingBottom: '6px',
  borderBottom: '1px solid #ede9fe',
};

const riskLevelStyle = {
  fontSize: '12px',
  fontWeight: 900,
};

const riskReasonTextStyle = {
  marginTop: '2px',
  fontSize: '11px',
  lineHeight: 1.45,
  color: '#475569',
};

/* 현재 보장 */

const coverageSectionStyle = {
  display: 'grid',
  gridTemplateColumns: '0.9fr 1.1fr',
  gap: '12px',
};

const coverageChartCardStyle = {
  border: '1px solid #d1fae5',
  background: '#f7fffb',
  borderRadius: '14px',
  padding: '10px 12px',
};

const chartAreaSmallStyle = {
  height: '150px',
};

const coverageAmountCardStyle = {
  border: '1px solid #e2e8f0',
  background: '#ffffff',
  borderRadius: '14px',
  padding: '12px',
};

const coverageAmountTitleStyle = {
  fontSize: '13px',
  fontWeight: 900,
  color: '#334155',
  marginBottom: '7px',
};

const coverageAmountListStyle = {
  display: 'grid',
  gap: '5px',
};

const coverageAmountRowStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: '25px',
  gap: '7px',
};

const coverageAmountDotStyle = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  flexShrink: 0,
};

const coverageAmountNameStyle = {
  flex: 1,
  fontSize: '12px',
  color: '#475569',
};

const coverageAmountValueStyle = {
  fontSize: '13px',
  fontWeight: 900,
  color: '#0f172a',
};

const coverageNoteStyle = {
  marginTop: '7px',
  paddingTop: '6px',
  borderTop: '1px solid #e2e8f0',
  fontSize: '10px',
  lineHeight: 1.4,
  color: '#94a3b8',
};

/* AI */

const aiBoxStyle = {
  marginTop: '12px',
  border: '1px solid #ddd6fe',
  background: '#faf5ff',
  borderRadius: '14px',
  padding: '12px 14px',
};

const aiHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const aiIconStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '10px',
  background: '#ede9fe',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '17px',
};

const aiTitleStyle = {
  fontSize: '14px',
  fontWeight: 900,
  color: '#6d28d9',
};

const aiSubTitleStyle = {
  marginTop: '2px',
  fontSize: '10px',
  color: '#8b5cf6',
};

const aiTextStyle = {
  margin: '8px 0 0',
  fontSize: '12px',
  lineHeight: 1.55,
  color: '#334155',
};

/* 하단 메시지 */

const bottomMessageStyle = {
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  padding: '9px 12px',
  borderRadius: '12px',
  background: '#fffbeb',
  border: '1px solid #fde68a',
};

const bottomMessageIconStyle = {
  fontSize: '22px',
};

const bottomMessageTitleStyle = {
  fontSize: '10px',
  color: '#475569',
};

const bottomMessageStrongStyle = {
  marginTop: '2px',
  fontSize: '12px',
  fontWeight: 900,
  color: '#0f172a',
};

/* 페이지 이동 */

const pageNavigationStyle = {
  marginTop: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '6px',
  paddingTop: '8px',
};

const pageButtonStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  border: '1px solid #dbe3f0',
  background: '#ffffff',
  color: '#64748b',
  fontSize: '12px',
  fontWeight: 800,
  cursor: 'pointer',
};

const activePageButtonStyle = {
  background: '#2563eb',
  border: '1px solid #2563eb',
  color: '#ffffff',
};

/* footer */

const footerStyle = {
  marginTop: '6px',
  paddingTop: '7px',
  borderTop: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#64748b',
  fontSize: '10px',
};
