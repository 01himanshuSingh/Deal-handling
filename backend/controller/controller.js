const bcryptjs = require('bcryptjs');
const User = require('../model/user.model');
const Student = require('../model/student.model')
const jwt = require('jsonwebtoken');
const SecreteKey = 'himashu@12';

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

   
    if (!username || !password || !role) {
      return res.status(400).json({
        message: 'Username, password, or role missing',
        success: false,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: 'Username already exists',
        success: false,
      });
    }

    // Hash password and create user
    const hashPassword = await bcryptjs.hash(password, 8);
    await User.create({
      username,
      password: hashPassword,
      role,
    });

    return res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (error) {
    console.log('Error registering user:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate request
    if (!username || !password || !role) {
      return res.status(400).json({
        message: 'Username, password, or role missing',
        success: false,
      });
    }

    const user = await User.findOne({ username, role }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Incorrect username or role',
        success: false,
      });
    }

    // Check if the password matches
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Incorrect username or password',
        success: false,
      });
    }

    // Hide password in response
    user.password = undefined;

    // Generate token
    const token = jwt.sign({ userId: user._id }, SecreteKey, { expiresIn: '1d' });
    return res
      .cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log('Error logging in:', error);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};


const logout = async (_, res) => {
  try {
    return res.cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out successfully',
      success: true,
    });
  } catch (err) {
    console.log('Error logging out:', err);
    return res.status(500).json({ message: 'Server error', success: false });
  }
};

const dealhandletask = async(req,res)=>{
 try {
  
  const {name , universityRollno,dealhandreview} = req.body;
  if (!name || !universityRollno || !dealhandreview) {
    return res.status(400).json({
      message: 'Student name and university and dealhand is missing',
      success: false,
    });
  }
  await Student.create({
    name,
    universityRollno,
    dealhandreview
  })

  return res.status(201).json({ message: 'deal handler registered successfully', success: true });
 
 } catch (error) {
 console.log('Student info is not send by deal handler ', error) 
 }
}

const studentIdget= async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find student by ID
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
        success: false,
      });
    }

    // Send the student data if found
    res.status(200).json({
      message: 'Student details retrieved successfully',
      success: true,
      student,
    });
  } catch (error) {
    console.log('Error retrieving student details:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};
 
const sectioninchargetask = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { sectionInchargereview } = req.body;

    // Validate request data
    if (!sectionInchargereview) {
      return res.status(400).json({
        message: 'Section incharge review is missing',
        success: false,
      });
    }

    // Update the sectionInchargereview field for the specified student
    const result = await Student.updateOne(
      { _id: studentId },
      { $set: { sectionInchargereview: sectionInchargereview } }
    );

    // Check if the student was found and updated
    if (result.nModified === 0) {
      return res.status(404).json({
        message: 'Student not found or review not updated',
        success: false,
      });
    }

    // Send a success response
    res.status(200).json({
      message: 'Section incharge review updated successfully',
      success: true,
      result,
    });
  } catch (error) {
    console.log('Error updating section incharge review:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


const draAcademictask = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { draAcademic } = req.body;

    // Validate request data
    if (!draAcademic) {
      return res.status(400).json({
        message: 'draAcademic incharge review is missing',
        success: false,
      });
    }

    // Update the sectionInchargereview field for the specified student
    const result = await Student.updateOne(
      { _id: studentId },
      { $set: { draAcademic: draAcademic } }
    );

    // Check if the student was found and updated
    if (result.nModified === 0) {
      return res.status(404).json({
        message: 'Student not found or review not updated',
        success: false,
      });
    }

    // Send a success response
    res.status(200).json({
      message: 'draAcademic incharge review updated successfully',
      success: true,
      result,
    });
  } catch (error) {
    console.log('Error updating draAcademic incharge review:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};


const deanAcademictask = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { deanAcademic } = req.body;

    // Validate request data
    if (!deanAcademic) {
      return res.status(400).json({
        message: 'draAcademic incharge review is missing',
        success: false,
      });
    }

    // Update the sectionInchargereview field for the specified student
    const result = await Student.updateOne(
      { _id: studentId },
      { $set: { deanAcademic: deanAcademic } }
    );

    // Check if the student was found and updated
    if (result.nModified === 0) {
      return res.status(404).json({
        message: 'Student not found or review not updated',
        success: false,
      });
    }

    // Send a success response
    res.status(200).json({
      message: 'deanAcademic incharge review updated successfully',
      success: true,
      result,
    });
  } catch (error) {
    console.log('Error updating deanAcademic incharge review:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};
const allStudent = async(req,res)=>{
  try {
    const students = await Student.find({});
    if(!students){
      return res.status(404).json({
        message: 'student  not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Student details retrieved successfully',
      success: true,
      students,
    });
  } catch (error) {
   console.log('eror to find user ', error) 
  }
}

const alladmin = async(req,res)=>{
  try {
    const admins = await User.find({})
    if(!admins){
      return res.status(404).json({
        message: 'admin not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Student details retrieved successfully',
      success: true,
      admins,
    });
  } catch (error) {
    
  }
}

module.exports = {
  register,
  login,deanAcademictask,
  dealhandletask,
  studentIdget,
  draAcademictask,
  sectioninchargetask,
  logout,
  alladmin,
  allStudent
};
