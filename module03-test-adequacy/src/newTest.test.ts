import * as db from "./transcriptManager";

describe('Within database', () => {
    beforeEach(() => {
        // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
        db.initialize();
    })    

    describe("Adding grade", () => {
        it('Should ensure that grades initialize as empty list if not given', () => {
            const studentID = db.addStudent('test student');
            expect(db.getTranscript(studentID)?.grades).toEqual([]);
        });

        it('Should throw an error if the student already has a grade in that course', () => {
            const studentID = db.addStudent('test student');
            const course = 'duplicate course'
            db.addGrade(studentID, 'duplicate course', 100)
            expect(() => {
                db.addGrade(studentID, course, 88)
            }).toThrowError();
        });
    })

    describe('Getting grade', () => {
        it('Should throw an error if there is no grade to retrieve', () => {
            const studentID = 1337
            const course = ''
            expect(() => {
                db.getGrade(studentID, course)
            }).toThrowError()
        })
    })

    describe('Deleting students', () => {
        it('Should correctly delete student that is not the first added', () => {
          const studentID1 = db.addStudent('test student1');
          const studentID2 = db.addStudent('test student2');
          db.deleteStudent(studentID2);
          expect(db.getTranscript(studentID2)).toBeUndefined();
        })
        it('Should throw an error with the correct message if the ID is invalid', ()=>{
          expect(()=>db.deleteStudent(10)).toThrowError(`no student with ID = 10`);
        })
      })
})

describe('demo students are correcly added to db', () => {
    beforeAll(() => {
        // Before all of the tests run, clean up the datastore and add demo data.
        db.initialize();
        db.addDemoData();
    }) 

    it('Should successfully add avery to the database when adding demo data', () => {
        const averyID = db.getStudentIDs('avery');
        expect(averyID).not.toBeNull;
        expect(averyID.length).toEqual(1);
        const averyTranscript = db.getTranscript(averyID[0]);
        expect(averyTranscript?.grades).toEqual([{"course": "DemoClass", "grade": 100}, {"course": "DemoClass2", "grade": 100}]);
        expect(averyTranscript?.student.studentName).toEqual('avery');  
    })

    it('Should successfully add the first blake to the database when adding demo data', () => {
        const blakeID = db.getStudentIDs('blake');
        expect(blakeID).not.toBeNull;
        expect(blakeID.length).toEqual(2);
        const blakeTranscript = db.getTranscript(blakeID[0]);
        expect(blakeTranscript?.grades).toEqual([{"course": "DemoClass", "grade": 80}]);
        expect(blakeTranscript?.student.studentName).toEqual('blake');  
    })


    it('Should successfully add the second blake to the database when adding demo data', () => {
        const blakeID = db.getStudentIDs('blake');
        expect(blakeID).not.toBeNull;
        expect(blakeID.length).toEqual(2);
        const blakeTranscript = db.getTranscript(blakeID[1]);
        expect(blakeTranscript?.grades).toEqual([{"course": "DemoClass", "grade": 85}, {"course": "DemoClass", "grade": 40}]);
        expect(blakeTranscript?.student.studentName).toEqual('blake');  
    })

    it('Should successfully add casey to the database when adding demo data', () => {
        const caseyID = db.getStudentIDs('casey');
        expect(caseyID).not.toBeNull;
        expect(caseyID.length).toEqual(1);
        const caseyTranscript = db.getTranscript(caseyID[0]);
        expect(caseyTranscript?.grades).toEqual([{"course": "DemoClass", "grade": 100}]);
        expect(caseyTranscript?.student.studentName).toEqual('casey');  
    })
})
