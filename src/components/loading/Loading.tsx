import React from 'react';
import cx from 'classnames';
import styles from './Loading.module.css';

type Props = {
  show: boolean
}

const Loading = React.forwardRef<HTMLDivElement, Props>(({ show }, ref) => {
  if (!show) return null;
  return (
    <div ref={ref} className={cx(styles.wrapper, styles.loading)}>
      <p>loading...</p>
    </div>
  )
})

export default Loading;