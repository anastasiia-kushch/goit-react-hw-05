export default function StarRating({ rating }) {
  const roundedRating = Math.round(rating);
  const wholeStars = Array.from({ length: 10 }, (_, index) => index + 1);
  const filledStarsCount = roundedRating;
  const decimalPart = rating - filledStarsCount;

  return (
    <span style={{ display: 'flex' }}>
      {wholeStars.map((_, index) => (
        <span
          key={index}
          style={{ color: index < filledStarsCount ? 'gold' : 'lightgray' }}
        >
          &#9733;
        </span>
      ))}

      {decimalPart > 0 && (
        <span style={{ overflow: 'hidden', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              display: 'inline-block',
              width: decimalPart * 100 + '%',
              overflow: 'hidden',
              color: 'gold',
            }}
          >
            &#9733;
          </span>
          <span
            style={{
              position: 'absolute',
              display: 'inline-block',
              overflow: 'hidden',
              color: 'lightgray',
            }}
          >
            &#9734;
          </span>
        </span>
      )}
    </span>
  );
}
