export function LarkBox(props) {
  let { text, userName, date, hashtags } = props;
  return (
    <div className="bg-sky-50 m-3 rounded-xl">
      {/* Author */}
      <div className="flex flex-row justify-around pr-5">
        <div className="flex flex-row items-center mt-5 mb-3 self-center">
          <img className="h-7 w-7 mx-3" src="svg/user.svg"></img>
          <p className="text-sm">
            {userName ? userName : "Mina wallet address"}
          </p>
        </div>
      </div>
      {/* Content */}
      <div
        className="p-2 m-2 min-w-1 max-w-xs bg-white rounded-xl shadow-lg text-blue 
        outline outline-offset-2 outline-blue-500"
      >
        <p>
          lark#{text} - Your brain has to be fried in a very specific way to
          understand this lark, but I love it.
        </p>
      </div>
      {/* Date & hashtags */}
      <div className="pt-3">
        <p className="m-1 text-sm text-center">{date ? date : "undefined"}</p>
        <p className="m-1 text-sm text-center">
          {hashtags ? hashtags : "#undefined"}
        </p>
      </div>
    </div>
  );
}
