"use client"
import {PT_Sans} from "next/font/google";

import {technologySearchData} from "@/widgets/technologyFilter/model/tecnologyFilterData";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import './technologyFilter.css'
import {Checkbox} from "@/components/ui/checkbox"
import {ScrollArea} from "@/components/ui/scroll-area";

const ptSansBold = PT_Sans({preload: false, weight: '700'})

interface TechnologyTag {
    id: number
    title: string
}


export const TechnologyFilter = forwardRef( function TechnologyFilter(props, ref){
    const technologyFilters = useRef(technologySearchData)
    const [visibleTechnologies, setVisibleTechnologies] = useState(technologyFilters.current.slice(0, 5));
    const [showAllButtonPressed, setShowAllButtonPressed] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => {
        return {
            clearInputRef() {
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            }
        }
    }, [])

    const showAllProducts = (): void => {
        if (!showAllButtonPressed) {
            setShowAllButtonPressed(true)
            setVisibleTechnologies(technologyFilters.current);
        } else {
            setShowAllButtonPressed(false)
            setVisibleTechnologies(technologyFilters.current.slice(0, 5));
        }
    }

    const clearInput = () => {
        setInputValue('')
    }

    const handleInputChange = (event: any) => {
        // Обновляем состояние значения поля ввода
        setInputValue(event.target.value);
    };

    return (
        <div className={'flex-col flex space-y-2 '}>
            <Label htmlFor={'itemSearch'}></Label>
            <div className={'relative'}>
                <FontAwesomeIcon className={'absolute box-border top-1/2 right-4 transform -translate-y-1/2 mt-4'}
                                 icon={faSearch} width={20} height={20}/>
                <div className={'flex justify-between'}>
                    <Label htmlFor={'itemSearch'}
                           className={ptSansBold.className + ' text-myGray text-base'}>Технологии</Label>
                    <button className={'text-myBlue text-sm'} onClick={clearInput}>Очистить</button>
                </div>
                <Input ref={inputRef} onChange={handleInputChange} value={inputValue} id={'itemSearch'} placeholder={'Поиск'}
                       className={'placeholder-myLightGray mt-2'}/>
            </div>
            <ScrollArea className={'h-[168px]'}>
                {visibleTechnologies.map((technologyTag: TechnologyTag) => (
                    <label key={technologyTag.id} htmlFor={technologyTag.title} className='flex items-center border mb-2'>
                        <Checkbox id={technologyTag.title}
                                  className={'mr-1 aria-checked:bg-myGreen aria-checked:bg-opacity-5 aria-checked:border-myGreen'}/>
                        <span className='checkmark'></span>
                        {technologyTag.title}
                    </label>
                ))}
            </ScrollArea>

            <button className={' flex space-x-1 items-center border'} onClick={showAllProducts}>
                    <span
                        className={showAllButtonPressed ? 'text-myGray' : 'text-myBlue '}>{showAllButtonPressed ? 'скрыть' : 'показать всё'}</span>
                <FontAwesomeIcon className={showAllButtonPressed ? 'rotate-180' : ''} icon={faAngleDown}
                                 style={!showAllButtonPressed ? {color: '#1772EB'} : {color: '#344054'}}/>
            </button>
        </div>
    )
})