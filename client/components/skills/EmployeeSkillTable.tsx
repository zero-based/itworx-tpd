import React from "react";
import {
  CategoricalColumn,
  NumericalColumn,
  RowActionT,
  Unstable_StatefulDataTable,
} from "baseui/data-table";
import { Delete, Show } from "baseui/icon";
import { useRouter } from "next/router";

import {
  Skills,
  useDeleteEmployeeSkillMutation,
  useEmployeeSkillsQuery,
} from "../../graphql/types";
import { Loading } from "../common/Loading";

interface EmployeeSkillTableProps {}

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

export const EmployeeSkillTable: React.FC<EmployeeSkillTableProps> = () => {
  var router = useRouter();
  const [, deleteEmployeeSkill] = useDeleteEmployeeSkillMutation();

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
        router.push(`/employee-skill/edit/${row.id}`);
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
