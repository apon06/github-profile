document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile("apon06");

  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(currentTheme);
  document.querySelector("main").classList.add(currentTheme);

  const themeToggle = document.getElementById("theme-toggle");
  if (currentTheme === "dark") {
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    let theme = themeToggle.checked ? "dark" : "light";
    document.body.className = theme;
    document.querySelector("main").className = theme;
    localStorage.setItem("theme", theme);
  });

  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      fetchUserProfile(username);
    });
});

async function fetchUserProfile(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").innerText =
      data.name || "No Name Available";
    document.getElementById("bio").innerText = data.bio || "No Bio Available";
    document.getElementById(
      "followers"
    ).innerText = `Followers: ${data.followers}`;
    document.getElementById(
      "following"
    ).innerText = `Following: ${data.following}`;
    document.getElementById(
      "repos"
    ).innerText = `Public Repos: ${data.public_repos}`;

    document.getElementById(
      "profile-views"
    ).src = `https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`;
    document.getElementById(
      "trophy"
    ).src = `https://github-profile-trophy.vercel.app/?username=${username}`;
    document.getElementById(
      "top-langs"
    ).src = `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact`;
    document.getElementById(
      "stats"
    ).src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en`;
    document.getElementById(
      "streak"
    ).src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}`;

    document.getElementById("profile-container").style.display = "block";
    document.getElementById("profile-link").href = data.html_url;
  } catch (error) {
    alert("Error fetching user data");
  }
}
