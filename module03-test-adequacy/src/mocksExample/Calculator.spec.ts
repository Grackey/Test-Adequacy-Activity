import Calculator from "./Calculator";

describe("add()", () => {
    let calculator: Calculator;  // a printing calculator
    let spy1: jest.MockedFunction<any>  // the type of spy1.

    beforeAll(() => {
        calculator = new Calculator();
    });

    beforeEach(() => {
        // just one spy for the whole describe block.
        spy1 = jest.spyOn(console, "log").mockImplementation();
    });

    // mockRestore restores the original implementaton;
    // mockReset does not. 
    afterEach(() => { 
        spy1.mockReset(); 
    });

    // clean up
    afterAll(() => {
        spy1.mockRestore();
    });

    it("should invoke console.log() with the result 2 for inputs 1 and 1", () => {
        
        // console.log is called somewhere in the add method.
        const result: number = calculator.add(1, 1);
        expect(result).toBe(2);
        expect(spy1).toHaveBeenCalledWith("The result is: ", result)
        expect(spy1).toHaveBeenCalledTimes(1);
    });

    it("should invoke console.log() with the result 4 for inputs 2 and 2", () => {
        const result: number = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(spy1).toHaveBeenCalledWith("The result is: ", result);
        expect(spy1).toHaveBeenCalledTimes(1)
    });
})

console.log('Goodbye from Calculator.spec.ts');

