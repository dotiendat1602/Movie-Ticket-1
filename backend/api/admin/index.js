import { systemConfig } from "../../config/system.js";
import filmRoutes from "../../api/admin/film.js";
import cinemaRoutes from "../../api/admin/cinema.js";
import roomRoutes from "../../api/admin/room.js";
import showTimeRoutes from "../../api/admin/showtime.js";
import orderRoutes from "../../api/admin/order.js";
import userRoutes from "./user.js";
import dashboardRoutes from "./dashboard.js";
import newsRoutes from "./new.js";

import { checkPermissonAdmin } from "../../middlewares/checkPermission.js";

export const adminApi = (app) => {

    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    // app.use(`/${PATH_ADMIN}/films`, checkPermissonAdmin, filmRoutes);
    app.use(`/${PATH_ADMIN}/films`, filmRoutes);

    app.use(`/${PATH_ADMIN}/cinemas`, checkPermissonAdmin, cinemaRoutes);

    app.use(`/${PATH_ADMIN}/rooms`, checkPermissonAdmin, roomRoutes);

    app.use(`/${PATH_ADMIN}/showtimes`, checkPermissonAdmin, showTimeRoutes);

    app.use(`/${PATH_ADMIN}/orders`, checkPermissonAdmin, orderRoutes);

    app.use(`/${PATH_ADMIN}/users`, checkPermissonAdmin, userRoutes);

    app.use(`/${PATH_ADMIN}/dashboard`, checkPermissonAdmin, dashboardRoutes);

    app.use(`/${PATH_ADMIN}/news`, newsRoutes);
}