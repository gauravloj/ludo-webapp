import { Button, Transition } from "@headlessui/react";

import clsx from "clsx";
import { useState } from "react";

export const diceFrontMap = {
  1: DiceFace1,
  2: DiceFace2,
  3: DiceFace3,
  4: DiceFace4,
  5: DiceFace5,
  6: DiceFace6,
};
export function Dice({ isShowing, diceFront }) {
  return (
    <div className="size-[6.25rem]">
      <Transition show={isShowing}>
        <div
          className={clsx(
            "size-full rounded-xl bg-white shadow-lg transition duration-400",
            "data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0",
            "data-[leave]:duration-200 data-[leave]:ease-in-out",
            "data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]",
          )}
        >
          {diceFront}
        </div>
      </Transition>
    </div>
  );
}
function DiceFace1() {
  return (
    <div className="w-full h-full grid grid-cols-1 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
function DiceFace2() {
  return (
    <div className="w-full h-full grid grid-cols-2 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
function DiceFace3() {
  return (
    <div className="w-full h-full grid grid-rows-2 grid-cols-2 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="col-span-2 rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
function DiceFace4() {
  return (
    <div className="w-full h-full grid grid-rows-2 grid-cols-2 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
function DiceFace5() {
  return (
    <div className="w-full h-full grid grid-rows-3 grid-cols-2 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="col-span-2 rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
function DiceFace6() {
  return (
    <div className="w-full h-full grid grid-rows-3 grid-cols-2 place-content-center place-items-center">
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
      <button className="rounded-full bg-black h-4 w-4 "></button>
    </div>
  );
}
