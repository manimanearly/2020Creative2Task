var select_box = [10, 0];
var select_box_img = [null, null];
var img_pos = [null, null];
var open_box = [0, 0, 0];

var fade = document.getElementById("fade");
var text_ui = document.getElementById("text_ui");
var turn_p_ui = document.getElementById("turn_player");
var turn_t_ui = document.getElementById("turn_text");
var s_or_h_text = document.getElementById("search_or_hide");

var is_conseal = false;
var is_tutorial_end = false;

var is_turn = false;

var user_id = Number(get_html_param("user"));
var rival_id = 0;
var room_id = Number(get_html_param("room_id"));
var searcher_id = 0;

fetch("../php/playdata.php?room_id=" + room_id + "&user=" + user_id)
    .then((res)=>{
        return res.json();
    })
    .then((json)=>{
        rival_id = json['rival'];
        searcher_id = json['searcher'];
        if(json['searcher'] == user_id){
            select_box[0] = 0;
            text_ui.src = "../image/Game_setup_ui.png";
            s_or_h_text.src = "../image/Searcher_ui.png";
        }
        else{
            text_ui.src = "../image/Game_set_start_ui.png";
            s_or_h_text.src = "../image/Hide_person_ui.png";
        }
    });

var is_turn_searcher = false;

var count = 0;

var winner = 0;

var open_count = 0;

var select_ui = [null, null, null, null, null, null, null, null, null];

setInterval("update()", 500);
setInterval("move_update()", 200);

for(let i = 0; i < 9; i++){
    select_ui[i] = document.getElementById("box" + (i + 1) + "_choice");
}

function move_update(){
    if(count >= 100 || select_box[0] >= 10) {
        return;
    }
    if(select_box.filter(function(x){return x == 0}).length == 0){
        if(img_pos[0] == null){
            img_pos = [select_box_img[0].getBoundingClientRect(), select_box_img[1].getBoundingClientRect()];
        }
        count += 5;
        move();
    } 
}

function update(){
    if(select_box.filter(function(x){return x == 0}).length == (is_turn_searcher ? 1 : 0)){
        if(is_turn_searcher){
            if(open_box.indexOf(select_box[0]) == -1 && open_count < 3){
                if(winner == searcher_id){
                    document.getElementById("box" + select_box[0]).src = "../image/TreasureBox_get.png";
                }
                else{
                    document.getElementById("box" + select_box[0]).src = "../image/TreasureBox_Open.png";
                }
                select_ui[select_box[0] - 1].src = "../image/TreasureBox_Open_Choice.png";
                open_box[open_count] = select_box[0];
                open_count += 1;
            }
            count += 20;
        }
        else if(select_box[0] == 10){
            count += 20;
        }
        if(count >= 100){
            count = 0;
            reset_box();
            if(winner > 0){
                game_end_update();
                return;
            }
            else if(is_turn){
                fetch("../php/play_update.php?room_id=" + room_id + "&update='turn_player=" + rival_id + ", choice_num=null, update_end=false'");
            }
        }
    } 
    else if(winner > 0){
        return;
    }
    else{
        fetch("../php/playdata.php?room_id=" + room_id + "&user=" + user_id)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            if(json['choice'] != null){
                let choice_data = Number(json['choice']);
                box_select(Number(json['choice']));
                if(is_turn_searcher){
                    if(Number(json['choice']) == json['conseal']){
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
            is_turn = (json['turn'] == user_id);
            is_turn_searcher = (json['searcher'] == json['turn']);
            is_conseal = json['conseal'] != null;
        });
    }
    if(!is_tutorial_end){
        if(is_turn){
            count += 1;
            if(count >= 5 || is_turn_searcher){
                count = 0;
                is_tutorial_end = true;
                fade.style.visibility =  "hidden";
                text_ui.style.visibility =  "hidden";
            }
        }
    }
    else if(is_conseal){
        for(let c = 0; c < 9; c++){
            select_ui[c].style.visibility = (select_box.indexOf(c + 1) == -1 ? "hidden" : "visible");
        }
    }
    main_ui_update();
}

function choice_box(num){
    if(!is_turn || winner > 0 || !is_tutorial_end || open_box.indexOf(num) > -1) return;

    if(is_turn_searcher){
        fetch("../php/play_update.php?room_id=" + room_id + "&update='choice_num=" + num + ", open_count=open_count %2B 1'");
    }
    else if(!is_conseal){
        fetch("../php/play_update.php?room_id=" + room_id + "&update='conseal_num=" + num + "'");
        select_box[1] = num;
        is_conseal = true;
        return;
    }
    else{
        fetch("../php/play_update.php?room_id=" + room_id + "&update='choice_num=" + num + "'");
    }
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
    for(let i = 0; i < select_box.length; i++){
        if(select_box[i] == 0){
            select_box[i] = Number(num);
            select_box_img[i] = document.getElementById("box" + num + "_ui");
            break;
        }
    }
}

function get_html_param(param_name){
    var params = window.location.search.substring(1).split('&');

    for(let d = 0; d < params.length; d++){
        var elements = params[d].split('=');
        if(elements[0] == param_name){
            return elements[1];
        }
    }

    return '';
}

function move(){
    let set_pos = move_lerp([img_pos[0].left, img_pos[0].top], [img_pos[1].left, img_pos[1].top], count / 100.0);
    select_box_img[0].style.top = set_pos[1] + "px";
    select_box_img[0].style.left = set_pos[0] + "px";

    set_pos = move_lerp([img_pos[1].left, img_pos[1].top], [img_pos[0].left, img_pos[0].top], count / 100.0);
    select_box_img[1].style.top = set_pos[1] + "px";
    select_box_img[1].style.left = set_pos[0] + "px";
}

function move_lerp(pos_a, pos_b, ratio){
    let calc_vec = [pos_a[0] - pos_b[0], pos_a[1] - pos_b[1]];
    let base_pos = [pos_a[0] - (calc_vec[0] / 2.0), pos_a[1] - (calc_vec[1] / 2.0)];
    let angle = Math.atan2(calc_vec[1], calc_vec[0]) + (Math.PI) * ratio;
    let dis = Math.sqrt(calc_vec[0] * calc_vec[0] + calc_vec[1] * calc_vec[1]) / 2.0;
    return [base_pos[0] + Math.cos(angle) * dis + window.pageXOffset, base_pos[1] + Math.sin(angle) * dis + window.pageYOffset];
}

function main_ui_update(){
    turn_p_ui.src="../image/" + (is_turn ? "You_ui.png" : "Rival_ui.png");
    turn_p_ui.style.visibility = is_tutorial_end ? "visible" : "hidden";
    turn_t_ui.style.visibility = is_tutorial_end ? "visible" : "hidden";
    s_or_h_text.style.visibility = is_tutorial_end ? "visible" : "hidden";
}

function game_end_update(){
    fade.style.visibility = "visible";
    turn_p_ui.style.visibility = "hidden";
    turn_t_ui.style.visibility = "hidden";
    s_or_h_text.style.zIndex = 20;
    s_or_h_text.src = "../image/You_ui.png";
    text_ui.src = "../image/" + (winner == user_id ? "Win_ui.png" : "Lose_ui.png");
    text_ui.style.visibility = "visible";
    document.getElementById("return_title_button").style.visibility = "visible";
}

function return_title(){
    fetch("../php/delete_data.php?user=" + user_id);
    location.href = "../html/title.html";
}