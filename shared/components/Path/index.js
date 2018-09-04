/* @jsx */

import React from 'react'
import { Link } from 'react-router-dom'
import ArrowRightIcon from 'resources/icons/ArrowRightIcon'
import style from './style.css'

const Path = ({ links }) => (
  <div className={style.path}>
    {links.slice(0, -1).map(l =>
      <div key={Math.random()} className={style.link}>
        {l.icon && <div className={style.icon}>{l.icon}</div>}
        <Link to={l.to}>{l.text}</Link>
        <ArrowRightIcon />
      </div>
    )}
    <div className={style.link}>
      {links.slice(-1)[0].icon && <div className={style.icon}>{links.slice(-1)[0].icon}</div>}
      {links.slice(-1)[0].text}
    </div>
  </div>
)

export default Path
