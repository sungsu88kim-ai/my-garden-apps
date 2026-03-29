import React, { useState, useEffect } from "react";

const CROPS = [
  {
    id: 1, name: "상추", emoji: "🥬", category: "엽채류",
    sowMonths: [3,4,8,9], harvestMonths: [5,6,10,11],
    conditions: { sun: "반음지~양지", water: "보통", temp: "15~20°C", soil: "비옥·습윤" },
    desc: "봄·가을 두 번 재배 가능. 서늘한 날씨를 좋아함.",
    color: "#6abf69", bg: "#e8f5e9",
    days: 45, difficulty: 1,
  },
  {
    id: 2, name: "토마토", emoji: "🍅", category: "과채류",
    sowMonths: [2,3], harvestMonths: [6,7,8],
    conditions: { sun: "양지(직사광 6h+)", water: "규칙적", temp: "20~28°C", soil: "배수 좋은 양토" },
    desc: "지주대 필수. 꾸준한 물 관리로 열과 방지.",
    color: "#e53935", bg: "#ffebee",
    days: 90, difficulty: 2,
  },
  {
    id: 3, name: "오이", emoji: "🥒", category: "과채류",
    sowMonths: [4,5], harvestMonths: [6,7,8,9],
    conditions: { sun: "양지", water: "많음", temp: "22~28°C", soil: "유기물 풍부" },
    desc: "덩굴식물이라 그물망 설치 권장. 고온다습 선호.",
    color: "#43a047", bg: "#e8f5e9",
    days: 60, difficulty: 2,
  },
  {
    id: 4, name: "고추", emoji: "🌶️", category: "과채류",
    sowMonths: [2,3], harvestMonths: [7,8,9,10],
    conditions: { sun: "양지(직사광 8h+)", water: "적당", temp: "22~30°C", soil: "배수 좋고 비옥" },
    desc: "모종 이식 추천. 탄저병·역병 주의.",
    color: "#f44336", bg: "#fff3e0",
    days: 120, difficulty: 3,
  },
  {
    id: 5, name: "깻잎", emoji: "🌿", category: "엽채류",
    sowMonths: [4,5,6], harvestMonths: [6,7,8,9,10],
    conditions: { sun: "양지~반음지", water: "보통", temp: "20~30°C", soil: "비옥한 토양" },
    desc: "따뜻한 기후에서 잘 자람. 순지르기로 수확량 증가.",
    color: "#2e7d32", bg: "#e8f5e9",
    days: 50, difficulty: 1,
  },
  {
    id: 6, name: "배추", emoji: "🥦", category: "엽채류",
    sowMonths: [8,9], harvestMonths: [10,11,12],
    conditions: { sun: "양지", water: "규칙적", temp: "10~18°C", soil: "석회 조정 필요" },
    desc: "김장용 가을 배추. pH 6.0~7.0 유지 중요.",
    color: "#558b2f", bg: "#f1f8e9",
    days: 80, difficulty: 3,
  },
  {
    id: 7, name: "당근", emoji: "🥕", category: "근채류",
    sowMonths: [3,4,8,9], harvestMonths: [6,7,10,11],
    conditions: { sun: "양지", water: "적당", temp: "15~20°C", soil: "깊고 부드러운 사토" },
    desc: "직파 재배. 돌 많은 땅에서 기형 발생.",
    color: "#ff8f00", bg: "#fff8e1",
    days: 100, difficulty: 2,
  },
  {
    id: 8, name: "파", emoji: "🧅", category: "엽채류",
    sowMonths: [2,3,8,9], harvestMonths: [4,5,6,10,11],
    conditions: { sun: "양지", water: "적당", temp: "13~23°C", soil: "배수 양호" },
    desc: "거의 연중 재배 가능. 연작 피해 주의.",
    color: "#00897b", bg: "#e0f2f1",
    days: 60, difficulty: 1,
  },
  {
    id: 9, name: "가지", emoji: "🍆", category: "과채류",
    sowMonths: [3,4], harvestMonths: [7,8,9],
    conditions: { sun: "양지(직사광 필수)", water: "많음", temp: "25~30°C", soil: "보수력 좋은 양토" },
    desc: "고온성 작물. 야간 15°C 이하 시 생육 저하.",
    color: "#6a1b9a", bg: "#f3e5f5",
    days: 75, difficulty: 2,
  },
  {
    id: 10, name: "호박", emoji: "🎃", category: "과채류",
    sowMonths: [4,5], harvestMonths: [7,8,9,10],
    conditions: { sun: "양지", water: "보통~많음", temp: "20~30°C", soil: "유기물 풍부" },
    desc: "넝쿨이 넓게 퍼짐. 공간 충분히 확보 필요.",
    color: "#ef6c00", bg: "#fff3e0",
    days: 100, difficulty: 1,
  },
  {
    id: 11, name: "무", emoji: "🌱", category: "근채류",
    sowMonths: [8,9], harvestMonths: [10,11,12],
    conditions: { sun: "양지", water: "규칙적", temp: "15~20°C", soil: "깊고 부드러운 사토" },
    desc: "가을 파종 추천. 바람에 의한 열근 주의.",
    color: "#ad1457", bg: "#fce4ec",
    days: 70, difficulty: 2,
  },
  {
    id: 12, name: "콩", emoji: "🫘", category: "두류",
    sowMonths: [5,6], harvestMonths: [8,9,10],
    conditions: { sun: "양지", water: "적당", temp: "20~27°C", soil: "배수 좋고 pH 6.0~7.0" },
    desc: "질소 고정 식물. 연작 가능. 습해 주의.",
    color: "#795548", bg: "#efebe9",
    days: 100, difficulty: 1,
  },
];

const MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
const SEASON_COLOR = (m) => {
  if ([3,4,5].includes(m)) return "#81c784";
  if ([6,7,8].includes(m)) return "#ffb74d";
  if ([9,10,11].includes(m)) return "#a1887f";
  return "#90caf9";
};
const SEASON_LABEL = (m) => {
  if ([3,4,5].includes(m)) return "봄";
  if ([6,7,8].includes(m)) return "여름";
  if ([9,10,11].includes(m)) return "가을";
  return "겨울";
};

const DIFF = ["", "쉬움", "보통", "어려움"];
const DIFF_COLOR = ["", "#43a047", "#fb8c00", "#e53935"];

const SunIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const DropIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0C19 10 12 2 12 2z"/></svg>;
const TempIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M14 14.76V9a2 2 0 10-4 0v5.76A4 4 0 1014 14.76z"/></svg>;
const SoilIcon = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;

export default function GardenApp() {
  const now = new Date();
  const [tab, setTab] = useState("home");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [filterMonth, setFilterMonth] = useState(now.getMonth() + 1);
  const [filterCat, setFilterCat] = useState("전체");
  const [myGarden, setMyGarden] = useState([]);
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1);
  const currentMonth = now.getMonth() + 1;

  const cats = ["전체", "엽채류", "과채류", "근채류", "두류"];

  const toggleMyGarden = (id) => {
    setMyGarden(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredCrops = CROPS.filter(c =>
    (filterCat === "전체" || c.category === filterCat) &&
    (c.sowMonths.includes(filterMonth) || c.harvestMonths.includes(filterMonth))
  );

  const todayCrops = CROPS.filter(c =>
    c.sowMonths.includes(currentMonth) || c.harvestMonths.includes(currentMonth)
  );

  // --- DETAIL MODAL ---
  if (selectedCrop) {
    const c = selectedCrop;
    const inGarden = myGarden.includes(c.id);
    return (
      <div style={styles.phone}>
        <div style={{...styles.screen, background: c.bg, paddingBottom: 0}}>
          {/* Header */}
          <div style={{background: c.color, padding: "48px 20px 24px", borderRadius: "0 0 32px 32px"}}>
            <div style={{display:"flex", alignItems:"center", gap:12}}>
              <button onClick={() => setSelectedCrop(null)}
                style={{background:"rgba(255,255,255,0.25)", border:"none", borderRadius:12, padding:"8px 12px", color:"#fff", cursor:"pointer", fontSize:16}}>
                ←
              </button>
              <div style={{fontSize:40}}>{c.emoji}</div>
              <div>
                <div style={{fontSize:24, fontWeight:900, color:"#fff", fontFamily:"'Nanum Gothic', sans-serif"}}>{c.name}</div>
                <div style={{fontSize:12, color:"rgba(255,255,255,0.85)", background:"rgba(255,255,255,0.2)", padding:"2px 10px", borderRadius:20, display:"inline-block", marginTop:4}}>{c.category}</div>
              </div>
              <button onClick={() => toggleMyGarden(c.id)}
                style={{marginLeft:"auto", background: inGarden ? "#fff" : "rgba(255,255,255,0.25)", border:"none", borderRadius:12, padding:"8px 14px", cursor:"pointer", fontSize:20}}>
                {inGarden ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
          
          <div style={{overflowY:"auto", padding:"20px 16px", height:"calc(100% - 140px)"}}>
            {/* Desc */}
            <div style={{background:"#fff", borderRadius:20, padding:"16px 18px", marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:13, color:"#555", lineHeight:1.7}}>{c.desc}</div>
              <div style={{display:"flex", gap:12, marginTop:12}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:11, color:"#999"}}>재배기간</div>
                  <div style={{fontSize:16, fontWeight:800, color:c.color}}>{c.days}일</div>
                </div>
                <div style={{width:1, background:"#eee"}}/>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:11, color:"#999"}}>난이도</div>
                  <div style={{fontSize:14, fontWeight:700, color:DIFF_COLOR[c.difficulty]}}>{DIFF[c.difficulty]}</div>
                </div>
              </div>
            </div>

            {/* Calendar bar */}
            <div style={{background:"#fff", borderRadius:20, padding:"16px 18px", marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:13, fontWeight:700, marginBottom:12, color:"#333"}}>월별 파종·수확 시기</div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:3}}>
                {MONTHS.map((m, i) => {
                  const mn = i + 1;
                  const isSow = c.sowMonths.includes(mn);
                  const isHarvest = c.harvestMonths.includes(mn);
                  const isCurrent = mn === currentMonth;
                  return (
                    <div key={mn} style={{textAlign:"center"}}>
                      <div style={{
                        fontSize: 9, fontWeight: 700,
                        color: isCurrent ? c.color : "#bbb",
                        marginBottom: 2,
                      }}>{mn}</div>
                      <div style={{
                        height: 28, borderRadius: 8,
                        background: isSow ? c.color : isHarvest ? c.color + "55" : "#f0f0f0",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize: 10,
                        outline: isCurrent ? `2px solid ${c.color}` : "none",
                      }}>
                        {isSow ? "🌱" : isHarvest ? "✂️" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex", gap:16, marginTop:10}}>
                <div style={{display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#666"}}>
                  <div style={{width:12, height:12, borderRadius:4, background:c.color}}/> 파종
                </div>
                <div style={{display:"flex", alignItems:"center", gap:5, fontSize:11, color:"#666"}}>
                  <div style={{width:12, height:12, borderRadius:4, background:c.color+"55"}}/> 수확
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div style={{background:"#fff", borderRadius:20, padding:"16px 18px", marginBottom:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:13, fontWeight:700, marginBottom:12, color:"#333"}}>재배 조건</div>
              {[
                { icon: <SunIcon/>, label:"일조", value: c.conditions.sun, accent:"#FFA726" },
                { icon: <DropIcon/>, label:"수분", value: c.conditions.water, accent:"#29B6F6" },
                { icon: <TempIcon/>, label:"온도", value: c.conditions.temp, accent:"#EF5350" },
                { icon: <SoilIcon/>, label:"토양", value: c.conditions.soil, accent:"#8D6E63" },
              ].map(({icon, label, value, accent}) => (
                <div key={label} style={{display:"flex", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f5f5f5"}}>
                  <div style={{color:accent, marginRight:10, display:"flex"}}>{icon}</div>
                  <div style={{fontSize:12, color:"#888", width:36}}>{label}</div>
                  <div style={{fontSize:13, fontWeight:600, color:"#333"}}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN APP ---
  return (
    <div style={styles.phone}>
      <div style={styles.screen}>
        {/* STATUS BAR */}
        <div style={styles.statusBar}>
          <span style={{fontSize:11, fontWeight:700}}>9:41</span>
          <span style={{fontSize:10}}>📶 🔋</span>
        </div>

        {/* CONTENT */}
        <div style={{flex:1, overflowY:"auto", overflowX:"hidden"}}>

          {tab === "home" && (
            <div>
              {/* Hero */}
              <div style={{
                background:"linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)",
                padding:"28px 20px 36px",
                borderRadius:"0 0 36px 36px",
                position:"relative", overflow:"hidden"
              }}>
                <div style={{position:"absolute", top:-30, right:-20, fontSize:120, opacity:0.12}}>🌿</div>
                <div style={{fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:2, textTransform:"uppercase", marginBottom:6}}>나의 텃밭 관리</div>
                <div style={{fontSize:26, fontWeight:900, color:"#fff", fontFamily:"'Nanum Gothic', sans-serif", lineHeight:1.2}}>
                  오늘, {currentMonth}월의<br/>텃밭을 확인하세요 🌱
                </div>
                <div style={{
                  marginTop:18, background:"rgba(255,255,255,0.18)",
                  borderRadius:16, padding:"12px 16px",
                  display:"flex", alignItems:"center", gap:10
                }}>
                  <div style={{fontSize:28}}>{SEASON_LABEL(currentMonth) === "봄" ? "🌸" : SEASON_LABEL(currentMonth) === "여름" ? "☀️" : SEASON_LABEL(currentMonth) === "가을" ? "🍂" : "❄️"}</div>
                  <div>
                    <div style={{color:"rgba(255,255,255,0.75)", fontSize:11}}>{SEASON_LABEL(currentMonth)}철 추천 작물</div>
                    <div style={{color:"#fff", fontWeight:700, fontSize:13}}>
                      {todayCrops.slice(0,3).map(c=>c.name).join(" · ")} 외 {todayCrops.length - 3}종
                    </div>
                  </div>
                </div>
              </div>

              {/* My Garden */}
              {myGarden.length > 0 && (
                <div style={{padding:"20px 16px 0"}}>
                  <div style={{fontSize:14, fontWeight:800, color:"#2e7d32", marginBottom:12}}>❤️ 내 텃밭</div>
                  <div style={{display:"flex", gap:10, overflowX:"auto", paddingBottom:8}}>
                    {CROPS.filter(c=>myGarden.includes(c.id)).map(c => (
                      <div key={c.id} onClick={() => setSelectedCrop(c)}
                        style={{
                          minWidth:90, background:c.bg, borderRadius:20,
                          padding:"14px 10px", textAlign:"center", cursor:"pointer",
                          boxShadow:"0 2px 10px rgba(0,0,0,0.08)"
                        }}>
                        <div style={{fontSize:28}}>{c.emoji}</div>
                        <div style={{fontSize:12, fontWeight:700, color:"#333", marginTop:4}}>{c.name}</div>
                        <div style={{fontSize:10, color:"#888"}}>{c.days}일</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today Crops */}
              <div style={{padding:"20px 16px"}}>
                <div style={{fontSize:14, fontWeight:800, color:"#333", marginBottom:12}}>{currentMonth}월 작목 ({todayCrops.length}종)</div>
                {todayCrops.map(c => (
                  <CropCard key={c.id} c={c} currentMonth={currentMonth}
                    inGarden={myGarden.includes(c.id)}
                    onSelect={() => setSelectedCrop(c)}
                    onToggle={() => toggleMyGarden(c.id)} />
                ))}
              </div>
            </div>
          )}

          {tab === "search" && (
            <div>
              <div style={{
                background:"linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
                padding:"28px 20px 28px",
                borderRadius:"0 0 32px 32px"
              }}>
                <div style={{fontSize:22, fontWeight:900, color:"#fff", fontFamily:"'Nanum Gothic', sans-serif"}}>작물 탐색</div>
                <div style={{fontSize:12, color:"rgba(255,255,255,0.75)", marginTop:4}}>월별·종류별로 필터하세요</div>
              </div>

              <div style={{padding:"16px 16px 0"}}>
                {/* Month filter */}
                <div style={{display:"flex", gap:6, overflowX:"auto", paddingBottom:8, marginBottom:12}}>
                  {MONTHS.map((m, i) => {
                    const mn = i + 1;
                    const active = filterMonth === mn;
                    return (
                      <button key={mn} onClick={() => setFilterMonth(mn)}
                        style={{
                          minWidth:44, padding:"8px 6px",
                          background: active ? SEASON_COLOR(mn) : "#f5f5f5",
                          color: active ? "#fff" : "#888",
                          border:"none", borderRadius:12, cursor:"pointer",
                          fontSize:12, fontWeight: active ? 800 : 500,
                          transition:"all 0.2s"
                        }}>
                        {mn}월
                      </button>
                    );
                  })}
                </div>
                {/* Category filter */}
                <div style={{display:"flex", gap:6, marginBottom:16}}>
                  {cats.map(cat => (
                    <button key={cat} onClick={() => setFilterCat(cat)}
                      style={{
                        padding:"6px 12px",
                        background: filterCat === cat ? "#2e7d32" : "#f0f0f0",
                        color: filterCat === cat ? "#fff" : "#666",
                        border:"none", borderRadius:20, cursor:"pointer",
                        fontSize:12, fontWeight:600, whiteSpace:"nowrap"
                      }}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div style={{fontSize:12, color:"#888", marginBottom:10}}>
                  {filterMonth}월 · {filteredCrops.length}종 조회
                </div>
                {filteredCrops.length === 0 ? (
                  <div style={{textAlign:"center", padding:"48px 0", color:"#ccc"}}>
                    <div style={{fontSize:40}}>🌾</div>
                    <div style={{fontSize:13, marginTop:8}}>해당 조건의 작물이 없어요</div>
                  </div>
                ) : (
                  filteredCrops.map(c => (
                    <CropCard key={c.id} c={c} currentMonth={filterMonth}
                      inGarden={myGarden.includes(c.id)}
                      onSelect={() => setSelectedCrop(c)}
                      onToggle={() => toggleMyGarden(c.id)} />
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "calendar" && (
            <div>
              <div style={{
                background:"linear-gradient(135deg, #6a1b9a 0%, #ab47bc 100%)",
                padding:"28px 20px 28px",
                borderRadius:"0 0 32px 32px"
              }}>
                <div style={{fontSize:22, fontWeight:900, color:"#fff", fontFamily:"'Nanum Gothic', sans-serif"}}>작기 달력</div>
                <div style={{fontSize:12, color:"rgba(255,255,255,0.75)", marginTop:4}}>연간 파종·수확 시기</div>
              </div>
              <div style={{padding:16}}>
                {/* Month selector */}
                <div style={{display:"flex", gap:6, overflowX:"auto", paddingBottom:10, marginBottom:16}}>
                  {MONTHS.map((m, i) => {
                    const mn = i + 1;
                    const active = calMonth === mn;
                    return (
                      <button key={mn} onClick={() => setCalMonth(mn)}
                        style={{
                          minWidth:44, padding:"8px 6px",
                          background: active ? "#6a1b9a" : mn === currentMonth ? "#f3e5f5" : "#f5f5f5",
                          color: active ? "#fff" : mn === currentMonth ? "#6a1b9a" : "#888",
                          border: mn === currentMonth && !active ? "2px solid #ab47bc" : "none",
                          borderRadius:12, cursor:"pointer",
                          fontSize:12, fontWeight: active ? 800 : 500,
                        }}>
                        {mn}월
                      </button>
                    );
                  })}
                </div>

                {/* Gantt mini */}
                <div style={{background:"#fff", borderRadius:20, padding:"16px", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", marginBottom:16}}>
                  <div style={{fontSize:13, fontWeight:700, color:"#333", marginBottom:12}}>{calMonth}월 현황</div>
                  {CROPS.map(c => {
                    const isSow = c.sowMonths.includes(calMonth);
                    const isHarvest = c.harvestMonths.includes(calMonth);
                    if (!isSow && !isHarvest) return null;
                    return (
                      <div key={c.id} onClick={() => setSelectedCrop(c)}
                        style={{display:"flex", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #f8f8f8", cursor:"pointer"}}>
                        <div style={{fontSize:18, marginRight:10}}>{c.emoji}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13, fontWeight:600, color:"#333"}}>{c.name}</div>
                          <div style={{fontSize:11, color:"#aaa"}}>{c.category}</div>
                        </div>
                        {isSow && <span style={{background:"#e8f5e9", color:"#2e7d32", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, marginLeft:4}}>🌱 파종</span>}
                        {isHarvest && <span style={{background:"#fff8e1", color:"#f57f17", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, marginLeft:4}}>✂️ 수확</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Annual overview mini gantt */}
                <div style={{background:"#fff", borderRadius:20, padding:"16px", boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
                  <div style={{fontSize:13, fontWeight:700, color:"#333", marginBottom:12}}>연간 작기 일람</div>
                  <div style={{overflowX:"auto"}}>
                    <div style={{minWidth:300}}>
                      {/* Month header */}
                      <div style={{display:"grid", gridTemplateColumns:"60px repeat(12, 1fr)", gap:2, marginBottom:6}}>
                        <div/>
                        {MONTHS.map((m, i) => (
                          <div key={i} style={{fontSize:9, color: i+1===currentMonth ? "#6a1b9a" : "#bbb", textAlign:"center", fontWeight: i+1===currentMonth ? 800 : 400}}>{i+1}</div>
                        ))}
                      </div>
                      {CROPS.map(c => (
                        <div key={c.id} style={{display:"grid", gridTemplateColumns:"60px repeat(12, 1fr)", gap:2, marginBottom:3}}>
                          <div style={{fontSize:10, color:"#666", display:"flex", alignItems:"center", gap:3}}>{c.emoji} {c.name}</div>
                          {Array.from({length:12}, (_, i) => {
                            const mn = i + 1;
                            const isSow = c.sowMonths.includes(mn);
                            const isH = c.harvestMonths.includes(mn);
                            return (
                              <div key={mn} style={{
                                height:16, borderRadius:4,
                                background: isSow ? c.color : isH ? c.color + "55" : "#f5f5f5",
                                outline: mn === currentMonth ? "1.5px solid #6a1b9a" : "none",
                              }}/>
                            );
                          })}
                        </div>
                      ))}
                      <div style={{display:"flex", gap:12, marginTop:10}}>
                        <div style={{display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#666"}}>
                          <div style={{width:12, height:8, borderRadius:3, background:"#66bb6a"}}/> 파종기
                        </div>
                        <div style={{display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#666"}}>
                          <div style={{width:12, height:8, borderRadius:3, background:"#a5d6a7"}}/> 수확기
                        </div>
                        <div style={{display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#6a1b9a"}}>
                          <div style={{width:12, height:8, borderRadius:3, border:"1.5px solid #6a1b9a"}}/> 현재월
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAV */}
        <div style={styles.bottomNav}>
          {[
            { id:"home", icon:"🏡", label:"홈" },
            { id:"search", icon:"🔍", label:"탐색" },
            { id:"calendar", icon:"📅", label:"달력" },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                flex:1, background:"none", border:"none", cursor:"pointer",
                padding:"8px 0 4px",
                color: tab === t.id ? "#2e7d32" : "#bbb",
                display:"flex", flexDirection:"column", alignItems:"center", gap:2
              }}>
              <div style={{fontSize:20}}>{t.icon}</div>
              <div style={{fontSize:10, fontWeight: tab === t.id ? 800 : 500}}>{t.label}</div>
              {tab === t.id && <div style={{width:20, height:3, background:"#2e7d32", borderRadius:99}}/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CropCard({ c, currentMonth, inGarden, onSelect, onToggle }) {
  const isSow = c.sowMonths.includes(currentMonth);
  const isHarvest = c.harvestMonths.includes(currentMonth);
  return (
    <div onClick={onSelect}
      style={{
        background:"#fff", borderRadius:20, padding:"14px 16px",
        marginBottom:10, display:"flex", alignItems:"center", gap:12,
        boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
        cursor:"pointer", transition:"transform 0.15s",
        borderLeft:`4px solid ${c.color}`
      }}>
      <div style={{
        width:52, height:52, borderRadius:16,
        background:c.bg, display:"flex", alignItems:"center",
        justifyContent:"center", fontSize:28, flexShrink:0
      }}>{c.emoji}</div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:"flex", alignItems:"center", gap:6}}>
          <div style={{fontSize:15, fontWeight:800, color:"#222"}}>{c.name}</div>
          <div style={{fontSize:10, color:"#aaa", background:"#f5f5f5", padding:"2px 8px", borderRadius:20}}>{c.category}</div>
        </div>
        <div style={{display:"flex", gap:6, marginTop:6}}>
          {isSow && <span style={{background:"#e8f5e9", color:"#2e7d32", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20}}>🌱 파종</span>}
          {isHarvest && <span style={{background:"#fff8e1", color:"#f57f17", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20}}>✂️ 수확</span>}
          <span style={{color:DIFF_COLOR[c.difficulty], fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, background:"#f9f9f9"}}>{DIFF[c.difficulty]}</span>
        </div>
        <div style={{fontSize:11, color:"#888", marginTop:5}}>{c.conditions.temp} · {c.conditions.sun}</div>
      </div>
      <button onClick={e => { e.stopPropagation(); onToggle(); }}
        style={{background:"none", border:"none", cursor:"pointer", fontSize:20, padding:4}}>
        {inGarden ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

const styles = {
  phone: {
    width:"100%", height:"100%",
    fontFamily:"'Apple SD Gothic Neo', 'Nanum Gothic', sans-serif",
  },
  screen: {
    width:"calc(100vw / 1.1)",
    height:"calc(100dvh /1.3)",
    background:"#f8faf8",
    borderRadius:0,
    overflow:"hidden",
    display:"flex", flexDirection:"column",
    position:"fixed",
    top:0, left:0,
    transform:"scale(1.1, 1.3)",
    transformOrigin:"top left",
  },
  statusBar: {
    display:"none",
  },
  bottomNav: {
    display:"flex",
    background:"#fff",
    borderTop:"1px solid #f0f0f0",
    paddingBottom:"env(safe-area-inset-bottom, 8px)",
    boxShadow:"0 -4px 20px rgba(0,0,0,0.06)"
  }
};
