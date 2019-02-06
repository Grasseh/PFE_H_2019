/* global describe, it */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const HTMLGenerator = require('../../../src/output/generator');

class TestStub {
    constructor(name, expectedResult, parameters) {
        this.testName = name;
        this.expectedResult = expectedResult;
        this.parameters = parameters;
    }

    getTestName() {
        return this.testName;
    }

    getExpectedResult() {
        return this.expectedResult;
    }

    getParameters() {
        return this.parameters;
    }
}

class TestResultStub {
    constructor(success, actualResult, test) {
        this.success = success;
        this.actualResult = actualResult;
        this.test = test;
    }

    isSuccess() {
        return this.success;
    }

    getActualResult() {
        return this.actualResult;
    }

    getTest() {
        return this.test;
    }
}

class TestSuiteResultStub {
    constructor(testFileName, testResults) {
        this.testFileName = testFileName;
        this.testResults = testResults;
    }

    getTestFileName() {
        return this.testFileName;
    }

    getTestResults() {
        return this.testResults;
    }
}

describe('Output Integration', function() {
    describe('HTMLGenerator', function() {
        it('Should convert MD to HTML.', function() {
            let testFile = path.join(__dirname, '..', 'artifacts', 'output', 'OutputIntegrationTest.md');
            let cssFile = path.join(__dirname, '..', 'artifacts', 'output', 'basic.css');

            let failingTest = new TestStub('failingTest', 'failing', new Map());
            let failingTestResult = new TestResultStub(false, 'actualValue', failingTest);

            let passingTest = new TestStub('passingTest', 'passing', new Map());
            let passingTestResult = new TestResultStub(true, 'passing', passingTest);

            let testResults = [passingTestResult, failingTestResult];
            let testSuiteResult = new TestSuiteResultStub(testFile, testResults);

            let htmlGenerator = new HTMLGenerator();
            let resultingHtml = htmlGenerator.generate(testSuiteResult, cssFile);

            let expectedPath = path.join(__dirname, '..', 'artifacts', 'output', 'OutputIntegrationTest.html');
            let expectedHtml = fs.readFileSync(expectedPath, 'UTF-8');

            assert.strictEqual(expectedHtml.slice(0, -1), resultingHtml);
        });
    });
});
