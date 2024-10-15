import { serve } from "https://deno.land/std@0.222.1/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as statisticsController from "./controllers/statisticsController.js";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as itemController from "./controllers/itemController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const method = request.method;

  if(method === "GET"){
    if (pathname === "/") {
      return await statisticsController.statistics();
    } else if (pathname === "/lists") {
      return await shoppingListController.viewShoppingLists(request);
    } else if (pathname.match("lists/[0-9]+")) {
      return await itemController.viewItems(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
  } else if(method === "POST"){
    if (pathname.match("/lists/[0-9]+/deactivate")) {
      return await shoppingListController.closeShoppingList(request);
    }else if (pathname.match("/lists/[0-9]+/items/[0-9]+/collect")) {
      return await itemController.collectShoppingListItem(request);
    }else if (pathname.match("/lists/[0-9]+/items/[0-9]+/noncollect")) {
      return await itemController.noncollectShoppingListItem(request);
    } else if (pathname.match("lists/[0-9]+/items")) {
      return await itemController.addShoppingListItem(request);
    } else if (pathname === "/lists") {
      return await shoppingListController.addShoppingList(request);
    }  
  } else {
    return new Response("Not found", { status: 404 });
  }
};
serve(handleRequest, { port: 7777 });