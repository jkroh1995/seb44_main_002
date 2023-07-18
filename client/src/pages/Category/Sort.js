export default function Sort({ fitlerCondtion, selectMenuHandler }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        selectMenuHandler(0, 'descendingOrder');
      }}
      className="flex font-bold items-center"
    >
      {fitlerCondtion.descendingOrder ? (
        <div className="flex ">
          <img src="/images/arrow/arrowDownOn.png" alt="내림차순" />
          <img src="/images/arrow/arrowUpOff.png" alt="올림차순 비활성화" />
        </div>
      ) : (
        <div className="flex">
          <img src="/images/arrow/arrowDownOff.png" alt="내림차순 비활성화" />
          <img src="/images/arrow/arrowUpOn.png" alt="내림차순" />
        </div>
      )}
      SORT BY:
    </button>
  );
}