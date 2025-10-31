window.onload = function() {
  alert("Convidamos você a acessar nosso repositório: https://github.com/usuario2207ed-hue");
  loadVote();
  simulateVotesSmooth();
};

let votes = {
  'GitHub': 0,
  'GitLab': 0,
  'Bitbucket': 0,
  'SourceForge': 0
};

let totalVotes = parseInt(localStorage.getItem('totalVotes')) || 500;

function vote(option) {
  if (localStorage.getItem('userVote')) return; // já votou
  votes[option]++;
  localStorage.setItem('userVote', option);
  disableButtons();
  updateResults();
  document.getElementById('thankYou').textContent = "Obrigado por votar!";
}

function disableButtons() {
  document.querySelectorAll('.option-button').forEach(btn => {
    btn.disabled = true;
  });
}

function loadVote() {
  let userVote = localStorage.getItem('userVote');
  if (userVote) {
    disableButtons();
    document.getElementById('thankYou').textContent = "Você já votou em: " + userVote;
    votes[userVote]++;
  }
  let storedVotes = JSON.parse(localStorage.getItem('votes'));
  if(storedVotes) votes = storedVotes;
  totalVotes = parseInt(localStorage.getItem('totalVotes')) || 500;
  updateResults();
}

function updateResults() {
  let total = Object.values(votes).reduce((a,b)=>a+b,0);
  for(let key in votes){
    let percent = total ? Math.round((votes[key]/total)*100) : 0;
    let bar = document.getElementById(key);
    bar.style.width = percent+'%';
    bar.textContent = percent+'%';
  }
  document.getElementById('totalVotes').textContent = "Votos: " + Math.round(total);
}

function simulateVotesSmooth(){
  const keys = Object.keys(votes);
  const increments = keys.map(()=>Math.random()*18);
  let steps = 100;
  let currentStep = 0;
  const stepVotes = increments.map(v=>v/steps);

  function step(){
    if(currentStep < steps){
      keys.forEach((k,i)=>{
        votes[k] += stepVotes[i];
      });
      totalVotes += stepVotes.reduce((a,b)=>a+b,0);
      updateResults();
      currentStep++;
      requestAnimationFrame(step);
    } else {
      keys.forEach(k=>votes[k]=Math.round(votes[k]));
      totalVotes = Math.round(totalVotes);
      localStorage.setItem('votes', JSON.stringify(votes));
      localStorage.setItem('totalVotes', totalVotes);
    }
  }

  step();
}

function showArticle() {
  alert("Convidamos você a acessar nossa Página principal: 👉 https://usuario2207ed-hue.github.io/EDCELL-TECH/");
  let article = document.getElementById('article');
  article.style.display = article.style.display === 'block' ? 'none' : 'block';
  article.scrollIntoView({ behavior: 'smooth' });
}
