const audioPlayer = document.getElementById("audio-container");
const prevButton = document.getElementById("js-previous-button");
const nextButton = document.getElementById("js-next-button");
const searchBox = document.getElementById("js-name-entry");
let radioStationNameText = document.getElementById("js-radio-name-container");

let radioNumber = 0;
let radioName;
let radioStationName;
let radioLength;


traverseRadio();

prevButton.addEventListener("click", () => {
  if(radioNumber > 0){
    prevButton.style.opacity = 1;
    nextButton.style.opacity = 1;
    radioNumber -= 1;
    console.log("Radio number at: " + radioNumber);
    traverseRadio();
  }else if(radioNumber - 1 <= 0){
    prevButton.style.opacity = 0.5;
  }
});

nextButton.addEventListener("click", () => {
  if(radioNumber < radioLength - 1){
    prevButton.style.opacity = 1;
    nextButton.style.opacity = 1;
    radioNumber += 1;
    console.log("Radio number at: " + radioNumber);
    traverseRadio();
  }else if(radioNumber + 1 >= radioLength - 1){
    nextButton.style.opacity = 0.5;
  }
});

searchBox.addEventListener("keydown", (event) => {
  if(event.key == "Enter"){
    const name = searchBox.value.trim();
    console.log(name);
    radioName = name;
    radioNumber = 0;
    traverseRadio();
  }
});


function traverseRadio(){
  if(radioName){
    fetch(`https://de1.api.radio-browser.info/json/stations/search?name=${radioName}`)
      .then(res => res.json())
      .then(data => {
        // Radio Browser API returns objects, not URLs directly.
        // You have to use data[index].url_resolved
        const streamUrl = data[radioNumber].url_resolved;
        console.log(data[radioNumber].name)
        //4 is cool
        audioPlayer.innerHTML = `
          <audio controls autoplay src="${streamUrl}"></audio>
        `;
        radioLength = data.length;
        radioStationName = data[radioNumber].name;

        radioStationNameText.innerHTML = `<p>${radioStationName}</p>`;
      })
      .catch(err => console.error(err));

  }
}


