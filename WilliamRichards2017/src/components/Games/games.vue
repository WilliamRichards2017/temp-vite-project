<template>
  <div id="games">
    <div
      id="gamesListContainer"
      v-show="showMinesweeper || showTetris"
      class="inline"
    >
      <ul>
        <li
          id="gamesLink"
          v-on:click="
            showMinesweeper = false;
            showTetris = false;
          "
        >
          <a>Games</a>
        </li>
      </ul>

      <span class="headerdivider"></span>

      <ul>
        <li
          id="minesweeperActive"
          v-on:click="
            showMinesweeper = true;
            showTetris = false;
          "
        >
          <a>Minesweeper</a>
        </li>
        <li
          id="tetrisActive"
          v-on:click="
            showTetris = true;
            showMinesweeper = false;
          "
        >
          <a>Tetris</a>
        </li>
      </ul>
    </div>

    <!-- Main Games List -->
    <div v-show="!showMinesweeper && !showTetris">
      <ul style="padding-top: 20px">
        <!-- Tetris Section -->
        <li
          v-on:click="
            showTetris = true;
            showMinesweeper = false;
          "
        >
          <a>Tetris with AI Evolution</a>
        </li>
        <div style="display: flex; padding-bottom: 25px">
          <p class="description">
            Experience a modern twist on the classic Tetris game, enhanced with
            AI capabilities and multiple gameplay modes. Built with Svelte and
            Node.js serverless functions, this project leverages AWS Amplify and
            DynamoDB for seamless hosting and data management.
          </p>
          <img
            v-on:click="
              showTetris = true;
              showMinesweeper = false;
            "
            src="../../assets/tetris.png"
            style="padding-left: 50px"
            class="scaled-image"
            alt="Screenshot of the Tetris game"
          />
        </div>
      </ul>
    </div>

    <!-- Minesweeper Section -->
    <div v-show="!showMinesweeper && !showTetris">
      <li
        v-on:click="
          showMinesweeper = true;
          showTetris = false;
        "
      >
        <a>Minesweeper</a>
      </li>
      <div
        v-show="!showMinesweeper && !showTetris"
        style="display: flex; padding-bottom: 25px"
      >
        <p class="description">
          A classic Minesweeper game built using Vue.js. Includes varying levels
          of difficulty and intuitive controls.
        </p>
        <img
          v-on:click="
            showMinesweeper = true;
            showTetris = false;
          "
          src="../../assets/minesweeper.png"
          style="padding-left: 50px"
          class="scaled-image"
          alt="Screenshot of the Minesweeper game"
        />
      </div>
    </div>

    <!-- Minesweeper Component -->
    <minesweeper v-show="showMinesweeper"></minesweeper>

    <!-- Tetris Description and Links -->
    <div v-show="showTetris" class="tetris-details">
      <tetris></tetris>
    </div>
  </div>
</template>

<script>
import minesweeper from "./minesweeper.vue";
import Tetris from "./tetris.vue";
// Removed tetris component import

export default {
  components: {
    minesweeper,
    Tetris,
    // Removed tetris component
  },
  data() {
    return {
      showMinesweeper: false,
      showTetris: false,
    };
  },
  watch: {
    showMinesweeper(newVal) {
      d3.select("#minesweeperActive").classed("active", newVal);
    },
    showTetris(newVal) {
      d3.select("#tetrisActive").classed("active", newVal);
    },
  },
};
</script>

<style scoped>
img:hover {
  cursor: pointer;
}

.inline {
  padding-bottom: 25px;
  padding-left: 10px;
}

.description {
  width: 50%;
}

#gamesListContainer {
  padding-top: 10px;
  border-bottom: 1px solid #efece7;
}

#gamesListContainer a {
  font-size: 18px;
}

.inline ul li {
  font-size: 20px;
  list-style-type: disc;
  float: left;
  text-indent: -4px;
  margin-right: 50px;
}

.active a {
  color: #ac7ce3;
}

.scaled-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.tetris-details {
  padding: 20px;
}

.tetris-details h2 {
  margin-top: 0;
}

.tetris-details ul {
  list-style-type: disc;
  margin-left: 20px;
}

.play-link,
.github-link {
  display: inline-block;
  margin-right: 15px;
  font-weight: bold;
  color: #337ab7;
  text-decoration: none;
}

.play-link:hover,
.github-link:hover {
  text-decoration: underline;
}
</style>
