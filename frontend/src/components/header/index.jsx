export function LarkHead() {
  return (
    <>
      <div class="px-10 py-5 bg-blue flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <img class="object-scale-down h-10" src="svg/logo.svg"></img>
          <p class="p-3 text-white">LARK</p>
        </div>
        <div class="flex flex-row items-center">
          <img class="object-scale-donw h-10 m-3" src="svg/magnifying_glass.svg" />
          <input type="text"></input>
        </div>
        <p class="text-white">about</p>
      </div>
    </>
  );
}
