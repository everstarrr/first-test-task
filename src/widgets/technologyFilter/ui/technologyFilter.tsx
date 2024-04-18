"use client"
import {PT_Sans} from "next/font/google";

import {technologySearchData} from "@/widgets/technologyFilter/model/tecnologyFilterData";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
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


export const TechnologyFilter = forwardRef( function TechnologyFilter(props:any, ref){
    const technologyFilters = useRef(technologySearchData)
    const [visibleTechnologies, setVisibleTechnologies] = useState(technologyFilters.current.slice(0, 5));
    const [showAllButtonPressed, setShowAllButtonPressed] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const inititalTechnologies = {
        1: false, // биговка
        2: false, // вырубка
        3: false, // вышивка
        4: false, // деколь
        5: false, // лазерная гравировка
        6: false, // широкоформатная печать
        7: false, // лепка
        8: false, // термопечать
    }

    useImperativeHandle(ref, () => {
        return {
            // метод для очистки инпута через main
            clearInputRef() {
                if (inputRef.current) {
                    inputRef.current.value = '';
                    setInputValue('')
                    setSelectedTechnologies(inititalTechnologies)
                }
            },
        }
    }, [])

    const showAllTechnologies = (): void => {
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

    // выбранные фильтры
    const [selectedTechnologies, setSelectedTechnologies] = useState(inititalTechnologies);

    // изменение выбранных фильтров по клику
    const handleCheckboxChange = (event: any) => {
        const {id} = event.target
        setSelectedTechnologies(prevStat => {
            const newValue = !prevStat[id.at(-1) as keyof typeof prevStat]
            return {...prevStat, [id.at(-1)]: newValue}
        });
    };

    useEffect(() => {
        //console.log(selectedProducts)
        props.handler.handleTechnologyChange(selectedTechnologies)
    }, [selectedTechnologies])

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
                {visibleTechnologies.map((technology: TechnologyTag) => (
                    <label key={technology.id} htmlFor={'technology' + technology.id} className='flex items-center mb-2'>
                        <Checkbox id={'technology' + technology.id}
                                  onClick={handleCheckboxChange}
                                  checked={selectedTechnologies[technology.id as keyof typeof selectedTechnologies]}
                                  className={'mr-1 aria-checked:bg-myGreen aria-checked:bg-opacity-5 aria-checked:border-myGreen'}/>
                        <span className='checkmark'></span>
                        {technology.title}
                    </label>
                ))}
            </ScrollArea>

            <button className={' flex space-x-1 items-center'} onClick={showAllTechnologies}>
                    <span
                        className={showAllButtonPressed ? 'text-myGray' : 'text-myBlue '}>{showAllButtonPressed ? 'скрыть' : 'показать всё'}</span>
                <FontAwesomeIcon className={showAllButtonPressed ? 'rotate-180' : ''} icon={faAngleDown}
                                 style={!showAllButtonPressed ? {color: '#1772EB'} : {color: '#344054'}}/>
            </button>
        </div>
    )
})