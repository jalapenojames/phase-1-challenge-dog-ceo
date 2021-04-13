const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', init)

function init() {
    fetchUrl()
    addBreed()
    dropDown()
}

function fetchUrl() {
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(js => {
            console.log(js)
            js['message'].forEach(elem => {
                let dogImage = document.createElement('img')
                dogImage.src = elem
                dogImage.style.width = '100px'
                dogImage.style.height = '100px'
                document.getElementById('dog-image-container').appendChild(dogImage)
            })
        })
}

function addBreed() {
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(js => {
            let breedList = []
            function deepIterator(target) {
                if (typeof target === 'object') {
                  for (const key in target) {
                    deepIterator(target[key]);
                  }
                } else {
                  breedList.push(target)
                }
              } 
              deepIterator(js["message"])

              // post list to ul
              for (let i in breedList) {
                  let newLi = document.createElement('li')
                  newLi.innerText = breedList[i]
                  document.getElementById('dog-breeds').appendChild(newLi)
                  addColor(newLi)
              }
        })
}

function addColor(newLi) {
    newLi.addEventListener('click', () => {
        newLi.style.color = 'blue'
    })
}

function dropDown() {
    document.getElementById('breed-dropdown').addEventListener('change', () => {
        console.log('ok')
        let userSel = document.getElementById('breed-dropdown').value

        // hide elements that do not start with letter of selection
        //      get list
        let listOfLis = document.querySelectorAll('ul > li')
        //      reset, make sure all is unhidden (put here later)
        listOfLis.forEach(elem => {
            elem.style = ""
        })
        //      filter list
        listOfLis.forEach(elem => {
        if(elem.innerText.slice(0,1) !== document.getElementById('breed-dropdown').value)
        //      hide element
        elem.style = "display: none"
        })
    })
}
