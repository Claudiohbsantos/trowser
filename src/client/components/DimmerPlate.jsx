import React from 'react';
import styles from './DimmerPlate.module.scss'

export const TopDimmerPlate = ({ clickHandler }) => (
  <div className={`${styles.dimmerTop} ${styles.dimmer}`} onClick={clickHandler}></div>
)

export const BottomDimmerPlate = ({ clickHandler }) => (
  <div className={styles.dimmer} onClick={clickHandler}></div>
)