import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const closeById = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

const findAllActiveShoppingLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
};

const getListById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

const totalList = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_lists`;
  return rows[0];
};

export { create, closeById, findAllActiveShoppingLists, getListById, totalList };