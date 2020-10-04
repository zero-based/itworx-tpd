import React from "react";
import {
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Plus, Show } from "baseui/icon";
import { useRouter } from "next/router";
import {
  CertificationProviders,
  useDeleteCertificationProviderMutation,
} from "../../graphql/types";

type RowDataT = CertificationProviders;

interface CertificationProviderTableProps {
  data?: RowDataT[];
}

export const CertificationProviderTable: React.FC<CertificationProviderTableProps> = (
  props
) => {
  var router = useRouter();
  const [, deleteProvider] = useDeleteCertificationProviderMutation();

  var rows = props.data?.map((provider) => ({
    id: provider.certificationProviderId,
    data: provider,
  }));

  const columns = [
    StringColumn({
      title: "Certification Provider Name",
      mapDataToValue: (data: RowDataT) => data.certificationProviderName,
    }),
  ];

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      renderIcon: Show,
      onClick: ({ row }) => {
        router.push(`/certification-provider/edit/${row.id}`);
      },
    },
    {
      label: "Delete",
      renderIcon: Delete,
      onClick: async ({ row }) => {
        await deleteProvider({
          certificationProviderId: parseInt(row.id.toString(), 10),
        });
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
