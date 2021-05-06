
type Phase = { index: number, phase: string, delay: number };

const STATES: Array<Phase> = [
  { index: 0, phase: 'initial', delay: 1000 },
  { index: 1, phase: 'approaching', delay: 6000 },
  { index: 2, phase: 'landing', delay: 6000 },
  { index: 3, phase: 'landed', delay: 6000 }
];

class PhaseManager {

  state: Phase;

  constructor() {
    this.state = STATES[0];
  }

  action(): void {
    const { delay, index } = this.state;
    setTimeout(() => {
      const nextPhaseIndex = index + 1;
      this.nextPhase(nextPhaseIndex);
    }, delay);
  }

  nextPhase(index: number): void {
    this.state = STATES[index];
    if (index < STATES.length - 1) {
      this.action();
    }
  }

  
}

export type { Phase, PhaseManager };
export default new PhaseManager();

