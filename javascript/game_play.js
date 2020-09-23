var select_box = [10, 0];
var select_box_img = [null, null];
var img_pos = [null, null];
var open_box = [0, 0, 0];

var is_conseal = false;

var is_turn = false;

var user_id = Number(get_html_param("user"));
var rival_id = 0;
var room_id = Number(get_html_param("room_id"));

fetch("../php/playdata.php?room_id=" + room_id + "&user=" + user_id)
    .then((res)=>{
        return res.json();
    })
    .then((json)=>{
        rival_id = json['rival'];
        if(json['searcher'] == user_id){
            select_box[0] = 0;
        }
    });

var is_turn_searcher = false;

var count = 0;

var winner = 0;

var open_count = 0;

var select_ui = [null, null, null, null, null, null, null, null, null];

setInterval("update()", 500);

for(i = 0; i < 9; i++){
    select_ui[i] = document.getElementById("box" + (i + 1) + "_choice");
}

function update(){
    if(select_box.filter(function(x){return x == 0}).length == (is_turn_searcher ? 1 : 0)){
        if(is_turn_searcher){
            count += 1;
        }
        else if(select_box[0] == 10){
            count += 1;
        }
        else{
            if(img_pos[0] == null){
                img_pos = [select_box_img[0].getBoundingClientRect(), select_box_img[1].getBoundingClientRect()];
            }
            count += 1;
            move();
        }
        if(count >= 5){
            count = 0;
            reset_box();
            if(is_turn){
                fetch("../php/play_update.php?room_id=" + room_id + "&update='turn_player=" + rival_id + ", choice_num=null, update_end=false'");
            }
        }
    } 
    else if(winner > 0){
        result();
    }
    else{
        fetch("../php/playdata.php?room_id=" + room_id + "&user=" + user_id)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            if(json['choice'] != null){
                box_select(json['choice']);
                if(is_turn_searcher){
                    if(json['choice'] == json['conseal']){
                        winner = json['searcher'];
                    }
                    else if(json['open_count'] >= 3){
                        winner = json['searcher'] == user_id ? rival_id : user_id;
                    }
                }      
                if(!is_turn){
                    fetch("../php/play_update.php?room_id=" + room_id + "&update='update_end=true'");
                }
                else if(json['update'] == true){
                    fetch("../php/play_update.php?room_id=" + room_id + "&update='choice_num=null, update_end=false'");
                }
            }
            open_count = json['open_count'];
            is_turn = (json['turn'] == user_id);
            console.log(is_turn);
            is_turn_searcher = (json['searcher'] == json['turn']);
        });
    }
    if(is_conseal){
        for(c = 0; c < 9; c++){
            select_ui[c].style.visibility = (select_box.indexOf(c + 1) == -1 ? "hidden" : "visible");
        }
    }
    console.log(select_box);
}

function choice_box(num){
    if(!is_turn || winner > 0) return;

    if(is_turn_searcher){
        fetch("../php/play_update.php?room_id=" + room_id + "&update='choice_num=" + num + ", open_count=open_count %2B 1'");
        open_box[open_count] = num;
    }
    else if(!is_conseal){
        fetch("../php/play_update.php?room_id=" + room_id + "&update='conseal_num=" + num + "'");
        select_box[1] = num;
        is_conseal = true;
    }
    else{
        fetch("../php/play_update.php?room_id=" + room_id + "&update='choice_num=" + num + "'");
    }

    console.log("click");
}

function reset_box(){
    select_box = [0, 0];
    select_box_img = [null, null];
    img_pos = [null, null];
}

function box_select(num){
    if(select_box.filter(function(x){return x == num}).length > 0){
        return;
    }
    for(i = 0; i < select_box.length; i++){
        if(select_box[i] == num) return;
        if(select_box[i] == 0){
            select_box[i] = num;
            select_box_img[i] = document.getElementById("box" + num + "_ui");
            break;
        }
    }
}

function get_html_param(param_name){
    var params = window.location.search.substring(1).split('&');

    for(d = 0; d < params.length; d++){
        var elements = params[d].split('=');
        if(elements[0] == param_name){
            return elements[1];
        }
    }

    return '';
}

function move(){
    let set_pos = move_lerp([img_pos[0].left, img_pos[0].top], [img_pos[1].left, img_pos[1].top], count / 10.0);
    select_box_img[0].style.top = set_pos[1] + "px";
    select_box_img[0].style.left = set_pos[0] + "px";
    console.log("A = " + set_pos);

    set_pos = move_lerp([img_pos[1].left, img_pos[1].top], [img_pos[0].left, img_pos[0].top], count / 10.0);
    select_box_img[1].style.top = set_pos[1] + "px";
    select_box_img[1].style.left = set_pos[0] + "px";
    console.log("B = " + set_pos);
}

function move_lerp(pos_a, pos_b, ratio){
    let calc_vec = [pos_a[0] - pos_b[0], pos_a[1] - pos_b[1]];
    let base_pos = [pos_a[0] - (calc_vec[0] / 2.0), pos_a[1] - (calc_vec[1] / 2.0)];
    let angle = Math.atan2(calc_vec[1], calc_vec[0]) + (Math.PI) * ratio;
    let dis = Math.sqrt(calc_vec[0] * calc_vec[0] + calc_vec[1] * calc_vec[1]) / 2.0;
    return [base_pos[0] + Math.cos(angle) * dis + window.pageXOffset, base_pos[1] + Math.sin(angle) * dis + window.pageYOffset];
}

function result(){
    if(winner == user_id){

    }
    else{

    }
}