const knex = require("../../../settings/datastore");

class UserModel {
  constructor() {
    this.tableName = "user";
    this.defaultScope = [
      "id",
      "first_name",
      "middle_name",
      "last_name",
      "phone",
      "username",
      "email",
      "external_id",
      "password"
    ];
  }

  async create(data) {
    const result = await knex(this.tableName)
      .withSchema("public")
      .insert({
        first_name: data.first_name,
        middle_name: data.middle_name || null,
        last_name: data.last_name || null,
        phone: data.phone || null,
        email: data.email || null,
        username: data.username,
        password: data.password || null
      })
      .returning(this.defaultScope);
    return result;
  }

  async read(id) {
    const result = await knex(this.tableName)
      .withSchema("public")
      .table(this.tableName)
      .where({ id })
      .select(this.defaultScope);
    return result;
  }

  async update(id, fields) {
    const  result = await knex(this.tableName)
      .withSchema("public")
      .update(fields)
      .where({ id })
      .returning(this.defaultScope);
    return result;
  }

  async delete(id) {
    const result = await knex(this.tableName)
      .withSchema("public")
      .table(this.tableName)
      .where({ id })
      .update({ is_deleted: true })
      .returning(this.defaultScope);
    return result;
  }

  async findByUsername(username) {
    const result = await knex(this.tableName)
      .withSchema("public")
      .table(this.tableName)
      .where({ username })
      .select(this.defaultScope);
    return result;
  }

  // async findByUsernameAndUpdate(username, data) {
  //   const result = await knex.transaction(async (trx) => {
  //     let user = await trx(this.tableName)
  //       .withSchema("public")
  //       .table(this.tableName)
  //       .where({
  //         username: username
  //       })
  //       .select(this.defaultScope);

  //     if(user.length) {
  //       user = await trx(this.tableName)
  //         .withSchema("public")
  //         .update({
  //           first_name: data.first_name
  //         })
  //         .where({ username: username })
  //         .returning(this.defaultScope);
  //     }
  //     return user;
  //   });
  //   return result;
  // }

}

module.exports = new UserModel();
