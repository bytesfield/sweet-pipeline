# Changelog

All notable changes to `sweet-pipeline` will be documented in this file.  
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) principles and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [v2.0.2] - 2025-01-15

### Added
- Minimum Node.js version updated to **16.x**.
- Development dependencies updated:
    - **TypeScript** to **v5.7.3**.
    - **ts-node** to **v10.9.2**.
    - **Jest** and **ts-jest** updated to the latest versions.

### Changed
- Package now requires **Node.js 16.x** or higher.
- Various development dependencies updated for compatibility with the latest versions.

- ### Fixed
- Improve the `then()` not to accept the next function, this is handled properly in the `Pipeline` class.


## [v2.0.1] - 2025-01-15

### Added
- Refactored the pipeline to fully support TypeScript, improving type safety and code clarity.
- Improved code structure for better readability and clearer function responsibilities.
- Introduced error handling with `Error` objects for more expressive error messages.

### Changed
- Reorganized code to ensure better modularity, reducing complexity and improving maintainability.
- Simplified and removed redundant logic, eliminating repetitive code patterns.
- Updated the method to handle promises in a more consistent way across different pipes.
- Improved handling of `break` conditions, ensuring that pipeline execution can be controlled more easily.

### Fixed
- Enhanced error handling, ensuring that the pipeline provides more meaningful error messages when something goes wrong.
- Corrected handling of invalid pipe types (ensuring that only valid pipe functions or objects with `handle` methods are processed).

---

## [v1.0.1] - 2021-06-09

### Changed
- Updated the README documentation for clarity and added additional usage examples.
- Improved examples to better reflect the capabilities of the pipeline class, especially in asynchronous use cases.

---

## [v1.0.0] - 2021-06-08

- Initial release of the `sweet-pipeline` package.
