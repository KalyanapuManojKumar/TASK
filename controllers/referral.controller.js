import Referral from "../models/referral.model.js";

/**
 * @desc Create new referral
 * @route POST /api/referrals
 * @access Private
 */

export const createReferral = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      contactNumber,
      referralType,
      clientProfession,
      propertyType,
      amenities,
      budgetRange,
      clientDetails,
    } = req.body;

    const referral = await Referral.create({
      fullName,
      email,
      contactNumber,
      referralType,
      clientProfession,
      propertyType,
      amenities: amenities || [],
      budgetRange,
      clientDetails,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: referral,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all referrals (Admin)
 */
export const getAllReferrals = async (req, res, next) => {
  try {
    const referrals = await Referral.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: referrals.length,
      data: referrals,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get logged in user's referrals
 */
export const getMyReferrals = async (req, res, next) => {
  try {
    const referrals = await Referral.find({
      createdBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: referrals,
    });
  } catch (error) {
    next(error);
  }
};
