import React from "react";
import {
  CategoricalColumn,
  RowActionT,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Show } from "baseui/icon";
import { useRouter } from "next/router";

import {
  EmployeeCertifications,
  useDeleteEmployeeCertificationMutation,
  useEmployeeCertificationsQuery,
} from "../../graphql/types";
import { Loading } from "../common/Loading";

type RowDataT = EmployeeCertifications;

interface EmployeeCertificationTableProps {}

const columns = [
  CategoricalColumn({
    title: "Certification Provider",
    filterable: true,
    mapDataToValue: (data: RowDataT) =>
      data.certification?.certificationProvider?.certificationProviderName,
  }),
  CategoricalColumn({
    title: "Certification Name",
    filterable: true,
    mapDataToValue: (data: RowDataT) => data.certification.certificationName,
  }),

  CategoricalColumn({
    title: "Expiration Date",
    filterable: true,

    mapDataToValue: (data: RowDataT) => data.expirationDate,
  }),
];

export const EmployeeCertificationTable: React.FC<EmployeeCertificationTableProps> = () => {
  const [
    ,
    deleteEmployeeCertification,
  ] = useDeleteEmployeeCertificationMutation();
  var router = useRouter();
  const [{ data }] = useEmployeeCertificationsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  var rows = data?.employeeCertifications.data?.items.map((c) => ({
    id: c.certificationId,
    data: c,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      onClick: ({ row }) => {
        router.push(`/employee-certification/edit/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteEmployeeCertification({
          certificationId: parseInt(row.id.toString(), 10),
        });
        window.location.reload();
      },
      renderIcon: Delete,
    },
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
        </div>
      )}
    </>
  );
};
