import { MagnifyingGlass } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
}
