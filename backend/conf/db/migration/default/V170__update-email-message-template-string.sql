UPDATE email
SET message = Replace(message, '{{EmailMessageTemplate_FormalSalutation}}', '{{FormalSalutation}}');

UPDATE email
SET message = Replace(message, '{{EmailMessageTemplate_Salutation}}', '{{Salutation}}');

UPDATE email
SET message = Replace(message, '{{EmailMessageTemplate_FirstName}}', '{{FirstName}}');

UPDATE email
SET message = Replace(message, '{{EmailMessageTemplate_LastName}}', '{{LastName}}');