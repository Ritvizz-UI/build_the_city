const PHASES = [
  {name:"Planning",sub:"Define goals and requirements"},
  {name:"Requirements Analysis",sub:"Gather and document needs"},
  {name:"System Design",sub:"Architect the solution"},
  {name:"Implementation",sub:"Build and code the system"},
  {name:"Testing & Maintenance",sub:"Verify quality and deploy"}
];

const QUESTIONS = [
  [
    {q:"What is the PRIMARY goal of the Planning phase in SDLC?",opts:["Write code","Define scope","Test","Deploy"],ans:1},
    {q:"Which document is created?",opts:["Code","Test cases","Project Charter","UI"],ans:2},
    {q:"Who is involved?",opts:["Only devs","Managers & stakeholders","Testers","DBA"],ans:1}
  ],
  [
    {q:"Functional requirements?",opts:["Hardware","System behavior","UI","Budget"],ans:1},
    {q:"Requirement gathering?",opts:["Testing","Compile","Interviews","Deploy"],ans:2},
    {q:"SRS created?",opts:["Testing","Deploy","Maintenance","Analysis"],ans:3}
  ]
];

let state = { phase:0, question:0, score:0 };

function startGame(){
  state = {phase:0,question:0,score:0};
  showScreen('screen-question');
  renderQuestion();
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function renderQuestion(){
  const qd = QUESTIONS[state.phase][state.question];
  document.getElementById('q-text').textContent = qd.q;

  const opts = document.getElementById('q-options');
  opts.innerHTML = '';

  qd.opts.forEach((opt,i)=>{
    const btn = document.createElement('button');
    btn.className='opt';
    btn.textContent=opt;
    btn.onclick=()=>selectAnswer(i);
    opts.appendChild(btn);
  });
}

function selectAnswer(i){
  const qd = QUESTIONS[state.phase][state.question];

  if(i === qd.ans){
    alert("Correct!");
    state.score += 10;
  } else {
    alert("Wrong!");
  }
}

function nextQuestion(){
  state.question++;
  if(state.question < QUESTIONS[state.phase].length){
    renderQuestion();
  } else {
    showFinal();
  }
}

function showFinal(){
  showScreen('screen-final');
  document.getElementById('final-score').textContent = "Score: " + state.score;
}

function restartGame(){
  showScreen('screen-start');
}