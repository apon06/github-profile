<script>
  import { onMount } from "svelte";

  let username = "gokeihub";
  let profile = {};
  let isDarkMode = false;

  const fetchUserProfile = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();

      profile = {
        avatar: data.avatar_url || "",
        name: data.name || "No Name Available",
        bio: data.bio || "No Bio Available",
        followers: data.followers || 0,
        following: data.following || 0,
        repos: data.public_repos || 0,
        html_url: data.html_url || "",
        profile_views: `https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`,
        trophy: `https://github-profile-trophy.vercel.app/?username=${username}`,
        top_langs: `https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact`,
        stats: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&locale=en`,
        streak: `https://github-readme-streak-stats.herokuapp.com/?user=${username}`,
      };
    } catch (error) {
      alert("Error fetching user data: " + error.message);
    }
  };

  onMount(() => {
    fetchUserProfile(username);
    const savedTheme = localStorage.getItem("theme");
    isDarkMode = savedTheme === "dark";
    applyTheme();
  });

  const applyTheme = () => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    applyTheme();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchUserProfile(username);
  };
</script>

<svelte:head>
  <!-- <title>GitHub User Profile Viewer | Search and View GitHub Profiles</title>
  <meta name="description" content="Easily search and view GitHub user profiles with our GitHub User Profile Viewer. See user stats, top languages, and more in a clean, responsive interface.">
  <meta name="keywords" content="GitHub, Profile Viewer, User Stats, Developer Tool">
  <meta name="author" content="Apon">
  <link rel="canonical" href="https://your-domain.com/github-profile-viewer">
  <meta property="og:title" content="GitHub User Profile Viewer">
  <meta property="og:description" content="Search and view GitHub user profiles with ease. Get detailed stats and insights.">
  <meta property="og:url" content="https://your-domain.com/github-profile-viewer">
  <meta property="og:type" content="website"> -->

  <meta charset="UTF-16" />
  <!-- <meta name="google-site-verification" content="cgNB1eNGAhJo4hku9_OAMMVKT9LuRsYVCE_t2vduHMA" /> -->
  <meta name="google-site-verification" content="m8DbpaKludZA0uN4q_mgDWMLSedSqi7bJ0Fthed55A0" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="View GitHub user profiles, statistics, and repos using this GitHub profile viewer. Find profile views, followers, repositories, and more.Easily search and view GitHub user profiles with our GitHub User Profile Viewer. See user stats, top languages, and more in a clean, responsive interface."
  />
  <meta
    name="keywords"
    content="GitHub, GitHub profile, user statistics, repositories, followers, programming languages, GitHub API"
  />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="GitHub Profile Viewer" />
  <meta
    property="og:description"
    content="Explore GitHub profiles and stats with this GitHub profile viewer."
  />
  <meta property="og:image" content="https://github.com/gokeihub.png" />
  <meta
    property="og:url"
    content="https://github.com/gokeihub/gitehubprofile"
  />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="GitHub Profile Viewer" />
  <meta
    name="twitter:description"
    content="Explore GitHub profiles and stats with this GitHub profile viewer."
  />
  <meta name="twitter:image" content="https://github.com/gokeihub.png" />
  <meta property="og:type" content="website" />
  <title>GitHub Profile Viewer</title>
</svelte:head>

<main class:dark-mode={isDarkMode}>
  <header>
    <div class="top-right-links">
      <a
        href="https://github.com/gokeihub"
        target="_blank"
        rel="noopener noreferrer">My GitHub</a
      >
      <a
        href="https://github.com/gokeihub/gitehubprofile"
        target="_blank"
        rel="noopener noreferrer">Project Repo</a
      >
      <label class="theme-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          on:change={toggleTheme}
          checked={isDarkMode}
        />
        <span class="slider"></span>
      </label>
    </div>
    <h1>GitHub User Profile Viewer</h1>
  </header>

  <section id="search-form">
    <form on:submit={handleSearch}>
      <label for="username">Search GitHub User:</label>
      <br />
      <input
        type="text"
        id="username"
        bind:value={username}
        placeholder="Enter GitHub username"
        required
      />
      <button type="submit">Search</button>
    </form>
  </section>

  {#if profile.avatar}
    <section id="profile-container">
      <a
        id="profile-link"
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img id="avatar" src={profile.avatar} alt="GitHub user avatar" />
      </a>
      <h2 id="name">{profile.name}</h2>
      <p id="bio">{profile.bio}</p>

      <div class="stats">
        <p id="followers">Followers: {profile.followers}</p>
        <p id="following">Following: {profile.following}</p>
        <p id="repos">Public Repos: {profile.repos}</p>
      </div>

      <div class="profile-links">
        <p align="center">
          <img
            id="profile-views"
            src={profile.profile_views}
            alt="GitHub profile views"
          />
        </p>

        <p align="center">
          <a
            href="https://github.com/ryo-ma/github-profile-trophy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img id="trophy" src={profile.trophy} alt="GitHub profile trophy" />
          </a>
        </p>
        <div class="stats-images">
          <img
            id="top-langs"
            src={profile.top_langs}
            alt="Most used languages on GitHub"
          />
          <img id="stats" src={profile.stats} alt="GitHub user statistics" />
          <img id="streak" src={profile.streak} alt="GitHub streak stats" />
        </div>
      </div>
    </section>
  {/if}

  <footer>
    <p>
      Developed by <a
        href="https://github.com/gokeihub"
        target="_blank"
        rel="noopener noreferrer">Apon</a
      >
    </p>
  </footer>
</main>

<style>
  :root {
    --background-color-light: #f4f6f8;
    --text-color-light: #080d15;
    --main-background-light: #ffffff;

    --background-color-dark: #080d15;
    --text-color-dark: #f4f6f8;
    --main-background-dark: #080d15;

    --link-color: #0378fc;
    --button-background: #0366d6;
    --button-hover-background: #024c9a;
    --border-color: #0366d6;
  }

  :global(body) {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    color: var(--text-color-light);
    background-color: var(--background-color-light);
  }

  :global(body.dark-mode) {
    color: var(--text-color-dark);
    background-color: var(--background-color-dark);
  }

  main {
    max-width: 1200px;
    width: 95%;
    margin: 20px auto;
    padding: 20px;
    background-color: var(--main-background-light);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    position: relative;
  }

  main.dark-mode {
    background-color: var(--main-background-dark);
  }

  .top-right-links {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
  }

  .top-right-links a {
    text-decoration: none;
    font-size: 14px;
    color: var(--link-color);
    background-color: #eaeaea;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
  }

  .top-right-links a:hover {
    background-color: var(--link-color);
    color: white;
  }

  h1 {
    color: var(--link-color);
    font-size: 24px;
    margin-top: 60px;
  }

  #search-form {
    margin-bottom: 20px;
  }

  input[type="text"] {
    padding: 10px;
    font-size: 16px;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: var(--button-background);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    max-width: 150px;
  }

  button:hover {
    background-color: var(--button-hover-background);
  }

  #profile-container {
    margin-top: 20px;
  }

  #profile-container #avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .stats p {
    font-size: 16px;
    flex: 1;
    min-width: 120px;
    margin: 10px 0;
  }

  .profile-links img {
    margin: 10px;
    max-width: 100%;
  }

  .stats-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .stats-images img {
    max-width: 100%;
    height: auto;
  }

  footer {
    margin-top: 20px;
    color: #666;
    font-size: 14px;
  }

  @media (max-width: 1200px) {
    main {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    main {
      width: 95%;
      padding: 15px;
    }

    h1 {
      font-size: 20px;
      margin-top: 50px;
    }

    .stats {
      flex-direction: column;
      align-items: center;
    }

    input[type="text"] {
      width: 100%;
    }

    button {
      max-width: 100%;
      width: 100%;
    }

    #profile-container #avatar {
      width: 100px;
      height: 100px;
    }

    .stats p {
      font-size: 14px;
    }

    .top-right-links {
      flex-direction: column;
      top: 10px;
      right: 10px;
    }

    .top-right-links a {
      padding: 6px 10px;
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    main {
      padding: 10px;
    }

    h1 {
      font-size: 18px;
      margin-top: 40px;
    }

    input[type="text"] {
      padding: 8px;
    }

    button {
      padding: 8px 12px;
    }

    .stats p {
      font-size: 14px;
      min-width: 100px;
    }

    #profile-container #avatar {
      width: 80px;
      height: 80px;
    }

    .top-right-links a {
      padding: 5px 8px;
      font-size: 11px;
    }
  }

  .theme-switch {
    display: flex;
    justify-content: center;
  }

  .theme-switch input {
    display: none;
  }

  .theme-switch .slider {
    width: 60px;
    height: 30px;
    background-color: #ccc;
    position: relative;
    border-radius: 15px;
    cursor: pointer;
  }

  .theme-switch .slider:before {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: all 0.4s;
  }

  .theme-switch input:checked + .slider {
    background-color: var(--button-background);
  }

  .theme-switch input:checked + .slider:before {
    transform: translateX(30px);
  }

  a:link,
  a:visited {
    color: var(--link-color);
    text-decoration: none;
  }
</style>
