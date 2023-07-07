/* eslint-disable max-lines */
import {MockedProvider} from "@apollo/client/testing"
import {css, Global} from "@emotion/react"
import {action} from "@storybook/addon-actions"
import {boolean, select, text, withKnobs} from "@storybook/addon-knobs"
import {storiesOf} from "@storybook/react"
import * as React from "react"
import {
  BinaryViewer,
  BookTableOfContents,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  CardHeader,
  CardText,
  CustomSelect,
  DateRangePicker,
  FileDropzone,
  FileExplorer,
  Heading,
  Icon,
  MarkdownEditor,
  OfficeWindow,
  OverviewCard,
  PdfViewer,
  QuestionnaireIntroduction,
  QuestionnaireQuestionComponent,
  QuestionnaireView,
  RadioButton,
  SelectInput,
  SingleDatePicker,
  SlideMenu,
  SpreadsheetViewer,
  SubHeader,
  TabButtonBar,
  TableContainer,
  Text,
  TextInput,
  TocEntryPlaceholder,
  ToolsHeader,
  Tooltip,
  UploadFileModal,
  ViewerToolsSubHeader
} from "../src/components"
import {imageBinariesMock, videoBinariesMock} from "../src/components/binary-viewer/__mocks__/binaries.mock"
import {tocArticlesMock, tocBookMock} from "../src/components/book-table-of-contents/__mocks__/toc-book-data.mock"
import {treeMock} from "../src/components/file-explorer/__mocks__/tree.mock"
import {FinishModal} from "../src/components/finish-modal/finish-modal"
import {pdfBinariesMock} from "../src/components/pdf-viewer/__mocks__/binaries.mock"
import {DhxSpreadsheet} from "../src/components/spreadsheet/dhx-spreadsheet/dhx-spreadsheet"
import {generateSpreadsheetConfig, spreadsheetsMock} from "../src/components/spreadsheet/__mocks__/spreadsheets.mock"
import {TabButton} from "../src/components/tab-button-bar/tab-button"
import {
  BinaryType,
  ButtonVariant,
  HeadingLevel,
  IconName,
  InputType,
  UploadFileType as FileType,
  ViewerToolsType
} from "../src/enums"
import {EmailDirectory, ProjectModuleType} from "../src/graphql/generated/globalTypes"
import {
  freeTextQuestionMock,
  multipleChoiceQuestionMock,
  multipleChoiceQuestionWithExtraFreeTextMock,
  multipleChoiceQuestionWithVideoMock,
  participantDataMock,
  questionnaireMock,
  singleChoiceQuestionMock,
  singleChoiceQuestionWithImageMock
} from "../src/graphql/__mocks__"
import {ErpEntity} from "../src/models"
import {EmailDetails, EmailListContainer, EmailListEntry} from "../src/office-tools"
import {emails as mockEmails} from "../src/office-tools/email-client/__tests__/__mocks__/emails"
import {ErpCard, ErpContentView, ErpNavigation, ErpTable, ErpTableContentType} from "../src/office-tools/erp"
import {ErpExcelImportDialog} from "../src/office-tools/erp/common/erp-excel-import-dialog/erp-excel-import-dialog"
import {CellContent} from "../src/office-tools/erp/erp-content-view/cell-content"
import {erpColumnsMock} from "../src/office-tools/erp/erp-content-view/__mocks__/erp-columns.mock"
import {createErpMockEntities} from "../src/office-tools/erp/erp-content-view/__mocks__/erp-entities.mock"
import {getStaticErpStructure} from "../src/office-tools/erp/erp-navigation/static-erp-structure"
import {
  backgroundColorBright,
  Flex,
  flex1,
  FontWeight,
  globalStyle,
  headerHeight,
  spacingMedium,
  subHeaderHeight
} from "../src/styles"
import {Option} from "../src/utils"
import {getStoryTranslation} from "../src/utils/stories"
import {participantResultsMock} from "../src/__mocks__"
import {fakeTranslate} from "../tests/utils/translate-mock"
import {sampleCompanyIdMock} from "../tests/__mocks__/erp"
import {selectOptionsMock} from "./__mocks__/select-options"
import {
  createRandomErpRows,
  erpTableColumns,
  tableColumnsStoryMock,
  tableEntitiesStoryMock
} from "./__mocks__/table.mock"

storiesOf("Text Input Component", module)
  .add("Default Text", () => <TextInput type={InputType.text} />)
  .add("With Placeholder", () => <TextInput placeholderKey="email" type={InputType.text} />)
  .add("With Label", () => <TextInput placeholderKey={"email"} labelKey={"email"} type={InputType.text} />)
  .add("Default Password", () => <TextInput placeholderKey={"password"} type={InputType.password} />)
  .add("With Custom Width", () => <TextInput customStyles={{width: "100%"}} type={InputType.text} />)
  .add("With Custom Icon", () => <TextInput type={InputType.text} icon={IconName.Search} />)
  .add("Not Clearable", () => <TextInput type={InputType.text} isClearable={false} />)
  .add("Not Clearable with Custom Icon", () => (
    <TextInput type={InputType.text} isClearable={false} icon={IconName.Search} />
  ))

storiesOf("Select Input Component", module)
  .add("Default", () => <SelectInput optionList={[{label: "Szenario 1", value: "scenario_1"}]} />)
  .add("With Label", () => (
    <SelectInput
      optionList={[
        {label: "Szenario 1", value: "scenario_1"},
        {label: "Szenario 2", value: "scenario_2"}
      ]}
      labelKey="project"
    />
  ))

storiesOf("Button Component", module)
  .addDecorator(withKnobs)
  .add("Primary", () => <Button variant={ButtonVariant.Primary}>{text("Text", "Anmelden")}</Button>)
  .add("Primary with custom width", () => (
    <Button variant={ButtonVariant.Primary} customStyles={{width: "100%"}}>
      {text("Text", "Anmelden")}
    </Button>
  ))
  .add("Primary disabled", () => (
    <Button variant={ButtonVariant.Primary} disabled>
      Anmelden
    </Button>
  ))
  .add("Primary with Icon", () => (
    <Button variant={ButtonVariant.Primary} icon={IconName.LucaLogo}>
      {text("Text", "Anmelden")}
    </Button>
  ))
  .add("Primary Icon Only", () => (
    <Button variant={ButtonVariant.IconOnly} icon={IconName.LucaLogo}>
      {text("Text", "Anmelden")}
    </Button>
  ))
  .add("Secondary", () => <Button variant={ButtonVariant.Secondary}>Anmelden</Button>)
  .add("Loading", () => (
    <Button isLoading={boolean("Loading", true)} icon={IconName.LockClosed} variant={ButtonVariant.Primary}>
      Speichert...
    </Button>
  ))

storiesOf("Typography Component", module)
  .add("h1", () => <Heading level={HeadingLevel.h1}>Headline H1</Heading>)
  .add("h2", () => <Heading level={HeadingLevel.h2}>Headline H2</Heading>)
  .add("h3", () => (
    <Heading fontWeight={FontWeight.Bold} level={HeadingLevel.h3}>
      Headline H3 -bold
    </Heading>
  ))
  .add("Header h3 primary", () => (
    <Heading level={HeadingLevel.h3} color="primary">
      Headline H3 Primary
    </Heading>
  ))
  .add("Text", () => <Text>12.04.2020</Text>)

storiesOf("Icon Component", module)
  .addDecorator(withKnobs)
  .add("default", () => <Icon name={select("Variante", IconName, IconName.LucaLogo)} />)
  .add("LucaLogo Custom Size", () => <Icon width={24} height={24} name={IconName.LucaLogo} />)

storiesOf("Radio Button", module)
  .add("default", () => <RadioButton label={"Test"} selected={true} />)
  .add("disabled", () => <RadioButton label={"Test"} selected={false} disabled={true} />)

storiesOf("Custom Select", module)
  .add("default", () => (
    <CustomSelect
      labelKey={"category"}
      value={selectOptionsMock[0].value}
      optionList={selectOptionsMock}
      onChange={action("select option")}
    />
  ))
  .add("searchable + clearable", () => (
    <CustomSelect
      labelKey={"category"}
      value={selectOptionsMock[0].value}
      optionList={selectOptionsMock}
      onChange={action("select option")}
      searchable
      clearable
    />
  ))
  .add("icons", () => (
    <CustomSelect
      labelKey={"category"}
      value={selectOptionsMock[0].value}
      optionList={selectOptionsMock.map(option => ({...option, iconName: IconName.Calendar, iconColor: "#f00"}))}
      onChange={action("select option")}
    />
  ))
  .add("custom render", () => (
    <CustomSelect
      labelKey={"category"}
      value={selectOptionsMock[0].value}
      optionList={selectOptionsMock.map(option => ({
        ...option,
        renderOptionLabel: label => <div>unicorns! {label}</div>
      }))}
      onChange={action("select option")}
    />
  ))

storiesOf("Markdown", module).add("Editor", () => (
  <MarkdownEditor onChange={action("OnTextChange")} defaultValue={text("Default Markdown Text", "## Hello World")} />
))

storiesOf("Tooltips", module)
  .add("default (simple)", () => (
    <Tooltip title={"Test"}>
      <Button>Test</Button>
    </Tooltip>
  ))
  .add("Custom Placement at top", () => (
    <Tooltip title={"Testing longer text tooltips"} placement="top">
      <Button>Test</Button>
    </Tooltip>
  ))
  .add("Tooltip with text and icon", () => (
    <Tooltip
      title={"Testing longer text"}
      text={
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular."
      }
      icon={IconName.PaperEdit}>
      <Button>Test</Button>
    </Tooltip>
  ))
  .add("Tooltip with text", () => (
    <Tooltip
      title={"Testing longer text"}
      text={
        "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular."
      }>
      <Button>Test</Button>
    </Tooltip>
  ))

storiesOf("Table", module).add("default", () => (
  <TableContainer
    columns={tableColumnsStoryMock}
    entities={tableEntitiesStoryMock}
    entityKey={entity => entity.number}
  />
))

storiesOf("Office Window", module).add("Empty", () => (
  <>
    <OfficeWindow icon={IconName.Email} label="E-Mails" onClose={action("on_close")} />
    <OfficeWindow
      icon={IconName.Email}
      label="E-Mails"
      onClose={action("on_close")}
      onMinimize={action("on_minimize")}
    />
  </>
))

storiesOf("Book Table of Contents", module)
  .add("Backoffice: Scenario Placeholder", () => (
    <BookTableOfContents
      title={"Test Contents"}
      selectedEntityId={Option.none()}
      selectEntityId={action("select entity")}
      bookChapters={[]}
      placeholderHeadline={"No chapter selected"}
      placeholderHint={"Hint to add chapter"}
      actionFooter={
        <Card hasShadow={true} customStyles={css({marginTop: spacingMedium})}>
          <CardHeader customStyles={Flex.row}>
            <Heading level={HeadingLevel.h3}>Chapter setting</Heading>
          </CardHeader>
          <CardContent>
            <CardText>Some action description</CardText>
          </CardContent>
        </Card>
      }
      t={fakeTranslate}
      addButtonConfig={{labelKey: "reference_books__create_reference_book", onClick: action("add chapter (book)")}}
    />
  ))
  .add("Backoffice: Scenario (hideChapters)", () => (
    <BookTableOfContents
      title={"Test Contents"}
      selectedEntityId={Option.of(tocArticlesMock[0].id)}
      selectEntityId={action("select article")}
      fadeChapters={true}
      bookChapters={tocBookMock}
      t={fakeTranslate}
      actionFooter={
        <Card hasShadow={true} customStyles={css({marginTop: spacingMedium})}>
          <CardHeader customStyles={Flex.row}>
            <Heading level={HeadingLevel.h3}>Chapter setting</Heading>
          </CardHeader>
          <CardContent>
            <CardText>Some action description</CardText>
          </CardContent>
        </Card>
      }
      addButtonConfig={{labelKey: "reference_books__create_reference_book", onClick: action("add chapter (book)")}}
    />
  ))
  .add("Backoffice: Scenario", () => (
    <BookTableOfContents
      title={"Test Contents"}
      selectedEntityId={Option.of(tocArticlesMock[0].id)}
      selectEntityId={action("select entity")}
      bookChapters={tocBookMock}
      t={fakeTranslate}
      actionFooter={
        <Card hasShadow={true} customStyles={css({marginTop: spacingMedium})}>
          <CardHeader customStyles={Flex.row}>
            <Heading level={HeadingLevel.h3}>Chapter setting</Heading>
          </CardHeader>
          <CardContent>
            <CardText>Some action description</CardText>
          </CardContent>
        </Card>
      }
      addButtonConfig={{labelKey: "reference_books__create_reference_book", onClick: action("add chapter (book)")}}
    />
  ))
  .add("Backoffice: Scenario (chapter selected)", () => (
    <BookTableOfContents
      title={"Test Contents"}
      selectedEntityId={Option.of(tocBookMock[0].id)}
      selectEntityId={action("select entity")}
      bookChapters={tocBookMock}
      t={fakeTranslate}
      actionFooter={
        <Card hasShadow={true} customStyles={css({marginTop: spacingMedium})}>
          <CardHeader customStyles={Flex.row}>
            <Heading level={HeadingLevel.h3}>Chapter setting</Heading>
          </CardHeader>
          <CardContent>
            <CardText>Some action description</CardText>
          </CardContent>
        </Card>
      }
      addButtonConfig={{labelKey: "reference_books__create_reference_book", onClick: action("add chapter (book)")}}
    />
  ))
  .add("Backoffice: Book Detail", () => (
    <BookTableOfContents
      title={"Test Contents"}
      selectedEntityId={Option.of(tocArticlesMock[0].id)}
      selectEntityId={action("select entity")}
      bookChapters={[tocBookMock[1]]}
      t={fakeTranslate}
      addButtonConfig={{
        labelKey: "reference_books__create_reference_book_article_title",
        onClick: action("add article")
      }}
    />
  ))
  .add("Player: Book (hideChapters)", () => (
    <BookTableOfContents
      title={"Test Contents"}
      t={fakeTranslate}
      selectedEntityId={Option.of(tocArticlesMock[0].id)}
      selectEntityId={action("select entity")}
      hideChapters={true}
      readonly={true}
      bookChapters={[tocBookMock[1]]}
    />
  ))
  .add("Player: Book", () => (
    <BookTableOfContents
      title={"Test Contents"}
      t={fakeTranslate}
      selectedEntityId={Option.of(tocArticlesMock[0].id)}
      selectEntityId={action("select entity")}
      bookChapters={[tocBookMock[1]]}
      readonly={true}
    />
  ))

storiesOf("Binary-Viewer", module)
  .add("Image", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <BinaryViewer
        customStyles={css({height: "80vh"})}
        type={BinaryType.Image}
        binaries={imageBinariesMock}
        onCloseBinary={action("close binary")}
        setActiveBinaryId={action("select_image")}
        onCloseViewer={action("close_binary_viewer")}
      />
    </React.Fragment>
  ))
  .add("Video", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <BinaryViewer
        customStyles={css({height: "80vh"})}
        type={BinaryType.Video}
        onCloseBinary={action("close binary")}
        binaries={videoBinariesMock}
        setActiveBinaryId={action("select_video")}
        onCloseViewer={action("close_binary_viewer")}
      />
    </React.Fragment>
  ))
  .add("Control Selection", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <BinaryViewer
        customStyles={css({height: "80vh"})}
        type={BinaryType.Image}
        onCloseBinary={action("close binary")}
        binaries={imageBinariesMock}
        activeBinaryId={imageBinariesMock[0].id}
        setActiveBinaryId={action("select_image")}
        onCloseViewer={action("close_binary_viewer")}
      />
    </React.Fragment>
  ))

storiesOf("Viewer Tools", module)
  .add("default", () => (
    <>
      <ToolsHeader
        toolType={ViewerToolsType.Image}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ViewerToolsSubHeader
        elements={Option.of(imageBinariesMock)}
        closeElement={action("close binary")}
        selectElement={action("select binary")}
        selectedElement={Option.of(imageBinariesMock[0])}
        navigateToPrevious={action("navigate_previous")}
        navigateToNext={action("navigate_following")}
      />
    </>
  ))
  .add("all header types", () => (
    <>
      <ToolsHeader
        toolType={ViewerToolsType.Text}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.PDF}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.Image}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.Video}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.TableEditor}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.ReferenceBook}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
      <ToolsHeader
        toolType={ViewerToolsType.Email}
        onMinimizeTool={action("on_viewer_tools_minimize")}
        onClose={action("on_viewer_tools_close")}
      />
    </>
  ))
  .add("header no minimize button", () => (
    <ToolsHeader toolType={ViewerToolsType.PDF} onClose={action("on_viewer_tools_close")} />
  ))
  .add("sub header with/out navigation buttons", () => (
    <>
      <ViewerToolsSubHeader
        elements={Option.of(imageBinariesMock)}
        closeElement={action("close binary")}
        selectElement={action("select binary")}
        selectedElement={Option.of(imageBinariesMock[0])}
        navigateToPrevious={action("navigate_previous")}
        navigateToNext={action("navigate_following")}
      />
      <ViewerToolsSubHeader
        hideNavigationButtons={true}
        elements={Option.of(imageBinariesMock)}
        closeElement={action("close binary")}
        selectElement={action("select binary")}
        selectedElement={Option.of(imageBinariesMock[0])}
      />
    </>
  ))
  .add("sub header with single binary", () => (
    <ViewerToolsSubHeader
      hideNavigationButtons={true}
      elements={Option.of([imageBinariesMock[0]])}
      closeElement={action("close binary")}
      selectElement={action("select binary")}
      selectedElement={Option.of(imageBinariesMock[0])}
    />
  ))
  .add("sub header scrolling", () => (
    <ViewerToolsSubHeader
      elements={Option.of(
        imageBinariesMock.concat(videoBinariesMock).concat(pdfBinariesMock).concat(imageBinariesMock)
      )}
      closeElement={action("close binary")}
      selectElement={action("select binary")}
      selectedElement={Option.of(imageBinariesMock[0])}
    />
  ))

storiesOf("File Explorer", module)
  .add("Default all closed", () => (
    <FileExplorer
      tree={treeMock}
      onSelectNode={action("select_node")}
      isLoading={false}
      expandedDirectoryIds={[]}
      onExpandDirectory={action("expand")}
      selectedNodeId={Option.none()}
    />
  ))
  .add("Default opened/selected", () => (
    <FileExplorer
      tree={treeMock}
      onSelectNode={action("select_node")}
      isLoading={false}
      expandedDirectoryIds={[treeMock.children[0].id]}
      onExpandDirectory={action("expand")}
      selectedNodeId={Option.of(treeMock.children[0].id)}
    />
  ))
  .add("Default Editable", () => (
    <FileExplorer
      tree={treeMock}
      onSelectNode={action("select_node")}
      isLoading={false}
      expandedDirectoryIds={[]}
      onExpandDirectory={action("expand")}
      selectedNodeId={Option.none()}
      isCreateDirectoryButtonVisible={true}
    />
  ))
  .add("Empty", () => (
    <FileExplorer
      tree={{children: []}}
      onSelectNode={action("select_node")}
      isLoading={false}
      expandedDirectoryIds={[]}
      onExpandDirectory={action("expand")}
      selectedNodeId={Option.none()}
    />
  ))
  .add("Loading", () => (
    <FileExplorer
      tree={{children: []}}
      onSelectNode={action("select_node")}
      isLoading={true}
      expandedDirectoryIds={[]}
      onExpandDirectory={action("expand")}
      selectedNodeId={Option.none()}
    />
  ))

storiesOf("PDF-Viewer", module)
  .add("default", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <PdfViewer
        binaries={pdfBinariesMock}
        onClose={action("close_pdf_viewer")}
        onMinimize={action("minimize_pdf_viewer")}
        closeBinary={action("close_pdf")}
        selectBinaryId={action("select_pdf")}
        selectedBinaryId={Option.of(pdfBinariesMock[0].id)}
      />
    </React.Fragment>
  ))
  .add("native", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <PdfViewer
        binaries={pdfBinariesMock}
        onClose={action("close_pdf_viewer")}
        onMinimize={action("minimize_pdf_viewer")}
        closeBinary={action("close_pdf")}
        selectBinaryId={action("select_pdf")}
        selectedBinaryId={Option.of(pdfBinariesMock[0].id)}
      />
    </React.Fragment>
  ))

storiesOf("Reference Book - Article: Text Placeholder", module).add("default", () => (
  <React.Fragment>
    <Global styles={globalStyle} />
    <TocEntryPlaceholder />
  </React.Fragment>
))

storiesOf("Spreadsheet Viewer", module)
  .add("default", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <SpreadsheetViewer
        readonly={false}
        onCloseViewer={action("close_viewer")}
        spreadsheets={[spreadsheetsMock[0]]}
        onMinimize={action("minimize_viewer")}
        onCloseSpreadsheet={action("close_sheet")}
      />
    </React.Fragment>
  ))
  .add("readonly", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <SpreadsheetViewer
        readonly={true}
        onCloseViewer={action("close_viewer")}
        spreadsheets={[spreadsheetsMock[0]]}
        onMinimize={action("minimize_viewer")}
        onCloseSpreadsheet={action("close_sheet")}
      />
    </React.Fragment>
  ))
  .add("bigger dimensions", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <SpreadsheetViewer
        readonly={false}
        onCloseViewer={action("close_viewer")}
        spreadsheets={[{...spreadsheetsMock[0], cells: generateSpreadsheetConfig(150, 30).cells}]}
        onMinimize={action("minimize_viewer")}
        onCloseSpreadsheet={action("close_sheet")}
      />
    </React.Fragment>
  ))
  .add("multi sheet, sparse cells, formatting", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <SpreadsheetViewer
        readonly={false}
        onCloseViewer={action("close_viewer")}
        spreadsheets={spreadsheetsMock}
        onMinimize={action("minimize_viewer")}
        onCloseSpreadsheet={action("close_sheet")}
        setActiveSpreadsheetId={action("set_active")}
      />
    </React.Fragment>
  ))

const emails = [
  {
    eMailAddress: "juergen.neumann@mail.de",
    subject: "Abrechnungszeitraum Dezember 2010",
    subLabel: "12.11.2020",
    onClick: action("email_entry_clicked_0_0")
  },
  {
    eMailAddress: "velobikes@web.de",
    subject: "Abrechnungszeitraum Dezember 2010",
    subLabel: "10:47",
    onClick: action("email_entry_clicked_1_1")
  },
  {
    eMailAddress: "velobikes@web.de",
    subject: "Kostenzerlegung und Tabellen",
    subLabel: "10:52",
    onClick: action("email_entry_clicked_2_2")
  }
]

storiesOf("Email List Container", module)
  .add("Default", () => (
    <MockedProvider>
      <EmailListContainer
        isLoading={false}
        emails={mockEmails}
        selectedEmailId={mockEmails[0].id}
        introductionEmailId={Option.none()}
        onEmailSelected={action("email_selected")}
        scenarioFictiveDate={Option.none()}
        activeEmailDirectory={EmailDirectory.Inbox}
        onChangeEmailDirectory={action("changed_email_directory")}
        scenarioStartedAt={Option.none()}
      />
    </MockedProvider>
  ))
  .add("Email Entry", () => (
    <EmailListEntry
      isSelected={false}
      isRead={false}
      eMailAddress={emails[0].eMailAddress}
      subject={emails[0].subject}
      onClick={action("email_selected")}
    />
  ))
  .add("Email Entry selected", () => (
    <EmailListEntry
      isSelected={true}
      isRead={false}
      eMailAddress={emails[0].eMailAddress}
      subject={emails[0].subject}
      onClick={action("email_selected")}
    />
  ))
  .add("Email Entry read", () => <EmailListEntry isRead={true} isSelected={true} {...emails[0]} />)

storiesOf("Email details", module)
  .add("Default", () => (
    <MockedProvider>
      <EmailDetails
        createEmail={action("create_email")}
        deleteEmail={action("delete_email")}
        email={mockEmails[1]}
        introductionEmailId={Option.none()}
        moveEmailToDirectory={action("move_email_to_directory")}
        sendEmail={action("send_email")}
        updateEmailMetadata={action("update_email_metadata")}
        updateEmailText={action("update_email_text")}
        scenarioStartedAt={Option.none()}
        scenarioFictiveDate={Option.none()}
        autoCompleteEmailAddresses={[]}
        updateEmail={action("update_email")}
        participantDataAndToken={{
          participantData: Option.of(participantDataMock[0]),
          token: Option.none()
        }}
        sampleCompany={Option.none()}
        emailFiles={{
          downloadableEmailsFiles: [],
          availableEmailDownloadIds: [],
          availableEmailUploadFiles: [],
          addEmailFileToDownloads: action("add_file_to_download"),
          addEmailFileToUploads: action("add_file_to_upload"),
          removeEmailFileFromUploads: action("remove_file_from_upload")
        }}
      />
    </MockedProvider>
  ))
  .add("Edit Mode", () => (
    <MockedProvider>
      <EmailDetails
        sampleCompany={Option.none()}
        createEmail={action("create_email")}
        deleteEmail={action("delete_email")}
        email={mockEmails[1]}
        introductionEmailId={Option.none()}
        moveEmailToDirectory={action("move_email_to_directory")}
        sendEmail={action("send_email")}
        updateEmailMetadata={action("update_email_metadata")}
        updateEmailText={action("update_email_text")}
        scenarioStartedAt={Option.none()}
        scenarioFictiveDate={Option.none()}
        autoCompleteEmailAddresses={[]}
        updateEmail={action("update_email")}
        participantDataAndToken={{
          participantData: Option.of(participantDataMock[0]),
          token: Option.none()
        }}
        emailFiles={{
          downloadableEmailsFiles: [],
          availableEmailDownloadIds: [],
          availableEmailUploadFiles: [],
          addEmailFileToDownloads: action("add_file_to_download"),
          addEmailFileToUploads: action("add_file_to_upload"),
          removeEmailFileFromUploads: action("remove_file_from_upload")
        }}
      />
    </MockedProvider>
  ))

storiesOf("TabButtonBar", module)
  .add("Default", () => {
    const buttons = [
      {label: "Eingang(3)", icon: IconName.EmailIncoming, onClick: action("clicked_email_incoming")},
      {label: "Ausgang(2)", icon: IconName.EmailOutgoing, onClick: action("clicked_email_outgoing")},
      {label: "Entwürfe(1)", icon: IconName.EditBordered, onClick: action("clicked_email_drafts")},
      {label: "Papierkorb(12)", icon: IconName.Trash, onClick: action("clicked_email_trash")}
    ]
    return <TabButtonBar buttons={buttons} activeTabIndex={0} />
  })
  .add("Default with disabled", () => {
    const buttons = [
      {label: "Eingang(3)", icon: IconName.EmailIncoming, onClick: action("clicked_email_incoming")},
      {label: "Ausgang(2)", icon: IconName.EmailOutgoing, onClick: action("clicked_email_outgoing")},
      {label: "Entwürfe(1)", icon: IconName.EditBordered, onClick: action("clicked_email_drafts"), isDisabled: true},
      {label: "Papierkorb(12)", icon: IconName.Trash, onClick: action("clicked_email_trash")}
    ]
    return <TabButtonBar buttons={buttons} activeTabIndex={0} />
  })
  .add("Button default", () => (
    <TabButton icon={IconName.Trash} isActive={false} label={"Papierkorb"} onClick={action("clicked_tab_button")} />
  ))
  .add("Button active", () => (
    <TabButton icon={IconName.Trash} isActive={true} label={"Papierkorb"} onClick={action("clicked_tab_button")} />
  ))
  .add("Button disabled", () => (
    <TabButton
      icon={IconName.Trash}
      isActive={false}
      isDisabled={true}
      label={"Papierkorb"}
      onClick={action("clicked_tab_button")}
    />
  ))

storiesOf("Questionnaire", module)
  .addDecorator(Component => (
    <div css={{maxWidth: 900}}>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore-line*/}
      <Component />
    </div>
  ))
  .add("Default (windowed)", () => {
    return (
      <OfficeWindow
        customStyles={{backgroundColor: backgroundColorBright}}
        isFooterVisible={false}
        icon={IconName.Bell}
        label={"Ereignis"}
        toolType={ViewerToolsType.Event}>
        <QuestionnaireView
          questionnaire={questionnaireMock}
          onChangeFreeText={action("onChangeFreeText")}
          onSelectAnswer={action("onSelectAnswer")}
          onDeselectAnswer={action("onDeselectAnswer")}
        />
      </OfficeWindow>
    )
  })
  .add("Default (with results)", () => {
    return (
      <QuestionnaireView
        questionnaire={questionnaireMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
        results={participantResultsMock}
      />
    )
  })
  .add("Introduction", () => {
    return (
      <QuestionnaireIntroduction
        title={"Technische Störung"}
        description={
          "Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem."
        }
        binaryFile={singleChoiceQuestionWithImageMock.binaryFile || undefined}
      />
    )
  })
  .add("Single Choice Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={singleChoiceQuestionMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
      />
    )
  })
  .add("Single Choice With Image Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={singleChoiceQuestionWithImageMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
        onMediaEnlarged={action("onImageEnlarged")}
        onMediaShrunk={action("onImageShrunk")}
      />
    )
  })
  .add("Multiple Choice Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={multipleChoiceQuestionMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
      />
    )
  })
  .add("Multiple Choice With Extra Free Text Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={multipleChoiceQuestionWithExtraFreeTextMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
      />
    )
  })
  .add("Multiple Choice With Video Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={multipleChoiceQuestionWithVideoMock}
        onChangeFreeText={action("onChangeFreeText")}
        onSelectAnswer={action("onSelectAnswer")}
        onDeselectAnswer={action("onDeselectAnswer")}
        onVideoPlaybackEnded={action("onVideoPlaybackEnded")}
        onVideoPlaybackPaused={action("onVideoPlaybackPaused")}
        onVideoPlaybackStarted={action("onVideoPlaybackStarted")}
        onMediaEnlarged={action("onImageEnlarged")}
        onMediaShrunk={action("onImageShrunk")}
      />
    )
  })
  .add("Free Text Question", () => {
    return (
      <QuestionnaireQuestionComponent
        questionNumber={1}
        question={freeTextQuestionMock}
        onChangeFreeText={action("onChangeFreeText")}
      />
    )
  })

storiesOf("DatePicker", module)
  .add("Single Date Picker", () => (
    <SingleDatePicker label={"From"} value={new Date()} required={true} onChange={action("on_change_date")} />
  ))
  .add("Single Date Picker 100% Width", () => (
    <SingleDatePicker
      label={"From"}
      value={new Date()}
      required={true}
      onChange={action("on_change_date")}
      customStyles={css({
        ".react-date-picker": {
          width: "100%"
        }
      })}
    />
  ))
  .add("Single Date Picker minDate Today", () => (
    <SingleDatePicker
      label={"To"}
      value={new Date()}
      required={true}
      onChange={action("on_change_date")}
      minDate={new Date()}
    />
  ))
  .add("Date Range Picker", () => (
    <DateRangePicker label={"From"} value={new Date()} required={true} onChange={action("on_change_date")} />
  ))
  .add("Date Range Picker 100% Width", () => (
    <DateRangePicker
      label={"From"}
      value={new Date()}
      required={true}
      onChange={action("on_change_date")}
      customStyles={css({
        ".react-daterange-picker": {
          width: "100%"
        }
      })}
    />
  ))
  .add("Date Range Picker minDate Today", () => (
    <DateRangePicker
      label={"From"}
      value={new Date()}
      required={true}
      onChange={action("on_change_date")}
      minDate={new Date()}
    />
  ))

storiesOf("File Upload", module)
  .add("Dropzone", () => <FileDropzone onFilesAccepted={action("Files accepted")} />)
  .add("Modal", () => (
    <UploadFileModal
      acceptedFileTypes={[FileType.Graphic, FileType.PDF, FileType.TableCalculation, FileType.Video, FileType.Text]}
      onDismiss={action("onDismiss")}
      onBinariesSuccessfullyUploaded={action("Successfully Uploaded")}
    />
  ))
  .add("Modal - single item", () => (
    <UploadFileModal
      acceptedFileTypes={[FileType.Graphic, FileType.PDF, FileType.TableCalculation, FileType.Video, FileType.Text]}
      onDismiss={action("onDismiss")}
      isLimitedToSingleItem={true}
      onBinariesSuccessfullyUploaded={action("Successfully Uploaded")}
    />
  ))

storiesOf("ERP", module)
  .add("CellContent", () => {
    return (
      <CellContent
        cellData={{
          rowIndex: 1,
          entityId: 1,
          id: "rowId-Id",
          value: "test",
          contentType: ErpTableContentType.Text,
          columnName: "columnName",
          columnIndex: 1
        }}
      />
    )
  })
  .add("ErpNavigation", () => {
    return (
      <MockedProvider>
        <React.Fragment>
          <Global styles={globalStyle} />
          <ErpNavigation
            selectedNode={Option.none()}
            customStyles={{width: 300, maxHeight: 800}}
            navigationEntries={getStaticErpStructure("Story Company", getStoryTranslation)}
            onEntrySelected={action("onEntryItemSelection")}
          />
        </React.Fragment>
      </MockedProvider>
    )
  })
  .add("ErpContentView", () => {
    return (
      <ErpContentView
        selectedEntityId={Option.none()}
        customStyles={{maxHeight: "90vh"}}
        entities={Option.of(createErpMockEntities(60) as Array<ErpEntity>)}
        isLoadingEntities={false}
        columns={Option.of(erpColumnsMock)}
        label={"ErpContentView"}
        onEntityDoubleClicked={action("onEntityDoubleClicked")}
        onAddEntityClicked={action("onAddEntityClicked")}
      />
    )
  })
  .add("ErpCard", () => {
    return (
      <ErpCard title={"Angebotsübersicht"} onChangeSearch={action("onChangeSearch")}>
        CHILDREN
      </ErpCard>
    )
  })
  .add("ErpExcelImportDialog", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <ErpExcelImportDialog
        sampleCompanyId={sampleCompanyIdMock}
        onDismiss={action("erp_excel_import_dialog__dismiss")}
      />
    </React.Fragment>
  ))
  .add("ErpTable", () => (
    <div css={{height: 800}}>
      <ErpTable
        columns={erpTableColumns}
        rows={createRandomErpRows(erpTableColumns, 200)}
        onCellSelected={action("onCellSelected")}
        onRowDoubleClicked={action("onRowDoubleClicked")}
      />
    </div>
  ))
  .add("ErpTable (no rows)", () => (
    <div css={{height: 500}}>
      <ErpTable
        columns={erpTableColumns}
        rows={[]}
        onCellSelected={action("onCellSelected")}
        onRowDoubleClicked={action("onRowDoubleClicked")}
      />
    </div>
  ))

storiesOf("Card Component (Overview)", module)
  .add("Default", () => (
    <OverviewCard
      headerText={text("Title", "Nachschlagewerk")}
      text={text(
        "Card-Text",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, optio tempore. Natus sed maxime architecto? Error et sapiente ullam suscipit, optio alias. Minus fugit est mollitia possimus."
      )}
    />
  ))
  .add("With Footer", () => (
    <OverviewCard
      text={text(
        "Card-Text",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, optio tempore. Natus sed maxime architecto? Error et sapiente ullam suscipit, optio alias. Minus fugit est mollitia possimus."
      )}
      headerText={text("Title", "Nachschlagewerk")}
      footer={
        <CardFooter>
          <CardFooterItem icon={IconName.BookPage} text={text("Footer Item Text", "Text")} />
        </CardFooter>
      }
    />
  ))

storiesOf("Slide Menu", module)
  .add("Default", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <div css={Flex.row}>
        <SlideMenu
          renderDetailView={visible => <Card hasShadow={true}>Sample Detail View Visible: {visible}</Card>}
          renderToC={visible => <Card hasShadow={true}>Sample Toc View Visible: {visible}</Card>}
        />
        <Card customStyles={css({flex: flex1, width: "100%", height: 600, marginTop: headerHeight + subHeaderHeight})}>
          Some test content to illustrate behavor
        </Card>
      </div>
    </React.Fragment>
  ))
  .add("Disabled", () => (
    <React.Fragment>
      <Global styles={globalStyle} />
      <SlideMenu
        renderDetailView={visible => <Card hasShadow={true}>Sample Detail View Visible: {visible}</Card>}
        renderToC={visible => <Card hasShadow={true}>Sample Toc View Visible: {visible}</Card>}
        inactive={true}
      />
    </React.Fragment>
  ))

storiesOf("Finish Modal", module)
  .add("Questionnaire", () => (
    <FinishModal
      moduleType={ProjectModuleType.Questionnaire}
      onFinish={action("onFinish")}
      onAbort={action("onAbort")}
      title={text("Title", "Test")}
    />
  ))
  .add("Scenario", () => (
    <FinishModal
      moduleType={ProjectModuleType.Scenario}
      onFinish={action("onFinish")}
      onAbort={action("onAbort")}
      title={text("Title", "Test")}
    />
  ))

storiesOf("DHX Spreadsheet", module).add("Default", () => (
  <DhxSpreadsheet
    readonly={false}
    spreadsheet={spreadsheetsMock[1]}
    customStyles={{height: "100vh"}}
    t={fakeTranslate}
  />
))

storiesOf("Sub Header", module)
  .add("Default", () => <SubHeader />)
  .add("With Children", () => (
    <SubHeader>
      <Heading level={HeadingLevel.h3} color="primary">
        {text("Text 1", "Children")}
      </Heading>
      <Heading level={HeadingLevel.h3} color="primary">
        {text("Text 2", "Children")}
      </Heading>
      <Heading level={HeadingLevel.h3} color="primary">
        {text("Text 3", "Children")}
      </Heading>
    </SubHeader>
  ))
