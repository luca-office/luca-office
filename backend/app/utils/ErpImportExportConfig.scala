package utils

import database.generated.public._
import enums.DeliveryStatus.InProcess
import enums.EmploymentMode.FullTime
import enums.FamilyStatus.Married
import enums.PaymentStatus.Paid
import enums.Salutation.{Mr, Mrs}

import java.time.Instant
import java.util.UUID

object ErpImportExportConfig {

  val componentSheetName = "Komponenten"
  val componentProductSheetName = "Komponentenzuordnungen"
  val customerSheetName = "Kunden"
  val employeeSheetName = "Personal"
  val invoiceSheetName = "Rechnungen"
  val orderItemSheetName = "Auftragsposten"
  val orderSheetName = "Aufträge"
  val productSheetName = "Produkte"
  val supplierSheetName = "Lieferanten"

  val documentationSheetName = "Dokumentation"

  val sheetNameMapping: Map[String, Seq[String]] = Map(
    componentSheetName -> Seq(componentSheetName, "Components"),
    componentProductSheetName -> Seq(componentProductSheetName, "Allocation of Components"),
    customerSheetName -> Seq(customerSheetName, "Customers"),
    employeeSheetName -> Seq(employeeSheetName, "Employees"),
    invoiceSheetName -> Seq(invoiceSheetName, "Invoices"),
    orderItemSheetName -> Seq(orderItemSheetName, "Order Items"),
    orderSheetName -> Seq(orderSheetName, "Orders"),
    productSheetName -> Seq(productSheetName, "Products"),
    supplierSheetName -> Seq(supplierSheetName, "Suppliers"),
    documentationSheetName -> Seq(documentationSheetName, "Documentation")
  )

  val supplierHeaderLabels = Seq(
    "Lieferanten-Nr.",
    "Firma",
    "PLZ",
    "Ort",
    "Straße",
    "Land",
    "Anrede Ansprechpartner",
    "Vorname Ansprechpartner",
    "Nachname Ansprechpartner",
    "Telefon",
    "E-Mail",
    "Notizen"
  )

  val componentHeaderLabels = Seq(
    "Komponenten-Nr.",
    "Artikelgruppe",
    "Name",
    "Einkaufspreis",
    "Marge (%)",
    "Gebindegröße",
    "Einheit",
    "Bestand",
    "Lagerkosten je Gebinde",
    "Lagerkosten",
    "Notizen",
    "Lieferanten-Nr."
  )

  val productHeaderLabels = Seq(
    "Produkt-Nr.",
    "Name",
    "Grundpreis netto",
    "MwSt.-Satz",
    "Gebindegröße",
    "Einheit",
    "Bestand",
    "Lagerkosten je Gebinde",
    "Lagerkosten",
    "Notizen")

  val componentProductHeaderLabels =
    Seq("Produkt-Nr.", "Komponenten-Nr.", "Komponentenanzahl pro Produkteinheit")

  val customerHeaderLabels =
    Seq(
      "Kunden-Nr.",
      "Anrede",
      "Vorname",
      "Nachname",
      "Firma",
      "Straße",
      "PLZ",
      "Ort",
      "Land",
      "Telefon",
      "E-Mail",
      "Notizen")

  val orderHeaderLabels = Seq(
    "Auftrags-Nr.",
    "Skonto",
    "Rabatt",
    "Versandkosten",
    "Lieferstatus",
    "Lieferdatum",
    "Notizen",
    "Kunden-Nr.",
    "Personal-Nr.")

  val orderItemHeaderLabels = Seq("Posten-Nr.", "Menge", "Gesamtpreis netto", "Auftrags-Nr.", "Produkt-Nr.")

  val invoiceHeaderLabels = Seq(
    "Rechnungs-Nr.",
    "Rechnungsdatum",
    "Zahlungsbedingungen",
    "Gesamtpreis netto",
    "Steuerbetrag",
    "Gesamtpreis brutto",
    "Fälligkeitsdatum",
    "Gezahlt",
    "Zahlstatus",
    "Mahngebühren",
    "Verzugszinsen",
    "Notizen",
    "Auftrags-Nr."
  )

  val employeeHeaderLabels = Seq(
    "Personal-Nr.",
    "Anrede",
    "Vorname",
    "Nachname",
    "Straße",
    "PLZ",
    "Stadt",
    "Land",
    "E-Mail",
    "Telefonnummer",
    "Abteilung",
    "Funktion",
    "Beschäftigungsart",
    "Vertragsbeginn",
    "Vertragsende",
    "Betriebsstandort",
    "Abschluss",
    "Weiterbildungen",
    "Steuerklasse",
    "Familienstand",
    "Anzahl Kinder",
    "Notizen"
  )

  val supplierTemplateRow: ErpSupplier = ErpSupplier(
    id = 86968,
    salutation = Mrs,
    firstName = "Melanie",
    lastName = "Gerste",
    company = "Berg-Mörger Wheels GmbH & Co. KG",
    addressLine = "Motzstr. 92",
    postalCode = "73492",
    city = "Schwabsberg",
    country = "Deutschland",
    phone = "07961 73283-60",
    email = "mg@b-m-wheels.de",
    note = Some("kann auch kurzfristig große Mengen liefern"),
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val componentTemplateRow: ErpComponent = ErpComponent(
    id = 470012,
    name = "Salvadore",
    category = "Sattel",
    purchasingPriceInCents = 1499,
    margin = 0.12,
    packSize = 1,
    unit = "Stk",
    availableStock = 3,
    stockCostPerUnitInCents = 33300,
    stockCostTotalInCents = 99900,
    note = None,
    supplierId = 86968,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val productTemplateRow: ErpProduct = ErpProduct(
    id = 81,
    name = "Office-Fly",
    netPriceInCents = 199500,
    taxRate = 0.19,
    unit = "Stk",
    packSize = 1,
    availableStock = 3,
    stockCostPerUnitInCents = 33300,
    stockCostTotalInCents = 99900,
    note = None,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val componentProductTemplateRow: ErpComponentErpProduct = ErpComponentErpProduct(
    id = -1,
    quantity = 1,
    componentId = 470012,
    productId = 81,
    sampleCompanyId = UUID.randomUUID()
  )

  val customerTemplateRow: ErpCustomer = ErpCustomer(
    id = 11112,
    salutation = Mr,
    firstName = "Louis",
    lastName = "Brüggemann",
    company = None,
    addressLine = "Heisstr. 157",
    postalCode = "29439",
    city = "Lüchow",
    country = "Deutschland",
    phone = Some("0170 / 3850955"),
    email = Some("louis.brueggemann@email.de"),
    note = None,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val orderTemplateRow: ErpOrder = ErpOrder(
    id = 33362,
    cashbackInCents = Some(500),
    discountInCents = Some(1000),
    deliveryChargeInCents = 490,
    deliveryStatus = InProcess,
    deliveryDate = Instant.parse("2022-09-06T22:00:00.000Z"),
    note = Some("3% Skonto gewährt"),
    customerId = 11112,
    employeeId = 9124,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val orderItemTemplateRow: ErpOrderItem = ErpOrderItem(
    id = 1,
    quantity = 5,
    totalNetInCents = 10000,
    orderId = 33362,
    productId = 81,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val invoiceTemplateRow: ErpInvoice = ErpInvoice(
    id = 1498,
    invoiceDate = Instant.parse("2022-09-08T22:00:00.000Z"),
    paymentTerms = "3% Skonto, 30 T netto",
    totalNetInCents = 10000,
    taxAmountInCents = 1900,
    totalGrossInCents = 11900,
    dueDate = Instant.parse("2022-10-10T22:00:00.000Z"),
    amountPaidInCents = Some(10000),
    paymentStatus = Paid,
    reminderFeeInCents = Some(500),
    defaultChargesInCents = None,
    note = None,
    orderId = 33362,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )

  val employeeTemplateRow: ErpEmployee = ErpEmployee(
    id = 9124,
    salutation = Mr,
    firstName = "Martin",
    lastName = "Böschek",
    addressLine = "Wilhelmstraße 39",
    postalCode = "10405",
    city = "Berlin",
    country = "Deutschland",
    email = Some("martin.böschek@velocity-bikes.de"),
    phone = Some("0172 566 010"),
    department = "Einkauf",
    jobTitle = "Abteilungsleiter",
    employmentMode = FullTime,
    employedAt = Instant.parse("2009-01-31T23:00:00.000Z"),
    employmentEndsAt = None,
    site = "Berlin",
    graduation = Some("Industriekaufmann"),
    furtherEducation = Seq("IHK Weiterbilung Lieferantenmanagement", "SAP ERP Experte"),
    taxClass = "4",
    familyStatus = Married,
    childCount = Some(0),
    note = None,
    binaryFileId = None,
    sampleCompanyId = UUID.randomUUID()
  )
}
