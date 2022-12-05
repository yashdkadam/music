var ind = 0;
if (localStorage.getItem("ind") == null) {
  ind = localStorage.setItem("ind", 0);
  ind = 0;
  console.log("ind null");
}
if (localStorage.getItem("ind") != null || localStorage.getItem("ind") != NaN) {
  ind = localStorage.getItem("ind");
  console.log("ind not null");
} else if (localStorage.getItem("size") != null) {
  ind = Math.floor(Math.random() * localStorage.getItem("size"));
  console.log("size not null");
}
async function getMp3Url(q) {
  let res = await $.get({
    url: "https://curious-parka-yak.cyclic.app/api/url/" + q,
    Cache: false,
  });
  console.log(res);
  return res["url"];
}

track_list = [];
async function getTrackResponse() {
  const res = await $.get("https://curious-parka-yak.cyclic.app/api/songs/");
  let data = Object.values(res);
  console.log(data);
  var i = 1;
  //   console.log(data);
  // data.reverse();
  for (index in data) {
    track_list.push(data[index]);
  }
  console.log(track_list);
}
getTrackResponse();
let loop = setInterval(() => {
  // console.log("wait");
  if (track_list.length > 0) {
    start();
    clearInterval(loop);
  }
}, 200);

function checkStatus(params) {
  var sound = new Audio(url);
  sound.volume = 0;
  sound
    .play()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function start() {
  ind = localStorage.getItem("ind");
  console.log(track_list[ind]);
  // let url = await getMp3Url(track_list[ind]["url"]);
  // if(checkStatus(url)){
  $("#src").attr("src", track_list[ind]["previewUrl"]);
  $(".player").eq(0).remove();
  $("body").append(`
    <div id=${ind} class="player">
    <img src=${track_list[ind]["imgUrl"]} alt="" id="image">
      <h4>${track_list[ind]["name"]}</h4>
    <audio controls autoplay name="media" onended="start()" 
    ontimeupdate="document.getElementById('tracktime').innerHTML = Math.floor(this.currentTime) + ' / ' + Math.floor(this.duration);">
    id>
    <source src=${track_list[ind]["previewUrl"]} type="audio/mpeg" id="src">
  </audio> <span><button onclick="start()">Next</button></span>
  <p id="tracktime"></p>
  </div>`);
  $(".player").ready(function () {});
  if (localStorage.getItem("size") != null) {
    var size = localStorage.getItem("size");
    ind = Math.floor(Math.random() * track_list.length);
  }
  localStorage.setItem("ind", Math.floor(Math.random() * track_list.length));
  localStorage.setItem("size", track_list.length);
  // } else{
  // localStorage.setItem('ind', ind);
  // start();
  // }
}
