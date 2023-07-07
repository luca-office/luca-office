import * as React from "react"
import {FormErrorText} from "shared/components"
import {AuthenticationType} from "shared/graphql/generated/globalTypes"
import {SignUpModal} from ".."
import {Route} from "../../../routes"
import {AuthInfoWrapper} from "../auth-info-wrapper/auth-info-wrapper"
import {StartProject} from "../start-project/start-project"
import {AnonymousLogin} from "./anonymous-login/anonymous-login"
import {useLogin} from "./hooks/use-login"
import {LoginAuthToggle} from "./login-auth-toggle/login-auth-toggle"
import {ProjectMetadata} from "./project-metadata/project-metadata"
import {UserInformationLogin} from "./user-information-login/user-information-login"

export interface LoginProps {
  readonly originRoute: Route.Login | Route.StartProject
}

export const Login: React.FC<LoginProps> = ({originRoute}) => {
  const {
    t,
    surveyInvitationData,
    login,
    anonymousLogin,
    surveyInvitationLoading,
    showSignUpModal,
    toggleShowSignUpModal,
    loginLoading,
    navigateToResumption,
    isOpenParticipationSurvey
  } = useLogin()

  const getContentBasedOnOriginRoute = (route: Route.Login | Route.StartProject) => {
    switch (route) {
      case Route.StartProject:
        return <StartProject surveyInvitationData={surveyInvitationData} />
      case Route.Login:
      default:
        return (
          <>
            {surveyInvitationData
              .map(invitationData => (
                <>
                  <ProjectMetadata
                    t={t}
                    metadata={{
                      endsAt: invitationData.survey.endsAt,
                      startsAt: invitationData.survey.endsAt,
                      maxDurationInSeconds: invitationData.survey.project.maxDurationInSeconds,
                      projectName: invitationData.survey.project.name
                    }}
                  />
                  <LoginAuthToggle
                    isOpenParticipationSurvey={isOpenParticipationSurvey}
                    navigateToResumption={navigateToResumption}
                    authType={invitationData.survey.authenticationType}>
                    {requestedAuthType => (
                      <>
                        {requestedAuthType === AuthenticationType.OnlyRegistered && (
                          <UserInformationLogin
                            onSignUpClicked={toggleShowSignUpModal}
                            login={login}
                            loginLoading={loginLoading}
                          />
                        )}
                        {requestedAuthType === AuthenticationType.RegisteredOrAnonymous && (
                          <AnonymousLogin login={anonymousLogin} />
                        )}
                      </>
                    )}
                  </LoginAuthToggle>
                </>
              ))
              .getOrElse(
                !surveyInvitationLoading && !surveyInvitationData ? (
                  <FormErrorText>{t("auth__entry_code_invalid")}</FormErrorText>
                ) : (
                  <></>
                )
              )}
          </>
        )
    }
  }

  return (
    <>
      <AuthInfoWrapper rightColumn={getContentBasedOnOriginRoute(originRoute)} />
      {showSignUpModal && <SignUpModal onDismiss={toggleShowSignUpModal} />}
    </>
  )
}
