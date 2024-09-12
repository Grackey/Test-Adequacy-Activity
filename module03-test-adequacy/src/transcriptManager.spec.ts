import * as db from "./transcriptManager";

/*
Tests for the Transcript Manager. 
 */
describe('TranscriptManager', () => {

  beforeEach(() => {
    // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
    db.initialize();
  })

  describe('Create student', () => {
    it('should return an ID, starting with 1', () => {
      const ret = db.addStudent('avery');
      expect(ret).toEqual(1);
    });
  })
  describe('Adding grades', () => {
    it('should add the grade to the transcript', () => {
      const studentID = db.addStudent('test student');
      db.addGrade(studentID, 'test course', 100);
      const grade = db.getGrade(studentID, 'test course');
      expect(grade).toBe(100);
    })
    it('Should throw an error if the student ID is invalid', () =>{
      expect(() => db.addGrade(1, 'test course', 100)).toThrowError();
    });
  })
  describe('getStudentIDs', () => {
    it('Should return only the students who match the name', () => {
      const avery1 = db.addStudent('avery');
      const avery2 = db.addStudent('avery');
      const ripley = db.addStudent('ripley');

      //Probably should be checking if arrays contain same set of IDs, permitting different orders...
      expect(db.getStudentIDs('avery')).toEqual([avery1, avery2]);
      expect(db.getStudentIDs('ripley')).toEqual([ripley]);
    })
  });
  describe('Deleting students', () => {
    it('Should result in the students\' transcript no longer being available', () => {
      const studentID = db.addStudent('test student');
      db.deleteStudent(studentID);
      expect(db.getTranscript(studentID)).toBeUndefined();
    })
    it('Should throw an error if the ID is invalid', ()=>{
      expect(()=>db.deleteStudent(10)).toThrowError();
    })
  })
  describe('getAll', () => {
    it('Should return the transcripts', () => {
      expect(db.getAll()).toEqual([]);
    });
  });
});
