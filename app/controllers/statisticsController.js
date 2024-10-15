import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as shoppingListService from "../services/shoppingListService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const statistics = async () => {

  const data = {
    list: await shoppingListService.totalList(),
    item: await itemService.totalItem(),
  };
  return new Response(await renderFile("statistics.eta", data), responseDetails);
};


export { statistics };