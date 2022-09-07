import express from "express";
import { verifyAdmin, verifyLogin, verifyStaff } from "../middleware/Verifications.js";
import { createStaff, deleteStaff, getStaff, loginStaff, changePassword, updateStaffInfo, changeSelfPassword } from "../controllers/staff.controllers.js"

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

// @route   PUT /staff/:id
// @desc    Update Staff Information
// @access  Private
router.put("/:id", verifyLogin, verifyAdmin, updateStaffInfo)   

// @route   PUT /staff/changePassword/:id
// @desc    Change Password 
// @access  Private
router.put("/changePassword/:id", verifyLogin, changePassword)

// @route   PATCH /staff/
// @desc    Change Own Password
// @access  Private

router.patch("/", verifyLogin, verifyStaff, changeSelfPassword);

export default router;

