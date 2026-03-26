import { get } from "./utils/get.js";
import { create } from "./utils/create.js";
import { set } from "./utils/set.js";
import { BackgroundGradient } from "./BackgroundGradient.js";
import { MenuModule } from "./modules/menuwindow.js";
import { RejseplanenModule } from "./modules/Rejseplanen.js";

BackgroundGradient();

const app = get("#app");

const grid = create("div", "app-grid");
set(grid, app);

(async () => {
  set(await MenuModule(), grid);
  set(await RejseplanenModule(), grid);
})();
