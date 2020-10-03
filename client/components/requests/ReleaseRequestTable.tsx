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
import { ReleaseRequests } from "../../graphql/types";

type RowDataT = ReleaseRequests;

interface ReleaseRequestTableProps {
  data?: RowDataT[];
}

export const ReleaseRequestTable: React.FC<ReleaseRequestTableProps> = (
  props
) => {
  var router = useRouter();

  var rows = props.data?.map((request) => ({
    id: request.referenceNumber,
    data: request,
  }));

  const columns = [
    NumericalColumn({
      title: "Reference Number",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.referenceNumber,
    }),
    CategoricalColumn({
      title: "Manager Name",
      mapDataToValue: (data: RowDataT) => data.managerName,
    }),
    CategoricalColumn({
      title: "Employee Name",
      mapDataToValue: (data: RowDataT) => data.employeeName,
    }),
    StringColumn({
      title: "Employee ID",
      mapDataToValue: (data: RowDataT) => data.employeeId,
    }),
    CategoricalColumn({
      title: "Employee Title",
      mapDataToValue: (data: RowDataT) => data.employeeTitle,
    }),
    CategoricalColumn({
      title: "Function",
      mapDataToValue: (data: RowDataT) => data.function,
    }),
    StringColumn({
      title: "Release Date",
      mapDataToValue: (data: RowDataT) => data.releaseDate,
    }),
    NumericalColumn({
      title: "Probability",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.probability,
    }),
    NumericalColumn({
      title: "Release Percentage",
      filterable: false,
      mapDataToValue: (data: RowDataT) => data.releasePercentage,
    }),
    StringColumn({
      title: "Release Reason",
      mapDataToValue: (data: RowDataT) => data.releaseReason,
    }),
    StringColumn({
      title: "Leaving",
      mapDataToValue: (data: RowDataT) => data.leaving,
    }),
    CategoricalColumn({
      title: "Request Status",
      mapDataToValue: (data: RowDataT) => data.requestStatus,
    }),
  ];

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      renderIcon: Show,
      onClick: ({ row }) => {
        router.push(`/release-request/edit/${row.id}`);
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
