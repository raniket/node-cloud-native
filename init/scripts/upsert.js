module.exports = async (knex, tableName, conflictTarget, itemData) => {
  const firstObjectIfArray = Array.isArray(itemData) ? itemData[0] : itemData;
  const exclusions = Object.keys(firstObjectIfArray)
    .filter((c) => !conflictTarget.includes(c))
    .map((c) => knex.raw("?? = EXCLUDED.??", [c, c]).toString())
    .join(", ");
  
  const insertString = knex(tableName).insert(itemData).toString();
  let conflictString = null;
  if (exclusions) {
    conflictString = knex.raw(` ON CONFLICT (??) DO UPDATE SET ${exclusions} RETURNING *;`, conflictTarget).toString();
  } else {
    conflictString = " ON CONFLICT DO NOTHING RETURNING *;";
  }
  const query = (insertString + conflictString).replace(/\?/g, "\\?");
  const result = await knex.raw(query);
  return result;
};
