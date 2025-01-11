import { Router } from "express";
// import registerRouter from "../register.router.js"; 
import registerRouter from "./register.router.js";

// import loginRouter from "./login.router.js"; 

const rootRouter = Router();

rootRouter.use("/registerLogin", registerRouter);
// rootRouter.use("/login", loginRouter);

export default rootRouter; // Default export
