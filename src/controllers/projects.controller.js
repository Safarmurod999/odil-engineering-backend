import { configDotenv } from "dotenv";
import { Project } from "../models/projects.model.js";

configDotenv();

const POST = async (req, res) => {
  try {
    const {
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
    } = req.body;
    if (
      !title_uz ||
      !title_ru ||
      !title_en ||
      !link ||
      !description_uz ||
      !description_ru ||
      !description_en
    ) {
      res.status(400).json({
        message: "All fields are required!",
      });
    }
    const newProject = await Project.create({
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
      is_active: true,
    });

    res.status(201).json({
      status: 201,
      data: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while creating project",
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

    const totalProjects = await Project.count();
    const projects = await Project.findAll({
      limit,
      offset,
    });

    res.status(200).json({
      status: 200,
      data: projects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
      totalProjects,
      message: "Projects successfully fetched",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching project",
      error: error.message,
    });
  }
};
const GET = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Project.findByPk(id);
    if (!data) {
      res.status(404).json({
        message: "Project not found!",
      });
    }
    res.status(200).json({
      status: 200,
      data,
      message: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while fetching project",
      error: error.message,
    });
  }
};
const UPDATE = async (req, res) => {
  try {
    const {
      title_uz,
      title_ru,
      title_en,
      link,
      description_uz,
      description_ru,
      description_en,
      is_active,
    } = req.body;
    const data = await Project.findByPk(req.params.id);
    if (!data) {
      res.status(404).json({
        message: "Project not found!",
      });
    }
    const project = await Project.update(
      {
        title_uz: title_uz ?? data.title_uz,
        title_ru: title_ru ?? data.title_ru,
        title_en: title_en ?? data.title_en,
        link: link ?? data.link,
        description_uz: description_uz ?? data.description_uz,
        description_ru: description_ru ?? data.description_ru,
        description_en: description_en ?? data.description_en,
        is_active: is_active ?? data.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
    const updatedProject = await Project.findByPk(req.params.id);
    res.status(200).json({
      status: 200,
      data: updatedProject,
      message: "Project updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while updating project",
      error: error.message,
    });
  }
};
const DELETE = async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = await Project.findByPk(id);
    if (!projectData) {
      res.status(404).json({
        message: "Project not found!",
      });
    }
    const data = await Project.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: 200,
      data: data,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error while deleting project",
      error: error.message,
    });
  }
};

export default {
  POST,
  GET_ALL,
  GET,
  UPDATE,
  DELETE,
};
