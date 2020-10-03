import React from "react";

import { Button } from "baseui/button";
import {
  CategoricalColumn,
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Show } from "baseui/icon";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";

import { ResourceRequests } from "../../graphql/types";
import { Loading } from "../common/Loading";

type RowDataT = ResourceRequests;

interface ResourceRequestTableProps {
  data?: RowDataT[];
  loading: boolean;
}

export const ResourceRequestTable: React.FC<ResourceRequestTableProps> = (
  props
) => {
  var router = useRouter();

  var rows = props.data?.map((request) => ({
    id: request.referenceNumber,
    data: request,
  }));

  const columns = [
    StringColumn({
      title: "Reference Number",
      mapDataToValue: (data: RowDataT) => data.referenceNumber,
    }),
    CategoricalColumn({
      title: "Manager Name",
      mapDataToValue: (data: RowDataT) => data.managerName,
    }),
    CategoricalColumn({
      title: "Function",
      mapDataToValue: (data: RowDataT) => data.function,
    }),
    CategoricalColumn({
      title: "Title",
      mapDataToValue: (data: RowDataT) => data.title,
    }),
    StringColumn({
      title: "Start Date",
      mapDataToValue: (data: RowDataT) => data.startDate,
    }),
    StringColumn({
      title: "End Date",
      mapDataToValue: (data: RowDataT) => data.endDate,
    }),
    NumericalColumn({
      title: "Probability",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.probability,
    }),
    NumericalColumn({
      title: "Percentage",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.percentage,
    }),
    CategoricalColumn({
      title: "Status",
      mapDataToValue: (data: RowDataT) => data.status,
    }),
    StringColumn({
      title: "Core Team Member",
      mapDataToValue: (data: RowDataT) => data.coreTeamMember,
    }),
    StringColumn({
      title: "Replacement",
      mapDataToValue: (data: RowDataT) => data.replacement,
    }),
    StringColumn({
      title: "Replacement For",
      mapDataToValue: (data: RowDataT) => data.replacementFor,
    }),
    NumericalColumn({
      title: "Requests Count",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.requestsCount,
    }),
    StringColumn({
      title: "Related Opportunity",
      mapDataToValue: (data: RowDataT) => data.relatedOpportunity,
    }),
    StringColumn({
      title: "Comments",
      mapDataToValue: (data: RowDataT) => data.comments,
    }),
    StringColumn({
      title: "Assigned Resource",
      mapDataToValue: (data: RowDataT) => data.assignedResource,
    }),
    NumericalColumn({
      title: "Actual Percentage",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.actualPercentage,
    }),
  ];

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      renderIcon: Show,
      onClick: ({ row }) => {
        router.push(`/resource-request/edit/${row.id}`);
      },
    },
  ];

  const csvHeaders = [
    { label: "Reference Number", key: "referenceNumber" },
    { label: "Manager Name", key: "managerName" },
    { label: "Function", key: "function" },
    { label: "Title", key: "title" },
    { label: "Start Date", key: "startDate" },
    { label: "End Date", key: "endDate" },
    { label: "Probability", key: "probability" },
    { label: "Percentage", key: "percentage" },
    { label: "Status", key: "status" },
    { label: "Core Team Member", key: "coreTeamMember" },
    { label: "Replacement", key: "replacement" },
    { label: "Replacement For", key: "replacementFor" },
    { label: "Requests Count", key: "requestsCount" },
    { label: "Related Opportunity", key: "relatedOpportunity" },
    { label: "Comments", key: "comments" },
    { label: "Assigned Resource", key: "assignedResource" },
    { label: "Actual Percentage", key: "actualPercentage" },
  ];

  return (
    <>
      {props.loading ? (
        <Loading />
      ) : (
        <div style={{ height: "70vh" }}>
          <Unstable_StatefulDataTable
            columns={columns}
            rows={rows}
            searchable={true}
            loadingMessage="Loading table data.."
            rowActions={rowActions}
          />
          <div style={{ textAlign: "end" }}>
            <Button $style={{ marginTop: "1%" }}>
              <CSVLink
                data={props.data!}
                filename="resourceRequests.csv"
                style={{ color: "white", textDecoration: "none" }}
                headers={csvHeaders}
              >
                Export
              </CSVLink>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
