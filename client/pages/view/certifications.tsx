import { Button } from "baseui/button";
import { Cell, Grid } from "baseui/layout-grid";
import { CSVLink } from "react-csv";
import { Delete, Plus, Show, Spinner } from "baseui/icon";
import React from "react";
import {
  Unstable_StatefulDataTable,
  StringColumn,
  RowActionT,
} from "baseui/data-table";
import { useRouter } from "next/dist/client/router";
import { useStyletron } from "baseui";

import { CertificationProviders } from "../../../server/src/entities/CertificationProviders";
import { EmployeeCertifications } from "../../../server/src/entities/EmployeeCertifications";
import {
  useCertificationsQuery,
  useDeleteCertificationMutation,
} from "../../graphql/types";
import { UserRole } from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";
import { Loading } from "../../components/common/Loading";

type RowDataT = {
  certificatoinId: number;
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
  StringColumn({
    title: "Certification Provider",
    mapDataToValue: (data: RowDataT) =>
      data.certificationProvider.certificationProviderName,
  }),
  StringColumn({
    title: "Talents Count",
    mapDataToValue: (data: RowDataT) => data.employeeCertifications?.length,
  }),
];

const Certifications: React.FC<{}> = ({}) => {
  const [, theme] = useStyletron();
  var router = useRouter();
  const [, deleteCertificates] = useDeleteCertificationMutation();
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
        router.push(`/edit/certification/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteCertificates({
          certificationId: parseInt(row.id.toString(), 10),
        });
        window.location.reload();
      },
      renderIcon: Delete,
    },
  ];

  return (
    <>
      {" "}
      {!data ? (
        <Loading />
      ) : (
        <>
          <div>
            <Grid>
              <Cell span={2}>
                <div
                  style={{
                    color: theme.colors.accent,
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >
                  Certificates
                </div>
              </Cell>
              <Cell skip={[1, 4, 7]} span={[1, 2, 3]}>
                <div>
                  <Button
                    type="submit"
                    startEnhancer={() => <Plus />}
                    onClick={() => {
                      router.push("../create/certification");
                    }}
                  >
                    Add New
                  </Button>
                </div>
              </Cell>
            </Grid>
          </div>
          <div
            style={{
              height: "50vh",
              width: "52%",
            }}
          >
            <Unstable_StatefulDataTable
              columns={columns}
              rows={rows}
              rowActions={rowActions}
            />
          </div>
          <div style={{ textAlign: "end" }}>
            <Button $style={{ textAlign: "end", marginTop: "1%" }}>
              <CSVLink
                data={data?.certifications?.data?.items!}
                filename="Certifications.csv"
                style={{ color: "white", textDecoration: "none" }}
              >
                Export
              </CSVLink>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default withAuth(Certifications, [UserRole.Admin]);
