const Course = require('../models/course.model');

const createCourse = async (req, res, next) => {
  try {
    const { title, description, price, duration, category, instructorName, courseImage } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      duration,
      category,
      instructorName,
      courseImage,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('createdBy', 'name email');

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
const updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};