# Luca

## Technical Requirements

Min. Screen size : 1280 x 800 pixel

## Testing

Use `yarn test` to run unit tests and `yarn test -u` to run unit tests and update snapshots.

### Programming guidelines for tests

**Each component and utility should be tested!**

Storybook is NO replacement for Unit testing.

Please use jest and enzyme together when testing. 

#### Component structure
Separate redux and state from rendering as this improves structure and makes testing a lot easier!
This means creating a wrapper component (component-container-name.ts) and a render component (component-name.tsx)
and is usually mostly needed in `modules/`.

#### Testing wrapper components
* Create a basic loading and an error case test for graphql wrappers, see `app-container.test.tsx`
* Test rendering in the render component by passing mocks as props

#### Testing render components
* use a snapshot test to validate overall layout ("renders correctly")
* use at least one crash test with invalid props or params ("does not crash")
* use one structural test (if applicable) where you `shallow` 
components and check for presence of important elements ("renders correct structure")
* use functional test to test for correct results (e.g. for calculation helpers) or click- 
and other handlers

#### Mocking
* Mocks are located in `graphql/mocks/`
* mocks should be named `query-name.mock.ts`
