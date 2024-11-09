
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/06/24

// TYPE
"use client";

// IMPORTS
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import React from 'react';
import { StoryCard } from '../Cards/StoryCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';
import { Story } from '@/firebase/database_types';

// STORY CAROUSEL COMPONENT
export default function StoryCarousel(
    { stories }:
    { stories: Story[] }
) {
    return (
        <div className="home_carousel">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                mousewheel={true}
                slidesPerView={1}
                breakpoints={
                    {
                        900: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        }
                    }
                }
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,

                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Mousewheel]}
                className="swiper_container"
            >
                {stories.map((story) => (
                    <SwiperSlide key={story.id}>
                        <StoryCard story={story} isFullWidth={true} />
                    </SwiperSlide>
                ))}
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ArrowLeftCircle size={10} />
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ArrowRightCircle size={10} />
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

