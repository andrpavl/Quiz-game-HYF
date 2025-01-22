import fetchQuestions from "./fetchQuestions.js";
import randomSorting from "./utils.js";
import { sortByName } from "./utils.js";
import { colorizeOptions } from "./utils.js";
import { randomizeOptions } from "./utils.js";

const form = document.querySelector(".quiz-form");
const questionInput = document.querySelector(".question-input");
const optionsContainer = document.querySelector(".options");
const randomizeButton = document.getElementById("randomize-btn");
const submitButton = document.querySelector(".submit-btn");
const radioButtons = document.querySelectorAll(".answer-radio");
const questionsList = document.querySelector(".questions-list-js");
const filterInput = document.querySelector(".filter-input-js");
const sortButton = document.getElementById("sort-btn");
const randomSortingButton = document.getElementById("random-sorting-btn");

let questions = [];

// Submitting the form and creating the quiz Question object
submitButton.addEventListener("click", createQuestionObject);

// Randomizing options on button click
randomizeButton.addEventListener("click", () => randomizeOptions(options));

// Adding click event listeners to radio buttons
radioButtons.forEach((radio) => {
	radio.addEventListener("click", colorizeOptions);
});

// Filtering questions
filterInput.addEventListener("input", filterQuestions);

// Reveal question
questionsList.addEventListener("click", (event) => {
	if (event.target.classList.contains("reveal-btn")) {
		revealAnswer(event.target);
	}
});


// Sorting of questions list by name
sortButton.addEventListener("click", () =>
	sortByName(questions, createQuestionsList)
);

//Random sorting
randomSortingButton.addEventListener("click", () =>
	randomSorting(questions, createQuestionsList)
);

function storeQuestions() {
	fetchQuestions()
		.then((data) => {
			questions = data;
			createQuestionsList();
			filterInput.style.display = questions.length > 0 ? "block" : "none";
		})
		.catch((error) => {
			console.log(error);
		});
}

storeQuestions();


function createQuestionObject(evt) {
	evt.preventDefault();

	const question = questionInput.value;
	const options = Array.from(document.querySelectorAll(".answer-input")).map(
		(input, index) => ({
			text: input.value,
			isCorrect: document.querySelectorAll(".answer-radio")[index].checked,
		})
	);
	const explanation = document.querySelector(".explan-input").value;

	if (
		options.some((option) => option.text.trim() === "") ||
		question.trim() === "" ||
		explanation.trim() === ""
	) {
		alert("Please, fill up all the fields");
		return;
	}

	const quizQuestion = {
		id: Date.now(),
		question,
		options,
		explanation,
	};

	questions.push(quizQuestion);

	if (questions.length > 0) {
		createQuestionsList();
	}

	console.log(questions);

	form.reset();

	resetOptionColors();
	
	questions.length <= 0
		? (filterInput.style.display = "none")
		: (filterInput.style.display = "block");
}


function createQuestionsList() {
	const listItem = questions
		.map(({ question, options, explanation }) => {
			return `<li class="question-list-item">
                <p class="item-question">${question}</p>
                ${options
									.map((item, index) => {
										return `<span class="item-answer">${index + 1}). ${
											item.text
										}</span>
						
						`;
									})
									.join("")}
									<hr />
									<p class="explanation">${explanation}</p>
                <button class="reveal-btn">Reveal</button>
            </li>`;
		})
		.join("");

	questionsList.innerHTML = listItem;
}

questions.length <= 0
	? (filterInput.style.display = "none")
	: (filterInput.style.display = "block");

function filterQuestions() {
	const filterValue = filterInput.value.toLowerCase();
	const filteredQuestions = questions.filter(({ question }) =>
		question.toLowerCase().includes(filterValue)
	);

	const listItem = filteredQuestions
		.map(({ question, options }) => {
			return `<li class="question-list-item">
      					<p class="item-question">${question}</p>
						${options
							.map((item, index) => {
								return `<span class="item-answer">${index + 1}). ${
									item.text
								}</span>`;
							})
							.join(" ")}
    					<button class="reveal-btn">Reveal</button>
					</li>`;
		})
		.join(" ");

	questionsList.innerHTML = listItem;
}

function revealAnswer(button) {
	const questionItem = button.closest(".question-list-item");
	const questionIndex = Array.from(questionsList.children).indexOf(
		questionItem
	);
	const currentQuestion = questions[questionIndex];

	const answers = questionItem.querySelectorAll(".item-answer");
	const explanation = questionItem.querySelector(".explanation");

	explanation.style.display = "block";

	currentQuestion.options.forEach((option, index) => {
		if (option.isCorrect) {
			answers[index].style.backgroundColor = "lightgreen";
		}
	});

	button.disabled = true;
}

function resetOptionColors() {
	const optionInputs = Array.from(document.querySelectorAll(".answer-input"));
	optionInputs.forEach((input) => {
		input.style.backgroundColor = "";
	});
}
