import { Lead } from "../models/leads.model.js";

const POST = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLead = await Lead.create({
      name,
      email,
      phone,
      message,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newLead,
      message: "Lead created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error while creating lead",
      error: error.message,
    });
  }
};

const GET_ALL = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const totalLeads = await Lead.count();
    const leads = await Lead.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: leads,
      totalPages: Math.ceil(totalLeads / limit),
      currentPage: page,
      totalLeads,
      message: "Leads successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching leads",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const leadData = await Lead.findByPk(id);
    if (!leadData) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ status: 200, data: leadData, message: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching lead by id",
      error: error.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const data = await lead.destroy();
    res.status(200).json({
      status: 201,
      data: req.params.id,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while deleting lead",
      error: error.message,
    });
  }
};

export default { POST, GET_ALL, DELETE, GET };
