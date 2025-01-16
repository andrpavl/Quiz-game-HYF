export default function randomSorting(array, createSortedListFunction) {
	array.sort(() => Math.random() - 0.5);
	createSortedListFunction();
}

export function sortByName(array, foo) {
	array.sort((a, b) => a.question.localeCompare(b.question));
	foo();
}

export function colorizeOptions() {
	const optionInputs = Array.from(document.querySelectorAll(".answer-input"));
	const radioInputs = Array.from(document.querySelectorAll(".answer-radio"));

	optionInputs.forEach((input, index) => {
		if (radioInputs[index].checked) {
			input.style.backgroundColor = "lightgreen";
		} else {
			input.style.backgroundColor = "lightcoral";
		}
	});
}

export function randomizeOptions(optionsArray) {
	const optionInputs = Array.from(document.querySelectorAll(".answer-input"));
	const radioInputs = Array.from(document.querySelectorAll(".answer-radio"));

	optionsArray = optionInputs.map((input, index) => ({
		text: input.value,
		isCorrect: radioInputs[index].checked,
	}));

	optionsArray.sort(() => Math.random() - 0.5);

	optionsArray.forEach((option, index) => {
		optionInputs[index].value = option.text;
		radioInputs[index].checked = option.isCorrect;
	});
	colorizeOptions();
}
