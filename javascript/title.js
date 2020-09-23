setInterval("update()", 1000);

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
}