
type Phase = { index: number, phase: string, delay: number | null };

const STATES: Array<Phase> = [
  { index: 0, phase: 'initial', delay: 1000 },
  { index: 1, phase: 'approaching', delay: null },
  { index: 2, phase: 'landing', delay: null },
  { index: 3, phase: 'landed', delay: null }
];

class PhaseManager {

  state: Phase;
  cloudsDestroyed: number;
  numberOfClouds: number | null;

  constructor() {
    this.state = STATES[0];
    this.cloudsDestroyed = 0;
    this.numberOfClouds = null;
  }

  action(): void {
    const { delay, index } = this.state;
    if (!delay) return
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

  isPhase(phase: string): boolean {
    return phase === this.state.phase;
  }

  setPhase(phaseName: string, delay: number | null = null): void {
    const phase = STATES.find(state => state.phase === phaseName);
    if (!phase) return;
    if (delay !== null) {
      setTimeout(() => {
        this.state = phase;
      }, delay);
    } else {
      this.state = phase;
    }  
  }

  cloudDestroyed(): void {
    if (this.numberOfClouds === null) return;
    this.cloudsDestroyed++;
    if (this.cloudsDestroyed >= this.numberOfClouds) {
      this.setPhase('landing', 1000);
    }
  }
}

export type { Phase, PhaseManager };
export default new PhaseManager();

