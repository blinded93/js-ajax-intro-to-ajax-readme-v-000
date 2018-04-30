function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li><a href="#" data-repo="' +  r.name + '" onclick="getCommits(this)">' + r.name + '</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  console.log(name);
  const req = new XMLHttpRequest();
  console.log(req);
  req.addEventListener("load", showCommits);
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos');
  req.send();
}
