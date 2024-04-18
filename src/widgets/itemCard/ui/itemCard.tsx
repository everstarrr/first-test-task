import Image from "next/image";
import './itemCard.css'
import {Inter, PT_Sans} from "next/font/google";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";

interface Service { // услуга
    id: number
    title: string
    price: number
    period: number // кол-во дней
    avatar: string // url
    name: string
    rating: {
        stars: number
        count: number
    }
    company_name: string
    product_tag: number
    technology_tag: number
    preview: string //url
}

const inter = Inter({weight: '400', subsets: ['cyrillic', "latin"]})
const ptSansBold = PT_Sans({preload: false, weight: '700'})

export const ItemCard = ({service}:{service:Service}) => {

    return (
        <div className={'h-80 flex flex-col space-y-2.5 w-[260px] shadow-lg rounded-lg border'}>
            <Image src={service.preview} alt={''} width={260} height={172} className={'border rounded-t-lg'}/>
            <span className={'items-text h-9 leading-[18px] px-4 border text-sm'}>{service.title}</span>
            <div className={'px-4 flex justify-between items-center border'}>
                <span className={ptSansBold.className}>От&nbsp;{service.price}&nbsp;руб.</span>
                <div className={'flex space-x-1 items-center'}>
                    <FontAwesomeIcon icon={faClock} style={{color: '#999999'}}/>
                    <span className={'text-myNines text-sm'}>{service.period}&nbsp;дней</span>
                </div>
            </div>

            <div className={'px-4 py-2.5 border-t border-myVLightGray flex items-center h-[41px] space-x-3'}>
                <Image src={service.avatar} width={35} height={35} alt={''}/>
                <div className={'flex flex-col justify-between w-full'}>
                    <div className={'flex justify-between'}>
                        <span className={inter.className + ' text-myGray text-sm name-text'}>{service.name}</span>
                        <div>
                            <span className={'text-myYellow'}>★</span>
                            <span className={'text-xs'}>{service.rating.stars}<span className={'text-myLightBlue'}>({service.rating.count})</span></span>
                        </div>
                    </div>
                    <span className={inter.className + ' text-xs text-[#667085]'}>{service.company_name}</span>
                </div>
            </div>
        </div>
    )
}