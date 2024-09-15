import * as db from "./transcriptManager";

// Needs to come first so database is not initialized
describe("Transcript list is initialized as an empty list", () => {
    it('Initially transcripts list should be an empty list', () => {
        const transcripts = db.getAll();
        expect(transcripts.length).toEqual(0);
        expect(transcripts).toEqual([]);
    });
});

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

        it('Should throw an error if there is no student with the given ID', () => {
            const fakeStudentID = 103;
            const course = 'example course'
            expect(() => {
                db.addGrade(fakeStudentID, course, 88)
            }).toThrowError(`no student with ID = ${fakeStudentID}`);
        });

        it('Should throw an error if the student already has a grade in that course', () => {
            const studentID = db.addStudent('test student');
            const course = 'duplicate course'
            db.addGrade(studentID, 'duplicate course', 100)
            expect(() => {
                db.addGrade(studentID, course, 88)
            }).toThrowError(`student ${studentID} already has a grade in course ${course}`);
        });
    })

    describe('Getting grade', () => {
        it('Should throw an error if there is no grade to retrieve', () => {
            const studentID = 1337
            const course = ''
            expect(() => {
                db.getGrade(studentID, course)
            }).toThrowError(`no grade for student ${studentID} in course ${course}`)
        })
    })

    describe('Deleting grade', () => {
        it('Should throw an error if there is no student with ID', () => {
            const studentID = 800
            expect(() => {
                db.deleteStudent(studentID)
            }).toThrowError(`no student with ID = ${studentID}`)
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
        expect(averyTranscript?.grades).toEqual([{ "course": "DemoClass", "grade": 100 }, { "course": "DemoClass2", "grade": 100 }]);
        expect(averyTranscript?.student.studentName).toEqual('avery');
    })

    it('Should successfully add the first blake to the database when adding demo data', () => {
        const blakeID = db.getStudentIDs('blake');
        expect(blakeID).not.toBeNull;
        expect(blakeID.length).toEqual(2);
        const blakeTranscript = db.getTranscript(blakeID[0]);
        expect(blakeTranscript?.grades).toEqual([{ "course": "DemoClass", "grade": 80 }]);
        expect(blakeTranscript?.student.studentName).toEqual('blake');
    })


    it('Should successfully add the second blake to the database when adding demo data', () => {
        const blakeID = db.getStudentIDs('blake');
        expect(blakeID).not.toBeNull;
        expect(blakeID.length).toEqual(2);
        const blakeTranscript = db.getTranscript(blakeID[1]);
        expect(blakeTranscript?.grades).toEqual([{ "course": "DemoClass", "grade": 85 }, { "course": "DemoClass", "grade": 40 }]);
        expect(blakeTranscript?.student.studentName).toEqual('blake');
    })

    it('Should successfully add casey to the database when adding demo data', () => {
        const caseyID = db.getStudentIDs('casey');
        expect(caseyID).not.toBeNull;
        expect(caseyID.length).toEqual(1);
        const caseyTranscript = db.getTranscript(caseyID[0]);
        expect(caseyTranscript?.grades).toEqual([{ "course": "DemoClass", "grade": 100 }]);
        expect(caseyTranscript?.student.studentName).toEqual('casey');
    })
})
