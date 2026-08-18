'use client';

import { useEffect, useMemo, useState } from 'react';
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
========================================================= */

type CustomerInfo = {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  spouse: string;
  children: string;
  familyHistory: string;
};

/* =========================================================
   보장 데이터
========================================================= */

type CoverageData = {
  cancer: number;
  brain: number;
  heart: number;
  surgery: number;
  accident: number;
};

/* =========================================================
   위험도 데이터
========================================================= */

const riskData = {
  cancer: 90,
  brain: 78,
  heart: 68,
  surgery: 52,
  accident: 32,
};

/* =========================================================
   권장 보장금액
   실제 서비스에서는 추후 AI 추천금액 / 설계사 추천금액과 연결
========================================================= */

const recommendedCoverage = {
  cancer: 5000,
  brain: 3000,
  heart: 3000,
  surgery: 1000,
  accident: 1000,
};

/* =========================================================
   기본 현재 가입금액
   보장분석 페이지에서 저장된 데이터가 있으면 그것을 사용
========================================================= */

const defaultCoverage: CoverageData = {
  cancer: 3000,
  brain: 1000,
  heart: 1000,
  surgery: 500,
  accident: 300,
};

/* =========================================================
   스타일
========================================================= */

const mainStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#eef3f9',
  padding: '20px',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
  color: '#0f172a',
};

const topBarStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '210mm',
  margin: '0 auto 14px',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: 10,
};

const leftButtonsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 8,
};

const centerButtonsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};

const rightButtonsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
};

const buttonStyle: React.CSSProperties = {
  border: '1px solid #dbe3ef',
  background: '#ffffff',
  color: '#334155',
  borderRadius: 10,
  padding: '9px 13px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const mainButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#2563eb',
  borderColor: '#2563eb',
  color: '#ffffff',
};

const pdfButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#f8fafc',
};

const printButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#0f172a',
  color: '#ffffff',
  borderColor: '#0f172a',
};

const pageStyle: React.CSSProperties = {
  width: '210mm',
  height: '297mm',
  maxWidth: '100%',
  margin: '0 auto',
  background: '#ffffff',
  boxSizing: 'border-box',
  padding: '9mm',
  overflow: 'hidden',
  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.10)',
};

const pageHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 12,
};

const logoAreaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
};

const logoStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 12,
  background: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: 22,
  flexShrink: 0,
};

const smallTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: '#2563eb',
  marginBottom: 2,
};

const mainTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  lineHeight: 1.2,
  fontWeight: 900,
  color: '#0f172a',
};

const headerDescriptionStyle: React.CSSProperties = {
  margin: '4px 0 0',
  fontSize: 11,
  color: '#64748b',
};

const customerBoxStyle: React.CSSProperties = {
  minWidth: 170,
  background: '#f5f8ff',
  border: '1px solid #e0e9ff',
  borderRadius: 12,
  padding: '9px 12px',
};

const customerNameStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
  color: '#0f172a',
};

const customerMetaStyle: React.CSSProperties = {
  marginTop: 3,
  fontSize: 10,
  color: '#64748b',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 900,
  color: '#0f172a',
};

const sectionTitleWrapStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  marginBottom: 7,
};

const blueBarStyle: React.CSSProperties = {
  width: 4,
  height: 18,
  borderRadius: 4,
  background: '#2563eb',
};

const customerInfoStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  border: '1px solid #dbe5f5',
  borderRadius: 12,
  overflow: 'hidden',
  background: '#ffffff',
};

const infoItemStyle: React.CSSProperties = {
  padding: '8px 7px',
  textAlign: 'center',
  borderRight: '1px solid #e5eaf2',
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: 9,
  color: '#64748b',
  marginBottom: 4,
};

const infoValueStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: '#0f172a',
};

const analysisSectionStyle: React.CSSProperties = {
  marginTop: 12,
};

const analysisGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  gap: 10,
  alignItems: 'stretch',
};

const chartCardStyle: React.CSSProperties = {
  border: '1px solid #dbe5f5',
  borderRadius: 14,
  padding: 10,
  background: '#ffffff',
  minHeight: 305,
  boxSizing: 'border-box',
};

const chartTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: '#334155',
  marginBottom: 4,
};

const explanationCardStyle: React.CSSProperties = {
  borderRadius: 14,
  background: '#faf5ff',
  border: '1px solid #eadcff',
  padding: 13,
  minHeight: 305,
  boxSizing: 'border-box',
};

const explanationTitleStyle: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 14,
  fontWeight: 900,
  color: '#6d28d9',
};

const explanationItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: 7,
  marginBottom: 8,
  alignItems: 'flex-start',
};

const explanationIconStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: '50%',
  background: '#7c3aed',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 10,
  fontWeight: 900,
  flexShrink: 0,
};

const explanationTextStyle: React.CSSProperties = {
  fontSize: 10.5,
  lineHeight: 1.45,
  color: '#334155',
};

const coverageSummaryStyle: React.CSSProperties = {
  marginTop: 9,
  borderTop: '1px solid #e2e8f0',
  paddingTop: 8,
};

const coverageSummaryTitleStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  color: '#334155',
  marginBottom: 5,
};

const coverageSummaryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 5,
};

const coverageMiniStyle: React.CSSProperties = {
  borderRadius: 8,
  background: '#f8fafc',
  padding: '5px 4px',
  textAlign: 'center',
};

const coverageMiniLabelStyle: React.CSSProperties = {
  fontSize: 8,
  color: '#64748b',
};

const coverageMiniValueStyle: React.CSSProperties = {
  marginTop: 2,
  fontSize: 9.5,
  fontWeight: 900,
  color: '#0f172a',
};

const aiBoxStyle: React.CSSProperties = {
  marginTop: 10,
  borderRadius: 14,
  background: '#fff7ed',
  border: '1px solid #fed7aa',
  padding: '10px 12px',
};

const aiTitleStyle: React.CSSProperties = {
  margin: '0 0 5px',
  fontSize: 12,
  fontWeight: 900,
  color: '#c2410c',
};

const aiTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 10.5,
  lineHeight: 1.5,
  color: '#475569',
};

const conclusionStyle: React.CSSProperties = {
  marginTop: 10,
  borderRadius: 12,
  background: '#eff6ff',
  border: '1px solid #bfdbfe',
  padding: '9px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: 9,
};

const conclusionIconStyle: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 9,
  background: '#2563eb',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
};

const conclusionTextStyle: React.CSSProperties = {
  fontSize: 10.5,
  lineHeight: 1.45,
  color: '#1e3a8a',
};

const bottomNavStyle: React.CSSProperties = {
  marginTop: 8,
  display: 'flex',
  justifyContent: 'center',
  gap: 6,
};

const pageNavButtonStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: '1px solid #dbe3ef',
  background: '#ffffff',
  color: '#64748b',
  cursor: 'pointer',
  fontSize: 11,
  fontWeight: 800,
};

const activePageNavStyle: React.CSSProperties = {
  ...pageNavButtonStyle,
  background: '#2563eb',
  borderColor: '#2563eb',
  color: '#ffffff',
};

const footerStyle: React.CSSProperties = {
  marginTop: 6,
  display: 'flex',
  justifyContent: 'space-between',
  color: '#94a3b8',
  fontSize: 8.5,
};

/* =========================================================
   숫자 포맷
========================================================= */

function formatMoney(value: number) {
  if (!value) return '0만원';
  return `${value.toLocaleString()}만원`;
}

/* =========================================================
   메인
========================================================= */

export default function ProposalPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '김민수',
    age: 38,
    gender: '남성',
    occupation: '사무직',
    spouse: '배우자',
    children: '자녀 2명',
    familyHistory: '위암(父), 고혈압(母)',
  });

  const [coverage, setCoverage] =
    useState<CoverageData>(defaultCoverage);

  /* =======================================================
     보장분석 페이지에서 저장한 데이터를 가져옴
  ======================================================= */

  useEffect(() => {
    try {
      const savedCustomer =
        localStorage.getItem('lifecare_customer');

      const savedCoverage =
        localStorage.getItem('lifecare_coverage');

      if (savedCustomer) {
        const parsed = JSON.parse(savedCustomer);

        setCustomer((prev) => ({
          ...prev,
          ...parsed,
        }));
      }

      if (savedCoverage) {
        const parsed = JSON.parse(savedCoverage);

        setCoverage((prev) => ({
          ...prev,
          ...parsed,
        }));
      }
    } catch (error) {
      console.error('저장된 고객 데이터를 불러오지 못했습니다.', error);
    }
  }, []);

  /* =======================================================
     그래프 데이터
  ======================================================= */

  const labels = useMemo(() => {
    return [
      `암\n(${formatMoney(coverage.cancer)})`,
      `뇌혈관\n(${formatMoney(coverage.brain)})`,
      `심장질환\n(${formatMoney(coverage.heart)})`,
      `수술비\n(${formatMoney(coverage.surgery)})`,
      `상해\n(${formatMoney(coverage.accident)})`,
    ];
  }, [coverage]);

  /*
    현재 가입금액을 목표금액 대비 %로 환산.
    예:
    암 3,000만원 / 목표 5,000만원 = 60
  */

  const coverageLevel = {
    cancer: Math.min(
      100,
      (coverage.cancer / recommendedCoverage.cancer) * 100
    ),
    brain: Math.min(
      100,
      (coverage.brain / recommendedCoverage.brain) * 100
    ),
    heart: Math.min(
      100,
      (coverage.heart / recommendedCoverage.heart) * 100
    ),
    surgery: Math.min(
      100,
      (coverage.surgery / recommendedCoverage.surgery) * 100
    ),
    accident: Math.min(
      100,
      (coverage.accident / recommendedCoverage.accident) * 100
    ),
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: '예상 위험도',
        data: [
          riskData.cancer,
          riskData.brain,
          riskData.heart,
          riskData.surgery,
          riskData.accident,
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.16)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointRadius: 3,
      },
      {
        label: '현재 보장 수준',
        data: [
          coverageLevel.cancer,
          coverageLevel.brain,
          coverageLevel.heart,
          coverageLevel.surgery,
          coverageLevel.accident,
        ],
        backgroundColor: 'rgba(234, 88, 12, 0.12)',
        borderColor: '#ea580c',
        borderWidth: 2,
        pointBackgroundColor: '#ea580c',
        pointBorderColor: '#ffffff',
        pointRadius: 3,
      },
    ],
  };

  /*
    Chart.js 타입 문제를 피하기 위해 any 사용.
    이전에 발생했던 weight: "600" 타입 오류도 방지.
  */

  const radarOptions: any = {
    responsive: true,
    maintainAspectRatio: false,

    animation: false,

    scales: {
      r: {
        min: 0,
        max: 100,

        ticks: {
          display: false,
          stepSize: 20,
        },

        grid: {
          color: '#dbe5f5',
        },

        angleLines: {
          color: '#dbe5f5',
        },

        pointLabels: {
          color: '#334155',

          font: {
            size: 9,
            weight: 'bold',
          },
        },
      },
    },

    plugins: {
      legend: {
        display: true,

        position: 'bottom',

        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 10,
          font: {
            size: 9,
          },
        },
      },

      tooltip: {
        enabled: true,

        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;

            const currentAmounts = [
              coverage.cancer,
              coverage.brain,
              coverage.heart,
              coverage.surgery,
              coverage.accident,
            ];

            if (context.datasetIndex === 0) {
              return ` 위험도: ${context.raw}%`;
            }

            return ` 현재 보장: ${formatMoney(
              currentAmounts[index]
            )} / 목표 ${formatMoney(
              [
                recommendedCoverage.cancer,
                recommendedCoverage.brain,
                recommendedCoverage.heart,
                recommendedCoverage.surgery,
                recommendedCoverage.accident,
              ][index]
            )}`;
          },
        },
      },
    },
  };

  /* =======================================================
     위험도 설명
  ======================================================= */

  const explanations = [
    {
      title: '암 위험도 매우 높음',
      text: `현재 ${formatMoney(
        coverage.cancer
      )}의 암 보장이 있으나, 가족력과 연령을 고려하면 경제적 손실 가능성이 커 충분한 진단자금 확보가 중요합니다.`,
    },
    {
      title: '뇌혈관 위험도 높음',
      text: `${customer.age}세 전후부터 뇌혈관 질환에 대한 관심이 커지는 시기이며, 현재 보장 수준이 목표 보장 대비 부족한 것으로 분석됩니다.`,
    },
    {
      title: '심장질환 위험도 높음',
      text: '허혈성 심장질환과 심근경색은 치료비뿐 아니라 소득 공백까지 고려해야 하므로 진단자금 확보가 중요합니다.',
    },
    {
      title: '수술비 위험도 중간',
      text: '수술은 반복적으로 발생할 가능성이 있어 진단비와 별도로 실제 치료 과정에서 활용할 수 있는 수술비를 함께 검토할 필요가 있습니다.',
    },
    {
      title: '상해 위험도 낮음',
      text: '현재 고객의 직업 및 생활환경을 고려하면 상대적으로 낮게 분석되지만, 사고에 대한 기본적인 보장은 유지하는 것이 좋습니다.',
    },
  ];

  /* =======================================================
     AI 분석 코멘트
  ======================================================= */

  const aiComment = `
고객님의 현재 연령과 직업, 가족구성 및 가족력을 종합적으로 고려했을 때
암과 뇌혈관·심장질환에 대한 보장을 우선적으로 점검할 필요가 있습니다.

현재 가입되어 있는 보장과 예상 위험도를 함께 비교해보면 일부 보장은
위험도에 비해 상대적으로 부족한 부분이 확인됩니다.

따라서 기존 보험을 무조건 추가하기보다는 현재 가입되어 있는 보험을
먼저 정리하고 부족한 영역을 우선적으로 보완하는 방식이 효율적입니다.
  `.trim();

  /* =======================================================
     페이지 이동
  ======================================================= */

  const goPage = (page: number) => {
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

  /* =======================================================
     PDF 저장
  ======================================================= */

  const savePDF = () => {
    window.print();
  };

  return (
    <>
      <main style={mainStyle}>
        {/* =================================================
            화면용 버튼
            인쇄할 때는 모두 숨김
        ================================================= */}

        <div className="no-print" style={topBarStyle}>
          <div style={leftButtonsStyle}>
            <button
              style={buttonStyle}
              onClick={() => router.push('/new/coverage')}
            >
              🛡️ 보장분석
            </button>
          </div>

          <div style={centerButtonsStyle}>
            <button
              style={mainButtonStyle}
              onClick={() => router.push('/')}
            >
              🏠 메인
            </button>
          </div>

          <div style={rightButtonsStyle}>
            <button
              style={pdfButtonStyle}
              onClick={savePDF}
            >
              📄 PDF 저장
            </button>

            <button
              style={printButtonStyle}
              onClick={() => window.print()}
            >
              🖨️ 인쇄
            </button>
          </div>
        </div>

        {/* =================================================
            A4 페이지
        ================================================= */}

        <section style={pageStyle}>
          {/* HEADER */}

          <div style={pageHeaderStyle}>
            <div style={logoAreaStyle}>
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

            <div style={customerBoxStyle}>
              <div style={customerNameStyle}>
                {customer.name || '고객님'}
              </div>

              <div style={customerMetaStyle}>
                {customer.age}세 · {customer.gender}
              </div>
            </div>
          </div>

          {/* 고객 인적사항 */}

          <div>
            <div style={sectionTitleWrapStyle}>
              <div style={blueBarStyle} />

              <h2 style={sectionTitleStyle}>
                고객 인적사항 및 가족 현황
              </h2>
            </div>

            <div style={customerInfoStyle}>
              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>
                  연령
                </div>

                <div style={infoValueStyle}>
                  {customer.age}세
                </div>
              </div>

              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>
                  성별
                </div>

                <div style={infoValueStyle}>
                  {customer.gender}
                </div>
              </div>

              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>
                  직업
                </div>

                <div style={infoValueStyle}>
                  {customer.occupation}
                </div>
              </div>

              <div style={infoItemStyle}>
                <div style={infoLabelStyle}>
                  가족사항
                </div>

                <div style={infoValueStyle}>
                  {customer.spouse || '없음'}
                  {customer.children
                    ? ` · ${customer.children}`
                    : ''}
                </div>
              </div>

              <div
                style={{
                  ...infoItemStyle,
                  borderRight: 'none',
                }}
              >
                <div style={infoLabelStyle}>
                  가족력
                </div>

                <div style={infoValueStyle}>
                  {customer.familyHistory || '특이사항 없음'}
                </div>
              </div>
            </div>
          </div>

          {/* 주요 보장 위험도 분석 */}

          <div style={analysisSectionStyle}>
            <div style={sectionTitleWrapStyle}>
              <div style={blueBarStyle} />

              <h2 style={sectionTitleStyle}>
                주요 보장 위험도 분석
              </h2>
            </div>

            <div style={analysisGridStyle}>
              {/* 그래프 */}

              <div style={chartCardStyle}>
                <div style={chartTitleStyle}>
                  위험도와 현재 가입 보장을 한눈에 비교
                </div>

                <div
                  style={{
                    height: 245,
                    position: 'relative',
                  }}
                >
                  <Radar
                    data={radarData}
                    options={radarOptions}
                  />
                </div>
              </div>

              {/* 설명 */}

              <div style={explanationCardStyle}>
                <h3 style={explanationTitleStyle}>
                  💡 왜 이렇게 판단했을까요?
                </h3>

                {explanations.map((item, index) => (
                  <div
                    key={index}
                    style={explanationItemStyle}
                  >
                    <span style={explanationIconStyle}>
                      ✓
                    </span>

                    <div style={explanationTextStyle}>
                      <strong>{item.title}</strong>
                      <br />
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 현재 가입금액 요약 */}

            <div style={coverageSummaryStyle}>
              <div style={coverageSummaryTitleStyle}>
                현재 가입 보장금액
              </div>

              <div style={coverageSummaryGridStyle}>
                <div style={coverageMiniStyle}>
                  <div style={coverageMiniLabelStyle}>
                    암
                  </div>

                  <div style={coverageMiniValueStyle}>
                    {formatMoney(coverage.cancer)}
                  </div>
                </div>

                <div style={coverageMiniStyle}>
                  <div style={coverageMiniLabelStyle}>
                    뇌혈관
                  </div>

                  <div style={coverageMiniValueStyle}>
                    {formatMoney(coverage.brain)}
                  </div>
                </div>

                <div style={coverageMiniStyle}>
                  <div style={coverageMiniLabelStyle}>
                    심장
                  </div>

                  <div style={coverageMiniValueStyle}>
                    {formatMoney(coverage.heart)}
                  </div>
                </div>

                <div style={coverageMiniStyle}>
                  <div style={coverageMiniLabelStyle}>
                    수술비
                  </div>

                  <div style={coverageMiniValueStyle}>
                    {formatMoney(coverage.surgery)}
                  </div>
                </div>

                <div style={coverageMiniStyle}>
                  <div style={coverageMiniLabelStyle}>
                    상해
                  </div>

                  <div style={coverageMiniValueStyle}>
                    {formatMoney(coverage.accident)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI 분석 코멘트 */}

          <div style={aiBoxStyle}>
            <h3 style={aiTitleStyle}>
              🤖 AI 종합 분석 코멘트
            </h3>

            <p style={aiTextStyle}>
              {aiComment}
            </p>
          </div>

          {/* 최종 한줄 */}

          <div style={conclusionStyle}>
            <div style={conclusionIconStyle}>
              🎯
            </div>

            <div style={conclusionTextStyle}>
              <strong>
                고객님에게는 모든 보장을 다 넣는 것보다,
                현재 위험도와 부족한 보장을 확인하고
                우선순위를 정해 준비하는 것이 중요합니다.
              </strong>
            </div>
          </div>

          {/* 페이지 이동 */}

          <div
            className="no-print"
            style={bottomNavStyle}
          >
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                onClick={() => goPage(page)}
                style={
                  page === 1
                    ? activePageNavStyle
                    : pageNavButtonStyle
                }
              >
                {page}
              </button>
            ))}
          </div>

          {/* Footer */}

          <div style={footerStyle}>
            <span>LifeCare Insight</span>

            <span>
              1 / 4 · 상담용 제안서
            </span>
          </div>
        </section>
      </main>

      {/* =====================================================
          인쇄 전용 CSS
      ===================================================== */}

      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          main {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          section {
            width: 210mm !important;
            height: 297mm !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 9mm !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }

          button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
