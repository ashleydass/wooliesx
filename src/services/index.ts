import usersRoutes from "./users/routes";
import productsRoutes from "./products/routes";
import trolleyRoutes from "./trolley/routes";

export default [...usersRoutes, ...productsRoutes, ...trolleyRoutes];
