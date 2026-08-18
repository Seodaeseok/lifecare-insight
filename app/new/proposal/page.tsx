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
  type ChartOptions,
  type ChartData,
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
   타입
========================================================= */

type CustomerData = {
  name: string;
  birthDate: string;
  age: number;
  gender: string;
  occupation: string;
  spouse: string;
  children: string;
  familyHistory: string;
  driving: string;
};

type CoverageItem = {
  current: number;
  recommended: number;
};

type CoverageData = {
  cancer: CoverageItem;
  brain: CoverageItem;
  heart: CoverageItem;
  surgery: CoverageItem;
  longTermCare: CoverageItem;
};

/* =========================================================
   기본 고객 데이터
   실제 데이터가 연결되지 않았을 때 사용하는 예시값
========================================================= */

const DEFAULT_CUSTOMER: CustomerData = {
  name: '김민수',
  birthDate: '1987-05-14',
  age: 38,
  gender: '남성',
  occupation: '사무직',
  spouse: '배우자 있음',
  children: '자녀 2명',
  familyHistory: '위암(모), 고혈압(부)',
  driving: '자가용 운전',
};

/* =========================================================
   기본 보장 데이터
   금액 단위: 만원
========================================================= */

const DEFAULT_COVERAGE: CoverageData = {
  cancer: {
    current: 3000,
    recommended: 5000,
  },

  brain: {
    current: 1000,
    recommended: 3000,
  },

  heart: {
    current: 1000,
    recommended: 3000,
  },

  surgery: {
    current: 100,
    recommended: 300,
  },

  longTermCare: {
    current: 0,
    recommended: 2000,
  },
};

/* =========================================================
   localStorage 안전하게 읽기
========================================================= */

function readStorageObject(keys: string[]) {
  if (typeof window === 'undefined') {
    return null;
  }

  for (const key of keys) {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) continue;

      const parsed = JSON.parse(raw);

      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      // 잘못된 JSON은 무시
    }
  }

  return null;
}

/* =========================================================
   고객 데이터 정규화
========================================================= */

function loadCustomerData(): CustomerData {
  const stored = readStorageObject([
    'lifecareCustomer',
    'customerData',
    'customer',
    'newCustomer',
  ]);

  if (!stored) {
    return DEFAULT_CUSTOMER;
  }

  return {
    name:
      stored.name ??
      stored.customerName ??
      DEFAULT_CUSTOMER.name,

    birthDate:
      stored.birthDate ??
      stored.dob ??
      DEFAULT_CUSTOMER.birthDate,

    age:
      Number(stored.age ?? stored.insuranceAge) ||
      DEFAULT_CUSTOMER.age,

    gender:
      stored.gender ??
      DEFAULT_CUSTOMER.gender,

    occupation:
      stored.occupation ??
      stored.job ??
      DEFAULT_CUSTOMER.occupation,

    spouse:
      stored.spouse ??
      stored.spouseInfo ??
      DEFAULT_CUSTOMER.spouse,

    children:
      stored.children ??
      stored.childInfo ??
      DEFAULT_CUSTOMER.children,

    familyHistory:
      stored.familyHistory ??
      stored.familyMedicalHistory ??
      DEFAULT_CUSTOMER.familyHistory,

    driving:
      stored.driving ??
      stored.drivingStatus ??
      DEFAULT_CUSTOMER.driving,
  };
}

/* =========================================================
   보장 데이터 정규화
========================================================= */

function loadCoverageData(): CoverageData {
  const stored = readStorageObject([
    'coverageAnalysis',
    'coverageData',
    'coverage',
    'insuranceCoverage',
  ]);

  if (!stored) {
    return DEFAULT_COVERAGE;
  }

  return {
    cancer: {
      current:
        Number(
          stored.cancer?.current ??
            stored.cancer?.generalCancer ??
            stored.generalCancer
        ) || DEFAULT_COVERAGE.cancer.current,

      recommended:
        Number(
          stored.cancer?.recommended ??
            stored.cancer?.recommend
        ) || DEFAULT_COVERAGE.cancer.recommended,
    },

    brain: {
      current:
        Number(
          stored.brain?.current ??
            stored.brain?.cerebral ??
            stored.brainBloodVessel
        ) || DEFAULT_COVERAGE.brain.current,

      recommended:
        Number(
          stored.brain?.recommended ??
            stored.brain?.recommend
        ) || DEFAULT_COVERAGE.brain.recommended,
    },

    heart: {
      current:
        Number(
          stored.heart?.current ??
            stored.heart?.ischemic ??
            stored.ischemicHeart
        ) || DEFAULT_COVERAGE.heart.current,

      recommended:
        Number(
          stored.heart?.recommended ??
            stored.heart?.recommend
        ) || DEFAULT_COVERAGE.heart.recommended,
    },

    surgery: {
      current:
        Number(
          stored.surgery?.current ??
            stored.surgery?.diseaseSurgery ??
            stored.diseaseSurgery
        ) || DEFAULT_COVERAGE.surgery.current,

      recommended:
        Number(
          stored.surgery?.recommended ??
            stored.surgery?.recommend
        ) || DEFAULT_COVERAGE.surgery.recommended,
    },

    longTermCare: {
      current:
        Number(
          stored.longTermCare?.current ??
            stored.care?.current ??
            stored.dementia
        ) || DEFAULT_COVERAGE.longTermCare.current,

      recommended:
        Number(
          stored.longTermCare?.recommended ??
            stored.care?.recommended ??
            stored.care?.recommend
        ) || DEFAULT_COVERAGE.longTermCare.recommended,
    },
  };
}

/* =========================================================
   금액 표시
========================================================= */

function formatManWon(value: number) {
  if (!value) {
    return '0만원';
  }

  return `${value.toLocaleString('ko-KR')}만원`;
}

/* =========================================================
   위험도 계산
========================================================= */

function getRiskLevel(score: number) {
  if (score >= 80) {
    return {
      label: '매우 높음',
      color: '#dc2626',
      bg: '#fee2e2',
    };
  }

  if (score >= 65) {
    return {
      label: '높음',
      color: '#ea580c',
      bg: '#ffedd5',
    };
  }

  if (score >= 45) {
    return {
      label: '보통',
      color: '#2563eb',
      bg: '#dbeafe',
    };
  }

  return {
    label: '낮음',
    color: '#16a34a',
    bg: '#dcfce7',
  };
}

/* =========================================================
   위험도 분석
========================================================= */

function calculateRisk(
  category:
    | 'cancer'
    | 'brain'
    | 'heart'
    | 'surgery'
    | 'longTermCare',
  customer: CustomerData,
  coverage: CoverageData
) {
  let score = 45;

  /* 나이 */

  if (customer.age >= 60) {
    score += 20;
  } else if (customer.age >= 50) {
    score += 15;
  } else if (customer.age >= 40) {
    score += 10;
  } else if (customer.age >= 30) {
    score += 5;
  }

  /* 가족력 */

  const familyHistory = customer.familyHistory.toLowerCase();

  if (category === 'cancer') {
    if (
      familyHistory.includes('암') ||
      familyHistory.includes('위암') ||
      familyHistory.includes('대장암') ||
      familyHistory.includes('폐암') ||
      familyHistory.includes('유방암')
    ) {
      score += 25;
    }
  }

  if (category === 'brain') {
    if (
      familyHistory.includes('뇌') ||
      familyHistory.includes('뇌졸중') ||
      familyHistory.includes('고혈압')
    ) {
      score += 20;
    }
  }

  if (category === 'heart') {
    if (
      familyHistory.includes('심장') ||
      familyHistory.includes('심근경색') ||
      familyHistory.includes('고혈압') ||
      familyHistory.includes('당뇨')
    ) {
      score += 20;
    }
  }

  if (category === 'longTermCare') {
    if (
      familyHistory.includes('치매') ||
      familyHistory.includes('간병')
    ) {
      score += 25;
    }
  }

  /* 직업 */

  const occupation = customer.occupation;

  if (
    occupation.includes('현장') ||
    occupation.includes('건설') ||
    occupation.includes('생산') ||
    occupation.includes('운전')
  ) {
    if (category === 'surgery') {
      score += 15;
    }
  }

  /* 현재 가입금액 */

  const item = coverage[category];

  if (item.recommended > 0) {
    const coverageRatio =
      item.current / item.recommended;

    if (coverageRatio < 0.3) {
      score += 20;
    } else if (coverageRatio < 0.6) {
      score += 10;
    } else if (coverageRatio >= 1) {
      score -= 10;
    }
  }

  score = Math.max(10, Math.min(100, score));

  return score;
}

/* =========================================================
   위험도 설명
========================================================= */

function getRiskReason(
  category:
    | 'cancer'
    | 'brain'
    | 'heart'
    | 'surgery'
    | 'longTermCare',
  customer: CustomerData,
  coverage: CoverageData,
  score: number
) {
  const reasons: string[] = [];

  if (customer.age >= 40) {
    reasons.push('연령 증가에 따른 주요 질환 위험 증가');
  }

  if (
    customer.familyHistory &&
    customer.familyHistory !== '없음'
  ) {
    if (category === 'cancer' &&
        customer.familyHistory.includes('암')) {
      reasons.push('가족력에서 암 관련 위험 확인');
    }

    if (
      category === 'brain' &&
      (
        customer.familyHistory.includes('뇌') ||
        customer.familyHistory.includes('고혈압')
      )
    ) {
      reasons.push('뇌혈관 관련 가족력 또는 위험요인 확인');
    }

    if (
      category === 'heart' &&
      (
        customer.familyHistory.includes('심장') ||
        customer.familyHistory.includes('고혈압') ||
        customer.familyHistory.includes('당뇨')
      )
    ) {
      reasons.push('심혈관 관련 가족력 또는 위험요인 확인');
    }
  }

  const item = coverage[category];

  if (
    item.recommended > 0 &&
    item.current / item.recommended < 0.6
  ) {
    reasons.push(
      `현재 가입금액 ${formatManWon(item.current)}으로 권장수준 대비 부족`
    );
  }

  if (
    category === 'surgery' &&
    (
      customer.occupation.includes('운전') ||
      customer.occupation.includes('현장') ||
      customer.occupation.includes('생산')
    )
  ) {
    reasons.push('직업 특성상 상해·수술 위험 고려');
  }

  if (reasons.length === 0) {
    reasons.push('현재 연령 및 가입보장을 종합적으로 고려');
  }

  if (score >= 80) {
    return `현재 ${reasons.slice(0, 3).join(', ')} 등의 요인을 종합하면 위험도가 매우 높은 영역으로 판단됩니다.`;
  }

  if (score >= 65) {
    return `현재 ${reasons.slice(0, 3).join(', ')} 등의 요인을 고려하면 보완이 필요한 영역입니다.`;
  }

  if (score >= 45) {
    return `현재 ${reasons.slice(0, 2).join(', ')} 등을 고려할 때 기본적인 대비는 되어 있으나 지속적인 점검이 필요합니다.`;
  }

  return `현재 가입상태와 고객님의 조건을 종합하면 상대적으로 위험도가 낮은 영역입니다.`;
}

/* =========================================================
   페이지
========================================================= */

export default function ProposalPage() {
  const router = useRouter();

  const [customer, setCustomer] =
    useState<CustomerData>(DEFAULT_CUSTOMER);

  const [coverage, setCoverage] =
    useState<CoverageData>(DEFAULT_COVERAGE);

  useEffect(() => {
    setCustomer(loadCustomerData());
    setCoverage(loadCoverageData());
  }, []);

  /* =======================================================
     위험도
  ======================================================= */

  const risks = useMemo(() => {
    return {
      cancer: calculateRisk(
        'cancer',
        customer,
        coverage
      ),

      brain: calculateRisk(
        'brain',
        customer,
        coverage
      ),

      heart: calculateRisk(
        'heart',
        customer,
        coverage
      ),

      surgery: calculateRisk(
        'surgery',
        customer,
        coverage
      ),

      longTermCare: calculateRisk(
        'longTermCare',
        customer,
        coverage
      ),
    };
  }, [customer, coverage]);

  /* =======================================================
     레이더 차트
     
     위험도와 현재 가입수준을 같은 0~100 기준으로 표현.
     현재 가입수준은 권장금액 대비 가입비율.
     
     실제 가입금액은 툴팁에 표시.
  ======================================================= */

  const radarData: ChartData<'radar'> = {
    labels: [
      '암',
      '뇌혈관',
      '심장질환',
      '수술',
      '간병·치매',
    ],

    datasets: [
      {
        label: '질병 위험도',
        data: [
          risks.cancer,
          risks.brain,
          risks.heart,
          risks.surgery,
          risks.longTermCare,
        ],
        backgroundColor: 'rgba(239,68,68,0.13)',
        borderColor: '#ef4444',
        borderWidth: 2,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
      },

      {
        label: '현재 가입수준',
        data: [
          Math.min(
            100,
            (coverage.cancer.current /
              coverage.cancer.recommended) *
              100
          ),

          Math.min(
            100,
            (coverage.brain.current /
              coverage.brain.recommended) *
              100
          ),

          Math.min(
            100,
            (coverage.heart.current /
              coverage.heart.recommended) *
              100
          ),

          Math.min(
            100,
            (coverage.surgery.current /
              coverage.surgery.recommended) *
              100
          ),

          Math.min(
            100,
            (coverage.longTermCare.current /
              coverage.longTermCare.recommended) *
              100
          ),
        ],

        backgroundColor: 'rgba(37,99,235,0.16)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const radarOptions: ChartOptions<'radar'> = {
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
          color: '#e2e8f0',
        },

        angleLines: {
          color: '#e2e8f0',
        },

        pointLabels: {
          color: '#334155',

          font: {
            size: 10,
            weight: 600,
          },
        },
      },
    },

    plugins: {
      legend: {
        position: 'bottom',

        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 10,
          },
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;

            const names = [
              '암',
              '뇌혈관',
              '심장질환',
              '수술',
              '간병·치매',
            ];

            const coverageItems = [
              coverage.cancer,
              coverage.brain,
              coverage.heart,
              coverage.surgery,
              coverage.longTermCare,
            ];

            const item = coverageItems[index];

            if (context.datasetIndex === 0) {
              return ` 위험도 ${context.raw}%`;
            }

            return ` 현재 가입 ${formatManWon(
              item.current
            )} / 권장 ${formatManWon(
              item.recommended
            )}`;
          },
        },
      },
    },
  };

  /* =======================================================
     AI 분석 코멘트
  ======================================================= */

  const aiComment = useMemo(() => {
    const highest = Math.max(
      risks.cancer,
      risks.brain,
      risks.heart,
      risks.surgery,
      risks.longTermCare
    );

    const comments: string[] = [];

    if (highest === risks.cancer) {
      comments.push(
        '암 관련 보장이 현재 고객님의 위험도에 비해 우선적으로 점검이 필요한 영역입니다.'
      );
    }

    if (highest === risks.brain) {
      comments.push(
        '뇌혈관 관련 위험과 현재 가입금액을 함께 고려할 때 보완 여부를 우선 검토할 필요가 있습니다.'
      );
    }

    if (highest === risks.heart) {
      comments.push(
        '심장질환 관련 위험도와 현재 가입 수준을 비교하면 추가적인 보장 검토가 필요합니다.'
      );
    }

    const insufficient = [
      coverage.cancer,
      coverage.brain,
      coverage.heart,
      coverage.surgery,
      coverage.longTermCare,
    ].filter(
      (item) =>
        item.recommended > 0 &&
        item.current / item.recommended < 0.6
    ).length;

    if (insufficient >= 2) {
      comments.push(
        '현재 가입된 보장 중 일부 핵심 영역이 권장 수준에 미치지 못하고 있어 우선순위를 정해 보완하는 방식이 효율적입니다.'
      );
    } else {
      comments.push(
        '전체적인 보장 구조를 유지하면서 부족한 영역을 중심으로 선택적으로 보완하는 방향이 적절합니다.'
      );
    }

    comments.push(
      '단순히 특약을 많이 추가하기보다 고객님의 연령, 직업, 가족력, 기존 가입금액을 함께 고려해 필요한 보장부터 준비하는 것이 중요합니다.'
    );

    return comments.slice(0, 3);
  }, [risks, coverage]);

  /* =======================================================
     분석 항목
  ======================================================= */

  const analysisItems = [
    {
      key: 'cancer' as const,
      title: '암',
      risk: risks.cancer,
    },

    {
      key: 'brain' as const,
      title: '뇌혈관',
      risk: risks.brain,
    },

    {
      key: 'heart' as const,
      title: '심장질환',
      risk: risks.heart,
    },

    {
      key: 'surgery' as const,
      title: '질병·상해 수술',
      risk: risks.surgery,
    },
  ];

  return (
    <main style={mainStyle}>
      {/* ===================================================
          상단 네비게이션
      =================================================== */}

      <div
        className="no-print"
        style={topBarStyle}
      >
        <button
          onClick={() =>
            router.push('/new/coverage')
          }
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

        <div style={rightButtonsStyle}>
          <button
            onClick={() => window.print()}
            style={actionButtonStyle}
          >
            📄 PDF 저장
          </button>

          <button
            onClick={() => window.print()}
            style={actionButtonStyle}
          >
            🖨️ 인쇄
          </button>
        </div>
      </div>

      {/* ===================================================
          A4 페이지
      =================================================== */}

      <section style={a4PageStyle}>
        {/* =================================================
            헤더
        ================================================= */}

        <div style={headerStyle}>
          <div style={logoCircleStyle}>
            🛡️
          </div>

          <div style={{ flex: 1 }}>
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

          <div style={customerMiniCardStyle}>
            <div style={customerNameStyle}>
              {customer.name}
            </div>

            <div style={customerMiniTextStyle}>
              {customer.age}세 · {customer.gender}
            </div>

            <div style={customerMiniTextStyle}>
              {customer.occupation}
            </div>
          </div>
        </div>

        {/* =================================================
            1. 고객 인적사항
        ================================================= */}

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            👤 고객 인적사항 및 가족 현황
          </h2>

          <div style={infoGridStyle}>
            <InfoItem
              icon="📅"
              label="연령"
              value={`${customer.age}세`}
            />

            <InfoItem
              icon="💼"
              label="직업"
              value={customer.occupation}
            />

            <InfoItem
              icon="👥"
              label="가족사항"
              value={`${customer.spouse}, ${customer.children}`}
            />

            <InfoItem
              icon="❤️"
              label="가족력"
              value={customer.familyHistory}
            />
          </div>
        </section>

        {/* =================================================
            2. 위험도 + 레이더
        ================================================= */}

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            📊 주요 보장 위험도 분석
          </h2>

          <div style={analysisGridStyle}>
            {/* 레이더 차트 */}

            <div style={chartCardStyle}>
              <div style={chartTitleStyle}>
                위험도와 현재 가입 수준 비교
              </div>

              <div style={chartDescriptionStyle}>
                고객님의 연령·직업·가족력과 현재 가입금액을 종합 분석했습니다.
              </div>

              <div style={chartWrapStyle}>
                <Radar
                  data={radarData}
                  options={radarOptions}
                />
              </div>

              <div style={chartLegendStyle}>
                <span>
                  <span
                    style={{
                      ...legendDotStyle,
                      background: '#ef4444',
                    }}
                  />
                  질병 위험도
                </span>

                <span>
                  <span
                    style={{
                      ...legendDotStyle,
                      background: '#2563eb',
                    }}
                  />
                  현재 가입수준
                </span>
              </div>

              <div style={coverageSummaryStyle}>
                <div style={summaryTitleStyle}>
                  현재 가입금액
                </div>

                <div style={summaryGridStyle}>
                  <CoverageSummary
                    label="암"
                    item={coverage.cancer}
                  />

                  <CoverageSummary
                    label="뇌혈관"
                    item={coverage.brain}
                  />

                  <CoverageSummary
                    label="심장"
                    item={coverage.heart}
                  />

                  <CoverageSummary
                    label="수술"
                    item={coverage.surgery}
                  />
                </div>
              </div>
            </div>

            {/* 위험도 설명 */}

            <div style={reasonCardStyle}>
              <h3 style={reasonTitleStyle}>
                💡 왜 이렇게 판단했을까요?
              </h3>

              <p style={reasonSubTitleStyle}>
                고객님의 정보를 종합해 보장별 위험도와 현재 가입상태를 함께 분석했습니다.
              </p>

              <div style={riskListStyle}>
                {analysisItems.map((item) => {
                  const riskInfo =
                    getRiskLevel(item.risk);

                  const reason =
                    getRiskReason(
                      item.key,
                      customer,
                      coverage,
                      item.risk
                    );

                  return (
                    <div
                      key={item.key}
                      style={riskItemStyle}
                    >
                      <div style={riskItemHeaderStyle}>
                        <strong>
                          {item.title}
                        </strong>

                        <span
                          style={{
                            ...riskBadgeStyle,
                            color: riskInfo.color,
                            background: riskInfo.bg,
                          }}
                        >
                          {riskInfo.label}
                        </span>
                      </div>

                      <p style={riskReasonStyle}>
                        {reason}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            3. AI 분석 코멘트
        ================================================= */}

        <section style={aiBoxStyle}>
          <div style={aiIconStyle}>
            🤖
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={aiTitleStyle}>
              AI 보장분석 코멘트
            </h2>

            <p style={aiSubTitleStyle}>
              고객님의 인적사항과 현재 보장 데이터를 종합한 분석입니다.
            </p>

            <div style={aiCommentListStyle}>
              {aiComment.map((comment, index) => (
                <div
                  key={index}
                  style={aiCommentItemStyle}
                >
                  <span style={checkStyle}>
                    ✓
                  </span>

                  <span>
                    {comment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            상담 핵심 메시지
        ================================================= */}

        <div style={bottomMessageStyle}>
          <div style={targetIconStyle}>
            🎯
          </div>

          <div>
            <strong style={bottomMessageTitleStyle}>
              고객님에게는 '모든 것을 다 넣는 것'보다
            </strong>

            <div style={bottomMessageTextStyle}>
              <strong>
                '가장 중요한 위험부터 순서대로 준비하는 것'
              </strong>
              이 더 현명합니다.
            </div>
          </div>
        </div>

        {/* =================================================
            하단 페이지 이동
        ================================================= */}

        <div className="no-print" style={pageNavigationStyle}>
          <button
            onClick={() =>
              router.push('/new/proposal')
            }
            style={{
              ...pageNumberStyle,
              ...activePageStyle,
            }}
          >
            1
          </button>

          <button
            onClick={() =>
              router.push('/new/priority')
            }
            style={pageNumberStyle}
          >
            2
          </button>

          <button
            onClick={() =>
              router.push('/new/plan')
            }
            style={pageNumberStyle}
          >
            3
          </button>

          <button
            onClick={() =>
              router.push('/new/trend')
            }
            style={pageNumberStyle}
          >
            4
          </button>
        </div>

        <div style={footerStyle}>
          <span>1 / 4</span>

          <span>
            LifeCare Insight · 상담용 제안서
          </span>
        </div>
      </section>

      {/* ===================================================
          인쇄용 CSS
      =================================================== */}

      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #f3f6fb;
        }

        * {
          box-sizing: border-box;
        }

        @media print {
          html,
          body {
            width: 210mm;
            height: 297mm;
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
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
            padding: 7mm !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   고객정보 아이템
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
   보장금액 요약
========================================================= */

function CoverageSummary({
  label,
  item,
}: {
  label: string;
  item: CoverageItem;
}) {
  const ratio =
    item.recommended > 0
      ? Math.min(
          100,
          (item.current / item.recommended) *
            100
        )
      : 0;

  return (
    <div style={coverageSummaryItemStyle}>
      <div style={coverageLabelStyle}>
        {label}
      </div>

      <div style={coverageCurrentStyle}>
        {formatManWon(item.current)}
      </div>

      <div style={coverageBarBackgroundStyle}>
        <div
          style={{
            ...coverageBarStyle,
            width: `${ratio}%`,
          }}
        />
      </div>

      <div style={coverageRecommendedStyle}>
        권장 {formatManWon(item.recommended)}
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
    '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const topBarStyle = {
  width: '100%',
  maxWidth: '210mm',
  margin: '0 auto 14px',
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: '8px',
};

const leftButtonStyle = {
  justifySelf: 'start',
  background: '#ffffff',
  border: '1px solid #dbe3f0',
  borderRadius: '10px',
  padding: '8px 12px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 700,
  color: '#1e3a8a',
};

const centerButtonStyle = {
  justifySelf: 'center',
  background: '#ffffff',
  border: '1px solid #dbe3f0',
  borderRadius: '10px',
  padding: '8px 14px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 700,
  color: '#334155',
};

const rightButtonsStyle = {
  justifySelf: 'end',
  display: 'flex',
  gap: '7px',
};

const actionButtonStyle = {
  background: '#ffffff',
  border: '1px solid #dbe3f0',
  borderRadius: '10px',
  padding: '8px 11px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 700,
  color: '#334155',
};

const a4PageStyle = {
  width: '210mm',
  height: '297mm',
  minHeight: '297mm',
  maxHeight: '297mm',
  margin: '0 auto',
  padding: '7mm',
  background: '#ffffff',
  borderRadius: '8px',
  boxShadow:
    '0 8px 30px rgba(15,23,42,0.08)',
  overflow: 'hidden',
  position: 'relative' as const,
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const logoCircleStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '13px',
  background:
    'linear-gradient(135deg, #2563eb, #60a5fa)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '21px',
  flexShrink: 0,
};

const smallTitleStyle = {
  fontSize: '10px',
  fontWeight: 700,
  color: '#334155',
};

const mainTitleStyle = {
  margin: '1px 0 0',
  fontSize: '22px',
  lineHeight: 1.1,
  color: '#0f172a',
  letterSpacing: '-0.8px',
};

const headerDescriptionStyle = {
  margin: '3px 0 0',
  fontSize: '9px',
  color: '#64748b',
};

const customerMiniCardStyle = {
  minWidth: '125px',
  padding: '8px 10px',
  borderRadius: '10px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
};

const customerNameStyle = {
  fontSize: '12px',
  fontWeight: 800,
  color: '#0f172a',
};

const customerMiniTextStyle = {
  fontSize: '8px',
  color: '#64748b',
  marginTop: '2px',
};

const sectionStyle = {
  marginTop: '11px',
};

const sectionTitleStyle = {
  margin: '0 0 7px',
  fontSize: '13px',
  color: '#0f172a',
  fontWeight: 800,
};

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(4, minmax(0, 1fr))',
  border: '1px solid #dbeafe',
  borderRadius: '11px',
  overflow: 'hidden',
  background: '#f8fbff',
};

const infoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  minWidth: 0,
  padding: '8px 9px',
  borderRight: '1px solid #dbeafe',
};

const infoIconStyle = {
  width: '25px',
  height: '25px',
  borderRadius: '8px',
  background: '#e0edff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  flexShrink: 0,
};

const infoLabelStyle = {
  fontSize: '8px',
  color: '#64748b',
};

const infoValueStyle = {
  marginTop: '2px',
  fontSize: '10px',
  fontWeight: 800,
  color: '#0f172a',
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const analysisGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.08fr 0.92fr',
  gap: '10px',
};

const chartCardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '11px',
  background: '#ffffff',
};

const chartTitleStyle = {
  fontSize: '11px',
  fontWeight: 800,
  color: '#0f172a',
};

const chartDescriptionStyle = {
  fontSize: '8px',
  color: '#64748b',
  marginTop: '3px',
};

const chartWrapStyle = {
  height: '178px',
  marginTop: '2px',
};

const chartLegendStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '13px',
  fontSize: '8px',
  color: '#64748b',
};

const legendDotStyle = {
  display: 'inline-block',
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  marginRight: '4px',
};

const coverageSummaryStyle = {
  marginTop: '7px',
  paddingTop: '7px',
  borderTop: '1px solid #e2e8f0',
};

const summaryTitleStyle = {
  fontSize: '8px',
  fontWeight: 800,
  color: '#334155',
  marginBottom: '5px',
};

const summaryGridStyle = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(4, minmax(0, 1fr))',
  gap: '5px',
};

const coverageSummaryItemStyle = {
  minWidth: 0,
};

const coverageLabelStyle = {
  fontSize: '7px',
  color: '#64748b',
};

const coverageCurrentStyle = {
  fontSize: '9px',
  fontWeight: 800,
  color: '#2563eb',
  marginTop: '1px',
};

const coverageBarBackgroundStyle = {
  height: '4px',
  background: '#e2e8f0',
  borderRadius: '99px',
  overflow: 'hidden',
  marginTop: '3px',
};

const coverageBarStyle = {
  height: '100%',
  background: '#2563eb',
  borderRadius: '99px',
};

const coverageRecommendedStyle = {
  fontSize: '6px',
  color: '#94a3b8',
  marginTop: '2px',
};

const reasonCardStyle = {
  borderRadius: '12px',
  padding: '11px',
  background:
    'linear-gradient(135deg, #faf5ff, #f5f3ff)',
  border: '1px solid #ede9fe',
};

const reasonTitleStyle = {
  margin: 0,
  fontSize: '12px',
  fontWeight: 800,
  color: '#6d28d9',
};

const reasonSubTitleStyle = {
  margin: '3px 0 7px',
  fontSize: '8px',
  color: '#64748b',
  lineHeight: 1.4,
};

const riskListStyle = {
  display: 'grid',
  gap: '5px',
};

const riskItemStyle = {
  background: 'rgba(255,255,255,0.78)',
  borderRadius: '8px',
  padding: '6px 7px',
  border: '1px solid rgba(226,232,240,0.8)',
};

const riskItemHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '6px',
  fontSize: '9px',
  color: '#0f172a',
};

const riskBadgeStyle = {
  fontSize: '7px',
  fontWeight: 800,
  padding: '3px 6px',
  borderRadius: '99px',
  whiteSpace: 'nowrap' as const,
};

const riskReasonStyle = {
  margin: '3px 0 0',
  fontSize: '7.5px',
  color: '#475569',
  lineHeight: 1.45,
};

const aiBoxStyle = {
  marginTop: '9px',
  display: 'flex',
  gap: '9px',
  padding: '9px 11px',
  borderRadius: '11px',
  background:
    'linear-gradient(135deg, #f5f3ff, #faf5ff)',
  border: '1px solid #ddd6fe',
};

const aiIconStyle = {
  width: '31px',
  height: '31px',
  borderRadius: '10px',
  background: '#ede9fe',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
};

const aiTitleStyle = {
  margin: 0,
  fontSize: '11px',
  fontWeight: 800,
  color: '#6d28d9',
};

const aiSubTitleStyle = {
  margin: '2px 0 5px',
  fontSize: '7.5px',
  color: '#64748b',
};

const aiCommentListStyle = {
  display: 'grid',
  gap: '3px',
};

const aiCommentItemStyle = {
  display: 'flex',
  gap: '5px',
  alignItems: 'flex-start',
  fontSize: '7.5px',
  color: '#334155',
  lineHeight: 1.45,
};

const checkStyle = {
  color: '#7c3aed',
  fontWeight: 900,
  flexShrink: 0,
};

const bottomMessageStyle = {
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 10px',
  borderRadius: '10px',
  background:
    'linear-gradient(135deg, #fff7ed, #fffbeb)',
  border: '1px solid #fed7aa',
};

const targetIconStyle = {
  width: '29px',
  height: '29px',
  borderRadius: '9px',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  flexShrink: 0,
};

const bottomMessageTitleStyle = {
  fontSize: '7.5px',
  color: '#475569',
};

const bottomMessageTextStyle = {
  marginTop: '2px',
  fontSize: '9px',
  color: '#0f172a',
};

const pageNavigationStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '5px',
  marginTop: '7px',
};

const pageNumberStyle = {
  width: '23px',
  height: '23px',
  borderRadius: '7px',
  border: '1px solid #cbd5e1',
  background: '#ffffff',
  color: '#64748b',
  cursor: 'pointer',
  fontSize: '9px',
  fontWeight: 800,
};

const activePageStyle = {
  background: '#2563eb',
  borderColor: '#2563eb',
  color: '#ffffff',
};

const footerStyle = {
  position: 'absolute' as const,
  left: '7mm',
  right: '7mm',
  bottom: '4mm',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#94a3b8',
  fontSize: '7px',
};
