/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

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
  '9th Wing',
  'USSTRATCOM'
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
      rank: `E-${faker.number.int({ min: 1, max: 9 })}`,
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({ firstName, lastName, }),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      unit: getRandomElements(units)[0], 
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
    rank: 'E-5',
    first_name: 'John',
    last_name: 'Admin',
    email: 'admin@admin.com',
    phone: '000 000 0000',
    address: 'Admin Street, Admin City',
    unit: '2nd Bomb Wing',
    avatar: 'Adminvatar',
    password: await bcrypt.hash('password', 10)
  })
};