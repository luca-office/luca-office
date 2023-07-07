import {MockedProvider} from "@apollo/client/testing"
import {mount} from "enzyme"
import React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Content, Overlay} from "shared/components"
import {sampleCompaniesMock, scenariosMock} from "shared/graphql/__mocks__"
import {ErpView} from "shared/office-tools"
import {Option} from "shared/utils"
import {ErpContainer} from "../erp-container"
import * as useErpContainer from "../hooks/use-erp-container"
import {ErpPreview} from "../preview/erp-preview"

const useErpContainerResultMock: useErpContainer.UseErpContainerHook = {
  isLoading: false,
  scenarioMaxDurationInSeconds: 600,
  isPreviewVisible: false,
  sampleCompany: Option.of(sampleCompaniesMock[0]),
  navigateBack: jest.fn(),
  setIsPreviewVisible: jest.fn(),
  isReadonly: false,
  scenario: Option.of(scenariosMock[0]),
  interventions: interventionsMock,
  disableInterventionCreation: false
}

const useErpContainerSpy = jest.spyOn(useErpContainer, "useErpContainer")

describe("ErpContainer", () => {
  it("renders correctly (default props)", () => {
    useErpContainerSpy.mockReturnValue(useErpContainerResultMock)
    const component = (
      <MockedProvider>
        <ErpContainer
          selectedErpNode={Option.none()}
          selectedEntityId={Option.none()}
          sampleCompanyId={sampleCompaniesMock[0].id}
        />
      </MockedProvider>
    )
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders correctly (with preview)", () => {
    useErpContainerSpy.mockReturnValue({...useErpContainerResultMock, isPreviewVisible: true})
    const component = (
      <MockedProvider>
        <ErpContainer
          selectedErpNode={Option.none()}
          selectedEntityId={Option.none()}
          sampleCompanyId={sampleCompaniesMock[0].id}
        />
      </MockedProvider>
    )
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("has correct structure (default props)", async () => {
    useErpContainerSpy.mockReturnValue(useErpContainerResultMock)
    const component = mount(
      <MockedProvider>
        <ErpContainer
          selectedErpNode={Option.none()}
          selectedEntityId={Option.none()}
          sampleCompanyId={sampleCompaniesMock[0].id}
        />
      </MockedProvider>
    )

    const content = component.find(Content).first()
    expect(content).toBeDefined()

    expect(component.find(Content).first().find(ErpView)).toHaveLength(1)
    expect(component.find(Content).first().find(Overlay)).toHaveLength(0)
  })

  it("has correct structure (with preview)", () => {
    useErpContainerSpy.mockReturnValue({...useErpContainerResultMock, isPreviewVisible: true})
    const component = mount(
      <MockedProvider>
        <ErpContainer
          selectedErpNode={Option.none()}
          selectedEntityId={Option.none()}
          sampleCompanyId={sampleCompaniesMock[0].id}
        />
      </MockedProvider>
    )

    const content = component.find(Content).first()
    expect(content).toBeDefined()

    expect(content.find(ErpView)).toHaveLength(2)
    expect(content.find(ErpPreview)).toHaveLength(1)
  })
})
