import styles from './DragIcon.module.css';

const DragIcon = () => {
  return (
    <div className={styles.DragIcon}>
      <span className={styles.lines}></span>
      <span className={styles.lines}></span>
    </div>
  )
}

export default DragIcon;