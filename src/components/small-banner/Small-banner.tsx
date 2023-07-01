import React from "react";
import styles from "./Small-Banner.module.scss";

type Props = {
  texts: string[];
};

const SmallBanner: React.FC<Props> = (props) => {
  const [activeTextIndex, setActiveTextIndex] = React.useState(0);

  const shuffle = React.useCallback(() => {
    setActiveTextIndex((prev) => {
      const nextItem = props.texts.findIndex((_, index) => index === prev + 1);
      return nextItem === -1 ? 0 : nextItem;
    });
  }, [props.texts]);

  React.useEffect(() => {
    const intervalID = setInterval(shuffle, 5000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  if (props.texts.length === 0) return null;

  return (
    <div className={styles.small_banner_container}>
      <span className={styles.announce_active}>
        {props.texts[activeTextIndex]}
      </span>
    </div>
  );
};

export default SmallBanner;
