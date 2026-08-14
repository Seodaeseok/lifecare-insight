'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Child = {
  id: number;
  name: string;
};

function BirthSelects() {
  const years = Array.from({ length: 80 }, (_, i) => 2026 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={birthGridStyle}>
      <select style={inputStyle}>
        <option>년도</option>
        {years.map((y) => (
          <option key={y}>{y}년</option>
        ))}
      </select>

      <select style={inputStyle}>
        <option>월</option>
        {months.map((m) => (
          <option key={m}>{m}월</option>
        ))}
      </select>

      <select style={inputStyle}>
        <option>일</option>
        {days.map((d) => (
          <option key={d}>{d}일</option>
        ))}
      </select>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const [spouseEnabled, setSpouseEnabled] = useState(false);
  const [childrenEnabled, setChildrenEnabled] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);

  const addChild = () => {
    setChildren([...children, { id: Date.now(), name: '' }]);
  };

  const updateChild = (id: number, value: string) => {
    setChildren(
      children.map((child) =>
        child.id === id ? { ...child, name: value } : child
      )
    );
  };

  const removeChild = (id: number) => {
    setChildren(children.filter((child) => child.id !== id));
  };

  return (
    <main style={mainStyle}>
      <div style={topBarStyle}>
        <button
          onClick={() => router.push('/')}
          style={backButtonStyle}
        >
          ← 메인으로
        </button>
      </div>

      <div style={headerCardStyle}>
        <h1 style={{ margin: 0 }}>LifeCare Insight</h1>
        <p style={{ color: '#475569', marginTop: 8 }}>
          신규 고객 상담 및 맞춤 제안서 작성
        </p>
      </div>

      {/* 고객 인적사항 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>👤</span>
          <div>
            <h2 style={sectionTitleStyle}>고객 인적사항</h2>
            <p style={requiredTextStyle}>* 표시 항목은 필수 입력입니다.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          <div>
            <label style={requiredLabelStyle}>성함 *</label>
            <input placeholder='예: 김민수' style={inputStyle} />
          </div>

          <div>
            <label style={requiredLabelStyle}>생년월일 *</label>
            <BirthSelects />
          </div>

          <div>
            <label style={requiredLabelStyle}>휴대전화 *</label>
            <input
              placeholder='010-1234-5678'
              style={inputStyle}
              inputMode='tel'
            />
          </div>

          <div>
            <label style={requiredLabelStyle}>직업 *</label>
            <input
              placeholder='회사원, 자영업, 공무원 등'
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>거주 지역 (선택)</label>
            <div style={birthGridStyle}>
              <select style={inputStyle}>
                <option>시/도</option>
                <option>서울</option>
                <option>경기</option>
                <option>인천</option>
                <option>전북</option>
                <option>전남</option>
                <option>충남</option>
                <option>충북</option>
                <option>부산</option>
                <option>대구</option>
                <option>광주</option>
                <option>대전</option>
                <option>울산</option>
                <option>강원</option>
                <option>경북</option>
                <option>경남</option>
                <option>제주</option>
              </select>

              <input placeholder='시/군/구' style={inputStyle} />
              <div />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <label style={requiredLabelStyle}>결혼 여부 *</label>
          <div style={radioGroupStyle}>
            <label style={radioLabelStyle}>
              <input type='radio' name='marital' /> 미혼
            </label>

            <label style={radioLabelStyle}>
              <input type='radio' name='marital' /> 기혼
            </label>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <label style={requiredLabelStyle}>운전 여부 *</label>
          <div style={radioGroupColumnStyle}>
            <label style={radioLabelStyle}>
              <input type='radio' name='driving' /> 운전 안 함
            </label>

            <label style={radioLabelStyle}>
              <input type='radio' name='driving' /> 자가용 운전
            </label>

            <label style={radioLabelStyle}>
              <input type='radio' name='driving' /> 영업용 운전
            </label>
          </div>
        </div>
      </div>

      {/* 배우자 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>❤️</span>
          <h2 style={sectionTitleStyle}>배우자 (선택)</h2>
        </div>

        <label style={checkboxLabelStyle}>
          <input
            type='checkbox'
            checked={spouseEnabled}
            onChange={(e) => setSpouseEnabled(e.target.checked)}
          />
          배우자 정보 입력
        </label>

        {spouseEnabled && (
          <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>배우자 성함</label>
              <input placeholder='예: 이지은' style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>생년월일</label>
              <BirthSelects />
            </div>
          </div>
        )}
      </div>

      {/* 자녀 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>👶</span>
          <h2 style={sectionTitleStyle}>자녀 정보 (선택)</h2>
        </div>

        <label style={checkboxLabelStyle}>
          <input
            type='checkbox'
            checked={childrenEnabled}
            onChange={(e) => {
              setChildrenEnabled(e.target.checked);

              if (e.target.checked && children.length === 0) {
                setChildren([{ id: Date.now(), name: '' }]);
              }

              if (!e.target.checked) {
                setChildren([]);
              }
            }}
          />
          자녀 정보 입력
        </label>

        {childrenEnabled && (
          <div style={{ marginTop: 16 }}>
            <div style={sectionHeaderBetween}>
              <div />

              <button onClick={addChild} style={addButtonStyle}>
                + 자녀 추가
              </button>
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {children.map((child, index) => (
                <div key={child.id} style={childCardStyle}>
                  <div style={childHeaderStyle}>
                    <h3 style={{ margin: 0 }}>자녀 {index + 1}</h3>

                    {children.length > 1 && (
                      <button
                        onClick={() => removeChild(child.id)}
                        style={removeButtonStyle}
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>자녀 성함</label>
                      <input
                        value={child.name}
                        onChange={(e) =>
                          updateChild(child.id, e.target.value)
                        }
                        placeholder='예: 김채하'
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>생년월일</label>
                      <BirthSelects />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 가족력 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>🧬</span>
          <h2 style={sectionTitleStyle}>가족력 (선택)</h2>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <label><input type='checkbox' /> 부모·형제 중 암 병력</label>
          <label><input type='checkbox' /> 부모·형제 중 뇌혈관질환</label>
          <label><input type='checkbox' /> 부모·형제 중 심장질환</label>
          <label><input type='checkbox' /> 부모 중 치매 병력</label>
        </div>
      </div>

      {/* 관심 분야 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>🎯</span>
          <h2 style={sectionTitleStyle}>관심 분야 (선택)</h2>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <label><input type='checkbox' /> 암 보장 강화</label>
          <label><input type='checkbox' /> 수술비 중심 보장</label>
          <label><input type='checkbox' /> 실손 보완</label>
          <label><input type='checkbox' /> 종신보험</label>
          <label><input type='checkbox' /> 연금 준비</label>
          <label><input type='checkbox' /> 상속·증여</label>
          <label><input type='checkbox' /> 간병·치매 준비</label>
        </div>
      </div>

      {/* 개인정보 동의 */}
      <div style={sectionCardStyle}>
        <div style={sectionTitleRow}>
          <span style={emojiStyle}>🔒</span>
          <h2 style={sectionTitleStyle}>개인정보 수집·이용 동의 (필수)</h2>
        </div>

        <div style={privacyBoxStyle}>
          <p style={{ marginTop: 0, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
{`수집 목적: 보험 상담, 보장분석, 맞춤 제안서 작성 및 상담 기록 관리

수집 항목: 성명, 생년월일, 휴대전화번호, 직업, 결혼 여부, 운전 여부 및 고객이 제공한 가족·보험 정보

보유 기간: 상담 종료 후 3년 또는 고객 요청 시 삭제`}
          </p>
        </div>

        <label style={{ ...checkboxLabelStyle, marginTop: 16 }}>
          <input type='checkbox' />
          고객으로부터 개인정보 수집·이용에 대한 설명을 하고 동의를 받았습니다. *
        </label>
      </div>

      <button 
        style={submitButtonStyle}
        onClick={() => router.push('/new/coverage')} 
      >
        다 음 : 보장분석
      </button>
    </main>
  );
}

/* styles */

const mainStyle = {
  maxWidth: 900,
  margin: '0 auto',
  padding: 16,
  fontFamily: 'sans-serif',
  background: '#f8fafc',
  minHeight: '100vh',
};

const topBarStyle = {
  marginBottom: 16,
};

const backButtonStyle = {
  background: 'white',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '10px 14px',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
  color: '#0f172a',
};

const headerCardStyle = {
  background: 'white',
  padding: 24,
  borderRadius: 20,
  marginBottom: 20,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const sectionCardStyle = {
  background: 'white',
  padding: 20,
  borderRadius: 20,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  marginBottom: 20,
};

const sectionTitleRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 16,
};

const sectionHeaderBetween = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  flexWrap: 'wrap' as const,
  gap: 12,
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: 22,
};

const requiredTextStyle = {
  margin: '4px 0 0',
  color: '#ef4444',
  fontSize: 13,
};

const emojiStyle = {
  fontSize: 24,
};

const birthGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr 1fr',
  gap: 8,
  marginTop: 6,
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  marginTop: 6,
  borderRadius: 12,
  border: '1px solid #cbd5e1',
  fontSize: 14,
  boxSizing: 'border-box' as const,
  background: 'white',
  height: 48,
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: '#334155',
};

const requiredLabelStyle = {
  fontSize: 14,
  fontWeight: 700,
  color: '#0f172a',
};

const radioGroupStyle = {
  display: 'flex',
  gap: 20,
  marginTop: 10,
  flexWrap: 'wrap' as const,
};

const radioGroupColumnStyle = {
  display: 'grid',
  gap: 10,
  marginTop: 10,
};

const radioLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const childCardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 16,
  padding: 16,
  background: '#fafafa',
};

const childHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
};

const addButtonStyle = {
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 10,
  padding: '10px 14px',
  fontWeight: 600,
  cursor: 'pointer',
};

const removeButtonStyle = {
  background: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '8px 12px',
  cursor: 'pointer',
};

const privacyBoxStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: 14,
  padding: 16,
  background: '#f8fafc',
  color: '#334155',
  fontSize: 14,
};

const submitButtonStyle = {
  width: '100%',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: 14,
  padding: '16px 20px',
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 10px 20px rgba(37,99,235,0.25)',
};
