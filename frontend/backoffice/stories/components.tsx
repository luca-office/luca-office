/* eslint-disable max-lines */
import {MockedProvider} from "@apollo/client/testing"
import {Global} from "@emotion/react"
import {action} from "@storybook/addon-actions"
import {boolean, select, text} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import * as React from "react"
import {Provider} from "react-redux"
// eslint-disable-next-line jest/no-mocks-import
import {referenceBookChapterMock} from "shared/__mocks__"
import {
  Button,
  CardFooter,
  CardFooterItem,
  CardHeader,
  Column,
  Columns,
  Content,
  Heading,
  Icon,
  OverviewCard,
  TableContainer,
  TableContainerProps,
  TocEntryPlaceholder
} from "shared/components"
import {imageBinariesMock, videoBinariesMock} from "shared/components/binary-viewer/__mocks__/binaries.mock"
import {BinaryType, ButtonVariant, HeadingLevel, IconName} from "shared/enums"
import {ReferenceBookChapter} from "shared/models"
import {globalStyle} from "shared/styles"
import {range} from "shared/utils"
import {fakeStore} from "sharedTests/redux/fake-store"
import {
  BinaryUpdateModal,
  CardOverview,
  cardTabsMock,
  CreationBar,
  CreationCard,
  CreationStatus,
  InlineEditableHeaderContainer,
  InlineEditableTextareaContainer,
  MarkdownTextField,
  OverlayEditField,
  OverlayEditFieldType,
  ResortModal,
  SubHeaderDetail,
  SubHeaderFilter,
  TabbedCard
} from "../src/components"
import {resortableEntitiesMock} from "../src/components/resort-modal/__mocks__/resortable-entities.mock"
import {AppMode, CreationStatus as CreationStatusEnum} from "../src/enums"
import {AppHeader} from "../src/modules"
import {initialAppState} from "../src/redux/state/app-state"
import {Route} from "../src/routes"

storiesOf("App Header", module).add("Default", () => (
  <Provider store={fakeStore(initialAppState)}>
    <MockedProvider>
      <AppHeader
        activeRoute={Route.Scenarios}
        userMayAdministrateRScripts={false}
        navigate={action("navigate")}
        appMode={AppMode.MANAGER}
      />
    </MockedProvider>
  </Provider>
))

storiesOf("Detail Header", module).add("Default", () => (
  <SubHeaderDetail
    returnTo={{text: "", route: Route.ReferenceBookChapters}}
    navigate={() => null}
    title={text("Titel", "Neues Nachschlagewerk")}
    buttonText={text("ButtonText", "Übersicht")}
    onButtonClick={action("OnClick")}
  />
))

storiesOf("Card Overview Component", module)
  .add("Default", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider>
        <CardOverview
          entityFilterType="referenceBookChapters"
          create={action("create")}
          creationText={text("Creation Text", "Neu anlegen")}
        />
      </MockedProvider>
    </Provider>
  ))
  .add("With Overview Cards", () => (
    <Provider store={fakeStore(initialAppState)}>
      <MockedProvider>
        <CardOverview entityFilterType="referenceBookChapters" create={action("create")} creationText={"Neu anlegen"}>
          <OverviewCard
            onClick={action("onClick 1")}
            key={1}
            headerText={text("Title 1", "Titel")}
            text={text("Text 1", "Beschreibung")}
          />
          <OverviewCard
            onClick={action("onClick 2")}
            key={2}
            headerIcon={IconName.Book}
            headerText={text("Title 2", "Titel")}
            text={text("Text 2", "Beschreibung")}
          />
          <OverviewCard
            onClick={action("onClick 3")}
            key={3}
            headerInfo={<span>info</span>}
            headerText={text("Title 3", "Titel")}
            text={text("Text 3", "Beschreibung")}
          />
        </CardOverview>
      </MockedProvider>
    </Provider>
  ))

storiesOf("Card Component (Creation)", module).add("Default", () => (
  <CreationCard onClick={action("Create Click")} text={text("Text", "Neues Nachschlagewerk anlegen")} />
))
storiesOf("Tabbable Card", module)
  .add("Default", () => <TabbedCard tabs={cardTabsMock} />)
  .add("With Footer and header", () => (
    <TabbedCard
      tabs={cardTabsMock}
      renderCardFooter={() => <CardFooterItem text={"Test Footer"} icon={IconName.Check} />}
      renderCardHeader={() => <Button icon={IconName.Add} variant={ButtonVariant.IconOnly} />}
    />
  ))

storiesOf("Card Header Component", module)
  .add("Card header without children", () => (
    <CardHeader hasGreyBackground={boolean("hasGreyBackground", false)} hasShadow={boolean("Shadow", true)} />
  ))
  .add("Card header with children", () => (
    <CardHeader hasGreyBackground={boolean("hasGreyBackground", false)} hasShadow={boolean("Shadow", true)}>
      <Icon customStyles={{marginRight: 16}} name={IconName.Book} />
      <Heading level={HeadingLevel.h3}>Nachschlagewerke</Heading>
    </CardHeader>
  ))

storiesOf("Inline editable Header", module).add("Default", () => (
  <InlineEditableHeaderContainer
    onConfirm={() => Promise.resolve(action("onConfirm"))}
    text={text("Text", "Hello World")}
  />
))

storiesOf("Card Footer Component", module)
  .add("Default", () => <CardFooter />)
  .add("With Card Footer Items", () => (
    <CardFooter>
      <CardFooterItem icon={IconName.BookPage} text={text("Footer Item Text 1", "Text")} />
      <CardFooterItem icon={IconName.BookPage} text={text("Footer Item Text 2", "Text")} />
      <CardFooterItem icon={IconName.BookPage} text={text("Footer Item Text 3", "Text")} />
    </CardFooter>
  ))

storiesOf("Card Footer Item Component", module)
  .add("Default", () => <CardFooterItem text={text("Text", "Text")} />)
  .add("With Icon", () => <CardFooterItem icon={IconName.BookPage} text={text("Text", "Text")} />)

storiesOf("Markdown Text Field", module)
  .add("TextContent", () => (
    <MarkdownTextField text="Hello" dialogTitle="DialogTitle" onConfirm={() => Promise.resolve()} isEditable />
  ))
  .add("TextContent empty", () => (
    <MarkdownTextField
      placeholder={<TocEntryPlaceholder />}
      dialogTitle="DialogTitle"
      onConfirm={() => Promise.resolve("")}
      isEditable
      text={""}
    />
  ))

storiesOf("Markdown", module)
  .add("Textfield", () => (
    <MarkdownTextField
      isEditable={false}
      dialogTitle={text("Title", "Beschreibung bearbeiten")}
      onConfirm={() => Promise.resolve(action("onConfirm"))}
      text={text("Text", "Hello World")}
    />
  ))
  .add("Textfield-Overlay-Visible", () => (
    <MarkdownTextField
      isEditable={false}
      dialogTitle={text("Title", "Beschreibung bearbeiten")}
      onConfirm={() => Promise.resolve(action("onConfirm"))}
      text={text("Text", "Hello World")}
    />
  ))

storiesOf("Sub Header Detail", module).add("Default", () => (
  <SubHeaderDetail
    title={text("Title", "Titel – Untertitel")}
    buttonText={text("Button Text", "Text")}
    returnTo={{route: Route.Scenarios, text: text("Return Text", "Zurück")}}
    onButtonClick={action("onButtonClick")}
    navigate={action("navigate")}
  />
))

storiesOf("Sub Header Filter", module).add("default", () => (
  <SubHeaderFilter
    typeOptions={[{label: text("Type Option 1 Label", "Alle"), value: "all"}]}
    sortOptions={[{label: text("Sort Option 1 Label", "Alle"), value: "all"}]}
    stateOptions={[{label: text("State Option 1 Label", "Alle"), value: "all"}]}
    searchText={"test"}
    onChange={() => null}
    onSearchTextChange={() => null}
  />
))

storiesOf("Creation-Bar", module).add("default", () => (
  <CreationBar title={text("Title", "Weiteres Element hinzufügen")} onCreate={action("OnCreate")} />
))

storiesOf("Creation Status", module).add("default", () => (
  <CreationStatus status={select("Status", CreationStatusEnum, CreationStatusEnum.Created) as CreationStatusEnum} />
))

const tableProps: TableContainerProps<ReferenceBookChapter> = {
  entities: range(10).map((index: number) => referenceBookChapterMock(index.toString())),
  entityKey: entity => entity.id,
  columns: [
    {
      header: (
        <Columns>
          <Column flexGrow={0} flexShrink={0}>
            <Icon name={IconName.BookPage} />
          </Column>
          <Column>Artikel</Column>
        </Columns>
      ),
      key: "icon",
      content: entity => (
        <Columns>
          <Column flexGrow={0} flexShrink={0}>
            <Icon name={IconName.BookPage} />
          </Column>
          <Column>{entity.title}</Column>
        </Columns>
      )
    },
    {header: "Description", key: "description", content: entity => entity.description},
    {
      header: <Icon name={IconName.AlignmentLeft} />,
      key: "texts",
      content: () => 3
    },
    {
      header: <Icon name={IconName.Images} />,
      key: "images",
      content: () => 23
    },
    {
      header: <Icon name={IconName.Questionnaire} />,
      key: "questionnaire",
      content: () => (Math.random() > 0.5 ? <Icon name={IconName.Check} /> : null)
    }
  ],
  isEntitySelected: entity => entity.id == "3",
  onClick: action("onClick"),
  onDoubleClick: action("onDoubleClick")
}

storiesOf("Table", module).add("default", () => <TableContainer {...tableProps} />)

storiesOf("Inline Editable Textarea", module).add("default", () => (
  <InlineEditableTextareaContainer text={"test test"} onConfirm={text => Promise.resolve(text)} />
))

storiesOf("Overlay Edit Field", module)
  .add("default", () => (
    <OverlayEditField
      dialogTitleKey={"reference_books__card_article"}
      fieldLabelKey={"reference_books__card_article"}
      updateLoading={false}
      onUpdate={action("update")}
      renderValue={() => (
        <span>
          Anzeigewert <span style={{color: "#f00"}}> :)</span>
        </span>
      )}
      formFields={[
        {
          updateId: "updateId",
          value: "Feldwert",
          type: OverlayEditFieldType.TEXT,
          labelKey: "reference_books__card_article"
        }
      ]}
    />
  ))
  .add("password", () => (
    <OverlayEditField
      dialogTitleKey={"reference_books__card_article"}
      fieldLabelKey={"reference_books__card_article"}
      updateLoading={false}
      onUpdate={action("update")}
      renderValue={() => (
        <span>
          *** <span style={{color: "#f00"}}> :)</span>
        </span>
      )}
      formFields={[
        {
          updateId: "updateId",
          value: "Feldwert",
          type: OverlayEditFieldType.PASSWORD,
          labelKey: "reference_books__card_article"
        }
      ]}
    />
  ))
  .add("1 field, multiple form fields", () => (
    <OverlayEditField
      dialogTitleKey={"reference_books__card_article"}
      fieldLabelKey={"reference_books__card_article"}
      updateLoading={false}
      onUpdate={action("update")}
      renderValue={() => (
        <span>
          *** <span style={{color: "#f00"}}> :)</span>
        </span>
      )}
      formFields={[
        {
          updateId: "nameId",
          value: "Vorname",
          type: OverlayEditFieldType.TEXT,
          labelKey: "account__field_name"
        },
        {
          updateId: "surnameId",
          value: "Nachname",
          type: OverlayEditFieldType.TEXT,
          labelKey: "account__field_surname"
        },
        {
          updateId: "emailId",
          value: "E-mail",
          type: OverlayEditFieldType.TEXT,
          labelKey: "account__field_email"
        }
      ]}
    />
  ))
  .add("option field", () => (
    <OverlayEditField
      dialogTitleKey={"reference_books__card_article"}
      fieldLabelKey={"reference_books__card_article"}
      updateLoading={false}
      onUpdate={action("update")}
      renderValue={() => (
        <span>
          *** <span style={{color: "#f00"}}> :)</span>
        </span>
      )}
      formFields={[
        {
          updateId: "optionId",
          value: "",
          type: OverlayEditFieldType.SELECT,
          labelKey: "placeholder",
          options: [
            {label: "option 1", value: "option1"},
            {label: "option 2", value: "option2"},
            {label: "option 3", value: "option3"}
          ]
        }
      ]}
    />
  ))

storiesOf("Content", module)
  .add("default", () => (
    <Content
      subHeader={
        <SubHeaderDetail
          navigate={action("navigate")}
          returnTo={{
            text: text("Return Text", "Zurück"),
            route: Route.Projects
          }}
          title={"test title of the header"}
        />
      }>
      this is some test content
    </Content>
  ))
  .add("loading", () => (
    <Content
      loading={true}
      subHeader={
        <SubHeaderDetail
          navigate={action("navigate")}
          returnTo={{
            text: text("Return Text", "Zurück"),
            route: Route.Projects
          }}
          title={"test title of the header"}
        />
      }>
      this is some test content
    </Content>
  ))
  .add("no content", () => (
    <Content
      isContentMissing={true}
      subHeader={
        <SubHeaderDetail
          navigate={action("navigate")}
          returnTo={{
            text: text("Return Text", "Zurück"),
            route: Route.Projects
          }}
          title={"test title of the header"}
        />
      }>
      this is some test content
    </Content>
  ))
  .add("with action bar", () => (
    <Content
      subHeader={
        <SubHeaderDetail
          navigate={action("navigate")}
          returnTo={{
            text: text("Return Text", "Zurück"),
            route: Route.Projects
          }}
          title={"test title of the header"}
        />
      }
      actionBar={<div>test actions</div>}>
      this is some test content
    </Content>
  ))

storiesOf("Binary-Update Modal", module)
  .add("image", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <BinaryUpdateModal
        onConfirm={action("confirm_binary_update")}
        onDelete={action("delete_binary")}
        onDismiss={action("dismiss_binary_update")}
        src={imageBinariesMock[0].path}
        type={BinaryType.Image}
      />
    </React.Fragment>
  ))
  .add("video", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <BinaryUpdateModal
        onConfirm={action("confirm_binary_update")}
        onDelete={action("delete_binary")}
        onDismiss={action("dismiss_binary_update")}
        src={videoBinariesMock[0].path}
        type={BinaryType.Video}
      />
    </React.Fragment>
  ))

storiesOf("Resort Modal", module).add("default", () => (
  <React.Fragment>
    <Global styles={globalStyle} />
    <ResortModal
      titleKey={"reference_books__sort_article_content_title"}
      onDismiss={action("dismiss_modal")}
      onConfirm={action("confirm_modal")}
      tableLabel={`Artikelbausteine (${resortableEntitiesMock.length})`}
      entities={resortableEntitiesMock}
    />
  </React.Fragment>
))
