export default class Calculator {
    public add(num1: number, num2: number): number {
      const result: number = num1 + num2;
      console.log("The result is: ", result);
      return result;
    }
  }