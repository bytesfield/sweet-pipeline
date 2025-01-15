module.exports = {
    preset: 'ts-jest',   // Tells Jest to use ts-jest for TypeScript files
    testEnvironment: 'node',  // Set the test environment to Node
    transform: {
        '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest to transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],  // Handle TypeScript and JavaScript files
    globals: {
        'ts-jest': {
            isolatedModules: true,  // Improves performance for simple projects
        },
    },
};
