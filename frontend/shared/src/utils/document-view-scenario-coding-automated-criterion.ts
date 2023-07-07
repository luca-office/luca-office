import {ApolloClient} from "@apollo/client"
import {toFile} from "../converters"
import {IconName} from "../enums"
import {EmailQuery, EmailQueryVariables} from "../graphql/generated/EmailQuery"
import {
  ErpComponentErpProductsQuery,
  ErpComponentErpProductsQueryVariables
} from "../graphql/generated/ErpComponentErpProductsQuery"
import {FileQuery, FileQueryVariables} from "../graphql/generated/FileQuery"
import {GetErpComponentsQuery, GetErpComponentsQueryVariables} from "../graphql/generated/GetErpComponentsQuery"
import {GetErpCustomersQuery, GetErpCustomersQueryVariables} from "../graphql/generated/GetErpCustomersQuery"
import {GetErpEmployeesQuery, GetErpEmployeesQueryVariables} from "../graphql/generated/GetErpEmployeesQuery"
import {GetErpInvoicesQuery, GetErpInvoicesQueryVariables} from "../graphql/generated/GetErpInvoicesQuery"
import {GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables} from "../graphql/generated/GetErpOrderItemsQuery"
import {GetErpOrdersQuery, GetErpOrdersQueryVariables} from "../graphql/generated/GetErpOrdersQuery"
import {GetErpProductsQuery, GetErpProductsQueryVariables} from "../graphql/generated/GetErpProductsQuery"
import {GetErpSuppliersQuery, GetErpSuppliersQueryVariables} from "../graphql/generated/GetErpSuppliersQuery"
import {ErpTableType} from "../graphql/generated/globalTypes"
import {ReferenceBookChaptersQuery} from "../graphql/generated/ReferenceBookChaptersQuery"
import {
  emailQuery,
  erpComponentErpProductsQuery,
  erpComponentsQuery,
  erpCustomersQuery,
  erpEmployeesQuery,
  erpInvoicesQuery,
  erpOrderItemsQuery,
  erpOrdersQuery,
  erpProductsQuery,
  erpSuppliersQuery,
  fileQuery,
  referenceBookChaptersQuery
} from "../graphql/queries"
import {
  AutomatedCodingCriterionMetadata,
  DocumentViewScenarioCodingAutomatedCriterion,
  Email,
  File,
  ReferenceBookArticle
} from "../models"
import {LucaTFunction} from "../translations"
import {find} from "./array"
import {getDirectoryIcon} from "./email"
import {iconForFile} from "./file-utils"
import {Option} from "./option"

const getDocumentFile = (client: ApolloClient<unknown>, fileId: UUID): Promise<Option<File>> =>
  client
    .query<FileQuery, FileQueryVariables>({query: fileQuery, variables: {id: fileId}})
    .then(result => Option.of(result.data?.file).map(toFile))

const getDocumentEmail = (client: ApolloClient<unknown>, emailId: UUID): Promise<Option<Email>> =>
  client
    .query<EmailQuery, EmailQueryVariables>({query: emailQuery, variables: {id: emailId}})
    .then(result => Option.of(result.data?.email))

const getDocumentErpName = (
  t: LucaTFunction,
  client: ApolloClient<unknown>,
  erpTableType: ErpTableType,
  erpId: number,
  sampleCompanyId: UUID
): Promise<Option<string>> => {
  switch (erpTableType) {
    case ErpTableType.Component:
      return client
        .query<GetErpComponentsQuery, GetErpComponentsQueryVariables>({
          query: erpComponentsQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data ? find(({id}) => id === erpId, result.data.erpComponents).map(erp => erp.name) : Option.none()
        )
    case ErpTableType.ComponentProduct:
      return client
        .query<ErpComponentErpProductsQuery, ErpComponentErpProductsQueryVariables>({
          query: erpComponentErpProductsQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpComponentErpProducts).map(erp =>
                t("rating__document_erp_components_for_products", {
                  componentId: erp.componentId,
                  productId: erp.productId
                })
              )
            : Option.none()
        )
    case ErpTableType.Customer:
      return client
        .query<GetErpCustomersQuery, GetErpCustomersQueryVariables>({
          query: erpCustomersQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpCustomers).map(erp => `${erp.firstName} ${erp.lastName}`)
            : Option.none()
        )
    case ErpTableType.Employee:
      return client
        .query<GetErpEmployeesQuery, GetErpEmployeesQueryVariables>({
          query: erpEmployeesQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpEmployees).map(erp => `${erp.firstName} ${erp.lastName}`)
            : Option.none()
        )
    case ErpTableType.Invoice:
      return client
        .query<GetErpInvoicesQuery, GetErpInvoicesQueryVariables>({
          query: erpInvoicesQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpInvoices).map(
                erp => `${t("erp__table_label_invoice_id")} ${erp.id}`
              )
            : Option.none()
        )
    case ErpTableType.Order:
      return client
        .query<GetErpOrdersQuery, GetErpOrdersQueryVariables>({query: erpOrdersQuery, variables: {sampleCompanyId}})
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpOrders).map(
                erp => `${t("erp__table_label_order_id")} ${erp.id}`
              )
            : Option.none()
        )
    case ErpTableType.OrderItem:
      return client
        .query<GetErpOrderItemsQuery, GetErpOrderItemsQueryVariables>({
          query: erpOrderItemsQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpOrderItems).map(
                erp => `${t("erp__navigation_label_order_item")} ${erp.id}`
              )
            : Option.none()
        )
    case ErpTableType.Product:
      return client
        .query<GetErpProductsQuery, GetErpProductsQueryVariables>({
          query: erpProductsQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data ? find(({id}) => id === erpId, result.data.erpProducts).map(erp => erp.name) : Option.none()
        )
    case ErpTableType.Supplier:
      return client
        .query<GetErpSuppliersQuery, GetErpSuppliersQueryVariables>({
          query: erpSuppliersQuery,
          variables: {sampleCompanyId}
        })
        .then(result =>
          result.data
            ? find(({id}) => id === erpId, result.data.erpSuppliers).map(erp => `${erp.firstName} ${erp.lastName}`)
            : Option.none()
        )
    default:
      return Promise.reject()
  }
}

const getDocumentReferenceBookArticle = (
  client: ApolloClient<unknown>,
  referenceBookArticleId: UUID
): Promise<Option<ReferenceBookArticle>> =>
  client
    .query<ReferenceBookChaptersQuery>({query: referenceBookChaptersQuery})
    .then(result => {
      const articles = (result.data?.referenceBookChapters ?? []).reduce(
        (accumulator, chapter) => [...accumulator, ...chapter.articles],
        [] as ReferenceBookArticle[]
      )
      return find(article => article.id === referenceBookArticleId, articles)
    })

export const getDocumentViewScenarioCodingAutomatedCriterionData = (
  t: LucaTFunction,
  client: ApolloClient<unknown>,
  criterion: DocumentViewScenarioCodingAutomatedCriterion
): Promise<AutomatedCodingCriterionMetadata> => {
  if (criterion.fileId !== null) {
    return getDocumentFile(client, criterion.fileId).then(fileOption =>
      fileOption.map(file => ({name: file.name, icon: iconForFile(file)})).getOrElse({name: "", icon: IconName.File})
    )
  }

  if (criterion.emailId !== null) {
    return getDocumentEmail(client, criterion.emailId).then(emailOption =>
      emailOption
        .map(email => ({name: email.sender ?? "", icon: getDirectoryIcon(email.directory)}))
        .getOrElse({name: "", icon: IconName.Email})
    )
  }

  if (criterion.erpTableType !== null && criterion.erpRowId !== null && criterion.sampleCompanyId !== null) {
    return getDocumentErpName(t, client, criterion.erpTableType, criterion.erpRowId, criterion.sampleCompanyId).then(
      erpNameOption =>
        erpNameOption
          .map(erpName => ({
            name: erpName,
            icon: IconName.Database
          }))
          .getOrElse({name: "", icon: IconName.Database})
    )
  }

  if (criterion.referenceBookArticleId !== null) {
    return getDocumentReferenceBookArticle(client, criterion.referenceBookArticleId).then(articleOption =>
      articleOption
        .map(article => ({name: article.title, icon: IconName.BookPage}))
        .getOrElse({name: "", icon: IconName.BookPage})
    )
  }

  return Promise.reject()
}
