var needle = require("needle");
var cheerio = require("cheerio");

var express = require("express");
var app = express();

var results_name_group = [];
var output_day_date = [];
var output_disciplina_time = [];
var day_num = 0;
var output_disciplina = [];
var name_ped_out = [];

app.get("/group/:id", function(req, res) {
  results_name_group = [];
  output_day_date = [];
  output_disciplina_time = [];
  day_num = 0;
  output_disciplina = [];
  output_all_inf = [];
  name_ped = [];
  name_ped_out = [];
  var disc = [];
  var output_disc = [];
  var all = [];
  url =
    "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?v_gru=" +
    req.params.id;
  console.log(req.params.id);
  needle.get(url, function(err, res) {
    if (err) throw err;

    var $ = cheerio.load(res.body);
    results_name_group = $(".rasp_header").text(); //ок

    // $(".disciplina_cont").each((i, elem) => {
    //   var $a = $(elem);
    //   var b = $a.find(".disciplina_time").text();
    //   var $a = $(elem);
    //   // var c =
    //   $a.find(".disciplina_info").each((i, elem) => {
    //     var $c = $(elem);
    //     var disc = {
    //       name: $c.text()
    //     };
    //     output_disc.push(disc);
    //   });
    //   var disciplina = {
    //     name: output_disc
    //   };

    //   all.push(disciplina);
    // });
    //console.log(all);
    $(".disciplina_info")
      .children()
      .each((i, elem) => {
        var $a = $(elem);
        var name_ped = {
          time: 1,
          title: $a.text().split("  ");
        };
        name_ped_out.push(name_ped);
      });
    console.log(name_ped_out);
    // $(".disciplina_info")
    //   .children()
    //   .each((i, elem) => {
    //     var $a = $(elem);
    //     $a = $a.text().split("  ");
    //     var name_ped = {
    //       time: 21,
    //       title: $a
    //     };
    //     name_ped_out.push(name_ped);
    //   });

    //console.log(name_ped_out);

    $(".disciplina_time").each((i, elem) => {
      var $a = $(elem).find("p");
      var disciplina_time = {
        time: $a.text().split(" ")
      };
      // console.log(output_disciplina);
      output_disciplina_time.push(disciplina_time);
    });

    $(".day_date").each((i, elem) => {
      var $a = $(elem).find("p");
      var day_date = {
        data: $a.text().split(" ")
      };
      output_day_date.push(day_date);
    });
    //console.log(output_day_date);

    for (var i = 0; i < name_ped_out.length; i++) {
      day_num =
        i < 14
          ? 0
          : i < 28
          ? 1
          : i < 42
          ? 2
          : i < 56
          ? 3
          : i < 70
          ? 4
          : i < 84
          ? 5
          : 6;

      var day =
        i < 7
          ? 0
          : i < 14
          ? 1
          : i < 21
          ? 0
          : i < 28
          ? 1
          : i < 35
          ? 0
          : i < 42
          ? 1
          : i < 49
          ? 0
          : i < 56
          ? 1
          : i < 63
          ? 0
          : i < 70
          ? 1
          : i < 77
          ? 0
          : i < 84
          ? 1
          : i < 91
          ? 0
          : 1;

      var all_inf = {
        // name_of_group: results_name_group, //Номер группы
        // data: output_day_date[day_num].data[day], // Дата
        // number: output_disciplina_time[i], //.time[0], // Номер пары
        // //time: output_disciplina_time[i].time[1], // Время начала пары
        // name: name_ped_out[i].title[0], //название пары
        // type: name_ped_out[i].title[1], //Тип пары
        // class_room: name_ped_out[i].title[2], //Кабинет
        // name_of_pedagog: name_ped_out[i].title[3] //Имя преподавателя
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
