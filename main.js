if(localStorage.getItem('ind') != undefined || localStorage.getItem('ind') != NaN){
    var ind = localStorage.getItem('ind');
} else{
    ind = Math.floor(Math.random()*localStorage.getItem('size'));
}
async function getMp3Url(q) {
    let res = await $.get({url:'https://gentle-waters-55640.herokuapp.com/api/mp3/?q=' + q, Cache: false});
    // let data = Object.values(res);
    // var i = 1;
    // res = res.split('"')
    // arr = []
    // for (index in res) {
    //     if (res[index].includes('::')) {
    //         arr.push(res[index]);
    //     }
    // }
    // mp3Url = "https://apiyoutube.cc/m4a/" + arr[1] + "::" + arr[0];
    return res[mp3Url];
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
  let url = await getMp3Url(track_list[ind]["url"]);
  $('#src').attr('src', url);
  $('.player').eq(0).remove();
  $('body').append(`
  <div id=${ind} class="player">
  <img src=${track_list[ind]['imgUrl']} alt="" id="image">
    <h4>${track_list[ind]['name']}</h4>
  <audio controls autoplay name="media" onended="start()" id>
  <source src=${url} type="audio/webm" id="src">
</audio>
</div>`)
  // console.log(url);
  if(localStorage.getItem('size') != undefined){
      var size = localStorage.getItem('size');
      ind = Math.floor(Math.random()*track_list.length);
    } 
    localStorage.setItem('ind', Math.floor(Math.random()*track_list.length));
    localStorage.setItem('size', track_list.length);

  // console.log(ind);
}

