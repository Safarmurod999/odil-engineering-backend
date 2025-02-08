import { Op } from "sequelize";
import { Lead } from "../models/leads.model.js";

// Create a new lead
const POST = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !message_uz ||
      !message_en ||
      !message_ru
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the lead already exists
    const existingLead = await Lead.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingLead) {
      return res.status(409).json({
        message: "Lead with this email or phone already exists",
      });
    }

    const newLead = await Lead.create({
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active: !!is_active,
    });

    return res
      .status(201)
      .json({ message: "Lead created successfully", lead: newLead });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating lead", error: error.message });
  }
};

// Get all leads
const GET_ALL = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    return res.status(200).json(leads);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching leads", error: error.message });
  }
};

// Get a single lead by ID
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json(lead);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching lead", error: error.message });
  }
};

// Update a lead
const UPDATE = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active,
    } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.update({
      name,
      email,
      phone,
      message_uz,
      message_en,
      message_ru,
      is_active,
    });
    return res.status(200).json({ message: "Lead updated successfully", lead });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating lead", error: error.message });
  }
};

// Delete a lead
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.destroy();
    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting lead", error: error.message });
  }
};

export default { POST, GET_ALL, GET, UPDATE, DELETE };
