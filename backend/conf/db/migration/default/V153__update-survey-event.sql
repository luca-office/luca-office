ALTER TYPE SURVEY_EVENT_TYPE RENAME VALUE 'NonBinary' TO 'EvaluateIntervention';
ALTER TYPE SURVEY_EVENT_TYPE RENAME VALUE 'AddSpreadsheetColumn' TO 'ReceiveEmail';
ALTER TYPE SURVEY_EVENT_TYPE RENAME VALUE 'AddSpreadsheetRow' TO 'DeleteEmailAttachment';
ALTER TYPE SURVEY_EVENT_TYPE RENAME VALUE 'RemoveSpreadsheetColumn' TO 'AddEmailAttachment';
ALTER TYPE SURVEY_EVENT_TYPE RENAME VALUE 'RemoveSpreadsheetRow' TO 'ViewReferenceBookBinary';

ALTER TYPE SURVEY_EVENT_TYPE ADD VALUE 'ReceiveSupervisorChatMessage';
