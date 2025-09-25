import React, { useState } from 'react';
import './App.css';

// 데이터 타입 정의
interface PatientData {
  symptoms: {
    selectedAreas: string[];
    symptomDescription: string;
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

// Mock 데이터
const mockDermatomeMapping: Record<string, string[]> = {
  '목': ['C5', 'C6', 'C7', 'C8'],
  '어깨': ['C5', 'C6'],
  '팔': ['C6', 'C7', 'C8'],
  '가슴': ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
  '복부': ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  '허리': ['L1', 'L2', 'L3'],
  '엉덩이': ['L4', 'L5', 'S1'],
  '허벅지': ['L2', 'L3', 'L4'],
  '종아리': ['L4', 'L5', 'S1'],
  '발': ['L5', 'S1', 'S2']
};

const mockDiseases = [
  { code: 'M51.1', name: '요추 추간판 탈출증', dermatomes: ['L4', 'L5', 'S1'] },
  { code: 'M54.5', name: '요통', dermatomes: ['L1', 'L2', 'L3'] },
  { code: 'M25.5', name: '관절통', dermatomes: ['L4', 'L5'] },
  { code: 'M79.3', name: '근막염', dermatomes: ['C5', 'C6', 'C7'] }
];

const anatomicalStructure = {
  '허리': {
    '척추': {
      '요추': ['L1', 'L2', 'L3', 'L4', 'L5']
    },
    '근육': ['척립근', '광배근', '요방형근']
  },
  '목': {
    '척추': {
      '경추': ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
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
      symptomDescription: '',
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

  // 바디맵 영역 클릭 핸들러
  const handleBodyMapClick = (area: string) => {
    const newAreas = patientData.symptoms.selectedAreas.includes(area)
      ? patientData.symptoms.selectedAreas.filter(a => a !== area)
      : [...patientData.symptoms.selectedAreas, area];

    setPatientData(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, selectedAreas: newAreas }
    }));

    // 더마톰 기반 1차 상병 후보 업데이트
    updateCandidateDiseases(newAreas);
  };

  const updateCandidateDiseases = (selectedAreas: string[]) => {
    const relevantDermatomes = selectedAreas.flatMap(area => mockDermatomeMapping[area] || []);
    const candidates = mockDiseases.filter(disease =>
      disease.dermatomes.some(d => relevantDermatomes.includes(d))
    );
    setCandidateDiseases(candidates);
  };

  const calculateOnsetDate = () => {
    const today = new Date();
    const { daysAgo = 0, weeksAgo = 0, monthsAgo = 0 } = patientData.symptoms;
    const totalDays = daysAgo + (weeksAgo * 7) + (monthsAgo * 30);
    const onsetDate = new Date(today.getTime() - totalDays * 24 * 60 * 60 * 1000);
    return `대략 ${onsetDate.getFullYear()}.${(onsetDate.getMonth() + 1).toString().padStart(2, '0')}.${onsetDate.getDate().toString().padStart(2, '0')}`;
  };

  const updateChart = () => {
    const { selectedAreas, symptomDescription, onset } = patientData.symptoms;
    const chartText = `주소: ${selectedAreas.join(', ')} 부위 ${symptomDescription}
발생일: ${onset || calculateOnsetDate()}
증상: ${symptomDescription}
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
    const areas = patientData.symptoms.selectedAreas.join(', ') || '미선택';
    const symptoms = patientData.symptoms.symptomDescription || '미입력';
    const diagnosis = candidateDiseases[0]?.name || '추가 검사 필요';

    return `안녕하세요. 오늘 진료 결과를 알려드립니다.

증상: ${areas} 부위의 ${symptoms}
진단: ${diagnosis}

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
              <p>내원이력 등</p>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="main-content">
          {/* 상단 영역 - 바디맵과 증상 입력 */}
          <div className="top-section">
            <div className="body-map-section">
              <div className="body-map">
                <h3>바디맵</h3>
                <div className="body-diagram">
                  {Object.keys(mockDermatomeMapping).map(area => (
                    <button
                      key={area}
                      className={`body-part ${patientData.symptoms.selectedAreas.includes(area) ? 'selected' : ''}`}
                      onClick={() => handleBodyMapClick(area)}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="symptom-input-section">
              <div className="date-input">
                <h4>일자</h4>
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
                <button onClick={() => setPatientData(prev => ({
                  ...prev,
                  symptoms: { ...prev.symptoms, onset: calculateOnsetDate() }
                }))}>
                  확인
                </button>
                {patientData.symptoms.onset && (
                  <p className="onset-display">{patientData.symptoms.onset}</p>
                )}
              </div>

              <div className="body-parts">
                <h4>부위</h4>
                <div className="selected-parts">
                  {patientData.symptoms.selectedAreas.map(area => (
                    <span key={area} className="selected-part">{area}</span>
                  ))}
                </div>
              </div>

              <div className="symptoms">
                <h4>증상</h4>
                <textarea
                  placeholder="증상을 입력하세요"
                  value={patientData.symptoms.symptomDescription}
                  onChange={e => setPatientData(prev => ({
                    ...prev,
                    symptoms: { ...prev.symptoms, symptomDescription: e.target.value }
                  }))}
                />
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
            <div className="anatomical-tree">
              {Object.entries(anatomicalStructure).map(([mainArea, subAreas]) => (
                <div key={mainArea} className="anatomical-group">
                  <h4>{mainArea}</h4>
                  {Object.entries(subAreas).map(([subArea, items]) => (
                    <div key={subArea} className="anatomical-subgroup">
                      <h5>{subArea}</h5>
                      {Array.isArray(items) ? (
                        items.map(item => (
                          <label key={item}>
                            <input
                              type="checkbox"
                              checked={patientData.anatomicalSelection.includes(item)}
                              onChange={e => {
                                const newSelection = e.target.checked
                                  ? [...patientData.anatomicalSelection, item]
                                  : patientData.anatomicalSelection.filter(s => s !== item);
                                setPatientData(prev => ({
                                  ...prev,
                                  anatomicalSelection: newSelection
                                }));
                              }}
                            />
                            {item}
                          </label>
                        ))
                      ) : (
                        Object.entries(items).map(([subSubArea, subItems]) => (
                          <div key={subSubArea}>
                            <h6>{subSubArea}</h6>
                            {(subItems as string[]).map(item => (
                              <label key={item}>
                                <input
                                  type="checkbox"
                                  checked={patientData.anatomicalSelection.includes(item)}
                                  onChange={e => {
                                    const newSelection = e.target.checked
                                      ? [...patientData.anatomicalSelection, item]
                                      : patientData.anatomicalSelection.filter(s => s !== item);
                                    setPatientData(prev => ({
                                      ...prev,
                                      anatomicalSelection: newSelection
                                    }));
                                  }}
                                />
                                {item}
                              </label>
                            ))}
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
                        <input type="checkbox" id="steroid" />
                        <label htmlFor="steroid">스테로이드 주사 - 항염 효과, 금주 필요</label>
                      </div>
                      <div className="treatment-option">
                        <input type="checkbox" id="nerve-block" />
                        <label htmlFor="nerve-block">신경차단술 - 통증 완화, 감염 주의</label>
                      </div>
                    </>
                  )}
                  {patientData.treatment.type === '처방' && (
                    <>
                      <div className="treatment-option">
                        <input type="checkbox" id="nsaid" />
                        <label htmlFor="nsaid">NSAIDs - 위장관 부작용 주의</label>
                      </div>
                      <div className="treatment-option">
                        <input type="checkbox" id="muscle-relaxant" />
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
              <button className="select-button">선택</button>
            </div>
            <div className="candidates-list">
              {candidateDiseases.map(disease => (
                <div key={disease.code} className="candidate-item">
                  <h4>{disease.name}</h4>
                  <p>{disease.code}</p>
                  <small>관련 더마톰: {disease.dermatomes.join(', ')}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="real-time-chart">
            <h3>실시간 환자 차팅</h3>
            <div className="chart-content">
              <h4>부위</h4>
              <p>{patientData.symptoms.selectedAreas.join(', ') || '미선택'}</p>
              <h4>증상</h4>
              <p>{patientData.symptoms.symptomDescription || '미입력'}</p>
              <h4>상병</h4>
              <p>{candidateDiseases[0]?.name || '미결정'}</p>
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
                <button>PDF 내보내기</button>
                <button>SMS 전송</button>
                <button>이메일 전송</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;