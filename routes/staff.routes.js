import express from "express";
import { verifyAdmin, verifyLogin, verifyStaff } from "../middleware/Verifications.js";
import { createStaff, deleteStaff, getStaff, loginStaff, changePassword, updateStaffInfo } from "../controllers/staff.controllers.js"

const router = express.Router();

// @route   GET/ staff
// @desc    Get all staff
// @access  public
router.get("/", verifyLogin, getStaff);

// @route   POST/ staff
// @desc    Create staff
// @access  public
router.post("/", verifyLogin, verifyAdmin, createStaff);

// @route   DELETE /staff/:email
// @desc    Delete staff
// @access  public
router.delete("/:email", verifyLogin, verifyAdmin, deleteStaff);

// @route   POST /staff/login
// @desc    Login staff
// @access  Public
router.post("/login", loginStaff);

// @route   PUT /staff/:email
// @desc    Update Staff Information
// @access  Private
router.put("/:email", verifyLogin, verifyStaff, updateStaffInfo)   

// @route   PUT /staff/changePassword/email
// @desc    Change Own Password 
// @access  Private
router.put("/changePassword/:email", verifyLogin, verifyStaff, changePassword)

export default router;

