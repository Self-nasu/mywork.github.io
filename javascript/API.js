const accessToken = process.GITHUB_ACCESS_TOKEN; // Use environment variable instead of hardcoding the token
const username = 'Self-nasu';
var mygit = document.getElementById('mygit');

fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => {
    const projectsContainer = document.getElementById('projects-container');

    const filteredRepos = data.filter(repository => repository.name.includes('.github.io'));

    console.log("Fetching Self-nasu's GitHub repositories...");

    filteredRepos.forEach(repository => {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const repoName = document.createElement('h5');
      repoName.classList.add('card-title');
      repoName.textContent = repository.name;

      const repoDesc = document.createElement('p');
      repoDesc.classList.add('card-text');
      repoDesc.textContent = repository.description;

      const visitButton = document.createElement('a');
      visitButton.href = repository.html_url;
      visitButton.target = '_blank';
      visitButton.textContent = 'Visit Repo';
      visitButton.classList.add('btn', 'btn-primary', 'm-1');

      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy Link';
      copyButton.classList.add('btn', 'btn-secondary', 'm-1');
      copyButton.addEventListener('click', () => {
        copyToClipboard(cloneLink);
      });

      const downloadButton = document.createElement('a');
      downloadButton.href = `${repository.html_url}/archive/refs/heads/master.zip`;
      downloadButton.textContent = 'Download ZIP';
      downloadButton.classList.add('btn', 'btn-primary', 'm-1');

      const cloneLink = document.createElement('input');
      cloneLink.classList.add('hide');
      cloneLink.type = 'text';
      cloneLink.value = repository.clone_url;
      cloneLink.readOnly = true;

      cardBody.appendChild(repoName);
      cardBody.appendChild(repoDesc);
      cardBody.appendChild(visitButton);
      cardBody.appendChild(downloadButton);
      cardBody.appendChild(copyButton);
      cardBody.appendChild(cloneLink);

      card.appendChild(cardBody);

      projectsContainer.appendChild(card);

      console.log("GitHub fetch completed.");
    });
  })
  .catch(error => {
    console.error('Error:', error);
    mygit.style.display = 'none';
    console.log("An error has occurred while fetching from your GitHub.");
  });

function copyToClipboard(element) {
  element.select();
  document.execCommand('copy');
}
