<template>
<div>
          <h2>Tetris with AI Evolution</h2>
      <p>
        Experience a modern twist on the classic Tetris game, enhanced with AI capabilities and multiple gameplay modes.
        Built with <strong>Svelte</strong> and <strong>Node.js</strong> serverless functions, this project leverages
        <strong>AWS Amplify</strong> and <strong>DynamoDB</strong> for seamless hosting and data management.
      </p>
      <h3>Gameplay Modes:</h3>
      <ul>
        <li><strong>Freeplay Mode</strong>: Enjoy Tetris without gravity—perfect for stress free casual play</li>
        <li><strong>Arcade Mode</strong>: Challenge yourself with classic Tetris gameplay featuring increasing gravity.</li>
      </ul> 
      <h3>Features:</h3>
      <ul>
        <li><strong>High Scores</strong>: Compete globally with a high-score system powered by AWS DynamoDB.</li>
        <li><strong>AI Training Mode</strong>: Dive into evolutionary algorithms by training AI agents. Customize parameters to evolve genomes (board evaluation functions) and observe their progress over generations.</li>
        <li><strong>Versus Mode</strong>: Test your skills against trained AI agents. Copy genomes to play against specific AI behaviors and strategies.</li>
                <li><strong>Responsive Design</strong>: Enjoy seamless gameplay across devices with mobile-friendly swipe controls and adaptive layout.</li>

      </ul>
      <p>
        This project showcases the fusion of classic game design with modern AI techniques and serverless architecture.
        It reflects my passion for innovative problem-solving and interactive user experiences.
      </p>
      <div class="play-button-container">
        <a href="https://main.dzuwukv72iqz5.amplifyapp.com/" target="_blank" class="play-button">🎮 Play Tetris</a>
      </div>
      <p>
        <a href="https://github.com/WilliamRichards2017/serverless-tetris" target="_blank" class="github-link">📂 View Source Code on GitHub</a>
      </p>
</div>
</template>

<style>

  .play-button-container {
    margin: 20px 0;

  }

  .play-button {
    display: inline-block;
    padding: 15px 25px;
    background-color: #0078d7;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .play-button:hover {
    background-color: #005fa3;
    transform: scale(1.05);
  }

  .play-button:active {
    transform: scale(0.98);
  }
</style>