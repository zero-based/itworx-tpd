import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import {
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { HeadingLevel } from "baseui/heading";
import { Delete, Plus, Show } from "baseui/icon";
import { Cell, Grid } from "baseui/layout-grid";
import { useRouter } from "next/dist/client/router";
import { CSVLink } from "react-csv";

import { Loading } from "../../components/common/Loading";
import { MainLayout } from "../../components/common/MainLayout";
import {
  useCertificationsProvidersQuery,
  useDeleteCertificateProviderMutation,
  UserRole,
} from "../../graphql/types";
import { withAuth } from "../../hocs/withAuth";

type RowDataT = {
  certificatoinProviderId: number;
  certificationProviderName: string;
};

const columns = [
  StringColumn({
    title: "Certificate Provider Name",
    mapDataToValue: (data: RowDataT) => data.certificationProviderName,
  }),
];

const ViewCertificateProviders: React.FC<{}> = ({}) => {
  const [, theme] = useStyletron();
  var router = useRouter();
  const [, deleteCertificateProvider] = useDeleteCertificateProviderMutation();
  const [{ data }] = useCertificationsProvidersQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  var rows = data?.certificationsProviders?.data?.items.map((s) => ({
    id: s.certificatoinProviderId,
    data: s,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      onClick: ({ row }) => {
        router.push(`/edit/certificateProvider/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteCertificateProvider({
          certificationProviderId: parseInt(row.id.toString(), 10),
        });
        window.location.reload();
      },
      renderIcon: Delete,
    },
  ];

  return (
    <MainLayout>
      <HeadingLevel>
        {!data ? (
          <Loading />
        ) : (
          <>
            <div>
              <Grid>
                <Cell span={3}>
                  <div
                    style={{
                      color: theme.colors.accent,
                      fontWeight: "bold",
                      fontSize: "x-large",
                    }}
                  >
                    Certificates Provider
                  </div>
                </Cell>
                <Cell skip={[4, 7]} span={[1, 2]}>
                  <div>
                    <Button
                      type="submit"
                      startEnhancer={() => <Plus />}
                      onClick={() => {
                        router.push("../create/certificateProvider");
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
                height: "70vh",
                width: "50%",
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
                  data={data?.certificationsProviders?.data?.items!}
                  filename="CertificateProviders.csv"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Export
                </CSVLink>
              </Button>
            </div>
          </>
        )}
      </HeadingLevel>
    </MainLayout>
  );
};

export default withAuth(ViewCertificateProviders, [UserRole.Admin]);
