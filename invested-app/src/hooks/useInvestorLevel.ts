const LEVELS = {
  principiante: {
    label: 'Principiante',
    emoji: '🌱',
    monthsRequired: 0,
    milestonesRequired: 0,
    mixes: ['Cauta', 'Discreta'],
  },
  observador: {
    label: 'Observador',
    emoji: '🔭',
    monthsRequired: 6,
    milestonesRequired: 3,
    mixes: ['Cauta', 'Discreta', 'Paciente', 'Dinámica'],
  },
  estratega: {
    label: 'Estratega',
    emoji: '♟️',
    monthsRequired: 12,
    milestonesRequired: 6,
    mixes: ['Cauta', 'Discreta', 'Paciente', 'Dinámica', 'Decidida', 'Audaz'],
  },
} as const;

type LevelKey = keyof typeof LEVELS;

interface InvestorLevelInput {
  activationDate: Date;
  learningMilestonesCompleted: string[];
}

interface InvestorLevelOutput {
  currentLevel: LevelKey;
  currentLevelLabel: string;
  currentLevelEmoji: string;
  unlockedMixes: string[];
  nextLevel: string | null;
  nextLevelEmoji: string | null;
  progressToNext: {
    monthsCompleted: number;
    monthsRequired: number;
    milestonesCompleted: number;
    milestonesRequired: number;
  };
  isEligibleToEvolve: boolean;
}

function getMonthsElapsed(from: Date): number {
  const now = new Date();
  return (
    (now.getFullYear() - from.getFullYear()) * 12 +
    (now.getMonth() - from.getMonth())
  );
}

// Mock data for development — 7 meses + 3 hitos → isEligibleToEvolve: true (principiante → observador)
export const mockInvestorInput: InvestorLevelInput = {
  activationDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 7,
    new Date().getDate()
  ),
  learningMilestonesCompleted: ['modulo-mezcla', 'modulo-rebalanceo', 'modulo-perfil'],
};

export function useInvestorLevel(input: InvestorLevelInput): InvestorLevelOutput {
  const { activationDate, learningMilestonesCompleted } = input;

  const monthsCompleted = getMonthsElapsed(activationDate);
  const milestonesCompleted = learningMilestonesCompleted.length;

  const meetsEstrategia =
    monthsCompleted >= LEVELS.estratega.monthsRequired &&
    milestonesCompleted >= LEVELS.estratega.milestonesRequired;

  const meetsObservador =
    monthsCompleted >= LEVELS.observador.monthsRequired &&
    milestonesCompleted >= LEVELS.observador.milestonesRequired;

  const currentLevel: LevelKey = meetsEstrategia
    ? 'estratega'
    : meetsObservador
      ? 'observador'
      : 'principiante';

  const levelOrder: LevelKey[] = ['principiante', 'observador', 'estratega'];
  const currentIndex = levelOrder.indexOf(currentLevel);
  const nextLevelKey: LevelKey | null =
    currentIndex < levelOrder.length - 1 ? levelOrder[currentIndex + 1] : null;

  const nextLevelData = nextLevelKey ? LEVELS[nextLevelKey] : null;

  const isEligibleToEvolve =
    nextLevelKey !== null &&
    monthsCompleted >= LEVELS[nextLevelKey].monthsRequired &&
    milestonesCompleted >= LEVELS[nextLevelKey].milestonesRequired;

  return {
    currentLevel,
    currentLevelLabel: LEVELS[currentLevel].label,
    currentLevelEmoji: LEVELS[currentLevel].emoji,
    unlockedMixes: [...LEVELS[currentLevel].mixes],
    nextLevel: nextLevelData ? nextLevelData.label : null,
    nextLevelEmoji: nextLevelData ? nextLevelData.emoji : null,
    progressToNext: {
      monthsCompleted,
      monthsRequired: nextLevelData ? nextLevelData.monthsRequired : LEVELS[currentLevel].monthsRequired,
      milestonesCompleted,
      milestonesRequired: nextLevelData ? nextLevelData.milestonesRequired : LEVELS[currentLevel].milestonesRequired,
    },
    isEligibleToEvolve,
  };
}
