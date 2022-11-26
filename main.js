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
    url:
      "https://apiyoutube.cc/check.php?callback=jQuery34108672477917974195_1666787018121&v=" +
      q,
    Cache: false,
  });
  // let data = Object.values(res);
  var i = 1;
  res = res.split('"');
  arr = [];
  for (index in res) {
    if (res[index].includes("::")) {
      arr.push(res[index]);
    }
  }
  mp3Url = "https://apiyoutube.cc/m4a/" + arr[1] + "::" + arr[0];
  console.log(mp3Url);
  return mp3Url;
}

track_list = [];
async function getTrackResponse() {
  const res = await $.get(
    "https://shrouded-escarpment-70092.herokuapp.com/api/songs"
  );
  let data = Object.values(res);
  var i = 1;
  //   console.log(data);
  // data.reverse();
  for (index in data) {
    track_list.push(data[index]);
  }
  // console.log(track_list);
}
getTrackResponse();
let loop = setInterval(() => {
  // console.log("wait");
  if (track_list.length > 0) {
    start();
    clearInterval(loop);
  }
}, 200);

async function start() {
  ind = localStorage.getItem("ind");
  console.log(track_list[ind]);
  let url = await getMp3Url(track_list[ind]["url"]);
  $("#src").attr("src", url);
  $(".player").eq(0).remove();
  $("body").append(`
  <div id=${ind} class="player">
  <img src=${track_list[ind]["imgUrl"]} alt="" id="image">
    <h4>${track_list[ind]["name"]}</h4>
  <audio controls autoplay name="media" onended="start()" id>
  <source src=${url} type="audio/mpeg" id="src">
</audio>
</div>`);
  if (localStorage.getItem("size") != null) {
    var size = localStorage.getItem("size");
    ind = Math.floor(Math.random() * track_list.length);
  }
  localStorage.setItem("ind", Math.floor(Math.random() * track_list.length));
  localStorage.setItem("size", track_list.length);
}
