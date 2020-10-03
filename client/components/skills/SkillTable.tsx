import React from "react";
import { Button } from "baseui/button";
import {
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Plus, Show } from "baseui/icon";
import { Cell, Grid } from "baseui/layout-grid";
import { useRouter } from "next/router";
import { Skills, useDeleteSkillMutation } from "../../graphql/types";
import { Loading } from "../common/Loading";

type RowDataT = Skills;

interface SkillTableProps {
  data?: RowDataT[];
  loading: boolean;
}

export const SkillTable: React.FC<SkillTableProps> = (props) => {
  var router = useRouter();
  const [, deleteSkill] = useDeleteSkillMutation();

  var rows = props.data?.map((skill) => ({
    id: skill.skillId,
    data: skill,
  }));

  const columns = [
    NumericalColumn({
      title: "Skill ID",
      minWidth: 1,
      maxWidth: 1,
      mapDataToValue: (data: RowDataT) => data.skillId,
    }),
    StringColumn({
      title: "Skill Name",
      minWidth: 5,
      maxWidth: 5,
      mapDataToValue: (data: RowDataT) => data.skillName,
    }),
  ];

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      renderIcon: Show,
      onClick: ({ row }) => {
        router.push(`/skill/edit/${row.id}`);
      },
    },
    {
      label: "Delete",
      renderIcon: Delete,
      onClick: async ({ row }) => {
        await deleteSkill({
          skillId: parseInt(row.id.toString(), 10),
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
              <Cell span={2}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >
                  Skills
                </div>
              </Cell>
              <Cell skip={[1, 4, 7]} span={[1, 2, 3]}>
                <div style={{ textAlignLast: "end" }}>
                  <Button
                    type="submit"
                    startEnhancer={() => <Plus />}
                    onClick={() => {
                      router.push("/skill/create");
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
              width: "fit-content",
              marginLeft: "5%",
            }}
          >
            <Unstable_StatefulDataTable
              columns={columns}
              rows={rows}
              rowActions={rowActions}
            />
          </div>
        </>
      )}
    </>
  );
};
