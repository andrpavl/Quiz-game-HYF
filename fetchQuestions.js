async function fetchQuestions() {
	const response = await fetch(
		"https://raw.githubusercontent.com/andrpavl/andrpavl.github.io/main/data/data.json"
	);
	if (!response.ok) {
		throw new Error("Failed to fetch questions");
	}
	return response.json();
}

export default fetchQuestions;
