/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

async function createSeed(knex) {
  const adminUsers = await knex('users')
    .select('id')
    .where('is_manager', true);

  const directoryIds = await knex('directory').select('id');

  const directoryPocSeed = [];

  for (const user of adminUsers) {
    const userDirectories = getRandomElements(directoryIds);

    for (const directory of userDirectories) {
      directoryPocSeed.push({
        id_users: user.id,
        id_directory: directory.id
      });
    }
  }

  return directoryPocSeed;
}

function getRandomElements(elements) {
  const numElements = Math.floor(Math.random() * elements.length) + 1;

  const shuffledElements = [...elements].sort(() => Math.random() - 0.5);

  return shuffledElements.slice(0, numElements);
}

exports.seed = async function(knex) {
  await knex('directory_poc').del();

  const directoryPocSeed = await createSeed(knex);

  if (directoryPocSeed.length > 0) {
    await knex('directory_poc').insert(directoryPocSeed);
  }
};