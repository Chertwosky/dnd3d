export const getProjectName = () => 'DnD 3D';

export type DiceRoll = {
  notation: string;
  total: number;
  rolls: number[];
};

export function normalizeDiceNotation(notation: string) {
  return notation.trim().toLowerCase().replaceAll(' ', '');
}
