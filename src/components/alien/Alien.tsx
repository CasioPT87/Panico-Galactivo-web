import styles from "./Alien.module.css";

export default ({
  alien,
}: {
  alien: { name: string; photo: string; description: string; role: string };
}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={alien.photo}
        alt={`${alien.role} avatar`}
      />
      <h3 className={styles.name}>{alien.name}</h3>
      <p className={styles.description}>{alien.description}</p>
    </div>
  );
};
