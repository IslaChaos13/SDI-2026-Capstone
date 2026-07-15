/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

async function createSeed(knex) {
  const usersId = await knex('users').select('id');
  const tasksId = await knex('tasks').select('id');
  const userTaskSeed = [];

  for (const user of usersId){
    const userTasks = getRandomElements(tasksId);

    for (const task of userTasks) {
      userTaskSeed.push({
        user_id: user.id,
        task_id: task.id
      })
    }
  }

  return userTaskSeed
}

function getRandomElements (elements){
  const numElements = Math.floor(Math.random() * elements.length) + 1;
  const shuffledElements = [...elements].sort(() => Math.random() - 0.5);

  return shuffledElements.slice(0, numElements);
}

exports.seed = async function(knex) {
  await knex('user_tasks').del()
  await knex('user_tasks').insert(await createSeed(knex));
};
