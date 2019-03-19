var needle = require("needle");
var cheerio = require("cheerio");

var express = require("express");
var app = express();

var output_name_group = [];
var output_day_date = [];
var output_disciplina_time = [];
var day_num = 0;
var output_disciplina = [];
var output_all_inf = [];

function reset_variables() {
  output_name_group = [];
  output_day_date = [];
  output_disciplina_time = [];
  day_num = 0;
  output_disciplina = [];
  output_all_inf = [];
}

function f_disciplina_info($) {
  var output_disciplina_f = [];
  $(".disciplina_info").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina = {
      title: $a.text().split("  ")
    };
    output_disciplina_f.push(disciplina);
    });
    return output_disciplina_f;
};

function f_output_disciplina_time($) {
  var output_disciplina_time_f = [];
  $(".disciplina_time").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina_time = {
      time: $a.text().split(" ")
    };

    output_disciplina_time_f.push(disciplina_time);
  });
  return output_disciplina_time_f;
}

function f_output_day_date($){

  var  output_day_date_f = [];

  $(".day_date").each((i, elem) => {
      var $a = $(elem).find("p");
      var day_date = {
        data: $a.text().split(" ")
      };
      output_day_date_f.push(day_date);
    });
    return output_day_date_f;
}

app.get("/group/:id", function(req, res) {

  reset_variables();

  url =
    "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?v_gru=" +
    req.params.id;
  console.log(req.params.id);
  needle.get(url, function(err, res) {
    if (err) throw err;

    var $ = cheerio.load(res.body);

    output_name_group = $(".rasp_header").text();

    
    output_disciplina = f_disciplina_info($);

    output_disciplina_time = f_output_disciplina_time($);

    output_day_date = f_output_day_date($);

    for (var i = 0; i < output_disciplina.length; i++) {
      
      day_num = i == 0 ? 0 : Math.ceil(i / 14) - 1;

      day = 1 - Math.ceil(i / 7) % 2;

      var all_inf = {
        name_of_group: output_name_group, //Номер группы
        data: output_day_date[day_num].data[day], // Дата
        number: output_disciplina_time[i].time[0], // Номер пары
        time: output_disciplina_time[i].time[1], // Время начала пары
        name: output_disciplina[i].title[0], //название пары
        type: output_disciplina[i].title[1], //Тип пары
        class_room: output_disciplina[i].title[2], //Кабинет
        name_of_pedagog: output_disciplina[i].title[3], //Имя преподавателя
        pod_grup: output_disciplina[i].title[4],
        name_1: output_disciplina[i].title[5], //название пары
        type_1: output_disciplina[i].title[6], //Тип пары
        class_room_1: output_disciplina[i].title[7], //Кабинет
        name_of_pedagog_1: output_disciplina[i].title[8], //Имя преподавателя
        pod_grup_1: output_disciplina[i].title[9]
      };
      output_all_inf.push(all_inf);
    }
    Send_all(output_all_inf);
  });
  function Send_all(a) {
    res.send(JSON.stringify(a)); // преобразование обекта в json строку  и отправка
  }
});

app.get("/teacher/:id", function(req, res) {

  reset_variables();

  url =
    "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?dbchoice=current&v_prep=" +
    req.params.id;
  console.log(req.params.id);
  needle.get(url, function(err, res) {
    if (err) throw err;

    var $ = cheerio.load(res.body);

    results_name_teacher = $(".rasp_header").text();

    output_disciplina = f_disciplina_info($);

    output_disciplina_time = f_output_disciplina_time($);

    output_day_date = f_output_day_date($);

    for (var i = 0; i < output_disciplina.length; i++) {

      day_num = i == 0 ? 0 : Math.ceil(i / 14) - 1;

      day = 1 - Math.ceil(i / 7) % 2;

      var all_inf = {
        name_of_ped: results_name_teacher, //Номер группы
        data: output_day_date[day_num].data[day], // Дата
        number: output_disciplina_time[i].time[0], // Номер пары
        time: output_disciplina_time[i].time[1], // Время начала пары
        name: output_disciplina[i].title[0], //название пары
        type: output_disciplina[i].title[1], //Тип пары
        class_room: output_disciplina[i].title[2], //Кабинет
        name_of_group: output_disciplina[i].title[3], //Группа
        pod_group: output_disciplina[i].title[4] //Подгруппа
      };
      output_all_inf.push(all_inf);
    }
    Send_all(output_all_inf);
  });
  function Send_all(a) {
    res.send(JSON.stringify(a)); // преобразование обекта в json строку  и отправка
  }
});

app.get("/extr_teacher/:id", function(req, res) {
  
  reset_variables();

  url =
    "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?dbchoice=current&v_prep=" +
    req.params.id;
  console.log(req.params.id);
  needle.get(url, function(err, res) {
    if (err) throw err;

    var $ = cheerio.load(res.body);
    results_name_teacher = $(".rasp_header").text();

   output_disciplina = f_disciplina_info($);

    output_disciplina_time = f_output_disciplina_time($);

    output_day_date = f_output_day_date($);

    for (var i = 0; i < output_disciplina.length; i++) {

      day_num = i == 0 ? 0 : Math.ceil(i / 14) - 1;

      day = 1 - Math.ceil(i / 7) % 2;

      var all_inf = {
        name_of_ped: results_name_teacher, //Номер группы
        data: output_day_date[day_num].data[day], // Дата
        number: output_disciplina_time[i].time[0], // Номер пары
        time: output_disciplina_time[i].time[1], // Время начала пары
        name: output_disciplina[i].title[0], //название пары
        type: output_disciplina[i].title[1], //Тип пары
        class_room: output_disciplina[i].title[2], //Кабинет
        name_of_group: output_disciplina[i].title[3], //Группа
        pod_group: output_disciplina[i].title[4] //Подгруппа
      };
      output_all_inf.push(all_inf);
    }
    Send_all(output_all_inf);
  });
  function Send_all(a) {
    res.send(JSON.stringify(a)); // преобразование обекта в json строку  и отправка
  }
});

app.get("/extr_group/:id", function(req, res) {
  
  reset_variables();

  url =
    "http://www.rsvpu.ru/racpisanie-zanyatij-zaochnoe-otdelenie/?dbchoice=current&v_gru=" +
    req.params.id;
  console.log(req.params.id);
  needle.get(url, function(err, res) {
    if (err) throw err;

    var $ = cheerio.load(res.body);
    output_name_group = $(".rasp_header").text();

    output_disciplina = f_disciplina_info($);

    output_disciplina_time = f_output_disciplina_time($);

    output_day_date = f_output_day_date($);

    for (var i = 0; i < output_disciplina.length; i++) {
      
      day_num = i == 0 ? 0 : Math.ceil(i / 14) - 1;

      day = 1 - Math.ceil(i / 7) % 2;

      var all_inf = {
        name_of_group: output_name_group, //Номер группы
        data: output_day_date[day_num].data[day], // Дата
        number: output_disciplina_time[i].time[0], // Номер пары
        time: output_disciplina_time[i].time[1], // Время начала пары
        name: output_disciplina[i].title[0], //название пары
        type: output_disciplina[i].title[1], //Тип пары
        class_room: output_disciplina[i].title[2], //Кабинет
        name_of_pedagog: output_disciplina[i].title[3], //Имя преподавателя
        pod_grup: output_disciplina[i].title[4],
        name_1: output_disciplina[i].title[5], //название пары
        type_1: output_disciplina[i].title[6], //Тип пары
        class_room_1: output_disciplina[i].title[7], //Кабинет
        name_of_pedagog_1: output_disciplina[i].title[8], //Имя преподавателя
        pod_grup_1: output_disciplina[i].title[9],
        name_2: output_disciplina[i].title[10], //название пары
        type_2: output_disciplina[i].title[11], //Тип пары
        class_room_2: output_disciplina[i].title[12], //Кабинет
        name_of_pedagog_2: output_disciplina[i].title[13], //Имя преподавателя
        pod_grup_2: output_disciplina[i].title[14],
        name_3: output_disciplina[i].title[15], //название пары
        type_3: output_disciplina[i].title[16], //Тип пары
        class_room_3: output_disciplina[i].title[17], //Кабинет
        name_of_pedagog_3: output_disciplina[i].title[18], //Имя преподавателя
        pod_grup_3: output_disciplina[i].title[19],
        name_4: output_disciplina[i].title[20], //название пары
        type_4: output_disciplina[i].title[21], //Тип пары
        class_room_4: output_disciplina[i].title[22], //Кабинет
        name_of_pedagog_4: output_disciplina[i].title[23], //Имя преподавателя
        pod_grup_4: output_disciplina[i].title[24],
        name_5: output_disciplina[i].title[25], //название пары
        type_5: output_disciplina[i].title[26], //Тип пары
        class_room_5: output_disciplina[i].title[27], //Кабинет
        name_of_pedagog_5: output_disciplina[i].title[28], //Имя преподавателя
        pod_grup_5: output_disciplina[i].title[29],
        name_6: output_disciplina[i].title[30], //название пары
        type_6: output_disciplina[i].title[31], //Тип пары
        class_room_6: output_disciplina[i].title[32], //Кабинет
        name_of_pedagog_6: output_disciplina[i].title[33], //Имя преподавателя
        pod_grup_6: output_disciplina[i].title[34]
      };
      output_all_inf.push(all_inf);
    }
    Send_all(output_all_inf);
  });
  function Send_all(a) {
    res.send(JSON.stringify(a)); // преобразование обекта в json строку  и отправка
  }
});

module.exports = app;
