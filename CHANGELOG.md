# Change Log
All notable changes to this project will be documented in this file.

## [3.1.1] - 09-14-2023
### Fixed
- "more" feature issue
## [3.0.8] - 11-24-2022
### Added
- highcharts LTS (10.3.1)

### Changed
- Support for Nuxt3 stable release.

## [2.0.4] - 05-04-2022
### Added
- USMap example with optional dependency proj4

### Updated
- highcharts to v10 (10.0.0 specifically, 10.1.0 introduced breaking changes in the chart.update function).
- @highcharts/map-collection to v2 

## [2.0.1] - 10-24-2021
### Changed
- Package type to "module"
- Refactored and linted code and old deps
- Updated docs and demo
- Updated deps

## [1.0.8] - 08-06-2021
### Added
- "more" prop to enable highcharts-more

## [1.0.7] - 02-11-2021
### Fixed
- The way mocks are handled in components factory. 

## [1.0.6] - 12-21-2020
### Added
- "modules" prop feature that is consumed by the highchart component (see docs)

## [1.0.5] - 12-04-2020
### Added
- module option to consume setOptions. This can also be a prop.
- examples in nuxt.config to show how to get highcharts intellisense working (very helpful!)

## [1.0.4] - 12-04-2020
### Added
- proper handling of the mapChart prop for highmap (so that different maps can be used)

## [1.0.3] - 09-05-2020
### Added
- sunburst component

## [1.0.2] - 08-13-2020
### Changed
- Removed postinstall script

## [1.0.1] - 05-25-2020
### Added
- Keywords to package.json

## [1.0.0] - 05-25-2020
### Added
- Tests for 100% coverage
- Improved docs

## [0.0.2] - 05-22-2020
### Added
- Docs and issue templates.

## [0.0.1] - 05-22-2020

### Added
- Birth of nuxt-highcharts, based off highcharts-vue, built for Nuxt. Hello world!
- Working demos. NOTE: while the demo works and tests exist, there is still more work to do on the tests, and they need to be plugged in to the CI/CD system. 