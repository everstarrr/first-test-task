"use client"
import {PT_Sans} from "next/font/google";

import {productSearchData} from "@/widgets/productFilter/model/productFilterData";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import './productFilter.css'
import {Checkbox} from "@/components/ui/checkbox"
import {ScrollArea} from "@/components/ui/scroll-area";

const ptSansBold = PT_Sans({preload: false, weight: '700'})

interface ProductTag {
    id: number
    title: string
}

export const ProductFilter = forwardRef(function ProductFilter(props:any, ref) {
    const productFilters = useRef(productSearchData)
    const [visibleProducts, setVisibleProducts] = useState(productFilters.current.slice(0, 5));
    const [showAllButtonPressed, setShowAllButtonPressed] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => {
        return {
            // метод для очистки инпута через main
            clearInputRef() {
                if (inputRef.current) {
                    inputRef.current.value = '';
                    setInputValue('')
                    setSelectedProducts({
                        1: false, // футболки
                        2: false, // толстовки
                        3: false, // бейсболки
                        4: false, // календари
                        5: false, // диджитал услуги
                        6: false, // ручки
                        7: false, // чашки
                        8: false, // шопперы
                        9: false, // носки
                    })
                    //console.log(inputRef.current.value)
                    //console.log(selectedProducts)
                }
            },
        }
    }, [])

    // скрыть/показать все фильтры
    const showAllProducts = (): void => {
        if (!showAllButtonPressed) {
            setShowAllButtonPressed(true)
            setVisibleProducts(productFilters.current);
        } else {
            setShowAllButtonPressed(false)
            setVisibleProducts(productFilters.current.slice(0, 5));
        }
    }

    // очистка инпута через кнопку в компоненте
    const clearInput = () => {
        setInputValue('')
        console.log(selectedProducts)
    }

    // изменение значения инпута
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    // выбранные фильтры
    const [selectedProducts, setSelectedProducts] = useState({
        1: false, // футболки
        2: false, // толстовки
        3: false, // бейсболки
        4: false, // календари
        5: false, // диджитал услуги
        6: false, // ручки
        7: false, // чашки
        8: false, // шопперы
        9: false, // носки
    });


    // изменение выбранных фильтров по клику
    const handleCheckboxChange = (event: any) => {
        const {id} = event.target
        //console.log(id)
        //const newValue = !selectedProducts[id.at(-1) as keyof typeof selectedProducts]
        //console.log(newValue)
        setSelectedProducts(prevStat =>{
            const newValue = !prevStat[id.at(-1) as keyof typeof prevStat]
            return {...prevStat, [id.at(-1)]: newValue}
        });
    };


    useEffect(() => {
        //console.log(selectedProducts)
        props.handler.handleProductChange(selectedProducts)
    }, [selectedProducts])

    return (
        <div className={'flex-col flex space-y-2 '}>
            <Label htmlFor={'itemSearch'}></Label>
            <div className={'relative'}>
                <FontAwesomeIcon className={'absolute box-border top-1/2 right-4 transform -translate-y-1/2 mt-4'}
                                 icon={faSearch} width={20} height={20}/>
                <div className={'flex justify-between'}>
                    <Label htmlFor={'itemSearch'}
                           className={ptSansBold.className + ' text-myGray text-base'}>Продукция</Label>
                    <button className={'text-myBlue text-sm'} onClick={clearInput}>Очистить</button>
                </div>
                <Input ref={inputRef} onChange={handleInputChange} value={inputValue} id={'itemSearch'}
                       placeholder={'Поиск продукции'}
                       className={'placeholder-myLightGray mt-2'}/>
            </div>
            <ScrollArea className={'h-[168px]'}>
                {visibleProducts.map((product: ProductTag) => (
                    <label key={product.id} htmlFor={'product' + product.id} className='flex items-center border mb-2'>
                        <Checkbox id={'product' + product.id}
                                  onClick={handleCheckboxChange}
                                  checked={selectedProducts[product.id as keyof typeof selectedProducts]}
                                  className={'mr-1 aria-checked:bg-myGreen aria-checked:bg-opacity-5 aria-checked:border-myGreen'}/>
                        <span className='checkmark'></span>
                        {product.title}
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