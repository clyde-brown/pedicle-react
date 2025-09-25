import React, { useState } from 'react';
import './App.css';
import BodyMap from './BodyMap';

// 데이터 타입 정의
interface PatientData {
  symptoms: {
    selectedAreas: string[];
    areaSymptoms: Record<string, string>; // 부위별 증상 저장
    daysAgo?: number;
    weeksAgo?: number;
    monthsAgo?: number;
    onset?: string;
  };
  physicalExam: {
    isExpanded: boolean;
    data: any;
  };
  xray: {
    images: File[];
    notes: string;
  };
  anatomicalSelection: string[];
  treatment: {
    type: string;
    selected: string[];
    notes: string[];
  };
  chart: string;
  patientReport: string;
}

// Mock 데이터 - 더마톰 매핑 (간단한 신체 부위)
const mockDermatomeMapping: Record<string, string[]> = {
  // 전면
  '머리': ['C1', 'C2'],
  '목': ['C2', 'C3', 'C4'],
  '어깨': ['C5', 'C6'],
  '가슴': ['T2', 'T3', 'T4', 'T5', 'T6'],
  '복부': ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  '허리': ['L1', 'L2', 'L3'],
  '좌팔': ['C6', 'C7', 'C8'],
  '우팔': ['C6', 'C7', 'C8'],
  '좌팔뚝': ['C7', 'C8'],
  '우팔뚝': ['C7', 'C8'],
  '좌손': ['C8'],
  '우손': ['C8'],
  '엉덩이': ['L4', 'L5', 'S1'],
  '좌허벅지': ['L2', 'L3', 'L4'],
  '우허벅지': ['L2', 'L3', 'L4'],
  '좌무릎': ['L3', 'L4'],
  '우무릎': ['L3', 'L4'],
  '좌종아리': ['L4', 'L5', 'S1'],
  '우종아리': ['L4', 'L5', 'S1'],
  '좌발': ['L5', 'S1', 'S2'],
  '우발': ['L5', 'S1', 'S2'],

  // 후면
  '뒤통수': ['C1', 'C2'],
  '목뒤': ['C2', 'C3', 'C4'],
  '어깨뒤': ['C5', 'C6'],
  '등상부': ['T2', 'T3', 'T4', 'T5'],
  '등중부': ['T6', 'T7', 'T8', 'T9'],
  '등하부': ['T10', 'T11', 'T12', 'L1'],
  '좌팔뒤': ['C6', 'C7', 'C8'],
  '우팔뒤': ['C6', 'C7', 'C8'],
  '좌팔뚝뒤': ['C7', 'C8'],
  '우팔뚝뒤': ['C7', 'C8'],
  '엉덩이뒤': ['L4', 'L5', 'S1', 'S2'],
  '좌허벅지뒤': ['S1', 'S2'],
  '우허벅지뒤': ['S1', 'S2'],
  '좌무릎뒤': ['S1', 'S2'],
  '우무릎뒤': ['S1', 'S2'],
  '좌종아리뒤': ['S1', 'S2'],
  '우종아리뒤': ['S1', 'S2'],
  '좌발뒤': ['S1', 'S2'],
  '우발뒤': ['S1', 'S2']
};

const mockDiseases = [
  { code: 'M51.1', name: '요추 추간판 탈출증', dermatomes: ['L4', 'L5', 'S1'], anatomy: ['L4', 'L5', '척립근'] },
  { code: 'M54.5', name: '요통', dermatomes: ['L1', 'L2', 'L3'], anatomy: ['L1', 'L2', 'L3', '광배근', '요방형근'] },
  { code: 'M25.5', name: '관절통', dermatomes: ['L4', 'L5'], anatomy: ['L4', 'L5'] },
  { code: 'M79.3', name: '근막염', dermatomes: ['C5', 'C6', 'C7'], anatomy: ['C5', 'C6', 'C7', '승모근', '능형근'] },
  { code: 'M50.1', name: '경추 추간판 탈출증', dermatomes: ['C6', 'C7'], anatomy: ['C6', 'C7'] },
  { code: 'M53.1', name: '경부 증후군', dermatomes: ['C2', 'C3', 'C4'], anatomy: ['C2', 'C3', 'C4', '승모근'] },
  { code: 'M75.3', name: '어깨 충돌 증후군', dermatomes: ['C5', 'C6'], anatomy: ['견갑골', '상완골', '삼각근'] },
  { code: 'M17.1', name: '슬관절염', dermatomes: ['L3', 'L4'], anatomy: ['슬개골', '대퇴골', '경골'] }
];

const anatomicalStructure = {
  '척추': {
    '경추': {
      '상부 경추': ['C1', 'C2', 'C3'],
      '하부 경추': ['C4', 'C5', 'C6', 'C7']
    },
    '흉추': {
      '상부 흉추': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      '하부 흉추': ['T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    },
    '요추': {
      '상부 요추': ['L1', 'L2', 'L3'],
      '하부 요추': ['L4', 'L5']
    },
    '천추/미추': {
      '천추': ['S1', 'S2', 'S3', 'S4', 'S5'],
      '미추': ['Co1', 'Co2', 'Co3', 'Co4']
    }
  },
  '근육': {
    '목 근육': {
      '심층근': ['승모근', '능형근', '견갑거근'],
      '표층근': ['흉쇄유돌근', '사각근']
    },
    '등 근육': {
      '심층근': ['척립근', '다열근', '회전근'],
      '표층근': ['광배근', '승모근']
    },
    '허리 근육': {
      '심층근': ['요방형근', '장요근', '다열근'],
      '표층근': ['광배근', '대둔근']
    }
  },
  '관절': {
    '상지 관절': {
      '어깨': ['견갑골', '상완골', '쇄골'],
      '팔꿈치': ['상완골', '요골', '척골'],
      '손목': ['요골', '척골', '수근골']
    },
    '하지 관절': {
      '고관절': ['대퇴골', '골반', '비구'],
      '무릎': ['대퇴골', '경골', '슬개골'],
      '발목': ['경골', '비골', '거골']
    }
  }
};

// 신체검사 컴포넌트 (문서에서 제공된 코드 간소화)
const PhysicalExamForm: React.FC = () => {
  const [examData, setExamData] = useState({
    tenderness: [] as string[],
    slr: { 좌: false, 우: false },
    motor: { L4: '5', L5: '5', S1: '5' },
    sensory: { L4: '정상', L5: '정상', S1: '정상' },
    notes: ''
  });

  return (
    <div className="physical-exam-form">
      <h4>Tenderness (압통)</h4>
      <div className="exam-grid">
        {['요추', '흉추', '경추'].map(area => (
          <label key={area}>
            <input
              type="checkbox"
              checked={examData.tenderness.includes(area)}
              onChange={e => {
                const newTenderness = e.target.checked
                  ? [...examData.tenderness, area]
                  : examData.tenderness.filter(t => t !== area);
                setExamData({...examData, tenderness: newTenderness});
              }}
            />
            {area}
          </label>
        ))}
      </div>

      <h4>SLR (하지 직거상 검사)</h4>
      <div className="slr-tests">
        {['좌', '우'].map(side => (
          <label key={side}>
            <input
              type="checkbox"
              checked={examData.slr[side as keyof typeof examData.slr]}
              onChange={e => setExamData({
                ...examData,
                slr: {...examData.slr, [side]: e.target.checked}
              })}
            />
            {side}측 양성
          </label>
        ))}
      </div>

      <h4>Motor (근력)</h4>
      <div className="motor-tests">
        {Object.keys(examData.motor).map(level => (
          <div key={level} className="motor-item">
            <span>{level}:</span>
            <select
              value={examData.motor[level as keyof typeof examData.motor]}
              onChange={e => setExamData({
                ...examData,
                motor: {...examData.motor, [level]: e.target.value}
              })}
            >
              {['0', '1', '2', '3', '4', '5'].map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <h4>메모</h4>
      <textarea
        value={examData.notes}
        onChange={e => setExamData({...examData, notes: e.target.value})}
        placeholder="검사 소견을 입력하세요"
      />
    </div>
  );
};

// 메인 앱 컴포넌트
const App: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    symptoms: {
      selectedAreas: [],
      areaSymptoms: {},
      daysAgo: undefined,
      weeksAgo: undefined,
      monthsAgo: undefined,
      onset: ''
    },
    physicalExam: {
      isExpanded: false,
      data: {}
    },
    xray: {
      images: [],
      notes: ''
    },
    anatomicalSelection: [],
    treatment: {
      type: '',
      selected: [],
      notes: []
    },
    chart: '',
    patientReport: ''
  });

  const [candidateDiseases, setCandidateDiseases] = useState<typeof mockDiseases>([]);
  const [selectedDisease, setSelectedDisease] = useState<typeof mockDiseases[0] | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [diseaseChangeMessage, setDiseaseChangeMessage] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // 바디맵 영역 클릭 핸들러
  const handleBodyMapClick = (area: string) => {
    const isRemoving = patientData.symptoms.selectedAreas.includes(area);
    const newAreas = isRemoving
      ? patientData.symptoms.selectedAreas.filter(a => a !== area)
      : [...patientData.symptoms.selectedAreas, area];

    // 부위 제거 시 해당 증상도 제거
    const newAreaSymptoms = { ...patientData.symptoms.areaSymptoms };
    if (isRemoving) {
      delete newAreaSymptoms[area];
    }

    setPatientData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        selectedAreas: newAreas,
        areaSymptoms: newAreaSymptoms
      }
    }));

    // 더마톰 기반 1차 상병 후보 업데이트
    updateCandidateDiseases(newAreas);
  };

  // 부위별 증상 업데이트 핸들러
  const handleAreaSymptomChange = (area: string, symptom: string) => {
    setPatientData(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        areaSymptoms: {
          ...prev.symptoms.areaSymptoms,
          [area]: symptom
        }
      }
    }));
  };

  const updateCandidateDiseases = (selectedAreas: string[]) => {
    const relevantDermatomes = selectedAreas.flatMap(area => mockDermatomeMapping[area] || []);
    const candidates = mockDiseases.filter(disease =>
      disease.dermatomes.some(d => relevantDermatomes.includes(d))
    );
    setCandidateDiseases(candidates);
  };

  // 치료 옵션 선택 핸들러
  const handleTreatmentSelection = (treatment: string, checked: boolean) => {
    setPatientData(prev => ({
      ...prev,
      treatment: {
        ...prev.treatment,
        selected: checked
          ? [...prev.treatment.selected, treatment]
          : prev.treatment.selected.filter(t => t !== treatment)
      }
    }));
  };

  // 해부학적 부위 선택 핸들러
  const handleAnatomicalSelection = (anatomyPart: string) => {
    const isSelected = patientData.anatomicalSelection.includes(anatomyPart);
    const newSelection = isSelected
      ? patientData.anatomicalSelection.filter(s => s !== anatomyPart)
      : [...patientData.anatomicalSelection, anatomyPart];

    setPatientData(prev => ({
      ...prev,
      anatomicalSelection: newSelection
    }));

    // 해부학적 부위 기반 상병 후보 필터링
    filterDiseasesByAnatomy(newSelection);
  };

  // 해부학적 부위 기반 상병 필터링
  const filterDiseasesByAnatomy = (selectedAnatomy: string[]) => {
    if (selectedAnatomy.length === 0) {
      // 해부학적 부위가 선택되지 않은 경우, 기존 더마톰 기반 필터링만 적용
      updateCandidateDiseases(patientData.symptoms.selectedAreas);
      return;
    }

    const previousCount = candidateDiseases.length;

    // 더마톰 기반 후보 + 해부학적 부위 기반 추가 필터링
    const dermatomeBasedCandidates = candidateDiseases.length > 0 ? candidateDiseases : mockDiseases;
    const anatomyFilteredCandidates = dermatomeBasedCandidates.filter(disease =>
      disease.anatomy.some(anatomy => selectedAnatomy.includes(anatomy))
    );

    setCandidateDiseases(anatomyFilteredCandidates);

    // 후보가 줄어들었을 때 메시지 표시
    if (anatomyFilteredCandidates.length < previousCount && previousCount > 0) {
      setDiseaseChangeMessage(`상병 후보가 ${previousCount}개에서 ${anatomyFilteredCandidates.length}개로 변경되었습니다.`);
      setTimeout(() => setDiseaseChangeMessage(''), 3000); // 3초 후 메시지 사라짐
    }
  };

  // 섹션 토글 핸들러
  const toggleSection = (sectionPath: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionPath]: !prev[sectionPath]
    }));
  };

  const calculateOnsetDate = () => {
    const today = new Date();
    const { daysAgo = 0, weeksAgo = 0, monthsAgo = 0 } = patientData.symptoms;
    const totalDays = daysAgo + (weeksAgo * 7) + (monthsAgo * 30);
    const onsetDate = new Date(today.getTime() - totalDays * 24 * 60 * 60 * 1000);
    return `대략 ${onsetDate.getFullYear()}.${(onsetDate.getMonth() + 1).toString().padStart(2, '0')}.${onsetDate.getDate().toString().padStart(2, '0')}`;
  };

  const updateChart = () => {
    const { selectedAreas, areaSymptoms, onset } = patientData.symptoms;
    const symptomsText = selectedAreas.map(area => {
      const symptom = areaSymptoms[area];
      return symptom ? `${area}: ${symptom}` : area;
    }).join(', ');

    const chartText = `주소: ${symptomsText}
발생일: ${onset || calculateOnsetDate()}
증상: ${symptomsText}
신체검진: ${patientData.physicalExam.isExpanded ? '검사 완료' : '미실시'}
영상검사: ${patientData.xray.images.length > 0 ? 'X-ray 촬영함' : '미실시'}
상병: ${candidateDiseases.length > 0 ? candidateDiseases[0].name : '미결정'}`;

    setPatientData(prev => ({ ...prev, chart: chartText }));
  };

  // 실시간 차트 업데이트
  React.useEffect(() => {
    updateChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData.symptoms, patientData.physicalExam, patientData.xray, candidateDiseases]);

  const generatePatientReport = () => {
    const { selectedAreas, areaSymptoms } = patientData.symptoms;

    // 선택된 상병이 있으면 우선 사용, 없으면 첫 번째 후보 사용
    const finalDiagnosis = selectedDisease || candidateDiseases[0];
    const diagnosis = finalDiagnosis?.name || '추가 검사 필요';
    const diagnosisCode = finalDiagnosis?.code || '';

    let symptomsText = '';
    if (selectedAreas.length > 0) {
      symptomsText = selectedAreas.map(area => {
        const symptom = areaSymptoms[area];
        return symptom ? `${area} 부위의 ${symptom}` : `${area} 부위`;
      }).join(', ');
    } else {
      symptomsText = '증상 입력 필요';
    }

    let anatomicalText = '';
    if (patientData.anatomicalSelection.length > 0) {
      anatomicalText = `
판독 결과 (해부학적 부위):
${patientData.anatomicalSelection.join(', ')}`;
    }

    let examText = '';
    if (patientData.physicalExam.isExpanded) {
      examText = `
신체검사: 실시됨`;
    }

    let imagingText = '';
    if (patientData.xray.images.length > 0) {
      imagingText = `
영상검사: X-ray 촬영 (${patientData.xray.images.length}장)`;
    }

    let treatmentText = '';
    if (patientData.treatment.selected.length > 0) {
      const treatmentPrecautions = {
        '스테로이드 주사': '항염 효과, 금주 필요',
        '신경차단술': '통증 완화, 감염 주의',
        'NSAIDs': '위장관 부작용 주의',
        '근이완제': '졸음 유발 가능'
      };

      treatmentText = `

처방된 치료:
${patientData.treatment.selected.map(treatment => {
        const precaution = treatmentPrecautions[treatment as keyof typeof treatmentPrecautions];
        return `- ${treatment}${precaution ? ` (${precaution})` : ''}`;
      }).join('\n')}`;
    }

    // 상병 후보 목록 추가 (선택된 것이 있을 때)
    let candidatesText = '';
    if (candidateDiseases.length > 1) {
      candidatesText = `

기타 고려된 상병:
${candidateDiseases.filter(d => d.code !== diagnosisCode).map(d => `${d.code} - ${d.name}`).join('\n')}`;
    }

    return `안녕하세요. 오늘 진료 결과를 알려드립니다.

증상: ${symptomsText}${anatomicalText}${examText}${imagingText}${treatmentText}

진단: ${diagnosisCode ? `${diagnosisCode} - ` : ''}${diagnosis}${candidatesText}

주의사항:
- 처방받은 약물 복용 시 주의사항을 지켜주세요
- 증상 악화 시 즉시 내원하시기 바랍니다
- 정기 검진 일정을 지켜주세요

감사합니다.`;
  };

  return (
    <div className="app">
      <div className="container">
        {/* 왼쪽 사이드바 */}
        <div className="sidebar">
          <div className="patient-info">
            <h3>환자 기본 정보</h3>
            <div className="info-content">
              <div className="patient-details">
                <div className="info-item">
                  <span className="info-label">이름:</span>
                  <span className="info-value">김길동</span>
                </div>
                <div className="info-item">
                  <span className="info-label">생년월일:</span>
                  <span className="info-value">95년 12월 4일</span>
                </div>
                <div className="info-item">
                  <span className="info-label">성별:</span>
                  <span className="info-value">남성</span>
                </div>
                <div className="info-item">
                  <span className="info-label">연락처:</span>
                  <span className="info-value">010-1234-5678</span>
                </div>
              </div>

              <div className="visit-history">
                <h4>내원이력 (5건)</h4>
                <div className="visit-list">
                  <div className="visit-item">2024.09.15 - 요통</div>
                  <div className="visit-item">2024.08.22 - 목 통증</div>
                  <div className="visit-item">2024.07.10 - 어깨 결림</div>
                  <div className="visit-item">2024.06.05 - 무릎 통증</div>
                  <div className="visit-item">2024.05.18 - 허리 디스크</div>
                </div>
              </div>

              <div className="patient-characteristics">
                <h4>특이사항</h4>
                <div className="characteristics-list">
                  <div className="char-item">• 고혈압 (약물치료 중)</div>
                  <div className="char-item">• 당뇨병 없음</div>
                  <div className="char-item">• 흡연: 금연 (2년전)</div>
                  <div className="char-item">• 음주: 주 1-2회</div>
                  <div className="char-item">• 알레르기: 페니실린</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="main-content">
          {/* 상단 영역 - 바디맵과 증상 입력 */}
          <div className="top-section">
            <div className="body-map-section">
              <h3>바디맵</h3>
              <BodyMap
                selectedAreas={patientData.symptoms.selectedAreas}
                onAreaClick={handleBodyMapClick}
              />
            </div>

            <div className="symptom-input-section">
              <div className="date-input">
                <h4>증상 발현 일자</h4>
                <div className="date-input-container">
                  <div className="date-spinners">
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        value={patientData.symptoms.daysAgo || ''}
                        onChange={e => setPatientData(prev => ({
                          ...prev,
                          symptoms: { ...prev.symptoms, daysAgo: Number(e.target.value) || 0 }
                        }))}
                      />
                      <span>일전</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        value={patientData.symptoms.weeksAgo || ''}
                        onChange={e => setPatientData(prev => ({
                          ...prev,
                          symptoms: { ...prev.symptoms, weeksAgo: Number(e.target.value) || 0 }
                        }))}
                      />
                      <span>주전</span>
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="0"
                        value={patientData.symptoms.monthsAgo || ''}
                        onChange={e => setPatientData(prev => ({
                          ...prev,
                          symptoms: { ...prev.symptoms, monthsAgo: Number(e.target.value) || 0 }
                        }))}
                      />
                      <span>달전</span>
                    </div>
                  </div>
                  <button
                    className="date-confirm-btn"
                    onClick={() => setPatientData(prev => ({
                      ...prev,
                      symptoms: { ...prev.symptoms, onset: calculateOnsetDate() }
                    }))}
                  >
                    확인
                  </button>
                </div>
                {patientData.symptoms.onset && (
                  <p className="onset-display">{patientData.symptoms.onset}</p>
                )}
              </div>

              <div className="body-parts-symptoms">
                <h4>부위 및 증상</h4>
                {patientData.symptoms.selectedAreas.length === 0 ? (
                  <p className="no-selection">바디맵에서 부위를 선택해주세요</p>
                ) : (
                  <div className="area-symptoms-list">
                    {patientData.symptoms.selectedAreas.map(area => (
                      <div key={area} className="area-symptom-item">
                        <div className="area-header">
                          <span className="area-name">{area}</span>
                          <button
                            className="remove-area-btn"
                            onClick={() => handleBodyMapClick(area)}
                            title="부위 제거"
                          >
                            ×
                          </button>
                        </div>
                        <textarea
                          className="area-symptom-input"
                          placeholder={`${area} 부위의 증상을 입력하세요 (예: 찌르는 통증, 저림, 둔통 등)`}
                          value={patientData.symptoms.areaSymptoms[area] || ''}
                          onChange={e => handleAreaSymptomChange(area, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 신체검사 기록 섹션 */}
          <div className="physical-exam-section">
            <div className="section-header" onClick={() => setPatientData(prev => ({
              ...prev,
              physicalExam: { ...prev.physicalExam, isExpanded: !prev.physicalExam.isExpanded }
            }))}>
              <h3>신체 검사 기록</h3>
              <span className="toggle">{patientData.physicalExam.isExpanded ? '▼' : '▶'}</span>
            </div>
            {patientData.physicalExam.isExpanded && (
              <div className="exam-content">
                <PhysicalExamForm />
              </div>
            )}
            {!patientData.physicalExam.isExpanded && Object.keys(patientData.physicalExam.data).length > 0 && (
              <div className="exam-summary">
                <p>검사 완료 - 요약: Tenderness(+), SLR 양성</p>
              </div>
            )}
          </div>

          {/* X-Ray 업로드 섹션 */}
          <div className="xray-section">
            <h3>X-ray 업로드</h3>
            <div className="xray-upload">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => {
                  const files = Array.from(e.target.files || []);
                  setPatientData(prev => ({
                    ...prev,
                    xray: { ...prev.xray, images: [...prev.xray.images, ...files] }
                  }));
                }}
              />
              <div className="xray-thumbnails">
                {patientData.xray.images.map((file, index) => (
                  <div key={index} className="xray-thumbnail">
                    <img src={URL.createObjectURL(file)} alt={`X-ray ${index + 1}`} />
                    <p>{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 판독, 해부학적 부위 선택 */}
          <div className="anatomical-selection-section">
            <h3>판독, 해부학적 부위 선택</h3>

            {/* 상병 변경 알림 메시지 */}
            {diseaseChangeMessage && (
              <div className="disease-change-notification">
                <span className="notification-icon">ℹ️</span>
                <span className="notification-text">{diseaseChangeMessage}</span>
              </div>
            )}

            <div className="anatomical-tree">
              {Object.entries(anatomicalStructure).map(([mainArea, subAreas]) => (
                <div key={mainArea} className="anatomical-group">
                  <div
                    className="anatomical-main-header"
                    onClick={() => toggleSection(mainArea)}
                  >
                    <span className="toggle-icon">
                      {expandedSections[mainArea] ? '▼' : '▶'}
                    </span>
                    <h4>{mainArea}</h4>
                  </div>

                  {expandedSections[mainArea] && (
                    <div className="anatomical-main-content">
                      {Object.entries(subAreas).map(([subArea, items]) => (
                        <div key={subArea} className="anatomical-subgroup">
                          <div
                            className="anatomical-sub-header"
                            onClick={() => toggleSection(`${mainArea}-${subArea}`)}
                          >
                            <span className="toggle-icon">
                              {expandedSections[`${mainArea}-${subArea}`] ? '▼' : '▶'}
                            </span>
                            <h5>{subArea}</h5>
                          </div>

                          {expandedSections[`${mainArea}-${subArea}`] && (
                            <div className="anatomical-sub-content">
                              {Array.isArray(items) ? (
                                items.map(item => (
                                  <label key={item} className="anatomical-item">
                                    <input
                                      type="checkbox"
                                      checked={patientData.anatomicalSelection.includes(item)}
                                      onChange={() => handleAnatomicalSelection(item)}
                                    />
                                    <span className="anatomical-label">{item}</span>
                                  </label>
                                ))
                              ) : (
                                Object.entries(items).map(([subSubArea, subItems]) => (
                                  <div key={subSubArea} className="anatomical-subsub-group">
                                    <div
                                      className="anatomical-subsub-header"
                                      onClick={() => toggleSection(`${mainArea}-${subArea}-${subSubArea}`)}
                                    >
                                      <span className="toggle-icon">
                                        {expandedSections[`${mainArea}-${subArea}-${subSubArea}`] ? '▼' : '▶'}
                                      </span>
                                      <h6>{subSubArea}</h6>
                                    </div>

                                    {expandedSections[`${mainArea}-${subArea}-${subSubArea}`] && (
                                      <div className="anatomical-subsub-content">
                                        {(subItems as string[]).map(item => (
                                          <label key={item} className="anatomical-item">
                                            <input
                                              type="checkbox"
                                              checked={patientData.anatomicalSelection.includes(item)}
                                              onChange={() => handleAnatomicalSelection(item)}
                                            />
                                            <span className="anatomical-label">{item}</span>
                                          </label>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 선택된 해부학적 부위 표시 */}
            {patientData.anatomicalSelection.length > 0 && (
              <div className="selected-anatomy-summary">
                <h4>선택된 해부학적 부위 ({patientData.anatomicalSelection.length}개)</h4>
                <div className="selected-anatomy-tags">
                  {patientData.anatomicalSelection.map(item => (
                    <span key={item} className="anatomy-tag">
                      {item}
                      <button
                        className="remove-anatomy-btn"
                        onClick={() => handleAnatomicalSelection(item)}
                        title="제거"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 치료 및 처방 주의사항 */}
          <div className="treatment-section">
            <h3>치료 및 처방 주의사항</h3>
            <div className="treatment-types">
              {['수술', '시술', '주사', '처방'].map(type => (
                <button
                  key={type}
                  className={`treatment-type ${patientData.treatment.type === type ? 'selected' : ''}`}
                  onClick={() => setPatientData(prev => ({
                    ...prev,
                    treatment: { ...prev.treatment, type }
                  }))}
                >
                  {type}
                </button>
              ))}
            </div>
            {patientData.treatment.type && (
              <div className="treatment-options">
                <h4>{patientData.treatment.type} 옵션</h4>
                <div className="treatment-list">
                  {patientData.treatment.type === '주사' && (
                    <>
                      <div className="treatment-option">
                        <input
                          type="checkbox"
                          id="steroid"
                          checked={patientData.treatment.selected.includes('스테로이드 주사')}
                          onChange={(e) => handleTreatmentSelection('스테로이드 주사', e.target.checked)}
                        />
                        <label htmlFor="steroid">스테로이드 주사 - 항염 효과, 금주 필요</label>
                      </div>
                      <div className="treatment-option">
                        <input
                          type="checkbox"
                          id="nerve-block"
                          checked={patientData.treatment.selected.includes('신경차단술')}
                          onChange={(e) => handleTreatmentSelection('신경차단술', e.target.checked)}
                        />
                        <label htmlFor="nerve-block">신경차단술 - 통증 완화, 감염 주의</label>
                      </div>
                    </>
                  )}
                  {patientData.treatment.type === '처방' && (
                    <>
                      <div className="treatment-option">
                        <input
                          type="checkbox"
                          id="nsaid"
                          checked={patientData.treatment.selected.includes('NSAIDs')}
                          onChange={(e) => handleTreatmentSelection('NSAIDs', e.target.checked)}
                        />
                        <label htmlFor="nsaid">NSAIDs - 위장관 부작용 주의</label>
                      </div>
                      <div className="treatment-option">
                        <input
                          type="checkbox"
                          id="muscle-relaxant"
                          checked={patientData.treatment.selected.includes('근이완제')}
                          onChange={(e) => handleTreatmentSelection('근이완제', e.target.checked)}
                        />
                        <label htmlFor="muscle-relaxant">근이완제 - 졸음 유발 가능</label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="right-sidebar">
          <div className="disease-candidates">
            <div className="candidates-header">
              <h3>상병 후보</h3>
              <button
                className="select-button"
                disabled={!selectedDisease}
                onClick={() => {
                  if (selectedDisease) {
                    alert(`선택된 상병: ${selectedDisease.code} - ${selectedDisease.name}`);
                  }
                }}
              >
                선택
              </button>
            </div>
            <div className="candidates-list">
              {candidateDiseases.map(disease => (
                <div
                  key={disease.code}
                  className={`candidate-item ${selectedDisease?.code === disease.code ? 'selected' : ''}`}
                  onClick={() => setSelectedDisease(disease)}
                >
                  <div className="candidate-main">
                    <span className="disease-code">{disease.code}</span>
                    <span className="disease-name">{disease.name}</span>
                  </div>
                  <div className="candidate-dermatomes">
                    관련 더마톰: {disease.dermatomes.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            {selectedDisease && (
              <div className="selected-disease-info">
                <h4>선택된 상병</h4>
                <div className="selected-info">
                  <strong>{selectedDisease.code}</strong> - {selectedDisease.name}
                  <br />
                  <small>더마톰: {selectedDisease.dermatomes.join(', ')}</small>
                </div>
              </div>
            )}
          </div>

          <div className="real-time-chart">
            <h3>실시간 환자 차팅</h3>
            <div className="chart-content">
              <h4>부위별 증상</h4>
              {patientData.symptoms.selectedAreas.length === 0 ? (
                <p>미선택</p>
              ) : (
                <div className="chart-symptoms">
                  {patientData.symptoms.selectedAreas.map(area => (
                    <div key={area} className="chart-symptom-item">
                      <strong>{area}:</strong>{' '}
                      {patientData.symptoms.areaSymptoms[area] || '증상 미입력'}
                    </div>
                  ))}
                </div>
              )}

              <h4>해부학적 부위</h4>
              {patientData.anatomicalSelection.length === 0 ? (
                <p>미선택</p>
              ) : (
                <div className="chart-anatomy">
                  {patientData.anatomicalSelection.map(anatomy => (
                    <div key={anatomy} className="chart-anatomy-item">
                      <span className="anatomy-label">{anatomy}</span>
                    </div>
                  ))}
                </div>
              )}

              <h4>상병</h4>
              <p>{(selectedDisease || candidateDiseases[0])?.name || '미결정'}</p>
              {(selectedDisease || candidateDiseases[0]) && (
                <p className="disease-code">
                  {(selectedDisease || candidateDiseases[0])?.code}
                </p>
              )}

              <h4>치료 방법</h4>
              {patientData.treatment.selected.length === 0 ? (
                <p>미선택</p>
              ) : (
                <div className="chart-treatment">
                  {patientData.treatment.selected.map(treatment => (
                    <div key={treatment} className="chart-treatment-item">
                      <span className="treatment-label">{treatment}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="patient-report">
            <h3>설명서 발송</h3>
            <div className="report-content">
              <textarea
                placeholder="환자 친화적 설명서가 자동 생성됩니다"
                value={generatePatientReport()}
                onChange={e => setPatientData(prev => ({
                  ...prev,
                  patientReport: e.target.value
                }))}
              />
              <div className="report-actions">
                <button onClick={() => setShowPreview(true)}>미리보기</button>
                <button>PDF 내보내기</button>
                <button>SMS 전송</button>
                <button>이메일 전송</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 미리보기 모달 */}
      {showPreview && (
        <div className="preview-modal" onClick={() => setShowPreview(false)}>
          <div className="preview-content" onClick={e => e.stopPropagation()}>
            <div className="preview-header">
              <h3>설명서 미리보기</h3>
              <button className="close-btn" onClick={() => setShowPreview(false)}>×</button>
            </div>
            <div className="preview-body">
              <pre>{generatePatientReport()}</pre>
            </div>
            <div className="preview-footer">
              <button onClick={() => setShowPreview(false)}>닫기</button>
              <button>PDF 내보내기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;