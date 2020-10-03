import React from "react";
import {
  CategoricalColumn,
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Show } from "baseui/icon";
import { useRouter } from "next/router";

import { ResourceRequests } from "../../graphql/types";

type RowDataT = ResourceRequests;

interface ResourceRequestTableProps {
  data?: RowDataT[];
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

  return (
    <Unstable_StatefulDataTable
      columns={columns}
      rows={rows}
      searchable={true}
      rowActions={rowActions}
    />
  );
};
