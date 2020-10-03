import React from "react";
import { Button } from "baseui/button";
import {
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Plus, Show } from "baseui/icon";
import { Cell, Grid } from "baseui/layout-grid";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import {
  CertificationProviders,
  useDeleteCertificationProviderMutation,
} from "../../graphql/types";
import { Loading } from "../common/Loading";

type RowDataT = CertificationProviders;

interface CertificationProviderTableProps {
  data?: RowDataT[];
  loading: boolean;
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
        router.push(`/edit/certificationProvider/${row.id}`);
      },
    },
    {
      label: "Delete",
      renderIcon: Delete,
      onClick: async ({ row }) => {
        await deleteProvider({
          certificationProviderId: parseInt(row.id.toString(), 10),
        });
        window.location.reload();
      },
    },
  ];

  return (
    <>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Grid>
              <Cell span={3}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >
                  Certifications Provider
                </div>
              </Cell>
              <Cell skip={[4, 7]} span={[1, 2]}>
                <div>
                  <Button
                    type="submit"
                    startEnhancer={() => <Plus />}
                    onClick={() => {
                      router.push("../create/certificationProvider");
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
                data={props.data!}
                filename="CertificationProviders.csv"
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
