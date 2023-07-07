// importing from direct file because of issues of babel loader and spyOn
import {MockedProvider} from "@apollo/client/testing"
import {act} from "@testing-library/react"
import {create} from "react-test-renderer"
import wait from "waait"
import {deleteEntityHookMock} from "../../../../../../graphql/__mocks__"
import {Route} from "../../../../../../routes"
import {DimensionsTable} from "../dimensions-table"

const dimensionTable = (
  <MockedProvider>
    <DimensionsTable
      onEntityClick={jest.fn()}
      isReadOnly={false}
      entities={[]}
      labelKey="coding_models__detail_main_dimension_label_singular"
      maximumScore={100}
      onAddClick={jest.fn()}
      onSortClick={jest.fn()}
      deleteEntityConfig={{
        deleteEntityHook: deleteEntityHookMock,
        navigateTo: {route: Route.ScenarioCodingModelDetail}
      }}
    />
  </MockedProvider>
)

describe("dimension-table", () => {
  it("renders correctly", async () => {
    const component = create(dimensionTable)
    await act(() => wait(0))
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
