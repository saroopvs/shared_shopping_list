import { sql } from "../database/database.js";

const addShoppingListItem = async (data) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id, name)
    VALUES (${data.listId}, ${data.name})`;
};

const getItemList = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return false;
};

const collectedItems = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = TRUE 
    ORDER BY name`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return false;
};

const nonCollectedItems = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ listId } AND collected = FALSE 
    ORDER BY name`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return false;
};

const collectShoppingListItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
};

const noncollectShoppingListItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = false WHERE id = ${ id }`;
};

const totalItem = async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`;
  return rows[0];
};

export { addShoppingListItem, getItemList, collectShoppingListItem, noncollectShoppingListItem, collectedItems, nonCollectedItems, totalItem };