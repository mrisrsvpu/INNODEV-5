# -Web-page-parser

Программа парсит страницы рассписания

# Описание API:

## GET: /group/:id

- **id** - id группы очной формы обучения c сайта РГППУ
например: `мРИС-101` соответсвует id 2806  

пример запроса:
- localhost:3000/group/2806

В ответ проходит Json строка со следующими ключами (*имя* - *описание* (*пример*)):  
- **name_of_group** - Название группы ("мРИС-101")  
- **data** - Дата проведения пары ("11.03.2019")  
- **number** - порядковый номер пары ("4.")  
- **time** - время начала пары ("13:45")  
- **name** - название пары ("Командообразование и методы групповой работы") 
- **type** - тип пары (лекция, практика, лабораторная работа) ("(лаб. работа)")  
- **class_room** - номер кабинета ("0-405")  
- **name_of_pedagog** - ФИО предподователя ("Аболина Н.С.") 

## GET: /teacher/:id

- **id** - id предподователя c сайта РГППУ
например: `Аболина Наталья Семеновна` соответсвует id 1  

пример запроса:
- localhost:3000/teacher/1

В ответ проходит Json строка со следующими ключами (*имя* - *описание* (*пример*)):  
- **name_of_ped** - ФИО предподавателя ("Аболина Наталья Семеновна")
- **data** - Дата проведения пары ("11.03.2019")
- **number** - порядковый номер пары ("4.")
- **time** - время начала пары ("13:45")
- **name** - название пары ("Командообразование и методы групповой работы")
- **type** - тип пары (лекция, практика, лабораторная работа) ("(лаб. работа)") 
- **class_room** - номер кабинета ("0-405")
- **name_of_group** - название группы ("ПС-111")
- **pod_group** - название подгруппы (" ")

## GET: /extr_group/:id

- **id** - id группы заочной формы обучения c сайта РГППУ
например: `аЗПО-114` соответсвует id 2946  

пример запроса:
- localhost:3000/extr_group/2946 

В ответ проходит Json строка со следующими ключами (*имя* - *описание* (*пример*)):  
- **"name_of_group"** - Название группы ("аЗПО-114")
- **"data"** - Дата проведения пары ("19.03.2019)
- **"number"** - порядковый номер пары ("4.")
- **"time"** - время начала пары ("13:45")
- **"name"** - название пары ("Научно-исследовательская деятельность")
- **"type"** - тип пары (лекция, практика, лабораторная работа) ("(практика)")
- **"class_room"** - номер кабинета ("9-203")
- **"name_of_pedagog"** - ФИО предподавателя ("Дорожкин Е.М.")
- **"pod_grup"** - название подгруппы ("(1 п/г)")
- **"name_1"** - название пары ("Научно-исследовательская деятельность")
- **"type_1"** - тип пары (лекция, практика, лабораторная работа) ("(практика)")
- **"class_room_1"** - номер кабинета ("9-206")
- **"name_of_pedagog_1"** - ФИО предподавателя ("Чупина В.А.")
- **"pod_grup_1"** - название подгруппы ("(2 п/г)")
- **"name_2"** - название пары ("Научно-исследовательская деятельность",
- **"type_2"** - тип пары (лекция, практика, лабораторная работа) ("(практика)",
- **"class_room_2"** - номер кабинета ("9-201")
- **"name_of_pedagog_2"** - ФИО предподавателя ("Чапаев Н.К.")
- **"pod_grup_2"** - название подгруппы ("(4 п/г)")
- **"name_3"** - название пары ("Научно-исследовательская деятельность")
- **"type_3"** - тип пары (лекция, практика, лабораторная работа) ("(практика)")
- **"class_room_3"** - номер кабинета ("2-525")
- **"name_of_pedagog_3"** - ФИО предподавателя ("Ронжина Н.В.")
- **"pod_grup_3"** - название подгруппы ("(5 п/г)")
- **"name_4"** - название пары ("Научно-исследовательская деятельность")
- **"type_4"** - тип пары (лекция, практика, лабораторная работа) ("(практика)")
- **"class_room_4"** - номер кабинета ("0-203а")
- **"name_of_pedagog_4"** - ФИО предподавателя ("Днепров С.А.")
- **"pod_grup_4"** - название подгруппы ("(3 п/г)")

## GET: /extr_teacher/:id

- **id** - id предподователя c сайта РГППУ
например: `Аболина Наталья Семеновна` соответсвует id 1  

пример запроса:
- localhost:3000/group/1

В ответ проходит Json строка со следующими ключами (*имя* - *описание* (*пример*)):  
- **name_of_ped** - ФИО предподавателя ("Аболина Наталья Семеновна")
- **data** - Дата проведения пары ("18.03.2019")
- **number** - порядковый номер пары ("2.")
- **time** - время начала пары ("09:45")
- **name** - название пары ("История психологии")
- **type** - тип пары (лекция, практика, лабораторная работа) ("(практика)") 
- **class_room** - номер кабинета ("0-406")
- **name_of_group** - название группы ("ПС-111")
- **pod_group** - название подгруппы (" ")

# Запуск

1. Утановить: node.js (https://nodejs.org/dist/v10.15.3/node-v10.15.3-x64.msi)  
1. установить пакетный менеджер: yarn, командой "npm i yarn -g"  
1. При первом запуске выполнить в дерриктори с проектом: "yarn install"  
1. Для запуска выполнить:
  - Для запуска в режиме разработки выполнить в директори с проектом: "yarn dev"  
  - Для запуска в режиме продакшн в дерриктори с проектом: "yarn start"  

# docker

сборка образа - `docker build -t mris/parser .`  
запуск образа - `docker run --rm -ti -p 80:80 mris/parser` 
или в фоне - `docker run --rm --name parser -d -p 80:80 mris/parser`  
запуск через compose - `docker-compose up`  