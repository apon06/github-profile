async function fetchUserProfile(username) {
  try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("name").innerText = data.name || "No Name Available";
      document.getElementById("bio").innerText = data.bio || "No Bio Available";
      document.getElementById("followers").innerText = `Followers: ${data.followers}`;
      document.getElementById("following").innerText = `Following: ${data.following}`;
      document.getElementById("repos").innerText = `Public Repos: ${data.public_repos}`;

      document.getElementById("profile-views").src = `https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`;
      document.getElementById("trophy").src = `https://github-profile-trophy.vercel.app/?username=${username}`;
      document.getElementById("top-langs").src = `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact`;
      document.getElementById("stats").src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en`;
      document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}`;

      document.getElementById("profile-link").href = data.html_url;

      document.getElementById("profile-container").style.display = "block";
  } catch (error) {
      console.error("Error fetching profile:", error);
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  fetchUserProfile(username);
  document.getElementById("profile-container").style.display = "block";
});

document.getElementById('theme-toggle').addEventListener('change', function () {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  document.querySelector('main').classList.toggle('dark');
  document.querySelector('main').classList.toggle('light');
});

// Fetch default profile
window.onload = function () {
  fetchUserProfile('apon06');
};