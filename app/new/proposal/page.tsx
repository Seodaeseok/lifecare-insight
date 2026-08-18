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
  ChartOptions,
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
   고객 정보
   ========================================================= */

const CUSTOMER = {
  name: '김민수님',
  genderAge: '38세 남성',
  age: 38,
  job: '사무직',
  family: '배우자, 자녀 2명',
  familyHistory: '위암(父), 고혈압(母)',
};

/* =========================================================
   보장 분석 데이터
   ---------------------------------------------------------
   risk        : 고객의 특성을 고려한 예상 위험도
   current     : 현재 가입금액
   ageAverage  : 동일 연령대 평균 가입금액
   recommend   : 권장 보장금액
   ========================================================= */

const COVERAGE_DATA = [
  {
    label: '암',
    risk: 90,
    current: 3000,
    ageAverage: 3800,
    recommend: 5000,
    reason:
      '가족력과 연령을 고려했을 때 경제적 위험이 큰 영역입니다.',
    color: '#ef4444',
  },
  {
    label: '뇌혈관',
    risk: 78,
    current: 1000,
    ageAverage: 2100,
    recommend: 3000,
    reason:
      '30대 후반부터 혈관질환 위험 관리의 중요성이 점차 커집니다.',
    color: '#f97316',
  },
  {
    label: '심혈관',
    risk: 68,
    current: 1200,
    ageAverage: 2000,
    recommend: 3000,
    reason:
      '가족력과 생활습관을 고려해 충분한 진단자금 확보가 필요합니다.',
    color: '#f97316',
  },
  {
    label: '수술비',
    risk: 52,
    current: 500,
    ageAverage: 700,
    recommend: 1000,
    reason:
      '질병과 상해에 반복적으로 발생할 수 있는 비용을 대비합니다.',
    color: '#2563eb',
  },
  {
    label: '상해·후유장해',
    risk: 32,
    current: 2000,
    ageAverage: 2500,
    recommend: 3000,
    reason:
      '현재 직업과 생활환경을 고려하면 상대적으로 위험도가 낮습니다.',
    color: '#16a34a',
  },
];

/* =========================================================
   숫자 표시
   ========================================================= */

function formatManwon(value: number) {
  return `${value.toLocaleString('ko-KR')}만원`;
}

function getCoveragePercent(current: number, recommend: number) {
  if (!recommend) return 0;

  return Math.min(
    100,
    Math.round((current / recommend) * 100)
  );
}

/* =========================================================
   Radar 데이터
   ========================================================= */

const radarData = {
  labels: COVERAGE_DATA.map((item) => item.label),

  datasets: [
    {
      label: '예상 위험도',
      data: COVERAGE_DATA.map((item) => item.risk),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.16)',
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#ffffff',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 3,
      fill: true,
    },

    {
      label: '현재 가입 수준',
      data: COVERAGE_DATA.map((item) =>
        getCoveragePercent(item.current, item.recommend)
      ),
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.10)',
      pointBackgroundColor: '#ef4444',
      pointBorderColor: '#ffffff',
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      fill: true,
    },

    {
      label: '동일 연령대 평균',
      data: COVERAGE_DATA.map((item) =>
        getCoveragePercent(item.ageAverage, item.recommend)
      ),
      borderColor: '#94a3b8',
      backgroundColor: 'rgba(148, 163, 184, 0.05)',
      pointBackgroundColor: '#94a3b8',
      pointBorderColor: '#ffffff',
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
      borderDash: [6, 5],
      fill: false,
    },
  ],
};

/* =========================================================
   Radar 옵션
   ========================================================= */

const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,

  animation: false,

  scales: {
    r: {
      min: 0,
      max: 100,

      ticks: {
        display: true,
        stepSize: 20,
        color: '#94a3b8',
        backdropColor: 'transparent',
        font: {
          size: 10,
        },
      },

      grid: {
        color: '#dbe5f2',
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
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 16,
        color: '#334155',
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
   컴포넌트
   ========================================================= */

export default function ProposalPage() {
  const router = useRouter();

  return (
    <>
      {/* =====================================================
          화면용 상단 버튼
          인쇄할 때는 숨김
         ===================================================== */}

      <div className="no-print top-navigation">
        <button
          className="nav-button left"
          onClick={() => router.push('/new/coverage')}
        >
          🛡️ 보장분석
        </button>

        <button
          className="nav-button center"
          onClick={() => router.push('/')}
        >
          🏠 메인
        </button>

        <div className="right-buttons">
          <button
            className="nav-button"
            onClick={() => window.print()}
          >
            📄 PDF 저장
          </button>

          <button
            className="nav-button"
            onClick={() => window.print()}
          >
            🖨️ 인쇄
          </button>
        </div>
      </div>

      {/* =====================================================
          A4 가로 페이지
         ===================================================== */}

      <main className="page">

        {/* ===================================================
            상단 헤더
           =================================================== */}

        <header className="page-header">

          <div className="brand-area">
            <div className="shield">
              🛡️
            </div>

            <div>
              <div className="brand-small">
                고객님을 위한 맞춤형
              </div>

              <h1>
                종합보험 제안서
              </h1>

              <p>
                지금의 준비가 가족의 내일을 더 든든하게 만듭니다.
              </p>
            </div>
          </div>

          <div className="customer-card">

            <div className="customer-icon">
              👤
            </div>

            <div>
              <strong>
                {CUSTOMER.name}
              </strong>

              <span>
                · {CUSTOMER.genderAge}
              </span>
            </div>

            <div className="customer-divider" />

            <div className="customer-info">
              <span>직업</span>
              <strong>{CUSTOMER.job}</strong>
            </div>

            <div className="customer-info">
              <span>가족</span>
              <strong>{CUSTOMER.family}</strong>
            </div>

            <div className="customer-info">
              <span>가족력</span>
              <strong>{CUSTOMER.familyHistory}</strong>
            </div>

          </div>

          <div className="page-number">
            1 / 4
          </div>

        </header>

        {/* ===================================================
            본문
           =================================================== */}

        <section className="content-grid">

          {/* =================================================
              LEFT
             ================================================= */}

          <aside className="left-column">

            {/* 고객 정보 */}

            <section className="panel customer-panel">

              <h2>
                👥 고객 인적사항 및 가족 현황
              </h2>

              <div className="info-list">

                <div className="info-row">
                  <span>연령</span>
                  <strong>{CUSTOMER.age}세</strong>
                </div>

                <div className="info-row">
                  <span>직업</span>
                  <strong>{CUSTOMER.job}</strong>
                </div>

                <div className="info-row">
                  <span>가족사항</span>
                  <strong>{CUSTOMER.family}</strong>
                </div>

                <div className="info-row">
                  <span>가족력</span>
                  <strong>{CUSTOMER.familyHistory}</strong>
                </div>

              </div>

            </section>


            {/* 종합 위험도 */}

            <section className="panel overall-panel">

              <h2>
                📊 종합 위험도 평가
              </h2>

              <div className="risk-score">
                <span>
                  종합 위험도
                </span>

                <strong>
                  높음
                </strong>
              </div>

              <p className="body-text">
                고객님의 연령, 직업, 가족력과 현재 보장 상태를
                종합적으로 고려한 결과입니다.
              </p>

              <div className="risk-bar">
                <div className="risk-bar-fill" />
              </div>

            </section>

          </aside>


          {/* =================================================
              CENTER
             ================================================= */}

          <section className="center-column">

            <div className="panel graph-panel">

              <div className="section-heading">

                <div>
                  <h2>
                    📊 주요 보장 위험도 및 가입금액 비교
                  </h2>

                  <p>
                    위험도와 현재 보장 수준을 한눈에 비교합니다.
                  </p>
                </div>

              </div>

              <div className="legend-description">

                <span>
                  <i className="legend-blue" />
                  예상 위험도
                </span>

                <span>
                  <i className="legend-red" />
                  현재 가입 수준
                </span>

                <span>
                  <i className="legend-gray" />
                  동일 연령대 평균
                </span>

              </div>

              <div className="radar-container">
                <Radar
                  data={radarData}
                  options={radarOptions}
                />
              </div>

              <div className="graph-explanation">

                <div>
                  <strong>🔵 예상 위험도</strong>
                  <span>
                    고객의 연령·직업·가족력 등을 고려한
                    상대적 위험 수준
                  </span>
                </div>

                <div>
                  <strong>🔴 현재 가입 수준</strong>
                  <span>
                    권장 보장금액 대비 현재 가입금액
                  </span>
                </div>

                <div>
                  <strong>⚪ 연령대 평균</strong>
                  <span>
                    동일 연령대의 일반적인 보장 수준
                  </span>
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              RIGHT
             ================================================= */}

          <aside className="right-column">

            {/* 보장금액 비교 */}

            <section className="panel coverage-panel">

              <div className="panel-title-row">

                <h2>
                  🛡️ 보장금액 비교
                </h2>

                <span>
                  단위: 만원
                </span>

              </div>

              <div className="table-wrap">

                <table>

                  <thead>
                    <tr>
                      <th>보장</th>
                      <th>위험도</th>
                      <th>현재</th>
                      <th>연령대</th>
                      <th>권장</th>
                    </tr>
                  </thead>

                  <tbody>

                    {COVERAGE_DATA.map((item) => (

                      <tr key={item.label}>

                        <td>
                          <strong>
                            {item.label}
                          </strong>
                        </td>

                        <td>
                          <strong
                            style={{
                              color: item.color,
                            }}
                          >
                            {item.risk}
                          </strong>
                        </td>

                        <td>
                          {item.current.toLocaleString()}
                        </td>

                        <td>
                          {item.ageAverage.toLocaleString()}
                        </td>

                        <td>
                          <strong>
                            {item.recommend.toLocaleString()}
                          </strong>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              <div className="table-note">
                현재 가입금액과 권장금액을 비교하여
                부족한 보장을 확인할 수 있습니다.
              </div>

            </section>


            {/* 왜 이렇게 판단했을까요 */}

            <section className="panel reason-panel">

              <h2>
                💡 왜 이렇게 판단했을까요?
              </h2>

              <div className="reason-list">

                {COVERAGE_DATA.slice(0, 5).map((item) => (

                  <div
                    className="reason-item"
                    key={item.label}
                  >

                    <span className="check">
                      ✓
                    </span>

                    <div>
                      <strong>
                        {item.label}
                      </strong>

                      <span>
                        {item.reason}
                      </span>
                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* AI 분석 */}

            <section className="panel ai-panel">

              <h2>
                🤖 AI 종합 분석 코멘트
              </h2>

              <p className="ai-text">

                고객님의 현재 보장 수준을 종합적으로 분석한 결과,
                암·뇌혈관·심혈관 영역에서 위험도 대비
                보장 수준이 상대적으로 부족한 것으로 판단됩니다.
                특히 가족력과 연령을 함께 고려하면 해당 영역의
                진단자금을 우선적으로 보완하는 것이 합리적입니다.

              </p>

              <p className="ai-text strong">
                모든 특약을 한꺼번에 추가하기보다
                가장 중요한 위험부터 단계적으로 준비하는 것을
                추천드립니다.
              </p>

            </section>

          </aside>

        </section>


        {/* ===================================================
            하단 핵심 메시지
           =================================================== */}

        <section className="bottom-message">

          <div className="target-icon">
            🎯
          </div>

          <div>

            <strong>
              고객님에게는 '모든 것을 다 넣는 것'보다
            </strong>

            <span>
              가장 중요한 위험부터 순서대로 준비하는 것이 더 현명합니다.
            </span>

          </div>

        </section>


        {/* ===================================================
            하단 페이지 이동
           =================================================== */}

        <nav className="no-print page-navigation">

          <button
            onClick={() => router.push('/new/proposal')}
            className="active"
          >
            1
          </button>

          <button
            onClick={() => router.push('/new/priority')}
          >
            2
          </button>

          <button
            onClick={() => router.push('/new/plan')}
          >
            3
          </button>

          <button
            onClick={() => router.push('/new/trend')}
          >
            4
          </button>

        </nav>

      </main>


      {/* =====================================================
          화면 / 인쇄 스타일
         ===================================================== */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #eef3f9;
        }

        .top-navigation {
          width: min(1280px, calc(100% - 32px));
          margin: 16px auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
        }

        .nav-button {
          border: 1px solid #dbe4f0;
          background: #ffffff;
          color: #334155;
          border-radius: 10px;
          padding: 9px 14px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .nav-button:hover {
          background: #f8fafc;
        }

        .nav-button.left {
          justify-self: start;
        }

        .nav-button.center {
          justify-self: center;
        }

        .right-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        /* ================================================
           A4 가로 페이지
           ================================================ */

        .page {
          width: 297mm;
          height: 210mm;
          max-width: 100%;
          margin: 0 auto;
          background: #ffffff;
          padding: 8mm;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          color: #0f172a;
          font-family:
            Arial,
            "Noto Sans KR",
            sans-serif;
        }

        /* ================================================
           Header
           ================================================ */

        .page-header {
          display: grid;
          grid-template-columns: 1.05fr 1.6fr auto;
          gap: 14px;
          align-items: center;
          margin-bottom: 7px;
        }

        .brand-area {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .shield {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #eaf2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          flex-shrink: 0;
        }

        .brand-small {
          color: #475569;
          font-size: 10px;
          font-weight: 700;
        }

        .brand-area h1 {
          margin: 1px 0 2px;
          font-size: 22px;
          line-height: 1.1;
          color: #0f172a;
        }

        .brand-area p {
          margin: 0;
          font-size: 9px;
          color: #64748b;
        }

        .customer-card {
          min-width: 0;
          border: 1px solid #dbe7f7;
          background: #f8fbff;
          border-radius: 14px;
          padding: 9px 11px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .customer-icon {
          width: 28px;
          height: 28px;
          border-radius: 9px;
          background: #e0ecff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .customer-card strong {
          font-size: 11px;
        }

        .customer-card span {
          font-size: 9px;
          color: #64748b;
        }

        .customer-divider {
          width: 1px;
          height: 26px;
          background: #dbe4f0;
          margin: 0 2px;
        }

        .customer-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .customer-info span {
          font-size: 8px;
          color: #64748b;
        }

        .customer-info strong {
          font-size: 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .page-number {
          font-size: 11px;
          font-weight: 800;
          color: #2563eb;
          white-space: nowrap;
        }

        /* ================================================
           Main Grid
           ================================================ */

        .content-grid {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: 23% 43% 34%;
          gap: 7px;
        }

        .left-column,
        .center-column,
        .right-column {
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        /* ================================================
           Panel
           ================================================ */

        .panel {
          background: #ffffff;
          border: 1px solid #dce7f5;
          border-radius: 13px;
          padding: 12px;
          min-width: 0;
        }

        .panel h2 {
          margin: 0 0 9px;
          font-size: 12px;
          line-height: 1.25;
          color: #12346b;
        }

        .body-text {
          margin: 7px 0 0;
          font-size: 9px;
          line-height: 1.45;
          color: #475569;
        }

        /* ================================================
           Customer panel
           ================================================ */

        .customer-panel {
          flex: 0 0 auto;
        }

        .info-list {
          display: grid;
          gap: 5px;
        }

        .info-row {
          display: grid;
          grid-template-columns: 58px 1fr;
          gap: 5px;
          padding: 5px 0;
          border-bottom: 1px solid #edf2f7;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-row span {
          font-size: 8px;
          color: #64748b;
        }

        .info-row strong {
          font-size: 9px;
          color: #1e293b;
          text-align: right;
        }

        /* ================================================
           Overall risk
           ================================================ */

        .overall-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .risk-score {
          background: #fff8eb;
          border-radius: 10px;
          padding: 12px 8px;
          text-align: center;
        }

        .risk-score span {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 4px;
        }

        .risk-score strong {
          display: block;
          color: #ef4444;
          font-size: 21px;
        }

        .risk-bar {
          height: 9px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #86efac 0%,
            #fde68a 45%,
            #fb923c 70%,
            #ef4444 100%
          );
          margin-top: auto;
          overflow: hidden;
        }

        .risk-bar-fill {
          width: 78%;
          height: 100%;
          background: rgba(255, 255, 255, 0.65);
          margin-left: 78%;
        }

        /* ================================================
           Center graph
           ================================================ */

        .center-column {
          min-height: 0;
        }

        .graph-panel {
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
        }

        .section-heading h2 {
          margin-bottom: 3px;
        }

        .section-heading p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
        }

        .legend-description {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin: 3px 0 3px;
          flex-wrap: wrap;
        }

        .legend-description span {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 8px;
          color: #475569;
        }

        .legend-description i {
          width: 15px;
          height: 3px;
          display: inline-block;
          border-radius: 99px;
        }

        .legend-blue {
          background: #2563eb;
        }

        .legend-red {
          background: #ef4444;
        }

        .legend-gray {
          background: #94a3b8;
        }

        .radar-container {
          position: relative;
          flex: 1;
          min-height: 0;
          width: 100%;
        }

        .graph-explanation {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
          margin-top: 5px;
        }

        .graph-explanation div {
          background: #f8fafc;
          border-radius: 8px;
          padding: 5px;
        }

        .graph-explanation strong {
          display: block;
          font-size: 7px;
          margin-bottom: 2px;
        }

        .graph-explanation span {
          display: block;
          font-size: 6.5px;
          line-height: 1.3;
          color: #64748b;
        }

        /* ================================================
           Coverage table
           ================================================ */

        .coverage-panel {
          flex: 0 0 auto;
        }

        .panel-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 5px;
        }

        .panel-title-row h2 {
          margin-bottom: 7px;
        }

        .panel-title-row > span {
          font-size: 7px;
          color: #94a3b8;
        }

        .table-wrap {
          overflow: hidden;
          border: 1px solid #dbe5f0;
          border-radius: 8px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        th,
        td {
          border-right: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          padding: 5px 3px;
          text-align: center;
          font-size: 7px;
        }

        th {
          background: #f5f9ff;
          color: #334155;
          font-weight: 800;
        }

        td {
          color: #334155;
        }

        tr:last-child td {
          border-bottom: none;
        }

        th:last-child,
        td:last-child {
          border-right: none;
        }

        td strong {
          color: #0f172a;
        }

        .table-note {
          margin-top: 5px;
          padding: 5px 7px;
          border-radius: 7px;
          background: #f8fafc;
          color: #64748b;
          font-size: 7px;
          line-height: 1.35;
        }

        /* ================================================
           Reason
           ================================================ */

        .reason-panel {
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .reason-list {
          display: grid;
          gap: 4px;
        }

        .reason-item {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 5px;
          align-items: flex-start;
        }

        .check {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: 900;
        }

        .reason-item strong {
          font-size: 7.5px;
          margin-right: 3px;
        }

        .reason-item span:last-child {
          font-size: 7px;
          line-height: 1.35;
          color: #475569;
        }

        /* ================================================
           AI
           ================================================ */

        .ai-panel {
          flex: 0 0 auto;
          background: linear-gradient(
            135deg,
            #f7f3ff,
            #f5f8ff
          );
          border-color: #e4ddff;
        }

        .ai-panel h2 {
          color: #5b21b6;
          margin-bottom: 5px;
        }

        .ai-text {
          margin: 0 0 4px;
          color: #475569;
          font-size: 7.5px;
          line-height: 1.4;
        }

        .ai-text:last-child {
          margin-bottom: 0;
        }

        .ai-text.strong {
          color: #334155;
          font-weight: 700;
        }

        /* ================================================
           Bottom
           ================================================ */

        .bottom-message {
          flex: 0 0 auto;
          margin-top: 6px;
          min-height: 31px;
          border: 1px solid #f5d98b;
          border-radius: 11px;
          background: #fff9e9;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 5px 10px;
        }

        .target-icon {
          font-size: 18px;
        }

        .bottom-message strong {
          font-size: 8.5px;
          margin-right: 4px;
        }

        .bottom-message span {
          font-size: 8.5px;
          font-weight: 700;
          color: #334155;
        }

        /* ================================================
           Page navigation
           ================================================ */

        .page-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 5px;
        }

        .page-navigation button {
          width: 24px;
          height: 24px;
          border-radius: 7px;
          border: 1px solid #dbe4f0;
          background: #ffffff;
          color: #64748b;
          font-size: 9px;
          font-weight: 800;
          cursor: pointer;
        }

        .page-navigation button.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
        }

        /* ================================================
           반응형 화면
           ================================================ */

        @media screen and (max-width: 1100px) {

          .page {
            transform-origin: top center;
          }

          .top-navigation {
            width: calc(100% - 20px);
          }

        }

        /* ================================================
           인쇄
           ================================================ */

        @media print {

          @page {
            size: A4 landscape;
            margin: 0;
          }

          html,
          body {
            width: 297mm;
            height: 210mm;
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

          .page {
            width: 297mm !important;
            height: 210mm !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 8mm !important;
            border: none !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            break-after: avoid-page !important;
          }

          .content-grid {
            min-height: 0 !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }

      `}</style>
    </>
  );
}
