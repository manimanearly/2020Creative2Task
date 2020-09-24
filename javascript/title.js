setInterval("update()", 1000);

var stay_ui = document.getElementById("matching-ui");
var fade_ui = document.getElementById("fade");

var next = false;
var room_id = -1;
var user_id = 0;

function update(){
    if(!next && user_id != 0){
        fetch("../php/match_stay.php?id=" + user_id)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            next = json['result'];
            if(json['result'] == true){
                fetch("../php/create_playroom.php?room_id=" + room_id + "&player_id=" + user_id);
            }
        });
    }

    if(next){
        fetch("../php/room_search.php?user=" + user_id)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            if(json['room_id'] != null){
                location.href = "../html/gameroom.html?user=" + user_id + "&room_id=" + json['room_id'];
            }
        });
    }
}

// ユーザー作成
function create_user(){
    if(user_id != 0){
        return;
    }
    fetch("../php/create_id.php")
    .then((res)=>{
        return res.json();
    })
    .then((json)=>{
        user_id = json['user_id'];
        room_match(user_id);
    });
}

function room_match(id){
    fetch("../php/match.php?id=" + id)
    .then((res)=>{
        return res.json();
    })
    .then((json)=>{
        next = (json['num'] == "player2");
        room_id = json['roomid'];
    });
    fade_ui.style.visibility = "visible";
    stay_ui.style.visibility = "visible";
}