
import cx from 'classnames'
import styles from './Arrows.module.css';

const calculatePosition = (position: number): number => {
  if (position > 3) return 0;
  if (position < 0) return 3;
  return position;
};

const Arrows = ({ position, setPosition }: { position: number, setPosition: (calculatePosition: number) => void }) => {
  return (
    <>
      <div
      className={cx(styles.arrow, styles.forward)}
      onClick={() => setPosition(calculatePosition(position + 1))}
      >
        {">>>"}
      </div>
      <div
      className={cx(styles.arrow, styles.backward)}
      onClick={() => setPosition(calculatePosition(position - 1))}
      >
        {"<<<"}
      </div>
    </>
  )
}

export default Arrows;