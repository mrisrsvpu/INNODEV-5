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
url =
  "http://www.rsvpu.ru/raspisanie-zanyatij-ochnoe-otdelenie/?v_gru=" +
  number_of_grup;
var output_disciplina = [];
var output_kabinets = [];
needle.get(url, function(err, res) {
  if (err) throw err;

  var $ = cheerio.load(res.body);
  results_name_grup = $(".rasp_header").text(); //ок
  results_lessons = $(".disciplina_info").text();
  kabinets = prep = $(".darkblue").text();

  $(".disciplina_info").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina = {
      title: $a.text()
    };
    output_disciplina.push(disciplina);
  });

  $(".disciplina_time").each((i, elem) => {
    var $a = $(elem).find("p");
    var disciplina_time = {
      data: $a.text().split(" ")
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

  for (var i = 0; i <= output_disciplina.length; i++) {
    console.log(output_disciplina_time[i]);
    console.log(output_disciplina[i]);
    console.log(output_day_date[i]);
  }
});
