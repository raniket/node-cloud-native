require('dotenv').config();

const upsert = require('../../scripts/upsert');

const userData = require('./data/user.data');

exports.seed = async function(knex_auth) {
  await upsert(knex_auth, 'user', 'id', userData);
};
