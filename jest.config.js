module.exports = {
  preset: "ts-jest",

  transformIgnorePatterns: ["/node_modules/(?!axios)"],
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
    "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
  },
  testEnvironment: "jest-fixed-jsdom",
};
