import React from "react";
import { Button } from "baseui/button";
import {
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { HeadingLevel } from "baseui/heading";
import { Show } from "baseui/icon";
import { useRouter } from "next/dist/client/router";
import { CSVLink } from "react-csv";

import { Loading } from "../../components/Loading";
import { MainLayout } from "../../components/MainLayout";
import {
  ReleaseRequests,
  useReleaseRequestsQuery,
} from "../../generated/graphql";


type RowDataT = ReleaseRequests;

const columns = [
  NumericalColumn({
    title: "Reference Number",
    mapDataToValue: (data: RowDataT) => data.referenceNumber,
  }),
  StringColumn({
    title: "managerName",
    mapDataToValue: (data: RowDataT) => data.managerName,
  }),
  StringColumn({
    title: "function",
    mapDataToValue: (data: RowDataT) => data.function,
  }),
  StringColumn({
    title: "Employee Name",
    mapDataToValue: (data: RowDataT) => data.employeeName,
  }),
  StringColumn({
    title: "Employee ID",
    mapDataToValue: (data: RowDataT) => data.employeeId,
  }),
  StringColumn({
    title: "Employee Title",
    mapDataToValue: (data: RowDataT) => data.employeeTitle,
  }),
  NumericalColumn({
    title: "propability",
    mapDataToValue: (data: RowDataT) => data.propability,
  }),
  StringColumn({
    title: "Release Date",
    mapDataToValue: (data: RowDataT) => data.releaseDate,
  }),
  NumericalColumn({
    title: "Release Percentage",
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
  StringColumn({
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

  var rows = data?.releaseRequests.data.items.map((r) => ({
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

  return (
    <MainLayout>
      <HeadingLevel>
        {!data ? (
          <Loading />
        ) : (
          <div style={{ height: "70vh", width: "95%" }}>
            <Unstable_StatefulDataTable
              columns={columns}
              rows={rows}
              searchable={true}
              loadingMessage="Loading table data.."
              rowActions={rowActions}
            />
            <div style={{ textAlign: "end" }}>
              <Button $style={{ textAlign: "end", marginTop: "1%" }}>
                <CSVLink
                  data={data?.releaseRequests.data.items}
                  filename="releaseRequests.csv"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Export
                </CSVLink>
              </Button>
            </div>
          </div>
        )}
      </HeadingLevel>
    </MainLayout>
  );
};

export default ViewReleaseRequests;
