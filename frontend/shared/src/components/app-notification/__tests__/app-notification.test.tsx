import {shallow} from "enzyme"
import * as React from "react"
import {create} from "react-test-renderer"
import {ToastContainer} from "react-toastify"
import {NotificationSeverity} from "../../../enums"
import {AppNotification as AppNotificationModel} from "../../../models"
import {Option} from "../../../utils"
import {AppNotification, AppNotificationProps} from "../.."

const getSampleNotification = (notification?: Partial<AppNotificationModel>): Option<AppNotificationModel> =>
  Option.of<AppNotificationModel>({
    titleKey: "error_general",
    messageKey: "notification__message_graphql_error",
    severity: NotificationSeverity.Info,
    ...notification
  })

const defaultProps: AppNotificationProps = {
  notification: getSampleNotification()
}

const getComponent = (props?: Partial<React.PropsWithChildren<AppNotificationProps>>) => (
  <AppNotification {...{...defaultProps, ...props}} />
)

describe("app-notification", () => {
  it("renders correctly", () => {
    const component = getComponent()
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders correctly as warning", () => {
    const component = getComponent({notification: getSampleNotification({severity: NotificationSeverity.Warning})})
    const tree = create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("has correct structure", () => {
    const component = shallow(getComponent())
    expect(component.find(ToastContainer)).toHaveLength(1)
  })

  it("has correct structure without title and as error", () => {
    const component = shallow(
      getComponent({
        notification: getSampleNotification({severity: NotificationSeverity.Error, titleKey: "error_general"})
      })
    )
    expect(component.find(ToastContainer)).toHaveLength(1)
  })
})
