const mongoose = require('mongoose');
const { names, subjects } = require('../const');
const Hod = require('../components/hod/hod.model');
const Teachers = require('../components/teacher/teacher.model');
const StudentResult = require('../components/student/studentResult.model');
const log = require('../services/logger.service');

const totalHod = parseInt(process.env.TOTAL_HOD, 10) || 5;

async function initDatabase() {
  try {
    const hod = await Hod.findOne().exec();
    if (!hod) {
      log.info(`initializing Database first time`);
      for (let hodIndex = 0; hodIndex < totalHod; hodIndex++) {
        const nameIndex = Math.floor(Math.random() * names.length);
        let hodDoc = {
          name: names[nameIndex],
          teachers: [],
        };
        hodDoc = new Hod(hodDoc);
        hodDoc = await hodDoc.save();
        const totalTeacherPerHod = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // random number between 5 and 10
        for (
          let teacherIndex = 0;
          teacherIndex < totalTeacherPerHod;
          teacherIndex++
        ) {
          const teacherNameIndex = Math.floor(Math.random() * names.length);
          let teacherDoc = {
            name: names[teacherNameIndex],
            reportingHod: hodDoc._id,
            students: [],
          };
          teacherDoc = new Teachers(teacherDoc);
          teacherDoc = await teacherDoc.save();
          hodDoc.teachers.push(teacherDoc._id);
          const totalStudentPerTeacher =
            Math.floor(Math.random() * (50 - 20 + 1)) + 20; // random number between 20 and 50
          for (
            let studentIndex = 0;
            studentIndex < totalStudentPerTeacher;
            studentIndex++
          ) {
            const subjectOneIndex = Math.floor(Math.random() * subjects.length);
            let subjectTwoIndex = Math.floor(Math.random() * subjects.length);
            subjectTwoIndex =
              subjectTwoIndex === subjectOneIndex
                ? subjectTwoIndex === subjects.length - 1
                  ? subjectTwoIndex - 1
                  : subjectTwoIndex + 1
                : subjectTwoIndex;
            const subjectOneScore =
              Math.floor(Math.random() * (100 - 30 + 1)) + 30;
            const subjectTwoScore =
              Math.floor(Math.random() * (100 - 30 + 1)) + 30;
            const studentId = mongoose.Types.ObjectId();
            let resultOne = {
              studentId,
              subject: subjects[subjectOneIndex],
              teacher: teacherDoc._id,
              mark: subjectOneScore,
            };
            let resultTwo = {
              studentId,
              subject: subjects[subjectTwoIndex],
              teacher: teacherDoc._id,
              mark: subjectTwoScore,
            };
            resultOne = new StudentResult(resultOne);
            resultOne = await resultOne.save();
            resultTwo = new StudentResult(resultTwo);
            resultTwo = await resultTwo.save();
            teacherDoc.students.push(studentId);
          }
          await teacherDoc.save();
        }
        await hodDoc.save();
      }
      log.info(`Database Generated Successfully`);
    }
  } catch (err) {
    log.error(`Error in generating Database ${err}`);
  }
}

module.exports = {
  initDatabase,
};
