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
   ========================================================= */

const customer = {
  name: '김민수',
  age: 38,
  gender: '남성',
  job: '사무직',
  family: '배우자, 자녀 2명',
  familyHistory: '위암(父), 고혈압(母)',
};

/* =========================================================
   보장 분석 데이터
   위험도 / 현재 가입금액 / 연령대 평균 / 권장금액
   ========================================================= */

const coverageData = [
  {
    name: '암',
    risk: 90,
    current: 3000,
    average: 3800,
    recommended: 5000,
    color: '#ef4444',
  },
  {
    name: '뇌혈관',
    risk: 78,
    current: 1000,
    average: 2100,
    recommended: 3000,
    color: '#f97316',
  },
  {
    name: '심혈관',
    risk: 68,
    current: 1200,
    average: 2000,
    recommended: 3000,
    color: '#f59e0b',
  },
  {
    name: '수술비',
    risk: 52,
    current: 500,
    average: 700,
    recommended: 1000,
    color: '#2563eb',
  },
  {
    name: '상해·후유장해',
    risk: 32,
    current: 2000,
    average: 2500,
    recommended: 3000,
    color: '#16a34a',
  },
];

/* =========================================================
   위험도 설명
   ========================================================= */

const riskReasons = [
  {
    title: '암',
    text: '가족력과 연령을 함께 고려했을 때 향후 경제적 위험이 큰 영역으로 판단됩니다.',
  },
  {
    title: '뇌혈관',
    text: '30대 후반 이후 뇌혈관 질환 위험이 점진적으로 증가하며 진단 후 소득 공백도 고려했습니다.',
  },
  {
    title: '심혈관',
    text: '가족력과 생활습관 등을 고려했을 때 장기적으로 대비가 필요한 영역입니다.',
  },
  {
    title: '수술비',
    text: '질병과 상해로 인해 반복적으로 발생할 수 있는 치료비 부담을 고려했습니다.',
  },
  {
    title: '상해·후유장해',
    text: '현재 직업과 생활환경을 고려하면 상대적인 위험도는 다른 보장보다 낮은 편입니다.',
  },
];

/* =========================================================
   AI 분석 코멘트
   ========================================================= */

const aiComment =
  '고객님의 현재 보장 수준을 종합적으로 분석한 결과, 암·뇌혈관·심혈관 영역에서 예상 위험도 대비 현재 가입 수준이 상대적으로 부족한 것으로 판단됩니다. 특히 가족력과 연령을 함께 고려하면 해당 영역의 진단자금을 우선적으로 보완하는 것이 합리적입니다. 모든 특약을 한꺼번에 추가하기보다는 현재 가입금액과 필요한 보장금액의 차이를 확인한 후 우선순위가 높은 보장부터 단계적으로 준비하는 것을 권장드립니다.';

/* =========================================================
   Radar Chart
   ========================================================= */

const radarData = {
  labels: ['암', '뇌혈관', '심혈관', '수술비', '상해·후유장해'],

  datasets: [
    {
      label: '예상 위험도',
      data: coverageData.map((item) => item.risk),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.15)',
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointRadius: 4,
      borderWidth: 3,
    },
    {
      label: '현재 가입 수준',
      data: coverageData.map((item) =>
        Math.min(
          100,
          Math.round((item.current / item.recommended) * 100)
        )
      ),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#ffffff',
      pointRadius: 4,
      borderWidth: 3,
    },
    {
      label: '동일 연령대 평균',
      data: coverageData.map((item) =>
        Math.min(
          100,
          Math.round((item.average / item.recommended) * 100)
        )
      ),
      borderColor: '#94a3b8',
      backgroundColor: 'rgba(148, 163, 184, 0.05)',
      pointBackgroundColor: '#94a3b8',
      pointBorderColor: '#ffffff',
      pointRadius: 3,
      borderWidth: 2,
      borderDash: [6, 5],
    },
  ],
};

/*
  Chart.js 최신 버전에서 pointLabels.font.weight 타입 오류가
  발생할 수 있기 때문에 options는 any로 지정.
*/
const radarOptions: any = {
  responsive: true,
  maintainAspectRatio: false,

  scales: {
    r: {
      min: 0,
      max: 100,

      ticks: {
        display: true,
        stepSize: 20,
        color: '#94a3b8',
        font: {
          size: 10,
        },
      },

      grid: {
        color: '#dbe5f2',
        lineWidth: 1,
      },

      angleLines: {
        color: '#dbe5f2',
      },

      pointLabels: {
        color: '#0f172a',
        font: {
          size: 15,
          weight: 600,
        },
      },
    },
  },

  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        padding: 18,
        font: {
          size: 12,
          weight: 600,
        },
      },
    },

    tooltip: {
      enabled: true,
    },
  },
};

/* =========================================================
   유틸
   ========================================================= */

function formatMoney(value: number) {
  return `${value.toLocaleString('ko-KR')}만원`;
}

function getToday() {
  const today = new Date();

  return today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

/* =========================================================
   페이지
   ========================================================= */

export default function ProposalPage() {
  const router = useRouter();

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* =====================================================
          화면용 / 인쇄용 스타일
      ===================================================== */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #eef3f9;
        }

        body {
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            'Noto Sans KR',
            sans-serif;
        }

        button {
          font-family: inherit;
        }

        .proposal-screen {
          min-height: 100vh;
          background: #eef3f9;
          padding: 12px 16px 20px;
        }

        .proposal-toolbar {
          width: min(1400px, 100%);
          margin: 0 auto 10px;
          height: 42px;

          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .toolbar-left {
          display: flex;
          justify-content: flex-start;
        }

        .toolbar-center {
          display: flex;
          justify-content: center;
        }

        .toolbar-right {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .toolbar-button {
          height: 38px;
          padding: 0 15px;

          border: 1px solid #d6e2f1;
          background: #ffffff;
          border-radius: 10px;

          color: #0f172a;
          font-size: 13px;
          font-weight: 700;

          cursor: pointer;
          transition: 0.15s;
        }

        .toolbar-button:hover {
          background: #f8fbff;
          border-color: #b9cce4;
        }

        .proposal-page {
          width: min(1400px, 100%);
          height: calc(min(1400px, 100vw) * 0.707);

          min-height: 760px;
          max-height: 900px;

          margin: 0 auto;

          background: #ffffff;
          border: 1px solid #d8e3f0;
          border-radius: 16px;

          padding: 18px;

          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.07);

          overflow: hidden;

          display: flex;
          flex-direction: column;
        }

        .proposal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          padding-bottom: 10px;
          border-bottom: 1px solid #e5edf6;
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shield {
          width: 42px;
          height: 42px;

          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #eff6ff;

          font-size: 23px;
        }

        .header-title {
          margin: 0;
          color: #0f172a;
          font-size: 23px;
          font-weight: 900;
          letter-spacing: -0.8px;
        }

        .header-name {
          margin-left: 8px;
          color: #2563eb;
          font-size: 17px;
          font-weight: 800;
        }

        .header-subtitle {
          margin: 3px 0 0;
          color: #64748b;
          font-size: 11px;
        }

        .header-date {
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          padding-top: 7px;
        }

        .main-grid {
          flex: 1;
          min-height: 0;

          display: grid;
          grid-template-columns: 220px minmax(420px, 1fr) 340px;

          gap: 10px;

          margin-top: 10px;
        }

        .column {
          min-width: 0;
          min-height: 0;

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .box {
          background: #ffffff;
          border: 1px solid #dbe6f2;
          border-radius: 13px;
          padding: 13px;
          overflow: hidden;
        }

        .box-title {
          display: flex;
          align-items: center;
          gap: 7px;

          margin: 0 0 10px;

          color: #0f3d91;
          font-size: 13px;
          font-weight: 900;
        }

        .info-box {
          flex-shrink: 0;
        }

        .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          min-height: 29px;

          border-bottom: 1px solid #edf2f7;

          font-size: 10px;
        }

        .info-row:last-child {
          border-bottom: 0;
        }

        .info-label {
          color: #64748b;
        }

        .info-value {
          color: #0f172a;
          font-weight: 800;
          text-align: right;
        }

        .risk-box {
          flex: 1;
          min-height: 0;

          display: flex;
          flex-direction: column;
        }

        .risk-summary {
          flex: 1;

          min-height: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background: linear-gradient(
            180deg,
            #f8fbff 0%,
            #ffffff 100%
          );

          border-radius: 10px;
          padding: 10px;
        }

        .risk-label {
          color: #475569;
          font-size: 10px;
          font-weight: 700;
        }

        .risk-value {
          margin-top: 3px;
          color: #ef4444;
          font-size: 25px;
          font-weight: 900;
        }

        .risk-description {
          margin: 8px 2px 0;

          color: #64748b;
          font-size: 9px;
          line-height: 1.5;
          text-align: center;
        }

        .risk-bar {
          width: 100%;
          height: 8px;

          margin-top: auto;

          border-radius: 999px;

          background: linear-gradient(
            90deg,
            #86efac 0%,
            #fde047 45%,
            #fb923c 72%,
            #ef4444 100%
          );
        }

        .chart-box {
          height: 100%;
          min-height: 0;

          display: flex;
          flex-direction: column;
        }

        .chart-subtitle {
          margin: -5px 0 4px;

          color: #64748b;
          font-size: 9px;
        }

        .chart-area {
          flex: 1;
          min-height: 0;

          position: relative;

          padding: 2px 10px 4px;
        }

        .chart-legend-description {
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          gap: 7px;

          margin-top: 4px;
        }

        .legend-card {
          padding: 7px;

          border: 1px solid #e5edf5;
          border-radius: 8px;

          background: #f8fafc;

          font-size: 8px;
          line-height: 1.35;
          color: #64748b;
        }

        .legend-card strong {
          display: block;

          margin-bottom: 2px;

          color: #334155;
          font-size: 9px;
        }

        .table-box {
          flex-shrink: 0;
        }

        .table-unit {
          margin-left: auto;
          color: #94a3b8;
          font-size: 8px;
          font-weight: 500;
        }

        .coverage-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;

          overflow: hidden;

          border: 1px solid #dbe6f2;
          border-radius: 8px;

          font-size: 8px;
        }

        .coverage-table th {
          background: #f3f7fc;
          color: #475569;

          font-weight: 800;

          padding: 6px 3px;

          border-bottom: 1px solid #dbe6f2;
          border-right: 1px solid #e2e8f0;

          text-align: center;
        }

        .coverage-table td {
          padding: 6px 3px;

          color: #334155;

          text-align: center;

          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
        }

        .coverage-table tr:last-child td {
          border-bottom: 0;
        }

        .coverage-table th:last-child,
        .coverage-table td:last-child {
          border-right: 0;
        }

        .coverage-table td:first-child {
          font-weight: 800;
          color: #0f172a;
        }

        .risk-number {
          font-weight: 900;
        }

        .coverage-note {
          margin-top: 5px;

          color: #94a3b8;
          font-size: 8px;
          line-height: 1.3;
        }

        .why-box {
          flex: 1;
          min-height: 0;

          background: #faf7ff;
          border-color: #e8ddff;
        }

        .why-list {
          display: grid;
          gap: 7px;
        }

        .why-item {
          display: flex;
          gap: 6px;
          align-items: flex-start;

          color: #475569;
          font-size: 8.5px;
          line-height: 1.4;
        }

        .why-check {
          width: 15px;
          height: 15px;

          flex: 0 0 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #e0e7ff;
          color: #4f46e5;

          font-size: 9px;
          font-weight: 900;
        }

        .ai-box {
          flex-shrink: 0;

          background: linear-gradient(
            135deg,
            #f7f4ff,
            #f8fbff
          );

          border-color: #ddd6fe;
        }

        .ai-title {
          margin-bottom: 6px;

          color: #6d28d9;
          font-size: 11px;
          font-weight: 900;
        }

        .ai-text {
          margin: 0;

          color: #475569;
          font-size: 8.5px;
          line-height: 1.45;
        }

        .recommendation {
          margin-top: 9px;

          padding: 8px 14px;

          border: 1px solid #f6d365;
          border-radius: 9px;

          background: #fffaf0;

          color: #334155;

          text-align: center;

          font-size: 10px;
          font-weight: 800;

          flex-shrink: 0;
        }

        .bottom-navigation {
          margin-top: 7px;

          display: flex;
          justify-content: center;
          gap: 5px;

          flex-shrink: 0;
        }

        .page-button {
          width: 24px;
          height: 24px;

          border-radius: 7px;

          border: 1px solid #d7e2ef;

          background: #ffffff;

          color: #64748b;

          font-size: 10px;
          font-weight: 800;

          cursor: pointer;
        }

        .page-button.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
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

            margin: 0 !important;
            padding: 0 !important;

            background: #ffffff !important;
          }

          .no-print {
            display: none !important;
          }

          .proposal-screen {
            width: 297mm;
            height: 210mm;

            min-height: 0;

            margin: 0;
            padding: 0;

            background: #ffffff !important;
          }

          .proposal-page {
            width: 297mm;
            height: 210mm;

            min-height: 0;
            max-height: none;

            margin: 0;

            border: 0;
            border-radius: 0;

            box-shadow: none;

            padding: 8mm;

            overflow: hidden;
          }

          .proposal-header {
            padding-bottom: 5mm;
          }

          .main-grid {
            margin-top: 4mm;
            gap: 3mm;
          }

          .box {
            border-radius: 3mm;
            padding: 3.5mm;
          }

          .recommendation {
            margin-top: 3mm;
          }

          /*
            브라우저의 인쇄 헤더/푸터는
            CSS로 강제로 제거할 수 없습니다.
            사용자가 인쇄창에서
            '머리글 및 바닥글'을 꺼야 합니다.
          }
          */
        }

        @media (max-width: 1000px) {
          .proposal-page {
            height: auto;
            max-height: none;
            min-height: 0;
          }

          .main-grid {
            grid-template-columns: 1fr;
          }

          .chart-box {
            min-height: 500px;
          }

          .risk-box {
            min-height: 300px;
          }
        }
      `}</style>

      <main className="proposal-screen">

        {/* =====================================================
            상단 버튼
        ===================================================== */}

        <div className="proposal-toolbar no-print">

          <div className="toolbar-left">
            <button
              className="toolbar-button"
              onClick={() => router.push('/new/coverage')}
            >
              🛡️ 보장분석
            </button>
          </div>

          <div className="toolbar-center">
            <button
              className="toolbar-button"
              onClick={() => router.push('/')}
            >
              🏠 메인
            </button>
          </div>

          <div className="toolbar-right">
            <button
              className="toolbar-button"
              onClick={handlePrint}
            >
              📄 PDF 저장
            </button>

            <button
              className="toolbar-button"
              onClick={handlePrint}
            >
              🖨️ 인쇄
            </button>
          </div>

        </div>

        {/* =====================================================
            A4 본문
        ===================================================== */}

        <section className="proposal-page">

          {/* ===================================================
              헤더
          =================================================== */}

          <header className="proposal-header">

            <div className="header-left">

              <div className="shield">
                🛡️
              </div>

              <div>
                <h1 className="header-title">
                  종합보험 제안서
                  <span className="header-name">
                    {customer.name}님
                  </span>
                </h1>

                <p className="header-subtitle">
                  지금의 준비가 가족의 내일을 더 든든하게 만듭니다.
                </p>
              </div>

            </div>

            <div className="header-date">
              📅 {getToday()}
            </div>

          </header>


          {/* ===================================================
              메인 3열
          =================================================== */}

          <div className="main-grid">

            {/* =================================================
                왼쪽
            ================================================= */}

            <div className="column">

              {/* 고객 인적사항 */}

              <section className="box info-box">

                <h2 className="box-title">
                  👥 고객 인적사항 및 가족 현황
                </h2>

                <div className="info-row">
                  <span className="info-label">
                    연령
                  </span>

                  <span className="info-value">
                    {customer.age}세
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">
                    성별
                  </span>

                  <span className="info-value">
                    {customer.gender}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">
                    직업
                  </span>

                  <span className="info-value">
                    {customer.job}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">
                    가족사항
                  </span>

                  <span className="info-value">
                    {customer.family}
                  </span>
                </div>

                <div className="info-row">
                  <span className="info-label">
                    가족력
                  </span>

                  <span className="info-value">
                    {customer.familyHistory}
                  </span>
                </div>

              </section>


              {/* 종합 위험도 */}

              <section className="box risk-box">

                <h2 className="box-title">
                  📊 종합 위험도 평가
                </h2>

                <div className="risk-summary">

                  <div className="risk-label">
                    고객님의 종합 위험도
                  </div>

                  <div className="risk-value">
                    높음
                  </div>

                  <p className="risk-description">
                    고객님의 연령, 직업, 가족력 및 현재
                    보장상태를 종합적으로 고려한 결과입니다.
                  </p>

                  <div className="risk-bar" />

                </div>

              </section>

            </div>


            {/* =================================================
                가운데 - 레이더 그래프
            ================================================= */}

            <div className="column">

              <section className="box chart-box">

                <h2 className="box-title">
                  📊 주요 보장 위험도 및 가입금액 비교
                </h2>

                <p className="chart-subtitle">
                  고객님의 연령·직업·가족력 등을 고려한 예상 위험도와
                  현재 가입 수준을 비교합니다.
                </p>

                <div className="chart-area">

                  <Radar
                    data={radarData}
                    options={radarOptions}
                  />

                </div>

                <div className="chart-legend-description">

                  <div className="legend-card">
                    <strong>
                      🔵 예상 위험도
                    </strong>
                    고객님의 연령·직업·가족력 등을
                    고려한 상대적인 위험 수준
                  </div>

                  <div className="legend-card">
                    <strong>
                      🔴 현재 가입 수준
                    </strong>
                    권장 보장금액 대비
                    현재 가입금액의 수준
                  </div>

                  <div className="legend-card">
                    <strong>
                      ⚪ 동일 연령대 평균
                    </strong>
                    동일 연령대에서 일반적으로
                    준비하는 보장 수준
                  </div>

                </div>

              </section>

            </div>


            {/* =================================================
                오른쪽
            ================================================= */}

            <div className="column">

              {/* 가입금액 비교 */}

              <section className="box table-box">

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 9,
                  }}
                >

                  <h2
                    className="box-title"
                    style={{ margin: 0 }}
                  >
                    🛡️ 보장금액 비교
                  </h2>

                  <span className="table-unit">
                    단위: 만원
                  </span>

                </div>


                <table className="coverage-table">

                  <thead>
                    <tr>
                      <th>보장</th>
                      <th>위험도</th>
                      <th>현재</th>
                      <th>연령대<br />평균</th>
                      <th>권장</th>
                      <th>가입<br />수준</th>
                    </tr>
                  </thead>

                  <tbody>

                    {coverageData.map((item) => {

                      const level = Math.min(
                        100,
                        Math.round(
                          (item.current / item.recommended) * 100
                        )
                      );

                      return (
                        <tr key={item.name}>

                          <td>
                            {item.name}
                          </td>

                          <td>
                            <span
                              className="risk-number"
                              style={{
                                color: item.color,
                              }}
                            >
                              {item.risk}
                            </span>
                          </td>

                          <td>
                            {item.current.toLocaleString()}
                          </td>

                          <td>
                            {item.average.toLocaleString()}
                          </td>

                          <td>
                            {item.recommended.toLocaleString()}
                          </td>

                          <td
                            style={{
                              color:
                                level < 50
                                  ? '#ef4444'
                                  : level < 80
                                  ? '#f97316'
                                  : '#16a34a',
                              fontWeight: 900,
                            }}
                          >
                            {level}%
                          </td>

                        </tr>
                      );

                    })}

                  </tbody>

                </table>

                <div className="coverage-note">
                  가입수준(%) = 현재 가입금액 ÷ 권장 보장금액 × 100
                </div>

              </section>


              {/* 왜 이렇게 판단했을까요? */}

              <section className="box why-box">

                <h2 className="box-title">
                  💡 왜 이렇게 판단했을까요?
                </h2>

                <div className="why-list">

                  {riskReasons.map((reason) => (

                    <div
                      className="why-item"
                      key={reason.title}
                    >

                      <span className="why-check">
                        ✓
                      </span>

                      <span>
                        <strong>
                          {reason.title}
                        </strong>
                        : {reason.text}
                      </span>

                    </div>

                  ))}

                </div>

              </section>


              {/* AI 분석 */}

              <section className="box ai-box">

                <h2 className="ai-title">
                  🤖 AI 종합 분석 코멘트
                </h2>

                <p className="ai-text">
                  {aiComment}
                </p>

              </section>

            </div>

          </div>


          {/* ===================================================
              하단 추천 문구
          =================================================== */}

          <div className="recommendation">

            🎯 고객님에게는
            <strong>
              {' '}
              '모든 것을 다 넣는 것'
            </strong>
            보다
            <strong>
              {' '}
              '가장 중요한 위험부터 순서대로 준비하는 것'
            </strong>
            이 더 현명합니다.

          </div>


          {/* ===================================================
              페이지 이동
          =================================================== */}

          <div className="bottom-navigation no-print">

            {[1, 2, 3, 4].map((page) => (

              <button
                key={page}
                className={`page-button ${
                  page === 1 ? 'active' : ''
                }`}
                onClick={() => goPage(page)}
              >
                {page}
              </button>

            ))}

          </div>

        </section>

      </main>
    </>
  );
}
