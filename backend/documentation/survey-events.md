# Erhebungs-Events

## Projekt

`StoreParticipantData` Der Benutzer gibt an, wie er angeredet werden möchte. Bei Nutzung eines Accounts werden die
Daten automatisch übernommen.

`StartProject` Der Benutzer startet das Projekt/die Erhebung.

`EndProject` Das Projekt wird durch Beenden des letzten Projektelements beendet.

`ResumeProject` Das Projekt wird wiederaufgenommen.

`StartScenario` Der Benutzer startet ein Szenario.

`EndScenario` Der Benutzer beendet ein Szenario.

`ResumeScenario` Der Benutzer nimmt ein Szenario wieder auf.

`StartQuestionnaire` Analog zu StartScenario.

`EndQuestionnaire` Analog zu EndScenario.

`ResumeQuestionnaire` Analog zu ResumeScenario.

## Szenario

`OpenTool` Ein Tool wird per Klick auf das entsprechende Icon in der Taskleiste geöffnet oder per Klick auf das
jeweilige "Fenster" in den Vordergrund geholt (nur möglich, wenn ein nicht bildschirmfüllendes Tool im Vordergrund und
ein bildschirmfüllendes Tool im Hintergrund geöffnet ist).

`CloseTool` Der Benutzer schließt das Tool.

`MinimizeTool` Der Benutzer minimiert das Tool.

`RestoreTool` Der Benutzer stellt ein minimiertes Tool wieder her.

`CopyToClipboard` Der Benutzer hat etwas in die Zwischenablage kopiert.

`PasteFromClipboard` Der Benutzer hat etwas aus der Zwischenablage eingefügt.

`StartEvent` Ein Fragebogen-Ereignis wird aktiviert.

`EndEvent` Ein Fragebogen-Ereignis wird beendet.

`ResumeEvent` Ein Fragebogen-Ereignis wird wiederaufgenommen.

`EvaluateIntervention` Eine Intervention wird ausgewertet. Wird die Bedingung zu "wahr" ausgewertet, wird die
Interventions-E-Mail versendet.

## Fragebogen

`SelectQuestionnaireAnswer` Der Benutzer wählt eine Antwort aus.

`DeselectQuestionnaireAnswer` Der Benutzer wählt eine Antwort ab.

`SelectQuestionnaireFreetextAnswer` Der Benutzer wählt eine Freitextantwort in einer Multiple-Choice- oder
Single-Choice-Frage aus.

`DeselectQuestionnaireFreetextAnswer` Der Benutzer wählt eine Freitextantwort in einer Multiple-Choice- oder
Single-Choice-Frage ab.

`UpdateQuestionnaireFreeTextAnswer` Der Benutzer ändert den Antworttext einer Freitextfrage. Dieses Event wird auch für
die "Sonstiges"-Option bei geschlossenen Items (Multiple-Choice oder Single-Choice) verwendet.

`EnlargeQuestionnaireImage` Der Benutzer vergrößert das Bild eines Fragebogens.

`ShrinkQuestionnaireImage` Der Benutzer verkleinert das Bild eines Fragebogens wieder.

`PlayQuestionnaireVideo` Der Benutzer spielt das Video eines Fragebogens ab.

`PauseQuestionnaireVideo` Der Benutzer pausiert das Video eines Fragebogens.

`EnterFullscreenQuestionnaireVideo` Der Benutzer aktiviert den Vollbildmodus des Video-Players eines Fragebogens.

`LeaveFullscreenQuestionnaireVideo` Der Benutzer deaktiviert den Vollbildmodus des Video-Players eines Fragebogens.

`QuestionnaireVideoPlaybackEnded` Das Video eines Fragebogens wurde vollständig abgespielt. Hierbei wird allerdings
nicht sichergestellt, dass der Benutzer nicht Teile des Videos übersprungen hat.

`EnlargeQuestionnaireQuestionImage` Analog zu EnlargeQuestionnaireQuestionImage.

`ShrinkQuestionnaireQuestionImage` Analog zu ShrinkQuestionnaireQuestionImage.

`PlayQuestionnaireQuestionVideo` Analog zu PlayQuestionnaireQuestionVideo.

`PauseQuestionnaireQuestionVideo` Analog zu PauseQuestionnaireQuestionVideo.

`EnterFullscreenQuestionnaireQuestionVideo` Analog zu EnterFullscreenQuestionnaireQuestionVideo.

`LeaveFullscreenQuestionnaireQuestionVideo` Analog zu LeaveFullscreenQuestionnaireQuestionVideo.

`QuestionnaireQuestionVideoPlaybackEnded` Analog zu QuestionnaireQuestionVideoPlaybackEnded.

## Tools

### E-Mail-Client

`CreateEmail` Der Benutzer legt eine neue E-Mail an.

`AnswerEmail` Der Benutzer beantwortet eine vorhandene E-Mail mithilfe des "Antworten"-Buttons.

`ShowEmail` Der Benutzer öffnet eine E-Mail, dabei wird nicht unterschieden, ob es sich um einen Draft handelt oder
nicht.

`DeleteEmailDraft` Der Benutzer löscht einen Entwurf. Dieser wird komplett gelöscht.

`MoveEmailToTrash` Der Benutzer löscht eine E-Mail. Diese wird in den Papierkorb verschoben. Von dort aus kann nicht
mehr gelöscht werden.

`SendEmail` Der Benutzer schickt eine E-Mail ab.

`SelectEmailDirectory` Der Benutzer wählt einen Ordner aus.

`SearchEmails` Der Benutzer durchsucht die E-Mails.

`UpdateEmail` Änderungen der Metadaten einer E-Mail (Empfänger, Betreff etc.). Änderungen sollen nicht zeichenweise
erfasst werden, sondern bei Fokusverlust oder nach einer bestimmten Zeitspanne.

`UpdateEmailText` Bei jeder Änderung des Texts einer E-Mail wird der vollständige neue Text erfasst. Eine Änderung kann
normales Tippen eines Zeichens oder aber auch z. B. das Einfügen eines ganzen Worts sein.

`DownloadEmailAttachment` Der Benutzer lädt den Anhang einer E-Mail herunter.

`AddEmailAttachment` Der Benutzer fügt einem E-Mail-Entwurf einen Anhang hinzu.

`DeleteEmailAttachment` Der Benutzer entfernt einen Anhang in einem E-Mail-Entwurf.

`ReceiveEmail` Der E-Mail-Client empfängt eine E-Mail.

### Taschenrechner

`CalculatorKeyPressed` Der Benutzer hat eine Taste gedrückt.

### Dateibrowser

`ViewDirectory` Ein Ordner wird ausgewählt, die Detail-Ansicht öffnet sich.

`ViewDownloadsDirectory` Der vorgegebene Ordner "Downloads" wird ausgewählt, die Detail-Ansicht öffnet sich.

`ViewFile` Eine Datei wird ausgewählt, die Detail-Ansicht öffnet sich.

### Nachschlagewerke

`ViewReferenceBookChapter` Ein Kapitel wird ausgewählt, die Detail-Ansicht öffnet sich.

`ViewReferenceBookArticle` Ein Artikel wird ausgewählt, die Detail-Ansicht öffnet sich.

`ViewReferenceBookBinary` Der Benutzer öffnet die Binärdatei eines Artikels im entsprechenden Viewer-Tool.

`SearchReferenceBook` Der Benutzer durchsucht das Nachschlagewerk.

### Image-Viewer

`OpenImageBinary` Der Benutzer öffnet eine Bilddatei im Viewer-Tool.

`CloseImageBinary` Der Benutzer schließt eine Binärdatei im Viewer-Tool.

`SelectImageBinary` Der Benutzer wählt eine Binärdatei im Viewer-Tool aus.

### Video-Viewer

`OpenVideoBinary` Analog zu OpenImageBinary.

`CloseVideoBinary` Analog zu CloseImageBinary.

`SelectVideoBinary` Analog zu SelectImageBinary.

`PlayVideo` Das Video wird gestartet.

`PauseVideo` Das Video wird pausiert.

### PDF-Viewer

`OpenPdfBinary` Analog zu OpenImageBinary.

`ClosePdfBinary` Analog zu CloseImageBinary.

`SelectPdfBinary` Analog zu SelectImageBinary.

### Spreadsheet

`OpenSpreadsheet` Eine Tabellenkalkulation wird geöffnet.

`CloseSpreadsheet` Eine Tabellenkalkulation wird geschlossen.

`SelectSpreadsheet` Eine Tabellenkalkulation wird im Tabellenkalkulation-Editor ausgewählt.

`UpdateSpreadsheetCellValue` Der Benutzer ändert den Inhalt einer Zelle.

`UpdateSpreadsheetCellType` Der Benutzer ändert den Typ (das Format) einer Zelle.

`UpdateSpreadsheetCellStyle` Der Benutzer ändert eine Darstellungsoption (z. B. die Hintergrundfarbe) einer Zelle.

`SelectSpreadsheetCell` Der Benutzer wählt eine Zelle aus.

`SelectSpreadsheetCellRange` Der Benutzer wählt mehrere Zellen aus.

### Text-Editor

`OpenTextDocument` Ein Textdokument wird geöffnet.

`CloseTextDocument` Ein Textdokument wird geschlossen.

`SelectSpreadsheet` Ein Textdokument wird im Text-Dokument-Editor ausgewählt.

`UpdateTextDocumentContent` Der Benutzer ändert den Inhalt eines Textdokuments.

### ERP

#### Tabellenansicht

`ErpExpandDirectory` Der Benutzer klappt einen Ordner auf.

`ErpCollapseDirectory` Der Benutzer klappt einen Ordner zu.

`ErpSelectTable` Der Benutzer wählt eine Tabelle aus.

`ErpSelectRow` Der Benutzer selektiert eine Zeile der ausgewählten Tabelle.

`ErpDeselectRow` Der Benutzer deselektiert eine Zeile der ausgewählten Tabelle.

`ErpSelectAllRows` Der Benutzer selektiert alle Zeilen der ausgewählten Tabelle.

`ErpDeselectAllRows` Der Benutzer deselektiert alle Zeilen der ausgewählten Tabelle.

`ErpSelectCell` Der Benutzer selektiert eine Zelle der ausgewählten Tabelle.

`ErpCopyCellContentToClipboard` Der Benutzer kopiert den Inhalt einer Zelle in die Zwischenablage.

`ErpSearchTable` Der Benutzer durchsucht die ausgewählte Tabelle.

`ErpUpdateShowOnlySelectedRows` Der Benutzer aktiviert oder deaktiviert den Tabellen-Filter "Nur selektierte Zeilen
anzeigen".

`ErpSortTable` Der Benutzer sortiert die ausgewählte Tabelle.

`ErpOpenRow` Der Benutzer öffnet die Detail-Ansicht eines Datensatzes.

#### Detail-Ansicht eines Datensatzes

`ErpOpenAttachment` Der Benutzer öffnet den Anhang des ausgewählten Datensatzes.

`ErpCopyCoreDataToClipboard` Der Benutzer kopiert die Stammdaten des ausgewählten Datensatzes in die Zwischenablage.

`ErpCopyCoreDataAndReferencesToClipboard` Der Benutzer kopiert die Stammdaten und die Verweise des ausgewählten
Datensatzes in die Zwischenablage.

`ErpCopyReferenceToClipboard` Der Benutzer kopiert einen Verweis des ausgewählten Datensatzes in die Zwischenablage.

`ErpNavigateToReference` Der Benutzer navigiert zu einem Verweis des ausgewählten Datensatzes.

`ErpNavigateBack` Der Benutzer navigiert einen Schritt zurück.

`ErpCloseRow` Der Benutzer schließt die Detail-Ansicht eines Datensatzes.

## Notizen-Tool

`UpdateNotesText` Der Benutzer ändert den Text im Notizen-Tool.

## Ablaufsteuerung einer manuellen Erhebung

`StartSurveyCommand` Der Versuchsleiter startet die Erhebung.

`EndSurveyCommand` Der Versuchsleiter beendet die Erhebung.

`StartScenarioCommand` Der Versuchsleiter startet ein Szenario.

`StartQuestionnaireCommand` Der Versuchsleiter startet einen Fragebogen.

## Chat

`SendSupervisorChatMessage` Der Versuchsleiter verschickt eine Chat-Nachricht an einen bestimmten Teilnehmer. Soll eine
Nachricht an mehrere Teilnehmer verschickt werden, wird pro Teilnehmer ein Event erzeugt.

`SendParticipantChatMessage` Ein Teilnehmer verschickt eine Chat-Nachricht an den Versuchsleiter.

`ReceiveSupervisorChatMessage` Das Chat-Tool empfängt eine Nachricht des Versuchsleiters.
