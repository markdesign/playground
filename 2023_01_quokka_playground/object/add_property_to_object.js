const game = {
  status: "in-progress",
  scoreHistory: [2, 4, 10, 45],
};

// 1. Read only Property
// same as game.maxPlayers = 2;
Object.defineProperty(game, "maxPlayers", {
  value: 2,
  writable: false,
});
game.maxPlayers = 5;
game.maxPlayers; //?

// 2 getter
Object.defineProperty(game, "highScore", {
  get() {
    return Math.max(...this.scoreHistory);
  },
});
game.highScore; //?
game.scoreHistory.push(100);
game.highScore; //?

// 3 setter
Object.defineProperty(game, "completed", {
  set(value) {
    if (value && this.status === "completed") {
      throw new Error("Game is already completed!");
    }
    if (value) {
      this.status = "completed";
    }
  },
});
game.completed = true;
game.status; //?
game.completed = true;//?

