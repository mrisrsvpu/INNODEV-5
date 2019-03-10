var needle = require("needle");
var cheerio = require("cheerio");
var number_of_grup = 2806;
var results_name_grup = [];
var results_lessons = [];
var output_day_date = [];
var cabinet = [];
var prep = [];
var result_time_of_lessons_left = [];
var result_time_of_lessons_right = [];
var rezult_summ = [];
var result_disciplina_time = [];
var output_disciplina_time = [];
var rezult_last = [];
var day_num = 0;
var output_all_inf = [];
url =
  "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?v_gru=" +
  number_of_grup;
var output_disciplina = [];
var output_kabinets = [];

needle.get(url, function(err, res) {
  if (err) throw err;

  var $ = cheerio.load(res.body);
  results_name_grup = $(".rasp_header").text(); //ок

  $(".disciplina_info").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina = {
      title: $a.text().split("  ")
    };
    output_disciplina.push(disciplina);
  });

  $(".disciplina_time").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina_time = {
      time: $a.text().split(" ")
    };

    output_disciplina_time.push(disciplina_time);
  });
  $(".day_date").each((i, elem) => {
    var $a = $(elem).find("p");
    var day_date = {
      data: $a.text().split(" ")
    };
    output_day_date.push(day_date);
  });

  for (var i = 0; i < output_disciplina.length; i++) {
    day_num =
      i <= 7
        ? 0
        : i <= 14
        ? 0
        : i <= 21
        ? 1
        : i <= 28
        ? 1
        : i <= 35
        ? 2
        : i <= 42
        ? 2
        : i <= 49
        ? 3
        : i <= 56
        ? 3
        : i <= 63
        ? 4
        : i <= 70
        ? 4
        : i <= 77
        ? 5
        : i <= 84
        ? 5
        : i <= 91
        ? 6
        : 6;

    var day =
      i <= 7
        ? 0
        : i <= 14
        ? 1
        : i <= 21
        ? 0
        : i <= 28
        ? 1
        : i <= 35
        ? 0
        : i <= 42
        ? 1
        : i <= 49
        ? 0
        : i <= 56
        ? 1
        : i <= 63
        ? 0
        : i <= 70
        ? 1
        : i <= 77
        ? 0
        : i <= 84
        ? 1
        : i <= 91
        ? 0
        : 1;

    var all_inf = {
      name_of_grup: results_name_grup, //Номер группы
      data: output_day_date[day_num].data[day], // Дата
      number: output_disciplina_time[i].time[0], // Номер пары
      time: output_disciplina_time[i].time[1], // Время начала пары
      name: output_disciplina[i].title[0], //название пары
      type: output_disciplina[i].title[1], //Тип пары
      class_room: output_disciplina[i].title[2], //Кабинет
      name_of_pedagog: output_disciplina[i].title[3] //Имя преподавателя
    };
    output_all_inf.push(all_inf);

    // console.log(output_day_date[day_num].data[day]); // Дата               //
    // console.log(output_disciplina_time[i].time[0]); // Номер пары            //////
    // console.log(output_disciplina_time[i].time[1]); // Время начала пары          /////////
    // console.log(output_disciplina[i].title[0]); //название пары                           //// отладка
    // console.log(output_disciplina[i].title[1]); //Тип пары                         ////////
    // console.log(output_disciplina[i].title[2]); //Кабинет                    //////
    // console.log(output_disciplina[i].title[3]); //Имя преподавателя        //
  }
  console.log(JSON.stringify(output_all_inf)); // преобразование обекта в json строку
});
