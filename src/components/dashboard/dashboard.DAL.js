const StudentResult = require('../student/studentResult.model');

async function getDetailsBySubject(subject) {
  return StudentResult.aggregate([
    {
      $match: {
        subject,
      },
    },
    {
      $group: {
        _id: '$teacher',
        totalStudent: {
          $sum: 1,
        },
        totalMarks: {
          $sum: '$mark',
        },
      },
    },
    {
      $lookup: {
        from: 'teachers',
        localField: '_id',
        foreignField: '_id',
        as: 'teacher',
      },
    },
    {
      $unwind: {
        path: '$teacher',
      },
    },
    {
      $project: {
        _id: 1,
        totalStudent: 1,
        totalMarks: 1,
        hod: '$teacher.reportingHod',
      },
    },
    {
      $lookup: {
        from: 'hods',
        localField: 'hod',
        foreignField: '_id',
        as: 'hod',
      },
    },
    {
      $unwind: {
        path: '$hod',
      },
    },
    {
      $project: {
        _id: 1,
        totalStudent: 1,
        totalMarks: 1,
        hod: '$hod._id',
        name: '$hod.name',
      },
    },
    {
      $group: {
        _id: '$hod',
        name: {
          $first: '$name',
        },
        totalTeacher: {
          $sum: 1,
        },
        totalStudent: {
          $sum: '$totalStudent',
        },
        totalMarks: {
          $sum: '$totalMarks',
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        totalTeacher: 1,
        totalStudent: 1,
        average: {
          $divide: ['$totalMarks', '$totalStudent'],
        },
      },
    },
  ]);
}

module.exports = {
  getDetailsBySubject,
};
