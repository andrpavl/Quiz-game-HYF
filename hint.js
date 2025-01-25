const hintContainer = document.querySelector(".hint-block");
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", () => {
	hintContainer.style.display = "none";
});

setTimeout(() => {
	hintContainer.style.display = "none";
}, 30000);
