import * as db from "./transcriptManager";
describe('Within database', () => {
    beforeEach(() => {
        // Before any test runs, clean up the datastore. This should ensure that tests are hermetic.
        db.initialize();
    })
    describe("Adding grade", () => {
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
})

