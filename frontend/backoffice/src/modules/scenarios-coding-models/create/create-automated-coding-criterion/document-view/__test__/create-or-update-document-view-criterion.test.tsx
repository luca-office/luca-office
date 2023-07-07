import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {Overlay} from "shared/components"
import {automatedDocumentViewCodingCriterionMock} from "shared/graphql/__mocks__"
import {OfficeTool} from "shared/graphql/generated/globalTypes"
import {Option} from "shared/utils"
import {ScenarioEmailsPreview} from "../../../../../scenario-emails/preview/scenario-emails-preview"
import {AutomatedCriterionChooseDocumentModal} from "../../../../common/edit-coding-criterion-modal/coding-criteria-card/automated-criteria-content/choose-document-modal/choose-automated-criterion-document-modal"
import {CreateOrUpdateDocumentViewCriterion} from "../create-or-update-document-view-criterion"
import {DocumentViewPreviewTools} from "../create-or-update-document-view-criterion-container"

const scenarioId = "0908bf34-d9b8-4d56-ad1b-c1127c6c25fa"

describe("create-or-update-document-view-criterion", () => {
  it("renders correctly - visible choose document modal", async () => {
    const component = create(
      <CreateOrUpdateDocumentViewCriterion
        criterion={Option.of(automatedDocumentViewCodingCriterionMock)}
        handleDocumentConfirmClick={jest.fn()}
        onEntityIdSelected={jest.fn()}
        isChooseDocumentModalVisible={true}
        sampleCompanyName="Test"
        sampleCompanyId="07f238f8-42d2-409c-a38f-8b54fd238f03"
        scenarioId={scenarioId}
        setVisibleTool={jest.fn()}
        visibleTool={Option.none()}
        onDismiss={jest.fn()}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure for email client", async () => {
    const component = shallow(
      <CreateOrUpdateDocumentViewCriterion
        criterion={Option.of(automatedDocumentViewCodingCriterionMock)}
        handleDocumentConfirmClick={jest.fn()}
        onEntityIdSelected={jest.fn()}
        isChooseDocumentModalVisible={false}
        sampleCompanyName="Test"
        sampleCompanyId="07f238f8-42d2-409c-a38f-8b54fd238f03"
        scenarioId={scenarioId}
        setVisibleTool={jest.fn()}
        visibleTool={Option.of<DocumentViewPreviewTools>(OfficeTool.EmailClient)}
        onDismiss={jest.fn()}
      />
    )

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ScenarioEmailsPreview)).toHaveLength(1)
    expect(component.find(AutomatedCriterionChooseDocumentModal)).toHaveLength(0)
  })

  it("has correct structure for email client with modal", async () => {
    const component = shallow(
      <CreateOrUpdateDocumentViewCriterion
        criterion={Option.of(automatedDocumentViewCodingCriterionMock)}
        handleDocumentConfirmClick={jest.fn()}
        onEntityIdSelected={jest.fn()}
        isChooseDocumentModalVisible={true}
        sampleCompanyName="Test"
        sampleCompanyId="07f238f8-42d2-409c-a38f-8b54fd238f03"
        scenarioId={scenarioId}
        setVisibleTool={jest.fn()}
        visibleTool={Option.of<DocumentViewPreviewTools>(OfficeTool.EmailClient)}
        onDismiss={jest.fn()}
      />
    )

    expect(component.find(Overlay)).toHaveLength(1)
    expect(component.find(ScenarioEmailsPreview)).toHaveLength(1)
    expect(component.find(AutomatedCriterionChooseDocumentModal)).toHaveLength(1)
  })
})
