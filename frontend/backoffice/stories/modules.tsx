/* eslint-disable import/max-dependencies */
/* eslint-disable max-lines */
import {MockedProvider} from "@apollo/client/testing"
import {Global} from "@emotion/react"
import {action} from "@storybook/addon-actions"
import {boolean, object, text} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import pick from "lodash-es/pick"
import React from "react"
import {Provider} from "react-redux"
import {
  Content,
  CreateMainDimensionModal,
  CriterionRatingTable,
  getQuestionTypeIconName,
  QuestionsAutomaticRatingTable,
  QuestionsManualRatingTable,
  RatingCodingTableOfContents,
  RatingDetailActionElement,
  RatingDetailFooter,
  RatingDetailHeader,
  RatingDetailQuestionnaire,
  RatingDetailView,
  RatingHeader,
  RatingOverviewTable,
  RatingPlaceholder,
  RatingQuestionnaireDetailView,
  RatingQuestionnaireTableOfContents,
  RatingScenarioDetailView,
  ScenarioAutomaticRatingTable,
  ScenarioManualRatingTable
} from "shared/components"
import {TableEntity} from "shared/components/rating/models"
import {scenarioAutomaticRatingTableResponsesMock} from "shared/components/rating/scenario/detail/__mocks__/scenario-automatic-rating-table-responses.mock"
import {scenarioManualRatingTableResponsesMock} from "shared/components/rating/scenario/detail/__mocks__/scenario-manual-rating-table-responses.mock"
import {ratingScenarioDetailViewResponsesMock} from "shared/components/rating/scenario/rating-scenario-detail-view/__mocks__/rating-scenario-detail-view-responses.mock"
import {getMaxScore} from "shared/components/rating/utils"
import {ScenarioCodingModelTableOfContents} from "shared/components/scenario-coding-model-table-of-contents/scenario-coding-model-table-of-contents"
import {
  automatedCodingCriteriaMock,
  checkLoginMock,
  codingCriteriaMock,
  codingDimensionNodesMock,
  codingDimensionsMock,
  codingModelsMock,
  fileMock,
  filesMock,
  freeTextQuestionMock,
  freetextQuestionRatingsMock,
  manualCodingItemMock,
  multipleChoiceQuestionMock,
  projectModulesMock,
  projectModulesMockWithQuestionnaire,
  projectsMock,
  questionnaireMock,
  questionnairesMock,
  ratingsMock,
  scenarioAutomatedCodingItemRatingsMock,
  scenarioCodingItemRatingMock,
  scenarioManualCodingItemRatingsMock,
  scenariosMock,
  surveyIdMock,
  surveyInvitationIdMock,
  surveyInvitationsMock,
  surveyInvitationsProgressMock,
  surveysMock,
  checkLoginMayAdministrateUserAccountsMock,
  userAccountMock,
  userAccountsMock
} from "shared/graphql/__mocks__"
import {
  questionnaireQuestionMockWithAnswers,
  questionnaireQuestionsMock
} from "shared/graphql/__mocks__/questionnaire-questions.mock"
import {EmailDirectory, QuestionScoringType, QuestionType, ScoringType} from "shared/graphql/generated/globalTypes"
import {fakeStore} from "sharedTests/redux/fake-store"
import {fakeTranslate} from "sharedTests/utils/translate-mock"
import {interventionsMock, referenceBookChapterMock} from "../../shared/src/__mocks__"
import {IconName, RaterMode, RatingStatus, UploadFileType as FileType} from "../../shared/src/enums"
import {
  createCodingCriterionMutation,
  createEmailMutation,
  createFreetextQuestionRatingCriterionSelectionMutation,
  createQuestionnaireQuestionMutation,
  createReferenceBookChapterMutation,
  deleteCodingCriterionMutation,
  deleteFreetextQuestionRatingCriterionSelectionMutation,
  inviteSurveyRatersMutation,
  updateCodingCriterionMutation,
  updateFileMutation,
  updateFreetextQuestionRatingMutation,
  updateManualCodingItemMutation,
  updateScenarioMutation,
  updateUserAccountMutation
} from "../../shared/src/graphql/mutations"
import {
  checkLoginQuery,
  codingCriteriaQuery,
  codingItemQuery,
  emailQuery,
  emailsQuery,
  fileQuery,
  freeTextAnswerForParticipantQuery,
  freetextQuestionRatingForParticipantQuery,
  projectModulesQuery,
  projectQuery,
  questionnaireQuery,
  ratingsQuery,
  referenceBookChaptersQuery,
  scenarioCodingItemRatingsForParticipantQuery,
  scenarioQuery,
  selectedAnswersForParticipantQuery,
  surveyInvitationsProgressQuery,
  surveyInvitationsQuery,
  surveysForUserAccountQuery,
  surveyUserAccountsQuery
} from "../../shared/src/graphql/queries"
import {Directory, Email as EmailType, ReferenceBookChapter, Scenario, SpreadsheetFile} from "../../shared/src/models"
import {Flex, globalStyle} from "../../shared/src/styles"
import {Option, removeTypename, sortByPosition, Subject} from "../../shared/src/utils"
import {EmailContent, UploadFileModal} from "../src/components"
import {
  deleteEntityHookMock,
  directoriesForScenarioMock,
  freetextQuestionCodingCriteriaMock
} from "../src/graphql/__mocks__"
import {
  ContentTypeDialog,
  EditUser,
  EmailCreateModal,
  FileDetail,
  ManageInvitationsModal,
  MoveOverlay,
  RaterRatingOverview,
  ReferenceBookArticleDetail,
  ReferenceBookChapters,
  ReferenceBookChaptersSelection,
  SampleCompanyDetailView,
  ScenarioEmails
} from "../src/modules"
import {Login} from "../src/modules/auth/login/login"
import {Signup} from "../src/modules/auth/signup/signup"
import {MoveFileTree} from "../src/modules/common/files-and-directories/move/move-file-tree/move-file-tree"
import {ModuleSelectionContainer} from "../src/modules/common/module-selection/module-selection-container"
import {CreateProjectModuleModal} from "../src/modules/projects/common/create-project-module-modal/create-project-module-modal"
import {CreateQuestionnaireQuestionModal} from "../src/modules/questionnaires/common"
import {RaterRatingOverviewPlaceholder, RatersRatingCard} from "../src/modules/rater-rating/common"
import {RatersRatingCardContent} from "../src/modules/rater-rating/common/rating-card/rating-card-content/raters-rating-card-content"
import {RatersRatingCardFooter} from "../src/modules/rater-rating/common/rating-card/rating-card-footer/raters-rating-card-footer"
import {RatersRatingCardHeader} from "../src/modules/rater-rating/common/rating-card/rating-card-header/raters-rating-card-header"
import {RaterInvitationOverlay} from "../src/modules/rating"
import {Email, EmailDirectories, Emails} from "../src/modules/scenario-emails/emails"
import {emailsMock} from "../src/modules/scenario-emails/emails/hooks/__mocks__/emails.mock"
import {EditCodingCriterionModal} from "../src/modules/scenarios-coding-models/common/edit-coding-criterion-modal/edit-coding-criterion-modal"
import {UpdateCodingItemType} from "../src/modules/scenarios-coding-models/common/update-coding-item-modal/hooks/use-update-coding-item-modal"
import {UpdateCodingItemModal} from "../src/modules/scenarios-coding-models/common/update-coding-item-modal/update-coding-item-modal"
import {CreateSubDimensionModal} from "../src/modules/scenarios-coding-models/create"
import {CreateItemModal} from "../src/modules/scenarios-coding-models/create/create-item/create-item-modal"
import {ManualCodingItemDetailView} from "../src/modules/scenarios-coding-models/detail/coding-item/manual-coding-item-detail-view"
import {MainDimensionDetailView} from "../src/modules/scenarios-coding-models/detail/coding-main-dimension/main-dimension-detail-view"
import {SubDimensionDetailView} from "../src/modules/scenarios-coding-models/detail/coding-sub-dimension/sub-dimension-detail-view"
import {CodingModelCommonDetailView} from "../src/modules/scenarios-coding-models/detail/common/detail-view/coding-model-common-detail-view"
import {
  DimensionsTable,
  DimensionTableEntity
} from "../src/modules/scenarios-coding-models/detail/common/dimensions-table/dimensions-table"
import {CodingModelDetailOverview} from "../src/modules/scenarios-coding-models/detail/overview/coding-model-detail-overview"
import {InviteSurveyAttendeesModalContainer} from "../src/modules/surveys/detail/invite-attendees/invite-survey-attendees-modal-container"
import {UserManagementDetail} from "../src/modules/user-management/detail/user-management-detail"
import {UserTable} from "../src/modules/user-management/detail/user-table/user-table"
import {EditUserClaimsModalContainer} from "../src/modules/user-management/edit/edit-user-claims-modal-container"
import {initialAppState} from "../src/redux/state/app-state"
import {Route} from "../src/routes"

const referenceBook: ReferenceBookChapter = {
  ...referenceBookChapterMock()
}
storiesOf("Auth", module)
  .add("Login", () => <Login navigate={action("Navigate")} login={action("Login")} loginLoading={false} />)
  .add("Login Loading", () => <Login navigate={action("Navigate")} login={action("Login")} loginLoading={true} />)
  .add("Signup", () => (
    <Signup navigateToLogin={action("Navigate to login")} registerLoading={false} onSubmit={action("submit")} />
  ))
  .add("Signup Loading", () => (
    <Signup navigateToLogin={action("Navigate to login")} registerLoading={true} onSubmit={action("submit")} />
  ))
  .add("Edit User", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: updateUserAccountMutation,
              variables: {
                id: checkLoginMock.id,
                update: {
                  firstName: checkLoginMock.firstName,
                  lastName: checkLoginMock.lastName,
                  organization: checkLoginMock.organization
                }
              }
            },
            result: {
              data: {
                updateUserAccount: checkLoginMock
              }
            }
          }
        ]}>
        <EditUser />
      </MockedProvider>
    </Provider>
  ))

storiesOf("Sample-Companies", module).add("Create", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <SampleCompanyDetailView sampleCompanyId={""} />
    </MockedProvider>
  </Provider>
))

storiesOf("ScenarioEmails", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        removeTypename: true,
        mocks: [
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenariosMock[0].id}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: emailsQuery,
              variables: {scenarioId: scenariosMock[0].id}
            },
            result: {
              data: {
                emails: emailsMock
              }
            }
          },
          {
            request: {
              query: emailQuery,
              variables: {id: emailsMock[0].id}
            },
            result: {
              data: {
                email: emailsMock[0]
              }
            }
          },
          {
            request: {
              query: emailQuery,
              variables: {id: emailsMock[1].id}
            },
            result: {
              data: {
                email: emailsMock[1]
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <ScenarioEmails scenarioId={scenariosMock[0].id} />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("Manage Invitations", module)
  .add("DefaultModal", () => (
    <ManageInvitationsModal
      onDismiss={action("onDismiss")}
      existingInvitations={["cap3@cap3.de"]}
      handleInvitations={action("handleInvitations")}
      invitationProcessLoading={false}
      labelKey={"projects__survey_details_invite_title"}
    />
  ))
  .add("DefaultModal loading", () => (
    <ManageInvitationsModal
      onDismiss={action("onDismiss")}
      existingInvitations={["cap3@cap3.de"]}
      handleInvitations={action("handleInvitations")}
      invitationProcessLoading={true}
      labelKey={"projects__survey_details_invite_title"}
    />
  ))
  .add("Invite Survey Attendees", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider addTypename={false}>
        <InviteSurveyAttendeesModalContainer
          surveyId={surveysMock[0].id}
          projectId={surveysMock[0].projectId}
          onDismiss={action("onDismiss")}
        />
      </MockedProvider>
    </Provider>
  ))

storiesOf("Emails", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        addTypename: false,
        mocks: [
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenariosMock[0].id}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: emailsQuery,
              variables: {scenarioId: scenariosMock[0].id}
            },
            result: {
              data: {
                emails: emailsMock
              }
            }
          },
          {
            request: {
              query: emailQuery,
              variables: {id: emailsMock[0].id}
            },
            result: {
              data: {
                email: emailsMock[0]
              }
            }
          },
          {
            request: {
              query: emailQuery,
              variables: {id: emailsMock[1].id}
            },
            result: {
              data: {
                email: emailsMock[1]
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <Emails scenarioId={scenariosMock[0].id} directory={EmailDirectory.Inbox} />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("EmailDirectories", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <>
        <Global styles={globalStyle} />
        <EmailDirectories
          interventions={interventionsMock}
          actionsDisabled={false}
          introductionEmail={Option.none()}
          selectedEmailId={Option.none()}
          scenario={Option.of(scenariosMock[0] as Scenario)}
          emails={emailsMock.slice(0, 3).map(removeTypename) as EmailType[]}
          emailsLoading={false}
          selectEmail={action("select")}
          selectedDirectory={EmailDirectory.Inbox}
          selectDirectory={(directory: EmailDirectory) => alert("select " + directory)}
        />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("Files and Directories", module)
  .add("Upload Modal", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState)}>
        <UploadFileModal
          onDismiss={action("onDismiss")}
          onBinariesSuccessfullyUploaded={action("onBinariesSuccessfullyUploaded")}
          acceptedFileTypes={[FileType.Graphic]}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("Upload Modal - defaultSelectedFileType", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState)}>
        <UploadFileModal
          onBinariesSuccessfullyUploaded={action("Successfully Uploaded")}
          acceptedFileTypes={[FileType.Graphic]}
          onDismiss={action("onDismiss")}
        />
      </Provider>
    </MockedProvider>
  ))
  .add("File Detail View", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: updateFileMutation
            },
            result: {
              data: {
                updateFile: fileMock
              }
            }
          },
          {
            request: {
              query: fileQuery,
              variables: {id: "fsüdfpksdäföksfäösldf"}
            },
            result: {
              data: {
                file: fileMock
              }
            }
          }
        ]}
        addTypename={true}>
        <Provider store={fakeStore(initialAppState)}>
          <FileDetail
            interventionCount={0}
            spreadsheetCellContentInterventions={[]}
            file={{} as SpreadsheetFile}
            disabled={false}
            parentDirectory={Option.none()}
            scenarioId={""}
            emailId={null}
          />
        </Provider>
      </MockedProvider>
    </Provider>
  ))
  .add("Move File Modal", () => (
    <MoveOverlay
      file={Option.none()}
      directory={Option.of(directoriesForScenarioMock[0] as Directory)}
      onFilesSuccessfullyMoved={action("onConfirm")}
      onDismiss={action("onDismiss")}
      name={text("FileOrDirectoryName", "test.png")}
      parentDirectory={Option.none()}
      dataLoading={false}
      directories={directoriesForScenarioMock}
      files={filesMock}
    />
  ))
  .add("Move File Modal - File Tree", () => (
    <MoveFileTree
      isFile={true}
      currentParentDirectory={Option.none()}
      currentDirectoryId={Option.of("sdfdsf")}
      selectedTargetDirectory={Option.of("")}
      setSelectedTargetDirectory={action("setSelectedTargetDirectory")}
      dataLoading={false}
      directories={directoriesForScenarioMock}
      files={filesMock}
    />
  ))

storiesOf("EmailContent", module).add("default", () => (
  <React.Fragment>
    <Global styles={globalStyle} />
    <EmailContent header={<div>Header</div>}>
      <div>Content</div>
    </EmailContent>
  </React.Fragment>
))

storiesOf("Email", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        removeTypename: true,
        mocks: [
          {
            request: {
              query: emailQuery,
              variables: {id: emailsMock[0].id}
            },
            result: {
              data: {
                email: emailsMock[0]
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <Email
          interventions={interventionsMock}
          selectedEmailId={Option.of(emailsMock[0].id)}
          actionsDisabled={false}
          scenario={Option.of(scenariosMock[0] as Scenario)}
        />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("EmailCreateModal", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        removeTypename: true,
        mocks: [
          {
            request: {
              query: scenarioQuery,
              variables: {id: scenariosMock[0].id}
            },
            result: {
              data: {
                scenario: scenariosMock[0]
              }
            }
          },
          {
            request: {
              query: createEmailMutation,
              variables: {
                creation: pick(emailsMock[0], [
                  "sender",
                  "ccRecipients",
                  "subject",
                  "directory",
                  "receptionDelayInSeconds",
                  "isInitiallyRead",
                  "relevance",
                  "message",
                  "scenarioId"
                ])
              }
            },
            result: {
              data: {
                createEmail: emailsMock[0]
              }
            }
          },
          {
            request: {
              query: updateScenarioMutation,
              variables: {
                id: scenariosMock[0].id,
                update: pick(scenariosMock, ["name", "description", "maxDurationInSeconds", "tags"])
              }
            },
            result: {
              data: {
                updateScenario: scenariosMock[0]
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <EmailCreateModal
          scenarioId={scenariosMock[0].id}
          navigationConfig={{
            route: Route.ScenarioEmails,
            payload: {scenarioId: scenariosMock[0].id}
          }}
        />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("ReferenceBooks-Overview", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        removeTypename: true,
        mocks: [
          {
            request: {
              query: checkLoginQuery
            },
            result: {
              data: {
                checkLogin: checkLoginMock
              }
            }
          },
          {
            request: {
              query: createReferenceBookChapterMutation,
              variables: {
                creation: pick(referenceBook, ["title", "description"])
              }
            },
            result: {
              data: {
                createReferenceBook: referenceBook
              }
            }
          },
          {
            request: {
              query: referenceBookChaptersQuery
            },
            result: {
              data: {
                referenceBooks: [referenceBook]
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <ReferenceBookChapters />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("Reference Book Article Overview", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <ReferenceBookArticleDetail
        referenceBookChapter={referenceBookChapterMock()}
        selectEntityId={action("selectEntityId")}
        selectedEntityId={Option.none()}
      />
    </MockedProvider>
  </Provider>
))

storiesOf("ReferenceBooksScenario-Selection", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <>
        <Global styles={globalStyle} />
        <ReferenceBookChaptersSelection scenarioId={scenariosMock[0].id} />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("ReferenceBooks-Content-Type-Dialog", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <ContentTypeDialog onConfirm={action("onConfirm")} onDismiss={action("onDismiss")} />
    </MockedProvider>
  </Provider>
))

storiesOf("Coding-Model", module)
  .add("Detail-Overview", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider>
        <CodingModelDetailOverview
          navigateToDimensionDetail={action("navigateToDimensionDetail")}
          isRepositionLoading={false}
          isSortModalVisible={boolean("showSortModal", false)}
          repositionDimensions={action("Reposition")}
          setIsSortModalVisible={action("setIsVisible")}
          isReadOnly={boolean("isReadOnly", false)}
          isCreateMainDimensionsModalVisible={boolean("showModal", false)}
          setShowCreateMainDimensionsModal={action("setShowCreateModal")}
          codingModel={codingModelsMock[0]}
          codingDimensions={codingDimensionsMock}
          handleUpdate={() => {
            action("handleUpdate")
            return Promise.resolve(Option.none())
          }}
        />
      </MockedProvider>
    </Provider>
  ))
  .add("Create Main Dimension Modal", () => (
    <MockedProvider>
      <CreateMainDimensionModal
        scenarioId="fsfpköslkf"
        codingModelId="fsfsdfd"
        onDismiss={action("onDismiss")}
        onConfirm={action("onConfirm")}
      />
    </MockedProvider>
  ))
  .add("Create Sub Dimension Modal", () => (
    <MockedProvider>
      <CreateSubDimensionModal
        scenarioId="dsfsf3sfdsf"
        parentDimension={object("Parent Dimension", codingDimensionsMock[0])}
        codingModelId="fsfsdfd"
        onDismiss={action("onDismiss")}
        onConfirm={action("onConfirm")}
      />
    </MockedProvider>
  ))
  .add("Create Item Modal", () => (
    <MockedProvider>
      <CreateItemModal
        scenarioId="dsfsf3sfdsf"
        parentDimension={object("Parent Dimension", codingDimensionsMock[0])}
        codingModelId="fsfsdfd"
        onDismiss={action("onDismiss")}
        onConfirm={action("onConfirm")}
      />
    </MockedProvider>
  ))
  .add("common Detail View", () => (
    <MockedProvider>
      <CodingModelCommonDetailView
        navigate={action("navigate")}
        t={fakeTranslate}
        descriptionPlaceholderKey="description"
        isReadOnly={boolean("isReadOnly", false)}
        editDescriptionDialogTitleKey="coding_models__detail_sub_dimension_edit_description_modal"
        headerTitleKey="overview"
        description={text("Description", "Beschreibung")}
        title={text("Title", "Kodieranweiung 2")}
        renderCustomContent={() => <div>Place for custom content</div>}
        maxScore={120}
        handleUpdate={() => {
          action("handleUpdate")
          return Promise.resolve(Option.none())
        }}
      />
    </MockedProvider>
  ))
  .add("Main Dimension Detail view", () => (
    <MockedProvider>
      <MainDimensionDetailView
        isReadOnly={boolean("isReadOnly", false)}
        codingDimension={codingDimensionsMock[0]}
        scenarioId="fsdfsfs"
        allCodingDimensions={codingDimensionsMock}
      />
    </MockedProvider>
  ))
  .add("Sub Dimension Detail view", () => (
    <MockedProvider>
      <SubDimensionDetailView
        navigateToItemDetail={action("navigateToItemDetail")}
        isReadOnly={boolean("isReadOnly", false)}
        showCreateItemModal={false}
        setShowCreateItemModal={action("setShowCreateItemModal")}
        scenarioId="sfdqälsfäölp"
        updateCodingDimension={() => {
          action("updateCodingDimension")
          return Promise.resolve(Option.none())
        }}
        deleteCodingDimensionHook={deleteEntityHookMock}
        codingDimension={codingDimensionsMock[0]}
        deleteCodingItemHook={deleteEntityHookMock}
        maxScore={20}
        entities={object<DimensionTableEntity[]>("Entities", [
          {
            id: "sdfsfsdsfsdf",
            scoringType: ScoringType.Analytical,
            maxScore: 15,
            title: "Item 1 (analytisch)"
          },
          {id: "3209ujsfd", scoringType: ScoringType.Holistic, maxScore: 5, title: "Item 2 (holistisch)"}
        ])}
        isRepositionLoading={false}
        isSortModalVisible={false}
        repositionItems={action("repositionItems")}
        setIsSortModalVisible={action("setIsSortModalVisible")}
      />
    </MockedProvider>
  ))
  .add("Item Detail view", () => (
    <MockedProvider>
      <ManualCodingItemDetailView
        isReadOnly={boolean("isReadOnly", false)}
        addCodingCriterion={action("AddCodingCriterion")}
        scenarioId="sdfsdf"
        codingModelId="sdfköslkdfösl"
        updateCodingItem={() => {
          action("UpdateCodingItem")
          return Promise.resolve(Option.none())
        }}
        codingCriteria={object("codingCriteria", codingCriteriaMock)}
        codingItem={object("codingItem", manualCodingItemMock)}
        visibleCodingItemUpdateModalType={Option.none()}
        showUpdateCodingItemTypeModal={action("showUpdateCodingItemTypeModal")}
        hideCodingItemUpdateModal={action("hideCodingItemUpdateModal")}
        showEditCodingCriterionModal={action("showEditCodingCriterionModal")}
        hideEditCodingCriterionModal={action("hideEditCodingCriterionModal")}
        editCodingCriterionModalVisibility={{
          isVisible: false,
          defaultSelectedCriterionId: Option.none()
        }}
      />
    </MockedProvider>
  ))
  .add("Main Dimension Table", () => (
    <MockedProvider>
      <DimensionsTable
        onEntityClick={action("onEntityClick")}
        isReadOnly={boolean("isReadOnly", false)}
        onAddClick={action("onAddClicked")}
        onSortClick={action("onSortClicked")}
        deleteEntityConfig={{
          deleteEntityHook: deleteEntityHookMock,
          navigateTo: {
            route: Route.ScenarioCodingModelDetail
          }
        }}
        maximumScore={100}
        labelKey="coding_models__detail_main_dimension_label_singular"
        entities={[{id: "sdfsfsd", itemsCount: 23, maxScore: 15, title: "Dimension 1"}]}
      />
    </MockedProvider>
  ))
  .add("Sub Dimension Table", () => (
    <MockedProvider>
      <DimensionsTable
        onEntityClick={action("onEntityClick")}
        isReadOnly={boolean("isReadOnly", false)}
        onAddClick={action("onAddClicked")}
        onSortClick={action("onSortClicked")}
        deleteEntityConfig={{
          deleteEntityHook: deleteEntityHookMock,
          navigateTo: {
            route: Route.ScenarioCodingModelDetail
          }
        }}
        maximumScore={100}
        placeholder={<div>Keine Sub</div>}
        labelKey="coding_models__detail_sub_dimension_label"
        entities={object("Entities", [{id: "sdfsfsd", itemsCount: 23, maxScore: 15, title: "Dimension 1"}])}
      />
    </MockedProvider>
  ))
  .add("Table of Contents", () => (
    <MockedProvider>
      <ScenarioCodingModelTableOfContents
        expandedNodeIds={[]}
        isReadOnly={boolean("isReadOnly", false)}
        selectedNodeId={Option.none()}
        handleSelectNode={action("HandleSelect")}
        allCodingNodes={codingDimensionNodesMock}
      />
    </MockedProvider>
  ))

storiesOf("Modules Selection", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <ModuleSelectionContainer<Scenario>
        entities={scenariosMock}
        multiSelection={boolean("MultiSelection", true)}
        alreadyAssignedEntities={[]}
        onSelectionConfirmed={action("Confirmed")}
        subheaderConfig={{
          labelKey: "sample_companies__selection_header",
          entityFilterType: "scenarioSampleCompanySelection",
          navigationButton: {
            labelKey: "sample_companies__selection_header",
            onClick: () => console.log("Go Back")
          }
        }}
        footerConfig={{
          entitySelectionKey: "reference_books__scenario_amount_selected_chapters_label",
          emptySelectionKey: "sample_companies__selection_empty_selection"
        }}
        renderContent={scenario => <div>{scenario.author.id}</div>}
      />
    </MockedProvider>
  </Provider>
))

storiesOf("Questionnaires", module).add("create-questionnaire-question-modal", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider
      {...{
        removeTypename: true,
        mocks: [
          {
            request: {
              query: createQuestionnaireQuestionMutation,
              variables: {
                creation: pick(multipleChoiceQuestionMock, [
                  "title",
                  "text",
                  "questionType",
                  "isAdditionalFreeTextAnswerEnabled",
                  "questionnaireId",
                  "scoringType"
                ])
              }
            },
            result: {
              data: {
                createQuestionnaireQuestion: multipleChoiceQuestionMock
              }
            }
          }
        ]
      }}>
      <>
        <Global styles={globalStyle} />
        <CreateQuestionnaireQuestionModal
          onDismiss={action("create_questionnaire_question_modal__on_dismiss")}
          questionnaireId={multipleChoiceQuestionMock.questionnaireId}
          navigateToQuestion={action("navigateToQuestion")}
        />
      </>
    </MockedProvider>
  </Provider>
))

storiesOf("Projects", module).add("create-project-module-modal", () => (
  <Provider store={fakeStore(initialAppState)}>
    <>
      <Global styles={globalStyle} />
      <CreateProjectModuleModal
        onDismiss={action("create_project_module_modal__on_dismiss")}
        projectId={projectModulesMock[0].projectId}
      />
    </>
  </Provider>
))

/*
storiesOf("Scenario Edit Duration Modal", module).add("default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <EditDurationModal
      selectLabelKey="select"
      titleKey="title"
      descriptionKey="description"
      onConfirm={action("onConfirm")}
      onDismiss={action("onDismiss")}
      areMaximumReceptionDelaysLoading={false}
      maximumReceptionDelay={{delayInSeconds: 500, entityLanguageKey: "email"}}
      timeUnitOptions={[
        {label: "Minuten", value: "minutes"},
        {label: "Stunden", value: "hours"}
      ]}
      formMethods={storyFormMethods}
    />
  </Provider>
))
*/
storiesOf("ScenariosCodingModel", module)
  .add("edit-coding-criterion-modal", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingItemQuery,
              variables: {id: manualCodingItemMock.id}
            },
            result: {
              data: {
                codingItem: manualCodingItemMock
              }
            }
          },
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: manualCodingItemMock.id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock
              }
            }
          },
          {
            request: {
              query: updateCodingCriterionMutation,
              variables: {
                id: codingCriteriaMock[0].id,
                creation: pick(codingCriteriaMock[0], ["description", "score"])
              }
            },
            result: {
              data: {
                updateCodingCriterion: codingCriteriaMock[0]
              }
            }
          },
          {
            request: {
              query: deleteCodingCriterionMutation,
              variables: {id: codingCriteriaMock[0].id}
            },
            result: {
              data: {
                deleteCodingCriterion: codingCriteriaMock[0].id
              }
            }
          },
          {
            request: {
              query: createCodingCriterionMutation,
              variables: {
                creation: pick(codingCriteriaMock[0], ["description", "score", "itemId"])
              }
            },
            result: {
              data: {
                createCodingCriterion: codingCriteriaMock[0]
              }
            }
          }
        ]}
        addTypename={true}>
        <>
          <Global styles={globalStyle} />
          <EditCodingCriterionModal
            scenarioId="561b7ba5-be30-43b9-b771-177374ae7857"
            codingItemId={manualCodingItemMock.id}
            codingModelId="e3ad10ed-f7a1-4bf0-84ca-6be49ca0ea85"
            onDismiss={action("edit_coding_criterion_modal__on_dismiss")}
            selectedCodingCriterionId={Option.none()}
          />
        </>
      </MockedProvider>
    </Provider>
  ))
  .add("update-coding-item-modal (type=UpdateCodingItemType.Type)", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingItemQuery,
              variables: {id: manualCodingItemMock.id}
            },
            result: {
              data: {
                codingItem: manualCodingItemMock
              }
            }
          },
          {
            request: {
              query: updateManualCodingItemMutation,
              variables: {
                id: manualCodingItemMock.id,
                update: pick(manualCodingItemMock, ["title", "description", "scoringType"])
              }
            },
            result: {
              data: {
                updateCodingItem: manualCodingItemMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>
          <Global styles={globalStyle} />
          <UpdateCodingItemModal
            codingItemId={manualCodingItemMock.id}
            type={UpdateCodingItemType.Type}
            onDismiss={action("update_coding_item_modal__on_dismiss")}
            onUpdate={action("update_coding_item_modal__on_update")}
          />
        </>
      </MockedProvider>
    </Provider>
  ))
  .add("update-coding-item-modal (type=UpdateCodingItemType.Method)", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingItemQuery,
              variables: {id: manualCodingItemMock.id}
            },
            result: {
              data: {
                codingItem: manualCodingItemMock
              }
            }
          },
          {
            request: {
              query: updateManualCodingItemMutation,
              variables: {
                id: manualCodingItemMock.id,
                update: pick(manualCodingItemMock, ["title", "description", "scoringType"])
              }
            },
            result: {
              data: {
                updateCodingItem: manualCodingItemMock
              }
            }
          }
        ]}
        addTypename={true}>
        <>
          <Global styles={globalStyle} />
          <UpdateCodingItemModal
            codingItemId={manualCodingItemMock.id}
            type={UpdateCodingItemType.Method}
            onDismiss={action("update_coding_item_modal__on_dismiss")}
            onUpdate={action("update_coding_item_modal__on_update")}
          />
        </>
      </MockedProvider>
    </Provider>
  ))

storiesOf("User Management", module)
  .add("Detail View", () => (
    <Provider store={fakeStore(initialAppState)}>
      <UserManagementDetail
        userForEditingModal={Option.none()}
        setUserForEditingModal={action("setUserForEditingModal")}
        globalClaims={[]}
        users={[userAccountMock, checkLoginMayAdministrateUserAccountsMock]}
        searchValue=""
        onSearchValueChange={action("onSearch")}
        toggleUserClaim={action("toggleUserRight")}
      />
    </Provider>
  ))
  .add("User Table", () => (
    <Provider store={fakeStore(initialAppState)}>
      <UserTable
        onUserRowClicked={action("RowClick")}
        users={[userAccountMock, checkLoginMayAdministrateUserAccountsMock]}
      />
    </Provider>
  ))
  .add("Edit User Claims Modal", () => (
    <MockedProvider>
      <Provider store={fakeStore(initialAppState)}>
        <EditUserClaimsModalContainer
          onConfirm={action("onConfirm")}
          onDismiss={action("onDismiss")}
          user={object("UserAccount", checkLoginMayAdministrateUserAccountsMock)}
        />
      </Provider>
    </MockedProvider>
  ))

storiesOf("Rating", module)
  .add("Common > Header", () => (
    <>
      <Global styles={globalStyle} />
      <RatingHeader
        projectModules={projectModulesMockWithQuestionnaire}
        navigationButtonConfig={{labelKey: "rating__rating__header_back_button", onClick: action("onNavigate")}}
        onSelectModule={action("onSelectModule")}
        projectTitle={projectsMock[0].name}
        selectedModuleId={Option.of(projectModulesMockWithQuestionnaire[2].id)}
      />
    </>
  ))
  .add("Common > Header (no module selected)", () => (
    <>
      <Global styles={globalStyle} />
      <RatingHeader
        projectModules={projectModulesMockWithQuestionnaire}
        navigationButtonConfig={{labelKey: "rating__rating__header_back_button", onClick: action("onNavigate")}}
        onSelectModule={action("onSelectModule")}
        projectTitle={projectsMock[0].name}
        selectedModuleId={Option.none()}
      />
    </>
  ))
  .add("Common > Header (no modules)", () => (
    <>
      <Global styles={globalStyle} />
      <RatingHeader
        projectModules={[]}
        navigationButtonConfig={{labelKey: "rating__rating__header_back_button", onClick: action("onNavigate")}}
        onSelectModule={action("onSelectModule")}
        projectTitle={projectsMock[0].name}
        selectedModuleId={Option.none()}
      />
    </>
  ))
  .add("Common > Rating Placeholder", () => (
    <>
      <Global styles={globalStyle} />
      <RatingHeader
        projectModules={projectModulesMockWithQuestionnaire}
        navigationButtonConfig={{labelKey: "rating__rating__header_back_button", onClick: action("onNavigate")}}
        onSelectModule={action("onSelectModule")}
        projectTitle={projectsMock[0].name}
        selectedModuleId={Option.of(projectModulesMockWithQuestionnaire[2].id)}
      />
      <Content customStyles={Flex.column}>
        <RatingPlaceholder />
      </Content>
    </>
  ))
  .add("Common > Rating Detail", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailHeader
        navigateToNextParticipant={action("navigateToNextParticipant")}
        navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
        participantIndex={2}
        participantName={"John Smith"}
        participantsCount={5}
      />
    </>
  ))
  .add("Common > Detail > Rating Footer > Manual Scoring", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailFooter
        navigateToNextQuestion={action("navigateToNextParticipant")}
        requiresScoring={true}
        score={0}
        maxScore={12}
        participantFinishedModule={true}
        isRatingInProgress={true}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Detail > Rating Footer > Automatic Scoring", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailFooter
        navigateToPreviousQuestion={action("navigateToNextParticipant")}
        score={6}
        maxScore={12}
        participantFinishedModule={true}
        isRatingInProgress={true}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Detail > Rating Footer > Automatic Scoring - Full Score", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailFooter
        navigateToNextQuestion={action("navigateToNextParticipant")}
        navigateToPreviousQuestion={action("navigateToNextParticipant")}
        score={12}
        maxScore={12}
        participantFinishedModule={true}
        isRatingInProgress={true}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Detail > Rating Footer > Overview Page", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailFooter
        navigateToNextQuestion={action("navigateToNextParticipant")}
        score={13}
        maxScore={41}
        isOverviewPage={true}
        participantFinishedModule={true}
        isRatingInProgress={true}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Rating Action Element > Scenario", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailActionElement onClick={action("clicked")} isScenario={true} disabled={true} />
    </>
  ))
  .add("Common > Rating Action Element > Questionnaire", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailActionElement onClick={action("clicked")} isScenario={false} disabled={false} />
    </>
  ))
  .add("Common > Questions > Questions Automatic Rating Table", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: selectedAnswersForParticipantQuery,
            variables: {
              questionId: questionnaireQuestionMockWithAnswers.id,
              surveyInvitationId: surveyInvitationIdMock
            }
          },
          result: {
            data: {
              selectedAnswersForParticipant: [questionnaireQuestionMockWithAnswers.answers[1].id]
            }
          }
        }
      ]}
      addTypename={true}>
      <>
        <Global styles={globalStyle} />
        <QuestionsAutomaticRatingTable
          participantsCount={3}
          surveyId={surveyIdMock}
          surveyInvitationId={surveyInvitationIdMock}
          question={questionnaireQuestionMockWithAnswers}
          answers={questionnaireQuestionMockWithAnswers.answers}
        />
      </>
    </MockedProvider>
  ))
  .add("Common > Questions > Questions Manual Rating Table", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: freeTextAnswerForParticipantQuery,
            variables: {questionId: questionnaireQuestionsMock[0].id, surveyInvitationId: surveyInvitationIdMock}
          },
          result: {
            data: {
              freeTextAnswerForParticipant: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."
            }
          }
        },
        {
          request: {
            query: freetextQuestionRatingForParticipantQuery,
            variables: {questionId: questionnaireQuestionsMock[0].id, surveyInvitationId: surveyInvitationIdMock}
          },
          result: {
            data: {
              freetextQuestionRatingForParticipant: freetextQuestionRatingsMock.map(rating => ({
                ...rating,
                questionId: questionnaireQuestionsMock[0].id
              }))
            }
          }
        },
        {
          request: {
            query: updateFreetextQuestionRatingMutation,
            variables: {
              id: freetextQuestionRatingsMock[0].id,
              update: {noCriterionFulfilled: !freetextQuestionRatingsMock[0].noCriterionFulfilled}
            }
          },
          result: {
            data: {
              updateFreetextQuestionRating: {
                ...freetextQuestionRatingsMock.map(rating => ({
                  ...rating,
                  questionId: questionnaireQuestionsMock[0].id
                })),
                noCriterionFulfilled: !freetextQuestionRatingsMock[0].noCriterionFulfilled
              }
            }
          }
        },
        {
          request: {
            query: createFreetextQuestionRatingCriterionSelectionMutation,
            variables: {
              creation: {
                freetextQuestionRatingId: freetextQuestionRatingsMock[0].id,
                criterionId: freetextQuestionRatingsMock[0].criterionSelections[0].criterionId
              }
            }
          },
          result: {
            data: {
              createFreetextQuestionRatingCriterionSelection: freetextQuestionRatingsMock[0].criterionSelections[0]
            }
          }
        },
        {
          request: {
            query: deleteFreetextQuestionRatingCriterionSelectionMutation,
            variables: {
              freetextQuestionRatingId: freetextQuestionRatingsMock[0].id,
              criterionId: freetextQuestionRatingsMock[0].criterionSelections[0].criterionId
            }
          },
          result: {
            data: {
              deleteFreetextQuestionRatingCriterionSelection: freetextQuestionRatingsMock[0].criterionSelections[0]
            }
          }
        }
      ]}
      addTypename={true}>
      <>
        <Global styles={globalStyle} />
        <QuestionsManualRatingTable
          surveyInvitationId={surveyInvitationIdMock}
          question={questionnaireQuestionsMock[0]}
          ratingId={Option.of(ratingsMock[0].id)}
          performAction={action("performAction")}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
        />
      </>
    </MockedProvider>
  ))
  .add("Common > Questions > Overview Table", () => (
    <>
      <Global styles={globalStyle} />
      <RatingOverviewTable<TableEntity>
        entities={questionnaireQuestionsMock.map(question => ({
          ...question,
          title: question.text,
          maxScore: getMaxScore(sortByPosition(questionnaireQuestionsMock), question),
          rated: question.questionType !== QuestionType.FreeText,
          scoringType: QuestionScoringType.Analytical,
          iconName: getQuestionTypeIconName(question.questionType),
          averageScore: 2
        }))}
        scoringName={"Gesamtdurchschnitt"}
        entityName={"Fragen"}
        enumerate={true}
        title={"Frage"}
        iconName={IconName.QuestionnaireCascade}
        isReadonly={false}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Rating Overview Table", () => (
    <>
      <Global styles={globalStyle} />
      <RatingOverviewTable<TableEntity>
        entities={questionnaireQuestionsMock.map(question => ({
          ...question,
          title: question.text,
          maxScore: getMaxScore(sortByPosition(questionnaireQuestionsMock), question),
          rated: question.questionType !== QuestionType.FreeText,
          averageScore: 2
        }))}
        entityName={"Items"}
        scoringName={"Erreichte Punktzahl"}
        title={"Titel"}
        isReadonly={false}
        isNotRatable={false}
      />
    </>
  ))
  .add("Common > Detail > Rating Detail View", () => (
    <>
      <Global styles={globalStyle} />
      <RatingDetailView
        label={"Fragebogen der Marktforschung"}
        description={
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }
        navigateToNextParticipant={action("navigateToNextParticipant")}
        navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
        participantIndex={0}
        participantName={"Dieter"}
        participantsCount={6}
        score={6}
        maxScore={12}
        isOverviewPage={true}
        participantFinishedModule={true}
        isRatingInProgress={true}
        isNotRatable={false}>
        <div>Content</div>
      </RatingDetailView>
    </>
  ))
  .add("Rating Questionnaire Detail View", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: selectedAnswersForParticipantQuery,
            variables: {questionId: questionnaireMock.questions[0].id, surveyInvitationId: surveyInvitationIdMock}
          },
          result: {
            data: {
              selectedAnswersForParticipant: questionnaireMock.questions[0].answers.map(({id}) => id)
            }
          }
        },
        {
          request: {
            query: freeTextAnswerForParticipantQuery,
            variables: {questionId: questionnaireMock.questions[5].id, surveyInvitationId: surveyInvitationIdMock}
          },
          result: {
            data: {
              freeTextAnswerForParticipant: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."
            }
          }
        },
        {
          request: {
            query: freetextQuestionRatingForParticipantQuery,
            variables: {questionId: questionnaireMock.questions[5].id, surveyInvitationId: surveyInvitationIdMock}
          },
          result: {
            data: {
              freetextQuestionRatingForParticipant: freetextQuestionRatingsMock.map(rating => ({
                ...rating,
                questionId: questionnaireMock.questions[5].id
              }))
            }
          }
        },
        {
          request: {
            query: updateFreetextQuestionRatingMutation,
            variables: {
              id: freetextQuestionRatingsMock[0].id,
              update: {noCriterionFulfilled: !freetextQuestionRatingsMock[0].noCriterionFulfilled}
            }
          },
          result: {
            data: {
              updateFreetextQuestionRating: {
                ...freetextQuestionRatingsMock[0],
                questionId: questionnaireMock.questions[5].id,
                noCriterionFulfilled: !freetextQuestionRatingsMock[0].noCriterionFulfilled
              }
            }
          }
        },
        {
          request: {
            query: createFreetextQuestionRatingCriterionSelectionMutation,
            variables: {
              creation: {
                ratingId: freetextQuestionRatingsMock[0].id,
                criterionId: freetextQuestionRatingsMock[0].criterionSelections[0].criterionId
              }
            }
          },
          result: {
            data: {
              createFreetextQuestionRatingCriterionSelection: freetextQuestionRatingsMock[0].criterionSelections[0]
            }
          }
        },
        {
          request: {
            query: deleteFreetextQuestionRatingCriterionSelectionMutation,
            variables: {
              ratingId: freetextQuestionRatingsMock[0].id,
              criterionId: freetextQuestionRatingsMock[0].criterionSelections[0].criterionId
            }
          },
          result: {
            data: {
              deleteFreetextQuestionRatingCriterionSelection: freetextQuestionRatingsMock[0].criterionSelections[0]
            }
          }
        }
      ]}
      addTypename={true}>
      <>
        <Global styles={globalStyle} />
        <RatingQuestionnaireDetailView
          surveyInvitationId={surveyInvitationIdMock}
          questionnaire={{
            ...questionnaireMock,
            questions: questionnaireMock.questions.map(question => ({
              ...question,
              scoringType:
                question.questionType === QuestionType.FreeText
                  ? QuestionScoringType.Holistic
                  : QuestionScoringType.Analytical
            }))
          }}
          navigateToQuestion={action("navigateToQuestion")}
          navigateToNextParticipant={action("navigateToNextParticipant")}
          navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
          navigateToNextQuestion={action("navigateToNextQuestion")}
          navigateToPreviousQuestion={action("navigateToPreviousQuestion")}
          participantIndex={0}
          participantName={"Klaus Dieter"}
          participantsCount={12}
          ratingId={Option.of(ratingsMock[0].id)}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          fetchFreetextQuestionRatingsSubject={new Subject<void>()}
          isReadonly={false}
          isNotRatable={false}
        />
      </>
    </MockedProvider>
  ))
  .add("Common > Detail Overview", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: projectQuery,
            variables: {id: projectsMock[0].id}
          },
          result: {
            data: {
              project: projectsMock[0]
            }
          }
        },
        {
          request: {
            query: projectModulesQuery,
            variables: {projectId: projectsMock[0].id}
          },
          result: {
            data: {
              projectModules: projectModulesMockWithQuestionnaire
            }
          }
        },
        {
          request: {
            query: surveyInvitationsProgressQuery,
            variables: {surveyId: surveyInvitationsProgressMock[0].id}
          },
          result: {
            data: {
              surveyInvitations: surveyInvitationsProgressMock
            }
          }
        },
        {
          request: {
            query: questionnaireQuery,
            variables: {id: questionnairesMock[0].id}
          },
          result: {
            data: {
              questionnaire: questionnairesMock[0]
            }
          }
        },
        {
          request: {
            query: questionnaireQuery,
            variables: {id: questionnairesMock[1].id}
          },
          result: {
            data: {
              questionnaire: questionnairesMock[1]
            }
          }
        },
        {
          request: {
            query: ratingsQuery,
            variables: {surveyId: surveyInvitationsProgressMock[0].id}
          },
          result: {
            data: {
              ratings: ratingsMock.map(rating => ({...rating, surveyId: surveyInvitationsProgressMock[0].id}))
            }
          }
        },
        {
          request: {
            query: surveyInvitationsQuery,
            variables: {surveyId: surveyInvitationsProgressMock[0].id}
          },
          result: {
            data: {
              surveyInvitations: surveyInvitationsMock.map((surveyInvitation, index) =>
                index === 0 ? {...surveyInvitation, surveyId: surveyInvitationsProgressMock[0].id} : surveyInvitation
              )
            }
          }
        },
        {
          request: {
            query: checkLoginQuery
          },
          result: {
            data: {
              checkLogin: checkLoginMock
            }
          }
        }
      ]}>
      <>
        <Global styles={globalStyle} />
        <RatingDetailQuestionnaire
          projectId={projectsMock[0].id}
          surveyId={surveyInvitationsProgressMock[0].id}
          moduleId={projectModulesMockWithQuestionnaire[3].id}
          surveyInvitationId={surveyInvitationsProgressMock[0].id}
          questionId={projectModulesMockWithQuestionnaire[3].questionnaire?.questions[2].id}
          navigateTo={action("navigateTo")}
        />
      </>
    </MockedProvider>
  ))
  .add("Common > Detail > Questionnaire Table of Contents", () => (
    <RatingQuestionnaireTableOfContents
      surveyId={surveyIdMock}
      surveyInvitationId={surveyInvitationIdMock}
      questionnaire={Option.of(questionnaireMock)}
      selectEntityId={action("select_entity")}
      selectedEntityId={Option.none()}
      fetchFreetextQuestionRatingsSubject={new Subject<void>()}
      isReadonly={false}
      isNotRatable={false}
      mode={RaterMode.FinalRater}
    />
  ))
  .add("Common > Detail > Coding Table of Contents", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingDimensionsMock[0].items[0].id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock.map(mock => ({
                  ...mock,
                  itemId: codingDimensionsMock[0].items[0].id
                }))
              }
            }
          },
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingDimensionsMock[2].items[0].id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock.map(mock => ({
                  ...mock,
                  itemId: codingDimensionsMock[2].items[0].id
                }))
              }
            }
          },
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingDimensionsMock[2].items[1].id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock.map(mock => ({
                  ...mock,
                  itemId: codingDimensionsMock[2].items[1].id
                }))
              }
            }
          },
          {
            request: {
              query: codingCriteriaQuery,
              variables: {itemId: codingDimensionsMock[2].items[2].id}
            },
            result: {
              data: {
                codingCriteria: codingCriteriaMock.map(mock => ({
                  ...mock,
                  itemId: codingDimensionsMock[2].items[2].id
                }))
              }
            }
          },
          {
            request: {
              query: scenarioCodingItemRatingsForParticipantQuery,
              variables: {scenarioId: scenariosMock[0].id, surveyInvitationId: surveyInvitationIdMock}
            },
            result: {
              data: {
                scenarioRatingForParticipant: {
                  ...scenarioCodingItemRatingMock,
                  scenarioId: scenariosMock[0].id,
                  surveyInvitationId: surveyInvitationIdMock
                }
              }
            }
          }
        ]}
        addTypename={true}>
        <>
          <Global styles={globalStyle} />
          <RatingCodingTableOfContents
            surveyId={surveyIdMock}
            codingDimensions={codingDimensionsMock}
            surveyInvitationId={surveyInvitationIdMock}
            selectEntityId={action("select_entity")}
            selectedEntityId={Option.none()}
            isReadonly={false}
            ratingId={Option.of(scenarioManualCodingItemRatingsMock[0].ratingId)}
            isNotRatable={false}
          />
        </>
      </MockedProvider>
    </Provider>
  ))
  .add("Common > Criterion Rating Table (CodingCriterion)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <CriterionRatingTable
        criteria={codingCriteriaMock}
        scoringType={QuestionScoringType.Analytical}
        isSelected={criterion => criterion.id === codingCriteriaMock[1].id || criterion.id === codingCriteriaMock[3].id}
        updateCriterionSelection={action("updateCriterionSelection")}
        noCriterionFulfilled={false}
        setNoCriterionFulfilled={action("setNoCriterionFulfilled")}
        actionLoading={false}
        hasRatingChanged={false}
        applyRatingChanges={action("applyRatingChanges")}
        mode={RaterMode.FinalRater}
        surveyId={surveyIdMock}
      />
    </React.Fragment>
  ))
  .add("Common > Criterion Rating Table (CodingCriterion, hasRatingChanged=true)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <CriterionRatingTable
        criteria={codingCriteriaMock}
        scoringType={QuestionScoringType.Analytical}
        isSelected={criterion => criterion.id === codingCriteriaMock[1].id || criterion.id === codingCriteriaMock[3].id}
        updateCriterionSelection={action("updateCriterionSelection")}
        noCriterionFulfilled={false}
        setNoCriterionFulfilled={action("setNoCriterionFulfilled")}
        actionLoading={false}
        hasRatingChanged={true}
        applyRatingChanges={action("applyRatingChanges")}
        mode={RaterMode.FinalRater}
        surveyId={surveyIdMock}
      />
    </React.Fragment>
  ))
  .add("Common > Criterion Rating Table (CodingCriterion, isComputerRater)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <CriterionRatingTable
        criteria={codingCriteriaMock}
        scoringType={QuestionScoringType.Analytical}
        isSelected={criterion => criterion.id === codingCriteriaMock[1].id || criterion.id === codingCriteriaMock[3].id}
        noCriterionFulfilled={false}
        actionLoading={false}
        hasRatingChanged={false}
        readOnly={true}
        mode={RaterMode.FinalRater}
        surveyId={surveyIdMock}
      />
    </React.Fragment>
  ))
  .add("Common > Criterion Rating Table (FreetextQuestionCodingCriterion)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <CriterionRatingTable
        criteria={freetextQuestionCodingCriteriaMock}
        scoringType={freeTextQuestionMock.scoringType}
        scoringTypeIcon={getQuestionTypeIconName(freeTextQuestionMock.questionType)}
        isSelected={criterion => criterion.id === codingCriteriaMock[1].id || criterion.id === codingCriteriaMock[3].id}
        updateCriterionSelection={action("updateCriterionSelection")}
        noCriterionFulfilled={false}
        setNoCriterionFulfilled={action("setNoCriterionFulfilled")}
        dataLoading={false}
        freeTextAnswer={Option.of("Freetext Answer")}
        actionLoading={false}
        hasRatingChanged={false}
        applyRatingChanges={action("applyRatingChanges")}
        mode={RaterMode.FinalRater}
        surveyId={surveyIdMock}
      />
    </React.Fragment>
  ))
  .add("Common > Criterion Rating Table (FreetextQuestionCodingCriterion, hasRatingChanged=true)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <CriterionRatingTable
        criteria={freetextQuestionCodingCriteriaMock}
        scoringType={freeTextQuestionMock.scoringType}
        scoringTypeIcon={getQuestionTypeIconName(freeTextQuestionMock.questionType)}
        isSelected={criterion => criterion.id === codingCriteriaMock[1].id || criterion.id === codingCriteriaMock[3].id}
        updateCriterionSelection={action("updateCriterionSelection")}
        noCriterionFulfilled={false}
        setNoCriterionFulfilled={action("setNoCriterionFulfilled")}
        dataLoading={false}
        freeTextAnswer={Option.of("Freetext Answer")}
        actionLoading={false}
        hasRatingChanged={true}
        applyRatingChanges={action("applyRatingChanges")}
        mode={RaterMode.FinalRater}
        surveyId={surveyIdMock}
      />
    </React.Fragment>
  ))
  .add("Scenario > Scenario Automatic Rating Table", () => (
    <MockedProvider mocks={scenarioAutomaticRatingTableResponsesMock}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <ScenarioAutomaticRatingTable
          scenario={scenariosMock[0]}
          surveyInvitationId={scenarioAutomatedCodingItemRatingsMock[0].surveyInvitationId}
          scenarioCodingItemRating={Option.of(scenarioAutomatedCodingItemRatingsMock[0])}
          scoringType={QuestionScoringType.Analytical}
          codingCriteria={automatedCodingCriteriaMock}
          performAction={action("performAction")}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
          ratingId={Option.of(ratingsMock[0].id)}
        />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Scenario > Scenario Manual Rating Table Holistic", () => (
    <MockedProvider mocks={scenarioManualRatingTableResponsesMock}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <ScenarioManualRatingTable
          scenarioCodingItemRating={Option.of(scenarioManualCodingItemRatingsMock[2])}
          scoringType={QuestionScoringType.Holistic}
          codingCriteria={codingCriteriaMock}
          performAction={action("performAction")}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
          ratingId={Option.of(ratingsMock[0].id)}
        />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Rating Scenario Detailview (no selection)", () => (
    <MockedProvider mocks={ratingScenarioDetailViewResponsesMock}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RatingScenarioDetailView
          surveyInvitationId={surveyInvitationIdMock}
          scenario={{
            ...scenariosMock[0],
            codingModel: {...codingModelsMock[0], id: codingDimensionsMock[0].codingModelId}
          }}
          selectedCodingEntityId={undefined}
          navigateToEntity={action("navigateToEntity")}
          navigateToNextParticipant={action("navigateToNextParticipant")}
          navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
          participantIndex={0}
          participantName={"Hans Günter"}
          participantsCount={6}
          navigateToNextQuestion={action("navigateToNextQuestion")}
          navigateToPreviousQuestion={action("navigateToPreviousQuestion")}
          ratingId={Option.of(scenarioManualCodingItemRatingsMock[0].ratingId)}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
          isNotRatable={false}
          refreshData={action("refreshData")}
        />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Rating Scenario Detailview (coding-dimension selected)", () => (
    <MockedProvider mocks={ratingScenarioDetailViewResponsesMock}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RatingScenarioDetailView
          surveyInvitationId={surveyInvitationIdMock}
          scenario={{
            ...scenariosMock[0],
            codingModel: {...codingModelsMock[0], id: codingDimensionsMock[0].codingModelId}
          }}
          selectedCodingEntityId={codingDimensionsMock[1].id}
          navigateToEntity={action("navigateToEntity")}
          navigateToNextParticipant={action("navigateToNextParticipant")}
          navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
          participantIndex={0}
          participantName={"Hans Günter"}
          participantsCount={6}
          navigateToNextQuestion={action("navigateToNextQuestion")}
          navigateToPreviousQuestion={action("navigateToPreviousQuestion")}
          ratingId={Option.of(scenarioManualCodingItemRatingsMock[0].ratingId)}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
          isNotRatable={false}
          refreshData={action("refreshData")}
        />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Rating Scenario Detailview (coding-item selected)", () => (
    <MockedProvider mocks={ratingScenarioDetailViewResponsesMock}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RatingScenarioDetailView
          surveyInvitationId={surveyInvitationIdMock}
          scenario={{
            ...scenariosMock[0],
            codingModel: {...codingModelsMock[0], id: codingDimensionsMock[0].codingModelId}
          }}
          selectedCodingEntityId={codingCriteriaMock[0].itemId}
          navigateToEntity={action("navigateToEntity")}
          navigateToNextParticipant={action("navigateToNextParticipant")}
          navigateToPreviousParticipant={action("navigateToPreviousParticipant")}
          participantIndex={0}
          participantName={"Hans Günter"}
          participantsCount={6}
          navigateToNextQuestion={action("navigateToNextQuestion")}
          navigateToPreviousQuestion={action("navigateToPreviousQuestion")}
          ratingId={Option.of(scenarioManualCodingItemRatingsMock[0].ratingId)}
          mode={RaterMode.FinalRater}
          surveyId={surveyIdMock}
          participantFinishedModule={true}
          isReadonly={false}
          isNotRatable={false}
          refreshData={action("refreshData")}
        />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Rater-Invitation-Overlay", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: surveyUserAccountsQuery,
            variables: {surveyId: surveysMock[0].id}
          },
          result: {
            data: {
              userAccountsForSurvey: userAccountsMock
            }
          }
        },
        {
          request: {
            query: inviteSurveyRatersMutation,
            variables: {surveyId: surveysMock[0].id, emails: userAccountsMock.map(({email}) => email)}
          },
          result: {
            data: {
              inviteSurveyRaters: ""
            }
          }
        }
      ]}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RaterInvitationOverlay
          surveyId={surveysMock[0].id}
          existingRaterEmails={userAccountsMock.map(({email}) => email)}
          onDismiss={action("onDismiss")}
        />
      </React.Fragment>
    </MockedProvider>
  ))

storiesOf("Rater-Rating", module)
  .add("Common > Overview-Placeholder", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RaterRatingOverviewPlaceholder />
    </React.Fragment>
  ))
  .add("Common > Rating-Card", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: ratingsQuery,
            variables: {surveyId: surveyIdMock}
          },
          result: {
            data: {
              ratings: ratingsMock
            }
          }
        }
      ]}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RatersRatingCard userAccount={Option.of(userAccountMock)} survey={{...surveysMock[0], id: surveyIdMock}} />
      </React.Fragment>
    </MockedProvider>
  ))
  .add("Common > Rating-Card > Header (survey in progress)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardHeader title={surveysMock[0].title} status={RatingStatus.SurveyInProgress} />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Header (rating in progress)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardHeader title={surveysMock[0].title} status={RatingStatus.RatingInProgress} />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Header (rating completed)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardHeader title={surveysMock[0].title} status={RatingStatus.Completed} />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Content", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardContent survey={surveysMock[0]} />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Footer (survey in progress)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardFooter
        status={RatingStatus.SurveyInProgress}
        ratingPercentage={66.67}
        totalEntitiesCount={12}
        ratedEntitiesCount={8}
      />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Footer (rating in progress)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardFooter
        status={RatingStatus.RatingInProgress}
        ratingPercentage={66.67}
        totalEntitiesCount={12}
        ratedEntitiesCount={8}
      />
    </React.Fragment>
  ))
  .add("Common > Rating-Card > Footer (rating completed)", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <RatersRatingCardFooter
        status={RatingStatus.Completed}
        ratingPercentage={100}
        totalEntitiesCount={12}
        ratedEntitiesCount={12}
      />
    </React.Fragment>
  ))
  .add("Overview", () => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: checkLoginQuery
          },
          result: {
            data: {
              checkLogin: checkLoginMock
            }
          }
        },
        {
          request: {
            query: surveysForUserAccountQuery,
            variables: {userAccountId: userAccountMock.id}
          },
          result: {
            data: {
              surveysForUserAccount: surveysMock
            }
          }
        },
        {
          request: {
            query: ratingsQuery,
            variables: {surveyId: surveyIdMock}
          },
          result: {
            data: {
              ratings: ratingsMock
            }
          }
        }
      ]}>
      <React.Fragment>
        <Global styles={globalStyle} />
        <RaterRatingOverview />
      </React.Fragment>
    </MockedProvider>
  ))
