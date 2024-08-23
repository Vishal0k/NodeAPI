import * as chai from 'chai';
import { add, multiply } from './calculator.js';

const expect = chai.expect;
const assert = chai.assert;

describe('Testing Calculator', () => {
    
    let x, y;
    before(() => {
        console.log("Before any test method ")
    });

    after(() => {
        console.log("After all the test methods ran")
    });

    // Arrange
    beforeEach(() => {
        x = 5;
        y = 5;
        console.log("Initializing ..... ")
    });

    // After each test
    afterEach(() => {
        x = 0;
        y = 0;
    });

    // Test for addition
    it('should add two numbers correctly', () => {
        // Act
        const actual = add(x, y);
        // Assert
        // expect(5).to.equal(x + y);
        expect(actual).to.equal(x + y);
    });

    // Test for multiplication
    it('should multiply two numbers correctly', () => {
        // Act
        const actual = multiply(x, y);
        // Assert
        assert.equal(25, actual);
        expect(actual).to.equal(x * y);
    });

});
