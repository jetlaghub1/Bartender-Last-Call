:root{
  color-scheme:dark;
  --night:#090e18;
  --night-soft:#101827;
  --surface:#151f30;
  --surface-2:#1c293c;
  --surface-3:#243248;
  --paper:#fff8e8;
  --muted:#aab6c9;
  --brass:#e9b85a;
  --brass-light:#ffd985;
  --brass-dark:#8d6327;
  --green:#55d6a1;
  --green-dark:#183f36;
  --red:#ff7d86;
  --red-dark:#4c242b;
  --blue:#7dc5ff;
  --line:#34445d;
  --focus:#a5dcff;
  --shadow:0 20px 60px rgba(0,0,0,.34);
  --serif:Georgia,"Times New Roman",serif;
  --sans:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
}

*{box-sizing:border-box}
html{min-width:320px;background:var(--night)}
body{
  margin:0;
  min-height:100vh;
  color:var(--paper);
  font:16px/1.5 var(--sans);
  background:
    radial-gradient(circle at 50% -15%,rgba(77,38,54,.72),transparent 38rem),
    radial-gradient(circle at 15% 50%,rgba(26,58,73,.34),transparent 34rem),
    linear-gradient(180deg,#0b111c,var(--night));
  background-attachment:fixed;
}
body:before{
  content:"";
  position:fixed;
  inset:0;
  z-index:-1;
  pointer-events:none;
  opacity:.16;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size:42px 42px;
  mask-image:linear-gradient(to bottom,#000,transparent 75%);
}

button,a{font:inherit}
button{
  min-height:46px;
  border:1px solid transparent;
  border-radius:10px;
  padding:.72rem 1rem;
  color:#18130a;
  background:linear-gradient(180deg,var(--brass-light),var(--brass));
  box-shadow:0 7px 18px rgba(233,184,90,.16),inset 0 1px rgba(255,255,255,.35);
  font-weight:850;
  letter-spacing:.01em;
  cursor:pointer;
  transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease,filter .16s ease;
}
button:hover:not(:disabled){filter:brightness(1.07);box-shadow:0 10px 24px rgba(233,184,90,.23)}
button:active:not(:disabled){transform:translateY(1px) scale(.99)}
button:disabled{cursor:not-allowed;color:#747d8d;background:#273245;border-color:#344257;box-shadow:none;filter:none;animation:none}
button:focus-visible,a:focus-visible,.card:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
.ghost,.icon-button{color:var(--paper);background:rgba(21,31,48,.72);border-color:#52617a;box-shadow:none}
.ghost:hover:not(:disabled),.icon-button:hover:not(:disabled){border-color:var(--brass);background:var(--surface-2);box-shadow:none}

.site-header,main,footer{width:min(1240px,calc(100% - 2rem));margin-inline:auto}
.site-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 0;border-bottom:1px solid rgba(233,184,90,.2)}
.brand{display:inline-flex;align-items:center;gap:.72rem;color:inherit;text-decoration:none}
.brand-mark{display:grid;place-items:center;width:42px;height:42px;border:1px solid var(--brass);border-radius:50% 50% 46% 54%;color:var(--brass-light);font:800 1.35rem/1 var(--serif);box-shadow:inset 0 0 0 4px var(--night),0 0 24px rgba(233,184,90,.16)}
.brand small{display:block;margin-bottom:.12rem;color:var(--muted);font-size:.61rem;font-weight:800;letter-spacing:.2em}
.brand strong{font:700 clamp(1.15rem,2.5vw,1.5rem)/1 var(--serif)}
.brand em{color:var(--brass-light);font-style:normal}
.icon-button{display:inline-flex;align-items:center;gap:.5rem;white-space:nowrap}
.icon-button span{display:grid;place-items:center;width:1.35rem;height:1.35rem;border-radius:50%;color:var(--brass-light);background:#2c2330}
main{min-height:calc(100vh - 160px);padding:clamp(1rem,3vw,2rem) 0}
footer{display:flex;justify-content:space-between;gap:1rem;padding:1.4rem 0 calc(1.4rem + env(safe-area-inset-bottom));border-top:1px solid rgba(233,184,90,.16);color:#7f8ba0;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase}

h1,h2,h3,p{margin-top:0}
h1,h2,h3{font-family:var(--serif);line-height:1.12}
h2{font-size:clamp(1.65rem,4vw,2.55rem);margin-bottom:.65rem}
h3{font-size:1.08rem}
.eyebrow,.section-kicker{margin-bottom:.45rem;color:var(--brass-light);font-size:.69rem;font-weight:850;letter-spacing:.2em;text-transform:uppercase}
.money{color:var(--brass-light);font-variant-numeric:tabular-nums}
.muted{color:var(--muted)}

.panel{
  position:relative;
  overflow:hidden;
  padding:clamp(1rem,3vw,1.6rem);
  border:1px solid var(--line);
  border-radius:18px;
  background:linear-gradient(145deg,rgba(28,41,60,.97),rgba(17,26,40,.97));
  box-shadow:var(--shadow),inset 0 1px rgba(255,255,255,.035);
  animation:fade-in .22s ease-out;
}
.panel:before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--brass),transparent);opacity:.7}
.hero{max-width:980px;margin:clamp(1rem,3vh,2.25rem) auto;text-align:left}
.home-hero{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(280px,.88fr);padding:0;overflow:hidden}
.home-copy{padding:clamp(1.4rem,4vw,3.4rem)}
.home-copy h2{max-width:650px;margin-bottom:1rem;font-size:clamp(2.3rem,4.2vw,3.9rem);letter-spacing:-.035em}
.home-copy h2 em{color:var(--brass-light);font-style:italic}
.home-copy>p:not(.eyebrow){max-width:580px;color:#cbd3df;font-size:1.05rem}
.home-actions{justify-content:flex-start!important;margin-top:1.55rem}
.home-actions button{min-width:145px}
.hero-art{position:relative;display:grid;place-items:center;min-height:420px;overflow:hidden;border-left:1px solid var(--line);background:radial-gradient(circle at 50% 45%,#613946 0,#2b2436 35%,#111a28 70%)}
.hero-art:before,.hero-art:after{content:"";position:absolute;border:1px solid rgba(233,184,90,.35);border-radius:50%}
.hero-art:before{width:310px;height:310px}
.hero-art:after{width:245px;height:245px;border-style:dashed;animation:slow-spin 28s linear infinite}
.last-call-seal{position:relative;z-index:1;display:grid;place-items:center;width:190px;height:190px;border:3px double var(--brass);border-radius:50%;text-align:center;transform:rotate(-5deg);box-shadow:0 0 60px rgba(233,184,90,.2),inset 0 0 30px rgba(0,0,0,.32)}
.last-call-seal>span{display:flex;flex-direction:column;align-items:center;gap:.18rem}
.last-call-seal strong{font:italic 800 2rem/1 var(--serif);color:var(--brass-light)}
.last-call-seal small{display:block;font-size:.65rem;font-weight:900;letter-spacing:.25em;text-transform:uppercase}
.feature-strip{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:1.3rem}
.feature-strip span{padding:.34rem .58rem;border:1px solid #41506a;border-radius:99px;color:#aeb9c9;background:rgba(9,14,24,.42);font-size:.73rem;font-weight:750}
.actions{display:flex;gap:.7rem;justify-content:center;align-items:center;flex-wrap:wrap}

.match-hud{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:.8rem;align-items:stretch;margin-bottom:1rem}
.player-hud{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid var(--line);border-radius:14px;background:rgba(19,29,44,.92);box-shadow:0 8px 25px rgba(0,0,0,.18)}
.player-hud.player-two{grid-template-columns:minmax(0,1fr) auto;text-align:right}
.player-hud.player-two .hud-avatar{grid-column:2;grid-row:1}
.player-hud.player-two .hud-copy{grid-column:1;grid-row:1}
.hud-avatar{display:grid;place-items:center;width:50px;height:50px;border:2px solid var(--green);border-radius:12px;color:var(--green);background:linear-gradient(145deg,#1b3d37,#101a25);font-size:1.45rem}
.player-two .hud-avatar{border-color:var(--red);color:var(--red);background:linear-gradient(145deg,#43262f,#101a25)}
.hud-name{display:flex;align-items:center;gap:.45rem;margin-bottom:.2rem;font-size:.78rem;font-weight:850;text-transform:uppercase;letter-spacing:.08em}
.player-two .hud-name{justify-content:flex-end}
.hud-money{font:800 1.55rem/1 var(--serif);color:var(--brass-light)}
.hud-meta{color:var(--muted);font-size:.73rem}
.hud-progress{height:6px;margin-top:.48rem;border-radius:99px;background:#080d15;overflow:hidden}
.hud-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#2aa978,var(--green));transition:width .25s ease}
.player-two .hud-progress span{margin-left:auto;background:linear-gradient(90deg,var(--red),#ba455a)}
.round-medallion{align-self:center;display:grid;place-items:center;min-width:84px;min-height:72px;padding:.55rem;border:1px solid var(--brass-dark);border-radius:14px;background:#111824;text-align:center;box-shadow:inset 0 0 18px rgba(0,0,0,.4)}
.round-medallion small{display:block;color:var(--muted);font-size:.6rem;font-weight:850;letter-spacing:.16em;text-transform:uppercase}
.round-medallion strong{color:var(--brass-light);font:800 1.55rem/1.05 var(--serif)}

.customer{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr);gap:1rem;align-items:center;margin-bottom:1rem;padding:1rem 1.15rem;border:1px solid #6e5934;border-radius:16px;background:linear-gradient(120deg,rgba(47,35,38,.98),rgba(25,32,45,.98));box-shadow:0 10px 28px rgba(0,0,0,.2);text-align:left;animation:fade-in .2s ease-out}
.customer-avatar{display:grid;place-items:center;width:72px;height:72px;border:2px solid var(--brass);border-radius:50%;color:var(--brass-light);background:radial-gradient(circle at 35% 30%,#754654,#2b2330 55%,#111824 100%);font:800 1.45rem/1 var(--serif);box-shadow:0 0 0 5px rgba(233,184,90,.08)}
.customer h2,.customer h3{margin:0 0 .38rem;font-size:clamp(1.35rem,3vw,1.8rem)}
.customer-kicker{margin:0 0 .2rem;color:var(--muted);font-size:.64rem;font-weight:850;letter-spacing:.18em;text-transform:uppercase}
.prefs{display:flex;justify-content:flex-start;gap:.5rem;flex-wrap:wrap}
.pref,.prefs>b,.pref-chip{display:inline-flex;align-items:center;gap:.4rem;min-height:34px;padding:.38rem .58rem;border:1px solid;border-radius:8px;background:rgba(8,13,21,.45);font-family:var(--sans);font-size:.78rem}
.pref strong{color:var(--paper)}
.pref-value{display:inline-grid;place-items:center;min-width:1.65rem;height:1.42rem;border-radius:5px;background:rgba(255,255,255,.08);font-size:.7rem}
.love{color:#ff9fbe;border-color:#78475b!important}.like{color:#72deb0;border-color:#356b5a!important}.dislike{color:#ff9299;border-color:#7a4047!important}

.selection-panel{padding-bottom:1.2rem}
.selection-header{display:flex;justify-content:space-between;gap:1rem;align-items:flex-end;margin-bottom:.3rem}
.selection-header h2{margin-bottom:.3rem}
.bartender-line{margin:0;color:var(--muted);font-size:.86rem}
.selection-meter{flex:0 0 auto;min-width:155px;padding:.62rem .8rem;border:1px solid var(--line);border-radius:10px;background:#101824;text-align:right}
.selection-meter span{display:block;color:var(--muted);font-size:.63rem;font-weight:850;letter-spacing:.13em;text-transform:uppercase}
.selection-meter strong{font:800 1.35rem/1 var(--serif)}
.player-one .selection-meter strong{color:var(--green)}
.player-two .selection-meter strong{color:var(--red)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:.85rem;margin:1rem 0}
.hand-grid{grid-template-columns:repeat(7,minmax(0,1fr));align-items:stretch}
.difficulty-grid{grid-template-columns:repeat(3,minmax(0,1fr));max-width:800px;margin:1.5rem auto}

.card{position:relative;isolation:isolate;display:flex;flex-direction:column;min-width:0;min-height:228px;padding:.78rem;border:1px solid #52617a;border-radius:14px;overflow:hidden;color:var(--paper);background:linear-gradient(160deg,#29384e,#151f30 62%,#111924);box-shadow:0 9px 20px rgba(0,0,0,.25),inset 0 1px rgba(255,255,255,.06);text-align:left;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease}
.card:before{content:"";position:absolute;z-index:-1;inset:0 0 auto;height:58px;background:linear-gradient(120deg,rgba(255,255,255,.08),transparent)}
.card:hover:not(:disabled){z-index:2;transform:translateY(-4px);border-color:#8695aa;box-shadow:0 15px 30px rgba(0,0,0,.34)}
.card h3{min-height:2.35em;margin:0 1.35rem .48rem 0;color:var(--paper);font-size:1rem;overflow-wrap:anywhere}
.card-art{display:grid;place-items:center;height:66px;margin:0 0 .58rem;border:1px solid rgba(255,255,255,.09);border-radius:9px;color:var(--brass-light);background:radial-gradient(circle at 50% 130%,rgba(233,184,90,.24),transparent 65%),linear-gradient(145deg,#242e3e,#121a27);font-size:1.85rem}
.card-art small{position:absolute;left:1rem;margin-top:3.2rem;color:#9eabbd;font-size:.55rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.traits{margin:0 0 .55rem;color:#c4cddd;font-size:.75rem;line-height:1.35;overflow-wrap:anywhere}
.trait-tags{display:flex;gap:.3rem;flex-wrap:wrap;margin-bottom:.55rem}
.trait-tags span{padding:.18rem .38rem;border:1px solid #485975;border-radius:5px;color:#bdc8d8;background:#111a28;font-size:.62rem;font-weight:800}
.appeal-preview{margin-top:auto;padding:.5rem;border:1px solid #3b4b62;border-radius:8px;background:rgba(8,13,21,.48)}
.appeal-total{display:flex;align-items:baseline;justify-content:space-between;gap:.4rem;color:var(--muted);font-size:.64rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.appeal-total strong{color:var(--paper);font:800 1.15rem/1 var(--serif);letter-spacing:0}
.appeal-breakdown{display:flex;gap:.22rem;flex-wrap:wrap;margin-top:.35rem}
.appeal-breakdown span{padding:.13rem .3rem;border-radius:4px;color:#d9e0ea;background:#28364a;font-size:.58rem;font-weight:800}
.appeal-breakdown .positive{color:#9ff0ce;background:#193c34}.appeal-breakdown .negative{color:#ffb5ba;background:#46262d}.appeal-breakdown .neutral{color:#93a0b3;background:#222d3d}
.card-footer{display:flex;align-items:flex-end;justify-content:space-between;gap:.5rem;margin-top:.55rem;padding-top:.5rem;border-top:1px solid #41516a}
.card-footer small{color:#8996aa;font-size:.58rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}
.price{position:static;margin:0;padding:0;border:0;color:var(--brass-light);font:900 1.48rem/1 var(--serif)}
.card.selected{border:3px solid var(--green);box-shadow:0 0 0 2px #102a24,0 13px 28px rgba(32,187,131,.28);transform:translateY(-5px)}
.player-two .card.selected{border-color:var(--red);box-shadow:0 0 0 2px #321820,0 13px 28px rgba(255,107,115,.25)}
.card.selected:after{content:"✓";position:absolute;z-index:3;right:.48rem;top:.44rem;display:grid;place-items:center;width:1.55rem;height:1.55rem;border-radius:50%;color:#09261c;background:var(--green);font-weight:950;box-shadow:0 3px 8px rgba(0,0,0,.35)}
.player-two .card.selected:after{color:#321013;background:var(--red)}
.card-spirit-beer .card-art{background:radial-gradient(circle at 50% 120%,#6b5029,#172232 64%)}
.card-spirit-whiskey .card-art{background:radial-gradient(circle at 50% 120%,#754126,#172232 64%)}
.card-spirit-gin .card-art{background:radial-gradient(circle at 50% 120%,#225346,#172232 64%)}
.card-spirit-rum .card-art{background:radial-gradient(circle at 50% 120%,#65402f,#172232 64%)}
.card-spirit-vodka .card-art{background:radial-gradient(circle at 50% 120%,#354c68,#172232 64%)}
.card-spirit-tequila .card-art{background:radial-gradient(circle at 50% 120%,#4e5b2c,#172232 64%)}
.card-spirit-wine .card-art{background:radial-gradient(circle at 50% 120%,#662f45,#172232 64%)}

.decision-bar{position:sticky;z-index:8;bottom:max(.6rem,env(safe-area-inset-bottom));display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:1rem;padding:.72rem .8rem;border:1px solid #53627a;border-radius:13px;background:rgba(12,18,29,.94);box-shadow:0 12px 35px rgba(0,0,0,.48);backdrop-filter:blur(12px)}
.decision-copy{color:var(--muted);font-size:.75rem}.decision-copy strong{display:block;color:var(--paper);font-size:.88rem}
.lock{min-width:190px;box-shadow:0 0 22px rgba(233,184,90,.22);animation:ready-pulse 1.6s ease-in-out infinite}
.status{text-align:center;color:var(--muted);font-weight:800}.player-one .status strong{color:var(--green)}.player-two .status strong{color:var(--red)}

.switch-layout{display:grid;grid-template-columns:270px minmax(0,1fr);gap:1.2rem;align-items:start}
.switch-summary{position:sticky;top:1rem;padding:1rem;border:1px solid var(--line);border-radius:14px;background:#101824}
.switch-token{display:flex;align-items:center;gap:.65rem;margin:1rem 0;padding:.7rem;border:1px solid var(--brass-dark);border-radius:10px;background:#241f1d}
.switch-token-icon{display:grid;place-items:center;width:42px;height:42px;border:2px solid var(--brass);border-radius:50%;color:var(--brass-light);font:900 1.1rem var(--serif)}
.switch-token strong{display:block;color:var(--brass-light);font-size:1.1rem}.switch-token small{color:var(--muted)}
.bartender-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin:0}
.bartender-card{min-height:195px}
.bartender-card.current{border-color:var(--brass)}
.portrait{display:grid;place-items:center;width:3.15rem;height:3.15rem;margin-bottom:.65rem;border:1px solid #718099;border-radius:12px;color:var(--brass-light);background:linear-gradient(145deg,#2f3d50,#101824);font-size:1.45rem}
.bartender-card .specialty{margin:0 0 .45rem;color:var(--brass-light);font-size:.7rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
.bartender-card .passive{margin:0;color:#b9c3d2;font-size:.75rem}

.result{max-width:900px;margin:1.5rem auto;padding:0;text-align:left;border-color:#765d32}
.result-hero{padding:1.35rem;text-align:center;background:radial-gradient(circle at top,rgba(233,184,90,.14),transparent 70%)}
.trophy{display:grid;place-items:center;width:58px;height:58px;margin:0 auto .6rem;border:1px solid var(--brass);border-radius:50%;color:var(--brass-light);background:#241f1d;font-size:1.7rem}
.result-hero h2{margin-bottom:.35rem}.result-hero p{margin:0;color:var(--muted)}
.result-grid{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;padding:0 1rem 1rem}
.result-row{position:relative;padding:1rem;border:1px solid var(--line);border-radius:12px;background:#111a28}
.result-row.winner{border-color:var(--brass);background:linear-gradient(145deg,#342a24,#182131);box-shadow:inset 0 0 28px rgba(233,184,90,.08)}
.result-label{display:block;margin-bottom:.35rem;color:var(--muted);font-size:.63rem;font-weight:850;letter-spacing:.14em;text-transform:uppercase}
.result-row h3{margin-bottom:.25rem}.result-stats{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.8rem}
.result-stat{padding:.55rem;border-radius:8px;background:#0b111c}.result-stat small{display:block;color:var(--muted);font-size:.6rem;text-transform:uppercase}.result-stat strong{font:800 1.25rem var(--serif)}
.payout{color:var(--brass-light)!important}
.winner-ribbon{position:absolute;right:.7rem;top:.7rem;padding:.25rem .48rem;border-radius:6px;color:#211708;background:var(--brass);font-size:.58rem;font-weight:950;letter-spacing:.08em;text-transform:uppercase}
.result-actions{padding:0 1rem 1.2rem}

.builder-head{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}.builder-count{flex:0 0 auto;min-width:120px;padding:.7rem;border:1px solid var(--brass-dark);border-radius:10px;background:#231e1c;text-align:center}.builder-count strong{display:block;color:var(--brass-light);font:850 1.6rem var(--serif)}.builder-count span{color:var(--muted);font-size:.65rem;text-transform:uppercase;letter-spacing:.12em}
.notice{margin:.8rem 0;padding:.7rem .85rem;border:1px solid #465670;border-radius:9px;color:#d6dde8;background:#111a28}
.builder-list{max-height:56vh;overflow:auto;border:1px solid var(--line);border-radius:12px;background:#0f1724;scrollbar-color:#52627a #111824}
.builder-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;gap:.55rem;align-items:center;min-height:62px;padding:.55rem .7rem;border-bottom:1px solid #2a384d}.builder-row:last-child{border-bottom:0}.builder-row:hover{background:#172235}.builder-row small{color:var(--muted)}.builder-row button{min-width:44px;padding:.35rem}.builder-row>strong{min-width:1.4rem;text-align:center;color:var(--brass-light)}.builder-actions{position:sticky;bottom:0;margin-top:.9rem;padding:.7rem;border:1px solid var(--line);border-radius:12px;background:rgba(11,17,28,.94);backdrop-filter:blur(10px)}

.pass{max-width:540px;margin:8vh auto;text-align:center}.privacy-screen{border-color:#537394}.privacy-icon{display:grid;place-items:center;width:4rem;height:4rem;margin:0 auto 1rem;border:1px solid var(--blue);border-radius:50%;color:var(--blue);background:#101b29;font-size:1.8rem}.privacy-screen p{color:#c5cfdd}
.difficulty-card{justify-content:center;min-height:180px;text-align:center}.difficulty-card h3{min-height:auto;margin:0 0 .4rem;padding:0;color:var(--brass-light);font-size:1.35rem}.difficulty-card p{margin:0;color:#c4cedc;font-weight:600}

.tutorial-panel{max-width:960px;margin:1vh auto}.tutorial-top{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}.tutorial-progress{height:8px;margin:.5rem 0 1.5rem;border-radius:99px;background:#080d15;overflow:hidden}.tutorial-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--green),var(--brass));transition:width .2s ease}.tutorial-lesson{max-width:800px;margin:auto;text-align:center}.tutorial-callout,.tutorial-feedback{padding:.8rem 1rem;border:1px solid var(--line);border-radius:10px;color:#e3e8ef;background:#111a28}.tutorial-feedback.correct{border-color:var(--green);background:var(--green-dark)}.tutorial-feedback.incorrect{border-color:var(--red);background:var(--red-dark)}.tutorial-equation{max-width:380px;margin:1rem auto;padding:1rem;border:1px solid var(--brass-dark);border-radius:12px;color:var(--brass-light);background:#0b111c;font:900 clamp(1.4rem,5vw,2rem) var(--serif)}.answer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;margin:1rem 0}.answer-grid .answer-correct{color:#10281e;background:var(--green)}.answer-grid .answer-wrong{color:#321013;background:var(--red)}.pref-chip{justify-content:center;color:inherit;background:#111a28}.pref-chip.seen{border-color:var(--brass)!important;box-shadow:0 0 14px rgba(233,184,90,.25)}.tutorial-card-grid{grid-template-columns:repeat(5,minmax(0,1fr))}.tutorial-card{min-height:145px}.tutorial-service-grid{grid-template-columns:repeat(3,1fr)}.tutorial-score-card{min-height:150px;text-align:center;justify-content:center}.tutorial-score-card h3{min-height:auto;padding:0}.tutorial-score{margin:0;color:var(--brass-light);font-size:1.35rem;font-weight:900}.answer-card-correct{border:4px solid var(--green);box-shadow:0 0 20px rgba(72,213,151,.4)}.answer-card-wrong{border:4px solid var(--red)}.token-demo,.deck-demo{display:flex;flex-direction:column;gap:.2rem;max-width:290px;margin:1rem auto;padding:1rem;border:1px solid var(--brass);border-radius:14px;background:#0b111c}.deck-demo strong{color:var(--brass-light);font-size:2rem}.tutorial-deck-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.tutorial-deck-card{min-height:190px}.tutorial-deck-card h3{min-height:auto;padding:0}.copy-count{color:var(--brass-light);font-size:1.1rem;font-weight:900}.add-label{margin-top:auto;padding-top:.6rem;border-top:1px solid #41516a}.tutorial-deck-card:disabled{color:#a8b0bd;background:#252e3b;border-color:#3f4b5d}.tutorial-deck-card:disabled .traits,.tutorial-deck-card:disabled .copy-count{color:#98a3b3}

@keyframes fade-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
@keyframes ready-pulse{50%{box-shadow:0 0 28px rgba(233,184,90,.42)}}
@keyframes slow-spin{to{transform:rotate(1turn)}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation:none!important;transition:none!important}}

@media(max-width:1050px){
  .hand-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
  .hand-grid .card:nth-child(n+5){grid-column:span 1}
  .bartender-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:780px){
  .site-header,main,footer{width:min(100% - 1rem,1240px)}
  .home-hero{grid-template-columns:1fr}.hero-art{min-height:240px;border-left:0;border-top:1px solid var(--line)}.last-call-seal{width:145px;height:145px}.hero-art:before{width:210px;height:210px}.hero-art:after{width:175px;height:175px}
  .match-hud{grid-template-columns:1fr 1fr}.round-medallion{grid-column:1/-1;grid-row:1;min-height:44px;display:flex;gap:.4rem}.player-hud{grid-row:2}.player-hud.player-two{grid-row:2}
  .switch-layout{grid-template-columns:1fr}.switch-summary{position:static}.bartender-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .hand-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .difficulty-grid{grid-template-columns:1fr}.difficulty-card{min-height:130px}
  .tutorial-card-grid,.tutorial-deck-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tutorial-service-grid{grid-template-columns:1fr}
}
@media(max-width:560px){
  body{font-size:15px;background-attachment:scroll}.site-header{padding:.7rem 0}.brand-mark{width:36px;height:36px}.brand small{display:none}.brand strong{font-size:1.05rem}.icon-button{min-height:40px;padding:.5rem .65rem;font-size:.75rem}
  main{padding:.75rem 0;min-height:calc(100vh - 135px)}footer{padding:1rem 0;flex-direction:column;gap:.2rem;text-align:center;font-size:.66rem}
  .panel{padding:.9rem;border-radius:14px}.hero{margin:1rem auto}.home-copy{padding:1.25rem}.home-copy h2{font-size:clamp(2.15rem,12vw,3.2rem)}.home-actions button{flex:1 1 135px}.hero-art{min-height:200px}.feature-strip{display:none}
  .match-hud{gap:.45rem;margin-bottom:.65rem}.player-hud{display:block;padding:.65rem}.hud-avatar{display:none}.hud-name{font-size:.65rem}.hud-money{font-size:1.3rem}.hud-meta{font-size:.64rem}.round-medallion{min-height:38px;padding:.35rem}.round-medallion strong{font-size:1.1rem}
  .customer{grid-template-columns:auto 1fr;gap:.7rem;padding:.75rem}.customer-avatar{width:48px;height:48px;font-size:1rem}.customer h2,.customer h3{font-size:1.2rem}.prefs{grid-column:1/-1;display:grid;grid-template-columns:1fr}.pref,.prefs>b,.pref-chip{width:100%;justify-content:space-between;min-height:36px}
  .selection-header{align-items:flex-start}.selection-header h2{font-size:1.35rem}.selection-meter{min-width:104px;padding:.5rem}.selection-meter strong{font-size:1.1rem}.selection-meter span{font-size:.55rem}.bartender-line{font-size:.73rem}
  .hand-grid,.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem}.card{min-height:235px;padding:.62rem;border-radius:11px}.card h3{font-size:.9rem}.card-art{height:56px}.traits{font-size:.68rem}.trait-tags span{font-size:.55rem}.appeal-preview{padding:.4rem}.appeal-breakdown span{font-size:.52rem}.price{font-size:1.28rem}
  .decision-bar{gap:.5rem;padding:.55rem}.decision-copy{font-size:.65rem}.decision-copy strong{font-size:.75rem}.lock{min-width:145px;padding:.62rem .7rem;font-size:.82rem}
  .bartender-grid{grid-template-columns:1fr}.bartender-card{min-height:165px}.switch-summary h2{font-size:1.5rem}
  .result{margin:.5rem 0}.result-grid{grid-template-columns:1fr;padding:0 .7rem .7rem}.result-hero{padding:1rem}.result-actions{padding:0 .7rem .9rem}.result-row{padding:.8rem}
  .builder-head{display:block}.builder-count{display:flex;align-items:center;justify-content:center;gap:.5rem;margin-bottom:.7rem}.builder-count strong{font-size:1.25rem}.builder-row{font-size:.8rem;padding:.45rem}.builder-row button{min-width:44px;min-height:44px}.builder-actions button{flex:1 1 120px}
  .privacy-screen{margin:6vh .25rem}.tutorial-panel{margin:0}.tutorial-top{align-items:center}.tutorial-top h2{font-size:1.2rem}.tutorial-card-grid,.tutorial-deck-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tutorial-card{min-height:155px}.tutorial-service-grid,.answer-grid{grid-template-columns:1fr}
}
@media(max-width:370px){.hand-grid,.grid,.tutorial-card-grid,.tutorial-deck-grid{grid-template-columns:1fr}.card{min-height:205px}.home-actions button{flex-basis:100%}}
