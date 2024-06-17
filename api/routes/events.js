import express from "express";
import createError  from "../utils/error.js";
import { addComment, createEvent, deleteComment, deleteEvent, getAllEvent, getEvent, updateComment, updateEvent } from "../controller/event.js";
import { verifyCommitteMember } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyCommitteMember, createEvent);

router.put("/:id", verifyCommitteMember, updateEvent);

router.delete("/:id", verifyCommitteMember, deleteEvent);

// GET SINGLE
router.get("/:id", getEvent);

// GET ALL
router.get("/", getAllEvent);

router.post("/comments/:id", addComment)

router.delete("/comments/:id/:commentId", deleteComment)

router.put("/comments/:id/:commentId", updateComment)


export default router;
