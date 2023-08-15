const express = require("express");
const { createnote,
  updatenote,
  deletenote,
  getnote, } = require("../controller/notecontroller");
const auth = require("../middleware/auth");

const notesRouter = express.Router();

notesRouter.get("/", auth, getnote);

notesRouter.post("/",auth, createnote);

notesRouter.delete("/:id",auth, deletenote)

notesRouter.put("/:id",auth, updatenote)

module.exports = notesRouter;
