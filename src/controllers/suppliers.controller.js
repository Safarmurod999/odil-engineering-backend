import { Supplier } from "../models/suppliers.model.js";

const POST = async (req, res) => {
  try {
    const {
      company_name,
      partner_count,
      inn,
      contact_person,
      email,
      phone,
      company_description,
      offer,
    } = req.body;

    if (
      !company_name ||
      !partner_count ||
      !inn ||
      !contact_person ||
      !email ||
      !phone ||
      !company_description ||
      !offer
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOffer = await Supplier.create({
      company_name,
      partner_count,
      inn,
      contact_person,
      email,
      phone,
      company_description,
      offer,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newOffer,
      message: "Offer created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error while creating offer",
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

    const totalOffers = await Supplier.count();
    const offers = await Supplier.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: offers,
      totalPages: Math.ceil(totalOffers / limit),
      currentPage: page,
      totalOffers,
      message: "Offers successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while fetching offers",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const offerData = await Supplier.findByPk(id);
    if (!offerData) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({ status: 200, data: offerData, message: null });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching offer by id",
      error: error.message,
    });
  }
};

const UPDATE = async (req, res) => {
  try {
    const {
      company_name,
      partner_count,
      inn,
      contact_person,
      email,
      phone,
      company_description,
      offer,
      is_active
    } = req.body;
    const offerData = await Supplier.findOne({
      where: { id: req.params.id },
    });
    const updateOffer = await Supplier.update(
      {
        company_name: company_name ?? offerData.company_name,
        partner_count: partner_count ?? offerData.partner_count,
        inn: inn ?? offerData.inn,
        contact_person: contact_person ?? offerData.contact_person,
        email: email ?? offerData.email,
        phone: phone ?? offerData.phone,
        company_description:
          company_description ?? offerData.company_description,
        offer: offer ?? offerData.offer,
        is_active: is_active ?? offerData.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
    const updatedOffer = await Supplier.findByPk(req.params.id);

    res.status(200).json({
      status: 200,
      data: updatedOffer,
      message: "Offer updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error while creating offer",
      error: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Supplier.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Offer not found" });
    }

    const data = await lead.destroy();
    res.status(200).json({
      status: 201,
      data: req.params.id,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while while deleting lead",
      error: error.message,
    });
  }
};

export default { POST, GET_ALL, DELETE, GET, UPDATE };
