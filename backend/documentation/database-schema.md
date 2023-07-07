### Inhaltliche Anmerkungen zu einzelnen Feldern

#### scenario

* `date`: Fiktives Datum, an dem das Szenario "stattfindet"

#### sample_company

* `directory_id`: Wird beim Anlegen des Modellunternehmens erzeugt
* `profile_file_id`: `directory_id` des Files wird auf auf `directory_id` gesetzt
* `logo_file_id`: `directory_id` des Files wird auf `directory_id` gesetzt

#### reference_book

* `published_at`: Ein Nachschlagewerk wird sichtbar für alle Benutzer, wenn `published_at` auf einen Zeitpunkt gesetzt
  wird. Ist der Wert einmal gesetzt, darf er nicht mehr geändert werden.

#### erp_employee

* `employment_ends_at`: `null` bedeutet "unbefristet"

#### scenario_coding_automated_criterion

* `spreadsheet_row_index`: `null` und `spreadsheet_column_index`: `null` bedeuten im Spreadsheet-Fall einer
  Eingabewertüberprüfung, dass die ganze Tabelle geprüft werden soll.


#### survey_event

* `survey_event.invitaion_id`: `null` bedeutet, dass es sich um ein **Supervisor-Survey-Event** handelt. 
Also ein Survey-Event, das von einem Supervisor ausgelöst wurde.
* `survey_event.invitaion_id`: `UUID/non-null` bedeutet, dass es sich um ein **Participant-Survey-Event** handelt.
    Also ein Survey-Event, das von einem Participant ausgelöst wurde.
* `survey_event.index`: Gibt die Reihenfolge der Survey-Events an. 
Der Index ist fortlaufend und hat einen einzigartigen Wert für folgende Bedingungen:
  * der Index-Wert ist pro Survey für Supervisor-Survey-Events einzigartig
  * der Index-Wert ist pro Survey und für Participant-Survey-Events eines Participants einzigartig
