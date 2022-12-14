export function LarkBox(props) {
  let { text, userName, date } = props;
  return (
    <div className="">
      {/* Author */}
      <div className="flex flex-row items-center mt-5 mb-3">
        <img className="h-7 w-7 mx-3" src="svg/user.svg"></img>
        <p className="text-sm">
          {userName ? userName : "Mina wallet address"}
        </p>
      </div>
      {/* Content */}
      <div
        className="p-2 min-w-1 max-w-xs bg-white rounded-xl shadow-lg text-blue 
        outline outline-offset-2 outline-blue-500"
      >
        <p>
          lark#{text} - Your brain has to be fried in a very specific way to
          understand this lark, but I love it.
        </p>
      </div>
      {/* Date */}
      <p className="m-1 text-sm">{date ? date : "27.11.2022"}</p>
    </div>
  );
}
