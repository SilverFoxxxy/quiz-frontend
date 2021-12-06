
async function show_rounds() {
    let nowjson = await get_round_list();
    document.getElementById('round_list').innerHTML = JSON.stringify(nowjson, null, '\t');
}
