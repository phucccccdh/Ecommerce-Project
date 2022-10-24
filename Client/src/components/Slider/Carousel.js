import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined, LaptopOutlined, MobileOutlined, NotificationOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none'}}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let {slider, slider1, slider2} = props
  const [nav, setNav] = useState({nav1: null, nav2: null})

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop:true,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

 
  const next = () =>  {
    slider1.slickNext();
  }
  const previous = () => {
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-menu">
          <div >
            <p className="float">Điện Thoại</p>
            < MobileOutlined className="iconn" />
          </div>
          <div >
            <p className="float">LapTop</p>
            <LaptopOutlined className="iconn"/>
          </div>
          <div>
            <p className="float">Tai Nghe</p>
            <NotificationOutlined className="iconn"/>
          </div>
        </div>
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} >
              <div key={1}>
                <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/flip4-6tr2-sliding.png"></img>
              </div>
              <div key={2}>
                <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/aw-mo-ban-sliding.png"></img>
              </div>
              <div key={3}>
                <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/CPS%20690x300.jpg"></img>
              </div>
              <div key={4}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/dd690x300_XR.png"></img>
              </div>
              <div key={4}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/se-aw-690-300-max.png"></img>
              </div>
            </Slider>
            <div className='carousel-left-move' >
                <div className="prev" onClick={() => previous()}>
                    <LeftOutlined></LeftOutlined>
                </div>
                <div className="next" onClick={() => next()}>
                    <RightOutlined></RightOutlined>
                </div>
            </div>
            <div className="carousel-left-bottom">
              <Slider asNavFor={nav.nav1}
                      ref={slider => (slider2 = slider)}
                      slidesToShow={4}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      >
                
                <div>
                  GALAXY Z FLIP 4 <br></br> Bộ quà 6.2 triệu
                </div>
                <div>
                  APPLE WATCH 2022  <br></br>  Ưu đãi đến 3.5 triệu
                </div>
                <div>
                  LAPTOP GAMING ASUS <br></br>  Chiến game cực đỉnh
                </div>
                <div>
                 APPLE WATCH SE  <br></br>  Mua đi chờ chi
                </div>
                <div>
                  ĐẠI TIỆC ÂM THANH   <br></br>   Loa sale bung nóc
                </div>

              </Slider>
            </div>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/Fold3.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/RightBanner_Desktop.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/zenbook%2014.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
