/* constants */
const resultsDiv = document.querySelector("#results");
const apiSearchForm = document.querySelector("#search-form");
const apiRoot = "https://api.tvmaze.com";

apiSearchForm.addEventListener("submit", (e) => {
	
	e.preventDefault();
	
});

//1. i need an api key
//2. this acts almost like a password
//3. we need it to access data from the google books api

function renderShows(e) {
	resultsDiv.innerHTML = "";
	let searchValue = e.target.search.value;

	// https://api.tvmaze.com/singlesearch/shows?q=searchValue
	fetch(`${apiRoot}/singlesearch/shows?q=${searchValue}&embed=episodes`)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw "something went wrong with the tv api";
			}
		})
		.then((data) => {
			console.log(data);
			//data consists of the show and all its episodes
			const showTitle = document.createElement("h2");
			const showImg = document.createElement("img");
			const showSum = document.createElement("p");
			showSum.style.width = "400px";
			showImg.width = "400";

			showTitle.textContent = data.name;
			showImg.src = data.image.original;
			showSum.innerHTML = data.summary;

			resultsDiv.append(showTitle, showImg, showSum);

			data._embedded.episodes.forEach((epi) => {
				console.log(epi);
				let season = document.createElement("p");
				let image = document.createElement("img");
				let summary = document.createElement("p");
				summary.style.width = "400px";
				image.width = "400";

				season.textContent = `Season ${epi.season} Episode ${epi.number}`;
				image.src = epi.image.original;
				summary.innerHTML = epi.summary;

				resultsDiv.append(image, season, summary);
			});
		});
}
