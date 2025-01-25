const player1Name = document.getElementById("p1-input");
const player2Name = document.getElementById("p2-input");
const startBtn = document.getElementById("start-btn");
const playersSection = document.getElementById("players-container");
const scoreContainer = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const nameInputBlock = document.querySelector(".start-container");

startBtn.addEventListener("click", startQuiz);

let p1Score = 0;
let p2Score = 0;

// Enabling of Start button
playersSection.addEventListener("change", () => {
	player1Name.value && player2Name.value
		? (startBtn.disabled = false)
		: (startBtn.disabled = true);
});

function startQuiz() {
	restartBtn.style.display = "block";
	nameInputBlock.style.display = "none";

	scoreContainer.innerHTML = `
    <div>
		<h3 class="pName">${player1Name.value}</h3>
		<div class="score-buttons">
        	<button class="incr-btn p1-btn" data-action="incr-p1-score">Correct</button>
        	<span class="p1Score">${p1Score}</span>
        	<button class="decr-btn p1-btn" data-action="incr-p2-score">Wrong</button>
		</div>
	</div>

    <div>
		<h3 class="pName">${player2Name.value}</h3>
		<div class="score-buttons">
        	<button class="incr-btn p2-btn" data-action="incr-p2-score">Correct</button>
        	<span class="p2Score">${p2Score}</span>
        	<button class="decr-btn p2-btn" data-action="incr-p1-score">Wrong</button>
		</div>
	</div>
`;

	const player1Score = document.querySelector(".p1Score");
	const player2Score = document.querySelector(".p2Score");

	const updateButtonState = () => {
		const maxScore = p1Score === 10 || p2Score === 10;

		document.querySelectorAll(".incr-btn, .decr-btn").forEach((buttons) => {
			buttons.disabled = maxScore;
		});

		player1Score.textContent = p1Score;
		player2Score.textContent = p2Score;

		if (maxScore) {
			let sound = new Audio("assets/524848__mc5__short-brass-fanfare-2.wav");
			sound.play();
		}
	};

	scoreContainer.addEventListener("click", (evt) => {
		if (p1Score === 10 || p2Score === 10) return; // Avoiding to sound will be played after game ending
		if (evt.target.dataset.action === "incr-p1-score") {
			p1Score++;
		} else if (evt.target.dataset.action === "incr-p2-score") {
			p2Score++;
		}
		updateButtonState();
	});

	updateButtonState();
}

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
	scoreContainer.innerHTML = ``;

	startBtn.disabled = true;
	restartBtn.style.display = "none";
	nameInputBlock.style.display = "flex";
	player1Name.value = "";
	player2Name.value = "";
	p1Score = 0;
	p2Score = 0;
}
