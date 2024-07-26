import express from "express";
import { deleteUserById, getUserById, getUsers, signin, signup, updateUserById } from "../controllers/auth";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/users", getUsers); 
router.delete("/users/:id", deleteUserById);
router.put("/users/:id", updateUserById);
router.get("/users/:id", getUserById);
export default router;
