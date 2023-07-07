import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {interventionsMock} from "shared/__mocks__"
import {Button, Column, Columns, Paper, ReadonlyActionField, Text} from "shared/components"
import {scenarioQuestionnairesMock} from "shared/graphql/__mocks__"
import {Route} from "../../../../../../../../routes"
import {
  EmailBodyFooterInterventionPosition,
  EmailBodyFooterInterventionPositionProps
} from "../email-body-footer-intervention-position"

const defaultProps: EmailBodyFooterInterventionPositionProps = {
  intervention: interventionsMock[0],
  navigationConfig: {
    route: Route.ScenarioFiles
  },
  scenarioQuestionnaires: scenarioQuestionnairesMock
}

describe("email-body-footer-intervention-position", () => {
  it("renders correctly", async () => {
    const component = create(<EmailBodyFooterInterventionPosition {...defaultProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("has correct structure", async () => {
    const tree = shallow(<EmailBodyFooterInterventionPosition {...defaultProps} />)

    expect(tree.find(Paper)).toHaveLength(1)
    expect(tree.find(Text)).toHaveLength(1)
    expect(tree.find(Columns)).toHaveLength(1)
    expect(tree.find(Column)).toHaveLength(2)
    expect(tree.find(ReadonlyActionField)).toHaveLength(1)
    expect(tree.find(Button)).toHaveLength(1)
  })
})
