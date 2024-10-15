import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addShoppingList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingListService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewShoppingLists = async (request) => {
  const data = {
    lists: await shoppingListService.findAllActiveShoppingLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const closeShoppingList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shoppingListService.closeById(urlParts[2]);

  return await requestUtils.redirectTo("/lists");
};

const getShoppingListById = async (listId) => {
  const data = {
    lists: await shoppingListService.getShoppingListById(listId),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addShoppingList, viewShoppingLists, closeShoppingList, getShoppingListById };