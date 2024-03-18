import css from '../LoadMoreBtn/LoadMoreBtn.module.css';

export default function LoadMoreBtn({ loadMore }) {
  return (
    <button onClick={loadMore} className={css.button}>
      Load more
    </button>
  );
}
