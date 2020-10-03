import { Delete, Show } from "baseui/icon";
import React from "react";
import {
  Unstable_StatefulDataTable,
  StringColumn,
  RowActionT,
  CategoricalColumn,
} from "baseui/data-table";
import { useRouter } from "next/dist/client/router";
import { useStyletron } from "baseui";

import { Loading } from "../../components/common/Loading";
import { UserRole } from "../../graphql/types";
import {
  useCertificationsQuery,
  useDeleteCertificationMutation,
  CertificationProviders,
  EmployeeCertifications,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

type RowDataT = {
  certificationId: number;
  certificationName: string;
  certificationProvider: CertificationProviders;
  talentsCount: number;
  employeeCertifications: EmployeeCertifications[];
};

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

const ViewCertification: React.FC<{}> = () => {
  const [, theme] = useStyletron();
  var router = useRouter();
  const [, deleteCertifications] = useDeleteCertificationMutation();
  const [{ data }] = useCertificationsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  var rows = data?.certifications?.data?.items.map((s) => ({
    id: s.certificationId,
    data: s,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      onClick: ({ row }) => {
        router.push(`/certification/edit/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteCertifications({
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
        <>
          <div
            style={{
              color: theme.colors.accent,
              fontWeight: "bold",
              fontSize: "x-large",
            }}
          >
            Certifications
          </div>
          <div
            style={{
              height: "58vh",
              width: "56%",
            }}
          >
            <Unstable_StatefulDataTable
              columns={columns}
              rows={rows}
              rowActions={rowActions}
              searchable={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default withAuth(ViewCertification, [UserRole.Admin]);
