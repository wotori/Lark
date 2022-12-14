export function LarkBox(props) {
  let { text, userName, date } = props;
  return (
    <div class="">
      {/* Author */}
      <div class="flex flex-row items-center mt-5 mb-3">
        <img class="h-7 w-7 mx-3" src="svg/user.svg"></img>
        <p class="text-sm">
          {userName ? userName : "User Name / Mina wallet address"}
        </p>
      </div>
      {/* Content */}
      <div
        class="p-2 min-w-1 max-w-xs bg-white rounded-xl shadow-lg text-blue 
        outline outline-offset-2 outline-blue-500"
      >
        <p>
          lark#{text} - Your brain has to be fried in a very specific way to
          understand this tweet, but I love it.
        </p>
      </div>
      {/* Date */}
      <p class="m-1 text-sm">{date ? date : "27.11.2022 (not specified)"}</p>
    </div>
  );
}
