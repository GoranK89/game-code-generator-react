const OutputBad = ({ gameCodeTooLong }) => {
  if (gameCodeTooLong.length === 0) return null;

  return (
    <div className="generator__bad-codes">
      <ul>
        <h2>Contact config-db for these codes:</h2>
        {gameCodeTooLong.map((gameCode, i) => (
          <li key={i}>{gameCode}</li>
        ))}
      </ul>
    </div>
  );
};

export default OutputBad;
