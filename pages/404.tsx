import style from '../styles/404.module.scss';
import Link from 'next/link';
import Router from 'next/router';
export default function Custom404() {
  return (
        <div className={style.bodynext}>
            <div className={style.noise}></div>
            <div className={style.overlay}></div>
            <div className={style.terminal}>
            <h1>Error <span className={style.errorcode}>404</span></h1>
            <p className={style.output}>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <p className={style.output}>Please try to <Link className={style.anext} href="#" onClick={() => Router.back()}>go back</Link> or <Link className={style.anext} href="/">return to the homepage</Link>.</p>
            <p className={style.output}>Good luck.</p>
            </div>

            </div>


  );
}

