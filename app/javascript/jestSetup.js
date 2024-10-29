import "@testing-library/jest-dom";

require('jest-fetch-mock').enableMocks();

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});