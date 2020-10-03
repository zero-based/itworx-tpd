import React from "react";
import {
  NumericalColumn,
  RowActionT,
  StringColumn,
  Unstable_StatefulDataTable
} from "baseui/data-table";
import { Delete, Show } from "baseui/icon";
import { useRouter } from "next/router";
import { Skills, useDeleteSkillMutation } from "../../graphql/types";

type RowDataT = Skills;

interface SkillTableProps {
  data?: RowDataT[];
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
    <Unstable_StatefulDataTable
      columns={columns}
      rows={rows}
      rowActions={rowActions}
    />
  );
};
