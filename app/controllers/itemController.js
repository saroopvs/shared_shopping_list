import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as shoppingListService from "../services/shoppingListService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const viewItems = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let listId = urlParts[2];

  const data = {
    list: await shoppingListService.getListById(listId),
    collectedItems: await itemService.collectedItems(listId),
    nonCollectedItems: await itemService.nonCollectedItems(listId),
  };
  return new Response(await renderFile("items.eta", data), responseDetails);
};

const addShoppingListItem = async (request) => {
  const formData = await request.formData();
  let listId = formData.get("listId");
  let name = formData.get("name");
  const data = {
    listId : listId,
    name : name,
  };
  await itemService.addShoppingListItem(data);

  return requestUtils.redirectTo(`/lists/${listId}`);
};

const collectShoppingListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let listId = urlParts[2];
  let itemId = urlParts[4];

  await itemService.collectShoppingListItem(itemId);
  
  return requestUtils.redirectTo(`/lists/${listId}`);
};

const noncollectShoppingListItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let listId = urlParts[2];
  let itemId = urlParts[4];

  await itemService.noncollectShoppingListItem(itemId);
  
  return requestUtils.redirectTo(`/lists/${listId}`);
};


export {  viewItems, addShoppingListItem, collectShoppingListItem,noncollectShoppingListItem };