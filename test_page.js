
async function show_rounds() {
    let nowjson = await req_get_round_list();
    document.getElementById('round_list').innerHTML = JSON.stringify(nowjson, null, '\t');
}

async function show_questions() {
    let round_id = parseInt(document.getElementById('round_id_1').value);
    let nowjson = await req_get_question_list(round_id);
    document.getElementById('question_list').innerHTML = JSON.stringify(nowjson, null, '\t');
}

async function add_round() {
    let strjson = document.getElementById('round_info').value;
    let nowjson = JSON.parse(strjson);
    console.log(nowjson);
    let res = await req_add_round(nowjson);
    document.getElementById('add_round_res').innerHTML = JSON.stringify(res, null, '\t');
}

async function del_round() {
    let round_id = parseInt(document.getElementById('del_round_id').value);
    let res = await req_del_round(round_id);
    document.getElementById('del_round_res').innerHTML = JSON.stringify(res, null, '\t');
}
