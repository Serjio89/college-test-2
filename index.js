#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
let array = content.split('\r\n').slice(1);
console.log(`Количество существ: ${array.length}`);

const hirePrice = array.map((row) => row.split('|')[7]);
const sortedHirePrice = _.uniq(hirePrice).sort((a, b) => b - a);
const tenMostPowerfulPrice = sortedHirePrice[0] * 10;
const twentyAlmostPowerfulPrice = sortedHirePrice[1] * 20;
console.log(`Стоимость найма 10 самых сильных существ: ${tenMostPowerfulPrice}`);
console.log(`Стоимость найма 20 вторых по силе существ: ${twentyAlmostPowerfulPrice}`);

const powerList = array.map((row) => row.split('|')[2]);
const maxPower = Math.max(...powerList);
console.log(`Максимальная сила существа: ${maxPower}`);

const listOfWeight = array.map((row) => row.split('|')[6]);
const maxWeight = Math.max(...listOfWeight);
const minWeight = Math.min(...listOfWeight);

function typeOfUnit(weight) {
  switch(weight) {
    case 100:
      return 'Орк';
    case 80:
      return 'Дварф';
    case 60:
      return 'Эльф';
    case 50:
      return 'Гоблин';
    case 40:
      return 'Гном';
    case 30:
      return 'Хоббит';
    default:
      throw new Error('неверный вес');
  }
}

const listOfTypes = array.map((row) => row.split('|')[1]);
const quantity = array.map((row) => row.split('|')[4]);

console.log(`Самый толстый юнит: ${typeOfUnit(maxWeight)}`);
console.log(`Самый худой юнит: ${typeOfUnit(minWeight)}`);
console.log(`Cтоимость найма отряда самых толстых: ${hirePrice[0] * quantity[0]}`);
console.log(`Cтоимость найма отряда самых худых: ${hirePrice[5] * quantity[5]}`);
// END
