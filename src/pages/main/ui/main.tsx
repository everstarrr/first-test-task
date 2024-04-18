'use client'
import {PT_Sans} from "next/font/google";
import {ProductFilter} from "@/widgets/productFilter/ui/productFilter";
import {TechnologyFilter} from "@/widgets/technologyFilter/ui/technologyFilter";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input"
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ItemCard} from "@/widgets/itemCard";
import {itemData} from "@/widgets/itemCard/model/ItemData";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {number} from "prop-types";
import {Key} from "lucide-react";

const ptSansBold = PT_Sans({preload: false, weight: '700'})

interface NumericObject {
    [key: number]: any
}

export const Main = () => {

    // очистка всех фильтров
    const productRef: any = useRef(null)
    const technologyRef: any = useRef(null)
    const clearAllFilters = () => {
        productRef.current.clearInputRef()
        technologyRef.current.clearInputRef()
    }


    // фильтр по продуктам
    const [productFilters, setProductFilters] = useState<NumericObject>({
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


    let itemsPerPage = 12
    const [currentPage, setCurrentPage] = useState(1);

    // Вычисляем индексы элементов, которые будут отображаться на текущей странице
    const indexOfLastItem = currentPage * itemsPerPage; // индекс первой вещи
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // индекс последней вещи
    const [currentItems, setCurrentItems] = useState(itemData.slice(indexOfFirstItem, indexOfLastItem)); // показанные вещи

    // Обработчик смены страницы
    // const handlePageChange = (page:number) => {
    //     setCurrentPage(page);
    // };

    // обработчик изменения чекбоксов продуктов
    const hpc = {
        handleProductChange(products: any) {
            console.log('new products: ', products)
            setProductFilters(products)
        }
    }

    // изменение отображаемых вещей
    useEffect(() => {
        if (!Object.values(productFilters).every(value => value === false)) {

            const newCurrentItems = []
            for (let key in productFilters) {
                if (productFilters[Number(key)]) {
                    for (let item in currentItems) {
                        if (currentItems[item].product_tag === Number(key)) {
                            newCurrentItems.push(currentItems[item])
                        }
                    }
                }
            }
            setCurrentItems(newCurrentItems)
        }
        else{
            setCurrentItems(itemData)
        }
    }, [productFilters])

    return (
        <main className="min-h-screen min-w-max px-40 mt-5 mb-3 flex flex-col space-y-5 border">
            <div className={'mx-5 border-b border-myLightGray h-16'}>
                <h1 className={ptSansBold.className + ' text-2xl text-myGray '}>Каталог услуг</h1>
            </div>

            <section className={'flex'}>
                <div className={'mx-5 border flex'}>
                    <div className={'w-[272px] p-5 flex flex-col space-y-9 border '}>
                        <p className={ptSansBold.className + ' text-xl text-myGray border'}>Фильтры</p>
                        <ProductFilter ref={productRef} handler={hpc}/>
                        <TechnologyFilter ref={technologyRef}/>
                        <div className={'px-2 flex flex-col space-y-3'}>
                            <Button className={ptSansBold.className + ' bg-myGreen text-[#FFFFFF] text-base w-full'}>Применить
                                фильтр</Button>
                            <button onClick={clearAllFilters} className={'text-myBlue'}>Очистить всё</button>
                        </div>
                    </div>
                </div>

                <div className={'border'}>
                    <div className={'relative mb-10 w-[420px]'}>
                        <FontAwesomeIcon className={'absolute box-border top-1/2 right-4 transform -translate-y-1/2 '}
                                         icon={faSearch} width={20} height={20}/>
                        <Input className={'placeholder-myLightGray mt-5 '} placeholder={'Поиск продукции'}/>
                    </div>
                    <div className={'grid grid-cols-4 gap-5'}>
                        {currentItems.map((item) => (
                            <ItemCard key={item.id} service={item}/>
                        ))}
                    </div>


                </div>
            </section>


        </main>
    );
}
