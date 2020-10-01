import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import {
  CategoricalColumn,
  NumericalColumn,
  RowActionT,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Show } from "baseui/icon";
import { useRouter } from "next/dist/client/router";
import React from "react";
import {
  Skills,
  useDeleteEmployeeSkillMutation,
  useEmployeeSkillsQuery,
} from "../../graphql/types";
import { Loading } from "../common/Loading";

interface EmployeeSkillsTableProps {}

type RowDataT = {
  employeeId: string;
  experienceLevel: string;
  lastUsedDate: string;
  skill: Skills;
  skillId: number;
};

const columns = [
  NumericalColumn({
    title: "Skill ID",
    filterable: true,
    mapDataToValue: (data: RowDataT) => data.skillId,
  }),
  CategoricalColumn({
    title: "Skill Name",
    filterable: true,
    mapDataToValue: (data: RowDataT) => data.skill.skillName,
  }),
  CategoricalColumn({
    title: "Experience Level",
    filterable: true,
    mapDataToValue: (data: RowDataT) => data.experienceLevel,
  }),
  CategoricalColumn({
    title: "Last Used Date",
    filterable: true,
    mapDataToValue: (data: RowDataT) => data.lastUsedDate,
  }),
];

export const EmployeeSkillsTable: React.FC<EmployeeSkillsTableProps> = () => {
  const [, deleteEmployeeSkill] = useDeleteEmployeeSkillMutation();
  var router = useRouter();
  const [{ data }] = useEmployeeSkillsQuery({
    variables: {
      limit: 30,
      cursor: null,
    },
  });
  var rows = data?.employeeSkills.data?.items.map((s) => ({
    id: s.skillId,
    data: s,
  }));

  const rowActions: RowActionT[] = [
    {
      label: "Edit",
      onClick: ({ row }) => {
        router.push(`/edit/employeeSkill/${row.id}`);
      },
      renderIcon: Show,
    },
    {
      label: "Delete",
      onClick: async ({ row }) => {
        await deleteEmployeeSkill({
          skillId: parseInt(row.id.toString(), 10),
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
          <Button
            type="submit"
            $style={{
              position: "absolute",
              right: "10%",
            }}
            onClick={() => {
              router.push(`/create/employeeSkill`);
            }}
          >
            Add New
          </Button>
          <div style={{ height: "70vh" }}>
            <Unstable_StatefulDataTable
              columns={columns}
              rows={rows}
              searchable={true}
              loadingMessage="Loading table data.."
              rowActions={rowActions}
            />
          </div>
        </>
      )}
    </>
  );
};
