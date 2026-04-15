import { useState, useEffect, useRef } from "react";

function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - (r.top + r.height) / (vh + r.height) + 0.30;
      setP(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [ref]);
  return p;
}

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

function S({ id, h = "160vh", children }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  return (
    <section ref={ref} id={id} style={{ minHeight: h, position: "relative" }}>
      {children(p)}
    </section>
  );
}

/* ─── Source link ─── */
function Src({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      color: "#00d4ff", textDecoration: "none", borderBottom: "1px dotted rgba(0,212,255,0.3)",
      transition: "border-color 0.3s",
    }} onMouseOver={e => e.target.style.borderBottomColor = "#00d4ff"}
       onMouseOut={e => e.target.style.borderBottomColor = "rgba(0,212,255,0.3)"}>
      {children}
    </a>
  );
}

/* ─── Interactive AV Exploder ─── */
function AVExploder() {
  const [expand, setExpand] = useState(0);
  const layers = [
    { label: "Body Shell", color: "#a1a1aa", y: 0 },
    { label: "LiDAR & Sensors", color: "#00d4ff", y: 1 },
    { label: "AI Decision Engine", color: "#7b61ff", y: 2 },
    { label: "Passenger Cabin", color: "#38bdf8", y: 3 },
  ];
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", width: 320, height: 220, margin: "0 auto" }}>
        {layers.map((l, i) => {
          const offset = expand * (i - 1.5) * 38;
          return (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "50%",
              transform: `translate(-50%, calc(-50% + ${offset}px))`,
              transition: "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.4s",
              zIndex: 4 - i,
            }}>
              {i === 0 && (
                <svg viewBox="0 0 300 100" style={{ width: 300 }}>
                  <path d="M30 65Q30 40 55 40L245 40Q270 40 270 65L270 80Q270 88 262 88L38 88Q30 88 30 80Z" fill={l.color} opacity="0.7"/>
                  <path d="M80 40Q85 10 120 6L185 6Q215 10 222 40Z" fill="#7dd3fc" opacity="0.4"/>
                </svg>
              )}
              {i === 1 && (
                <svg viewBox="0 0 300 50" style={{ width: 300 }}>
                  <ellipse cx="150" cy="20" rx="8" ry="6" fill={l.color} opacity="0.9"/>
                  {[-60,-30,0,30,60].map((dx,j)=>(
                    <g key={j}>
                      <circle cx={150+dx} cy="35" r="4" fill={l.color} opacity="0.6"/>
                      <line x1={150+dx} y1="35" x2={150+dx} y2="20" stroke={l.color} strokeWidth="0.5" opacity="0.4"/>
                    </g>
                  ))}
                  <circle cx="150" cy="20" r="18" fill="none" stroke={l.color} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3">
                    <animateTransform attributeName="transform" type="rotate" from="0 150 20" to="360 150 20" dur="4s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              )}
              {i === 2 && (
                <svg viewBox="0 0 300 40" style={{ width: 300 }}>
                  <rect x="100" y="8" width="100" height="24" rx="6" fill={l.color} opacity="0.5"/>
                  <text x="150" y="24" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" opacity="0.7">AI CORE</text>
                  {[110,125,140,155,170,185].map((x,j)=>(
                    <rect key={j} x={x} y="12" width="3" height="3" rx="1" fill="#fff" opacity={0.3+j*0.1}>
                      <animate attributeName="opacity" values={`${0.3+j*0.1};0.9;${0.3+j*0.1}`} dur={`${1+j*0.2}s`} repeatCount="indefinite"/>
                    </rect>
                  ))}
                </svg>
              )}
              {i === 3 && (
                <svg viewBox="0 0 300 60" style={{ width: 300 }}>
                  <rect x="90" y="5" width="120" height="45" rx="10" fill="rgba(255,255,255,0.05)" stroke={l.color} strokeWidth="0.5" opacity="0.6"/>
                  {/* Passenger silhouettes */}
                  <circle cx="130" cy="22" r="6" fill="rgba(255,255,255,0.2)"/>
                  <path d="M124 30 Q124 42 130 42 Q136 42 136 30" fill="rgba(255,255,255,0.15)"/>
                  <circle cx="170" cy="22" r="6" fill="rgba(255,255,255,0.2)"/>
                  <path d="M164 30 Q164 42 170 42 Q176 42 176 30" fill="rgba(255,255,255,0.15)"/>
                  {/* Phone screen glow */}
                  <rect x="166" y="28" width="8" height="12" rx="1.5" fill="rgba(0,212,255,0.15)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5"/>
                </svg>
              )}
              {expand > 0.3 && (
                <div style={{
                  position: "absolute", right: i%2===0 ? -120 : "auto", left: i%2===1 ? -120 : "auto",
                  top: "50%", transform: "translateY(-50%)", fontSize: 10, color: l.color,
                  fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap",
                  opacity: Math.min(1, (expand-0.3)*3),
                }}>
                  {l.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 16, display:"flex", alignItems:"center", justifyContent:"center", gap: 14 }}>
        <span style={{ fontSize: 11, color: "rgba(245,245,247,0.4)" }}>Assembled</span>
        <input type="range" min="0" max="100" value={expand * 100}
          onChange={e => setExpand(e.target.value / 100)}
          style={{ width: 160, accentColor: "#00d4ff", cursor: "pointer" }}
        />
        <span style={{ fontSize: 11, color: "rgba(245,245,247,0.4)" }}>Exploded</span>
      </div>
      <p style={{ fontSize: 10, color: "rgba(245,245,247,0.3)", marginTop: 8 }}>Drag the slider to explore AV technology layers</p>
    </div>
  );
}

/* ─── Passenger Scene (transition visual) ─── */
function PassengerScene({ variant = "isolated" }) {
  return (
    <svg viewBox="0 0 500 200" style={{ width: "100%", maxWidth: 420, filter: "drop-shadow(0 10px 30px rgba(0,100,255,0.1))" }}>
      <defs>
        <linearGradient id="carBg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#151a2e"/><stop offset="100%" stopColor="#111827"/></linearGradient>
      </defs>
      {/* Car exterior */}
      <rect x="40" y="50" width="420" height="110" rx="30" fill="url(#carBg)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <path d="M130 50 Q135 15 180 10 L320 10 Q365 15 370 50" fill="rgba(120,180,255,0.08)" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5"/>
      {/* Wheels */}
      <circle cx="120" cy="160" r="22" fill="#1c1c1e" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><circle cx="120" cy="160" r="10" fill="#333"/>
      <circle cx="380" cy="160" r="22" fill="#1c1c1e" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/><circle cx="380" cy="160" r="10" fill="#333"/>
      {/* Sensor */}
      <ellipse cx="250" cy="10" rx="10" ry="5" fill="rgba(0,212,255,0.3)"/>
      <circle cx="250" cy="10" r="16" fill="none" stroke="#00d4ff" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="r" values="16;40" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Interior passengers */}
      {variant === "isolated" ? (<>
        {/* Person 1 - on phone */}
        <circle cx="180" cy="75" r="12" fill="rgba(255,255,255,0.15)"/>
        <rect x="172" y="88" width="16" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
        <rect x="177" y="92" width="10" height="16" rx="2" fill="rgba(0,212,255,0.2)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.5">
          <animate attributeName="fill" values="rgba(0,212,255,0.2);rgba(0,212,255,0.35);rgba(0,212,255,0.2)" dur="3s" repeatCount="indefinite"/>
        </rect>
        {/* Person 2 - on laptop */}
        <circle cx="300" cy="75" r="12" fill="rgba(255,255,255,0.15)"/>
        <rect x="292" y="88" width="16" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
        <rect x="280" y="105" width="40" height="24" rx="3" fill="rgba(123,97,255,0.15)" stroke="rgba(123,97,255,0.25)" strokeWidth="0.5"/>
        <rect x="284" y="108" width="32" height="14" rx="1" fill="rgba(123,97,255,0.1)">
          <animate attributeName="fill" values="rgba(123,97,255,0.1);rgba(123,97,255,0.25);rgba(123,97,255,0.1)" dur="4s" repeatCount="indefinite"/>
        </rect>
      </>) : (<>
        {/* People talking */}
        <circle cx="200" cy="75" r="12" fill="rgba(255,255,255,0.15)"/>
        <rect x="192" y="88" width="16" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="300" cy="75" r="12" fill="rgba(255,255,255,0.15)"/>
        <rect x="292" y="88" width="16" height="30" rx="5" fill="rgba(255,255,255,0.1)"/>
        {/* Speech bubbles */}
        <ellipse cx="220" cy="65" rx="14" ry="8" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="280" cy="60" rx="14" ry="8" fill="rgba(123,97,255,0.12)" stroke="rgba(123,97,255,0.2)" strokeWidth="0.5">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
        </ellipse>
      </>)}
      {/* Road */}
      <line x1="0" y1="185" x2="500" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="10 8"/>
    </svg>
  );
}

/* ─── Backgrounds ─── */
function Car({ style }) {
  return (
    <div style={style}>
      <svg viewBox="0 0 400 180" style={{ width: 400, maxWidth: "80vw", filter: "drop-shadow(0 30px 60px rgba(0,180,255,0.25))" }}>
        <defs>
          <linearGradient id="bd" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e4e4e7"/><stop offset="100%" stopColor="#71717a"/></linearGradient>
          <linearGradient id="wn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7dd3fc"/><stop offset="100%" stopColor="#0369a1"/></linearGradient>
        </defs>
        <ellipse cx="200" cy="168" rx="145" ry="8" fill="rgba(0,0,0,0.15)"/>
        <path d="M52 120Q52 94 78 94L322 94Q348 94 348 120L348 150Q348 160 338 160L62 160Q52 160 52 150Z" fill="url(#bd)"/>
        <path d="M112 94Q117 54 158 50L250 50Q286 54 292 94Z" fill="url(#wn)" opacity="0.85"/>
        <rect x="332" y="112" width="19" height="7" rx="3.5" fill="#00d4ff"/>
        <rect x="49" y="112" width="19" height="7" rx="3.5" fill="#f87171" opacity="0.6"/>
        {[[115,160],[285,160]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="19" fill="#1c1c1e"/><circle cx={cx} cy={cy} r="11" fill="#333"/><circle cx={cx} cy={cy} r="4" fill="#666"/></g>)}
        <ellipse cx="200" cy="50" rx="9" ry="6" fill="#d4d4d8"/>
        {[0,1,2].map(i=><circle key={i} cx="200" cy="50" r="14" fill="none" stroke="#00d4ff" strokeWidth="0.7"><animate attributeName="r" values="14;50" dur="2.2s" begin={`${i*.7}s`} repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0" dur="2.2s" begin={`${i*.7}s`} repeatCount="indefinite"/></circle>)}
      </svg>
    </div>
  );
}

function GridBg({ opacity = 0.06 }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      <svg width="100%" height="100%" style={{ opacity }}>
        <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
  );
}

function FloatingRings({ count = 5 }) {
  const rings = useRef(Array.from({ length: count }, (_, i) => ({
    x: 10+Math.random()*80, y: 10+Math.random()*80, size: 60+Math.random()*150,
    dur: 8+Math.random()*10, del: Math.random()*5, color: ["#00d4ff","#7b61ff","#0066ff"][i%3],
  }))).current;
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    {rings.map((r,i)=><div key={i} style={{position:"absolute",left:`${r.x}%`,top:`${r.y}%`,width:r.size,height:r.size,borderRadius:"50%",border:`1.5px solid ${r.color}`,opacity:0.22,animation:`ringFloat ${r.dur}s ease-in-out ${r.del}s infinite alternate`}}/>)}
  </div>;
}

function Dots({ n = 25 }) {
  const d = useRef(Array.from({ length: n }, () => ({
    x: Math.random()*100, y: Math.random()*100, s: 2+Math.random()*4,
    dur: 5+Math.random()*7, del: Math.random()*5,
    c: ["#00d4ff","#7b61ff","#f5f5f7","#0066ff"][Math.floor(Math.random()*4)],
  }))).current;
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    {d.map((o,i)=><div key={i} style={{position:"absolute",left:`${o.x}%`,top:`${o.y}%`,width:o.s,height:o.s,borderRadius:"50%",background:o.c,opacity:0.35,animation:`pf ${o.dur}s ease-in-out ${o.del}s infinite alternate`}}/>)}
  </div>;
}

function Blob({ x, y, size, color }) {
  return <div style={{position:"absolute",left:x,top:y,width:size,height:size,borderRadius:"50%",background:color,filter:"blur(80px)",pointerEvents:"none",animation:"blobPulse 8s ease-in-out infinite alternate"}}/>;
}

function NoiseOverlay() {
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:99,opacity:0.03,mixBlendMode:"overlay",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"128px 128px"}}/>;
}

/* ─── Transition visual between sections ─── */
function Transition({ children }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      padding: "60px clamp(20px,4vw,60px)", display: "flex", justifyContent: "center", alignItems: "center",
      flexDirection: "column", position: "relative", overflow: "hidden",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      <Dots n={8}/>
      {children}
    </div>
  );
}

const NAV = [
  { id:"hero", l:"Home" }, { id:"social", l:"Social Life" },
  { id:"time", l:"Time & Space" }, { id:"cities", l:"Cities" }, { id:"future", l:"What's Next" },
];

export default function AVWebsite() {
  const [act, setAct] = useState("hero");
  const [sc, setSc] = useState(false);
  const [globalP, setGlobalP] = useState(0);

  useEffect(() => {
    const h = () => {
      setSc(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setGlobalP(docH > 0 ? window.scrollY / docH : 0);
      let b = "hero";
      for (const s of NAV) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) b = s.id;
      }
      setAct(b);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background:"#08080c", color:"#f5f5f7", fontFamily:"'DM Sans','Helvetica Neue',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        *{margin:0;padding:0;box-sizing:border-box} html{scroll-behavior:smooth} body{background:#08080c}
        @keyframes pf{0%{transform:translateY(0) scale(1)}100%{transform:translateY(-35px) scale(1.2)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes ringFloat{0%{transform:translate(0,0) rotate(0deg) scale(1)}100%{transform:translate(20px,-30px) rotate(180deg) scale(1.15)}}
        @keyframes blobPulse{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.25);opacity:1}}
        .pill{color:rgba(245,245,247,0.4);font-size:11px;letter-spacing:1px;font-weight:500;cursor:pointer;padding:5px 14px;border-radius:50px;transition:all .35s;border:1px solid transparent;text-transform:uppercase}
        .pill:hover{color:#f5f5f7} .pill.on{color:#f5f5f7;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.1)}
        .gt{background:linear-gradient(135deg,#00d4ff,#7b61ff,#00d4ff);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}
        .lb{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#00d4ff;font-weight:600;margin-bottom:14px}
        input[type=range]{-webkit-appearance:none;background:rgba(255,255,255,0.1);height:4px;border-radius:4px;outline:none}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#00d4ff;cursor:pointer;box-shadow:0 0 10px rgba(0,212,255,0.4)}
        @media(max-width:800px){.grid2{grid-template-columns:1fr!important} .pill{font-size:9px;padding:4px 8px;letter-spacing:0.5px}}
      `}</style>

      <NoiseOverlay />

      <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:200,background:"rgba(255,255,255,0.05)"}}>
        <div style={{height:"100%",width:`${globalP*100}%`,background:"linear-gradient(90deg,#00d4ff,#7b61ff)",transition:"width 0.1s"}}/>
      </div>

      <nav style={{position:"fixed",top:2,left:0,right:0,zIndex:100,padding:"0 clamp(16px,4vw,48px)",background:sc?"rgba(8,8,12,0.85)":"transparent",backdropFilter:sc?"blur(40px) saturate(180%)":"none",borderBottom:sc?"1px solid rgba(255,255,255,0.06)":"none",transition:"all .5s cubic-bezier(.4,0,.2,1)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
          <div style={{fontWeight:700,fontSize:16,letterSpacing:"-.5px"}}><span style={{color:"#00d4ff"}}>AV</span><span style={{color:"rgba(245,245,247,0.4)",fontWeight:400}}> & Society</span></div>
          <div style={{display:"flex",gap:4}}>{NAV.map(n=><span key={n.id} className={`pill ${act===n.id?"on":""}`} onClick={()=>go(n.id)}>{n.l}</span>)}</div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <S id="hero" h="160vh">
        {(p) => {
          const intro = ease(Math.min(1, p*5));
          const introY = lerp(80,0,ease(Math.min(1,p*5)));
          const carIn = ease(Math.min(1,Math.max(0,(p-.05)*4)));
          const sub = ease(Math.min(1,Math.max(0,(p-.15)*4)));
          const cta = ease(Math.min(1,Math.max(0,(p-.25)*4)));
          const exitOp = Math.max(0,1-Math.max(0,(p-.65)*4));
          const exitY = lerp(0,-120,Math.max(0,(p-.65)*3));
          return (
            <div style={{position:"sticky",top:0,height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",overflow:"hidden"}}>
              <GridBg/><Dots n={45}/><FloatingRings count={6}/>
              <Blob x="-5%" y="15%" size="450px" color="rgba(0,100,255,0.1)"/>
              <Blob x="65%" y="55%" size="350px" color="rgba(123,97,255,0.08)"/>
              <Blob x="35%" y="-5%" size="300px" color="rgba(0,212,255,0.07)"/>
              <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.08}}>
                <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="6 14"/>
                <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#7b61ff" strokeWidth="0.5" strokeDasharray="6 14"/>
              </svg>
              <div style={{position:"relative",zIndex:2,transform:`translateY(${exitY}px)`,opacity:exitOp,padding:"0 20px",maxWidth:900}}>
                <div className="lb" style={{opacity:intro,transform:`translateY(${introY}px)`}}>Exploring the Unseen Impact</div>
                <h1 style={{fontFamily:"'DM Sans'",fontSize:"clamp(40px,7.5vw,92px)",fontWeight:700,letterSpacing:"-3px",lineHeight:1.0,marginBottom:20,opacity:intro,transform:`translateY(${introY}px)`}}>
                  Autonomous Vehicles.<br/><span className="gt">Social Consequences.</span>
                </h1>
                <div style={{display:"flex",justifyContent:"center",margin:"16px 0 28px"}}>
                  <Car style={{transform:`scale(${lerp(0.15,1.05,carIn)}) rotate(${lerp(-15,0,carIn)}deg) translateX(${lerp(-80,0,carIn)}px)`,opacity:carIn,willChange:"transform"}}/>
                </div>
                <p style={{fontSize:"clamp(15px,1.8vw,19px)",lineHeight:1.7,color:"rgba(245,245,247,0.55)",maxWidth:520,margin:"0 auto 32px",opacity:sub,transform:`translateY(${lerp(50,0,sub)}px)`}}>
                  Self-driving cars promise safer, easier travel. But what happens to the way we connect, share space, and experience our cities?
                </p>
                <div style={{opacity:cta,transform:`translateY(${lerp(30,0,cta)}px) scale(${lerp(0.9,1,cta)})`}}>
                  <span onClick={()=>go("social")} style={{display:"inline-flex",alignItems:"center",gap:8,background:"linear-gradient(135deg,#0055dd,#00bbee)",color:"#fff",padding:"14px 34px",borderRadius:50,fontSize:14,fontWeight:600,cursor:"pointer",boxShadow:"0 0 50px rgba(0,150,255,0.25)"}}>
                    Explore the Impact
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  </span>
                </div>
              </div>
              <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",opacity:lerp(0.6,0,p*3)}}>
                <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(245,245,247,0.35)",marginBottom:8}}>Scroll</div>
                <div style={{width:1,height:32,background:"linear-gradient(180deg,rgba(245,245,247,0.3),transparent)",margin:"0 auto"}}/>
              </div>
            </div>
          );
        }}
      </S>

      {/* ─── Transition: Explore AV Layers ─── */}
      <Transition>
        <div className="lb" style={{marginBottom:8}}>Interactive</div>
        <h3 style={{fontFamily:"'DM Sans'",fontSize:"clamp(22px,3vw,32px)",fontWeight:600,letterSpacing:"-1px",marginBottom:24,textAlign:"center"}}>
          What's inside an autonomous vehicle?
        </h3>
        <AVExploder />
      </Transition>

      {/* ═══ SOCIAL ═══ */}
      <S id="social" h="170vh">
        {(p) => {
          const h1 = ease(Math.min(1,p*4));
          const t1 = ease(Math.min(1,Math.max(0,(p-.08)*3.5)));
          const card = ease(Math.min(1,Math.max(0,(p-.18)*3)));
          const tagP = (i) => ease(Math.min(1,Math.max(0,(card-.2-i*.1)*4)));
          const bridge = ease(Math.min(1,Math.max(0,(p-.4)*3)));
          const exit = Math.max(0,(p-.82)*6);
          return (
            <div style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"0 clamp(20px,4vw,60px)"}}>
              <GridBg opacity={0.05}/><FloatingRings count={4}/>
              <Blob x="15%" y="25%" size="500px" color="rgba(0,212,255,0.08)"/>
              <Blob x="70%" y="55%" size="350px" color="rgba(123,97,255,0.06)"/>
              <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",border:"1px solid rgba(0,212,255,0.12)",top:"50%",left:"35%",transform:`translate(-50%,-50%) scale(${lerp(0.3,2,p)})`,pointerEvents:"none",opacity:lerp(0.3,0,Math.max(0,p-0.7))}}/>
              <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.08}}>
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="8 16"/>
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#7b61ff" strokeWidth="0.5" strokeDasharray="8 16"/>
                <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="8 16"/>
              </svg>
              <div style={{maxWidth:1000,width:"100%",zIndex:2,opacity:Math.max(0,1-exit)}}>
                <div style={{opacity:h1,transform:`translateX(${lerp(-100,0,h1)}px)`}}>
                  <div className="lb">The Social Question</div>
                  <h2 style={{fontFamily:"'DM Sans'",fontSize:"clamp(30px,5vw,60px)",fontWeight:700,letterSpacing:"-2px",lineHeight:1.05,marginBottom:32}}>
                    More than just<br/>transportation.
                  </h2>
                </div>
                <div className="grid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
                  <div>
                    <div style={{opacity:t1,transform:`translateY(${lerp(60,0,t1)}px)`}}>
                      <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)",marginBottom:18}}>
                        AVs are entering a culture already shaped by private consumption, digital isolation, and weakening public life — what journalist Derek Thompson calls <Src href="https://www.theatlantic.com/magazine/archive/2025/02/american-loneliness-epidemic-anti-social-century/681076/"><em>the anti-social century</em></Src>.
                      </p>
                      <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)"}}>
                        Among AV developers, <Src href="https://www.routledge.com/Sustainability-Prospects-for-Autonomous-Vehicles-Environmental-Social-and-Urban/Martin/p/book/9780367219659">social acceptance ranks dead last</Src> as a priority — even though the technology could reshape how entire communities interact.
                      </p>
                    </div>
                    <div style={{marginTop:28,opacity:bridge,transform:`translateY(${lerp(50,0,bridge)}px) scale(${lerp(0.85,1,bridge)})`,transformOrigin:"top left"}}>
                      <div style={{background:"linear-gradient(135deg,rgba(0,212,255,0.1),rgba(123,97,255,0.1))",borderRadius:20,padding:"22px 24px",border:"1px solid rgba(255,255,255,0.09)"}}>
                        <div style={{fontSize:12,fontWeight:600,color:"#7b61ff",marginBottom:8}}>Convenience ≠ Connection</div>
                        <p style={{fontSize:13,color:"rgba(245,245,247,0.55)",lineHeight:1.65}}>
                          <Src href="https://doi.org/10.1111/sjop.12998">COVID-era research</Src> found digital tools helped reduce isolation — but they were never a full substitute for face-to-face contact. The same logic applies to AV travel.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{opacity:card,transform:`scale(${lerp(0.5,1,card)}) translateY(${lerp(80,0,card)}px) rotateY(${lerp(-12,0,card)}deg)`,transformOrigin:"center",perspective:800}}>
                    <div style={{background:"rgba(255,255,255,0.04)",backdropFilter:"blur(20px)",borderRadius:24,padding:"34px 28px",border:"1px solid rgba(255,255,255,0.1)"}}>
                      <div style={{fontSize:12,fontWeight:600,color:"#00d4ff",marginBottom:14}}>Key Insight</div>
                      <p style={{fontSize:20,fontWeight:500,lineHeight:1.45,fontFamily:"'DM Sans'",marginBottom:14}}>
                        "AVs may create technical gains while still producing negative social spillovers."
                      </p>
                      <p style={{fontSize:11,color:"rgba(245,245,247,0.35)"}}>— <Src href="https://www.routledge.com/Sustainability-Prospects-for-Autonomous-Vehicles-Environmental-Social-and-Urban/Martin/p/book/9780367219659">George Martin</Src>, <em>Sustainability Prospects for Autonomous Vehicles</em></p>
                      <div style={{marginTop:20,display:"flex",flexWrap:"wrap",gap:7}}>
                        {["Urban Sprawl","Street Life","Public Transit","Social Fabric"].map((t,i)=>(
                          <span key={t} style={{padding:"4px 12px",borderRadius:50,fontSize:10,color:"#00d4ff",background:"rgba(0,212,255,0.1)",border:"1px solid rgba(0,212,255,0.2)",opacity:tagP(i),transform:`translateY(${lerp(20,0,tagP(i))}px) scale(${lerp(0.7,1,tagP(i))})`}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </S>

      {/* ─── Transition: Isolated Passenger ─── */}
      <Transition>
        <div className="lb" style={{marginBottom:8}}>Inside the Autonomous Ride</div>
        <p style={{fontSize:"clamp(16px,2vw,20px)",fontFamily:"'DM Sans'",fontWeight:300,lineHeight:1.6,color:"rgba(245,245,247,0.5)",maxWidth:500,textAlign:"center",marginBottom:24}}>
          Passengers default to screens. The commute becomes another productivity window.
        </p>
        <PassengerScene variant="isolated" />
      </Transition>

      {/* ═══ TIME & SPACE ═══ */}
      <S id="time" h="170vh">
        {(p) => {
          const h1 = ease(Math.min(1,p*4));
          const txt = ease(Math.min(1,Math.max(0,(p-.08)*3.5)));
          const c0 = ease(Math.min(1,Math.max(0,(p-.15)*3.5)));
          const c1 = ease(Math.min(1,Math.max(0,(p-.22)*3.5)));
          const c2 = ease(Math.min(1,Math.max(0,(p-.29)*3.5)));
          const cards = [c0,c1,c2];
          const quote = ease(Math.min(1,Math.max(0,(p-.45)*3)));
          const exit = Math.max(0,(p-.82)*6);
          return (
            <div style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"0 clamp(20px,4vw,60px)"}}>
              <GridBg opacity={0.045}/>
              <Blob x="55%" y="15%" size="400px" color="rgba(123,97,255,0.08)"/>
              <Blob x="10%" y="65%" size="350px" color="rgba(0,212,255,0.07)"/>
              <FloatingRings count={3}/><Dots n={20}/>
              <svg style={{position:"absolute",right:"6%",top:"12%",width:200,height:200,opacity:0.1,pointerEvents:"none"}}>
                <circle cx="100" cy="100" r="85" fill="none" stroke="#00d4ff" strokeWidth="0.8"/>
                <circle cx="100" cy="100" r="65" fill="none" stroke="#7b61ff" strokeWidth="0.5"/>
                {Array.from({length:12}).map((_,i)=>{const a=(i*30-90)*Math.PI/180;return <circle key={i} cx={100+Math.cos(a)*78} cy={100+Math.sin(a)*78} r="2" fill="rgba(255,255,255,0.3)"/>;})}
                <line x1="100" y1="100" x2="100" y2="35" stroke="#f5f5f7" strokeWidth="1.5" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite"/></line>
                <line x1="100" y1="100" x2="140" y2="100" stroke="#00d4ff" strokeWidth="1" strokeLinecap="round"><animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite"/></line>
              </svg>
              <div style={{maxWidth:1000,width:"100%",zIndex:2,opacity:Math.max(0,1-exit)}}>
                <div style={{opacity:h1,transform:`translateY(${lerp(70,0,h1)}px)`}}>
                  <div className="lb">Reclaiming Time?</div>
                  <h2 style={{fontFamily:"'DM Sans'",fontSize:"clamp(30px,5vw,60px)",fontWeight:700,letterSpacing:"-2px",lineHeight:1.05,marginBottom:36}}>
                    Free time — or just<br/><span className="gt">more screen time?</span>
                  </h2>
                </div>
                <div className="grid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
                  <div style={{opacity:txt,transform:`translateY(${lerp(50,0,txt)}px)`}}>
                    <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)",marginBottom:18}}>
                      AVs are celebrated for "giving back" travel time. But <Src href="https://doi.org/10.1007/s00146-021-01334-6">McCarroll & Cugurullo</Src> argue this time won't stay free — it gets absorbed into work, consumption, and digital activity.
                    </p>
                    <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)"}}>
                      The car becomes another extension of the workday. Not a space for rest or human connection — just another productivity window.
                    </p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:14}}>
                    {[
                      {icon:"⏱️",title:"Work absorbs travel",text:"Commute becomes another productivity window — emails, calls, tasks."},
                      {icon:"📱",title:"Screens fill the void",text:"Without driving, passengers default to personal devices and media."},
                      {icon:"🫧",title:"Enclosure deepens",text:"The ride becomes a self-contained bubble, cut off from the outside."},
                    ].map((item,i) => {
                      const cp = cards[i];
                      return (
                        <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:18,padding:"18px 22px",border:"1px solid rgba(255,255,255,0.09)",opacity:cp,transform:`translateX(${lerp(100,0,cp)}px) scale(${lerp(0.8,1,cp)}) rotateZ(${lerp(3,0,cp)}deg)`,transformOrigin:"left center"}}>
                          <div style={{display:"flex",gap:14,alignItems:"center"}}>
                            <span style={{fontSize:22,transform:`scale(${lerp(0.3,1,cp)})`,display:"inline-block"}}>{item.icon}</span>
                            <div>
                              <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{item.title}</div>
                              <div style={{fontSize:12,color:"rgba(245,245,247,0.45)",lineHeight:1.5}}>{item.text}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{marginTop:32,textAlign:"center",opacity:quote,transform:`scale(${lerp(0.8,1,quote)}) translateY(${lerp(40,0,quote)}px)`}}>
                  <div style={{background:"rgba(255,255,255,0.035)",borderRadius:24,padding:"28px 32px",border:"1px solid rgba(255,255,255,0.08)"}}>
                    <p style={{fontSize:"clamp(16px,2vw,21px)",fontFamily:"'DM Sans'",lineHeight:1.65,color:"rgba(245,245,247,0.6)",fontWeight:300,maxWidth:600,margin:"0 auto"}}>
                      Technologies isolate not by cutting people off — but by making <span style={{color:"#f5f5f7",fontWeight:600}}>private, optimized, low-friction</span> experiences more attractive than public, unpredictable ones.
                      <span style={{fontSize:11,color:"rgba(245,245,247,0.3)",marginLeft:6}}>— <Src href="https://doi.org/10.1007/s00146-021-01334-6">McCarroll & Cugurullo, 2022</Src></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </S>

      {/* ─── Transition: Shared vs Private ─── */}
      <Transition>
        <div className="lb" style={{marginBottom:8}}>An Alternative Future</div>
        <p style={{fontSize:"clamp(16px,2vw,20px)",fontFamily:"'DM Sans'",fontWeight:300,lineHeight:1.6,color:"rgba(245,245,247,0.5)",maxWidth:500,textAlign:"center",marginBottom:24}}>
          What if autonomous vehicles were designed for connection instead of isolation?
        </p>
        <PassengerScene variant="shared" />
      </Transition>

      {/* ═══ CITIES ═══ */}
      <S id="cities" h="170vh">
        {(p) => {
          const h1 = ease(Math.min(1,p*4));
          const txt = ease(Math.min(1,Math.max(0,(p-.08)*3.5)));
          const city = ease(Math.min(1,Math.max(0,(p-.2)*2.5)));
          const c0 = ease(Math.min(1,Math.max(0,(p-.42)*3.5)));
          const c1 = ease(Math.min(1,Math.max(0,(p-.48)*3.5)));
          const c2 = ease(Math.min(1,Math.max(0,(p-.54)*3.5)));
          const impactCards = [c0,c1,c2];
          const exit = Math.max(0,(p-.82)*6);
          return (
            <div style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"40px clamp(20px,4vw,60px)"}}>
              <GridBg opacity={0.045}/><Dots n={15}/>
              <Blob x="5%" y="35%" size="400px" color="rgba(0,212,255,0.07)"/>
              <Blob x="75%" y="15%" size="300px" color="rgba(123,97,255,0.08)"/>
              <FloatingRings count={4}/>
              <div style={{maxWidth:1000,width:"100%",zIndex:2,opacity:Math.max(0,1-exit)}}>
                <div style={{opacity:h1,transform:`translateX(${lerp(-80,0,h1)}px) scale(${lerp(0.92,1,h1)})`}}>
                  <div className="lb">Urban Transformation</div>
                  <h2 style={{fontFamily:"'DM Sans'",fontSize:"clamp(26px,4vw,48px)",fontWeight:700,letterSpacing:"-2px",lineHeight:1.05,marginBottom:14}}>
                    Reshaping the city<br/>around isolation.
                  </h2>
                </div>
                <div className="grid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,alignItems:"center"}}>
                  <div style={{opacity:txt,transform:`translateY(${lerp(50,0,txt)}px)`}}>
                    <p style={{fontSize:14,lineHeight:1.7,color:"rgba(245,245,247,0.6)",marginBottom:12}}>
                      Users see AVs positively for safety and comfort. But <Src href="https://www.ceeol.com/search/article-detail?id=1177722">urban experts worry</Src> about sprawl, reduced walking, and fewer spontaneous public encounters.
                    </p>
                    <p style={{fontSize:14,lineHeight:1.7,color:"rgba(245,245,247,0.6)"}}>
                      If autonomous mobility increases urban sprawl and reduces face-to-face interaction, AVs don't just modernize city life — they <Src href="https://www.ceeol.com/search/article-detail?id=1177722">reorganize it around even more individualized movement</Src>.
                    </p>
                  </div>
                  <div style={{opacity:city,transformOrigin:"bottom center"}}>
                    <svg viewBox="0 0 380 220" style={{width:"100%",maxHeight:"24vh"}}>
                      {[{x:15,w:46,h:95},{x:70,w:38,h:70},{x:118,w:55,h:145},{x:182,w:42,h:100},{x:232,w:50,h:130},{x:290,w:40,h:65},{x:338,w:36,h:108}].map((b,i)=>{
                        const bp = Math.min(1,Math.max(0,(city-i*0.06)*2));
                        const bh = b.h*bp;
                        return <g key={i}>
                          <rect x={b.x} y={200-bh} width={b.w} height={bh} rx={2} fill={i%2===0?"#151a2e":"#111827"} stroke="rgba(255,255,255,0.05)" strokeWidth={.5}/>
                          {bh>15 && Array.from({length:Math.floor(bh/18)}).map((_,j)=>
                            Array.from({length:Math.floor(b.w/12)}).map((_,k)=>
                              <rect key={`${j}${k}`} x={b.x+4+k*12} y={200-bh+6+j*18} width={4} height={8} rx={1}
                                fill={Math.random()>.4?"rgba(0,212,255,0.25)":"rgba(250,204,21,0.18)"}/>
                            )
                          )}
                        </g>;
                      })}
                      <rect x="0" y="200" width="380" height="20" fill="#0d0d12"/>
                      <line x1="0" y1="210" x2="380" y2="210" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="12 8"/>
                      <rect x="155" y="194" width="32" height="12" rx="5" fill="#71717a" opacity={city}/>
                      <circle cx="164" cy="206" r="3" fill="#3f3f46"/><circle cx="180" cy="206" r="3" fill="#3f3f46"/>
                      <circle cx="171" cy="194" r="2.5" fill="#00d4ff" opacity="0.6"><animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite"/></circle>
                    </svg>
                  </div>
                </div>
                <div className="grid2" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:12}}>
                  {[
                    {icon:"🏘️",title:"Urban Sprawl",text:"Longer commutes, lower density, cities spread outward."},
                    {icon:"🚶",title:"Less Walking",text:"Door-to-door travel reduces sidewalk encounters."},
                    {icon:"🤝",title:"Fewer Encounters",text:"Movement becomes privatized, spontaneous interaction fades."},
                  ].map((c,i)=>{
                    const cp = impactCards[i];
                    return <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:16,padding:"14px 14px",border:"1px solid rgba(255,255,255,0.09)",opacity:cp,transform:`translateY(${lerp(60,0,cp)}px) scale(${lerp(0.7,1,cp)})`}}>
                      <div style={{fontSize:20,marginBottom:4,transform:`scale(${lerp(0.2,1,cp)})`,display:"inline-block"}}>{c.icon}</div>
                      <div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{c.title}</div>
                      <div style={{fontSize:10,color:"rgba(245,245,247,0.45)",lineHeight:1.5}}>{c.text}</div>
                    </div>;
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </S>

      {/* ═══ FUTURE ═══ */}
      <S id="future" h="160vh">
        {(p) => {
          const h1 = ease(Math.min(1,p*4));
          const txt = ease(Math.min(1,Math.max(0,(p-.08)*3.5)));
          const list = ease(Math.min(1,Math.max(0,(p-.2)*3)));
          const li = (i) => ease(Math.min(1,Math.max(0,(list-.1-i*.08)*4)));
          const closing = ease(Math.min(1,Math.max(0,(p-.5)*3)));
          return (
            <div style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"0 clamp(20px,4vw,60px)"}}>
              <GridBg opacity={0.04}/><FloatingRings count={5}/><Dots n={25}/>
              <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 65%)",top:"50%",right:"5%",transform:`translate(0,-50%) scale(${lerp(0.3,2,p)})`,pointerEvents:"none"}}/>
              <Blob x="10%" y="55%" size="350px" color="rgba(0,102,255,0.07)"/>
              <div style={{maxWidth:1000,width:"100%",zIndex:2}}>
                <div style={{opacity:h1,transform:`translateY(${lerp(60,0,h1)}px)`}}>
                  <div className="lb">Looking Ahead</div>
                  <h2 style={{fontFamily:"'DM Sans'",fontSize:"clamp(30px,5vw,60px)",fontWeight:700,letterSpacing:"-2px",lineHeight:1.05,marginBottom:32}}>
                    The question isn't <em>if</em> —<br/>it's <span className="gt">how</span>.
                  </h2>
                </div>
                <div className="grid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"start"}}>
                  <div style={{opacity:txt,transform:`translateY(${lerp(50,0,txt)}px)`}}>
                    <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)",marginBottom:18}}>
                      The research doesn't support a fully negative conclusion. AVs can reduce stress, improve accessibility, and create real transport gains. But these gains don't <Src href="https://www.routledge.com/Sustainability-Prospects-for-Autonomous-Vehicles-Environmental-Social-and-Urban/Martin/p/book/9780367219659">automatically strengthen public life</Src>.
                    </p>
                    <p style={{fontSize:15,lineHeight:1.8,color:"rgba(245,245,247,0.6)"}}>
                      What matters is how AVs are incorporated — shared fleets, transit integration, and community-centered design lead to very different outcomes than private adoption.
                    </p>
                  </div>
                  <div style={{opacity:list,transform:`scale(${lerp(0.75,1,list)}) translateY(${lerp(50,0,list)}px)`,background:"linear-gradient(135deg,rgba(0,102,255,0.08),rgba(0,212,255,0.08))",borderRadius:22,padding:"28px 26px",border:"1px solid rgba(0,212,255,0.15)"}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#00d4ff",marginBottom:18}}>The Path Forward</div>
                    {[
                      "Prioritize shared & public AV systems over private ownership",
                      "Integrate AVs with public transit rather than replacing it",
                      "Design for street life, not just traffic flow",
                      "Measure social outcomes alongside efficiency metrics",
                    ].map((item,i)=>(
                      <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:13,opacity:li(i),transform:`translateX(${lerp(40,0,li(i))}px)`}}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:"#00d4ff",marginTop:7,flexShrink:0,transform:`scale(${lerp(0,1.2,li(i))})`}}/>
                        <p style={{fontSize:13,lineHeight:1.6,color:"rgba(245,245,247,0.65)"}}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginTop:48,textAlign:"center",opacity:closing,transform:`scale(${lerp(0.85,1,closing)}) translateY(${lerp(35,0,closing)}px)`}}>
                  <p style={{fontSize:"clamp(17px,2.3vw,24px)",fontFamily:"'DM Sans'",fontWeight:300,lineHeight:1.65,color:"rgba(245,245,247,0.5)",maxWidth:650,margin:"0 auto"}}>
                    Autonomous vehicles may improve mobility. But without deliberate planning, they may also deepen the very forms of isolation that define our era.
                  </p>
                  <div style={{marginTop:24,display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
                    {[
                      {label:"Martin (2019)",href:"https://www.routledge.com/Sustainability-Prospects-for-Autonomous-Vehicles-Environmental-Social-and-Urban/Martin/p/book/9780367219659"},
                      {label:"McCarroll & Cugurullo (2022)",href:"https://doi.org/10.1007/s00146-021-01334-6"},
                      {label:"Nowland et al. (2024)",href:"https://doi.org/10.1111/sjop.12998"},
                      {label:"Luca & Andrei (2024)",href:"https://www.ceeol.com/search/article-detail?id=1177722"},
                      {label:"Thompson (2025)",href:"https://www.theatlantic.com/magazine/archive/2025/02/american-loneliness-epidemic-anti-social-century/681076/"},
                    ].map((s,i)=>(
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{fontSize:10,color:"#00d4ff",textDecoration:"none",padding:"4px 12px",borderRadius:50,border:"1px solid rgba(0,212,255,0.15)",background:"rgba(0,212,255,0.05)",transition:"all 0.3s"}}
                        onMouseOver={e=>{e.target.style.background="rgba(0,212,255,0.12)";e.target.style.borderColor="rgba(0,212,255,0.3)"}}
                        onMouseOut={e=>{e.target.style.background="rgba(0,212,255,0.05)";e.target.style.borderColor="rgba(0,212,255,0.15)"}}
                      >{s.label}</a>
                    ))}
                  </div>
                  <div style={{marginTop:28}}>
                    <p style={{fontSize:10,color:"rgba(245,245,247,0.2)",letterSpacing:1.5,textTransform:"uppercase"}}>
                      Nikhil Nandi · English 125 · University of Michigan · 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </S>
    </div>
  );
}
