"use client";

import { useState, useEffect, useRef } from "react";

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

const InfoIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

// 상수
const PROGRESS_STEPS = [
  { label: "검색 시작" },
  { label: "결과 수집 중..." },
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
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${isSelected ? "text-white shadow-md" : "bg-[#F8F8F6] text-[#6B6B7B] hover:bg-[#F0F0EC]"
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


const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 min-h-[200px]">
    <div className="w-full h-[130px] bg-[#F0F0EC] rounded-xl mb-3 animate-pulse" />
    <div className="flex justify-between mb-2">
      <div className="w-12 h-5 bg-[#F0F0EC] rounded-full animate-pulse" />
      <div className="w-8 h-5 bg-[#F0F0EC] rounded animate-pulse" />
    </div>
    <div className="w-[80%] h-4 bg-[#F0F0EC] rounded animate-pulse" />
  </div>
);

const ResultCard = ({ item }: { item: any }) => {
  const status = getViralStatus(item.viral_score);
  const [showReason, setShowReason] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E4] p-4 shadow-sm hover:shadow-md transition-all flex flex-col min-h-[210px]">
      {/* 썸네일 */}
      <div className="w-full h-[130px] overflow-hidden rounded-xl mb-3 border border-[#E8E8E4] bg-[#F8F8F6]">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#A0A0A0] text-xs gap-1 bg-[#FAFAF8]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span>이미지 없음</span>
          </div>
        )}
      </div>

      {/* 상태 배지 + 점수 + 근거(ⓘ) */}
      <div className="relative flex justify-between items-center mb-2">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: status.color, backgroundColor: `${status.color}15` }}>{status.label}</span>

        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-bold" style={{ color: status.color }}>{item.viral_score}점</span>
          <button
            onClick={() => setShowReason(!showReason)}
            className="text-[#C0C0C8] hover:text-[#5B4FCF] transition-colors"
            aria-label="바이럴 지수 산정 근거 보기"
          >
            <InfoIcon className="w-[15px] h-[15px]" />
          </button>
        </div>

        {showReason && (
          <div className="absolute top-9 right-0 z-20 bg-white border border-[#E8E8E4] rounded-xl shadow-lg p-3 w-[240px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1a1a2e]">바이럴 지수 산정 근거</span>
              <button onClick={() => setShowReason(false)} className="p-1 hover:bg-[#F0F0EC] rounded-full">
                <CloseIcon className="w-3.5 h-3.5 text-[#6B6B7B]" />
              </button>
            </div>
            <p className="text-xs text-[#6B6B7B] leading-relaxed whitespace-pre-line p-2.5 bg-[#F8F8F6] rounded-lg">{item.reason || "근거 데이터가 여기에 표시됩니다."}</p>
          </div>
        )}
      </div>

      {/* 제목 — 2줄 고정 높이로 카드 정렬 */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[15px] font-semibold text-[#1a1a2e] hover:text-[#5B4FCF] leading-snug tracking-tight line-clamp-2 min-h-[2.7em] transition-colors"
        dangerouslySetInnerHTML={{ __html: item.title }}
      />
    </div>
  );
};

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
            </div>
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

// 가짜 데이터
const MOCK_RESULTS = [
  {
    title: "내돈내산 진짜 감동받은 가성비 <b>무선 이어폰</b> 추천 후기",
    link: "https://blog.naver.com/test1",
    viral_score: 15
  },
  {
    title: "최신형 <b>무선 이어폰</b> 솔직 담백한 사용기 (협찬품 아님)",
    link: "https://blog.naver.com/test2",
    viral_score: 45
  },
  {
    title: "[제품협찬] 음질 좋은 <b>무선 이어폰</b> 한 달 사용해 본 후기",
    link: "https://blog.naver.com/test3",
    viral_score: 95
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");   // 실제 검색 실행된 검색어(진행상황 표시 고정용)
  const [showFilter, setShowFilter] = useState(false);
  const [viralRange, setViralRange] = useState(10);
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [appliedViralRange, setAppliedViralRange] = useState(10);
  const [liveResults, setLiveResults] = useState<any[]>([]);

  const eventSourceRef = useRef<EventSource | null>(null);

  // DB의 검색 빈도 기준 인기 검색어 조회
  const fetchPopular = () => {
    fetch("http://localhost:8080/api/v1/search/popular?limit=10")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPopularKeywords(Array.isArray(data) ? data : []))
      .catch(() => setPopularKeywords([]));
  };

  useEffect(() => {
    fetchPopular();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const runProgress = (query: string, range: number) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setSearchProgress(0);
    setLiveResults([]);

    const url = `http://localhost:8080/api/v1/search/stream?query=${encodeURIComponent(query)}&viralRange=${range}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.addEventListener("progress", (event: any) => {
      const data = JSON.parse(event.data);
      setSearchProgress(data.step);
      if (data.step === 3) {
        es.close();
      }
    });

    es.addEventListener("card", (event: any) => {
      const card = JSON.parse(event.data);
      setLiveResults((current) => [
        ...current,
        {
          title: card.title,
          link: card.link,
          viral_score: card.viralScore,
          reason: card.reason,
          thumbnail: card.thumbnail
        }
      ]);
    });

    es.onerror = (err) => {
      // 스트림이 정상 종료되거나 끊겼을 때 발생하는 자연스러운 이벤트입니다.
      console.log("SSE stream closed or completed");
      es.close();
    };
  };

  const handleSearch = (query?: string | any) => {
    const finalQuery = (typeof query === "string") ? query : searchQuery;
    if (!finalQuery.trim()) return;
    setActiveQuery(finalQuery);   // 진행상황에 고정될 검색어
    setIsSearching(true);
    setIsFilterApplied(false);
    runProgress(finalQuery, 100);
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
    setIsFilterApplied(true);
    setAppliedViralRange(viralRange);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(searchQuery);
  };

  const handleBackToHome = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setIsSearching(false);
    setSearchQuery("");
    setActiveQuery("");
    setSearchProgress(0);
    setIsFilterApplied(false);
    fetchPopular();   // 최신 검색 빈도 반영
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
              <button onClick={() => setIsFilterApplied(false)} className="p-0.5 hover:opacity-70">
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex p-6 md:px-16 gap-6 flex-1">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveResults
              .filter((item) => !isFilterApplied || item.viral_score <= appliedViralRange)
              .map((item, idx) => (
                <ResultCard
                  key={idx}
                  item={item}
                />
              ))}

            {searchProgress < 3 && (
              [1, 2, 3].map((idx) => <SkeletonCard key={idx} />)
            )}

          </div>

          <ProgressSidebar progress={searchProgress} searchQuery={activeQuery} />
        </div>

        {showFilter && <FilterModal viralRange={viralRange} setViralRange={setViralRange} onClose={() => setShowFilter(false)} onApply={handleApplyFilter} />}
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

        <section className="w-full max-w-[720px]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 rounded-full bg-[#5B4FCF15] flex items-center justify-center">
              <TrendIcon className="w-5 h-5 text-[#5B4FCF]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1a1a2e]">인기 검색어</h2>
              <p className="text-sm text-[#6B6B7B] mt-1">지금 가장 많이 검색된 키워드예요</p>
            </div>
          </div>

          {popularKeywords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 bg-white border border-[#E8E8E4] rounded-2xl p-3">
              {popularKeywords.slice(0, 10).map((keyword, idx) => (
                <button
                  key={keyword}
                  onClick={() => { setSearchQuery(keyword); handleSearch(keyword); }}
                  className="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-[#F8F8F6] transition-colors text-left group"
                >
                  <span className={`w-5 text-center text-sm font-bold shrink-0 ${idx < 3 ? "text-[#5B4FCF]" : "text-[#B0B0B8]"}`}>
                    {idx + 1}
                  </span>
                  <span className="text-[15px] text-[#1a1a2e] group-hover:text-[#5B4FCF] transition-colors truncate">
                    {keyword}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-14 text-sm text-[#6B6B7B] bg-white border border-[#E8E8E4] rounded-2xl">
              아직 인기 검색어가 없어요. 첫 검색을 시작해보세요!
            </div>
          )}
        </section>
      </main>

      {showFilter && <FilterModal viralRange={viralRange} setViralRange={setViralRange} onClose={() => setShowFilter(false)} onApply={handleApplyFilter} />}
      <Footer />
    </div>
  );
}