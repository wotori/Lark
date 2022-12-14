export function LarkBox(props) {
  let { text, userName } = props;
  return (
    <div class="m-3">
      <div class="flex flex-row items-center">
        <img class="h-7 w-7 mx-3" src="svg/user.svg"></img>
        <p class="text-sm">{userName ? userName : "User Name / Mina wallet address"}</p>
      </div>
      <div class="p-3 min-w-1 max-w-xs bg-white rounded-xl shadow-lg text-blue">
        <p>
          lark#{text} - Your brain has to be fried in a very specific way to
          understand this tweet, but I love it.
        </p>
      </div>
    </div>
  );
}
