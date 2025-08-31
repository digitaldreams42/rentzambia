# Contributing to RentZambia

Thank you for your interest in contributing to RentZambia! We welcome contributions from the community and are excited to work with you.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue
- **Describe the exact steps** which reproduce the problem
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** after following the steps
- **Explain which behavior you expected** to see instead and why
- **Include screenshots** if possible
- **Note your environment** (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **explain which behavior you expected** to see instead
- **Explain why this enhancement** would be useful to most RentZambia users

### Pull Requests

The process described here has several goals:

- Maintain RentZambia's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible RentZambia
- Enable a sustainable system for RentZambia's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. **Follow the style guides** described below
2. **After you submit your pull request**, verify that all status checks are passing
3. **Follow the template** for pull requests

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :non-potable_water: `:non-potable_water:` when plugging memory leaks
  - :memo: `:memo:` when writing docs
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies

### TypeScript Style Guide

All TypeScript code must adhere to the following:

- Use TypeScript strict mode
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Use interfaces for object shapes
- Use enums for constants

### React Style Guide

All React components must adhere to the following:

- Use functional components with hooks
- Use TypeScript interfaces for props
- Destructure props in function parameters
- Use useCallback and useMemo where appropriate
- Keep components small and focused
- Use meaningful component names
- Add prop types or TypeScript interfaces

### CSS/Tailwind Style Guide

All styling must adhere to the following:

- Use Tailwind CSS utility classes
- Follow the existing color palette
- Use consistent spacing (padding/margin)
- Use responsive design principles
- Keep custom CSS to a minimum

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/rentzambia.git`
3. Create a branch: `git checkout -b my-branch-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Run tests: `npm test`
7. Push to your fork: `git push origin my-branch-name`
8. Create a pull request

## Testing

- Write unit tests for new functionality
- Ensure all tests pass before submitting a pull request
- Write integration tests for API endpoints
- Test across different browsers and devices

## Documentation

- Update documentation when making changes
- Add comments to complex code sections
- Update README files when necessary
- Add examples for new features

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Issues that are bugs
- `enhancement` - Issues that are feature requests
- `documentation` - Issues or pull requests related to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## Community

Discussions about RentZambia take place on this repository's [Issues](https://github.com/yourusername/rentzambia/issues) and [Pull Requests](https://github.com/yourusername/rentzambia/pulls) sections. Anybody is welcome to join these conversations.

Wherever possible, we use GitHub for discussions. If you have questions or need help, please search the existing issues before creating a new one.

## Thank You!

Your contributions to open source, large or small, make great projects like RentZambia possible. Thank you for taking the time to contribute.
