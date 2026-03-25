<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0f1a;
    --bg2: #141628;
    --bg3: #1a1e35;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #f0f2ff;
    --muted: #8890b0;
    --accent: #7c6ff7;
    --accent2: #a89cf7;
    --accent-bg: rgba(124,111,247,0.12);
    --green: #4ade80;
    --green-bg: rgba(74,222,128,0.1);
    --red: #f87171;
    --red-bg: rgba(248,113,113,0.1);
    --amber: #fbbf24;
    --radius: 12px;
    --radius-sm: 8px;
  }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px 16px 48px;
  }

  #game {
    width: 100%;
    max-width: 680px;
  }

  .screen { display: none; }
  .screen.active { display: block; }

  /* ---- START SCREEN ---- */
  .start-header {
    text-align: center;
    padding: 48px 0 32px;
  }

  .game-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent2);
    background: var(--accent-bg);
    border: 0.5px solid rgba(124,111,247,0.3);
    border-radius: 20px;
    padding: 5px 14px;
    margin-bottom: 20px;
  }

  .start-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(38px, 8vw, 60px);
    font-weight: 800;
    line-height: 1;
    color: var(--text);
    margin-bottom: 6px;
    letter-spacing: -1px;
  }

  .start-subtitle {
    font-size: 18px;
    color: var(--accent2);
    font-weight: 500;
    margin-bottom: 16px;
  }

  .start-desc {
    font-size: 15px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 420px;
    margin: 0 auto 36px;
  }

  .stat-pills {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 36px;
  }
.pill {
    background: var(--bg3);
    border: 0.5px solid var(--border2);
    border-radius: 50px;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pill-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--accent2);
    font-weight: 600;
  }

  /* ---- BUTTONS ---- */
  .btn-primary {
    display: inline-block;
    padding: 14px 36px;
    background: var(--accent);
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .btn-primary:hover { background: #6a5de0; }
  .btn-primary:active { transform: scale(0.98); }

  .btn-ghost {
    display: inline-block;
    padding: 11px 24px;
    background: transparent;
    color: var(--text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    border: 0.5px solid var(--border2);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-ghost:hover { background: var(--bg3); }

  /* ---- CANVAS ---- */
  #city-canvas-preview, #city-canvas-phase, #city-canvas-final {
    width: 100%;
    height: auto;
    border-radius: var(--radius);
    border: 0.5px solid var(--border2);
    display: block;
  }

  /* ---- QUESTION SCREEN ---- */
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 14px 18px;
    background: var(--bg2);
    border-radius: var(--radius);
    border: 0.5px solid var(--border);
  }

  .phase-tag {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    background: var(--accent-bg);
    color: var(--accent2);
    border: 0.5px solid rgba(124,111,247,0.3);
  }

  .phase-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
  }

  .phase-sub-text {
    font-size: 12px;
    color: var(--muted);
    margin-top: 2px;
  }

  .score-display {
    text-align: right;
  }

  .score-label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .score-num {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--accent2);
  }

  /* Progress dots */
  .progress-row {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
  }

  .prog-dot {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--bg3);
    border: 0.5px solid var(--border);
    transition: background 0.3s;
  }
  .prog-dot.done { background: var(--accent); }
  .prog-dot.active { background: var(--accent2); }

  /* Phase dots top */
  .phase-track {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .pdot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--bg3);
    border: 0.5px solid var(--border2);
    transition: background 0.3s;
  }
  .pdot.done { background: var(--accent); border-color: var(--accent); }
  .pdot.active { background: var(--accent2); border-color: var(--accent2); }

  /* Question card */
  .question-card {
    background: var(--bg2);
    border: 0.5px solid var(--border2);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 16px;
  }

  .q-num {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
  }

  .q-text {
    font-size: 17px;
    font-weight: 500;
    color: var(--text);
    line-height: 1.55;
    margin-bottom: 20px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .opt {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border: 0.5px solid var(--border2);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 14px;
    color: var(--text);
    background: var(--bg3);
    transition: border-color 0.15s, background 0.15s;
    text-align: left;
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.5;
  }
  .opt:hover { border-color: var(--accent); background: var(--accent-bg); }

  .opt.correct {
    background: var(--green-bg);
    border-color: var(--green);
    color: var(--green);
  }
  .opt.wrong {
    background: var(--red-bg);
    border-color: var(--red);
    color: var(--red);
  }
  .opt.dimmed { opacity: 0.35; pointer-events: none; }

  .opt-letter {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--bg2);
    border: 0.5px solid var(--border2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .opt.correct .opt-letter { background: var(--green); color: #0a1a10; border-color: var(--green); }
  .opt.wrong .opt-letter { background: var(--red); color: #1a0a0a; border-color: var(--red); }

  .feedback-box {
    font-size: 13px;
    line-height: 1.6;
    margin-top: 14px;
    padding: 12px 16px;
    border-radius: var(--radius-sm);
    display: none;
  }
  .feedback-box.show { display: block; }
  .feedback-box.good { background: var(--green-bg); color: var(--green); border: 0.5px solid rgba(74,222,128,0.25); }
  .feedback-box.bad { background: var(--red-bg); color: var(--red); border: 0.5px solid rgba(248,113,113,0.25); }

  .next-btn {
    display: none;
    margin-top: 16px;
    padding: 12px 24px;
    background: var(--bg2);
    color: var(--text);
    border: 0.5px solid var(--border2);
    border-radius: var(--radius-sm);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    transition: background 0.15s, border-color 0.15s;
  }
  .next-btn.show { display: inline-block; }
  .next-btn:hover { background: var(--bg3); border-color: var(--accent); color: var(--accent2); }

  /* ---- PHASE COMPLETE ---- */
  .phase-complete {
    text-align: center;
    padding: 40px 0 20px;
  }

  .stars-row {
    font-size: 36px;
    letter-spacing: 6px;
    margin-bottom: 20px;
    color: var(--amber);
  }

  .pc-title {
    font-family: 'Syne', sans-serif;
    font-size: 30px;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 8px;
  }

  .pc-desc {
    font-size: 15px;
    color: var(--muted);
    margin-bottom: 28px;
    line-height: 1.6;
  }

  .stat-row {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--bg2);
    border: 0.5px solid var(--border2);
    border-radius: var(--radius);
    padding: 16px 24px;
    min-width: 120px;
  }

  .stat-card-label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  .stat-card-val {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--text);
  }

  .stat-card.accent-card .stat-card-val { color: var(--accent2); }
  .stat-card.green-card .stat-card-val { color: var(--green); }

  .city-label {
    font-size: 12px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  /* ---- FINAL SCREEN ---- */
  .final-screen {
    text-align: center;
    padding: 40px 0 20px;
  }

  .final-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 6vw, 42px);
    font-weight: 800;
    color: var(--text);
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .final-sub {
    font-size: 15px;
    color: var(--muted);
    margin-bottom: 28px;
  }

  .rank-badge {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 20px;
    border-radius: 50px;
    background: var(--accent-bg);
    color: var(--accent2);
    border: 0.5px solid rgba(124,111,247,0.3);
    margin-bottom: 28px;
  }
