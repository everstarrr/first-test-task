import Image from "next/image";
import loom_logo from "../model/loom_logo.png"
import './header.css'

export const Header = ()=>{
    return (
        <header className={'w-full header flex justify-center'}>
            <Image className={'object-contain'} src={loom_logo} alt={'Loom logo'}/>
        </header>
    )
}