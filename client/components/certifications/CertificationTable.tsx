import React from "react";
import {
  CategoricalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Show, Delete } from "baseui/icon";
import { useRouter } from "next/router";
import {
  Certifications,
  useDeleteCertificationMutation,
} from "../../graphql/types";
import { Loading } from "../common/Loading";

type RowDataT = Certifications;

interface CertificationTableProps {
  data?: RowDataT[];
}

export const CertificationTable: React.FC<CertificationTableProps> = (
  props
) => {
  var router = useRouter();
  const [, deleteCertifications] = useDeleteCertificationMutation();

  var rows = props.data?.map((certification) => ({
    id: certification.certificationId,
    data: certification,
  }));

  const columns = [
    StringColumn({
      title: "Certification Name",
      mapDataToValue: (data: RowDataT) => data.certificationName,
    }),
    CategoricalColumn({
      title: "Certification Provider",
      mapDataToValue: (data: RowDataT) =>
        data.certificationProvider.certificationProviderName,
    }),
    StringColumn({
      title: "Talents Count",
      mapDataToValue: (data: RowDataT) => data.employeeCertifications?.length,
    }),
  ];

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      renderIcon: Show,
      onClick: ({ row }) => {
        router.push(`/certification/edit/${row.id}`);
      },
    },
    {
      label: "Delete",
      renderIcon: Delete,
      onClick: async ({ row }) => {
        await deleteCertifications({
          certificationId: parseInt(row.id.toString(), 10),
        });
        window.location.reload();
      },
    },
  ];

  return (
    <Unstable_StatefulDataTable
      columns={columns}
      rows={rows}
      rowActions={rowActions}
    />
  );
};
