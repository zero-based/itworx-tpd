import React from "react";
import { Button } from "baseui/button";
import {
  CategoricalColumn,
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { HeadingLevel } from "baseui/heading";
import { Show } from "baseui/icon";
import { useRouter } from "next/dist/client/router";
import { CSVLink } from "react-csv";

import { Loading } from "../../components/common/Loading";
import {
  ReleaseRequests,
  useReleaseRequestsQuery,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

type RowDataT = ReleaseRequests;

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

const ViewReleaseRequests = () => {
  const router = useRouter();

  const [{ data }] = useReleaseRequestsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  var rows = data?.releaseRequests?.data?.items.map((r) => ({
    id: r.referenceNumber,
    data: r,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Check",
      onClick: ({ row }) => {
        router.push(`/edit/releaseRequest/${row.id}`);
      },
      renderIcon: Show,
    },
  ];

  const csvHeaders = [
    { label: "Reference Number", key: "referenceNumber" },
    { label: "Manager Name", key: "managerName" },
    { label: "Employee Name", key: "employeeName" },
    { label: "Employee ID", key: "employeeId" },
    { label: "Employee Title", key: "employeeTitle" },
    { label: "Function", key: "function" },
    { label: "Release Date", key: "releaseDate" },
    { label: "Probability", key: "probability" },
    { label: "Release Percentage", key: "releasePercentage" },
    { label: "Release Reason", key: "releaseReason" },
    { label: "Leaving", key: "leaving" },
    { label: "Request Status", key: "requestStatus" },
  ];

  return (
    <>
      {!data ? (
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
                data={data?.releaseRequests?.data?.items!}
                filename="releaseRequests.csv"
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

export default withAuth(ViewReleaseRequests, [
  UserRole.Admin,
  UserRole.Manager,
]);
