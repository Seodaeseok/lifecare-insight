'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCoveragePage() {
  const router = useRouter();

  // 실손 상태
  const [silsonEnabled, setSilsonEnabled] = useState(false);
  const [silsonYear, setSilsonYear] = useState('');
  const [silsonMonth, setSilsonMonth] = useState('');
  const [silsonDay, setSilsonDay] = useState('');

  // 실손 세대 자동 계산
  const silsonGeneration = useMemo(() => {
    if (!silsonEnabled || !silsonYear || !silsonMonth || !silsonDay) return '';

    const date = new Date(
      Number(silsonYear),
      Number(silsonMonth) - 1,
      Number(silsonDay)
    );

    if (date <= new Date('2009-09-30')) return '1세대';
    if (date <= new Date('2017-03-31')) return '2세대';
    if (date <= new Date('2021-06-30')) return '3세대';
    if (date <= new Date('2026-04-30')) return '4세대';
    return '5세대';
  }, [silsonEnabled, silsonYear, silsonMonth, silsonDay]);

  return (
    <main style={mainStyle}>
      {/* 상단 */}
      <div style={topBarStyle}>
        <button
          onClick={() => router.push('/new')}
          style={navButtonStyle}
        >
          ← 인적사항
        </button>

        <button
          onClick={() => router.push('/')}
          style={navButtonStyle}
        >
          ⌂ 메인
        </button>
      </div>

      {/* 제목 */}
      <div style={headerCardStyle}>
        <h1 style={{ margin: 0 }}>신규 고객 · 보장분석</h1>
        <p style={headerDescStyle}>
          현재 가입 보장을 입력하여 AI 맞춤 제안서를 작성합니다.
        </p>
      </div>

      <div style={gridStyle}>

        {/* 암 */}
        <Section title='🧬 암 보장'>
          <MoneyInput label='일반암 진단비' />
          <MoneyInput label='유사암 진단비' />
          <MoneyInput label='암통합치료비' />
          <MoneyInput label='비급여 암통합치료비' />
        </Section>

        {/* 뇌·심장 */}
        <Section title='🧠❤️ 뇌 · 심장 보장'>
          <MoneyInput label='뇌혈관진단비' />
          <MoneyInput label='뇌졸중진단비' />
          <MoneyInput label='뇌출혈진단비' />
          <MoneyInput label='허혈성심장질환' />
          <MoneyInput label='급성심근경색' />
          <MoneyInput label='부정맥진단비' />
          <MoneyInput label='순환계치료비' />
        </Section>

        {/* 수술비 */}
        <Section title='🏥 수술비 보장'>
          <MoneyInput label='질병수술비' />
          <MoneyInput label='상해수술비' />
          <MoneyInput label='질병 1~5종 수술비' />
        </Section>

        {/* 실손 */}
        <Section title='💊 실손'>
          <div style={{ display: 'grid', gap: 14 }}>
            <label style={checkboxLabelStyle}>
              <input
                type='checkbox'
                checked={silsonEnabled}
                onChange={(e) => setSilsonEnabled(e.target.checked)}
              />
              실손 가입
            </label>

            {silsonEnabled && (
              <>
                <div>
                  <label style={labelStyle}>실손 가입일</label>

                  <div style={birthGridStyle}>
                    <select
                      value={silsonYear}
                      onChange={(e) => setSilsonYear(e.target.value)}
                      style={inputStyle}
                    >
                      <option value=''>년도</option>
                      {Array.from({ length: 30 }, (_, i) => 2026 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}년
                        </option>
                      ))}
                    </select>

                    <select
                      value={silsonMonth}
                      onChange={(e) => setSilsonMonth(e.target.value)}
                      style={inputStyle}
                    >
                      <option value=''>월</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          {m}월
                        </option>
                      ))}
                    </select>

                    <select
                      value={silsonDay}
                      onChange={(e) => setSilsonDay(e.target.value)}
                      style={inputStyle}
                    >
                      <option value=''>일</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}일
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={generationCardStyle}>
                  <div style={{ color: '#64748b', fontSize: 14 }}>자동 판정</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#2563eb' }}>
                    {silsonGeneration || '-'}
                  </div>
                </div>
              </>
            )}
          </div>
        </Section>

        {/* 운전자보험 */}
        <Section title='🚗 운전자보험'>
          <SelectInput
            label='운전자보험 가입 여부'
            options={['가입', '미가입']}
          />
          <MoneyInput label='교통사고처리지원금' />
          <MoneyInput label='변호사선임비용' />
          <MoneyInput label='벌금' />
        </Section>

        {/* 화재보험 */}
        <Section title='🔥 화재보험'>
          <SelectInput
            label='화재보험 가입 여부'
            options={['가입', '미가입']}
          />
        </Section>

      </div>

      {/* 하단 버튼 */}
      <div style={bottomButtonWrap}>
        <button style={secondaryButtonStyle}>
          임시 저장
        </button>

        <button
          style={primaryButtonStyle}
          onClick={() => router.push('/new/proposal')}
        >
          맞춤 제안서 보기
        </button>
      </div>
    </main>
  );
}

/* 재사용 컴포넌트 */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      <div style={{ display: 'grid', gap: 14 }}>{children}</div>
    </div>
  );
}

function MoneyInput({ label }: { label: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <div style={moneyWrapStyle}>
        <input placeholder='0' style={inputStyle} />
        <span style={unitStyle}>만원</span>
      </div>
    </div>
  );
}

function SelectInput({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>

      <select style={inputStyle}>
        <option>선택</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

/* 스타일 */

const mainStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: 16,
  fontFamily: 'sans-serif',
  background: '#f8fafc',
  minHeight: '100vh',
};

const topBarStyle = {
  display: 'flex',
  gap: 12,
  marginBottom: 20,
  flexWrap: 'wrap' as const,
};

const navButtonStyle = {
  background: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '10px 14px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};

const headerCardStyle = {
  background: 'white',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  marginBottom: 20,
};

const headerDescStyle = {
  color: '#64748b',
  marginTop: 8,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
  gap: 16,
};

const sectionStyle = {
  background: 'white',
  borderRadius: 20,
  padding: 20,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const sectionTitleStyle = {
  margin: '0 0 18px',
  fontSize: 20,
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontSize: 14,
  fontWeight: 600,
  color: '#334155',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid #cbd5e1',
  fontSize: 15,
  background: 'white',
  boxSizing: 'border-box' as const,
};

const moneyWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const unitStyle = {
  color: '#475569',
  fontSize: 14,
  minWidth: 34,
};

const birthGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr 1fr',
  gap: 8,
};

const generationCardStyle = {
  border: '1px solid #dbeafe',
  background: '#eff6ff',
  borderRadius: 16,
  padding: 16,
  textAlign: 'center' as const,
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontWeight: 600,
};

const bottomButtonWrap = {
  display: 'flex',
  gap: 12,
  marginTop: 24,
  flexWrap: 'wrap' as const,
};

const secondaryButtonStyle = {
  flex: 1,
  minWidth: 140,
  background: 'white',
  border: '1px solid #cbd5e1',
  borderRadius: 14,
  padding: '16px 20px',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
};

const primaryButtonStyle = {
  flex: 2,
  minWidth: 220,
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 14,
  padding: '16px 20px',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(37,99,235,0.25)',
};
