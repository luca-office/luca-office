/* eslint-disable max-lines */

import {ErpNavigationEntryId, ErpNavigationEntryType, ErpType} from "../../../enums"
import {ErpEntry} from "../../../models"
import {LucaTFunction} from "../../../translations"

export const getStaticErpStructure = (companyName: string, t: LucaTFunction): Array<ErpEntry> => [
  {
    id: ErpNavigationEntryId.Company,
    type: ErpNavigationEntryType.Folder,
    label: companyName,
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.UserManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_user_management"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.Office,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_office"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.PhoneIntegration,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_phone_integration"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.AppointmentCalendar,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_appointment_calendar"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.OccupancyOfSpace,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_occupancy_of_space"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.ApplicationSpanningComponents,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_application_spanning_components"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.AuditManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_audit_management"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.eDocument,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_e_document"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.Logistics,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_logistics"),
    isLocked: false,
    children: [
      {
        id: ErpNavigationEntryId.MaterialsAdministration,
        type: ErpNavigationEntryType.Folder,
        label: t("erp__navigation_label_materials_administration"),
        isLocked: false,
        children: [
          {
            id: ErpNavigationEntryId.Suppliers,
            type: ErpNavigationEntryType.Table,
            erpType: ErpType.Supplier,
            label: t("erp__navigation_label_suppliers"),
            isLocked: false
          },
          {
            id: ErpNavigationEntryId.StockTake,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_stock_take"),
            isLocked: true
          },
          {
            id: ErpNavigationEntryId.ExternalTrade,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_external_trade"),
            isLocked: true
          }
        ]
      },
      {
        id: ErpNavigationEntryId.Sales,
        type: ErpNavigationEntryType.Folder,
        label: t("erp__navigation_label_sales"),
        isLocked: false,
        children: [
          {
            id: ErpNavigationEntryId.CoreDataSales,
            type: ErpNavigationEntryType.Folder,
            label: t("erp__navigation_label_core_data"),
            isLocked: false,
            children: [
              {
                id: ErpNavigationEntryId.Customers,
                type: ErpNavigationEntryType.Table,
                erpType: ErpType.Customer,
                label: t("erp__navigation_label_customers"),
                isLocked: false
              }
            ]
          },
          {
            id: ErpNavigationEntryId.Products,
            type: ErpNavigationEntryType.Table,
            erpType: ErpType.Product,
            label: t("erp__navigation_label_products"),
            isLocked: false
          },
          {
            id: ErpNavigationEntryId.Shipping,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_shipping"),
            isLocked: true
          },
          {
            id: ErpNavigationEntryId.Billing,
            type: ErpNavigationEntryType.Folder,
            label: t("erp__navigation_label_billing"),
            isLocked: false,
            children: [
              {
                id: ErpNavigationEntryId.Offers,
                type: ErpNavigationEntryType.Table,
                erpType: ErpType.Order,
                label: t("erp__navigation_label_orders"),
                isLocked: false
              },
              {
                id: ErpNavigationEntryId.OrderItems,
                type: ErpNavigationEntryType.Table,
                erpType: ErpType.OrderItem,
                label: t("erp__navigation_label_order_items"),
                isLocked: false
              },
              {
                id: ErpNavigationEntryId.Invoices,
                type: ErpNavigationEntryType.Table,
                erpType: ErpType.Invoice,
                label: t("erp__navigation_label_invoices"),
                isLocked: false
              }
            ]
          }
        ]
      },
      {
        id: ErpNavigationEntryId.Production,
        type: ErpNavigationEntryType.Folder,
        label: t("erp__navigation_label_production"),
        isLocked: false,
        children: [
          {
            id: ErpNavigationEntryId.Components,
            type: ErpNavigationEntryType.Table,
            erpType: ErpType.Component,
            label: t("erp__navigation_label_components"),
            isLocked: false
          },
          {
            id: ErpNavigationEntryId.ComponentsForProducts,
            type: ErpNavigationEntryType.Table,
            erpType: ErpType.ComponentProduct,
            label: t("erp__navigation_label_components_for_products"),
            isLocked: false
          },
          {
            id: ErpNavigationEntryId.SalesPlanning,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_sales_planning"),
            isLocked: true
          },
          {
            id: ErpNavigationEntryId.ProductionPlanning,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_production_planning"),
            isLocked: true
          },
          {
            id: ErpNavigationEntryId.RequirementsPlanning,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_requirements_planning"),
            isLocked: true
          },
          {
            id: ErpNavigationEntryId.ProductCostPlanning,
            type: ErpNavigationEntryType.Table,
            label: t("erp__navigation_label_product_cost_planning"),
            isLocked: true
          }
        ]
      },
      {
        id: ErpNavigationEntryId.CustomerService,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_customer_service"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.QualityManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_quality_management"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.LogisticsControlling,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_logistics_controlling"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.CoreFunctions,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_core_functions"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.Accounting,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_accounting"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.Finance,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_finance"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.Controlling,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_controlling"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.StrategicEnterpriseManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_strategic_enterprise_management"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.PropertyManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_property_management"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.Staff,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_staff"),
    isLocked: false,
    children: [
      {
        id: ErpNavigationEntryId.StaffTable,
        type: ErpNavigationEntryType.Table,
        erpType: ErpType.Employee,
        label: t("erp__navigation_label_staff_table"),
        isLocked: false
      },
      {
        id: ErpNavigationEntryId.StaffTimeManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_staff_time_management"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.Payroll,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_payroll"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.TrainingNeedsManagement,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_training_needs_management"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.InformationSystem,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_information_system"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.InfoSystems,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_info_systems"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.FinancialAnalytics,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_financial_analytics"),
        isLocked: true
      },
      {
        id: ErpNavigationEntryId.ProductLifecycleAnalytics,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_product_lifecycle_analytics"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.Tools,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_tools"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.Administration,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_administration"),
        isLocked: true
      }
    ]
  },
  {
    id: ErpNavigationEntryId.WebClientUiFramework,
    type: ErpNavigationEntryType.Folder,
    label: t("erp__navigation_label_web_client_ui_framework"),
    isLocked: true,
    children: [
      {
        id: ErpNavigationEntryId.EnterpriseSearch,
        type: ErpNavigationEntryType.Table,
        label: t("erp__navigation_label_enterprise_search"),
        isLocked: true
      }
    ]
  }
]
