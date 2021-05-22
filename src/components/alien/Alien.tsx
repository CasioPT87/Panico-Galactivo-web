import styles from "./Alien.module.css";

const Alien = ({
  alien,
  photo
}: {
  alien: { name: string; photo: string; description: string; role: string },
  photo: any
}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={photo.src}
        alt={`${alien.role} avatar`}
      />
      <h3 className={styles.name}>{alien.name}</h3>
      <p className={styles.description}>{alien.description}</p>
    </div>
  );
};

export default Alien;
