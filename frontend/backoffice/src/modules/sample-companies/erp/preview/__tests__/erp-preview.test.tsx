import {MockedProvider} from "@apollo/client/testing"
import React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {sampleCompaniesMock} from "shared/graphql/__mocks__"
import {Option} from "shared/utils"
import * as useErpContainerHook from "../../hooks/use-erp-container"
import {UseErpContainerHook} from "../../hooks/use-erp-container"
import {ErpPreview, ErpPreviewProps} from "../erp-preview"

const sampleCompanyMock = sampleCompaniesMock[0]

const useErpContainerResultMock: UseErpContainerHook = {
  isLoading: false,
  scenarioMaxDurationInSeconds: 600,
  isPreviewVisible: false,
  sampleCompany: Option.of(sampleCompanyMock),
  navigateBack: jest.fn(),
  setIsPreviewVisible: jest.fn(),
  isReadonly: false,
  scenario: Option.none(),
  interventions: interventionsMock,
  disableInterventionCreation: false
}

const stateSpy = jest.spyOn(useErpContainerHook, "useErpContainer")

const defaultProps: ErpPreviewProps = {
  sampleCompanyId: sampleCompanyMock.id,
  sampleCompanyName: sampleCompanyMock.name,
  onClose: jest.fn()
}

const getComponent = (props?: Partial<ErpPreviewProps>) => (
  <MockedProvider>
    <ErpPreview {...{...defaultProps, ...props}} />
  </MockedProvider>
)

describe("ErpPreview", () => {
  it("render correctly (default props)", () => {
    stateSpy.mockReturnValue(useErpContainerResultMock)
    const component = getComponent()
    const tree = create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
