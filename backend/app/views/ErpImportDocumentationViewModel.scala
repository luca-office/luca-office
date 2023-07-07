package views

import utils.ErpImportExportConfig._

object ErpImportDocumentationViewModel {

  case class Table(title: String, rows: Seq[Row])

  case class Row(
      columnName: String,
      allowedValues: String = "Text",
      isOptional: Boolean = false,
      foreignKey: String = "")

  private val salutationAllowedValues = "{Herr, Frau, Divers, Mr., Mrs., Ms.}"

  val supplierRows = Seq(
    Row("Lieferanten-Nr.", allowedValues = "Ganzzahl"),
    Row("Firma"),
    Row("PLZ"),
    Row("Ort"),
    Row("Straße"),
    Row("Land"),
    Row("Anrede Ansprechpartner", allowedValues = salutationAllowedValues),
    Row("Vorname Ansprechpartner"),
    Row("Nachname Ansprechpartner"),
    Row("Telefon"),
    Row("E-Mail"),
    Row("Notizen", isOptional = true)
  )

  val componentRows = Seq(
    Row("Komponenten-Nr.", allowedValues = "Ganzzahl"),
    Row("Artikelgruppe"),
    Row("Name"),
    Row("Einkaufspreis", allowedValues = "Geldbetrag"),
    Row("Marge (%)", allowedValues = "Prozent"),
    Row("Gebindegröße", allowedValues = "Positive Ganzzahl"),
    Row("Einheit"),
    Row("Bestand", allowedValues = "Nichtnegative Ganzzahl"),
    Row("Lagerkosten je Gebinde", allowedValues = "Geldbetrag"),
    Row("Lagerkosten", allowedValues = "Geldbetrag"),
    Row("Notizen", isOptional = true),
    Row("Lieferanten-Nr.", allowedValues = "Ganzzahl", foreignKey = "Lieferanten (Lieferanten-Nr.)")
  )

  val productRows = Seq(
    Row("Produkt-Nr.", allowedValues = "Ganzzahl"),
    Row("Name"),
    Row("Grundpreis netto", allowedValues = "Geldbetrag"),
    Row("MwSt.-Satz", allowedValues = "Prozent"),
    Row("Gebindegröße", allowedValues = "Positive Ganzzahl"),
    Row("Einheit"),
    Row("Bestand", allowedValues = "Nichtnegative Ganzzahl"),
    Row("Lagerkosten je Gebinde", allowedValues = "Geldbetrag"),
    Row("Lagerkosten", allowedValues = "Geldbetrag"),
    Row("Notizen", isOptional = true)
  )

  val componentProductRows = Seq(
    Row("Produkt-Nr.", allowedValues = "Ganzzahl", foreignKey = "Produkte (Produkt-Nr.)"),
    Row("Komponenten-Nr.", allowedValues = "Ganzzahl", foreignKey = "Komponenten (Komponenten-Nr.)"),
    Row("Komponentenanzahl pro Produkteinheit", allowedValues = "Positive Ganzzahl")
  )

  val customerRows = Seq(
    Row("Kunden-Nr.", allowedValues = "Ganzzahl"),
    Row("Anrede", allowedValues = salutationAllowedValues),
    Row("Vorname"),
    Row("Nachname"),
    Row("Firma", isOptional = true),
    Row("Straße"),
    Row("PLZ"),
    Row("Ort"),
    Row("Land"),
    Row("Telefon", isOptional = true),
    Row("E-Mail", isOptional = true),
    Row("Notizen", isOptional = true)
  )

  val orderRows = Seq(
    Row("Auftrags-Nr.", allowedValues = "Ganzzahl"),
    Row("Skonto", allowedValues = "Positiver Geldbetrag", isOptional = true),
    Row("Rabatt", allowedValues = "Positiver Geldbetrag", isOptional = true),
    Row("Versandkosten", allowedValues = "Nichtnegativer Geldbetrag"),
    Row("Lieferstatus", allowedValues = "{in Bearbeitung, ausgeliefert, in progress, delivered}"),
    Row("Lieferdatum", allowedValues = "Datum"),
    Row("Notizen", isOptional = true),
    Row("Kunden-Nr.", allowedValues = "Ganzzahl", foreignKey = "Kunden (Kunden-Nr.)"),
    Row("Personal-Nr.", allowedValues = "Ganzzahl", foreignKey = "Personal (Personal-Nr.)")
  )

  val orderItemRows = Seq(
    Row("Posten-Nr.", allowedValues = "Ganzzahl"),
    Row("Menge", allowedValues = "Positive Ganzzahl"),
    Row("Gesamtpreis netto", allowedValues = "Geldbetrag"),
    Row("Auftrags-Nr.", allowedValues = "Ganzzahl", foreignKey = "Aufträge (Auftrags-Nr.)"),
    Row("Produkt-Nr.", allowedValues = "Ganzzahl", foreignKey = "Produkte (Produkt-Nr.)")
  )

  val invoiceRows = Seq(
    Row("Rechnungs-Nr.", allowedValues = "Ganzzahl"),
    Row("Rechnungsdatum", allowedValues = "Datum"),
    Row("Zahlungsbedingungen"),
    Row("Gesamtpreis netto", allowedValues = "Geldbetrag"),
    Row("Steuerbetrag", allowedValues = "Geldbetrag"),
    Row("Gesamtpreis brutto", allowedValues = "Geldbetrag"),
    Row("Fälligkeitsdatum", allowedValues = "Datum"),
    Row("Gezahlt", allowedValues = "Nichtnegative Ganzzahl", isOptional = true),
    Row("Zahlstatus", allowedValues = "{bezahlt, offen, paid, open}"),
    Row("Mahngebühren", allowedValues = "Geldbetrag", isOptional = true),
    Row("Verzugszinsen", allowedValues = "Geldbetrag", isOptional = true),
    Row("Notizen", isOptional = true),
    Row("Auftrags-Nr.", foreignKey = "Aufträge (Auftrags-Nr.)")
  )

  val employeeRows = Seq(
    Row("Personal-Nr.", allowedValues = "Ganzzahl"),
    Row("Anrede", allowedValues = salutationAllowedValues),
    Row("Vorname"),
    Row("Nachname"),
    Row("Straße"),
    Row("PLZ"),
    Row("Stadt"),
    Row("Land"),
    Row("E-Mail", isOptional = true),
    Row("Telefonnummer", isOptional = true),
    Row("Abteilung"),
    Row("Funktion"),
    Row(
      "Beschäftigungsart",
      allowedValues = "{Vollzeit, Teilzeit, Aushilfe, Werkstudent, Full-Time, Part-Time, Temp, Working Student}"),
    Row("Vertragsbeginn", allowedValues = "Datum"),
    Row("Vertragsende", allowedValues = "Datum", isOptional = true),
    Row("Betriebsstandort"),
    Row("Abschluss", isOptional = true),
    Row("Weiterbildungen", allowedValues = "Text, kommasepariert", isOptional = true),
    Row("Steuerklasse"),
    Row("Familienstand", allowedValues = "{verheiratet, ledig, geschieden, married, single, divorced}"),
    Row("Anzahl Kinder", allowedValues = "Nichtnegative Ganzzahl", isOptional = true),
    Row("Notizen", isOptional = true)
  )

  val tables = Seq(
    Table(makeTitle(supplierSheetName), supplierRows),
    Table(makeTitle(componentSheetName), componentRows),
    Table(makeTitle(productSheetName), productRows),
    Table(makeTitle(componentProductSheetName), componentProductRows),
    Table(makeTitle(customerSheetName), customerRows),
    Table(makeTitle(orderSheetName), orderRows),
    Table(makeTitle(orderItemSheetName), orderItemRows),
    Table(makeTitle(invoiceSheetName), invoiceRows),
    Table(makeTitle(employeeSheetName), employeeRows)
  )

  private def makeTitle(sheetName: String) =
    sheetNameMapping.get(sheetName).map(_.mkString(" / ")).getOrElse("")
}
