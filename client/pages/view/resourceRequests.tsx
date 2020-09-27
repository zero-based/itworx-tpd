import { Button } from "baseui/button";
import { CSVLink } from "react-csv";
import { HeadingLevel } from "baseui/heading";
import { Show, Spinner } from "baseui/icon";
import {
  Unstable_StatefulDataTable,
  NumericalColumn,
  StringColumn,
  RowActionT,
} from "baseui/data-table";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";

import { MainLayout } from "../../components/MainLayout";
import { createUrqlClient } from "../../urql/urqlClient";
import {
  useResourceRequestsQuery,
  ResourceRequests,
} from "../../generated/graphql";

type RowDataT = ResourceRequests;

const columns = [
  StringColumn({
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
    title: "title",
    mapDataToValue: (data: RowDataT) => data.title,
  }),
  StringColumn({
    title: "startDate",
    mapDataToValue: (data: RowDataT) => data.startDate,
  }),
  StringColumn({
    title: "endDate",
    mapDataToValue: (data: RowDataT) => data.endDate,
  }),
  NumericalColumn({
    title: "propability",
    mapDataToValue: (data: RowDataT) => data.propability,
  }),
  NumericalColumn({
    title: "percentage",
    mapDataToValue: (data: RowDataT) => data.percentage,
  }),
  StringColumn({
    title: "status",
    mapDataToValue: (data: RowDataT) => data.status,
  }),
  StringColumn({
    title: "coreTeamMember",
    mapDataToValue: (data: RowDataT) => data.coreTeamMember,
  }),
  StringColumn({
    title: "replacenement",
    mapDataToValue: (data: RowDataT) => data.replacenement,
  }),
  StringColumn({
    title: "replacementFor",
    mapDataToValue: (data: RowDataT) => data.replacementFor,
  }),
  NumericalColumn({
    title: "requestsCount",
    mapDataToValue: (data: RowDataT) => data.requestsCount,
  }),
  StringColumn({
    title: "relatedOpportunity",
    mapDataToValue: (data: RowDataT) => data.relatedOpportunity,
  }),
  StringColumn({
    title: "comments",
    mapDataToValue: (data: RowDataT) => data.comments,
  }),
  StringColumn({
    title: "assignedResource",
    mapDataToValue: (data: RowDataT) => data.assignedResource,
  }),
  NumericalColumn({
    title: "actualPercentage",
    mapDataToValue: (data: RowDataT) => data.actualPercentage,
  }),
];

const ViewResourceRequests = () => {
  const router = useRouter();

  const [{ data }] = useResourceRequestsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });

  var rows = data?.resourceRequests.data.items.map((r) => ({
    id: r.referenceNumber,
    data: r,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Check",
      onClick: ({ row }) => {
        router.push(`/edit/resourceRequest/${row.id}`);
      },
      renderIcon: Show,
    },
  ];

  return (
    <MainLayout>
      <HeadingLevel>
        {!data ? (
          <Spinner />
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
              <Button $style={{ textAlign: "end", marginTop: "1%" }}>
                <CSVLink
                  data={data?.resourceRequests.data.items}
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

export default ViewResourceRequests;
