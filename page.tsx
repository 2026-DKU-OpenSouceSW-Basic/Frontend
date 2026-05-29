"use client";

import { useState } from "react";

// 아이콘 컴포넌트
const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const FilterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const TrendIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
);

// 상수
const POPULAR_PRODUCTS = [
  { id: 1, name: "인기검색어1" },
  { id: 2, name: "인기검색어2" },
  { id: 3, name: "인기검색어3" },
  { id: 4, name: "인기검색어4" },
  { id: 5, name: "인기검색어5" },
];

const PROGRESS_STEPS = [
  { label: "검색 시작"},
  { label: "결과 수집 중...", subLabel: "블로그, 카페, sns 등" },
  { label: "데이터 분석 중..." },
  { label: "결과 저장 중..." },
];

const VIRAL_LEVELS = [
  { range: "0~30", label: "안전", color: "#4CAF50", desc: "광고성 제품 확률 낮음" },
  { range: "31~70", label: "의심", color: "#FFC107", desc: "광고성 제품 확률 있음" },
  { range: "71~100", label: "위험", color: "#F44336", desc: "광고성 제품 확률 높음" },
];

const getViralStatus = (value: number) => {
  if (value <= 30) return { label: "안전", color: "#4CAF50" };
  if (value <= 70) return { label: "의심", color: "#FFC107" };
  return { label: "위험", color: "#F44336" };
};

// 공통 컴포넌트
const Header = ({ onLogoClick, isButton = false }: { onLogoClick?: () => void; isButton?: boolean }) => {
  const Logo = isButton ? "button" : "span";
  return (
    <header className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-[#E8E8E4] bg-white">
      <Logo onClick={onLogoClick} className={`text-sm font-semibold tracking-widest uppercase text-[#1a1a2e] ${isButton ? "bg-transparent border-none cursor-pointer" : ""}`}>
        Viral Product Filtering
      </Logo>
      <nav><a href="#" className="text-sm text-[#6B6B7B] hover:text-[#1a1a2e]">소개 및 사용법</a></nav>
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-[#E8E8E4] px-6 md:px-16 py-6 mt-auto">
    <p className="text-xs text-[#6B6B7B]">© 2026 Viral Product Filtering</p>
  </footer>
);

const SearchBar = ({ value, onChange, onKeyDown, onFilter, onSearch, size = "md" }: {
  value: string; onChange: (v: string) => void; onKeyDown: (e: React.KeyboardEvent) => void;
  onFilter: () => void; onSearch: () => void; size?: "sm" | "md";
}) => (
  <div className={`flex items-center w-full border border-[#E8E8E4] rounded-full px-5 md:px-6 bg-[#FAFAF8] ${size === "md" ? "h-16 max-w-[560px]" : "h-12 max-w-[500px]"}`}>
    <SearchIcon className={`${size === "md" ? "w-5 h-5" : "w-[18px] h-[18px]"} text-[#6B6B7B] shrink-0`} />
    <input
      type="text"
      placeholder={size === "md" ? "검색어를 입력하세요." : ""}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="flex-1 border-none outline-none text-base text-[#1a1a2e] bg-transparent px-4"
    />
    {size === "md" && <div className="w-px h-8 bg-[#E8E8E4] mx-2" />}
    <button onClick={onFilter} className="p-2 hover:bg-[#E8E8E4] rounded-full" aria-label="필터">
      <FilterIcon className={`${size === "md" ? "w-5 h-5" : "w-[18px] h-[18px]"} text-[#6B6B7B]`} />
    </button>
    <button onClick={onSearch} className="p-2 hover:bg-[#E8E8E4] rounded-full ml-1" aria-label="검색">
      <CheckIcon className={`${size === "md" ? "w-5 h-5" : "w-[18px] h-[18px]"} text-[#5B4FCF]`} />
    </button>
  </div>
);

const VIRAL_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const FilterModal = ({ viralRange, setViralRange, onClose, onApply }: {
  viralRange: number; setViralRange: (v: number) => void; onClose: () => void; onApply: () => void;
}) => {
  const viralStatus = getViralStatus(viralRange);

  return (
    <div className="fixed inset-0 bg-[rgba(26,26,46,0.3)] backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 w-full max-w-[480px] shadow-2xl border border-[#E8E8E4]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-normal text-[#1a1a2e] font-serif">바이럴 지수 필터</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#F0F0EC] rounded-full"><CloseIcon className="w-5 h-5 text-[#6B6B7B]" /></button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <label className="text-sm text-[#6B6B7B]">바이럴 지수 범위</label>
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ color: viralStatus.color, backgroundColor: `${viralStatus.color}15` }}>
              {viralRange} ({viralStatus.label})
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-6">
            {VIRAL_OPTIONS.map((value) => {
              const status = getViralStatus(value);
              const isSelected = viralRange === value;
              return (
                <button
                  key={value}
                  onClick={() => setViralRange(value)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isSelected ? "text-white shadow-md" : "bg-[#F8F8F6] text-[#6B6B7B] hover:bg-[#F0F0EC]"
                  }`}
                  style={isSelected ? { backgroundColor: status.color } : undefined}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between p-4 bg-[#F8F8F6] rounded-xl">
            {VIRAL_LEVELS.map((level) => (
              <div key={level.label} className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: level.color }} />
                  <span className="text-xs font-semibold" style={{ color: level.color }}>{level.range} ({level.label})</span>
                </div>
                <span className="text-[11px] text-[#6B6B7B]">{level.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 text-[#6B6B7B] border border-[#E8E8E4] rounded-xl hover:bg-[#F8F8F6]">취소</button>
          <button onClick={onApply} className="flex-1 py-3.5 bg-[#5B4FCF] text-white rounded-xl font-medium hover:bg-[#4A3FC0]">적용하기</button>
        </div>
      </div>
    </div>
  );
};

const ReasonModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-[rgba(26,26,46,0.3)] backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl p-6 w-full max-w-[400px] shadow-2xl border border-[#E8E8E4]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-[#1a1a2e]">바이럴 지수 산정 근거</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-[#F0F0EC] rounded-full"><CloseIcon className="w-[18px] h-[18px] text-[#6B6B7B]" /></button>
      </div>
      <div className="p-10 bg-[#F8F8F6] rounded-xl text-center">
        <p className="text-sm text-[#6B6B7B]">근거 데이터가 여기에 표시됩니다.</p>
      </div>
      <button onClick={onClose} className="w-full mt-5 py-3 bg-[#5B4FCF] text-white rounded-lg text-sm font-medium hover:bg-[#4A3FC0]">확인</button>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-[#E8E8E4] p-5 min-h-[200px]">
    <div className="w-full h-[120px] bg-[#F0F0EC] rounded-xl mb-4 animate-pulse" />
    <div className="w-[70%] h-4 bg-[#F0F0EC] rounded mb-2 animate-pulse" />
    <div className="w-[50%] h-3 bg-[#F0F0EC] rounded animate-pulse" />
  </div>
);

const ProgressSidebar = ({ progress, searchQuery }: { progress: number; searchQuery: string }) => (
  <div className="w-[280px] bg-white rounded-xl border border-[#E8E8E4] p-5 h-fit shrink-0 hidden lg:block">
    <h3 className="text-sm font-semibold text-[#1a1a2e] mb-5">검색 진행 상황</h3>
    <div className="flex flex-col gap-4">
      {PROGRESS_STEPS.map((step, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center ${idx <= progress ? "bg-[#5B4FCF]" : "bg-[#F0F0EC]"}`}>
            {idx <= progress && <CheckIcon className="w-3 h-3 text-white" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[13px] ${idx <= progress ? "text-[#1a1a2e] font-medium" : "text-[#6B6B7B]"}`}>
                {idx === 0 ? `${searchQuery} ${step.label}` : step.label}
              </span>
              {step.time && <span className="text-[11px] text-[#6B6B7B]">{step.time}</span>}
            </div>
            {step.subLabel && <span className="text-[11px] text-[#6B6B7B]">{step.subLabel}</span>}
          </div>
        </div>
      ))}
    </div>
    {progress < 3 && (
      <div className="flex items-center justify-center mt-6 p-4 bg-[#F8F8F6] rounded-lg">
        <div className="w-5 h-5 border-2 border-[#E8E8E4] border-t-[#5B4FCF] rounded-full animate-spin" />
      </div>
    )}
    <p className="text-xs text-[#6B6B7B] mt-4 leading-relaxed">실시간으로 결과를 수집하고 있습니다.<br />잠시만 기다려주세요.</p>
  </div>
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [viralRange, setViralRange] = useState(10);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showReasonModal, setShowReasonModal] = useState<number | null>(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [appliedViralRange, setAppliedViralRange] = useState(10);

  const runProgress = () => {
    setSearchProgress(0);
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 3) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 800);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setIsFilterApplied(false);
    runProgress();
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
    setIsFilterApplied(true);
    setAppliedViralRange(viralRange);
    runProgress();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter") handleSearch(); };

  const handleBackToHome = () => {
    setIsSearching(false);
    setSearchQuery("");
    setSearchProgress(0);
    setIsFilterApplied(false);
  };

  // 검색 결과 화면
  if (isSearching) {
    const appliedStatus = getViralStatus(appliedViralRange);
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        <Header onLogoClick={handleBackToHome} isButton />

        <div className="flex flex-col items-center p-6 border-b border-[#E8E8E4] bg-white gap-5">
          <SearchBar value={searchQuery} onChange={setSearchQuery} onKeyDown={handleKeyDown} onFilter={() => setShowFilter(true)} onSearch={handleSearch} size="sm" />
          
          {isFilterApplied && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium" style={{ backgroundColor: `${appliedStatus.color}15`, color: appliedStatus.color }}>
              <span>바이럴 지수 {appliedViralRange} 이하 필터링 적용됨</span>
              <button onClick={() => { setIsFilterApplied(false); handleSearch(); }} className="p-0.5 hover:opacity-70">
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex p-6 md:px-16 gap-6 flex-1">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => <SkeletonCard key={idx} />)}
          </div>
          <ProgressSidebar progress={searchProgress} searchQuery={searchQuery} />
        </div>

        {showFilter && <FilterModal viralRange={viralRange} setViralRange={setViralRange} onClose={() => setShowFilter(false)} onApply={handleApplyFilter} />}
        {showReasonModal && <ReasonModal onClose={() => setShowReasonModal(null)} />}
        <Footer />
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-6 pt-20 pb-16">
        <h1 className="text-5xl md:text-7xl lg:text-[96px] font-normal text-[#1a1a2e] text-center leading-tight mb-6 font-serif">
          Viral Product<br /><span className="text-[#5B4FCF]">Filtering</span>
        </h1>
        <p className="text-[#6B6B7B] text-center max-w-[480px] mb-14 text-lg leading-relaxed">
          광고와 진짜 후기를 구분하여 현명한 소비를 도와드립니다.
        </p>

        <div className="w-full max-w-[560px] mb-24">
          <SearchBar value={searchQuery} onChange={setSearchQuery} onKeyDown={handleKeyDown} onFilter={() => setShowFilter(true)} onSearch={handleSearch} />
        </div>

        <section className="w-full max-w-[900px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-11 h-11 rounded-full bg-[#5B4FCF15] flex items-center justify-center">
              <TrendIcon className="w-5 h-5 text-[#5B4FCF]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1a1a2e]">인기 검색 결과</h2>
              <p className="text-sm text-[#6B6B7B] mt-1">지금 가장 많이 검색되고 있는 제품을 즐겨보세요</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {POPULAR_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => { setSearchQuery(product.name); handleSearch(); }}
              >
                <div className={`w-full aspect-square border rounded-3xl bg-white flex items-center justify-center mb-3 transition-all duration-300
                  ${hoveredCard === product.id ? "border-[#5B4FCF] -translate-y-2 shadow-xl" : "border-[#E8E8E4] shadow-sm"}`}>
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F0EC]" />
                </div>
                <span className={`text-sm font-medium transition-colors ${hoveredCard === product.id ? "text-[#5B4FCF]" : "text-[#1a1a2e]"}`}>
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showFilter && <FilterModal viralRange={viralRange} setViralRange={setViralRange} onClose={() => setShowFilter(false)} onApply={handleApplyFilter} />}
      <Footer />
    </div>
  );
}