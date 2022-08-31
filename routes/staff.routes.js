import express from "express";
import { verifyStaffLogin } from "../middleware/Verifications";
import { createStaff, deleteStaff, getStaff, loginStaff } from "../controllers/staff.controllers.js"

const router = express.Router;

// @route   GET/ staff
// @desc    Get all staff
// @access  public
router.get("/", verifyStaffLogin, getStaff);

// @route   POST/ staff
// @desc    Create staff
// @access  public
router.post("/", createStaff);

// @route   DELETE /staff/:id
// @desc    Delete staff
// @access  public
router.delete("/:id", deleteStaff);

// @route   POST /staff/login
// @desc    Login staff
// @access  Public
router.post("/login", loginStaff);

export default router;

