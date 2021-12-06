// const server = 'http://localhost:8080/'
// const server = 'https://45.143.93.51/';
// const server = 'http://45.143.93.51/';
// const server = 'localhost:8080/';
const server = 'https://letters-reader2.tk/quiz/';

async function send_req(req_json) {
    console.log(JSON.stringify(req_json));

    var url = server;

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req_json)
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      let res_json = await response.json();
      return res_json;
    } else {
        // alert("Ошибка HTTP: " + response.status);
        console.log("Ошибка HTTP: " + response.status);
        // alert("Ошибка при подключении к серверу");
        return {status: "failed", error: "connection"};
        // return {"error": "1"};
    }
}

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

function calc_hash(str) {
    /*jshint bitwise:false */
    let n = str.length;
    let salt = "my_magic_salt_4_great_soup";
    return digestMessage(str + salt);
}

async function add_round(round_json) {
    // calc_hash(pswd);
    let req_json = round_json;
    req_json["type"] = "add_round";
    let res_json = send_req(req_json);
    return res_json;
}

async function get_round_list() {
    let req_json = {
        type: "get_round_list"
    };
    let res_json = send_req(req_json);
    return res_json;
}

async function get_question_list(round_id) {
    let req_json = {
        type: "get_question_list",
        round_id: round_id
    };
    let res_json = send_req(req_json);
    return res_json;
}

async function get_rating_table() {
    let req_json = {
        type: "get_rating_table"
    };
    let res_json = send_req(req_json);
    return res_json;
}



