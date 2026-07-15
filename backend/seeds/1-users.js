/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { faker } = require('@faker-js/faker')

function createEntries(rows){
  let data = []

  for (let i = 1; i <= rows; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    data.push({
      is_admin: false,
      is_manager: faker.datatype.boolean(),
      rank: `E-${faker.number.int({ min: 1, max: 9 })}`,
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email({firstName,lastName,}),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
    })
  }

  return data
}

exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert(createEntries(10));
  await knex('users').insert({
    is_admin: true,
    is_manager: true,
    rank: 'E-5',
    first_name: 'John',
    last_name: 'Admin',
    email: 'ImAdmin@admin.com',
    phone: '000 000 0000',
    address: 'Admin Street, Admin City',
    avatar: 'Adminvatar',
    password: 'Admin Password'
  })
};
