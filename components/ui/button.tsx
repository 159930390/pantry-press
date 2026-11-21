import {Slot} from "radix-ui";
import {cva} from "class-variance-authority";
import type {ButtonHTMLAttributes} from "react";
const variants=cva("inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:opacity-50",{variants:{variant:{primary:"bg-[#ae3224] text-white hover:bg-[#92281c]",plain:"border border-[#ccc6b7] bg-[#faf8ee] hover:bg-white"}},defaultVariants:{variant:"plain"}});
export function Button({asChild,variant,className="",...props}:ButtonHTMLAttributes<HTMLButtonElement>&{asChild?:boolean;variant?:"primary"|"plain"}){const Comp=asChild?Slot.Root:"button";return <Comp className={variants({variant,className:"control "+className})} {...props}/>}