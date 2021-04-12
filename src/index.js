let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(arrOfToyObjects => arrOfToyObjects.forEach(toyObject => {
    renderToyOnPage(toyObject)
  }))

  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", event => {
    event.preventDefault()
    const newToyData = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToyData)
    })
    .then(resp => resp.json())
    .then(newToyObj => renderToyOnPage(newToyObj))

  })

  const toyCollection = document.getElementById("toy-collection")
  toyCollection.addEventListener("click", event => {
    if (event.target.className === "like-btn") {
      const toyId = event.target.closest("div").dataset.id
      const likesPTag = event.target.previousElementSibling
      let likes = parseInt(likesPTag.textContent)
      likesPTag.textContent = `${likes += 1} Likes`
    

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({likes})
      })  
    }
  })

});

const renderToyOnPage = toyObject => {
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.dataset.id = toyObject.id
  toyCard.innerHTML = `
  <h2>${toyObject.name}</h2>
  <img src=${toyObject.image} class="toy-avatar" />
  <p>${toyObject.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `

  const toyCollection = document.getElementById("toy-collection")
  toyCollection.append(toyCard)
}
