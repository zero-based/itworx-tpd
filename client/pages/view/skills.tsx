import { Button } from "baseui/button";
import { Delete, Plus, Show, Spinner } from "baseui/icon";
import { Grid, Cell } from "baseui/layout-grid";
import { HeadingLevel } from "baseui/heading";
import {
  Unstable_StatefulDataTable,
  NumericalColumn,
  StringColumn,
  RowActionT,
} from "baseui/data-table";
import { useRouter } from "next/dist/client/router";
import { useStyletron } from "baseui";

import { MainLayout } from "../../components/MainLayout";
import {
  useDeleteSkillMutation,
  useSkillsQuery,
} from "../../generated/graphql";

type RowDataT = { skillId: number; skillName: string };

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

const ViewSkills: React.FC<{}> = ({}) => {
  const [, theme] = useStyletron();
  const [, deleteSkill] = useDeleteSkillMutation();
  var router = useRouter();
  const [{ data }] = useSkillsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  var rows = data?.skills.data?.items.map((s) => ({
    id: s.skillId,
    data: s,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      onClick: ({ row }) => {
        router.push(`/edit/skill/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteSkill({
          skillId: parseInt(row.id.toString(), 10),
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
          <Spinner />
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
                    Skills
                  </div>
                </Cell>
                <Cell skip={[1, 4, 7]} span={[1, 2, 3]}>
                  <div style={{ textAlignLast: "end" }}>
                    <Button
                      type="submit"
                      startEnhancer={() => <Plus />}
                      onClick={() => {
                        router.push("../create/skill");
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
      </HeadingLevel>
    </MainLayout>
  );
};

export default ViewSkills;
