import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'
import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch } from 'react-redux';
import '../ListProducts.css'

import {
    FireOutlined,
  } from "@ant-design/icons";

function Iphone(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('iphone');
    const [hotIphone, setHotIphone] = useState([])
    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get(`http://localhost:4000/products/${name}`)
                setHotIphone(data)
            } catch (error) {
            }
        }
        FetchApi()
    }, [])

   

    return (
        <section id="hotsale iphone">
            <div className="hotsale">
                <div style={{
                        display:'flex', 
                        justifyContent: 'center', 
                        border:'1px solid red',
                        borderRadius: '10px',
                        
                        }}>
                    <h2 className='hotsale-title'> HOT SALE </h2>
                    <FireOutlined style={{fontSize:'35px', color: 'red',lineHeight:'64px' }}/>
                </div>
                <h2 className='hotsale-name'>{name}</h2>
                {
                    hotIphone ? (<ListProduct HotSaleProducts={handlePercentDiscount(hotIphone)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default Iphone;