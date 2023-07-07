# Luca Backend

## Änderungen am Datenbankschema

Zum Aufbau und zur Veränderung des Datenbankschemas wird Flyway (https://flywaydb.org/) eingesetzt. Um eine Änderung am
Datenbankschema vorzunehmen, müssen die folgenden Schritte durchgeführt werden:

* Migrations-Datei im SQL-Format unter `conf/db/migration/default` anlegen und dabei das Namensschema der Dateien
  einhalten.
* Soll ein neuer Enum auf Datenbankebene eingeführt werden, muss das `enumMapping` in der
  Datei `app/codegen/CustomTyper` angepasst und der Enum im Anwendungscode unter `app/enums` angelegt werden.
* Die Anwendung starten und eine beliebige Route aufrufen. Flyway bietet an, die Migration durchzuführen.
* Nach Durchführen der Migration die Anwendung mit der Route `codegen` (http://localhost:9000/codegen) aufrufen. Die
  Datei `app/database/generated/public/PublicExtensions.scala` wird neu generiert.
* In der neu generierten Datei `PublicExtensions.scala` müssen von Hand alle Vorkommen von `java.sql.Array`
  durch `Seq[String]` ersetzt werden. Leider bietet der von Quill bereitgestellte Code-Generator bisher keine bessere
  Unterstützung für Arrays.
* Anwendungscode anpassen.

## Code über GraphQL-Schema generieren

Soll eine neue Entität eingeführt werden, kann über den einfachen Code-Generator im Hauptordner `backend-codegen` des
Projekts Backend-Code generiert werden. Die folgenden Schritte müssen durchgeführt werden:

* Das GraphQL-Schema in der Datei `backend-codegen/input/schema.dsl` anpassen.
* `yarn generate` im Ordner `backend-codegen` ausführen.
* Die gewünschten Dateien aus dem Ordner `backend-codegen/out` in den Backend-Ordner kopieren.
* Den neuen Typen in den Dateien `app/controllers/MainController`, `app/graphql/CustomContext`, `app/graphql/Query`,
  `app/graphql/Mutation`, `app/graphql/ObjectTypes` und `app/graphql/InputObjectTypes` einbinden. Im
  Ordner `app/services/converters` muss ein neuer Converter angelegt werden, der den neuen Creation-Typen in den neuen
  Model-Typen konvertieren kann. Für eventuell weitere nötige Anpassungen ist der Scala-Compiler eine gute Hilfe.

## Hinweise

### SBT-Parameter

Flyway kann per Command-Line-Parameter konfiguriert werden, Datenbankmigrationen automatisch durchzuführen:

`sbt run -Ddb.default.migration.auto=true`

Um keine Logs des generierten SQLs von Quill zu sehen, kann die Anwendung wie folgt gestartet werden:

`sbt run -Dquill.macro.log=false`

### Unbenutzte Imports

In der Serviceschicht gibt es relativ oft die Imports

```
import database.Encoders._
import database.EnumEncoders._
```

Diese werden leider potenziell von der IDE als unbenutzt angezeigt. Das liegt vermutlich daran, dass Quill viel mit
Makros arbeitet. IntelliJ bietet die Möglichkeit, solche Imports zu markieren, so dass sie nicht automatisch entfernt
werden, wenn man die Funktion "Imports optimieren" verwendet.