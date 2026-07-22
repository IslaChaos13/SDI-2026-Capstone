/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const ranks = [
  'Airman Basic',
  'Airman',
  'Airman First Class',
  'Senior Airman',
  'Staff Sergeant',
  'Technical Sergeant',
  'Master Sergeant',
  'Senior Master Sergeant',
  'Chief Master Sergeant'
]

const units = [
  '2nd Bomb Wing',
  '2nd Operations Group',
  '2nd Maintenance Group',
  '2nd Mission Support Group',
  '2nd Medical Group',
  '307th Bomb Wing',
  '49th Test and Evaluation Squadron',
  '608th Air Communications Squadron',
  '55th Wing',
  '95th Wing',
  'USSTRATCOM'
]

const duty_titles = [
  'Cyber Warfare Operations',
  'Air Traffic Control',
  'Cyber Defense Operations',
  'Geospatial Intelligence',
  'Cryptologic Language Analyst',
  'Aircrew Flight Equipment',
  'Weather',
  'Special Reconnaissance',
  'Financial Management & Comptroller',
  'Public Affairs',
  'Aircraft Fuel Systems',
  'Ground Transportation',
  'Munitions Systems',
  'Electrical Systems',
  'Personnel',
  'Services',
  'Security Forces',
  'Health Services Management'
]

function getRandomElements (elements){
  const numElements = Math.floor(Math.random() * elements.length) + 1;
  const shuffledElements = [...elements].sort(() => Math.random() - 0.5);

  return shuffledElements.slice(0, numElements);
}

async function createEntries(rows) {
  let data = []

  for (let i = 1; i <= rows; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

    data.push({
      is_admin: false,
      is_manager: faker.datatype.boolean(),
      rank: getRandomElements(ranks)[0],
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({ firstName, lastName, }),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      unit: getRandomElements(units)[0],
      duty_title: getRandomElements(duty_titles)[0],
      avatar: faker.image.avatar(),
      password: hashedPassword,
    })
  }

  return data
}

exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert(await createEntries(10));
  await knex('users').insert({
    is_admin: true,
    is_manager: true,
    rank: 'Staff Sergeant',
    first_name: 'John',
    last_name: 'Admin',
    email: 'admin@admin.com',
    phone: '000 000 0000',
    address: 'Admin Street, Admin City',
    unit: '2nd Bomb Wing',
    avatar: 'https://www.trademark.af.mil/portals/73/240801-F-DQ331-0002.png',
    password: await bcrypt.hash('password', 10)
  })

    await knex('users').insert({
    is_admin: false,
    is_manager: false,
    rank: 'Airman First Class',
    first_name: 'John',
    last_name: 'User',
    email: 'user@user.com',
    phone: '000 000 0000',
    address: 'User Street, User City',
    unit: '2nd Bomb Wing',
    avatar: faker.image.avatar(),
    password: await bcrypt.hash('password', 10)
    })
  }
