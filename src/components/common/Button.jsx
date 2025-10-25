const Button = ({ type, width, children, onClickHandler, classes}) => {
  return (
    <button
      onClick={onClickHandler}
      type={type}
      className={`bg-amber-900 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition ${width} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
