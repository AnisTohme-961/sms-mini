import express from "express";
import { verifyAdmin, verifyLogin } from "../middleware/Verifications.js";
import { createStaff, deleteStaff, getStaff, loginStaff } from "../controllers/staff.controllers.js"

const router = express.Router();

// @route   GET/ staff
// @desc    Get all staff
// @access  public
router.get("/", verifyLogin, getStaff);

// @route   POST/ staff
// @desc    Create staff
// @access  public
router.post("/", verifyLogin, verifyAdmin, createStaff);

// @route   DELETE /staff/:id
// @desc    Delete staff
// @access  public
router.delete("/:id", verifyLogin, verifyAdmin, deleteStaff);

// @route   POST /staff/login
// @desc    Login staff
// @access  Public
router.post("/login", loginStaff);

export default router;

