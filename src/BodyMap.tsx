import React, { useState } from 'react';
import './BodyMap.css';

interface BodyMapProps {
  selectedAreas: string[];
  onAreaClick: (area: string) => void;
}

const BodyMap: React.FC<BodyMapProps> = ({ selectedAreas, onAreaClick }) => {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  const isSelected = (area: string) => selectedAreas.includes(area);

  const handleAreaClick = (area: string) => {
    onAreaClick(area);
  };

  return (
    <div className="body-map-container">
      <div className="body-map-controls">
        <button
          className={`view-toggle ${currentView === 'front' ? 'active' : ''}`}
          onClick={() => setCurrentView('front')}
        >
          전면
        </button>
        <button
          className={`view-toggle ${currentView === 'back' ? 'active' : ''}`}
          onClick={() => setCurrentView('back')}
        >
          후면
        </button>
      </div>

      <div className="body-diagram">
        {currentView === 'front' ? (
          <FrontBodySVG selectedAreas={selectedAreas} onAreaClick={handleAreaClick} />
        ) : (
          <BackBodySVG selectedAreas={selectedAreas} onAreaClick={handleAreaClick} />
        )}
      </div>

      <div className="selected-areas">
        <h4>선택된 부위:</h4>
        <div className="selected-list">
          {selectedAreas.map(area => (
            <span key={area} className="selected-area-tag">
              {area}
              <button onClick={() => handleAreaClick(area)}>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 전면 인체 SVG 컴포넌트 - 간단한 인체 모형
const FrontBodySVG: React.FC<{ selectedAreas: string[]; onAreaClick: (area: string) => void }> = ({ selectedAreas, onAreaClick }) => {
  const isSelected = (area: string) => selectedAreas.includes(area);

  return (
    <svg width="180" height="350" viewBox="0 0 180 350" className="body-svg">
      {/* 인체 외곽선 - 배경 */}
      <path
        d="M90 20 C75 20, 65 30, 65 45 C65 55, 70 65, 80 70 L80 80 C60 85, 50 90, 50 95 L50 110 C50 120, 55 130, 65 140 L70 160 C68 170, 70 180, 75 190 L75 220 C75 225, 78 230, 82 235 L85 260 C85 270, 87 280, 90 290 L95 320 L100 340 M90 20 C105 20, 115 30, 115 45 C115 55, 110 65, 100 70 L100 80 C120 85, 130 90, 130 95 L130 110 C130 120, 125 130, 115 140 L110 160 C112 170, 110 180, 105 190 L105 220 C105 225, 102 230, 98 235 L95 260 C95 270, 93 280, 90 290 L85 320 L80 340"
        fill="#f8f9fa"
        stroke="#ddd"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* 머리 */}
      <circle
        cx="90" cy="35" r="20"
        className={`body-part ${isSelected('머리') ? 'selected' : ''}`}
        onClick={() => onAreaClick('머리')}
        data-area="머리"
      />

      {/* 목 */}
      <rect
        x="85" y="55" width="10" height="15"
        rx="5"
        className={`body-part ${isSelected('목') ? 'selected' : ''}`}
        onClick={() => onAreaClick('목')}
        data-area="목"
      />

      {/* 어깨 */}
      <ellipse
        cx="90" cy="80" rx="35" ry="12"
        className={`body-part ${isSelected('어깨') ? 'selected' : ''}`}
        onClick={() => onAreaClick('어깨')}
        data-area="어깨"
      />

      {/* 가슴 */}
      <rect
        x="70" y="90" width="40" height="35"
        rx="8"
        className={`body-part ${isSelected('가슴') ? 'selected' : ''}`}
        onClick={() => onAreaClick('가슴')}
        data-area="가슴"
      />

      {/* 복부 */}
      <rect
        x="75" y="125" width="30" height="30"
        rx="6"
        className={`body-part ${isSelected('복부') ? 'selected' : ''}`}
        onClick={() => onAreaClick('복부')}
        data-area="복부"
      />

      {/* 허리 */}
      <rect
        x="78" y="155" width="24" height="20"
        rx="4"
        className={`body-part ${isSelected('허리') ? 'selected' : ''}`}
        onClick={() => onAreaClick('허리')}
        data-area="허리"
      />

      {/* 좌팔 */}
      <rect
        x="40" y="95" width="12" height="45"
        rx="6"
        className={`body-part ${isSelected('좌팔') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌팔')}
        data-area="좌팔"
      />

      {/* 우팔 */}
      <rect
        x="128" y="95" width="12" height="45"
        rx="6"
        className={`body-part ${isSelected('우팔') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우팔')}
        data-area="우팔"
      />

      {/* 좌팔뚝 */}
      <rect
        x="35" y="140" width="10" height="35"
        rx="5"
        className={`body-part ${isSelected('좌팔뚝') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌팔뚝')}
        data-area="좌팔뚝"
      />

      {/* 우팔뚝 */}
      <rect
        x="135" y="140" width="10" height="35"
        rx="5"
        className={`body-part ${isSelected('우팔뚝') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우팔뚝')}
        data-area="우팔뚝"
      />

      {/* 좌손 */}
      <circle
        cx="40" cy="185" r="8"
        className={`body-part ${isSelected('좌손') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌손')}
        data-area="좌손"
      />

      {/* 우손 */}
      <circle
        cx="140" cy="185" r="8"
        className={`body-part ${isSelected('우손') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우손')}
        data-area="우손"
      />

      {/* 엉덩이 */}
      <ellipse
        cx="90" cy="190" rx="20" ry="15"
        className={`body-part ${isSelected('엉덩이') ? 'selected' : ''}`}
        onClick={() => onAreaClick('엉덩이')}
        data-area="엉덩이"
      />

      {/* 좌허벅지 */}
      <rect
        x="76" y="205" width="14" height="45"
        rx="7"
        className={`body-part ${isSelected('좌허벅지') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌허벅지')}
        data-area="좌허벅지"
      />

      {/* 우허벅지 */}
      <rect
        x="90" y="205" width="14" height="45"
        rx="7"
        className={`body-part ${isSelected('우허벅지') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우허벅지')}
        data-area="우허벅지"
      />

      {/* 좌무릎 */}
      <circle
        cx="83" cy="258" r="8"
        className={`body-part ${isSelected('좌무릎') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌무릎')}
        data-area="좌무릎"
      />

      {/* 우무릎 */}
      <circle
        cx="97" cy="258" r="8"
        className={`body-part ${isSelected('우무릎') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우무릎')}
        data-area="우무릎"
      />

      {/* 좌종아리 */}
      <rect
        x="78" y="266" width="12" height="40"
        rx="6"
        className={`body-part ${isSelected('좌종아리') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌종아리')}
        data-area="좌종아리"
      />

      {/* 우종아리 */}
      <rect
        x="90" y="266" width="12" height="40"
        rx="6"
        className={`body-part ${isSelected('우종아리') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우종아리')}
        data-area="우종아리"
      />

      {/* 좌발 */}
      <ellipse
        cx="84" cy="320" rx="10" ry="6"
        className={`body-part ${isSelected('좌발') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌발')}
        data-area="좌발"
      />

      {/* 우발 */}
      <ellipse
        cx="96" cy="320" rx="10" ry="6"
        className={`body-part ${isSelected('우발') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우발')}
        data-area="우발"
      />
    </svg>
  );
};

// 후면 인체 SVG 컴포넌트 - 간단한 인체 모형
const BackBodySVG: React.FC<{ selectedAreas: string[]; onAreaClick: (area: string) => void }> = ({ selectedAreas, onAreaClick }) => {
  const isSelected = (area: string) => selectedAreas.includes(area);

  return (
    <svg width="180" height="350" viewBox="0 0 180 350" className="body-svg">
      {/* 인체 외곽선 - 배경 */}
      <path
        d="M90 20 C75 20, 65 30, 65 45 C65 55, 70 65, 80 70 L80 80 C60 85, 50 90, 50 95 L50 110 C50 120, 55 130, 65 140 L70 160 C68 170, 70 180, 75 190 L75 220 C75 225, 78 230, 82 235 L85 260 C85 270, 87 280, 90 290 L95 320 L100 340 M90 20 C105 20, 115 30, 115 45 C115 55, 110 65, 100 70 L100 80 C120 85, 130 90, 130 95 L130 110 C130 120, 125 130, 115 140 L110 160 C112 170, 110 180, 105 190 L105 220 C105 225, 102 230, 98 235 L95 260 C95 270, 93 280, 90 290 L85 320 L80 340"
        fill="#f8f9fa"
        stroke="#ddd"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* 뒤통수 */}
      <circle
        cx="90" cy="35" r="20"
        className={`body-part ${isSelected('뒤통수') ? 'selected' : ''}`}
        onClick={() => onAreaClick('뒤통수')}
        data-area="뒤통수"
      />

      {/* 목뒤 */}
      <rect
        x="85" y="55" width="10" height="15"
        rx="5"
        className={`body-part ${isSelected('목뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('목뒤')}
        data-area="목뒤"
      />

      {/* 어깨뒤 */}
      <ellipse
        cx="90" cy="80" rx="35" ry="12"
        className={`body-part ${isSelected('어깨뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('어깨뒤')}
        data-area="어깨뒤"
      />

      {/* 등상부 */}
      <rect
        x="70" y="90" width="40" height="25"
        rx="8"
        className={`body-part ${isSelected('등상부') ? 'selected' : ''}`}
        onClick={() => onAreaClick('등상부')}
        data-area="등상부"
      />

      {/* 등중부 */}
      <rect
        x="75" y="115" width="30" height="25"
        rx="6"
        className={`body-part ${isSelected('등중부') ? 'selected' : ''}`}
        onClick={() => onAreaClick('등중부')}
        data-area="등중부"
      />

      {/* 등하부/허리뒤 */}
      <rect
        x="78" y="140" width="24" height="25"
        rx="4"
        className={`body-part ${isSelected('등하부') ? 'selected' : ''}`}
        onClick={() => onAreaClick('등하부')}
        data-area="등하부"
      />

      {/* 좌팔뒤 */}
      <rect
        x="40" y="95" width="12" height="45"
        rx="6"
        className={`body-part ${isSelected('좌팔뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌팔뒤')}
        data-area="좌팔뒤"
      />

      {/* 우팔뒤 */}
      <rect
        x="128" y="95" width="12" height="45"
        rx="6"
        className={`body-part ${isSelected('우팔뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우팔뒤')}
        data-area="우팔뒤"
      />

      {/* 좌팔뚝뒤 */}
      <rect
        x="35" y="140" width="10" height="35"
        rx="5"
        className={`body-part ${isSelected('좌팔뚝뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌팔뚝뒤')}
        data-area="좌팔뚝뒤"
      />

      {/* 우팔뚝뒤 */}
      <rect
        x="135" y="140" width="10" height="35"
        rx="5"
        className={`body-part ${isSelected('우팔뚝뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우팔뚝뒤')}
        data-area="우팔뚝뒤"
      />

      {/* 엉덩이 */}
      <ellipse
        cx="90" cy="180" rx="25" ry="20"
        className={`body-part ${isSelected('엉덩이뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('엉덩이뒤')}
        data-area="엉덩이뒤"
      />

      {/* 좌허벅지뒤 */}
      <rect
        x="76" y="200" width="14" height="45"
        rx="7"
        className={`body-part ${isSelected('좌허벅지뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌허벅지뒤')}
        data-area="좌허벅지뒤"
      />

      {/* 우허벅지뒤 */}
      <rect
        x="90" y="200" width="14" height="45"
        rx="7"
        className={`body-part ${isSelected('우허벅지뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우허벅지뒤')}
        data-area="우허벅지뒤"
      />

      {/* 좌무릎뒤 */}
      <circle
        cx="83" cy="253" r="8"
        className={`body-part ${isSelected('좌무릎뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌무릎뒤')}
        data-area="좌무릎뒤"
      />

      {/* 우무릎뒤 */}
      <circle
        cx="97" cy="253" r="8"
        className={`body-part ${isSelected('우무릎뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우무릎뒤')}
        data-area="우무릎뒤"
      />

      {/* 좌종아리뒤 */}
      <rect
        x="78" y="261" width="12" height="40"
        rx="6"
        className={`body-part ${isSelected('좌종아리뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌종아리뒤')}
        data-area="좌종아리뒤"
      />

      {/* 우종아리뒤 */}
      <rect
        x="90" y="261" width="12" height="40"
        rx="6"
        className={`body-part ${isSelected('우종아리뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우종아리뒤')}
        data-area="우종아리뒤"
      />

      {/* 좌발뒤 */}
      <ellipse
        cx="84" cy="315" rx="10" ry="6"
        className={`body-part ${isSelected('좌발뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('좌발뒤')}
        data-area="좌발뒤"
      />

      {/* 우발뒤 */}
      <ellipse
        cx="96" cy="315" rx="10" ry="6"
        className={`body-part ${isSelected('우발뒤') ? 'selected' : ''}`}
        onClick={() => onAreaClick('우발뒤')}
        data-area="우발뒤"
      />
    </svg>
  );
};

export default BodyMap;