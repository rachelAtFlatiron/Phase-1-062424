/* constants */
const resultsDiv = document.querySelector("#results");
const apiSearchForm = document.querySelector("#search-form");
const apiRoot = "https://api.tvmaze.com";


const renderShow = (episode) => {
    //create elements
    const title = document.createElement('h2')
    const season = document.createElement('p')
    const image = document.createElement('img')
    const summary = document.createElement('p')

    //update elements with values
    title.textContent = episode.name
    season.textContent = `Season ${episode.season} Episode ${episode.number}`
    image.src = episode.image.medium 
    summary.textContent = episode.summary

    //append to results div
    resultsDiv.append(title)
    resultsDiv.append(season)
    resultsDiv.append(image)
    resultsDiv.append(summary)
}

//✅ 1. on tv maze api search form submit 
apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let query = e.target.search.value 
    //✅ 1a. send search value to API
    //colon represents that it expects query to be a variable
    fetch(`${apiRoot}/singlesearch/shows?q=${query}`)
    .then(res => {
        if(res.ok){
            return res.json()
        } else {
            console.error('something went wrong')
        }
    })
    //someone can do a blog on Promises.all
    .then(data => {
        console.log(data.id)
        fetch(`${apiRoot}/shows/${data.id}/episodes`)
        .then(res => {
            if(res.ok){
                return res.json()
            } else {
                console.error('soemthing went wrong')
            }
        })
        .then(episodes => {
            console.log(episodes)
            episodes.forEach(show => renderShow(show))
        })
    })

    //✅ 1b. render title, image, summary of show


    //✅ 1c. render first episode of show

})



//✅ 1d. render all episodes of show

//✅ 2. create keys.js file to hold API key for Google books

//✅ 3b. make fetch request to google books

//✅ 3c. display data on page for one book


//✅ 3d. iterate over all items and display data on page
