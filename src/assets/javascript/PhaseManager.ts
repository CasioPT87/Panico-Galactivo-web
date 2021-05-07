
type Phase = { index: number, phase: string, delay: number | null };

const STATES: Array<Phase> = [
  { index: 0, phase: 'initial', delay: 1000 },
  { index: 1, phase: 'approaching', delay: 6000 },
  { index: 2, phase: 'landing', delay: null },
  { index: 3, phase: 'landed', delay: 6000 }
];

class PhaseManager {

  state: Phase;

  constructor() {
    this.state = STATES[0];
  }

  action(): void {
    const { delay, index } = this.state;
    if (!delay) return
    setTimeout(() => {
      const nextPhaseIndex = index + 1;
      console.log(nextPhaseIndex)
      this.nextPhase(nextPhaseIndex);
    }, delay);
  }

  nextPhase(index: number): void {
    this.state = STATES[index];
    if (index < STATES.length - 1) {
      this.action();
    }
  }

  isPhase(phase: string): boolean {
    return phase === this.state.phase;
  }

  setPhase(phaseName: string): void {
    const phase = STATES.find(state => state.phase === phaseName);
    if (phase) this.state = phase;
  }
}

export type { Phase, PhaseManager };
export default new PhaseManager();

