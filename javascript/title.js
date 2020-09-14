setInterval("update()", 1000);

var next = false;
var user_id = 0;

function update(){
    if(!next && user_id != 0){
        fetch("../php/match_stay.php?id=" + user_id)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            next = json['result'];
        });
    }

    if(next){
        location.href = "../html/gameroom.html?user=" + user_id;
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
    });
}