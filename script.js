const PHASES = [
  {name:"Planning",sub:"Define goals and requirements"},
  {name:"Requirements Analysis",sub:"Gather and document needs"},
  {name:"System Design",sub:"Architect the solution"},
  {name:"Implementation",sub:"Build and code the system"},
  {name:"Testing & Maintenance",sub:"Verify quality and deploy"}
];

const QUESTIONS = [
  [
    {q:"What is the PRIMARY goal of the Planning phase in SDLC?",opts:["Write the source code","Define project scope, timeline, and feasibility","Test the software product","Deploy the application to production"],ans:1,exp:"Planning establishes the project's scope, objectives, timeline, and feasibility — the foundation for everything that follows."},
    {q:"Which document is typically produced during the Planning phase?",opts:["Source code files","Test case scripts","Project Charter or Feasibility Study","User interface mockups"],ans:2,exp:"A Project Charter or Feasibility Study outlines goals, stakeholders, constraints, and whether the project is viable."},
    {q:"Who is MOST involved in the Planning phase?",opts:["Only software developers","Project managers, stakeholders, and senior architects","QA testers exclusively","Database administrators only"],ans:1,exp:"Planning is a collaborative effort involving project managers, business stakeholders, and senior architects to align vision and resources."},
  ],
  [
    {q:"What are 'functional requirements' in SDLC?",opts:["Hardware specifications for servers","What the system should DO — its features and behaviors","The look and feel of the UI","Budget and timeline constraints"],ans:1,exp:"Functional requirements describe what the system must do — its features, functions, and behaviors that users interact with."},
    {q:"Which technique is commonly used to gather requirements from users?",opts:["Unit testing","Compiling code","Stakeholder interviews and use case analysis","Deployment pipelines"],ans:2,exp:"Interviews, workshops, and use case analysis are classic requirement-gathering techniques that help capture what users actually need."},
    {q:"A Software Requirements Specification (SRS) document is created in which phase?",opts:["Testing","Deployment","Maintenance","Requirements Analysis"],ans:3,exp:"The SRS is the key deliverable of Requirements Analysis — it formally documents all functional and non-functional requirements."},
  ],
  [
    {q:"High-Level Design (HLD) focuses on which of the following?",opts:["Writing unit tests","Overall system architecture and module breakdown","Line-by-line code logic","Bug fixing procedures"],ans:1,exp:"HLD describes the overall system architecture — how major modules interact — before diving into implementation details."},
    {q:"Which of these is a key output of the System Design phase?",opts:["Executable binary files","Database schema and architecture diagrams","Marketing materials","Deployment logs"],ans:1,exp:"Database schemas, architecture diagrams, and design documents are the primary outputs that guide developers during implementation."},
    {q:"What does 'Low-Level Design' describe?",opts:["The marketing strategy","Detailed logic of individual modules and algorithms","Server room temperature settings","Project budget breakdown"],ans:1,exp:"Low-Level Design dives into the specifics — algorithms, data structures, and the internal logic of each module."},
  ],
  [
    {q:"What is the main activity in the Implementation phase?",opts:["Gathering user feedback surveys","Actual coding and development based on design documents","Creating marketing campaigns","Planning project timelines"],ans:1,exp:"Implementation is where developers translate design documents into actual working code — the build phase of SDLC."},
    {q:"What is 'version control' used for in implementation?",opts:["Managing server temperatures","Tracking and managing changes to source code","Scheduling team meetings","Billing clients for work"],ans:1,exp:"Version control systems like Git track code changes, enable collaboration, and allow teams to roll back to previous states if needed."},
    {q:"Which programming practice helps ensure code quality during implementation?",opts:["Skipping documentation","Deploying directly to production","Code reviews and pair programming","Avoiding unit tests to save time"],ans:2,exp:"Code reviews and pair programming catch bugs early and spread knowledge across the team, significantly improving code quality."},
  ],
  [
    {q:"What is the difference between Unit Testing and Integration Testing?",opts:["There is no difference","Unit tests test individual components; integration tests test how components work together","Unit tests are done by users; integration tests by developers","Integration testing happens before unit testing"],ans:1,exp:"Unit testing verifies individual functions/components in isolation, while integration testing checks that multiple components work correctly together."},
    {q:"What does 'regression testing' mean?",opts:["Testing only new features","Deleting old test cases","Re-running tests after changes to ensure existing features still work","Testing on mobile devices only"],ans:2,exp:"Regression testing ensures that new code changes haven't broken previously working functionality — a safety net for every release."},
    {q:"What is the purpose of the Maintenance phase in SDLC?",opts:["To start a completely new project from scratch","To fix bugs, improve performance, and add features post-deployment","To write the initial project requirements","To replace all developers on the team"],ans:1,exp:"Maintenance keeps the software running well after deployment — patching bugs, improving performance, and adapting to new needs."},
  ]
];

let state = { phase:0, question:0, score:0, phaseScore:0, correctCount:0, answered:false };

function startGame(){
  state = {phase:0,question:0,score:0,phaseScore:0,correctCount:0,answered:false};
  showScreen('screen-question');
  renderQuestion();
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderQuestion(){
  const p=state.phase, q=state.question, ph=PHASES[p], qd=QUESTIONS[p][q];
  state.answered=false;

  document.getElementById('q-phase-badge').textContent='Phase '+(p+1);
  document.getElementById('q-phase-title').textContent=ph.name;
  document.getElementById('q-phase-sub').textContent=ph.sub;
  document.getElementById('q-score').textContent=state.score;
  document.getElementById('q-num').textContent='Question '+(q+1)+' of 3';
  document.getElementById('q-text').textContent=qd.q;

  const prog=document.getElementById('q-progress');
  prog.innerHTML='';
  for(let i=0;i<3;i++){
    const d=document.createElement('div');
    d.className='prog-dot'+(i<q?' done':i===q?' active':'');
    prog.appendChild(d);
  }

  const pd=document.getElementById('phase-dots');
  pd.innerHTML='';
  for(let i=0;i<5;i++){
    const d=document.createElement('div');
    d.className='pdot'+(i<p?' done':i===p?' active':'');
    pd.appendChild(d);
  }

  const opts=document.getElementById('q-options');
  opts.innerHTML='';
  ['A','B','C','D'].forEach((letter,i)=>{
    const btn=document.createElement('button');
    btn.className='opt';
    btn.innerHTML=`<span class="opt-letter">${letter}</span>${qd.opts[i]}`;
    btn.onclick=()=>selectAnswer(i);
    opts.appendChild(btn);
  });

  document.getElementById('q-feedback').className='feedback-box';
  document.getElementById('next-btn').className='next-btn';
}

function selectAnswer(idx){
  if(state.answered) return;
  state.answered=true;
  const qd=QUESTIONS[state.phase][state.question];
  const opts=document.querySelectorAll('.opt');

  opts.forEach((btn,i)=>{
    if(i===qd.ans) btn.classList.add('correct');
    else if(i===idx) btn.classList.add('wrong');
    else btn.classList.add('dimmed');
  });

  const fb=document.getElementById('q-feedback');
  if(idx===qd.ans){
    state.score+=10; state.phaseScore+=10; state.correctCount++;
    fb.textContent='✓ Correct! +10 points — '+qd.exp;
    fb.className='feedback-box show good';
  } else {
    fb.textContent='✗ Not quite. '+qd.exp;
    fb.className='feedback-box show bad';
  }

  document.getElementById('q-score').textContent=state.score;
  const nb=document.getElementById('next-btn');
  nb.className='next-btn show';
  nb.textContent=state.question===2?'See city progress →':'Next question →';
}

function nextQuestion(){
  if(state.question<2){ state.question++; renderQuestion(); }
  else showPhaseComplete();
}

function showPhaseComplete(){
  const p=state.phase, pts=state.phaseScore;
  const stars=pts===30?'★★★':pts>=20?'★★☆':'★☆☆';
  document.getElementById('pc-stars').textContent=stars;
  document.getElementById('pc-title').textContent=PHASES[p].name+' complete!';
  document.getElementById('pc-desc').textContent='Phase '+(p+1)+' of 5 cleared — your city is '+((p+1)*20)+'% built';
  document.getElementById('pc-score').textContent=pts;
  document.getElementById('pc-total').textContent=state.score;
  document.getElementById('pc-pct').textContent=((p+1)*20)+'%';
  document.getElementById('pc-next-btn').textContent=p===4?'See final city! →':'Next phase →';
  showScreen('screen-phase-complete');
  setTimeout(()=>drawCity('city-canvas-phase',230,(p+1)/5),50);
}

function continueGame(){
  if(state.phase===4){ showFinal(); return; }
  state.phase++; state.question=0; state.phaseScore=0;
  showScreen('screen-question');
  renderQuestion();
}

function showFinal(){
  const acc=Math.round((state.correctCount/15)*100);
  let rank=state.score>=130?'🏆 Governor':state.score>=100?'🌟 Mayor':state.score>=70?'🏠 Planner':'🔨 Apprentice';
  let title=state.score>=130?'Legendary city!':state.score>=100?'Thriving metropolis!':state.score>=70?'Growing town!':'Humble beginnings!';
  document.getElementById('final-title').textContent=title;
  document.getElementById('final-sub').textContent='You answered '+state.correctCount+' of 15 questions correctly';
  document.getElementById('final-score').textContent=state.score;
  document.getElementById('final-acc').textContent=acc+'%';
  document.getElementById('final-rank').textContent=rank;
  showScreen('screen-final');
  setTimeout(()=>drawCity('city-canvas-final',280,1.0),50);
}

function restartGame(){
  showScreen('screen-start');
  setTimeout(()=>drawCity('city-canvas-preview',230,0),50);
}

// ============ CITY DRAWING ENGINE ============
function drawCity(canvasId, h, progress){
  const canvas=document.getElementById(canvasId);
  if(!canvas) return;
  canvas.width=680; canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,680,h);

  // Sky gradient - darker at night as city progresses
  const grd=ctx.createLinearGradient(0,0,0,h);
  if(progress<0.01){
    grd.addColorStop(0,'#d0e8f8'); grd.addColorStop(1,'#f0f6fa');
  } else if(progress>=1){
    grd.addColorStop(0,'#07101e'); grd.addColorStop(1,'#0e2040');
  } else {
    const t=progress;
    grd.addColorStop(0,lerpColor('#d0e8f8','#07101e',t));
    grd.addColorStop(1,lerpColor('#f0f6fa','#0e2040',t));
  }
  ctx.fillStyle=grd;
  ctx.fillRect(0,0,680,h);

  // Stars
  if(progress>0.5){
    const alpha=Math.min(1,(progress-0.5)*1.5);
    [[50,18],[120,38],[195,14],[310,28],[440,16],[558,33],[625,20],[82,50],[275,46],[498,42],[158,62],[375,56],[595,52],[240,70],[480,66]].forEach(([x,y])=>{
      ctx.fillStyle=`rgba(255,255,255,${alpha*(0.4+Math.random()*0.3)})`;
      ctx.beginPath(); ctx.arc(x,y,1.1,0,Math.PI*2); ctx.fill();
    });
  }

  // Sun / Moon
  if(progress<0.5){
    const a=Math.max(0,1-progress*3);
    ctx.fillStyle=`rgba(255,215,50,${a})`;
    ctx.beginPath(); ctx.arc(580,32,20,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=`rgba(255,240,100,${a*0.3})`;
    ctx.beginPath(); ctx.arc(580,32,30,0,Math.PI*2); ctx.fill();
  }
  if(progress>=0.5){
    const a=Math.min(1,(progress-0.5)*3);
    ctx.fillStyle=`rgba(230,240,255,${a*0.95})`;
    ctx.beginPath(); ctx.arc(605,28,16,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=lerpColor('#07101e','#0e2040',progress);
    ctx.beginPath(); ctx.arc(613,24,13,0,Math.PI*2); ctx.fill();
  }

  const groundY=h-48;

  // Road
  ctx.fillStyle=progress<0.01?'#cccccc':lerpColor('#999','#333',Math.min(1,progress*1.5));
  ctx.fillRect(0,groundY,680,h-groundY);
  ctx.fillStyle='rgba(255,255,255,0.15)';
  ctx.fillRect(0,groundY,680,2);
  ctx.strokeStyle='rgba(255,255,255,0.3)';
  ctx.setLineDash([28,18]); ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(0,groundY+24); ctx.lineTo(680,groundY+24); ctx.stroke();
  ctx.setLineDash([]);

  // Sidewalk
  ctx.fillStyle=progress<0.01?'#e0e0e0':lerpColor('#bbb','#444',Math.min(1,progress*1.5));
  ctx.fillRect(0,groundY-4,680,5);

  // Trees
  [16,42,68,610,638,665].forEach(x=>drawTree(ctx,x,groundY,progress));

  if(progress<=0){ drawEmptyLot(ctx,groundY); return; }

  const buildings=[
    [198,72,132,'#7c6ff7','#534AB7',0.2,'dome','CITY HALL'],
    [128,56,82,'#22c55e','#16a34a',0.4,'flat','LIBRARY'],
    [298,52,158,'#38bdf8','#0284c7',0.6,'tower',''],
    [360,44,102,'#7dd3fc','#0369a1',0.6,'flat',''],
    [96,82,72,'#f59e0b','#b45309',0.8,'factory','FACTORY'],
    [416,40,118,'#f472b6','#be185d',0.8,'residential',''],
    [464,66,92,'#f87171','#dc2626',1.0,'cross','HOSPITAL'],
    [538,62,78,'#86efac','#15803d',1.0,'flat','SCHOOL'],
  ];

  buildings.forEach(([bx,bw,bh,c1,c2,threshold,type,label])=>{
    if(progress>=threshold) drawBuilding(ctx,bx,groundY,bw,bh,c1,c2,type,label,progress);
  });
}

function drawEmptyLot(ctx,groundY){
  ctx.fillStyle='#4a7c3f';
  ctx.fillRect(108,groundY-10,470,10);
  drawSign(ctx,220,groundY-40,'Future City Hall');
  drawSign(ctx,400,groundY-40,'Construction Site');
}

function drawSign(ctx,x,y,text){
  const w=text.length*6.2+18;
  ctx.fillStyle='#fef3c7'; ctx.strokeStyle='#d97706'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(x-w/2,y-16,w,22,4); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#92400e'; ctx.font='10px Space Grotesk,sans-serif'; ctx.textAlign='center';
  ctx.fillText(text,x,y-1);
  // Post
  ctx.strokeStyle='#d97706'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(x,y+6); ctx.lineTo(x,y+20); ctx.stroke();
}

function drawBuilding(ctx,x,groundY,w,bh,c1,c2,type,label,progress){
  const top=groundY-bh;
  const grd=ctx.createLinearGradient(x,top,x+w,top+bh);
  grd.addColorStop(0,c1); grd.addColorStop(1,c2);
  ctx.fillStyle=grd;
  ctx.fillRect(x,top,w,bh);

  // Window glow effect
  const winColor=progress>0.5?'rgba(255,255,180,0.85)':'rgba(200,220,255,0.5)';
  ctx.fillStyle=winColor;
  const floors=Math.floor(bh/22), cols=Math.max(1,Math.floor(w/18));
  for(let r=0;r<floors;r++){
    for(let c=0;c<cols;c++){
      const wx=x+5+c*18, wy=top+8+r*22;
      if(wx+10<x+w-3 && wy+12<groundY-3){
        ctx.fillRect(wx,wy,10,12);
        if(progress>0.5){
          ctx.fillStyle='rgba(255,255,100,0.15)';
          ctx.fillRect(wx-1,wy-1,12,14);
          ctx.fillStyle=winColor;
        }
      }
    }
  }

  if(type==='dome'){
    const grdDome=ctx.createLinearGradient(x,top-w*0.45,x+w,top);
    grdDome.addColorStop(0,c1); grdDome.addColorStop(1,c2);
    ctx.fillStyle=grdDome;
    ctx.beginPath(); ctx.arc(x+w/2,top,w*0.42,Math.PI,0); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(x+w/2,top-w*0.42); ctx.lineTo(x+w/2,top-w*0.42-20); ctx.stroke();
    ctx.fillStyle='#ef4444';
    ctx.fillRect(x+w/2,top-w*0.42-20,14,9);
    if(label){ ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font='bold 9px Space Grotesk,sans-serif'; ctx.textAlign='center'; ctx.fillText(label,x+w/2,groundY-5); }
  } else if(type==='tower'){
    ctx.fillStyle=c2; ctx.fillRect(x+w/2-6,top-24,12,24);
    ctx.fillStyle='#ef4444';
    ctx.beginPath(); ctx.moveTo(x+w/2,top-32); ctx.lineTo(x+w/2+7,top-24); ctx.lineTo(x+w/2-7,top-24); ctx.fill();
    if(progress>0.5){ ctx.fillStyle='rgba(255,50,50,0.8)'; ctx.beginPath(); ctx.arc(x+w/2,top-33,3,0,Math.PI*2); ctx.fill(); }
  } else if(type==='factory'){
    ctx.fillStyle=c2;
    [[8,22],[30,17],[54,27]].forEach(([cx,ch])=>{ ctx.fillRect(x+cx,top-ch,13,ch+2); });
    ctx.strokeStyle='rgba(160,160,160,0.5)'; ctx.lineWidth=4;
    [[14,top-28],[36,top-22],[60,top-32]].forEach(([sx,sy])=>{
      ctx.beginPath(); ctx.arc(sx+x-14+8,sy-5,4,Math.PI*0.5,Math.PI*1.5); ctx.stroke();
    });
    if(label){ ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font='bold 8px Space Grotesk,sans-serif'; ctx.textAlign='center'; ctx.fillText(label,x+w/2,groundY-5); }
  } else if(type==='residential'){
    ctx.fillStyle=c2;
    ctx.beginPath(); ctx.moveTo(x,top); ctx.lineTo(x+w/2,top-18); ctx.lineTo(x+w,top); ctx.fill();
    ctx.fillStyle='rgba(255,255,200,0.7)';
    ctx.fillRect(x+w/2-8,top+4,16,16);
  } else if(type==='cross'){
    ctx.fillStyle='#fff';
    ctx.fillRect(x+w/2-5,top+8,10,22);
    ctx.fillRect(x+w/2-12,top+14,24,10);
    if(label){ ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font='bold 8px Space Grotesk,sans-serif'; ctx.textAlign='center'; ctx.fillText(label,x+w/2,groundY-5); }
  } else {
    ctx.fillStyle=c2; ctx.fillRect(x,top-6,w,6);
    if(label){ ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font='bold 8px Space Grotesk,sans-serif'; ctx.textAlign='center'; ctx.fillText(label,x+w/2,groundY-5); }
  }
  // Building outline
  ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=0.5;
  ctx.strokeRect(x,top,w,bh);
}

function drawTree(ctx,x,groundY,progress){
  const dark=progress>0.4;
  ctx.fillStyle=dark?'#1a3a1a':'#4a7c3f';
  ctx.beginPath(); ctx.moveTo(x,groundY-12); ctx.lineTo(x+8,groundY-30); ctx.lineTo(x+16,groundY-12); ctx.fill();
  ctx.fillStyle=dark?'#0d2610':'#2d5a27';
  ctx.beginPath(); ctx.moveTo(x+2,groundY-24); ctx.lineTo(x+8,groundY-42); ctx.lineTo(x+14,groundY-24); ctx.fill();
  ctx.fillStyle=dark?'#3a2210':'#6b4226';
  ctx.fillRect(x+6,groundY-12,4,12);
}

function lerpColor(c1,c2,t){
  const h=(c)=>parseInt(c.slice(1,3),16);
  const m=(c)=>parseInt(c.slice(3,5),16);
  const l=(c)=>parseInt(c.slice(5,7),16);
  return `rgb(${Math.round(h(c1)+(h(c2)-h(c1))*t)},${Math.round(m(c1)+(m(c2)-m(c1))*t)},${Math.round(l(c1)+(l(c2)-l(c1))*t)})`;
}

window.addEventListener('load', () => {
  setTimeout(() => drawCity('city-canvas-preview', 230, 0), 100);
});
