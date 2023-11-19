import AuthIcon from "@/components/svgs/AuthIcon";
import MainButton from "./MainButton";
import { useRef, useState } from "react";

type Props = {
  onClick?: (data: string) => void;
};

export default function AuthDialBox({ onClick }: Props) {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const fourthCode = useRef<any>(null);
  const thirdCode = useRef<any>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let str = "";
    for (let i = 0; i < 6; i++) str += e.target[i].value;
    onClick && onClick(str);
  };

  const updateValue = (index: number, value: string) => {
    const nextCodes = codes.map((c, i) => {
      if (i === index) {
        return value;
      } else {
        return c;
      }
    });
    setCodes(nextCodes);
  };

  const focusNextCode = (elem: any, i: number) => {
    if (i == 5) return;
    if (i == 2) fourthCode.current?.focus();
    else elem.nextElementSibling.focus();
  };

  const focusPrevCode = (elem: any, i: number) => {
    if (i == 0) return;
    if (i == 3) thirdCode.current?.focus();
    else elem.previousElementSibling.focus();
  };

  const handleBackSpace = (e: any, i: number) => {
    if (codes[i] == "") focusPrevCode(e.target, i);
    else updateValue(i, "");
  };

  const handleChange = (e: any, i: number) => {
    if (e.key == "ArrowLeft") focusPrevCode(e.target, i);
    if (e.key == "ArrowRight") focusNextCode(e.target, i);
    if (e.key == "Backspace") handleBackSpace(e, i);
    if (!isNaN(e.key)) {
      updateValue(i, e.key);
      focusNextCode(e.target, i);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gradient-border-2  p-6 rounded-xl "
    >
      <AuthIcon className="mx-auto mt-14 mb-4 w-fit" width={70} height={70} />
      <div className="mx-auto w-fit text-xl mb-8 ">
        Authenticate your account
      </div>
      <div className="w-fit mx-auto text-sm font-normal mb-10 text-slate-500">
        Enter the generated code provided by google authenticator
      </div>

      <div className="flex mx-auto w-fit mb-8">
        <div className="flex gap-2">
          <input
            maxLength={1}
            onChange={() => {}}
            required={true}
            className="authInput  bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            value={codes[0]}
            onKeyUp={(e) => handleChange(e, 0)}
            autoFocus
          />
          <input
            maxLength={1}
            onChange={() => {}}
            required={true}
            className="authInput bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            value={codes[1]}
            onKeyUp={(e) => handleChange(e, 1)}
          />
          <input
            maxLength={1}
            onChange={() => {}}
            required={true}
            className="authInput bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            value={codes[2]}
            onKeyUp={(e) => handleChange(e, 2)}
            ref={thirdCode}
          />
        </div>
        <div className="h-[2px] w-4 my-auto mx-4 bg-slate-700"></div>

        <div className="flex gap-2">
          <input
            maxLength={1}
            required={true}
            className="authInput bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            onChange={() => {}}
            value={codes[3]}
            onKeyUp={(e) => handleChange(e, 3)}
            ref={fourthCode}
          />
          <input
            maxLength={1}
            onChange={() => {}}
            required={true}
            className="authInput bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            value={codes[4]}
            onKeyUp={(e) => handleChange(e, 4)}
          />
          <input
            maxLength={1}
            onChange={() => {}}
            required={true}
            className="authInput bg-big-stone mx-auto pl-[1.4rem] w-14 h-14 rounded-md appearance-none outline-none"
            type="text"
            value={codes[5]}
            onKeyUp={(e) => handleChange(e, 5)}
          />
        </div>
      </div>

      <div className="mx-auto w-fit mb-4">
        <MainButton type="submit" className="mx-auto  px-6 py-3 rounded-sm ">
          Continue
        </MainButton>
      </div>
    </form>
  );
}
