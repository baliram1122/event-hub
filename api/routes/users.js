import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyUser, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all accounts")
// })

// router.get("/checkcommittemember/:id", verifyUser, (req, res, next) => {
//     res.send("hello committemember, you are logged in and you can delete your account")
// })
// remove the verify user method if it is causing problem
// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", getUser);

// GET ALL
router.get("/", getAllUser);

export default router;        
