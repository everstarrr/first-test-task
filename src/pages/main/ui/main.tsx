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
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const ptSansBold = PT_Sans({preload: false, weight: '700'})

interface NumericObject {
    [key: number]: any
}

const Main = () => {

    // очистка всех фильтров
    const productRef: any = useRef(null)
    const technologyRef: any = useRef(null)
    const clearAllFilters = () => {
        productRef.current.clearInputRef()
        technologyRef.current.clearInputRef()
    }

    const initialProducts = {
        1: false, // футболки
        2: false, // толстовки
        3: false, // бейсболки
        4: false, // календари
        5: false, // диджитал услуги
        6: false, // ручки
        7: false, // чашки
        8: false, // шопперы
        9: false, // носки
    }

    const initialTechnologies = {
        1: false, // биговка
        2: false, // вырубка
        3: false, // вышивка
        4: false, // деколь
        5: false, // лазерная гравировка
        6: false, // широкоформатная печать
        7: false, // лепка
        8: false, // термопечать
    }

    // фильтр по продуктам
    const [productFilters, setProductFilters] = useState<NumericObject>(initialProducts)

    // фильтр по технологиям
    const [technologyFilters, setTechnologyFilters] = useState<NumericObject>(initialTechnologies)

    let itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1);

    // Вычисляем индексы элементов, которые будут отображаться на текущей странице
    let indexOfLastItem = currentPage * itemsPerPage; // индекс первой вещи
    let indexOfFirstItem = indexOfLastItem - itemsPerPage; // индекс последней вещи
    const [currentItems, setCurrentItems] = useState(itemData.slice(indexOfFirstItem, indexOfLastItem)); // показанные вещи

    // обработчик изменения чекбоксов продуктов
    const handleProductFilter = {
        handleProductChange(products: any) {
            console.log('new products: ', products)
            setProductFilters(products)
        }
    }

    // обработчик изменения чекбоксов технологий
    const handleTechnologyFilter = {
        handleTechnologyChange(technologies: any) {
            console.log('new technologies: ', technologies)
            setTechnologyFilters(technologies)
        }
    }

    // изменение отображаемых вещей (продукты)
    useEffect(() => {
        if (!Object.values(productFilters).every(value => value === false)) {

            const newCurrentItems = []
            for (let key in productFilters) {
                if (productFilters[Number(key)]) {
                    for (let item in itemData) {
                        if (itemData[item].product_tag === Number(key)) {
                            newCurrentItems.push(itemData[item])
                        }
                    }
                }
            }
            setCurrentItems(newCurrentItems.slice(indexOfFirstItem, indexOfLastItem))
        } else {
            setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
        }
    }, [productFilters])

    // изменение отображаемых вещей (технологии)
    useEffect(() => {
        if (!Object.values(technologyFilters).every(value => value === false)) {

            const newCurrentItems = []
            for (let key in technologyFilters) {
                if (technologyFilters[Number(key)]) {
                    for (let item in itemData) {
                        if (itemData[item].technology_tag === Number(key)) {
                            newCurrentItems.push(itemData[item])
                        }
                    }
                }
            }
            setCurrentItems(newCurrentItems.slice(indexOfFirstItem, indexOfLastItem))
        } else {
            setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
        }
    }, [technologyFilters])


    const previousHandler = () => {

        if (currentPage !== 1) {
            indexOfFirstItem -= itemsPerPage
            indexOfLastItem -= itemsPerPage
            setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
            setCurrentPage(currentPage - 1)
        }
    }

    const nextHandler = () => {
        if (currentPage !== itemData.length / itemsPerPage) {
            indexOfFirstItem += itemsPerPage
            indexOfLastItem += itemsPerPage
            setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
            setCurrentPage(currentPage + 1)
        }
    }

    const firstHandler = () => {
        indexOfFirstItem = 0
        indexOfLastItem = itemsPerPage
        setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
        setCurrentPage(1)
    }

    const lastHandler = () => {
        setCurrentPage(Math.floor(itemData.length / itemsPerPage))
        indexOfFirstItem = Math.floor(itemData.length / itemsPerPage) * (itemsPerPage - 1) - 1
        console.log(indexOfFirstItem)
        indexOfLastItem = Math.floor(itemData.length / itemsPerPage) * itemsPerPage
        console.log(indexOfLastItem)
        setCurrentItems(itemData.slice(indexOfFirstItem, indexOfLastItem))
    }

    return (
        <main className="min-h-screen min-w-max px-40 mt-5 mb-3 flex flex-col space-y-5 ">
            <div className={'mx-5 border-b border-myLightGray h-16'}>
                <h1 className={ptSansBold.className + ' text-2xl text-myGray '}>Каталог услуг</h1>
            </div>

            <section className={'flex'}>
                <div className={'mx-5 shadow-lg rounded-lg flex'}>
                    <div className={'w-[272px] p-5 flex flex-col space-y-9 '}>
                        <p className={ptSansBold.className + ' text-xl text-myGray'}>Фильтры</p>
                        <ProductFilter ref={productRef} handler={handleProductFilter}/>
                        <TechnologyFilter ref={technologyRef} handler={handleTechnologyFilter}/>
                        <div className={'px-2 flex flex-col space-y-3'}>
                            <Button className={ptSansBold.className + ' bg-myGreen text-[#FFFFFF] text-base w-full'}>Применить
                                фильтр</Button>
                            <button onClick={clearAllFilters} className={'text-myBlue'}>Очистить всё</button>
                        </div>
                    </div>
                </div>

                <div className={' flex flex-col justify-between'}>
                    <div>
                        <div className={'relative mb-10 w-[420px]'}>
                            <FontAwesomeIcon
                                className={'absolute box-border top-1/2 right-4 transform -translate-y-1/2 '}
                                icon={faSearch} width={20} height={20}/>
                            <Input className={'placeholder-myLightGray mt-5 '} placeholder={'Поиск продукции'}/>
                        </div>
                        <div className={'grid grid-cols-4 gap-5'}>
                            {currentItems.map((item) => (
                                <ItemCard key={item.id} service={item}/>
                            ))}
                        </div>
                    </div>

                    <Pagination className={'border w-fit'}>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={previousHandler} href={'#'}></PaginationPrevious>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={firstHandler} href={'#'}>1</PaginationLink>
                            </PaginationItem>
                            {itemData.length / itemsPerPage - 1 > currentPage ?
                                <PaginationItem>
                                    <PaginationLink onClick={nextHandler} href={'#'}>{currentPage + 1}</PaginationLink>
                                </PaginationItem>
                                : null
                            }
                            {currentPage - 1 > 2 ?
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                : null
                            }
                            {currentPage !== 1 && currentPage !== Math.floor(itemData.length / itemsPerPage) ?
                                <PaginationItem>
                                    <PaginationLink href={'#'}>{currentPage}</PaginationLink>
                                </PaginationItem>
                                : null
                            }
                            {itemData.length / itemsPerPage - currentPage > 2 ?
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                                : null
                            }
                            {itemData.length / itemsPerPage !== 1 ?
                                <PaginationItem>
                                    <PaginationLink onClick={lastHandler}
                                                    href={'#'}>{itemData.length / itemsPerPage}</PaginationLink>
                                </PaginationItem>
                                : null
                            }
                            <PaginationItem>
                                <PaginationNext onClick={nextHandler} href={'#'}></PaginationNext>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            </section>


        </main>
    );
}

export default Main