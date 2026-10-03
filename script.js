const calculateAverageScore = (scores) => {
    return Math.floor(scores.reduce((total, score) => total + score, 0) / scores.length);
}

const populateContent = (data) => {
    const scoreValueEl = document.querySelector("[data-score]");
    const summaryListEl = document.querySelector("[data-summary-list]");

    summaryListEl.innerHTML = data.map(entry => {
        return `<li class="${entry.category.toLowerCase()}">
            <span class="result__summary-name">
                <img src="${entry.icon}" alt="">
                <span>${entry.category}</span>
            </span>
            <span class="result__summary-score">
                <strong>${entry.score}</strong>
                <span>/ 100</span>
            </span>
        </li>`
    }
    ).join("");

    scoreValueEl.textContent = calculateAverageScore(data.map(d => d.score));
}

const fetchSummaryData = async (path) => {
    try {
        const res = await fetch(path);
        const data = await res.json();
        populateContent(data);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchSummaryData("./data.json");
});